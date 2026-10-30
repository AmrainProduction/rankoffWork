import React, { useState } from 'react'
import classes from '../functions.module.css'
import Kpr from '../../Formulas/kpr'
import Dpr from '../../Formulas/dpr'
import Rating from '../../Formulas/rating'
import { useGetPlayersTournamentsByNameTourQuery, useGetTeamsTournamentsByNameQuery, useGetTournamentsQuery, useRunAdminFunctionMutation } from '../../../store/api/apiSlice'

// Общая часть: запуск функции на сервере в два шага. Preview показывает, что изменится, Apply выполняет ровно то же самое.
// Apply доступен только после Preview с теми же параметрами.
const useServerFunction = (name) => {
	const [run, { isLoading }] = useRunAdminFunctionMutation()
	const [result, setResult] = useState(null) // { applied, summary, items, total, key }
	const [error, setError] = useState('')

	const call = async (body, apply) => {
		setError('')
		try {
			const data = await run({ name, ...body, apply }).unwrap()
			setResult({ ...data, key: JSON.stringify(body) })
		} catch (e) {
			setResult(null)
			setError(e?.data?.message || 'Request failed, try again')
		}
	}

	return { isLoading, result, error, call, reset: () => {
			setResult(null)
			setError('')
		}, }
}

const Runner = ({ fn, body, ready, confirmText }) => {
	const key = JSON.stringify(body)
	const previewed = fn.result && !fn.result.applied && fn.result.key === key
	const canApply = ready && previewed && fn.result.total > 0 && !fn.isLoading

	const apply = () => {
		if (!canApply) return
		if (window.confirm(confirmText ?? 'Apply these changes to the database?')) fn.call(body, true)
	}

	return (
		<div>
			<div className={classes.actionButtons}>
				<div className={classes.tour} style={{ opacity: ready && !fn.isLoading ? 1 : 0.4 }} onClick={() => ready && !fn.isLoading && fn.call(body, false)}>
					{fn.isLoading ? 'Working...' : 'Preview'}
				</div>
				<div className={classes.tour} style={{ opacity: canApply ? 1 : 0.4 }} onClick={apply}>
					Apply
				</div>
			</div>
			{fn.error && <div style={{ color: '#bd5d5d', marginBottom: 8 }}>{fn.error}</div>}
			{fn.result && (
				<>
					<div style={{ marginBottom: 8, color: fn.result.applied ? '#7db489' : undefined }}>
						{fn.result.applied ? 'DONE: ' : 'PREVIEW (nothing changed yet): '}
						{fn.result.summary}
					</div>
					<div className={classes.resultCommand} style={{ whiteSpace: 'pre-wrap' }}>
						{fn.result.items.join('\n')}
						{fn.result.total > fn.result.items.length ? `\n... and ${fn.result.total - fn.result.items.length} more` : ''}
					</div>
				</>
			)}
		</div>
	)
}

const TourList = ({ value, onChange }) => {
	const tours = useGetTournamentsQuery()
	return (
		<div className={classes.listTours}>
			{tours.data?.map((e) => (
				<div key={e.id} className={classes.tour} style={{ background: value === e.name_tour_sort ? '#7db489' : undefined }} onClick={() => onChange(e.name_tour_sort)}>
					{e.name_tour_sort}
				</div>
			))}
		</div>
	)
}

// players.team / back_logo_team / team_id по составам команд
export const CurrentTeamsPlayers = () => {
	const fn = useServerFunction('current-team-players')
	return <Runner fn={fn} body={{}} ready confirmText="Update the team of all players according to current team rosters?" />
}

// Составы команд по последним картам турнира
export const TournamentRosters = () => {
	const fn = useServerFunction('tournament-rosters')
	const [tour, setTour] = useState('')
	return (
		<div className={classes.wrapperStatsPlayersTour}>
			<TourList
				value={tour}
				onChange={(t) => {
					setTour(t)
					fn.reset()
				}}
			/>
			<Runner fn={fn} body={{ name_tour_sort: tour }} ready={!!tour} confirmText={`Overwrite team rosters from the last maps of ${tour}?`} />
		</div>
	)
}

