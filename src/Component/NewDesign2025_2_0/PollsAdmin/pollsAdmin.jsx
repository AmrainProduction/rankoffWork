import React, { useMemo, useState } from 'react'
import classes from './pollsAdmin.module.css'
import {
	useCreateAdminPollMutation,
	useDeleteAdminPollMutation,
	useGetPollQuery,
	useGetPollsQuery,
	useGetTeamsTournamentsQuery,
	useGetTournamentsQuery,
	useLazyGetAdminPollResultsQuery,
	useUpdateAdminPollMutation,
} from '../../../store/api/apiSlice'
import PlayerSelector from '../../UI/PlayerSelector/playerSelector'
import TeamSelector from '../../UI/TeamSelector/teamSelector'

// <input type="datetime-local"> ('2026-11-10T18:00') -> '2026-11-10 18:00:00' (время по Москве, как в базе)
const toApiDateTime = (local) => `${local.replace('T', ' ')}:00`
// Ответ API ('2026-11-10 18:00:00') -> значение для <input type="datetime-local">
const toLocalInput = (value) => (value ? String(value).slice(0, 16).replace(' ', 'T') : '')

const optionKey = (option) => (option.kind === 'team' ? `t${option.team_id}` : `p${option.player_id}`)
// Сервер сам берёт ник, фото и команду из своих таблиц: ему нужен только id игрока или команды
const optionApiId = (option) => (option.kind === 'team' ? option.team_id : option.player_id)

const fromPlayer = (p) => ({ kind: 'player', player_id: p.player_id, nickname: p.nickname, logo_player: p.logo_player, team: p.team, team_id: p.team_id, back_logo_team: p.back_logo_team, country_flag: p.country_flag })
const fromTeam = (t) => ({ kind: 'team', team_id: t.team_id, team: t.name_team, back_logo_team: t.logo_team })

// Вариант из базы (ответ /polls/{id}) -> тот же вид
const fromApiOption = (type, o) => (type === 'team' ? { ...fromTeam({ team_id: o.team_id, name_team: o.team, logo_team: o.back_logo_team }), id: o.id } : { ...fromPlayer(o), id: o.id })

// Текст ошибки запроса к серверу
const apiError = (error) => {
	if (!error) return ''
	if (error.status === 401) return 'Session expired — reload the page and sign in again'
	if (error.status === 403) return error.data?.message || 'No permission for polls'
	return error.data?.message || 'Request failed, try again'
}

// ---------- Варианты ответа ----------
const OptionChip = ({ option, onRemove, removed, label }) => (
	<div className={`${classes.chip} ${removed ? classes.chipRemoved : ''}`}>
		{option.kind === 'team' ? (
			<img src={`/images/LogoTeams/${option.back_logo_team}`} alt="" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
		) : (
			<img src={`/images/LogoPlayers/${option.logo_player}`} alt="" onError={(e) => (e.currentTarget.style.visibility = 'hidden')} />
		)}
		<span>{option.kind === 'team' ? option.team : option.nickname}</span>
		{label && <small>{label}</small>}
		<div className={classes.chipBtn} onClick={onRemove}>
			{removed ? 'Undo' : '×'}
		</div>
	</div>
)

// Добавление новых вариантов: игроки по одному или (для команд) все участники турнира сразу
const OptionsPicker = ({ type, tour, items, setItems, takenKeys }) => {
	const teamsTours = useGetTeamsTournamentsQuery()
	const [selectorKey, setSelectorKey] = useState(0)
	const [notice, setNotice] = useState('')

	const add = (list) => {
		const seen = new Set([...takenKeys, ...items.map(optionKey)])
		const fresh = list.filter((o) => {
			const key = optionKey(o)
			if (seen.has(key)) return false
			seen.add(key)
			return true
		})
		setNotice(fresh.length < list.length ? `Duplicates skipped: ${list.length - fresh.length}` : '')
		if (fresh.length) setItems([...items, ...fresh])
		setSelectorKey((k) => k + 1) // сбрасывает поле поиска
	}

	const addAllTourTeams = () => {
		if (!tour) return
		const rows = (teamsTours.data ?? []).filter((row) => row.name_tour_sort === tour.name_tour_sort)
		add(rows.map((row) => fromTeam({ team_id: row.team_id, name_team: row.name_team, logo_team: row.logo_team })))
	}

	return (
		<div className={classes.optionsBlock}>
			<div className={classes.pickerRow}>
				{type === 'team' ? <TeamSelector key={selectorKey} label="Add team:" onSelect={(team) => add([fromTeam(team)])} /> : <PlayerSelector key={selectorKey} label="Add player:" onSelect={(player) => add([fromPlayer(player)])} />}
				{type === 'team' && (
					<div className={`${classes.btnSmall} ${tour ? '' : classes.btnDisabled}`} onClick={addAllTourTeams}>
						Add all teams of the tournament
					</div>
				)}
			</div>
			{notice && <div className={classes.warning}>{notice}</div>}
			{items.length > 0 && (
				<div className={classes.chips}>
					{items.map((option) => (
						<OptionChip key={optionKey(option)} option={option} onRemove={() => setItems(items.filter((o) => optionKey(o) !== optionKey(option)))} />
					))}
				</div>
			)}
		</div>
	)
}

