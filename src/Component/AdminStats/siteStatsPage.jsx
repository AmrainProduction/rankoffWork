import React, { useMemo, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import classes from './siteStatsPage.module.css'
import RefreshButton from '../AdminAccess/refreshButton'
import { useGetAdminSiteStatsHistoryQuery, useGetAdminSiteStatsQuery } from '../../store/api/apiSlice'

const REFRESH_MS = 15000

const RANGES = [
	{ value: '24h', label: '24 hours' },
	{ value: '7d', label: '7 days' },
	{ value: '30d', label: '30 days' },
	{ value: '90d', label: '90 days' },
	{ value: 'all', label: 'All time' },
]

const COLORS = { online: '#4aa3ff', registered: '#4fb86a', peak: '#8f8fa3', users: '#e0a43c', predictors: '#c46cf0' }

const pad = (n) => String(n).padStart(2, '0')
const formatAxis = (iso, range) => {
	const d = new Date(iso)
	return range === '24h' ? `${pad(d.getHours())}:${pad(d.getMinutes())}` : range === '7d' ? `${pad(d.getDate())}.${pad(d.getMonth() + 1)} ${pad(d.getHours())}:00` : `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`
}
const formatFull = (iso) => {
	const d = new Date(iso)
	return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

// Сколько секунд или минут назад пользователь был активен (относительно времени ответа сервера)
const secondsAgo = (iso, now) => {
	const sec = Math.max(0, Math.round((new Date(now) - new Date(iso)) / 1000))
	return sec < 60 ? `${sec} s ago` : `${Math.floor(sec / 60)} min ago`
}

const UserPhoto = ({ user }) =>
	user.photo_url ? (
		<img className={classes.userPhoto} src={user.photo_url} alt="" referrerPolicy="no-referrer" />
	) : (
		<span className={classes.userPhoto}>{(user.name || '?').slice(0, 1).toUpperCase()}</span>
	)

const Card = ({ title, value, hint }) => (
	<div className={classes.card}>
		<div className={classes.cardTitle}>{title}</div>
		<div className={classes.cardValue}>{value ?? '—'}</div>
		{hint && <div className={classes.cardHint}>{hint}</div>}
	</div>
)

const Chart = ({ title, data, range, lines }) => (
	<div className={classes.chartBox}>
		<div className={classes.chartTitle}>{title}</div>
		{data.length < 2 ? (
			<div className={classes.empty}>Not enough data yet: a snapshot is saved every 5 minutes while the site has visitors</div>
		) : (
			<ResponsiveContainer width="100%" height={240}>
				<LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
					<CartesianGrid stroke="#ffffff22" strokeDasharray="3 3" />
					<XAxis dataKey="t" tickFormatter={(v) => formatAxis(v, range)} stroke="#aaa" minTickGap={30} />
					<YAxis stroke="#aaa" allowDecimals={false} width={40} />
					<Tooltip labelFormatter={formatFull} contentStyle={{ background: '#1a1a20', border: '1px solid #444' }} />
					<Legend />
					{lines.map((l) => (
						<Line key={l.key} type="monotone" dataKey={l.key} name={l.name} stroke={l.color} strokeWidth={2} dot={false} strokeDasharray={l.dashed ? '4 4' : undefined} isAnimationActive={false} />
					))}
				</LineChart>
			</ResponsiveContainer>
		)}
	</div>
)

// Статистика сайта (только суперадмин): онлайн сейчас, зарегистрированные, предиктеры, топ страниц и графики по истории
const SiteStatsPage = () => {
	const [range, setRange] = useState('24h')
	const stats = useGetAdminSiteStatsQuery(undefined, { pollingInterval: REFRESH_MS })
	const history = useGetAdminSiteStatsHistoryQuery(range, { pollingInterval: 60000 })
	const data = stats.data
	const points = useMemo(() => history.data?.points ?? [], [history.data])

	if (stats.isError && !data) {
		return <div className={classes.page}>{stats.error?.data?.message || 'Failed to load the statistics'}</div>
	}

	return (
		<div className={classes.page}>
			<div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
				<RefreshButton
					onClick={() => {
						stats.refetch()
						history.refetch()
					}}
					spinning={stats.isFetching || history.isFetching}
				/>
			</div>
			<div className={classes.cards}>
				<Card title="Online now" value={data?.online} hint="active in the last 2 minutes" />
				<Card title="Registered online" value={data?.online_registered} hint={data ? `${data.online_guests} guests` : undefined} />
				<Card title="Registered users" value={data?.total_users} />
				<Card title="Users with match predictions" value={data?.predictors} hint={data && data.total_users ? `${Math.round((data.predictors / data.total_users) * 100)}% of registered` : undefined} />
			</div>

			<div className={classes.sectionTitle}>Users online now{data ? ` (${data.online_users?.length ?? 0})` : ''}</div>
			<div className={classes.tableWrap}>
				<table className={classes.table}>
					<thead>
						<tr>
							<th>User</th>
							<th>Telegram</th>
							<th>Page</th>
							<th>Last activity</th>
							<th>Tabs</th>
						</tr>
					</thead>
					<tbody>
						{(data?.online_users ?? []).map((u) => (
							<tr key={u.id}>
								<td>
									<span className={classes.userCell}>
										<UserPhoto user={u} />
										<span>
											{u.name || `user #${u.id}`}
											{u.handle && <span className={classes.userHandle}> @{u.handle}</span>}
											{u.blocked && <span className={classes.userBlocked}> blocked</span>}
										</span>
									</span>
								</td>
								<td>{u.username ? `@${u.username}` : '—'}</td>
								<td className={classes.path}>{u.path}</td>
								<td>{secondsAgo(u.last_seen, data.updated_at)}</td>
								<td>{u.tabs}</td>
							</tr>
						))}
						{data && (data.online_users ?? []).length === 0 && (
							<tr>
								<td colSpan={5} className={classes.empty}>
									No registered users online right now
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className={classes.sectionTitle}>Top pages (unique visitors in the last 24 hours)</div>
			<div className={classes.tableWrap}>
				<table className={classes.table}>
					<thead>
						<tr>
							<th>Page</th>
							<th>Online now</th>
							<th>Visitors, 24h</th>
						</tr>
					</thead>
					<tbody>
						{(data?.top_pages ?? []).map((p) => (
							<tr key={p.path}>
								<td className={classes.path}>{p.path}</td>
								<td>{p.online}</td>
								<td>{p.visitors_24h}</td>
							</tr>
						))}
						{data && data.top_pages.length === 0 && (
							<tr>
								<td colSpan={3} className={classes.empty}>
									No visits recorded yet
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className={classes.sectionTitle}>Top exact pages (unique visitors in the last 24 hours)</div>
			<div className={classes.tableWrap}>
				<table className={classes.table}>
					<thead>
						<tr>
							<th>Page</th>
							<th>Visitors, 24h</th>
						</tr>
					</thead>
					<tbody>
						{(data?.top_exact_pages ?? []).map((p) => (
							<tr key={p.path}>
								<td className={classes.path}>{p.path}</td>
								<td>{p.visitors_24h}</td>
							</tr>
						))}
						{data && (data.top_exact_pages ?? []).length === 0 && (
							<tr>
								<td colSpan={2} className={classes.empty}>
									No data yet (run exact_paths.sql, then wait for visits)
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className={classes.sectionTitle}>History</div>
			<div className={classes.ranges}>
				{RANGES.map((r) => (
					<button key={r.value} type="button" className={`${classes.rangeBtn} ${range === r.value ? classes.rangeActive : ''}`} onClick={() => setRange(r.value)}>
						{r.label}
					</button>
				))}
			</div>
			<div className={classes.hint}>{range === '24h' ? 'Snapshots every 5 minutes' : range === '7d' ? 'Hourly averages, dashed line is the hourly peak' : 'Daily averages, dashed line is the daily peak'}</div>
			<Chart
				title="Online"
				data={points}
				range={range}
				lines={[
					{ key: 'online', name: 'Online (avg)', color: COLORS.online },
					{ key: 'online_registered', name: 'Registered online (avg)', color: COLORS.registered },
					...(range === '24h' ? [] : [{ key: 'online_peak', name: 'Peak online', color: COLORS.peak, dashed: true }]),
				]}
			/>
			<Chart
				title="Registered users and users with predictions"
				data={points}
				range={range}
				lines={[
					{ key: 'total_users', name: 'Registered users', color: COLORS.users },
					{ key: 'predictors', name: 'With predictions', color: COLORS.predictors },
				]}
			/>
		</div>
	)
}

export default SiteStatsPage
