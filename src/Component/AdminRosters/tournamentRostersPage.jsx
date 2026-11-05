import React, { useEffect, useState } from 'react'
import classes from '../AdminAccess/adminAccess.module.css'
import own from './rosters.module.css'
import RefreshButton from '../AdminAccess/refreshButton'
import SearchSelect from '../UI/SearchSelect/searchSelect'
import { useGetAdminTournamentRostersQuery, useGetPlayersQuery, useGetTournamentsQuery, useSaveAdminTournamentRosterMutation } from '../../store/api/apiSlice'

const ROLES = [
	{ value: 'main', label: 'Main player' },
	{ value: 'sub', label: 'Substitute' },
	{ value: 'coach', label: 'Coach' },
]

const tourLogo = (t, h = 22) =>
	t.logo_tour ? <img src={`/images/LogoAndBannerTour/${t.logo_tour}`} alt="" style={{ height: h, width: 'auto', maxWidth: h * 3, objectFit: 'contain', flex: 'none' }} onError={(e) => (e.currentTarget.style.display = 'none')} /> : null

const errorMessage = (e) => e?.data?.message || 'Something went wrong, try again'

// Заявка одной команды на турнир: основные (до 5), замены и тренер
const TeamEditor = ({ tour, team, players, onSaved }) => {
	const [rows, setRows] = useState(team.rows)
	const [status, setStatus] = useState(null)
	const [save, { isLoading }] = useSaveAdminTournamentRosterMutation()

	// После обновления данных с сервера редактор показывает сохранённую заявку
	useEffect(() => {
		setRows(team.rows)
	}, [team.rows])

	const update = (index, patch) => {
		setRows((prev) => prev.map((r, i) => (i === index ? { ...r, ...patch } : r)))
		setStatus(null)
	}
	const remove = (index) => {
		setRows((prev) => prev.filter((_, i) => i !== index))
		setStatus(null)
	}
	const add = () => {
		const hasFiveMain = rows.filter((r) => r.role === 'main').length >= 5
		setRows((prev) => [...prev, { role: hasFiveMain ? 'sub' : 'main', player_id: null, nickname: '' }])
		setStatus(null)
	}
	const fill = () => {
		setRows(team.suggestion.map((s) => ({ role: s.role, player_id: s.player_id, nickname: s.nickname })))
		setStatus({ ok: true, text: 'Filled from the suggestion: check it and press Save' })
	}

	const submit = async () => {
		setStatus(null)
		try {
			await save({ tour, teamId: team.team_id, rows: rows.map((r) => ({ role: r.role, player_id: r.player_id || null, nickname: r.player_id ? undefined : r.nickname })) }).unwrap()
			setStatus({ ok: true, text: 'Saved' })
			onSaved()
		} catch (e) {
			setStatus({ ok: false, text: errorMessage(e) })
		}
	}

	return (
		<div className={`${classes.card} ${own.team}`}>
			<div className={`${classes.title} ${own.head}`}>
				{team.logo_team && <img src={`/images/LogoTeams/${team.logo_team}`} alt="" />}
				<span className={own.name}>{team.name_team}</span>
			</div>

			<div className={own.actions}>
				<button type="button" className={classes.btn} onClick={submit} disabled={isLoading}>
					{isLoading ? 'Saving...' : 'Save'}
				</button>
				<button type="button" className={classes.btnDark} onClick={add}>
					Add person
				</button>
				{team.suggestion.length > 0 && (
					<button type="button" className={classes.btnDark} onClick={fill} title={`Suggestion source: ${team.suggestion_source}`}>
						Fill from {team.suggestion_source}
					</button>
				)}
			</div>

			{rows.map((r, i) => (
				<div key={i} className={own.rowLine}>
					<select className={`${classes.input} ${own.select}`} value={r.role} onChange={(e) => update(i, { role: e.target.value })}>
						{ROLES.map((x) => (
							<option key={x.value} value={x.value}>
								{x.label}
							</option>
						))}
					</select>
					<div className={own.field}>
						<SearchSelect
							items={players}
							value={r.player_id}
							getKey={(p) => p.player_id}
							getLabel={(p) => p.nickname ?? ''}
							onSelect={(p) => update(i, { player_id: p?.player_id ?? null, nickname: p?.nickname ?? '' })}
							placeholder="Start typing a nickname"
						/>
					</div>
					<button type="button" className={`${classes.btnDark} ${own.removeBtn}`} onClick={() => remove(i)} title="Remove">
						✕
					</button>
					{r.role === 'coach' && !r.player_id && (
						<input className={`${classes.input} ${own.coachName}`} placeholder="Coach name (if not a player)" value={r.nickname} onChange={(e) => update(i, { nickname: e.target.value })} />
					)}
				</div>
			))}

			<div className={classes.hint}>{team.rows.length ? `${team.rows.length} in the roster` : 'no roster yet'}</div>
			{status && <div className={status.ok ? classes.ok : classes.error}>{status.text}</div>}
		</div>
	)
}

// Tournament rosters: кто заявлен от каждой команды на турнир. Используется блоком Lineups на странице матча
const TournamentRostersPage = () => {
	const tours = useGetTournamentsQuery()
	const players = useGetPlayersQuery()
	const [tour, setTour] = useState('')
	const { data, isFetching, isError, refetch } = useGetAdminTournamentRostersQuery(tour, { skip: !tour })

	return (
		<div className={`${classes.card} ${classes.page}`} style={{ minHeight: 520 }}>
			<div className={classes.title}>Tournament rosters</div>

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
						onSelect={(t) => setTour(t?.name_tour_sort ?? '')}
						placeholder="Start typing a tournament"
					/>
				</div>
				{tour && (tours.data ?? []).find((t) => t.name_tour_sort === tour) && tourLogo((tours.data ?? []).find((t) => t.name_tour_sort === tour), 36)}
				{tour && <RefreshButton onClick={refetch} spinning={isFetching} />}
			</div>

			{isError && <div className={classes.error}>Failed to load the tournament teams</div>}
			{tour && data && data.teams.length === 0 && <div className={classes.hint}>This tournament has no teams yet (add them on ADD_TEAMS_TOUR or schedule matches first)</div>}
			{tour && data && (
				<div className={own.grid} style={{ opacity: isFetching ? 0.6 : 1 }}>
					{data.teams.map((team) => (
						<TeamEditor key={team.team_id} tour={tour} team={team} players={players.data ?? []} onSaved={refetch} />
					))}
				</div>
			)}
		</div>
	)
}

export default TournamentRostersPage