// Очки рейтинга за турнир: игрокам или командам
export const RankingPoints = ({ target }) => {
	const fn = useServerFunction('ranking-points')
	const [tour, setTour] = useState('')
	return (
		<div className={classes.wrapperStatsPlayersTour}>
			<TourList
				value={tour}
				onChange={(t) => {
					setTour(t)
					fn.reset()
				}}
			/>
			<Runner fn={fn} body={{ name_tour_sort: tour, target }} ready={!!tour} confirmText={`Give ${target} ranking points for ${tour}? This cannot be repeated.`} />
		</div>
	)
}

// Награды: победитель, MVP, EVP
export const Awards = () => {
	const fn = useServerFunction('awards')
	const [tour, setTour] = useState('')
	const [winner, setWinner] = useState(null)
	const [mvp, setMvp] = useState(null)
	const [evp, setEvp] = useState([])

	const teams = useGetTeamsTournamentsByNameQuery({ name: tour }, { skip: !tour })
	const players = useGetPlayersTournamentsByNameTourQuery({ nameTour: tour }, { skip: !tour })
	const allPlayers = [...(players.data ?? [])].sort((a, b) => a.id - b.id)
	// Финалисты: команды на местах 1 и 2, плюс выбранный победитель
	const finalists = new Set([...(teams.data ?? []).filter((t) => t.position_team === 1 || t.position_team === 2).map((t) => t.team_id), ...(winner ? [winner] : [])])

	const change = (patch) => {
		patch()
		fn.reset()
	}
	const chip = (active) => ({ background: active ? '#7db489' : undefined })

	return (
		<div className={classes.wrapperStatsPlayersTour}>
			<TourList
				value={tour}
				onChange={(t) =>
					change(() => {
						setTour(t)
						setWinner(null)
						setMvp(null)
						setEvp([])
					})
				}
			/>

			{tour && <div style={{ marginBottom: 4 }}>Winner team (also awards all its players):</div>}
			<div className={classes.listTours}>
				{(tour ? teams.data ?? [] : []).map((t) => (
					<div key={t.team_id} className={classes.tour} style={chip(winner === t.team_id)} onClick={() =>
							change(() => {
								setWinner(winner === t.team_id ? null : t.team_id)
							})
						}>
						{t.name_team}
					</div>
				))}
			</div>

			{finalists.size > 0 && <div style={{ marginBottom: 4 }}>MVP (a player of one of the two finalist teams):</div>}
			<div className={classes.listTours}>
				{allPlayers
					.filter((p) => finalists.has(p.team_id))
					.map((p) => (
						<div key={p.player_id} className={classes.tour} style={chip(mvp === p.player_id)} onClick={() => change(() => setMvp(mvp === p.player_id ? null : p.player_id))}>
							{p.nickname}
						</div>
					))}
			</div>

			{tour && <div style={{ marginBottom: 4 }}>EVP (any players, several allowed):</div>}
			<div className={classes.listTours}>
				{allPlayers.map((p) => (
					<div key={p.player_id} className={classes.tour} style={chip(evp.includes(p.player_id))} onClick={() => change(() => setEvp(evp.includes(p.player_id) ? evp.filter((x) => x !== p.player_id) : [...evp, p.player_id]))}>
						{p.nickname}
					</div>
				))}
			</div>

			<Runner fn={fn} body={{ name_tour_sort: tour, winner_team_id: winner, mvp_player_id: mvp, evp_player_ids: evp }} ready={!!tour && (winner !== null || mvp !== null || evp.length > 0)} confirmText={`Give these awards for ${tour}?`} />
		</div>
	)
}

// Статистика команд по картам за всё время для команд выбранного турнира (считает сервер)
export const TeamStats = () => {
	const fn = useServerFunction('team-stats')
	const [tour, setTour] = useState('')
	return (
		<div className={classes.wrapperStatsPlayersTour}>
			<TourList
				value={tour}
				onChange={(t) => {
					setTour(t)
					fn.reset()
				}}
			/>
			<Runner fn={fn} body={{ name_tour_sort: tour }} ready={!!tour} confirmText={`Overwrite all-time map stats of the teams of ${tour}?`} />
		</div>
	)
}

