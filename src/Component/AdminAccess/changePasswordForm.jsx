import React, { useState } from 'react'
import classes from './adminAccess.module.css'
import { useAdminChangePasswordMutation } from '../../store/api/apiSlice'

const MIN_PASSWORD = 12

// Смена пароля. forced — обязательная смена временного пароля при первом входе
const ChangePasswordForm = ({ forced = false, onDone, onLogout }) => {
	const [current, setCurrent] = useState('')
	const [next, setNext] = useState('')
	const [repeat, setRepeat] = useState('')
	const [done, setDone] = useState(false)
	const [changePassword, { isLoading, error }] = useAdminChangePasswordMutation()

	const mismatch = repeat !== '' && next !== repeat
	const tooShort = next !== '' && next.length < MIN_PASSWORD
	const canSubmit = current && next.length >= MIN_PASSWORD && next === repeat && !isLoading

	const submit = async (e) => {
		e.preventDefault()
		try {
			await changePassword({ current_password: current, new_password: next }).unwrap()
			setCurrent('')
			setNext('')
			setRepeat('')
			setDone(true)
			onDone?.()
		} catch {}
	}

	return (
		<form className={forced ? classes.card : `${classes.card} ${classes.page}`} style={forced ? undefined : { maxWidth: 520 }} onSubmit={submit}>
			<div className={classes.title}>{forced ? 'Set a new password' : 'Change password'}</div>
			{forced && <div className={classes.hint}>The temporary password must be replaced before you continue.</div>}
			<input className={classes.input} type="password" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Current password" autoComplete="current-password" />
			<input className={classes.input} type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder={`New password (at least ${MIN_PASSWORD} characters)`} autoComplete="new-password" />
			<input className={classes.input} type="password" value={repeat} onChange={(e) => setRepeat(e.target.value)} placeholder="Repeat new password" autoComplete="new-password" />
			{tooShort && <div className={classes.error}>At least {MIN_PASSWORD} characters</div>}
			{mismatch && <div className={classes.error}>Passwords do not match</div>}
			<button className={classes.btn} type="submit" disabled={!canSubmit}>
				{isLoading ? 'Saving...' : 'Save password'}
			</button>
			{error && <div className={classes.error}>{error?.data?.message || 'Something went wrong, try again'}</div>}
			{done && !forced && <div className={classes.ok}>Password changed. Other sessions were closed.</div>}
			{forced && (
				<div className={classes.link} onClick={onLogout}>
					Sign out
				</div>
			)}
		</form>
	)
}

export default ChangePasswordForm
