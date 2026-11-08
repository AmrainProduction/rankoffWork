import React, { useState } from 'react'
import classes from './adminAccess.module.css'
import { useGetAdminUserLogsQuery } from '../../store/api/apiSlice'
import RefreshButton from './refreshButton'
import { PrefixBadge } from '../AdminUsers/usersPage'

const WARN = ['login_blocked', 'account_delete']
const OK = ['login']

const pad = (n) => String(n).padStart(2, '0')

// "2026-11-05 23:11:04" -> { day: '05.11.2026', time: '23:11:04' }
const splitTime = (value) => {
	if (!value) return { day: '', time: '' }
	const [date, time] = String(value).replace('T', ' ').split(' ')
	const [y, m, d] = date.split('-')
	return { day: `${pad(d)}.${pad(m)}.${y}`, time: (time ?? '').slice(0, 8) }
}

// "Name @handle (tg 123)" -> { name, handle, tg }
const parseLabel = (label) => {
	if (!label) return { name: 'Unknown user', handle: '', tg: '' }
	const m = String(label).match(/^(.*?)\s*(?:@(\S+))?\s*\(tg\s*(\d+)\)$/)
	if (!m) return { name: label, handle: '', tg: '' }
	return { name: m[1].trim() || (m[2] ? `@${m[2]}` : `tg ${m[3]}`), handle: m[1].trim() ? m[2] || '' : '', tg: m[3] }
}

const humanKey = (k) => {
	const t = String(k).replace(/_/g, ' ')
	return t.charAt(0).toUpperCase() + t.slice(1)
}

const show = (v) => {
	if (v === null || v === undefined || v === '') return '—'
	if (typeof v === 'boolean') return v ? 'yes' : 'no'
	if (typeof v === 'object') return JSON.stringify(v)
	return String(v)
}

// Telegram username ссылкой (t.me). Если username нет — показываем ID со ссылкой tg://user (открывается в приложении Telegram)
const TgLink = ({ tg, username }) => {
	if (!tg) return <span className={classes.hint}>—</span>
	const href = username ? `https://t.me/${username}` : `tg://user?id=${tg}`
	return (
		<a className={classes.ulTg} href={href} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} title={username ? `Open @${username} in Telegram` : 'No username: opens by ID in the Telegram app'}>
			{username ? `@${username}` : `ID ${tg}`}
		</a>
	)
}

const Section = ({ title, children }) => (
	<div className={classes.ulSection}>
		<div className={classes.ulSectionTitle}>{title}</div>
		{children}
	</div>
)

const Row = ({ label, value }) => (
	<div className={classes.ulRow}>
		<span className={classes.ulLabel}>{label}</span>
		<span className={classes.ulValue}>{show(value)}</span>
	</div>
)

const Details = ({ item }) => {
	const d = item.details ?? {}
	const changes = Array.isArray(d.changes) ? d.changes : []
	const rest = Object.entries(d).filter(([k]) => k !== 'changes')
	const who = parseLabel(item.user_label)
	const t = splitTime(item.created_at)

	return (
		<div className={classes.ulDetails}>
			<Section title="What happened">
				<Row label="Action" value={item.action_label} />
				<Row label="Description" value={item.summary} />
				<Row label="When" value={`${t.day} ${t.time} (Moscow)`} />
				{rest.map(([k, v]) => (
					<Row key={k} label={humanKey(k)} value={v} />
				))}
				{changes.length > 0 && (
					<div className={classes.ulChanges}>
						<div className={classes.ulChangesHead}>
							<span>Field</span>
							<span>Was</span>
							<span>Became</span>
						</div>
						{changes.map((c) => (
							<div key={c.field} className={classes.ulChangesRow}>
								<span>{c.label}</span>
								<span className={classes.from}>{show(c.from)}</span>
								<span className={classes.to}>{show(c.to)}</span>
							</div>
						))}
					</div>
				)}
			</Section>

			<Section title="Who">
				<Row label="Name" value={who.name} />
				<Row label="Username" value={who.handle ? `@${who.handle}` : null} />
				<Row label="User ID" value={item.user_id} />
				<div className={classes.ulRow}>
					<span className={classes.ulLabel}>Telegram</span>
					<span className={classes.ulValue}>
						<TgLink tg={who.tg} username={item.tg_username} />
					</span>
				</div>
				<Row label="Telegram ID" value={who.tg} />
			</Section>

			<Section title="Technical">
				<Row label="IP" value={item.ip} />
				<Row label="Request" value={item.request} />
				<Row label="User agent" value={item.user_agent} />
				{item.meta && Object.entries(item.meta).map(([k, v]) => <Row key={k} label={humanKey(k)} value={v} />)}
				<Row label="Log entry" value={`#${item.id}`} />
			</Section>
		</div>
	)
}

