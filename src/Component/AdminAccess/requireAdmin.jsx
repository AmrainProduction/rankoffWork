import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classes from './adminAccess.module.css'
import { apiSlice, useAdminLoginMutation, useAdminLogoutMutation, useAdminMeQuery } from '../../store/api/apiSlice'
import { clearAdminToken, getAdminToken, setAdminToken } from '../../Function/adminAuth'
import { hasAccess, requiredPermission } from '../../Function/adminAccess'
import ChangePasswordForm from './changePasswordForm'
import AdminShell from './adminShell'

const errorMessage = (error) => error?.data?.message || 'Something went wrong, try again'

const LoginForm = ({ onLogin }) => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [adminLogin, { isLoading, error }] = useAdminLoginMutation()

	const submit = async (e) => {
		e.preventDefault()
		try {
			onLogin(await adminLogin({ login, password }).unwrap())
		} catch {}
	}

	return (
		<form className={classes.card} onSubmit={submit}>
			<div className={classes.title}>Admin sign in</div>
			<input className={classes.input} value={login} onChange={(e) => setLogin(e.target.value)} placeholder="Login" autoComplete="username" autoFocus />
			<input className={classes.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" />
			<button className={classes.btn} type="submit" disabled={isLoading || !login || !password}>
				{isLoading ? 'Signing in...' : 'Sign in'}
			</button>
			{error && <div className={classes.error}>{errorMessage(error)}</div>}
		</form>
	)
}

// Все страницы админки доступны только после входа. Права проверяются по разделам (см. Function/adminAccess.js).
// Настоящая защита — на сервере: каждый запрос проверяет токен и право. Эта страница только решает, что показать.
const RequireAdmin = () => {
	const [token, setToken] = useState(getAdminToken())
	const location = useLocation()
	const dispatch = useDispatch()
	const { data, isLoading, isError, error, refetch } = useAdminMeQuery(undefined, { skip: !token, refetchOnMountOrArgChange: true })
	const [adminLogout] = useAdminLogoutMutation()

	// Токен недействителен или истёк — возвращаем форму входа
	useEffect(() => {
		if (error?.status === 401 || error?.status === 403) {
			if (error?.data?.code !== 'must_change_password') {
				clearAdminToken()
				setToken(null)
			}
		}
	}, [error])

	const handleLogin = (result) => {
		dispatch(apiSlice.util.resetApiState())
		setAdminToken(result.token)
		setToken(result.token)
	}

	const handleLogout = async () => {
		try {
			await adminLogout().unwrap()
		} catch {}
		clearAdminToken()
		setToken(null)
		dispatch(apiSlice.util.resetApiState())
	}

	if (!token) return <LoginForm onLogin={handleLogin} />

	if (isLoading) return <div className={classes.card}>Loading...</div>

	if (isError || !data) {
		return (
			<div className={classes.card}>
				<div className={classes.error}>{errorMessage(error)}</div>
				<button className={classes.btn} onClick={refetch}>
					Retry
				</button>
			</div>
		)
	}

	const admin = data.admin

	if (admin.must_change_password) {
		return <ChangePasswordForm forced onDone={refetch} onLogout={handleLogout} />
	}

	if (!hasAccess(admin, requiredPermission(location.pathname))) {
		return (
			<div className={classes.card}>
				<div className={classes.title}>No access</div>
				<div>Your account has no permission for this section.</div>
				<button className={classes.btn} onClick={handleLogout}>
					Sign out
				</button>
			</div>
		)
	}

	return (
		<AdminShell admin={admin} logout={handleLogout}>
			<Outlet context={{ admin, logout: handleLogout, refetchAdmin: refetch }} />
		</AdminShell>
	)
}

export default RequireAdmin
