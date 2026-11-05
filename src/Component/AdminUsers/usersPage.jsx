import React, { useEffect, useMemo, useState } from 'react'
import { countries } from 'country-flags-svg'
import SearchSelect from '../UI/SearchSelect/searchSelect'
import CountryFlagPlayer from '../../Function/countryFlagPlayer'
import classes from '../AdminAccess/adminAccess.module.css'
import RefreshButton from '../AdminAccess/refreshButton'
import {
	useAdminUserActionMutation,
	useDeleteAdminUserMutation,
	useDeleteAdminUserPrefixMutation,
	useGetAdminUserPrefixesQuery,
	useGetAdminUserQuery,
	useGetAdminUsersQuery,
	useGetPlayersQuery,
	useGetTeamsQuery,
	useSaveAdminUserPrefixMutation,
} from '../../store/api/apiSlice'

const SITE = 'https://rankoff.org'
const errorMessage = (error) => error?.data?.message || 'Something went wrong, try again'
// Last online: сервер отдаёт UTC (ISO Z), показываем в часовом поясе админа
const formatSeen = (iso) =>
	iso ? new Date(iso).toLocaleString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '—'

const formatTime = (value) => (value ? String(value).replace('T', ' ').slice(0, 16) : '—')

const STATUSES = [
	{ value: 'all', label: 'All users' },
	{ value: 'blocked', label: 'Blocked' },
	{ value: 'public', label: 'Public profiles' },
	{ value: 'private', label: 'Private profiles' },
	{ value: 'prefixed', label: 'With prefix' },
]

// Префикс как приписка к нику: подпись цветом префикса
export const PrefixBadge = ({ prefix }) =>
	prefix ? <span style={{ color: prefix.color, border: `1px solid ${prefix.color}`, borderRadius: 4, padding: '0 6px', fontSize: '0.85em', fontWeight: 700, whiteSpace: 'nowrap' }}>{prefix.label}</span> : null

const COUNTRY_OPTIONS = countries
	.filter((c) => c.iso2 && c.name)
	.map((c) => ({ iso2: c.iso2, name: c.name }))
	.sort((a, b) => a.name.localeCompare(b.name))

const playerKey = (p) => p.player_id
const playerLabel = (p) => p.nickname ?? ''
const teamKey = (t) => t.team_id
const teamLabel = (t) => t.name_team ?? ''
const teamMatches = (t, q) => t.name_team?.toLowerCase().includes(q) || t.tag_team?.toLowerCase().includes(q)
const renderPlayer = (p) => (
	<>
		<CountryFlagPlayer player_id={p.player_id} />
		{p.nickname}
	</>
)

const userName = (u) => u.display_name || u.first_name || u.handle || `user #${u.id}`

const Avatar = ({ user }) =>
	user.photo_url ? (
		<img src={user.photo_url} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
	) : (
		<span style={{ display: 'inline-flex', width: 32, height: 32, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: 'var(--buttonDark)' }}>{userName(user).slice(0, 1).toUpperCase()}</span>
	)

const ProfileLink = ({ user }) => {
	if (!user.handle) return <span className={classes.hint}>no handle</span>
	if (!user.is_public) return <span className={classes.hint}>@{user.handle} (private)</span>
	return (
		<a className={classes.link} href={`${SITE}/user/${user.handle}`} target="_blank" rel="noreferrer">
			@{user.handle}
		</a>
	)
}

// ---------------------------------------------------------------- карточка пользователя

