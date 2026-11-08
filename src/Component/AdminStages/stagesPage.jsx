import React, { useEffect, useMemo, useState } from 'react'
import classes from '../AdminAccess/adminAccess.module.css'
import own from './stages.module.css'
import RefreshButton from '../AdminAccess/refreshButton'
import SearchSelect from '../UI/SearchSelect/searchSelect'
import {
	useCreateAdminStageMutation,
	useCreateAdminStageSlotMatchMutation,
	useUnlinkAdminStageSlotMatchMutation,
	useAddAdminStageSlotMutation,
	useEditAdminStageSlotMutation,
	useDeleteAdminStageSlotMutation,
	useDeleteAdminStageMutation,
	useLinkAdminStageMatchesMutation,
	useSetAdminStageGroupOrderMutation,
	useUpdateAdminStageSettingsMutation,
	useAdminStageToPlayoffMutation,
	useAdminStageSwissNextMutation,
	useGetAdminStagesQuery,
	useGetTournamentsQuery,
	useSetAdminStageSlotTeamMutation,
	useSetAdminStageSlotWinnerMutation,
	useUpdateAdminStageSlotMutation,
} from '../../store/api/apiSlice'

const FORMATS = ['BO1', 'BO2', 'BO3', 'BO5']
const STATUS = {
	waiting: 'Waiting for teams',
	ready: 'Ready',
	created: 'Match created',
	finished: 'Finished',
}

const errorMessage = (e) => e?.data?.message || 'Something went wrong, try again'

const tourLogo = (t, h = 22) =>
	t.logo_tour ? <img src={`/images/LogoAndBannerTour/${t.logo_tour}`} alt="" style={{ height: h, width: 'auto', maxWidth: h * 3, objectFit: 'contain', flex: 'none' }} onError={(e) => (e.currentTarget.style.display = 'none')} /> : null

const TeamName = ({ team }) => (
	<span className={own.teamName}>
		{team.logo_team && <img src={`/images/LogoTeams/${team.logo_team}`} alt="" />}
		<span>{team.name_team}</span>
	</span>
)

// Одна сторона слота: команда либо подсказка «Winner of ... / Loser of ...». Фиксированную команду (посев) можно заменить, пока матч не создан
const Side = ({ side, slot, source, teams, onTeam }) => {
	const locked = !!slot.short_match_id
	if (side.type === 'team' && !locked) {
		return (
			<select className={`${classes.input} ${own.ctl}`} value={side.team?.team_id ?? ''} onChange={(e) => onTeam(Number(e.target.value))}>
				{!side.team && <option value="">Choose a team</option>}
				{teams.map((t) => (
					<option key={t.team_id} value={t.team_id}>
						{t.name_team}
					</option>
				))}
			</select>
		)
	}
	if (side.team) return <TeamName team={side.team} />
	return (
		<span className={classes.hint}>
			{side.type === 'loser' ? 'Loser' : 'Winner'} of {source ?? '—'}
		</span>
	)
}

const BRACKET_OPTIONS = [
	['main', 'Main / upper'],
	['lower', 'Lower'],
	['third', 'Third place'],
	['gf', 'Grand final'],
]

// Готовые подписи слотов, чтобы не набирать их руками (опечатка = лишняя «стадия» в сетке); свой вариант доступен через Other
const LABEL_PRESETS = {
	main: ['Round of 32', 'Round of 16', 'Quarterfinal', 'Semifinal', 'Final', 'Upper Bracket Round of 32', 'Upper Bracket Round of 16', 'Upper Bracket Quarterfinal', 'Upper Bracket Semifinal', 'Upper Bracket Final'],
	lower: ['Lower Bracket Round 1', 'Lower Bracket Round 2', 'Lower Bracket Round 3', 'Lower Bracket Round 4', 'Lower Bracket Semifinal', 'Lower Bracket Final'],
	third: ['Third place'],
	gf: ['Grand Final', 'Grand Final Reset'],
}
const OTHER_LABEL = '__other'

const emptySide = { type: 'team', team_id: '', slot_id: '' }
const toSide = (side) => ({ type: side.type, team_id: side.type === 'team' ? side.team?.team_id ?? '' : '', slot_id: side.slot_id ?? '' })
const sideBody = (x) => ({ type: x.type, team_id: x.type === 'team' ? Number(x.team_id) : null, slot_id: x.type === 'team' ? null : Number(x.slot_id) })
const sideReady = (x) => (x.type === 'team' ? !!x.team_id : !!x.slot_id)

const SideEditor = ({ value, onChange, teams, slotOptions, title }) => (
	<div className={own.controls}>
		<span className={classes.hint} style={{ minWidth: 20 }}>{title}</span>
		<select className={`${classes.input} ${own.ctl}`} value={value.type} onChange={(e) => onChange({ ...value, type: e.target.value })}>
			<option value="team">Team</option>
			<option value="winner">Winner of match</option>
			<option value="loser">Loser of match</option>
		</select>
		{value.type === 'team' ? (
			<select className={`${classes.input} ${own.ctl}`} value={value.team_id} onChange={(e) => onChange({ ...value, team_id: e.target.value })}>
				<option value="">Choose a team</option>
				{teams.map((t) => (
					<option key={t.team_id} value={t.team_id}>
						{t.name_team}
					</option>
				))}
			</select>
		) : (
			<select className={`${classes.input} ${own.ctl}`} value={value.slot_id} onChange={(e) => onChange({ ...value, slot_id: e.target.value })}>
				<option value="">Choose a match</option>
				{slotOptions.map((o) => (
					<option key={o.id} value={o.id}>
						{o.name}
					</option>
				))}
			</select>
		)}
	</div>
)