const round2 = (x) => Math.round(x * 100) / 100

// Статистика игроков. Суммы считает сервер, рейтинг считается здесь по формулам из Formulas/ и отправляется на сервер.
// scope 'tournament' — статистика игроков турнира (топ на странице турнира); 'all' — статистика игроков за всё время.
export const PlayerStats = ({ scope }) => {
	const endpoint = scope === 'tournament' ? 'player-stats-tournament' : 'player-stats-all'
	const [run, { isLoading }] = useRunAdminFunctionMutation()
	const [tour, setTour] = useState('')
	const [replace, setReplace] = useState(false)
	const [plan, setPlan] = useState(null) // { ratings, fingerprint, key }
	const [result, setResult] = useState(null)
	const [error, setError] = useState('')

	const ratingFor = (p) => {
		const rounds = p.rounds
		if (scope === 'tournament') {
			return Rating(p.k / p.d, Kpr(p.k, rounds), Dpr(p.d, rounds), p.impact_sum / p.maps)
		}
		return Rating(round2(p.k / p.d), round2(Kpr(p.k, rounds)), round2(Dpr(p.d, rounds)), round2(p.impact_sum / p.maps))
	}

	const key = JSON.stringify({ tour, replace })
	const reset = () => {
		setPlan(null)
		setResult(null)
		setError('')
	}

	const send = async (body) => {
		try {
			return await run({ name: endpoint, name_tour_sort: tour, replace, ...body }).unwrap()
		} catch (e) {
			setError(e?.data?.message || 'Request failed, try again')
			return null
		}
	}

	const preview = async () => {
		reset()
		const sums = await send({ apply: false })
		if (!sums) return
		const ratings = {}
		sums.players.forEach((p) => {
			ratings[p.player_id] = ratingFor(p)
		})
		const data = await send({ apply: false, ratings, fingerprint: sums.fingerprint })
		if (data) {
			setPlan({ ratings, fingerprint: sums.fingerprint, key })
			setResult(data)
		}
	}

	const apply = async () => {
		if (!plan || plan.key !== key || !result || result.applied || result.total === 0 || isLoading) return
		if (!window.confirm(scope === 'tournament' ? `Save tournament player stats for ${tour}${replace ? ' (existing rows will be replaced)' : ''}?` : `Overwrite all-time stats of the players of ${tour}?`)) return
		setError('')
		const data = await send({ apply: true, ratings: plan.ratings, fingerprint: plan.fingerprint })
		if (data) setResult(data)
	}

	const canApply = plan && plan.key === key && result && !result.applied && result.total > 0 && !isLoading

	return (
		<div className={classes.wrapperStatsPlayersTour}>
			<TourList
				value={tour}
				onChange={(t) => {
					setTour(t)
					reset()
				}}
			/>
			{scope === 'tournament' && (
				<label style={{ display: 'flex', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
					<input
						type="checkbox"
						checked={replace}
						onChange={(e) => {
							setReplace(e.target.checked)
							reset()
						}}
					/>
					Replace existing rows of this tournament
				</label>
			)}
			<div className={classes.actionButtons}>
				<div className={classes.tour} style={{ opacity: tour && !isLoading ? 1 : 0.4 }} onClick={() => tour && !isLoading && preview()}>
					{isLoading ? 'Working...' : 'Preview'}
				</div>
				<div className={classes.tour} style={{ opacity: canApply ? 1 : 0.4 }} onClick={apply}>
					Apply
				</div>
			</div>
			{error && <div style={{ color: '#bd5d5d', marginBottom: 8 }}>{error}</div>}
			{result && (
				<>
					<div style={{ marginBottom: 8, color: result.applied ? '#7db489' : undefined }}>
						{result.applied ? 'DONE: ' : 'PREVIEW (nothing changed yet): '}
						{result.summary}
					</div>
					<div className={classes.resultCommand} style={{ whiteSpace: 'pre-wrap' }}>
						{result.items.join('\n')}
						{result.total > result.items.length ? `\n... and ${result.total - result.items.length} more` : ''}
					</div>
				</>
			)}
		</div>
	)
}