const UserCard = ({ id, prefixes, onChanged, onClose }) => {
	const { data, isFetching, refetch } = useGetAdminUserQuery(id)
	const [action, { isLoading: acting }] = useAdminUserActionMutation()
	const [removeUser, { isLoading: removing }] = useDeleteAdminUserMutation()
	const [message, setMessage] = useState(null) // { ok, text }
	const [resetFields, setResetFields] = useState({ handle: false, display_name: false, photo: false })
	const [prefixId, setPrefixId] = useState(null)

	const user = data?.user

	// ---- правка профиля
	const players = useGetPlayersQuery().data
	const teams = useGetTeamsQuery().data
	const playerOptions = useMemo(() => (players ?? []).filter((p) => p.nickname !== 'nickname'), [players])
	const teamOptions = useMemo(() => teams ?? [], [teams])
	const [form, setForm] = useState(null)

	useEffect(() => {
		if (!user) return
		setForm({
			display_name: user.display_name || '',
			handle: user.handle || '',
			country: user.country || '',
			player: user.favorite_player_id ?? null,
			team: user.favorite_team_id ?? null,
			linked: user.linked_player_id ?? null,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, playerOptions, teamOptions])

	const saveProfile = async () => {
		const body = {}
		if (form.display_name.trim() !== (user.display_name || '')) body.display_name = form.display_name
		if (form.handle.trim().toLowerCase() !== (user.handle || '').toLowerCase()) body.handle = form.handle
		if (form.country !== (user.country || '')) body.country = form.country || null
		if (form.player !== (user.favorite_player_id ?? null)) body.favorite_player_id = form.player
		if (form.team !== (user.favorite_team_id ?? null)) body.favorite_team_id = form.team
		if (form.linked !== (user.linked_player_id ?? null)) body.linked_player_id = form.linked
		if (!Object.keys(body).length) {
			setMessage({ ok: false, text: 'No changes' })
			return
		}
		await run('profile', body, 'Profile saved')
	}
	const currentPrefix = prefixId === null ? (user?.prefix?.id ?? '') : prefixId

	const run = async (name, body, okText) => {
		setMessage(null)
		const result = await action({ id, name, body })
		if (result.error) {
			setMessage({ ok: false, text: errorMessage(result.error) })
			return false
		}
		setMessage({ ok: true, text: okText })
		await refetch()
		onChanged()
		return true
	}

	const block = async () => {
		const reason = window.prompt('Reason (optional, goes to the audit log):', '')
		if (reason === null) return
		await run('block', { blocked: true, reason }, 'User blocked')
	}

	const unblock = () => run('block', { blocked: false }, 'User unblocked')

	const hide = () => {
		if (window.confirm('Make this profile private?')) run('hide', {}, 'Profile is private now')
	}

	const reset = async () => {
		const fields = Object.keys(resetFields).filter((k) => resetFields[k])
		if (!fields.length) return
		if (!window.confirm(`Reset: ${fields.join(', ')}?`)) return
		if (await run('reset', { fields }, 'Reset done')) setResetFields({ handle: false, display_name: false, photo: false })
	}

	const applyPrefix = async () => {
		if (await run('prefix', { prefix_id: currentPrefix === '' ? null : Number(currentPrefix) }, 'Prefix updated')) setPrefixId(null)
	}

	const del = async () => {
		if (!window.confirm(`Delete ${userName(user)} with all votes? This cannot be undone.`)) return
		setMessage(null)
		const result = await removeUser(id)
		if (result.error) {
			setMessage({ ok: false, text: errorMessage(result.error) })
			return
		}
		onChanged()
		onClose()
	}

	if (!user) return <div className={classes.hint}>{isFetching ? 'Loading...' : 'User not found'}</div>

	return (
		<div className={classes.logDetails} style={{ marginTop: 12 }}>
			<div className={classes.row} style={{ marginBottom: 10 }}>
				<Avatar user={user} />
				<strong>{userName(user)}</strong>
				<PrefixBadge prefix={user.prefix} />
				{user.blocked_at && <span className={`${classes.tag} ${classes.tagWarn}`}>blocked</span>}
				<span className={classes.link} onClick={onClose}>
					close
				</span>
			</div>

			<table className={classes.table}>
				<tbody>
					<tr>
						<td>ID</td>
						<td>{user.id}</td>
					</tr>
					<tr>
						<td>Telegram ID</td>
						<td>{user.telegram_id}</td>
					</tr>
					<tr>
						<td>Telegram username</td>
						<td>{user.username ? `@${user.username}` : '—'}</td>
					</tr>
					<tr>
						<td>Name from Telegram</td>
						<td>{user.first_name || '—'}</td>
					</tr>
					<tr>
						<td>Display name</td>
						<td>{user.display_name || '—'}</td>
					</tr>
					<tr>
						<td>Country</td>
						<td>{user.country || '—'}</td>
					</tr>
					<tr>
						<td>Profile</td>
						<td>
							<ProfileLink user={user} />
						</td>
					</tr>
					<tr>
						<td>Registered</td>
						<td>{formatTime(user.created_at)}</td>
					</tr>
					<tr>
						<td>Last sign-in</td>
						<td>{formatTime(user.last_login_at)}</td>
					</tr>
					<tr>
						<td>Last online</td>
						<td>{user.is_online ? <span style={{ color: '#2ea043', fontWeight: 700 }}>online now</span> : formatSeen(user.last_seen_at)}</td>
					</tr>
					<tr>
						<td>Public consent</td>
						<td>{formatTime(user.public_consent_at)}</td>
					</tr>
					<tr>
						<td>Favorite player</td>
						<td>{user.favorite_player?.nickname || '—'}</td>
					</tr>
					<tr>
						<td>Favorite team</td>
						<td>{user.favorite_team?.name_team || '—'}</td>
					</tr>
					<tr>
						<td>Champion awards</td>
						<td>
							{(user.champion_awards ?? []).length === 0
								? '—'
								: user.champion_awards.map((a) => (
										<div key={a.name_tour_sort}>
											{a.tour_name || a.name_tour_sort}: {a.team}
											{a.voters_percent !== null ? ` (${a.voters_percent}% of voters)` : ''}
										</div>
									))}
						</td>
					</tr>
					<tr>
						<td>Linked player (is this player)</td>
						<td>{user.linked_player?.nickname || '—'}</td>
					</tr>
					<tr>
						<td>Activity score (30 days)</td>
						<td>
							<b>{user.activity?.score ?? 0}</b> = 3 x {user.activity?.days ?? 0} active days + 2 x {user.activity?.predictions ?? 0} predictions + {user.activity?.minutes ?? 0} min on site / 20
							{user.activity?.last_day ? ` (last active ${user.activity.last_day})` : ''}
						</td>
					</tr>
				</tbody>
			</table>

			{form && (
				<>
					<div className={classes.title} style={{ marginTop: 14 }}>
						Edit profile
					</div>
					<div className={classes.filters}>
						<label>
							Display name
							<input className={classes.input} value={form.display_name} maxLength={64} onChange={(e) => setForm({ ...form, display_name: e.target.value })} placeholder={user.first_name || ''} />
						</label>
						<label>
							Handle (admin ignores the 14-day limit)
							<input className={classes.input} value={form.handle} maxLength={32} autoCapitalize="none" spellCheck={false} onChange={(e) => setForm({ ...form, handle: e.target.value })} />
						</label>
						<div>
							<SearchSelect
								label="Country"
								items={COUNTRY_OPTIONS}
								value={form.country}
								getKey={(c) => c.iso2}
								getLabel={(c) => c.name}
								onSelect={(c) => setForm({ ...form, country: c ? c.iso2 : '' })}
								placeholder="Start typing a country"
							/>
						</div>
						<div>
							<SearchSelect
								label="Favorite player"
								items={playerOptions}
								value={form.player}
								getKey={playerKey}
								getLabel={playerLabel}
								renderItem={renderPlayer}
								onSelect={(p) => setForm({ ...form, player: p ? p.player_id : null })}
								placeholder="Start typing a nickname"
							/>
						</div>
						<div>
							<SearchSelect
								label="Favorite team"
								items={teamOptions}
								value={form.team}
								getKey={teamKey}
								getLabel={teamLabel}
								matches={teamMatches}
								onSelect={(t) => setForm({ ...form, team: t ? t.team_id : null })}
								placeholder="Start typing a team name"
							/>
						</div>
						<div>
							<SearchSelect
								label="Linked player (the user IS this player)"
								items={playerOptions}
								value={form.linked}
								getKey={playerKey}
								getLabel={playerLabel}
								renderItem={renderPlayer}
								onSelect={(p) => setForm({ ...form, linked: p ? p.player_id : null })}
								placeholder="Start typing a nickname"
							/>
						</div>
						<button className={classes.btn} disabled={acting} onClick={saveProfile}>
							Save profile
						</button>
					</div>
				</>
			)}

			<div className={classes.title} style={{ marginTop: 14 }}>
				Actions
			</div>
			<div className={classes.row}>
				{user.blocked_at ? (
					<button className={classes.btn} disabled={acting} onClick={unblock}>
						Unblock
					</button>
				) : (
					<button className={classes.btnDark} disabled={acting} onClick={block}>
						Block
					</button>
				)}
				{user.is_public && (
					<button className={classes.btnDark} disabled={acting} onClick={hide}>
						Make profile private
					</button>
				)}
				<button className={classes.btnDark} disabled={removing} onClick={del}>
					Delete user
				</button>
			</div>

			<div className={classes.hint} style={{ marginTop: 10 }}>
				Reset (the user can fill these in again):
			</div>
			<div className={classes.row}>
				<div className={classes.checks}>
					{[
						['handle', 'Handle (also makes the profile private)'],
						['display_name', 'Display name'],
						['photo', 'Photo'],
					].map(([key, label]) => (
						<label key={key}>
							<input type="checkbox" checked={resetFields[key]} onChange={(e) => setResetFields({ ...resetFields, [key]: e.target.checked })} />
							{label}
						</label>
					))}
				</div>
				<button className={classes.btnDark} disabled={acting || !Object.values(resetFields).some(Boolean)} onClick={reset}>
					Reset selected
				</button>
			</div>

			<div className={classes.hint} style={{ marginTop: 10 }}>
				Prefix:
			</div>
			<div className={classes.row}>
				<select className={classes.input} style={{ maxWidth: 240 }} value={currentPrefix} onChange={(e) => setPrefixId(e.target.value)}>
					<option value="">No prefix</option>
					{prefixes.map((p) => (
						<option key={p.id} value={p.id}>
							{p.label}
						</option>
					))}
				</select>
				<button className={classes.btn} disabled={acting || String(currentPrefix) === String(user.prefix?.id ?? '')} onClick={applyPrefix}>
					Apply
				</button>
			</div>

			{message && (
				<div className={message.ok ? classes.ok : classes.error} style={{ marginTop: 10 }}>
					{message.text}
				</div>
			)}

			<div className={classes.title} style={{ marginTop: 14 }}>
				Votes ({data.votes_total})
			</div>
			{data.votes.length === 0 && <div className={classes.hint}>No votes</div>}
			{data.votes.length > 0 && (
				<table className={classes.table}>
					<tbody>
						{data.votes.map((v) => (
							<tr key={v.poll_id}>
								<td>{v.title}</td>
								<td>
									{v.nickname}
									{v.team ? ` (${v.team})` : ''}
								</td>
								<td>{formatTime(v.voted_at)}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

// ---------------------------------------------------------------- префиксы

const PrefixRow = ({ prefix, onChanged }) => {
	const [save, { isLoading }] = useSaveAdminUserPrefixMutation()
	const [remove] = useDeleteAdminUserPrefixMutation()
	const [label, setLabel] = useState(prefix.label)
	const [color, setColor] = useState(prefix.color)
	const [error, setError] = useState('')
	const changed = label !== prefix.label || color !== prefix.color

	const submit = async () => {
		setError('')
		const result = await save({ id: prefix.id, body: { label, color } })
		if (result.error) return setError(errorMessage(result.error))
		onChanged()
	}

	const del = async () => {
		if (!window.confirm(`Delete prefix [${prefix.label}]? It will be removed from ${prefix.users_count} user(s).`)) return
		const result = await remove(prefix.id)
		if (result.error) return setError(errorMessage(result.error))
		onChanged()
	}

	return (
		<tr>
			<td>
				<PrefixBadge prefix={{ label, color }} />
			</td>
			<td>
				<input className={classes.input} style={{ maxWidth: 200 }} value={label} maxLength={24} onChange={(e) => setLabel(e.target.value)} />
			</td>
			<td>
				<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
			</td>
			<td>{prefix.users_count}</td>
			<td>
				<div className={classes.row}>
					<button className={classes.btn} disabled={!changed || isLoading} onClick={submit}>
						Save
					</button>
					<button className={classes.btnDark} onClick={del}>
						Delete
					</button>
				</div>
				{error && <div className={classes.error}>{error}</div>}
			</td>
		</tr>
	)
}

const PrefixesTab = ({ prefixes, onChanged }) => {
	const [save, { isLoading }] = useSaveAdminUserPrefixMutation()
	const [label, setLabel] = useState('')
	const [color, setColor] = useState('#e0a526')
	const [error, setError] = useState('')

	const create = async (e) => {
		e.preventDefault()
		setError('')
		const result = await save({ id: null, body: { label, color } })
		if (result.error) return setError(errorMessage(result.error))
		setLabel('')
		onChanged()
	}

	return (
		<div>
			<form className={classes.row} onSubmit={create} style={{ marginBottom: 14 }}>
				<input className={classes.input} style={{ maxWidth: 220 }} placeholder="New prefix label" maxLength={24} value={label} onChange={(e) => setLabel(e.target.value)} />
				<input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
				<PrefixBadge prefix={label ? { label, color } : null} />
				<button className={classes.btn} type="submit" disabled={isLoading || !label.trim()}>
					Create prefix
				</button>
			</form>
			{error && <div className={classes.error}>{error}</div>}
			<table className={classes.table}>
				<thead>
					<tr>
						<th>Preview</th>
						<th>Label</th>
						<th>Color</th>
						<th>Users</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{prefixes.map((p) => (
						<PrefixRow key={`${p.id}-${p.label}-${p.color}`} prefix={p} onChanged={onChanged} />
					))}
				</tbody>
			</table>
			{prefixes.length === 0 && <div className={classes.hint}>No prefixes yet</div>}
		</div>
	)
}

// ---------------------------------------------------------------- страница

const UsersPage = () => {
	const [tab, setTab] = useState('users')
	const [filters, setFilters] = useState({ q: '', status: 'all' })
	const [applied, setApplied] = useState({ q: '', status: 'all' })
	const [page, setPage] = useState(1)
	// Сортировка таблицы: поле и направление уходят на сервер (сортируется весь список, а не одна страница)
	const [sort, setSort] = useState({ by: 'id', dir: 'desc' })
	const toggleSort = (by) => {
		setSort((prev) => (prev.by === by ? { by, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { by, dir: by === 'name' || by === 'telegram' ? 'asc' : 'desc' }))
		setPage(1)
		setSelected(null)
	}
	const sortMark = (by) => (sort.by === by ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : '')
	const sortTh = { cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }
	const [selected, setSelected] = useState(null)

	const { data, isFetching, isError, refetch } = useGetAdminUsersQuery({ ...applied, sort: sort.by, dir: sort.dir, page }, { refetchOnMountOrArgChange: true })
	const prefixesQuery = useGetAdminUserPrefixesQuery(undefined, { refetchOnMountOrArgChange: true })
	const prefixes = prefixesQuery.data ?? []

	const apply = (e) => {
		e.preventDefault()
		setPage(1)
		setSelected(null)
		setApplied(filters)
	}

	return (
		<div className={`${classes.card} ${classes.page}`}>
			<div className={classes.title}>Users</div>
			<div className={classes.row}>
				<button className={tab === 'users' ? classes.btn : classes.btnDark} onClick={() => setTab('users')}>
					Users
				</button>
				<button className={tab === 'prefixes' ? classes.btn : classes.btnDark} onClick={() => setTab('prefixes')}>
					Prefixes
				</button>
			</div>

			{tab === 'prefixes' && (
				<PrefixesTab
					prefixes={prefixes}
					onChanged={() => {
						prefixesQuery.refetch()
						refetch()
					}}
				/>
			)}

			{tab === 'users' && (
				<>
					<form className={classes.filters} onSubmit={apply}>
						<label>
							Search (name, handle, @username, id, Telegram ID)
							<input className={classes.input} value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
						</label>
						<label>
							Show
							<select className={classes.input} value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
								{STATUSES.map((s) => (
									<option key={s.value} value={s.value}>
										{s.label}
									</option>
								))}
							</select>
						</label>
						<button className={classes.btn} type="submit">
							Show
						</button>
						<RefreshButton onClick={refetch} spinning={isFetching} />
					</form>

					{isError && <div className={classes.error}>Failed to load users</div>}
					{data && (
						<>
							<div className={classes.hint}>Users: {data.total}</div>
							<div style={{ opacity: isFetching ? 0.5 : 1, overflowX: 'auto' }}>
								<table className={classes.table}>
									<thead>
										<tr>
											<th></th>
											<th style={sortTh} onClick={() => toggleSort('name')}>
												Name{sortMark('name')}
											</th>
											<th>Profile</th>
											<th className={classes.hideMobile} style={sortTh} onClick={() => toggleSort('telegram')}>
												Telegram{sortMark('telegram')}
											</th>
											<th style={sortTh} onClick={() => toggleSort('votes')}>
												Votes{sortMark('votes')}
											</th>
											<th style={sortTh} onClick={() => toggleSort('activity')}>
												Activity{sortMark('activity')}
											</th>
											<th className={classes.hideMobile} style={sortTh} onClick={() => toggleSort('registered')}>
												Registered{sortMark('registered')}
											</th>
											<th className={classes.hideMobile} style={sortTh} onClick={() => toggleSort('last_login')}>
												Last sign-in{sortMark('last_login')}
											</th>
											<th style={sortTh} onClick={() => toggleSort('last_seen')}>
												Last online{sortMark('last_seen')}
											</th>
											<th style={sortTh} onClick={() => toggleSort('status')}>
												Status{sortMark('status')}
											</th>
										</tr>
									</thead>
									<tbody>
										{data.data.map((u) => (
											<React.Fragment key={u.id}>
												<tr
													style={{ cursor: 'pointer', background: selected === u.id ? 'rgba(127,127,127,0.15)' : undefined }}
													className={u.blocked_at ? classes.blocked : undefined}
													onClick={() => setSelected(selected === u.id ? null : u.id)}>
													<td>
														<Avatar user={u} />
													</td>
													<td>
														<span style={{ marginRight: 6 }}>{userName(u)}</span>
														<PrefixBadge prefix={u.prefix} />
													</td>
													<td onClick={(e) => e.stopPropagation()}>
														<ProfileLink user={u} />
													</td>
													<td className={classes.hideMobile}>{u.username ? `@${u.username}` : '—'}</td>
													<td>{u.votes_count}</td>
													<td>{u.activity?.score ?? 0}</td>
													<td className={classes.hideMobile}>{formatTime(u.created_at)}</td>
													<td className={classes.hideMobile}>{formatTime(u.last_login_at)}</td>
													<td style={{ whiteSpace: 'nowrap' }}>
														{u.is_online ? <span style={{ color: '#2ea043', fontWeight: 700 }}>online now</span> : formatSeen(u.last_seen_at)}
													</td>
													<td>{u.blocked_at ? 'blocked' : u.is_public ? 'public' : 'private'}</td>
												</tr>
												{selected === u.id && (
													<tr>
														<td colSpan={10}>
															<UserCard id={u.id} prefixes={prefixes} onChanged={refetch} onClose={() => setSelected(null)} />
														</td>
													</tr>
												)}
											</React.Fragment>
										))}
									</tbody>
								</table>
								{data.data.length === 0 && <div className={classes.hint}>No users found</div>}
							</div>
							<div className={classes.pager}>
								<button
									className={classes.btnDark}
									disabled={page <= 1 || isFetching}
									onClick={() => {
										setPage(page - 1)
										setSelected(null)
									}}>
									Back
								</button>
								<span>
									{data.page} / {data.last_page}
								</span>
								<button
									className={classes.btnDark}
									disabled={page >= data.last_page || isFetching}
									onClick={() => {
										setPage(page + 1)
										setSelected(null)
									}}>
									Next
								</button>
							</div>
						</>
					)}
					{!data && !isError && <div>Loading...</div>}
				</>
			)}
		</div>
	)
}

export default UsersPage