// User activity log (только суперадмин): входы, правки профиля, голосования, предикты. Хранится 180 дней
const UserLogsPage = () => {
	const empty = { q: '', action: '', prefix: '', from: '', to: '' }
	const [filters, setFilters] = useState(empty)
	const [applied, setApplied] = useState(empty)
	const [page, setPage] = useState(1)
	const [open, setOpen] = useState(null)

	const params = { page, ...Object.fromEntries(Object.entries(applied).filter(([, v]) => v !== '')) }
	const { data, isFetching, isError, refetch } = useGetAdminUserLogsQuery(params)

	const set = (key) => (e) => setFilters({ ...filters, [key]: e.target.value })
	const apply = (e) => {
		e.preventDefault()
		setPage(1)
		setApplied(filters)
	}
	const reset = () => {
		setFilters(empty)
		setApplied(empty)
		setPage(1)
	}

	return (
		<div className={`${classes.card} ${classes.page}`}>
			<div className={classes.title}>User activity log</div>

			<form className={classes.filters} onSubmit={apply}>
				<label>
					User (ID, name, @handle, Telegram ID) or IP
					<input className={classes.input} value={filters.q} onChange={set('q')} placeholder="e.g. 15 or @username" />
				</label>
				<label>
					Action
					<select className={classes.input} value={filters.action} onChange={set('action')}>
						<option value="">All actions</option>
						{(data?.actions ?? []).map((a) => (
							<option key={a.value} value={a.value}>
								{a.label}
							</option>
						))}
					</select>
				</label>
				<label>
					Prefix
					<select className={classes.input} value={filters.prefix} onChange={set('prefix')}>
						<option value="">All users</option>
						<option value="any">Any prefix</option>
						<option value="none">No prefix</option>
						{(data?.prefixes ?? []).map((p) => (
							<option key={p.id} value={p.id}>
								{p.label}
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
				<button className={classes.btn} type="submit">
					Show
				</button>
				<button className={classes.btnDark} type="button" onClick={reset}>
					Reset
				</button>
				<RefreshButton onClick={refetch} spinning={isFetching} />
			</form>

			{isError && (
				<div>
					<div className={classes.error}>Failed to load the log (is user_logs.sql applied?)</div>
					<button className={classes.btn} onClick={refetch}>
						Retry
					</button>
				</div>
			)}

			{data && (
				<>
					<div className={classes.ulList} style={{ opacity: isFetching ? 0.5 : 1 }}>
						{data.data.length === 0 && <div className={classes.hint}>No entries found</div>}
						{data.data.map((item, i) => {
							const t = splitTime(item.created_at)
							const prev = i > 0 ? splitTime(data.data[i - 1].created_at).day : null
							const who = parseLabel(item.user_label)
							const tone = WARN.includes(item.action) ? classes.ulWarn : OK.includes(item.action) ? classes.ulOk : ''
							return (
								<React.Fragment key={item.id}>
									{t.day !== prev && <div className={classes.ulDay}>{t.day}</div>}
									<div className={`${classes.ulItem} ${open === item.id ? classes.ulItemOpen : ''}`}>
										<div className={classes.ulHead} onClick={() => setOpen(open === item.id ? null : item.id)}>
											<span className={classes.ulTime}>{t.time}</span>
											<span className={classes.ulWho}>
												<span className={classes.ulName}>{who.name}</span>
												<PrefixBadge prefix={item.prefix} />
												{who.handle && <span className={classes.hint}>@{who.handle}</span>}
											</span>
											<span className={classes.ulTgCell}>
												<TgLink tg={who.tg} username={item.tg_username} />
											</span>
											<span className={`${classes.ulTag} ${tone}`}>{item.action_label}</span>
											<span className={classes.ulSummary}>{item.summary}</span>
											<span className={classes.ulArrow}>{open === item.id ? '▲' : '▼'}</span>
										</div>
										{open === item.id && <Details item={item} />}
									</div>
								</React.Fragment>
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

export default UserLogsPage
