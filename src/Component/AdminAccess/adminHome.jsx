import React from 'react'
import { useOutletContext } from 'react-router-dom'
import classes from './adminShell.module.css'
import { PERMISSION_LABELS } from '../../Function/adminAccess'

const AdminHome = () => {
	const { admin } = useOutletContext()

	return (
		<div className={classes.home}>
			<div style={{ fontSize: '1.3em', fontWeight: 800 }}>Welcome, {admin.name || admin.login}</div>
			<div>Choose a tool in the menu on the left.</div>
			<div className={classes.muted}>Access: {admin.is_super ? 'super admin (all sections)' : admin.permissions.map((p) => PERMISSION_LABELS[p] ?? p).join(', ') || 'none'}</div>
			{!admin.is_super && admin.permissions.includes('tournament_matches') && Array.isArray(admin.tournaments) && (
				<div className={classes.muted}>Your tournaments: {admin.tournaments.join(', ') || 'none assigned'}</div>
			)}
		</div>
	)
}

export default AdminHome
