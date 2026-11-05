import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import classes from './adminAccess.module.css'
import RefreshButton from './refreshButton'
import { useCreateAdminMutation, useGetAdminsQuery, useGetTournamentsQuery, useUpdateAdminMutation } from '../../store/api/apiSlice'
import { PERMISSION_LABELS } from '../../Function/adminAccess'
import SearchSelect from '../UI/SearchSelect/searchSelect'

const errorMessage = (error) => error?.data?.message || 'Something went wrong, try again'

const PermissionChecks = ({ list, value, onChange, disabled }) => (
	<div className={classes.checks}>
		{list.map((p) => (
			<label key={p}>
				<input type="checkbox" disabled={disabled} checked={value.includes(p)} onChange={(e) => onChange(e.target.checked ? [...value, p] : value.filter((x) => x !== p))} />
				{PERMISSION_LABELS[p] ?? p}
			</label>
		))}
	</div>
)

// Турниры, на которые распространяется право «матчи назначенных турниров»: чипы и добавление из списка существующих
const TournamentsEditor = ({ value, onChange, options }) => {
	const [text, setText] = useState('')
	const known = options.includes(text)

	const add = () => {
		if (!known || value.includes(text)) return
		onChange([...value, text])
		setText('')
	}

	return (
		<div>
			<div className={classes.hint}>Tournaments (name_tour_sort):</div>
			<div className={classes.checks}>
				{value.map((t) => (
					<span key={t}>
						{t}{' '}
						<span className={classes.link} onClick={() => onChange(value.filter((x) => x !== t))}>
							remove
						</span>
					</span>
				))}
				{value.length === 0 && <span className={classes.hint}>none yet</span>}
			</div>
			<div className={classes.row} style={{ marginTop: 6 }}>
				<div style={{ width: 280 }}>
					<SearchSelect items={options} value={text} getKey={(t) => t} getLabel={(t) => t} onSelect={(t) => setText(t ?? '')} placeholder="Start typing a tournament" />
				</div>
				<button type="button" className={classes.btnDark} onClick={add} disabled={!known}>
					Add
				</button>
			</div>
		</div>
	)
}

// Управление администраторами (только суперадмин): создание, права по разделам, блокировка, сброс пароля
const AdminsPage = () => {
	const { admin: me } = useOutletContext()
	const { data, isLoading, isError, isFetching, refetch } = useGetAdminsQuery()
	const [createAdmin, { isLoading: isCreating, error: createError, reset: resetCreate }] = useCreateAdminMutation()
	const [updateAdmin, { error: updateError, reset: resetUpdate }] = useUpdateAdminMutation()
	const listTours = useGetTournamentsQuery()
	const tourOptions = (listTours.data ?? []).map((t) => t.name_tour_sort).filter(Boolean)

	const [login, setLogin] = useState('')
	const [name, setName] = useState('')
	const [permissions, setPermissions] = useState([])
	const [isSuper, setIsSuper] = useState(false)
	const [tournaments, setTournaments] = useState([])
	const [secret, setSecret] = useState(null) // временный пароль показывается один раз

	if (isLoading) return <div className={`${classes.card} ${classes.page}`}>Loading...</div>
	if (isError || !data) {
		return (
			<div className={`${classes.card} ${classes.page}`}>
				<div className={classes.error}>Failed to load admins</div>
				<button className={classes.btn} onClick={refetch}>
					Retry
				</button>
			</div>
		)
	}

	const handleCreate = async (e) => {
		e.preventDefault()
		resetUpdate()
		try {
			const result = await createAdmin({ login, name, permissions, tournaments, is_super: isSuper }).unwrap()
			setSecret({ login: result.admin.login, password: result.temp_password })
			setLogin('')
			setName('')
			setPermissions([])
			setIsSuper(false)
			setTournaments([])
			refetch()
		} catch {}
	}

	const patch = async (id, body) => {
		resetCreate()
		try {
			const result = await updateAdmin({ id, ...body }).unwrap()
			if (result.temp_password) setSecret({ login: result.admin.login, password: result.temp_password })
			refetch()
		} catch {}
	}

	return (
		<div className={`${classes.card} ${classes.page}`}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
				<div className={classes.title}>Administrators</div>
				<RefreshButton onClick={refetch} spinning={isFetching} />
			</div>

			{secret && (
				<div>
					<div>
						Temporary password for <b>{secret.login}</b> (shown once, the admin must change it at first sign in):
					</div>
					<div className={classes.secret}>{secret.password}</div>
					<div className={classes.link} onClick={() => setSecret(null)}>
						Hide
					</div>
				</div>
			)}

			<table className={classes.table}>
				<thead>
					<tr>
						<th>Login</th>
						<th>Access</th>
						<th>Last sign in</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{data.admins.map((a) => {
						const isSelf = a.id === me.id
						return (
							<tr key={a.id} className={a.blocked ? classes.blocked : undefined}>
								<td>
									{a.login}
									{a.name ? ` (${a.name})` : ''}
									{a.is_super ? ' — super admin' : ''}
								</td>
								<td>
									{a.is_super ? (
										'All sections'
									) : (
										<>
											<PermissionChecks list={data.permissions} value={a.permissions} onChange={(value) => patch(a.id, { permissions: value })} />
											{a.permissions.includes('tournament_matches') && <TournamentsEditor value={a.tournaments ?? []} options={tourOptions} onChange={(value) => patch(a.id, { tournaments: value })} />}
										</>
									)}
								</td>
								<td>{a.last_login_at ?? '—'}</td>
								<td>
									<div className={classes.row}>
										<button className={classes.btnDark} onClick={() => patch(a.id, { reset_password: true })}>
											Reset password
										</button>
										{!isSelf && (
											<button className={classes.btnDark} onClick={() => patch(a.id, { blocked: !a.blocked })}>
												{a.blocked ? 'Unblock' : 'Block'}
											</button>
										)}
									</div>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			{updateError && <div className={classes.error}>{errorMessage(updateError)}</div>}

			<form onSubmit={handleCreate} className={classes.card} style={{ margin: 0, padding: 0, background: 'transparent', maxWidth: 'none' }}>
				<div className={classes.title}>New administrator</div>
				<div className={classes.row}>
					<input className={classes.input} style={{ maxWidth: 220 }} value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" autoComplete="off" />
					<input className={classes.input} style={{ maxWidth: 220 }} value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (optional)" autoComplete="off" />
				</div>
				<PermissionChecks list={data.permissions} value={permissions} onChange={setPermissions} disabled={isSuper} />
				{!isSuper && permissions.includes('tournament_matches') && <TournamentsEditor value={tournaments} options={tourOptions} onChange={setTournaments} />}
				<label className={classes.checks}>
					<span>
						<input type="checkbox" checked={isSuper} onChange={(e) => setIsSuper(e.target.checked)} /> Super admin (all sections and admin management)
					</span>
				</label>
				<div className={classes.row}>
					<button className={classes.btn} type="submit" disabled={isCreating || !login}>
						{isCreating ? 'Creating...' : 'Create'}
					</button>
				</div>
				{createError && <div className={classes.error}>{errorMessage(createError)}</div>}
			</form>
		</div>
	)
}

export default AdminsPage
