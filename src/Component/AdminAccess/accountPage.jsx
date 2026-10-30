import React from 'react'
import { useOutletContext } from 'react-router-dom'
import classes from './adminAccess.module.css'
import ChangePasswordForm from './changePasswordForm'
import { PERMISSION_LABELS } from '../../Function/adminAccess'

// Аккаунт администратора: данные, смена пароля, выход
const AccountPage = () => {
	const { admin, logout } = useOutletContext()

	return (
		<>
			<div className={`${classes.card} ${classes.page}`}>
				<div className={classes.title}>{admin.name || admin.login}</div>
				<div>Login: {admin.login}</div>
				<div>Access: {admin.is_super ? 'super admin (all sections)' : admin.permissions.map((p) => PERMISSION_LABELS[p] ?? p).join(', ') || 'none'}</div>
				{admin.expires_at && <div className={classes.hint}>Session ends: {admin.expires_at} (server time)</div>}
				<button className={classes.btn} onClick={logout}>
					Sign out
				</button>
			</div>
			<ChangePasswordForm />
		</>
	)
}

export default AccountPage