// Форма слота: и для добавления, и для правки (при правке формат/дата не меняются)
const SlotForm = ({ stage, teams, slot, onSubmit, onCancel, busy }) => {
	const editing = !!slot
	const [bracket, setBracket] = useState(slot?.bracket ?? 'main')
	const [round, setRound] = useState(slot?.round ?? 1)
	const [label, setLabel] = useState(slot?.label ?? '')
	const [format, setFormat] = useState(slot?.format ?? stage.settings?.format ?? 'BO3')
	const [date, setDate] = useState('')
	const [time, setTime] = useState('')
	const [a, setA] = useState(slot ? toSide(slot.a) : emptySide)
	const [b, setB] = useState(slot ? toSide(slot.b) : emptySide)
	const slotOptions = useMemo(() => stage.slots.filter((s) => s.id !== slot?.id).map((s) => ({ id: s.id, name: `${s.label} #${s.position}` })), [stage.slots, slot])
	const fixedBracket = slot && !BRACKET_OPTIONS.some(([v]) => v === slot.bracket)
	const activeBracket = fixedBracket ? slot.bracket : bracket
	const labelChoices = useMemo(() => [...new Set([...(LABEL_PRESETS[activeBracket] ?? []), ...stage.slots.filter((s) => s.bracket === activeBracket).map((s) => s.label)])], [activeBracket, stage.slots])
	const [otherLabel, setOtherLabel] = useState(!!slot && !labelChoices.includes(slot.label))
	const ready = label.trim() && Number(round) >= 1 && sideReady(a) && sideReady(b)

	return (
		<div className={own.slot}>
			<div className={own.controls}>
				{fixedBracket ? (
					<span className={classes.hint}>Bracket: {slot.bracket}</span>
				) : (
					<select className={`${classes.input} ${own.ctl}`} value={bracket} onChange={(e) => { setBracket(e.target.value); setOtherLabel(false); setLabel('') }} title="Where the match is drawn">
						{BRACKET_OPTIONS.map(([v, n]) => (
							<option key={v} value={v}>
								{n}
							</option>
						))}
					</select>
				)}
				<input className={`${classes.input} ${own.ctl}`} type="number" min={1} max={50} style={{ width: 80 }} value={round} onChange={(e) => setRound(e.target.value)} title="Round (column) number" />
				<select
					className={`${classes.input} ${own.ctl}`}
					style={{ width: 240 }}
					value={otherLabel ? OTHER_LABEL : label}
					title="Match label. The same label for several matches of one round is fine"
					onChange={(e) => {
						if (e.target.value === OTHER_LABEL) {
							setOtherLabel(true)
							return
						}
						setOtherLabel(false)
						setLabel(e.target.value)
					}}>
					<option value="">Choose a label</option>
					{labelChoices.map((l) => (
						<option key={l} value={l}>
							{l}
						</option>
					))}
					<option value={OTHER_LABEL}>Other...</option>
				</select>
				{otherLabel && <input className={`${classes.input} ${own.ctl}`} style={{ width: 220 }} value={label} maxLength={100} placeholder="Own label" onChange={(e) => setLabel(e.target.value)} />}
				{!editing && (
					<>
						<select className={`${classes.input} ${own.ctl} ${own.format}`} value={format} onChange={(e) => setFormat(e.target.value)}>
							{FORMATS.map((f) => (
								<option key={f} value={f}>
									{f}
								</option>
							))}
						</select>
						<input className={`${classes.input} ${own.ctl}`} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
						<input className={`${classes.input} ${own.ctl}`} type="time" value={time} onChange={(e) => setTime(e.target.value)} />
					</>
				)}
			</div>
			<SideEditor title="A" value={a} onChange={setA} teams={teams} slotOptions={slotOptions} />
			<SideEditor title="B" value={b} onChange={setB} teams={teams} slotOptions={slotOptions} />
			<div className={own.controls}>
				<button
					type="button"
					className={`${classes.btn} ${own.ctl}`}
					disabled={!ready || busy}
					onClick={() =>
						onSubmit({
							bracket: fixedBracket ? slot.bracket : bracket,
							round: Number(round),
							label: label.trim(),
							a: sideBody(a),
							b: sideBody(b),
							...(editing ? {} : { format, date: date || null, time: time || null }),
						})
					}>
					{editing ? 'Save slot' : 'Add slot'}
				</button>
				{onCancel && (
					<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={onCancel}>
						Cancel
					</button>
				)}
			</div>
		</div>
	)
}

const SlotRow = ({ slot, stage, sourceName, teams, report, refetch }) => {
	const [editing, setEditing] = useState(false)
	const [editSlot, editState] = useEditAdminStageSlotMutation()
	const [deleteSlot, deleteState] = useDeleteAdminStageSlotMutation()
	const [format, setFormat] = useState(slot.format)
	const [date, setDate] = useState(slot.date ?? '')
	const [time, setTime] = useState(slot.time ?? '')
	const [update, updateState] = useUpdateAdminStageSlotMutation()
	const [setTeam] = useSetAdminStageSlotTeamMutation()
	const [setWinner] = useSetAdminStageSlotWinnerMutation()
	const [createMatch, createState] = useCreateAdminStageSlotMatchMutation()
	const [unlinkMatch, unlinkState] = useUnlinkAdminStageSlotMatchMutation()

	useEffect(() => {
		setFormat(slot.format)
		setDate(slot.date ?? '')
		setTime(slot.time ?? '')
	}, [slot.format, slot.date, slot.time])

	const locked = !!slot.short_match_id
	const dirty = format !== slot.format || date !== (slot.date ?? '') || time !== (slot.time ?? '')
	const bothTeams = slot.a.team && slot.b.team

	const run = async (action, okText) => {
		try {
			await action().unwrap()
			report(true, okText)
			refetch()
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	if (editing) {
		return (
			<SlotForm
				stage={stage}
				teams={teams}
				slot={slot}
				busy={editState.isLoading}
				onCancel={() => setEditing(false)}
				onSubmit={async (body) => {
					try {
						await editSlot({ id: slot.id, ...body }).unwrap()
						report(true, 'Slot saved')
						setEditing(false)
						refetch()
					} catch (e) {
						report(false, errorMessage(e))
					}
				}}
			/>
		)
	}

	return (
		<div className={`${own.slot} ${slot.status === 'finished' ? own.slotDone : ''}`}>
			<div className={own.slotTitle}>
				{slot.label} #{slot.position}
				<span className={`${own.badge} ${own[`badge_${slot.status}`]}`}>{STATUS[slot.status]}</span>
			</div>

			<div className={own.teams}>
				<Side side={slot.a} slot={slot} source={sourceName[slot.a.slot_id]} teams={teams} onTeam={(id) => run(() => setTeam({ id: slot.id, side: 'a', team_id: id }), 'Team changed')} />
				<span className={own.vs}>{slot.score ? `${slot.score[0]} : ${slot.score[1]}` : 'vs'}</span>
				<Side side={slot.b} slot={slot} source={sourceName[slot.b.slot_id]} teams={teams} onTeam={(id) => run(() => setTeam({ id: slot.id, side: 'b', team_id: id }), 'Team changed')} />
			</div>

			<div className={own.controls}>
				<select className={`${classes.input} ${own.ctl} ${own.format}`} value={format} onChange={(e) => setFormat(e.target.value)} disabled={locked}>
					{FORMATS.map((f) => (
						<option key={f} value={f}>
							{f}
						</option>
					))}
				</select>
				<input className={`${classes.input} ${own.ctl}`} type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={locked} />
				<input className={`${classes.input} ${own.ctl}`} type="time" value={time} onChange={(e) => setTime(e.target.value)} disabled={locked} />
				<button
					type="button"
					className={`${classes.btnDark} ${own.ctl}`}
					disabled={locked || !dirty || updateState.isLoading}
					onClick={() => run(() => update({ id: slot.id, format, date: date || null, time: time || null }), 'Slot saved')}>
					Save
				</button>
				<button
					type="button"
					className={`${classes.btn} ${own.ctl}`}
					disabled={locked || slot.status !== 'ready' || !slot.date || !slot.time || dirty || createState.isLoading}
					title={locked ? 'The match is already created' : !bothTeams ? 'Both teams must be known' : !slot.date || !slot.time ? 'Save the date and time first' : 'Create the match in the schedule'}
					onClick={() => run(() => createMatch(slot.id), 'Match created')}>
					{locked ? 'Match created' : 'Create match'}
				</button>
				{locked && (
					<button
						type="button"
						className={`${classes.btnDark} ${own.ctl}`}
						disabled={unlinkState.isLoading}
						title="Detach the match from this slot (the match itself is not deleted). Use it if the match was linked by mistake"
						onClick={() => window.confirm(`Unlink the match ${slot.match_name ?? ''} from "${slot.label} #${slot.position}"? The match itself stays in the schedule`) && run(() => unlinkMatch(slot.id), 'Match unlinked')}>
						Unlink match
					</button>
				)}
				{!locked && (
					<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={() => setEditing(true)} title="Change the label, place in the bracket and where the teams come from">
						Edit
					</button>
				)}
				<button
					type="button"
					className={`${classes.btnDark} ${own.ctl}`}
					disabled={deleteState.isLoading}
					title="Remove this slot from the stage (a linked match is not deleted)"
					onClick={() => window.confirm(`Delete the slot "${slot.label} #${slot.position}"? The real match, if any, stays in the schedule`) && run(() => deleteSlot(slot.id), 'Slot deleted')}>
					Delete slot
				</button>
				{bothTeams && (
					<select
						className={`${classes.input} ${own.ctl}`}
						value={slot.winner_team_id ?? ''}
						title="Winner is taken from the match score. Choose a team to set it manually (forfeit, disqualification)"
						onChange={(e) => run(() => setWinner({ id: slot.id, team_id: e.target.value ? Number(e.target.value) : null }), e.target.value ? 'Winner set manually' : 'Back to automatic winner')}>
						<option value="">{slot.winner_manual ? 'Winner: auto (clear manual)' : 'Winner: auto'}</option>
						<option value={slot.a.team.team_id}>Winner: {slot.a.team.name_team}</option>
						<option value={slot.b.team.team_id}>Winner: {slot.b.team.name_team}</option>
					</select>
				)}
			</div>
			{slot.winner_team_id && (
				<div className={classes.hint}>
					Winner: <b>{[slot.a.team, slot.b.team].find((t) => t?.team_id === slot.winner_team_id)?.name_team}</b>
					{slot.winner_manual ? ' (set manually)' : ''}
				</div>
			)}
		</div>
	)
}

// Таблица одной группы: места можно менять вручную (тайбрейки решают организаторы)
const GroupTable = ({ stage, group, rows, report, refetch }) => {
	const [setOrder, orderState] = useSetAdminStageGroupOrderMutation()
	const advance = stage.advance ?? 2
	const manual = stage.participants.some((p) => p.group === group) && rows.some((r) => r.manual_place != null)

	const save = async (teamIds) => {
		try {
			await setOrder({ id: stage.id, group, team_ids: teamIds }).unwrap()
			report(true, teamIds ? `Places in group ${group} saved` : `Group ${group}: automatic order`)
			refetch()
		} catch (e) {
			report(false, errorMessage(e))
		}
	}
	const move = (i, d) => {
		const ids = rows.map((r) => r.team_id)
		const j = i + d
		if (j < 0 || j >= ids.length) return
		;[ids[i], ids[j]] = [ids[j], ids[i]]
		save(ids)
	}

	return (
		<div className={own.groupBox}>
			<div className={own.stageHead}>
				<div className={own.roundTitle} style={{ margin: 0 }}>
					Group {group}
				</div>
				{manual && <span className={classes.hint}>places set manually</span>}
				<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.delete}`} disabled={!manual || orderState.isLoading} onClick={() => save(null)}>
					Auto order
				</button>
			</div>
			<div className={own.standings}>
				<div className={`${own.standRow} ${own.standHead}`}>
					<span>#</span>
					<span>Team</span>
					<span title="Played">P</span>
					<span>W</span>
					<span>D</span>
					<span>L</span>
					<span title="Maps won - lost">Maps</span>
					<span>Pts</span>
					<span />
				</div>
				{rows.map((r, i) => (
					<div key={r.team_id} className={`${own.standRow} ${r.place <= advance ? own.standAdv : ''}`}>
						<span>{r.place}</span>
						<TeamName team={r.team ?? { name_team: `#${r.team_id}` }} />
						<span>{r.played}</span>
						<span>{r.w}</span>
						<span>{r.d}</span>
						<span>{r.l}</span>
						<span>
							{r.maps_for}:{r.maps_against}
						</span>
						<b>{r.points}</b>
						<span className={own.standBtns}>
							<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.sq}`} onClick={() => move(i, -1)} disabled={i === 0 || orderState.isLoading} title="Up">
								↑
							</button>
							<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.sq}`} onClick={() => move(i, 1)} disabled={i === rows.length - 1 || orderState.isLoading} title="Down">
								↓
							</button>
						</span>
					</div>
				))}
			</div>
		</div>
	)
}

