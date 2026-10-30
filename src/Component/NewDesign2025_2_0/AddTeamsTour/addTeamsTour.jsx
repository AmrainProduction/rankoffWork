import React, { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import classes from './addTeamsTour.module.css'
import { useCreateAdminTournamentTeamsMutation, useDeleteAdminTournamentTeamMutation, useGetTeamsTournamentsQuery, useGetTournamentsQuery, useUpdateAdminTournamentTeamResultsMutation } from '../../../store/api/apiSlice'
import TeamSelector from '../../UI/TeamSelector/teamSelector'

// Дата турнира -> 'YYYY-MM-DD' (если пришёл ISO с временем — берём локальную дату, чтобы не съехать на день)
const toDate = (value) => {
	if (!value) return ''
	const str = String(value)
	if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str
	const date = new Date(str)
	return isNaN(date) ? '' : date.toLocaleDateString('en-CA')
}

const isIntOrEmpty = (value) => /^-?\d*$/.test(String(value ?? '').trim())
const asText = (value) => (value === null || value === undefined ? '' : String(value))

const emptySlot = () => ({ team: null, country: '', status: 'invited' })

const AddTeamsTour = () => {
	const listTours = useGetTournamentsQuery()
	const teamsTours = useGetTeamsTournamentsQuery()
	const { admin } = useOutletContext()
	const [createTeams, { isLoading: isSaving }] = useCreateAdminTournamentTeamsMutation()
	const [saveResults, { isLoading: isSavingResults }] = useUpdateAdminTournamentTeamResultsMutation()
	const [deleteTeam] = useDeleteAdminTournamentTeamMutation()
	const [status, setStatus] = useState(null) // { ok, text } для добавления команд
	const [resultsStatus, setResultsStatus] = useState(null) // { ok, text } для результатов и удаления

	const [tourFilter, setTourFilter] = useState('')
	const [tour, setTour] = useState(null)
	const [slots, setSlots] = useState([])
	// Правки результатов уже добавленных команд: { [id записи]: { points, prize, position } }
	const [resultEdits, setResultEdits] = useState({})

	// Последняя известная страна команды и все встречавшиеся статусы прохода — из прошлых записей teams_tournaments
	const { lastCountryByTeam, statuses } = useMemo(() => {
		const countries = {}
		const statusSet = new Set(['invited'])
		const rows = [...(teamsTours.data ?? [])].sort((a, b) => a.id - b.id)
		rows.forEach((row) => {
			if (row.country_team) countries[row.team_id] = row.country_team
			if (row.passage_status) statusSet.add(row.passage_status)
		})
		return { lastCountryByTeam: countries, statuses: [...statusSet] }
	}, [teamsTours.data])

	// Команды, которые уже добавлены в выбранный турнир
	const alreadyInTour = useMemo(() => {
		if (!tour) return new Set()
		return new Set((teamsTours.data ?? []).filter((row) => row.name_tour_sort === tour.name_tour_sort).map((row) => row.team_id))
	}, [teamsTours.data, tour])

	// Уже добавленные в турнир записи — для заполнения результатов (по месту, потом по названию)
	const tourRows = useMemo(() => {
		if (!tour) return []
		return (teamsTours.data ?? [])
			.filter((row) => row.name_tour_sort === tour.name_tour_sort)
			.sort((a, b) => (a.position_team ?? 999) - (b.position_team ?? 999) || String(a.name_team).localeCompare(String(b.name_team)))
	}, [teamsTours.data, tour])

	const getResult = (row) => ({
		points: asText(row.points_team),
		prize: asText(row.prize_team),
		position: asText(row.position_team),
		...resultEdits[row.id],
	})

	const updateResult = (row, patch) => {
		setResultEdits((prev) => ({ ...prev, [row.id]: { ...getResult(row), ...patch } }))
		setResultsStatus(null)
	}

	const isRowChanged = (row) => {
		const r = getResult(row)
		return r.points.trim() !== asText(row.points_team) || r.prize.trim() !== asText(row.prize_team) || r.position.trim() !== asText(row.position_team)
	}
	const isRowValid = (row) => {
		const r = getResult(row)
		return isIntOrEmpty(r.points) && isIntOrEmpty(r.position)
	}

	const changedRows = tourRows.filter(isRowChanged)
	const isResultsReady = changedRows.length > 0 && changedRows.every(isRowValid)

	const filteredTours = (listTours.data ?? []).filter((e) => e.name_tour_sort?.toLowerCase().includes(tourFilter.toLowerCase()))

	const handleCount = (event) => {
		const count = Math.max(0, Math.min(64, Number(event.target.value) || 0))
		setSlots((prev) => (count > prev.length ? [...prev, ...Array.from({ length: count - prev.length }, emptySlot)] : prev.slice(0, count)))
		setStatus(null)
	}

	const updateSlot = (index, patch) => {
		setSlots((prev) => prev.map((slot, i) => (i === index ? { ...slot, ...patch } : slot)))
		setStatus(null)
	}

	const selectTeam = (index, team) => {
		updateSlot(index, { team, country: lastCountryByTeam[team?.team_id] ?? '' })
	}

	// Повторы внутри формы
	const selectedIds = slots.map((slot) => slot.team?.team_id).filter(Boolean)
	const duplicateIds = new Set(selectedIds.filter((id, i) => selectedIds.indexOf(id) !== i))

	const isReady = tour && slots.length > 0 && slots.every((slot) => slot.team && slot.country.trim() && slot.status.trim()) && duplicateIds.size === 0

	const submit = async () => {
		if (!isReady || isSaving) return
		setStatus(null)
		try {
			const result = await createTeams({
				name_tour_sort: tour.name_tour_sort,
				teams: slots.map(({ team, country, status }) => ({ team_id: team.team_id, country: country.trim(), status: status.trim() })),
			}).unwrap()
			setStatus({ ok: true, text: `Teams added: ${result.added}` })
			setSlots([])
			teamsTours.refetch()
		} catch (error) {
			setStatus({ ok: false, text: error?.data?.message || 'Failed to add teams, try again' })
		}
	}

	const submitResults = async () => {
		if (!isResultsReady || isSavingResults) return
		setResultsStatus(null)
		try {
			const result = await saveResults({
				rows: changedRows.map((row) => {
					const r = getResult(row)
					return { id: row.id, points: r.points.trim() === '' ? null : parseInt(r.points, 10), position: r.position.trim() === '' ? null : parseInt(r.position, 10), prize: r.prize.trim() || null }
				}),
			}).unwrap()
			setResultsStatus({ ok: true, text: `Results updated: ${result.updated}` })
			setResultEdits({})
			teamsTours.refetch()
		} catch (error) {
			setResultsStatus({ ok: false, text: error?.data?.message || 'Failed to update results, try again' })
		}
	}

	// Удаление команды из турнира (только суперадмин)
	const handleDelete = async (row) => {
		if (!window.confirm(`Remove ${row.name_team} from ${row.name_tour_sort}?`)) return
		setResultsStatus(null)
		try {
			await deleteTeam({ id: row.id }).unwrap()
			setResultEdits((prev) => {
				const { [row.id]: removed, ...rest } = prev
				return rest
			})
			setResultsStatus({ ok: true, text: `Removed: ${row.name_team}` })
			teamsTours.refetch()
		} catch (error) {
			setResultsStatus({ ok: false, text: error?.data?.message || 'Failed to remove the team' })
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
							<div
								key={e.id}
								className={classes.item}
								style={{ background: tour?.id === e.id ? '#7db489' : undefined }}
								onClick={() => {
									setTour(e)
									setStatus(null)
									setResultEdits({})
									setResultsStatus(null)
								}}>
								{e.name_tour_sort}
							</div>
						))}
					</div>
				</div>

				<div className={classes.wrapperInfo}>
					<div className={classes.titleBox}>Selected:</div>
					<div className={classes.infoText}>{tour ? `${tour.name_tour} (${toDate(tour.date_start)} — ${toDate(tour.date_end)})` : '—'}</div>
					<div className={classes.titleBox}>Teams count:</div>
					<input type="number" min="0" max="64" value={slots.length || ''} onChange={handleCount} className={classes.inputData} />
				</div>

				<div className={`${classes.btnEnter} ${isReady && !isSaving ? '' : classes.btnDisabled}`} onClick={submit}>
					{isSaving ? 'Saving...' : 'Add teams'}
				</div>
				{status && <div className={classes.infoText} style={{ color: status.ok ? '#7db489' : '#bd5d5d' }}>{status.text}</div>}
			</div>

			{slots.length > 0 && (
				<div className={classes.wrapperTeams}>
					<div className={classes.rowTitle}>
						<div>#</div>
						<div>Team</div>
						<div>Country</div>
						<div>Passage status</div>
						<div></div>
					</div>
					{slots.map((slot, index) => {
						const id = slot.team?.team_id
						const warning = id && duplicateIds.has(id) ? 'Duplicate in the list' : id && alreadyInTour.has(id) ? 'Already in the tournament' : ''
						return (
							<div key={index} className={classes.row}>
								<div className={classes.number}>{index + 1}</div>
								<TeamSelector onSelect={(team) => selectTeam(index, team)} />
								<input type="text" placeholder="Country" value={slot.country} onChange={(e) => updateSlot(index, { country: e.target.value })} className={classes.inputData} />
								<input type="text" placeholder="Passage status" list="passageStatuses" value={slot.status} onChange={(e) => updateSlot(index, { status: e.target.value })} className={classes.inputData} />
								<div className={classes.warning}>{warning}</div>
							</div>
						)
					})}
					<datalist id="passageStatuses">
						{statuses.map((s) => (
							<option key={s} value={s} />
						))}
					</datalist>
				</div>
			)}

			{tourRows.length > 0 && (
				<div className={classes.wrapperResults}>
					<div className={classes.resultsHeader}>
						<div className={classes.sectionTitle}>Tournament team results ({tourRows.length})</div>
						<div className={`${classes.btnResults} ${isResultsReady && !isSavingResults ? '' : classes.btnDisabled}`} onClick={submitResults}>
							{isSavingResults ? 'Saving...' : `Update results${changedRows.length ? ` (${changedRows.length})` : ''}`}
						</div>
					</div>
					{resultsStatus && <div style={{ color: resultsStatus.ok ? '#7db489' : '#bd5d5d' }}>{resultsStatus.text}</div>}
					<div className={`${classes.resultTitle} ${admin?.is_super ? classes.withDelete : ''}`}>
						<div>Team</div>
						<div>Position</div>
						<div>Points</div>
						<div>Prize</div>
						{admin?.is_super && <div></div>}
					</div>
					{tourRows.map((row) => {
						const r = getResult(row)
						const changed = isRowChanged(row)
						return (
							<div key={row.id} className={`${classes.resultRow} ${changed ? classes.resultRowChanged : ''} ${admin?.is_super ? classes.withDelete : ''}`}>
								<div className={classes.resultTeam}>
									<img src={`/images/LogoTeams/${row.logo_team}`} alt="" />
									<span>{row.name_team}</span>
								</div>
								<input type="number" min="1" placeholder="Position" value={r.position} onChange={(e) => updateResult(row, { position: e.target.value })} className={`${classes.inputData} ${isIntOrEmpty(r.position) ? '' : classes.inputError}`} />
								<input type="number" placeholder="Points" value={r.points} onChange={(e) => updateResult(row, { points: e.target.value })} className={`${classes.inputData} ${isIntOrEmpty(r.points) ? '' : classes.inputError}`} />
								<input type="text" placeholder="850000₽ / 5000$ / -" list="prizeHints" value={r.prize} onChange={(e) => updateResult(row, { prize: e.target.value })} className={classes.inputData} />
								{admin?.is_super && (
									<span className={classes.warning} style={{ cursor: 'pointer' }} onClick={() => handleDelete(row)}>
										Delete
									</span>
								)}
							</div>
						)
					})}
					<datalist id="prizeHints">
						<option value="-" />
					</datalist>
				</div>
			)}
		</div>
	)
}

export default AddTeamsTour
