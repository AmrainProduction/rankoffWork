import React, { useState } from 'react'
import classes from './adminAccess.module.css'
import { useGetAdminAuditQuery } from '../../store/api/apiSlice'

// Группы действий для фильтра: значение — префикс action на сервере (AdminAudit::log)
const ACTIONS = [
	{ value: '', label: 'All actions' },
	{ value: 'login', label: 'Sign-ins' },
	{ value: 'logout', label: 'Sign-outs' },
	{ value: 'password', label: 'Password changes' },
	{ value: 'admin', label: 'Admin management' },
	{ value: 'poll', label: 'Polls' },
	{ value: 'match', label: 'Map entry' },
	{ value: 'tournament_team', label: 'Tournament teams' },
	{ value: 'function', label: 'Bulk functions' },
	{ value: 'player', label: 'Players' },
	{ value: 'team', label: 'Teams' },
	{ value: 'tournament', label: 'Tournaments' },
	{ value: 'roster', label: 'Team rosters' },
	{ value: 'short_match', label: 'Tournament matches' },
]

const ACTION_LABELS = {
	'login.success': ['Sign-in', 'ok'],
	'login.failed': ['Failed sign-in', 'warn'],
	'login.locked': ['Sign-in while locked', 'warn'],
	'login.blocked': ['Sign-in by blocked admin', 'warn'],
	logout: ['Sign-out'],
	'password.change': ['Password change'],
	'admin.create': ['Admin created'],
	'admin.update': ['Admin edited'],
	'poll.create': ['Poll created'],
	'poll.update': ['Poll edited'],
	'poll.delete': ['Poll deleted', 'warn'],
	'tournament_team.create': ['Teams added'],
	'tournament_team.results': ['Team results updated'],
	'tournament_team.delete': ['Team removed', 'warn'],
	'function.current_team_players': ['Players teams updated'],
	'function.tournament_rosters': ['Rosters updated'],
	'function.awards': ['Awards given'],
	'function.ranking_points': ['Ranking points given'],
	'player.create': ['Player created'],
	'player.update': ['Player edited'],
	'player.delete': ['Player deleted', 'warn'],
	'team.create': ['Team created'],
	'team.update': ['Team edited'],
	'team.delete': ['Team deleted', 'warn'],
	'tournament.create': ['Tournament created'],
	'tournament.update': ['Tournament edited'],
	'tournament.delete': ['Tournament deleted', 'warn'],
	'roster.update': ['Roster updated'],
	'short_match.delete': ['Match deleted', 'warn'],
	'short_match.create': ['Matches created'],
	'match.create': ['Map entered'],
	'match.update': ['Map edited'],
}

const formatTime = (value) => {
	if (!value) return ''
	const [date, time] = String(value).replace('T', ' ').split(' ')
	const [y, m, d] = date.split('-')
	return `${d}.${m}.${y} ${(time ?? '').slice(0, 8)}`
}

const show = (v) => {
	if (v === null || v === undefined || v === '') return '—'
	if (Array.isArray(v)) return v.length ? v.join(', ') : '—'
	return String(v)
}

// Техническое имя поля в details → понятная подпись
const DETAIL_LABELS = {
	title: 'Title',
	description: 'Description',
	type: 'Type',
	starts_at: 'Starts at',
	ends_at: 'Ends at',
	name_tour_sort: 'Tournament',
	tournament: 'Tournament',
	matches: 'Matches',
	teams: 'Teams',
	rows: 'Results',
	record: 'Deleted record',
	maps_deleted: 'Maps deleted',
	team: 'Team',
	propagated: 'Related rows updated',
	fields: 'Fields',
	items: 'Details',
	total: 'Total',
	target: 'Target',
	roster: 'New roster',
	match: 'Match',
	map: 'Map',
	login: 'Login',
	name: 'Name',
	is_super: 'Super admin',
	permissions: 'Permissions',
	tournaments: 'Tournaments',
	options: 'Options',
	added_options: 'Options added',
	removed_options: 'Options removed',
	deleted_votes: 'Votes deleted',
	votes_deleted: 'Votes deleted',
	password_reset: 'Password reset',
	sessions_closed: 'Sessions closed',
	reason: 'Reason',
	failed_attempts: 'Failed attempts in a row',
	until: 'Locked until',
	other_sessions_closed: 'Other sessions closed',
}