// Очки и число выходящих, затем переход в плейофф (предпросмотр посева и подтверждение)
const GroupControls = ({ stage, report, refetch }) => {
	const [win, setWin] = useState(stage.points?.win ?? 3)
	const [draw, setDraw] = useState(stage.points?.draw ?? 1)
	const [loss, setLoss] = useState(stage.points?.loss ?? 0)
	const [advance, setAdvance] = useState(stage.advance ?? 2)
	const [saveSettings, saveState] = useUpdateAdminStageSettingsMutation()
	const [toPlayoff, playoffState] = useAdminStageToPlayoffMutation()
	const [name, setName] = useState('Playoff')
	const [format, setFormat] = useState('BO3')
	const [third, setThird] = useState(false)
	const [playoffType, setPlayoffType] = useState('single')
	const [lowerStart, setLowerStart] = useState(false)
	const [gfReset, setGfReset] = useState(false)
	const [grandFinal, setGrandFinal] = useState(true)
	const [pairing, setPairing] = useState('cross')
	const [finalFormat, setFinalFormat] = useState('')
	const [preview, setPreview] = useState(null)

	useEffect(() => {
		setWin(stage.points?.win ?? 3)
		setDraw(stage.points?.draw ?? 1)
		setLoss(stage.points?.loss ?? 0)
		setAdvance(stage.advance ?? 2)
	}, [stage.points?.win, stage.points?.draw, stage.points?.loss, stage.advance])

	const dirty = Number(win) !== stage.points?.win || Number(draw) !== stage.points?.draw || Number(loss) !== stage.points?.loss || Number(advance) !== stage.advance

	const save = async () => {
		try {
			await saveSettings({ id: stage.id, points: { win: Number(win), draw: Number(draw), loss: Number(loss) }, advance: Number(advance) }).unwrap()
			report(true, 'Group settings saved')
			setPreview(null)
			refetch()
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	const load = async () => {
		try {
			setPreview(await toPlayoff({ id: stage.id, name, format, third_place: third, type: playoffType, grand_final_reset: gfReset && grandFinal, grand_final: grandFinal, lower_start: lowerStart, pairing, final_format: finalFormat || undefined }).unwrap())
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	const confirm = async () => {
		try {
			const res = await toPlayoff({ id: stage.id, name, format, third_place: third, type: playoffType, grand_final_reset: gfReset && grandFinal, grand_final: grandFinal, lower_start: lowerStart, pairing, final_format: finalFormat || undefined, confirm: true, force: preview.unfinished > 0 }).unwrap()
			report(true, `Playoff created: ${res.slots} slots`)
			setPreview(null)
			refetch()
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	const num = (value, set, min, max) => <input className={`${classes.input} ${own.ctl}`} type="number" min={min} max={max} value={value} onChange={(e) => set(e.target.value)} style={{ width: 80 }} />

	return (
		<div className={own.groupBox}>
			{stage.type !== 'gsl' && <div className={own.formRow}>
				<label className={own.field} style={{ minWidth: 0 }}>
					Win
					{num(win, setWin, 0, 20)}
				</label>
				<label className={own.field} style={{ minWidth: 0 }}>
					Draw
					{num(draw, setDraw, 0, 20)}
				</label>
				<label className={own.field} style={{ minWidth: 0 }}>
					Loss
					{num(loss, setLoss, -20, 20)}
				</label>
				<label className={own.field} style={{ minWidth: 0 }}>
					Advance from a group
					{num(advance, setAdvance, 1, 8)}
				</label>
				<button type="button" className={`${classes.btnDark} ${own.ctl}`} disabled={!dirty || saveState.isLoading} onClick={save}>
					Save settings
				</button>
			</div>}

			<div className={own.formRow} style={{ marginTop: 14 }}>
				<label className={own.field}>
					Playoff name
					<input className={`${classes.input} ${own.ctl}`} value={name} maxLength={100} onChange={(e) => setName(e.target.value)} />
				</label>
				<label className={own.field} style={{ minWidth: 0 }}>
					Format
					<select className={`${classes.input} ${own.ctl}`} value={format} onChange={(e) => setFormat(e.target.value)}>
						{FORMATS.map((f) => (
							<option key={f} value={f}>
								{f}
							</option>
						))}
					</select>
				</label>
				<label className={own.field} style={{ minWidth: 0 }}>
					Playoff type
					<select className={`${classes.input} ${own.ctl}`} value={playoffType} onChange={(e) => setPlayoffType(e.target.value)}>
						<option value="single">Single elimination</option>
						<option value="double">Double elimination</option>
					</select>
				</label>
				{playoffType === 'single' && (
					<label className={`${own.field} ${own.check}`}>
						<input type="checkbox" checked={third} onChange={(e) => setThird(e.target.checked)} /> Third place match
					</label>
				)}
				{playoffType === 'double' && (
					<label className={`${own.field} ${own.check}`} title="Teams that did not advance from the groups start in the lower bracket">
						<input type="checkbox" checked={lowerStart} onChange={(e) => setLowerStart(e.target.checked)} /> Others start in the lower bracket
					</label>
				)}
				<label className={own.field}>
					Final format
					<select className={`${classes.input} ${own.ctl}`} value={finalFormat} onChange={(e) => setFinalFormat(e.target.value)} title="Format of the final (grand final in double elimination)">
						<option value="">Same as other matches</option>
						{FORMATS.map((f) => (
							<option key={f} value={f}>
								{f}
							</option>
						))}
					</select>
				</label>
				<label className={own.field}>
					First round pairs
					<select className={`${classes.input} ${own.ctl}`} value={pairing} onChange={(e) => { setPairing(e.target.value); setPreview(null) }}>
						<option value="cross">Cross (1st place vs 2nd place of the neighbour group)</option>
						<option value="mirror">Mirror (A1-D2, B1-C2, C1-B2, D1-A2; 2 advance per group)</option>
					</select>
				</label>
				{playoffType === 'double' && (
					<label className={`${own.field} ${own.check}`} title="Off: winners of the upper and lower bracket finals both qualify (qualifier format)">
						<input type="checkbox" checked={grandFinal} onChange={(e) => setGrandFinal(e.target.checked)} /> Grand final
					</label>
				)}
				{playoffType === 'double' && grandFinal && (
					<label className={`${own.field} ${own.check}`} title="An extra grand final is played only if the lower bracket team wins the first one">
						<input type="checkbox" checked={gfReset} onChange={(e) => setGfReset(e.target.checked)} /> Grand final reset
					</label>
				)}
				<button type="button" className={`${classes.btn} ${own.ctl}`} disabled={dirty || !name.trim() || playoffState.isLoading} onClick={load} title={dirty ? 'Save the settings first' : 'Show the playoff seeding built from the group places'}>
					Preview playoff
				</button>
			</div>

			{preview && (
				<div className={own.seedsBox} style={{ marginTop: 12 }}>
					<div className={classes.hint}>
						Cross seeding from the current group places (check the places above first). After confirming, the seeding can still be fixed team by team in the new stage.
						{preview.unfinished > 0 && <b> {preview.unfinished} group matches are not finished yet.</b>}
					</div>
					{preview.pairs && <div className={classes.hint}>First round pairs, top to bottom: <b>{preview.pairs.join(', ')}</b></div>}
					<div className={own.seeds}>
						{preview.preview.map((s) => (
							<div key={s.seed} className={own.seedRow}>
								<span className={own.seedNum}>{s.seed}</span>
								<TeamName team={s.team} />
								<span className={own.spacer} />
								<span className={classes.hint}>{s.from}</span>
							</div>
						))}
					</div>
					<div className={own.formRow}>
						<button type="button" className={`${classes.btn} ${own.ctl}`} disabled={playoffState.isLoading} onClick={confirm}>
							{preview.unfinished > 0 ? 'Create playoff anyway' : 'Confirm and create playoff'}
						</button>
						<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={() => setPreview(null)}>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

// Швейцарка: рекорды команд и создание следующего раунда (пары подбираются автоматически, перед созданием их можно править)
const SwissPanel = ({ stage, report, refetch }) => {
	const [next, nextState] = useAdminStageSwissNextMutation()
	const [round, setRound] = useState(null)
	const [flat, setFlat] = useState([])
	const sw = stage.swiss
	const set = stage.settings ?? {}

	const played = useMemo(() => {
		const out = new Set()
		stage.slots.filter((s) => s.bracket === 'sw').forEach((s) => {
			if (s.a.team && s.b.team) out.add([s.a.team.team_id, s.b.team.team_id].sort((x, y) => x - y).join('-'))
		})
		return out
	}, [stage.slots])

	const teamMap = useMemo(() => {
		const m = {}
		sw.groups.forEach((g) => g.teams.forEach((t) => { m[t.team_id] = { ...t, w: g.w, l: g.l } }))
		return m
	}, [sw.groups])

	const active = useMemo(() => sw.groups.filter((g) => g.status === 'active').flatMap((g) => g.teams), [sw.groups])

	const open = async () => {
		try {
			const r = await next({ id: stage.id }).unwrap()
			setRound(r.round)
			setFlat(r.pairs.flatMap((p) => [p.a.team_id, p.b.team_id]))
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	const change = (i, id) =>
		setFlat((prev) => {
			const j = prev.indexOf(id)
			const out = [...prev]
			if (j >= 0) out[j] = prev[i]
			out[i] = id
			return out
		})

	const fmt = (a, b) => {
		const ra = teamMap[a]
		const rb = teamMap[b]
		const decider = [ra, rb].some((r) => r && (r.w === sw.wins - 1 || r.l === sw.losses - 1))
		return decider && set.decider_format ? set.decider_format : set.format
	}

	const confirm = async () => {
		try {
			await next({ id: stage.id, pairs: Array.from({ length: flat.length / 2 }, (_, k) => [flat[2 * k], flat[2 * k + 1]]) }).unwrap()
			report(true, `Round ${round} created`)
			setRound(null)
			refetch()
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	const STATUS_TEXT = { qualified: 'Advanced', out: 'Eliminated', active: 'Playing' }

	return (
		<div className={own.round}>
			<div className={own.roundTitle}>Records</div>
			{sw.groups.map((g) => (
				<div key={`${g.w}-${g.l}-${g.status}`} className={classes.hint} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', margin: '4px 0' }}>
					<b style={{ minWidth: 40 }}>{g.w}-{g.l}</b>
					<span>{STATUS_TEXT[g.status]}:</span>
					<span>{g.teams.map((t) => t.name_team).join(', ')}</span>
				</div>
			))}

			<div className={own.controls}>
				<button type="button" className={`${classes.btn} ${own.ctl}`} onClick={open} disabled={!sw.can_next || nextState.isLoading} title={sw.finished ? 'The stage is finished' : sw.can_next ? 'Pairs are picked by records: the strongest seed against the weakest one, without rematches' : 'Finish all matches of the current round first'}>
					{sw.finished ? 'Stage finished' : `Create round ${sw.last_round + 1}`}
				</button>
			</div>

			{round !== null && (
				<div className={own.round}>
					<div className={own.roundTitle}>Round {round}: check the pairs</div>
					<div className={classes.hint}>Pairs are picked automatically. To change a pair, choose another team: it swaps places with that team</div>
					{Array.from({ length: flat.length / 2 }, (_, k) => {
						const a = flat[2 * k]
						const b = flat[2 * k + 1]
						const rematch = played.has([a, b].sort((x, y) => x - y).join('-'))
						return (
							<div key={k} className={own.formRow} style={{ alignItems: 'center' }}>
								{[2 * k, 2 * k + 1].map((i) => (
									<select key={i} className={`${classes.input} ${own.ctl}`} value={flat[i]} onChange={(e) => change(i, Number(e.target.value))}>
										{active.map((t) => (
											<option key={t.team_id} value={t.team_id}>
												{t.name_team} ({teamMap[t.team_id].w}-{teamMap[t.team_id].l})
											</option>
										))}
									</select>
								))}
								<span className={classes.hint}>{fmt(a, b)}</span>
								{rematch && <span className={classes.hint} style={{ color: '#e8a33d' }}>Rematch</span>}
							</div>
						)
					})}
					<div className={own.controls}>
						<button type="button" className={`${classes.btn} ${own.ctl}`} onClick={confirm} disabled={nextState.isLoading}>
							Create round {round}
						</button>
						<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={() => setRound(null)}>
							Cancel
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

const StageCard = ({ stage, teams, report, refetch }) => {
	const [remove, removeState] = useDeleteAdminStageMutation()
	const [linkMatches, linkState] = useLinkAdminStageMatchesMutation()
	const [addSlot, addState] = useAddAdminStageSlotMutation()
	const [adding, setAdding] = useState(false)
	const isGroups = stage.type === 'groups' || stage.type === 'gsl'
	const sourceName = useMemo(() => Object.fromEntries(stage.slots.map((s) => [s.id, `${s.label} #${s.position}`])), [stage.slots])

	const rounds = useMemo(() => {
		const map = new Map()
		stage.slots.forEach((s) => {
			const isGroup = s.bracket.startsWith('g:')
			if (s.bracket === 'sw') {
				const k = `sw:${s.round}`
				if (!map.has(k)) map.set(k, { key: k, label: `Round ${s.round}`, slots: [] })
				map.get(k).slots.push(s)
				return
			}
			const key = isGroup ? `${s.bracket}:${s.round}` : s.bracket === 'third' ? 'third' : s.bracket === 'main' ? `r${s.round}` : `${s.bracket}:${s.round}`
			if (!map.has(key)) map.set(key, { key, label: isGroup && stage.type !== 'gsl' ? `${s.label} · Round ${s.round}` : isGroup ? `${s.label.replace(/ (Upper|Lower) Bracket( Final)?$/, '')} · Round ${s.round}` : s.label, slots: [] })
			map.get(key).slots.push(s)
		})
		return [...map.values()]
	}, [stage.slots, stage.type])

	const del = async () => {
		if (!window.confirm(`Delete the stage "${stage.name}" with all its slots? Created matches are not touched`)) return
		try {
			await remove(stage.id).unwrap()
			report(true, 'Stage deleted')
			refetch()
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	const link = async () => {
		try {
			const r = await linkMatches(stage.id).unwrap()
			const rest = r.skipped?.length ? `. Not linked: ${r.skipped.join('; ')}` : ''
			report(true, `Linked matches: ${r.linked}${rest}`)
			refetch()
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	return (
		<div className={`${classes.card} ${own.stage}`}>
			<div className={own.stageHead}>
				<div className={classes.title}>{stage.name}</div>
				<span className={classes.hint}>
					{isGroups ? `${stage.type === 'gsl' ? (stage.settings?.no_decider ? 'GSL groups (no decider)' : 'GSL groups') : 'Group stage'} · ${Object.keys(stage.standings).length} groups · ${stage.participants.length} teams · default ${stage.settings?.format ?? 'BO3'}` : `${stage.type === 'swiss' ? `Swiss · ${stage.settings?.wins} wins to advance, ${stage.settings?.losses} losses to be eliminated` : stage.type === 'custom' ? 'Custom bracket' : stage.type === 'double' ? 'Double elimination' : 'Single elimination'} · ${stage.participants.length} teams · default ${stage.settings?.format ?? 'BO3'}`}
					{stage.settings?.third_place ? ' · third place match' : ''}
					{stage.settings?.grand_final_reset ? ' · grand final reset' : ''}
					{stage.settings?.lower_start ? ' · lower bracket start' : ''}
				</span>
				<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.delete}`} onClick={link} disabled={linkState.isLoading} title="Attach already existing matches of this tournament to the slots by team pair and fill in the results">
					Link existing matches
				</button>
				<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={del} disabled={removeState.isLoading}>
					Delete stage
				</button>
			</div>

			{stage.type === 'swiss' && stage.swiss && <SwissPanel stage={stage} report={report} refetch={refetch} />}

			{isGroups && (
				<>
					{Object.entries(stage.standings).map(([group, rows]) => (
						<GroupTable key={group} stage={stage} group={group} rows={rows} report={report} refetch={refetch} />
					))}
					<GroupControls stage={stage} report={report} refetch={refetch} />
				</>
			)}

			<div className={own.controls}>
				<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={() => setAdding((v) => !v)}>
					{adding ? 'Hide the form' : 'Add slot'}
				</button>
			</div>
			{adding && (
				<SlotForm
					stage={stage}
					teams={teams}
					busy={addState.isLoading}
					onCancel={() => setAdding(false)}
					onSubmit={async (body) => {
						try {
							await addSlot({ id: stage.id, ...body }).unwrap()
							report(true, 'Slot added')
							refetch()
						} catch (e) {
							report(false, errorMessage(e))
						}
					}}
				/>
			)}

			{rounds.map((round) => (
				<div key={round.key} className={own.round}>
					<div className={own.roundTitle}>{round.label}</div>
					{round.slots.map((slot) => (
						<SlotRow key={slot.id} slot={slot} stage={stage} sourceName={sourceName} teams={teams} report={report} refetch={refetch} />
					))}
				</div>
			))}
		</div>
	)
}

// Форма нового этапа: тип, формат, посев (порядок команд = номер посева)
const NewStage = ({ tour, teams, report, refetch }) => {
	const [name, setName] = useState('Playoff')
	const [format, setFormat] = useState('BO3')
	const [third, setThird] = useState(false)
	const [reset, setReset] = useState(true)
	const [lowerStart, setLowerStart] = useState(false)
	const [grandFinal2, setGrandFinal2] = useState(true)
	const [qualifier2, setQualifier2] = useState(false)
	const [straightLower, setStraightLower] = useState(false)
	const [finalFormat2, setFinalFormat2] = useState('')
	const [byMatch, setByMatch] = useState(true)
	const [dragIdx, setDragIdx] = useState(null)
	const [seeds, setSeeds] = useState([])
	const [type, setType] = useState('single')
	const [groups, setGroups] = useState([
		{ name: 'A', teamIds: [] },
		{ name: 'B', teamIds: [] },
	])
	const [points, setPoints] = useState({ win: 3, draw: 1, loss: 0 })
	const [advance, setAdvance] = useState(2)
	const [noDecider, setNoDecider] = useState(false)
	const [swWins, setSwWins] = useState(3)
	const [swLosses, setSwLosses] = useState(3)
	const [deciderFormat, setDeciderFormat] = useState('')
	const [swRounds, setSwRounds] = useState('')
	const [swAdvance, setSwAdvance] = useState('')
	const [create, { isLoading }] = useCreateAdminStageMutation()

	const byId = useMemo(() => Object.fromEntries(teams.map((t) => [t.team_id, t])), [teams])
	const free = useMemo(() => teams.filter((t) => !seeds.includes(t.team_id)), [teams, seeds])
	const usedInGroups = useMemo(() => new Set(groups.flatMap((g) => g.teamIds)), [groups])
	const freeForGroups = useMemo(() => teams.filter((t) => !usedInGroups.has(t.team_id)), [teams, usedInGroups])
	const isGsl = type === 'gsl'
	const groupsReady = groups.length > 0 && (isGsl ? groups.every((g) => g.teamIds.length === 4) : groups.every((g) => g.teamIds.length >= 2) && Number(advance) >= 1 && groups.every((g) => Number(advance) < g.teamIds.length))

	const patchGroup = (i, fn) => setGroups((prev) => prev.map((g, k) => (k === i ? fn(g) : g)))
	const addGroup = () => setGroups((prev) => [...prev, { name: String.fromCharCode(65 + prev.length), teamIds: [] }])

	const move = (i, d) =>
		setSeeds((prev) => {
			const next = [...prev]
			const j = i + d
			if (j < 0 || j >= next.length) return prev
			;[next[i], next[j]] = [next[j], next[i]]
			return next
		})

	const isPow2 = (n) => n >= 2 && (n & (n - 1)) === 0
	// Бай в списке пар первого раунда - отрицательный номер (у настоящих команд id положительный)
	const isBye = (id) => id < 0
	const realSeeds = seeds.filter((id) => !isBye(id))
	const hasBye = seeds.length !== realSeeds.length
	// Порядок посева в первом раунде сетки на size мест: [1, 8, 4, 5, 2, 7, 3, 6] для 8
	const seedOrder = (size) => {
		let order = [1]
		for (let n = 2; n <= size; n *= 2) order = order.flatMap((x) => [x, n + 1 - x])
		return order
	}
	const arrange = (list) => {
		const order = seedOrder(list.length)
		const out = Array(list.length)
		list.forEach((id, k) => {
			out[order[k] - 1] = id
		})
		return out
	}
	// Режим "по матчам": список = матчи первого раунда сверху вниз, пара подряд = один матч
	const canPairs = (type === 'single' || type === 'double') && (type === 'double' && lowerStart ? seeds.length >= 8 && isPow2(seeds.length) : isPow2(seeds.length))
	const isSwiss = type === 'swiss'
	const swissInvalid = isSwiss && seeds.length > 0 && (seeds.length % 2 !== 0 || seeds.length < 4 || seeds.length > 64)
	const pairsMode = isSwiss || (byMatch && canPairs)
	// Режим "по матчам" включён, но число команд не подходит: создавать нельзя, чтобы пары не превратились в посев
	const twoByes = seeds.some((id, i) => i % 2 === 0 && isBye(id) && isBye(seeds[i + 1]))
	const byeNotAllowed = hasBye && !(type === 'single' && byMatch)
	const pairsInvalid = (byMatch && (type === 'single' || type === 'double') && seeds.length > 0 && !canPairs) || (hasBye && (twoByes || byeNotAllowed))
	const half = seeds.length / 2
	const pairsPayload = hasBye && type === 'single' && pairsMode ? Array.from({ length: seeds.length / 2 }, (_, k) => [seeds[2 * k], seeds[2 * k + 1]].map((id) => (isBye(id) ? null : id))) : undefined
	const seedsToSend = isSwiss ? seeds : hasBye ? realSeeds : pairsMode ? (type === 'double' && lowerStart ? [...arrange(seeds.slice(0, half)), ...arrange(seeds.slice(half))] : arrange(seeds)) : seeds
	const reorder = (from, to) =>
		setSeeds((prev) => {
			if (from === to || from == null) return prev
			const next = [...prev]
			const [item] = next.splice(from, 1)
			next.splice(to, 0, item)
			return next
		})

	const submit = async () => {
		try {
			const body =
				type === 'groups' || type === 'gsl'
					? { name_tour_sort: tour, type, name, format, groups: groups.map((g) => ({ name: g.name, team_ids: g.teamIds })), points: { win: Number(points.win), draw: Number(points.draw), loss: Number(points.loss) }, advance: Number(advance), no_decider: type === 'gsl' ? noDecider : undefined }
					: type === 'custom'
					? { name_tour_sort: tour, type, name, format }
					: isSwiss
					? { name_tour_sort: tour, type, name, format, decider_format: deciderFormat || undefined, wins: Number(swWins), losses: Number(swLosses), rounds: swRounds ? Number(swRounds) : undefined, advance: swAdvance ? Number(swAdvance) : undefined, team_ids: seeds }
					: { name_tour_sort: tour, type, name, format, third_place: third, grand_final_reset: reset && grandFinal2 && !qualifier2, grand_final: grandFinal2 && !qualifier2, qualifier: type === 'double' && qualifier2, straight_lower: type === 'double' && straightLower, lower_start: lowerStart, final_format: finalFormat2 || undefined, team_ids: seedsToSend, pairs: pairsPayload }
			const res = await create(body).unwrap()
			report(true, type === 'custom' ? 'Empty stage created: add matches with "Add slot"' : `Stage created: ${res.slots} slots`)
			setSeeds([])
			if (type === 'groups' || type === 'gsl') setGroups(groups.map((g) => ({ ...g, teamIds: [] })))
			refetch()
		} catch (e) {
			report(false, errorMessage(e))
		}
	}

	return (
		<div className={`${classes.card} ${own.stage}`}>
			<div className={classes.title}>New stage</div>

			<div className={own.formRow}>
				<label className={own.field}>
					Name
					<input className={`${classes.input} ${own.ctl}`} value={name} maxLength={100} onChange={(e) => setName(e.target.value)} />
				</label>
				<label className={own.field}>
					Type
					<select
						className={`${classes.input} ${own.ctl}`}
						value={type}
						onChange={(e) => {
							setType(e.target.value)
							setName(['single', 'double', 'custom'].includes(e.target.value) ? 'Playoff' : e.target.value === 'swiss' ? 'Swiss stage' : 'Group stage')
						}}>
						<option value="single">Single elimination</option>
						<option value="double">Double elimination (4, 8, 16, 32 teams)</option>
						<option value="groups">Groups (round robin)</option>
						<option value="gsl">Groups (GSL, 4 teams double elimination)</option>
						<option value="swiss">Swiss system</option>
						<option value="custom">Custom bracket (add matches by hand)</option>
					</select>
				</label>
				<label className={own.field}>
					Default format
					<select className={`${classes.input} ${own.ctl}`} value={format} onChange={(e) => setFormat(e.target.value)}>
						{FORMATS.map((f) => (
							<option key={f} value={f}>
								{f}
							</option>
						))}
					</select>
				</label>
				{(type === 'single' || type === 'double') && (
					<label className={own.field}>
						Final format
						<select className={`${classes.input} ${own.ctl}`} value={finalFormat2} onChange={(e) => setFinalFormat2(e.target.value)}>
							<option value="">Same as other matches</option>
							{FORMATS.map((f) => (
								<option key={f} value={f}>
									{f}
								</option>
							))}
						</select>
					</label>
				)}
				{isSwiss && (
					<>
						<label className={own.field}>
							Decider format
							<select className={`${classes.input} ${own.ctl}`} value={deciderFormat} onChange={(e) => setDeciderFormat(e.target.value)} title="Used when a win advances a team or a loss eliminates it">
								<option value="">Same as default</option>
								{FORMATS.map((f) => (
									<option key={f} value={f}>
										{f}
									</option>
								))}
							</select>
						</label>
						<label className={own.field}>
							Wins to advance
							<input className={`${classes.input} ${own.ctl}`} type="number" min={1} max={5} value={swWins} onChange={(e) => setSwWins(e.target.value)} style={{ width: 80 }} />
						</label>
						<label className={own.field}>
							Losses to be eliminated
							<input className={`${classes.input} ${own.ctl}`} type="number" min={1} max={5} value={swLosses} onChange={(e) => setSwLosses(e.target.value)} style={{ width: 80 }} />
						</label>
						<label className={own.field} title="Optional: the stage ends after this many rounds">
							Rounds (optional)
							<input className={`${classes.input} ${own.ctl}`} type="number" min={1} max={12} value={swRounds} onChange={(e) => setSwRounds(e.target.value)} style={{ width: 80 }} />
						</label>
						<label className={own.field} title="With the rounds limit: how many teams advance. The rest are decided by wins, losses, head to head, seed">
							Teams to advance
							<input className={`${classes.input} ${own.ctl}`} type="number" min={1} value={swAdvance} onChange={(e) => setSwAdvance(e.target.value)} style={{ width: 80 }} />
						</label>
					</>
				)}
				{type === 'single' && (
					<label className={`${own.field} ${own.check}`}>
						<input type="checkbox" checked={third} onChange={(e) => setThird(e.target.checked)} /> Third place match
					</label>
				)}
				{type === 'double' && (
					<label className={`${own.field} ${own.check}`} title="Off: winners of the upper and lower bracket finals both qualify (qualifier format)">
						<input type="checkbox" checked={grandFinal2} onChange={(e) => setGrandFinal2(e.target.checked)} /> Grand final
					</label>
				)}
				{type === 'double' && (
					<label className={`${own.field} ${own.check}`} title="No upper/lower/grand final: winners of the last upper round and the last lower round advance (8+ teams)">
						<input type="checkbox" checked={qualifier2} onChange={(e) => setQualifier2(e.target.checked)} /> Qualifier format (no finals)
					</label>
				)}
				{type === 'double' && grandFinal2 && !qualifier2 && (
					<label className={`${own.field} ${own.check}`}>
						<input type="checkbox" checked={reset} onChange={(e) => setReset(e.target.checked)} /> Grand final reset
					</label>
				)}
				{type === 'double' && (
					<label className={`${own.field} ${own.check}`}>
						<input type="checkbox" checked={lowerStart} onChange={(e) => setLowerStart(e.target.checked)} /> Second half of the seeding starts in the lower bracket
					</label>
				)}
				{type === 'double' && (
					<label className={`${own.field} ${own.check}`} title="Off: the losers of the upper bracket cross over every other lower round, so rematches come as late as possible. On: no cross-over, the loser of an upper match goes to the same half of the lower bracket (Liquipedia style)">
						<input type="checkbox" checked={straightLower} onChange={(e) => setStraightLower(e.target.checked)} /> Lower bracket without cross-over
					</label>
				)}
			</div>

			{(type === 'groups' || type === 'gsl') && (
				<div className={own.seedsBox}>
					<div className={own.formRow}>
						{!isGsl && ['win', 'draw', 'loss'].map((k) => (
							<label key={k} className={own.field} style={{ minWidth: 0 }}>
								{k === 'win' ? 'Win' : k === 'draw' ? 'Draw' : 'Loss'} (points)
								<input className={`${classes.input} ${own.ctl}`} type="number" style={{ width: 80 }} value={points[k]} onChange={(e) => setPoints((p) => ({ ...p, [k]: e.target.value }))} />
							</label>
						))}
						{isGsl && (
							<label className={`${own.field} ${own.check}`} title="No final lower bracket match: the winner of the winners match goes on as 1st, its loser as 2nd, the winner of the losers match as 3rd (3 teams advance from a group)">
								<input type="checkbox" checked={noDecider} onChange={(e) => setNoDecider(e.target.checked)} /> Without the decider match (3 advance)
							</label>
						)}
						{!isGsl && (
							<label className={own.field} style={{ minWidth: 0 }}>
								Advance from a group
								<input className={`${classes.input} ${own.ctl}`} type="number" min={1} max={8} style={{ width: 80 }} value={advance} onChange={(e) => setAdvance(e.target.value)} />
							</label>
						)}
						<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={addGroup} disabled={groups.length >= 16}>
							Add group
						</button>
					</div>
					{groups.map((g, i) => (
						<div key={i} className={own.groupBox}>
							<div className={own.stageHead}>
								<input className={`${classes.input} ${own.ctl}`} style={{ width: 80 }} value={g.name} maxLength={6} onChange={(e) => patchGroup(i, (x) => ({ ...x, name: e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase() }))} title="Group name" />
								<span className={classes.hint}>{g.teamIds.length} teams</span>
								<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.delete}`} onClick={() => setGroups((prev) => prev.filter((_, k) => k !== i))} disabled={groups.length <= 1}>
									Remove group
								</button>
							</div>
							<div style={{ maxWidth: 420 }}>
								<SearchSelect
									label="Add a team to the group"
									items={freeForGroups}
									value={null}
									getKey={(t) => t.team_id}
									getLabel={(t) => t.name_team}
									onSelect={(t) => t && patchGroup(i, (x) => ({ ...x, teamIds: [...x.teamIds, t.team_id] }))}
									placeholder="Start typing a team name"
								/>
							</div>
							<div className={own.seeds}>
								{g.teamIds.map((id) => (
									<div key={id} className={own.seedRow}>
										<span className={own.seedNum}>{g.teamIds.indexOf(id) + 1}</span>
										<TeamName team={byId[id] ?? { name_team: `#${id}` }} />
										<span className={own.spacer} />
										{isGsl && (
											<>
												<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.sq}`} disabled={g.teamIds.indexOf(id) === 0} onClick={() => patchGroup(i, (x) => { const a = [...x.teamIds]; const k = a.indexOf(id); [a[k - 1], a[k]] = [a[k], a[k - 1]]; return { ...x, teamIds: a } })} title="Up">
													↑
												</button>
												<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.sq}`} disabled={g.teamIds.indexOf(id) === g.teamIds.length - 1} onClick={() => patchGroup(i, (x) => { const a = [...x.teamIds]; const k = a.indexOf(id); [a[k + 1], a[k]] = [a[k], a[k + 1]]; return { ...x, teamIds: a } })} title="Down">
													↓
												</button>
											</>
										)}
										<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.sq}`} onClick={() => patchGroup(i, (x) => ({ ...x, teamIds: x.teamIds.filter((t) => t !== id) }))} title="Remove">
											✕
										</button>
									</div>
								))}
							</div>
						</div>
					))}
					<div className={classes.hint}>
						{isGsl
							? 'GSL: the order of teams in a group is the seeding (1st plays 4th, 2nd plays 3rd). Winners of the opening matches meet in the winners match, losers in the losers match; the loser of the winners match plays the winner of the losers match. The winner of the winners match and the winner of that decider advance. With "Without the decider match" there is no last match: the winner of the winners match is 1st, its loser 2nd, the winner of the losers match 3rd, and these three advance'
							: 'Every team plays everyone in its group once. '}
						Matches are created as slots: set the date and time of each, then create the real match from it
					</div>
				</div>
			)}

			{(type === 'single' || type === 'double' || isSwiss) && <div className={own.seedsBox}>
				<div className={own.seedsHead}>
					<div style={{ flex: '1 1 280px', maxWidth: 420 }}>
						<SearchSelect
							label="Add a team to the seeding"
							items={free}
							value={null}
							getKey={(t) => t.team_id}
							getLabel={(t) => t.name_team}
							onSelect={(t) => t && setSeeds((prev) => [...prev, t.team_id])}
							placeholder="Start typing a team name"
						/>
					</div>
					<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={() => setSeeds(teams.map((t) => t.team_id))} disabled={teams.length === 0}>
						Add all tournament teams
					</button>
					<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={() => setSeeds([])} disabled={seeds.length === 0}>
						Clear
					</button>
					<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={() => setByMatch((v) => { if (v) setSeeds((prev) => prev.filter((x) => !isBye(x))); return !v })} style={isSwiss ? { display: 'none' } : undefined} disabled={type !== 'single' && type !== 'double'} title="Switch between the seed list and the list of first round matches (every two teams in a row play each other)">
						{byMatch && (type === 'single' || type === 'double') ? 'List mode: first round matches' : 'List mode: seeds'}
					</button>
					{type === 'single' && byMatch && (
						<button type="button" className={`${classes.btnDark} ${own.ctl}`} onClick={() => setSeeds((prev) => [...prev, -(Math.max(0, ...prev.filter(isBye).map((x) => -x)) + 1)])} title="Add a bye: the team in the same pair goes to the next round without playing">
							Add bye
						</button>
					)}
				</div>

				{isSwiss && <div className={classes.hint}>{seeds.length === 0 ? 'Add teams in the order of the first round matches: every two teams in a row play each other. ' : ''}The list order is also the seeding: the later rounds are paired by records, the strongest seed against the weakest one. An even number of teams is needed (4 to 64); 8, 16 or 32 teams work best. Next rounds are created from the stage card after the previous round is finished</div>}
				{isSwiss && (!!swRounds !== !!swAdvance) && <div className={classes.hint}>Fill in both the rounds and the teams to advance, or leave both empty</div>}
				{swissInvalid && <div className={classes.hint}>The number of teams must be even, from 4 to 64</div>}
				{type === 'double' && <div className={classes.hint}>Double elimination needs exactly 4, 8, 16 or 32 teams. With the lower bracket start (8, 16 or 32 teams) the first half of the seeding starts in the upper bracket and the second half starts in the lower one, e.g. group places 3-4. Losers of the upper bracket drop into the lower bracket; with the reset option the extra grand final is played only if the lower bracket team wins the first one</div>}
				{seeds.length === 0 && byMatch && (type === 'single' || type === 'double') && <div className={classes.hint}>Add teams in the order of the first round matches: every two teams in a row play each other (the first two are match 1, the next two are match 2, and so on). Needs 2, 4, 8, 16 or 32 teams</div>}
				{pairsInvalid && <div className={classes.hint}>{twoByes ? 'A pair cannot consist of two byes. ' : ''}{byeNotAllowed ? 'Byes are only for single elimination in the first round matches mode. ' : ''}The list of first round matches needs 2, 4, 8, 16 or 32 places{type === 'double' && lowerStart ? ' (8, 16 or 32 with the lower bracket start)' : ''}{type === 'single' ? ', byes included: use Add bye for a team that skips round 1' : ''}</div>}
				{seeds.length === 0 && !isSwiss && !(byMatch && (type === 'single' || type === 'double')) && <div className={classes.hint}>Add teams in the order of their seeds: the first team is seed 1 and meets the weakest seed in round 1. With fewer teams than the bracket size, top seeds get a bye</div>}
				{pairsMode && <div className={classes.hint}>Every two teams in a row are one first round match, from top to bottom. Drag rows to rearrange{type === 'double' && lowerStart ? '. The first half is the upper bracket, the second half starts in the lower bracket' : ''}</div>}
				<div className={own.seeds}>
					{seeds.map((id, i) => {
						const sectionLabel = pairsMode && type === 'double' && lowerStart ? (i < half ? 'U' : 'L') : ''
						const mNum = Math.floor((i < half || !(type === 'double' && lowerStart) ? i : i - half) / 2) + 1
						return (
							<div
								key={id}
								className={own.seedRow}
								draggable
								onDragStart={() => setDragIdx(i)}
								onDragOver={(e) => e.preventDefault()}
								onDrop={() => {
									reorder(dragIdx, i)
									setDragIdx(null)
								}}
								onDragEnd={() => setDragIdx(null)}
								style={{ cursor: 'grab', opacity: dragIdx === i ? 0.4 : 1, marginTop: pairsMode && i % 2 === 0 && i > 0 ? 8 : 0 }}>
								<span className={classes.hint} aria-hidden="true">⋮⋮</span>
								<span className={own.seedNum}>{pairsMode ? `${sectionLabel}${mNum}` : i + 1}</span>
								{isBye(id) ? <span className={classes.hint}>BYE: the team in this pair goes to the next round</span> : <TeamName team={byId[id] ?? { name_team: `#${id}` }} />}
								<span className={own.spacer} />
								<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.sq}`} onClick={() => move(i, -1)} disabled={i === 0} title="Up">
									↑
								</button>
								<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.sq}`} onClick={() => move(i, 1)} disabled={i === seeds.length - 1} title="Down">
									↓
								</button>
								<button type="button" className={`${classes.btnDark} ${own.ctl} ${own.sq}`} onClick={() => setSeeds((prev) => prev.filter((x) => x !== id))} title="Remove">
									✕
								</button>
							</div>
						)
					})}
				</div>
			</div>}

			<div className={own.formRow}>
				<button type="button" className={`${classes.btn} ${own.ctl}`} onClick={submit} disabled={isLoading || !name.trim() || pairsInvalid || swissInvalid || (isSwiss ? seeds.length < 4 || !!swRounds !== !!swAdvance || !(Number(swWins) >= 1 && Number(swLosses) >= 1) : type === 'custom' ? false : type === 'single' ? realSeeds.length < 2 : type === 'double' ? ![lowerStart ? 8 : 4, 8, 16, 32].includes(seeds.length) || (lowerStart && seeds.length < 8) : !groupsReady)}>
					{isLoading ? 'Generating...' : type === 'custom' ? 'Create empty stage' : isSwiss ? `Generate round 1 (${seeds.length} teams)` : type === 'single' || type === 'double' ? `Generate bracket (${realSeeds.length} teams)` : `Generate groups (${usedInGroups.size} teams)`}
				</button>
			</div>
		</div>
	)
}

// Stages: этапы турнира и слоты сетки (расписание). Реальные матчи создаются из слотов, победители продвигаются по счёту матча
const StagesPage = () => {
	const tours = useGetTournamentsQuery()
	const [tour, setTour] = useState('')
	const [status, setStatus] = useState(null)
	const { data, isFetching, isError, refetch } = useGetAdminStagesQuery(tour, { skip: !tour })

	const report = (ok, text) => setStatus({ ok, text })
	const current = (tours.data ?? []).find((t) => t.name_tour_sort === tour)

	return (
		<div className={`${classes.card} ${classes.page}`} style={{ minHeight: 520 }}>
			<div className={classes.title}>Stages and bracket</div>

			<div className={classes.row} style={{ alignItems: 'flex-end', margin: '12px 0' }}>
				<div style={{ flex: '1 1 320px', maxWidth: 480 }}>
					<SearchSelect
						label="Tournament"
						items={tours.data ?? []}
						value={tour}
						getKey={(t) => t.name_tour_sort}
						getLabel={(t) => t.name_tour}
						renderItem={(t) => (
							<span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
								{tourLogo(t)}
								{t.name_tour}
							</span>
						)}
						onSelect={(t) => {
							setTour(t?.name_tour_sort ?? '')
							setStatus(null)
						}}
						placeholder="Start typing a tournament"
					/>
				</div>
				{current && tourLogo(current, 36)}
				{tour && <RefreshButton onClick={refetch} spinning={isFetching} />}
			</div>

			{status && (
				<div className={status.ok ? classes.ok : classes.error} style={{ position: 'sticky', top: 8, zIndex: 5 }}>
					{status.text}
				</div>
			)}
			{isError && <div className={classes.error}>Failed to load the stages (is tournament_stages.sql applied?)</div>}

			{data && data.conflicts.length > 0 && (
				<div className={own.conflicts}>
					<b>Check these slots:</b>
					{data.conflicts.map((c, i) => (
						<div key={i}>
							{c.label}: {c.message}
						</div>
					))}
				</div>
			)}

			{tour && data && (
				<div className={own.list} style={{ opacity: isFetching ? 0.6 : 1 }}>
					{data.stages.map((stage) => (
						<StageCard key={stage.id} stage={stage} teams={data.teams} report={report} refetch={refetch} />
					))}
					<NewStage tour={tour} teams={data.teams} report={report} refetch={refetch} />
				</div>
			)}
		</div>
	)
}

export default StagesPage
