import React, { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import classes from './addShortMatches.module.css'
import { useCreateAdminShortMatchesMutation, useDeleteAdminShortMatchMutation, useGetShortMatchesByTournamentQuery, useGetTournamentsQuery } from '../../../store/api/apiSlice'
import TeamSelector from '../../UI/TeamSelector/teamSelector'

// Дата турнира -> 'YYYY-MM-DD' (если пришёл ISO с временем — берём локальную дату, чтобы не съехать на день)
const toDate = (value) => {
	if (!value) return ''
	const str = String(value)
	if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str
	const date = new Date(str)
	return isNaN(date) ? '' : date.toLocaleDateString('en-CA')
}

// 'Alpha 7' + 'Good Fellas' + '2026-10-17' -> 'Alpha7GoodFellas_17_10_26' (убираем только пробелы, как в базе)
const makeMatchName = (team1, team2, date) => {
	if (!team1 || !team2 || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return ''
	const [y, m, d] = date.split('-')
	return `${team1.name_team.replace(/\s+/g, '')}${team2.name_team.replace(/\s+/g, '')}_${d}_${m}_${y.slice(2)}`
}

const FORMATS = ['BO1', 'BO2', 'BO3', 'BO5']
const DEFAULT_STAGES = ['Group Stage', 'Group A', 'Group B', 'Group C', 'Group D', 'Playoff', 'Playoff Upper', 'Playoff Lower', 'Grand Final']

const AddShortMatches = () => {
	const listTours = useGetTournamentsQuery()

	const [tourFilter, setTourFilter] = useState('')
	const [tour, setTour] = useState(null)
	const [slots, setSlots] = useState([])
	const [createMatches, { isLoading: isSaving }] = useCreateAdminShortMatchesMutation()
	const [status, setStatus] = useState(null) // { ok: bool, text }
	const { admin } = useOutletContext()
	const [deleteMatch] = useDeleteAdminShortMatchMutation()
	const [deleteStatus, setDeleteStatus] = useState(null)

	const tourMatches = useGetShortMatchesByTournamentQuery({ name: tour?.name_tour_sort }, { skip: !tour, refetchOnMountOrArgChange: true })

	// Названия стадий: уже использованные в этом турнире + стандартные
	const stages = useMemo(() => {
		const set = new Set((tourMatches.data ?? []).map((m) => m.name_stage).filter(Boolean))
		DEFAULT_STAGES.forEach((s) => set.add(s))
		return [...set]
	}, [tourMatches.data])

	const existingNames = useMemo(() => new Set((tourMatches.data ?? []).map((m) => m.name_match_for_sort)), [tourMatches.data])

	const filteredTours = (listTours.data ?? []).filter((e) => e.name_tour_sort?.toLowerCase().includes(tourFilter.toLowerCase()))

	// Новый матч наследует формат/стадию/дату/время/ссылку от предыдущего — обычно они совпадают
	const makeSlot = (prev) => ({
		team1: null,
		team2: null,
		format: prev?.format ?? 'BO3',
		stage: prev?.stage ?? '',
		date: prev?.date ?? toDate(tour?.date_start),
		time: prev?.time ?? '',
		link: prev?.link ?? '',
	})

	const handleCount = (event) => {
		const count = Math.max(0, Math.min(64, Number(event.target.value) || 0))
		setSlots((prev) => {
			if (count <= prev.length) return prev.slice(0, count)
			const next = [...prev]
			while (next.length < count) next.push(makeSlot(next[next.length - 1]))
			return next
		})
		setStatus(null)
	}

	const selectTour = (e) => {
		setTour(e)
		// Если матчи ещё пустые — подставляем дату старта нового турнира
		setSlots((prev) => prev.map((slot) => (slot.team1 || slot.team2 ? slot : { ...slot, date: toDate(e.date_start) })))
		setStatus(null)
	}

	const updateSlot = (index, patch) => {
		setSlots((prev) => prev.map((slot, i) => (i === index ? { ...slot, ...patch } : slot)))
		setStatus(null)
	}

	const names = slots.map((s) => makeMatchName(s.team1, s.team2, s.date))
	const duplicateNames = new Set(names.filter((n, i) => n && names.indexOf(n) !== i))

	const getError = (slot, name) => {
		if (slot.team1 && slot.team2 && slot.team1.team_id === slot.team2.team_id) return 'Same team twice'
		if (name && duplicateNames.has(name)) return 'Duplicate in the list'
		if (name && existingNames.has(name)) return 'Already in the tournament'
		return ''
	}

	const isSlotFilled = (slot) => slot.team1 && slot.team2 && slot.format && slot.stage.trim() && /^\d{4}-\d{2}-\d{2}$/.test(slot.date) && /^\d{2}:\d{2}/.test(slot.time)

	const isReady =
		tour &&
		slots.length > 0 &&
		slots.every(isSlotFilled) &&
		slots.every((slot, i) => !getError(slot, names[i]))

	// Удаление матча (только суперадмин). Если по матчу внесены карты, сервер просит подтверждение и удаляет их вместе с матчем
	const handleDelete = async (match) => {
		const label = `${match.name_match_for_sort} (${match.team1} — ${match.team2})`
		if (!window.confirm(`Delete match ${label}?`)) return
		setDeleteStatus(null)
		try {
			await deleteMatch({ id: match.id }).unwrap()
		} catch (error) {
			if (error?.data?.code === 'has_maps') {
				if (!window.confirm(`This match has ${error.data.maps} entered map(s). Delete the match together with its maps? Ratings and stats are not recalculated.`)) return
				try {
					await deleteMatch({ id: match.id, withMaps: true }).unwrap()
				} catch (e) {
					setDeleteStatus({ ok: false, text: e?.data?.message || 'Failed to delete the match' })
					return
				}
			} else {
				setDeleteStatus({ ok: false, text: error?.data?.message || 'Failed to delete the match' })
				return
			}
		}
		setDeleteStatus({ ok: true, text: `Deleted: ${label}` })
		tourMatches.refetch()
	}

	const submit = async () => {
		if (!isReady || isSaving) return
		setStatus(null)
		try {
			const result = await createMatches({
				name_tour_sort: tour.name_tour_sort,
				matches: slots.map((slot) => ({
					team1_id: slot.team1.team_id,
					team2_id: slot.team2.team_id,
					format: slot.format,
					stage: slot.stage.trim(),
					date: slot.date,
					time: slot.time.slice(0, 5),
					link: slot.link.trim() || null,
				})),
			}).unwrap()
			setStatus({ ok: true, text: `Matches created: ${result.created.length}` })
			setSlots([])
			tourMatches.refetch()
		} catch (error) {
			setStatus({ ok: false, text: error?.data?.message || 'Failed to create matches, try again' })
		}
	}

	return (
		<div className={classes.wrapperPage}>
			<div className={classes.wrapperMenu}>

				<div className={classes.wrapperList}>
					<div className={classes.titleBox}>Tournament:</div>
					<input type="text" placeholder="Search" value={tourFilter} onChange={(e) => setTourFilter(e.target.value)} className={classes.inputData} />
					<div className={classes.list}>
						{filteredTours.map((e) => (
							<div key={e.id} className={classes.item} style={{ background: tour?.id === e.id ? '#7db489' : undefined }} onClick={() => selectTour(e)}>
								{e.name_tour_sort}
							</div>
						))}
					</div>
				</div>

				<div className={classes.wrapperInfo}>
					<div className={classes.titleBox}>Selected:</div>
					<div className={classes.infoText}>{tour ? `${tour.name_tour} (${toDate(tour.date_start)} — ${toDate(tour.date_end)})` : '—'}</div>
					{tour && <div className={classes.infoMuted}>Matches already in the tournament: {tourMatches.data?.length ?? '…'}</div>}
					<div className={classes.titleBox}>Matches count:</div>
					<input type="number" min="0" max="64" value={slots.length || ''} onChange={handleCount} className={classes.inputData} />
				</div>

				<div className={`${classes.btnEnter} ${isReady && !isSaving ? '' : classes.btnDisabled}`} onClick={submit}>
					{isSaving ? 'Saving...' : 'Create'}
				</div>
				{status && <div className={classes.infoText} style={{ color: status.ok ? '#7db489' : '#bd5d5d' }}>{status.text}</div>}
			</div>

			<div className={classes.wrapperMatches}>
				{slots.map((slot, index) => {
					const name = names[index]
					const error = getError(slot, name)
					return (
						<div key={index} className={classes.match}>
							<div className={classes.number}>{index + 1}</div>
							<div className={`${classes.field} ${classes.fieldTeam}`}>
								<TeamSelector label="Team 1" onSelect={(team) => updateSlot(index, { team1: team })} />
							</div>
							<div className={`${classes.field} ${classes.fieldTeam}`}>
								<TeamSelector label="Team 2" onSelect={(team) => updateSlot(index, { team2: team })} />
							</div>
							<div className={`${classes.field} ${classes.fieldFormat}`}>
								<div className={classes.titleBox}>Format</div>
								<select value={slot.format} onChange={(e) => updateSlot(index, { format: e.target.value })} className={classes.inputData}>
									{FORMATS.map((f) => (
										<option key={f} value={f}>
											{f}
										</option>
									))}
								</select>
							</div>
							<div className={`${classes.field} ${classes.fieldStage}`}>
								<div className={classes.titleBox}>Stage</div>
								<input type="text" list="matchStages" value={slot.stage} onChange={(e) => updateSlot(index, { stage: e.target.value })} className={classes.inputData} />
							</div>
							<div className={`${classes.field} ${classes.fieldDate}`}>
								<div className={classes.titleBox}>Date</div>
								<input type="date" value={slot.date} onChange={(e) => updateSlot(index, { date: e.target.value })} className={classes.inputData} />
							</div>
							<div className={`${classes.field} ${classes.fieldTime}`}>
								<div className={classes.titleBox}>Time (MSK)</div>
								<input type="time" value={slot.time} onChange={(e) => updateSlot(index, { time: e.target.value })} className={classes.inputData} />
							</div>
							<div className={`${classes.field} ${classes.fieldLink}`}>
								<div className={classes.titleBox}>Link</div>
								<input type="text" placeholder="https://" value={slot.link} onChange={(e) => updateSlot(index, { link: e.target.value })} className={classes.inputData} />
							</div>
							<div className={classes.matchFooter}>
								<span className={classes.matchName}>{name || '—'}</span>
								{error && <span className={classes.warning}>{error}</span>}
							</div>
						</div>
					)
				})}
				{admin?.is_super && tour && (tourMatches.data ?? []).length > 0 && (
					<div className={classes.match} style={{ flexDirection: 'column', alignItems: 'stretch' }}>
						<div className={classes.titleBox}>Tournament matches (delete, super admin only):</div>
						{deleteStatus && <div style={{ color: deleteStatus.ok ? '#7db489' : '#bd5d5d' }}>{deleteStatus.text}</div>}
						{(tourMatches.data ?? []).map((m) => (
							<div key={m.id} className={classes.matchFooter} style={{ justifyContent: 'space-between' }}>
								<span className={classes.matchName}>
									{m.name_match_for_sort} — {m.name_stage}
								</span>
								<span className={classes.warning} style={{ cursor: 'pointer' }} onClick={() => handleDelete(m)}>
									Delete
								</span>
							</div>
						))}
					</div>
				)}
				<datalist id="matchStages">
					{stages.map((s) => (
						<option key={s} value={s} />
					))}
				</datalist>
			</div>

		</div>
	)
}

export default AddShortMatches