// Выбор турнира, к которому привязано голосование
const TourPicker = ({ tours, tour, onSelect }) => {
	const [filter, setFilter] = useState('')
	const filtered = (tours ?? []).filter((e) => e.name_tour_sort?.toLowerCase().includes(filter.toLowerCase()))

	return (
		<div className={classes.wrapperList}>
			<div className={classes.titleBox}>Tournament (shown on its page):</div>
			<input type="text" placeholder="Search" value={filter} onChange={(e) => setFilter(e.target.value)} className={classes.inputData} />
			<div className={classes.list}>
				{filtered.map((e) => (
					<div key={e.id} className={classes.item} style={{ background: tour?.name_tour_sort === e.name_tour_sort ? '#7db489' : undefined }} onClick={() => onSelect(e)}>
						{e.name_tour_sort}
					</div>
				))}
			</div>
		</div>
	)
}

// Блок действия: заголовок, предупреждение, кнопка, результат запроса
const ActionBlock = ({ title, warning, children }) => (
	<div className={classes.sqlBlock}>
		<div className={classes.resultsHeader}>
			<div className={classes.sectionTitle}>{title}</div>
			<div className={classes.actions}>{children}</div>
		</div>
		{warning && <div className={classes.warning}>{warning}</div>}
	</div>
)

const ActionButton = ({ onClick, disabled, loading, children }) => (
	<div className={`${classes.btnSmall} ${disabled || loading ? classes.btnDisabled : ''}`} onClick={disabled || loading ? undefined : onClick}>
		{loading ? 'Working...' : children}
	</div>
)

// Общие поля голосования
const PollFields = ({ form, setForm }) => (
	<div className={classes.fields}>
		<div className={classes.field}>
			<div className={classes.titleBox}>Title:</div>
			<input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={classes.inputData} />
		</div>
		<div className={classes.field}>
			<div className={classes.titleBox}>Description (question):</div>
			<input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={classes.inputData} />
		</div>
		<div className={classes.field}>
			<div className={classes.titleBox}>Starts (MSK):</div>
			<input type="datetime-local" value={form.starts} onChange={(e) => setForm({ ...form, starts: e.target.value })} className={classes.inputData} />
		</div>
		<div className={classes.field}>
			<div className={classes.titleBox}>Ends (MSK):</div>
			<input type="datetime-local" value={form.ends} onChange={(e) => setForm({ ...form, ends: e.target.value })} className={classes.inputData} />
		</div>
	</div>
)

const datesError = (form) => {
	if (!form.starts || !form.ends) return 'Set the start and end dates'
	if (form.ends <= form.starts) return 'The end must be later than the start'
	return ''
}

const emptyForm = () => ({ title: '', description: '', starts: '', ends: '' })

