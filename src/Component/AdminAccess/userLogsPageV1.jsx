import React, { useState } from 'react'
import classes from './adminAccess.module.css'
import { useGetAdminUserLogsQuery } from '../../store/api/apiSlice'
import RefreshButton from './refreshButton'
import { PrefixBadge } from '../AdminUsers/usersPage'

const WARN = ['login_blocked', 'account_delete']
const OK = ['login']

const formatTime = (value) => {
	if (!value) return ''
	const [date, time] = String(value).replace('T', ' ').split(' ')
	const [y, m, d] = date.split('-')
	return `${d}.${m}.${y} ${(time ?? '').slice(0, 8)}`
}

const show = (v) => {
	if (v === null || v === undefined || v === '') return '—'
	if (typeof v === 'boolean') return v ? 'yes' : 'no'
	if (typeof v === 'object') return JSON.stringify(v)
	return String(v)
}

const Details = ({ item }) => {
	const d = item.details ?? {}
	const changes = Array.isArray(d.changes) ? d.changes : []
	const rest = Object.entries(d).filter(([k]) => k !== 'changes')

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
			{rest.map(([k, v]) => (
				<div key={k}>
					{k}: {show(v)}
				</div>
			))}
			<div className={classes.hint}>
				User ID: {show(item.user_id)} · IP: {show(item.ip)} · Request: {show(item.request)} · entry #{item.id}
			</div>
			<div className={classes.hint}>User agent: {show(item.user_agent)}</div>
			{item.meta && (
				<div className={classes.hint}>
					{Object.entries(item.meta)
						.map(([k, v]) => `${k}: ${v}`)
						.join(' · ')}
				</div>
			)}
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
					<div className={classes.logList} style={{ opacity: isFetching ? 0.5 : 1 }}>
						{data.data.length === 0 && <div className={classes.hint}>No entries found</div>}
						{data.data.map((item) => (
							<div key={item.id} className={classes.logItem}>
								<div className={classes.logHead} onClick={() => setOpen(open === item.id ? null : item.id)}>
									<span className={classes.logTime}>{formatTime(item.created_at)}</span>
									<span className={classes.logWho}>
										{item.user_label || '—'} <PrefixBadge prefix={item.prefix} />
									</span>
									<span className={`${classes.tag} ${WARN.includes(item.action) ? classes.tagWarn : OK.includes(item.action) ? classes.tagOk : ''}`}>{item.action_label}</span>
									<span className={classes.logSummary}>{item.summary}</span>
								</div>
								{open === item.id && <Details item={item} />}
							</div>
						))}
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