const Details = ({ item }) => {
	const d = item.details ?? {}
	const changes = Array.isArray(d.changes) ? d.changes : []
	const rest = Object.entries(d).filter(([k, v]) => k !== 'changes' && k !== 'fields' && k !== 'poll' && k !== 'matches' && k !== 'rows' && k !== 'record' && k !== 'items' && !(typeof v === 'object' && v !== null && !Array.isArray(v)))
	const nestedSource = d.poll ?? d.record
	const nested = nestedSource && typeof nestedSource === 'object' ? Object.entries(nestedSource) : []
	const fields = d.fields && typeof d.fields === 'object' ? d.fields : null

	return (
		<div className={classes.logDetails}>
			{changes.length > 0 && (
				<div>
					<b>What changed:</b>
					{changes.map((c) => (
						<div key={c.field}>
							{c.label}: <span className={classes.from}>{show(c.from)}</span> → <span className={classes.to}>{show(c.to)}</span>
						</div>
					))}
				</div>
			)}
			{nested.length > 0 && (
				<div>
					<b>Deleted data:</b>
					{nested.map(([k, v]) => (
						<div key={k}>
							{DETAIL_LABELS[k] ?? k}: {show(v)}
						</div>
					))}
				</div>
			)}
			{rest.map(([k, v]) => (
				<div key={k}>
					{DETAIL_LABELS[k] ?? k}: {typeof v === 'boolean' ? (v ? 'yes' : 'no') : show(v)}
				</div>
			))}
			{Array.isArray(d.items) && (
				<div>
					<b>Details{d.total > d.items.length ? ` (first ${d.items.length} of ${d.total})` : ''}:</b>
					{d.items.map((line, i) => (
						<div key={i}>{line}</div>
					))}
				</div>
			)}
			{Array.isArray(d.rows) && (
				<div>
					<b>Results:</b>
					{d.rows.map((r, i) => (
						<div key={i}>
							{r.team} ({r.tournament}):{' '}
							{(r.changes ?? []).map((c) => (
								<span key={c.field} style={{ marginRight: 12 }}>
									{c.label}: <span className={classes.from}>{show(c.from)}</span> → <span className={classes.to}>{show(c.to)}</span>
								</span>
							))}
						</div>
					))}
				</div>
			)}
			{Array.isArray(d.matches) && (
				<div>
					<b>Matches:</b>
					{d.matches.map((m) => (
						<div key={m.name}>
							{m.name} — {m.stage}, {m.format}, {m.date} {String(m.time).slice(0, 5)}
							{m.link ? `, ${m.link}` : ''}
						</div>
					))}
				</div>
			)}
			{fields && (
				<div>
					<b>Entered data:</b>
					<div>
						Score by halves: {fields.half1_team1}:{fields.half1_team2} / {fields.half2_team1}:{fields.half2_team2}, pick: {show(fields.map_pick)}
					</div>
					{['t1p1', 't1p2', 't1p3', 't1p4', 't1p5', 't2p1', 't2p2', 't2p3', 't2p4', 't2p5'].map((slot) => (
						<div key={slot}>
							{slot.startsWith('t1') ? 'Team 1' : 'Team 2'}: {show(fields[slot])} — K/A/D {fields[`${slot}_k`]}/{fields[`${slot}_a`]}/{fields[`${slot}_d`]}, impact {fields[`${slot}_impact`]}, rating {fields[`${slot}_rating`]}
						</div>
					))}
				</div>
			)}
			<div className={classes.hint}>
				IP: {show(item.ip)} · {show(item.user_agent)} · entry #{item.id}
			</div>
		</div>
	)
}