// ---------- Создание голосования ----------
const CreatePoll = ({ tours }) => {
	const [type, setType] = useState('team')
	const [form, setForm] = useState(emptyForm())
	const [tour, setTour] = useState(null)
	const [items, setItems] = useState([])
	const [createdId, setCreatedId] = useState(null)
	const [createPoll, { isLoading, error, reset }] = useCreateAdminPollMutation()

	const validation = !form.title.trim() ? 'Enter a title' : datesError(form) || (items.length < 2 ? 'At least 2 options are required' : '')

	const touch = (fn) => (...args) => {
		fn(...args)
		setCreatedId(null)
		reset()
	}

	const submit = async () => {
		try {
			const result = await createPoll({
				title: form.title.trim(),
				description: form.description.trim(),
				starts_at: toApiDateTime(form.starts),
				ends_at: toApiDateTime(form.ends),
				name_tour_sort: tour?.name_tour_sort ?? null,
				type,
				options: items.map(optionApiId),
			}).unwrap()
			setCreatedId(result.id)
			setForm(emptyForm())
			setItems([])
			setTour(null)
		} catch {}
	}

	return (
		<>
			<div className={classes.wrapperMenu}>
				<TourPicker tours={tours} tour={tour} onSelect={touch(setTour)} />
				<div className={classes.wrapperInfo}>
					<div className={classes.titleBox}>Type:</div>
					<select
						value={type}
						onChange={(e) => {
							touch(setType)(e.target.value)
							setItems([]) // варианты другого типа не подходят
						}}
						className={`${classes.inputData} ${classes.select}`}>
						<option value="team">Team (e.g. tournament champion)</option>
						<option value="player">Player (e.g. MVP)</option>
					</select>
					<div className={classes.titleBox}>Selected tournament:</div>
					<div className={classes.infoText}>
						{tour ? tour.name_tour_sort : '— (without tournament)'}
						{tour && (
							<span className={classes.link} onClick={() => touch(setTour)(null)}>
								{' '}
								clear
							</span>
						)}
					</div>
				</div>
			</div>

			<div className={classes.wrapperBody}>
				<PollFields form={form} setForm={touch(setForm)} />
				<OptionsPicker type={type} tour={tour} items={items} setItems={touch(setItems)} takenKeys={[]} />
				<ActionBlock title="Create poll" warning={(createdId ? '' : validation) || apiError(error)}>
					<ActionButton onClick={submit} disabled={!!validation} loading={isLoading}>
						Create poll
					</ActionButton>
				</ActionBlock>
				{createdId && <div className={classes.infoText}>Poll #{createdId} created. It is available in the Edit tab and on the tournament page.</div>}
			</div>
		</>
	)
}

// ---------- Редактирование голосования ----------
const EditPoll = ({ tours }) => {
	const polls = useGetPollsQuery()
	const [selected, setSelected] = useState(null) // строка из списка голосований
	const [form, setForm] = useState(emptyForm())
	const [tour, setTour] = useState(null)
	const [removedIds, setRemovedIds] = useState([])
	const [added, setAdded] = useState([])
	const [notice, setNotice] = useState('')
	const [confirmDelete, setConfirmDelete] = useState(false)

	const detail = useGetPollQuery({ id: selected?.id }, { skip: !selected })
	const [updatePoll, { isLoading: isSaving, error: saveError, reset: resetSave }] = useUpdateAdminPollMutation()
	const [deletePoll, { isLoading: isDeleting, error: deleteError }] = useDeleteAdminPollMutation()
	const [loadResults, { data: results, isFetching: isLoadingResults, error: resultsError }] = useLazyGetAdminPollResultsQuery()
	const type = selected?.type ?? 'player'

	const existing = useMemo(() => (detail.data?.options ?? []).map((o) => fromApiOption(type, o)), [detail.data, type])

	const choosePoll = (row) => {
		setSelected(row)
		setForm({ title: row.title ?? '', description: row.description ?? '', starts: toLocalInput(row.starts_at), ends: toLocalInput(row.ends_at) })
		setTour((tours ?? []).find((t) => t.name_tour_sort === row.name_tour_sort) ?? (row.name_tour_sort ? { name_tour_sort: row.name_tour_sort } : null))
		setRemovedIds([])
		setAdded([])
		setNotice('')
		setConfirmDelete(false)
		resetSave()
	}

	const touch = (fn) => (...args) => {
		fn(...args)
		setNotice('')
		resetSave()
	}

	// Что изменилось: на сервер уходят только изменённые поля
	const changes = {}
	if (selected) {
		if (form.title.trim() !== (selected.title ?? '')) changes.title = form.title.trim()
		if (form.description.trim() !== (selected.description ?? '')) changes.description = form.description.trim()
		if (form.starts !== toLocalInput(selected.starts_at)) changes.starts_at = form.starts && toApiDateTime(form.starts)
		if (form.ends !== toLocalInput(selected.ends_at)) changes.ends_at = form.ends && toApiDateTime(form.ends)
		if ((tour?.name_tour_sort ?? null) !== (selected.name_tour_sort ?? null)) changes.name_tour_sort = tour?.name_tour_sort ?? null
		if (removedIds.length) changes.remove_option_ids = removedIds
		if (added.length) changes.add = added.map(optionApiId)
	}
	const hasChanges = Object.keys(changes).length > 0

	// Ошибка заполнения; отсутствие изменений ошибкой не считается — кнопка просто неактивна
	const validation = !selected ? '' : !form.title.trim() ? 'Enter a title' : datesError(form)
	const votesWarning = removedIds.length && selected?.status !== 'upcoming' ? 'Votes for removed options will be deleted along with the options' : ''

	const reloadAndReselect = async (id) => {
		const list = await polls.refetch().unwrap()
		const row = list.find((r) => String(r.id) === String(id))
		if (row) choosePoll(row)
	}

	const apply = async () => {
		try {
			await updatePoll({ id: selected.id, ...changes }).unwrap()
			await reloadAndReselect(selected.id)
			setNotice('Saved')
		} catch {}
	}

	const remove = async () => {
		try {
			await deletePoll({ id: selected.id }).unwrap()
			setSelected(null)
			setConfirmDelete(false)
			polls.refetch()
		} catch {}
	}

	return (
		<>
			<div className={classes.wrapperMenu}>
				<div className={classes.wrapperList}>
					<div className={classes.resultsHeader}>
						<div className={classes.titleBox}>Polls:</div>
						<span className={classes.link} onClick={() => polls.refetch()}>
							refresh
						</span>
					</div>
					<div className={classes.list}>
						{(polls.data ?? []).map((row) => (
							<div key={row.id} className={classes.item} style={{ background: selected?.id === row.id ? '#7db489' : undefined }} onClick={() => choosePoll(row)}>
								#{row.id} · {row.title} · {row.type} · {row.status}
								{row.name_tour_sort ? ` · ${row.name_tour_sort}` : ''}
							</div>
						))}
					</div>
				</div>
				{selected && <TourPicker tours={tours} tour={tour} onSelect={touch(setTour)} />}
			</div>

			{selected && (
				<div className={classes.wrapperBody}>
					<div className={classes.infoText}>
						Type: <strong>{type}</strong> (the type of an existing poll cannot be changed) · Tournament: {tour?.name_tour_sort ?? '—'}
						{tour && (
							<span className={classes.link} onClick={() => touch(setTour)(null)}>
								{' '}
								clear
							</span>
						)}
					</div>
					<PollFields form={form} setForm={touch(setForm)} />

					<div className={classes.sectionTitle}>Current options ({existing.length}) — mark what to remove:</div>
					{detail.isFetching && <div className={classes.infoText}>Loading...</div>}
					<div className={classes.chips}>
						{existing.map((option) => (
							<OptionChip
								key={option.id}
								option={option}
								removed={removedIds.includes(option.id)}
								onRemove={() => touch(setRemovedIds)(removedIds.includes(option.id) ? removedIds.filter((id) => id !== option.id) : [...removedIds, option.id])}
							/>
						))}
					</div>

					<div className={classes.sectionTitle}>Add options:</div>
					<OptionsPicker type={type} tour={tour} items={added} setItems={touch(setAdded)} takenKeys={existing.filter((o) => !removedIds.includes(o.id)).map(optionKey)} />

					<ActionBlock title="Apply changes" warning={validation || votesWarning || apiError(saveError)}>
						<ActionButton onClick={apply} disabled={!!validation || !hasChanges} loading={isSaving}>
							Save changes
						</ActionButton>
					</ActionBlock>
					{notice && <div className={classes.infoText}>{notice}</div>}

					<ActionBlock title="Results (votes per option)" warning={apiError(resultsError)}>
						<ActionButton onClick={() => loadResults({ id: selected.id })} loading={isLoadingResults}>
							Load results
						</ActionButton>
					</ActionBlock>
					{results && results.id === selected.id && (
						<div className={classes.infoText}>
							Total votes: {results.total}
							{results.options.map((o) => (
								<div key={o.option_id}>
									{o.name}: {o.votes} ({o.percent}%)
								</div>
							))}
						</div>
					)}

					<ActionBlock title="Delete the whole poll" warning={apiError(deleteError) || 'Deletes the poll, all its options and all votes. This cannot be undone'}>
						{!confirmDelete ? (
							<ActionButton onClick={() => setConfirmDelete(true)}>Delete poll</ActionButton>
						) : (
							<>
								<ActionButton onClick={remove} loading={isDeleting}>
									Yes, delete #{selected.id}
								</ActionButton>
								<ActionButton onClick={() => setConfirmDelete(false)}>Cancel</ActionButton>
							</>
						)}
					</ActionBlock>
				</div>
			)}
		</>
	)
}

const PollsAdmin = () => {
	const [mode, setMode] = useState('create')
	const listTours = useGetTournamentsQuery()

	return (
		<div className={classes.wrapperPage}>
			<div className={classes.wrapperTabs}>
				<div className={`${classes.tab} ${mode === 'create' ? classes.tabActive : ''}`} onClick={() => setMode('create')}>
					Create poll
				</div>
				<div className={`${classes.tab} ${mode === 'edit' ? classes.tabActive : ''}`} onClick={() => setMode('edit')}>
					Edit / delete poll
				</div>
			</div>
			{mode === 'create' ? <CreatePoll tours={listTours.data} /> : <EditPoll tours={listTours.data} />}
		</div>
	)
}

export default PollsAdmin