// Admin activity log (только суперадмин). Записи только читаются, изменить или удалить их из админки нельзя
const AuditLogPage = () => {
	const [filters, setFilters] = useState({ admin_id: '', action: '', q: '', from: '', to: '' })
	const [applied, setApplied] = useState(filters)
	const [page, setPage] = useState(1)
	const [open, setOpen] = useState(null)

	const params = { page, ...Object.fromEntries(Object.entries(applied).filter(([, v]) => v !== '')) }
	const { data, isFetching, isError, refetch } = useGetAdminAuditQuery(params)

	const set = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })
	const apply = (e) => {
		e.preventDefault()
		setPage(1)
		setApplied(filters)
	}
	const reset = () => {
		const empty = { admin_id: '', action: '', q: '', from: '', to: '' }
		setFilters(empty)
		setApplied(empty)
		setPage(1)
	}

	return (
		<div className={`${classes.card} ${classes.page}`}>
			<div className={classes.title}>Admin activity log</div>

			<form className={classes.filters} onSubmit={apply}>
				<label>
					Admin
					<select className={classes.input} value={filters.admin_id} onChange={set('admin_id')}>
						<option value="">All</option>
						{(data?.admins ?? []).map((a) => (
							<option key={a.id} value={a.id}>
								{a.login}
							</option>
						))}
					</select>
				</label>
				<label>
					Action
					<select className={classes.input} value={filters.action} onChange={set('action')}>
						{ACTIONS.map((a) => (
							<option key={a.value} value={a.value}>
								{a.label}
							</option>
						))}
					</select>
				</label>
				<label>
					From date
					<input className={classes.input} type="date" value={filters.from} onChange={set('from')} />
				</label>
				<label>
					To date
					<input className={classes.input} type="date" value={filters.to} onChange={set('to')} />
				</label>
				<label>
					Search text / IP
					<input className={classes.input} value={filters.q} onChange={set('q')} placeholder="e.g. match name" />
				</label>
				<button className={classes.btn} type="submit">
					Show
				</button>
				<button className={classes.btnDark} type="button" onClick={reset}>
					Reset
				</button>
			</form>

			{isError && (
				<div>
					<div className={classes.error}>Failed to load the log</div>
					<button className={classes.btn} onClick={refetch}>
						Retry
					</button>
				</div>
			)}

			{data && (
				<>
					<div className={classes.hint}>
						Entries: {data.total}. Times are Moscow time. Click an entry to see details.
					</div>
					<div className={classes.logList} style={{ opacity: isFetching ? 0.5 : 1 }}>
						{data.items.length === 0 && <div className={classes.hint}>No entries found</div>}
						{data.items.map((item) => {
							const [label, kind] = ACTION_LABELS[item.action] ?? [item.action]
							return (
								<div key={item.id} className={classes.logItem}>
									<div className={classes.logHead} onClick={() => setOpen(open === item.id ? null : item.id)}>
										<span className={classes.logTime}>{formatTime(item.created_at)}</span>
										<span className={classes.logWho}>{item.admin_login || '—'}</span>
										<span className={`${classes.tag} ${kind === 'warn' ? classes.tagWarn : kind === 'ok' ? classes.tagOk : ''}`}>{label}</span>
										<span className={classes.logSummary}>{item.summary}</span>
									</div>
									{open === item.id && <Details item={item} />}
								</div>
							)
						})}
					</div>
					<div className={classes.pager}>
						<button className={classes.btnDark} disabled={page <= 1 || isFetching} onClick={() => setPage(page - 1)}>
							Back
						</button>
						<span>
							{data.page} / {data.last_page}
						</span>
						<button className={classes.btnDark} disabled={page >= data.last_page || isFetching} onClick={() => setPage(page + 1)}>
							Next
						</button>
					</div>
				</>
			)}
			{!data && !isError && <div>Loading...</div>}
		</div>
	)
}

export default AuditLogPage
