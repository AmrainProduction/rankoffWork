import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import classes from './adminShell.module.css'
import logo from '../../logo.svg'
import { ADMIN_MENU } from '../../Function/adminMenu'
import { hasAccess, requiredPermission } from '../../Function/adminAccess'

const STORAGE_OPEN = 'adminSideOpen'
const STORAGE_SECTIONS = 'adminSideSections'

const readStorage = (key, fallback) => {
	try {
		const raw = localStorage.getItem(key)
		return raw === null ? fallback : JSON.parse(raw)
	} catch {
		return fallback
	}
}

const writeStorage = (key, value) => {
	try {
		localStorage.setItem(key, JSON.stringify(value))
	} catch {}
}

// Каркас админки: слева меню по правам администратора, справа выбранная страница.
// Меню можно скрыть кнопкой внизу слева (баннеры снимаются со скриншота на полной ширине).
const AdminShell = ({ admin, logout, children }) => {
	const location = useLocation()
	const [open, setOpen] = useState(() => readStorage(STORAGE_OPEN, true))
	// При открытии и обновлении страницы начинаем сверху: браузер иначе возвращает прежнюю прокрутку,
	// и верхний блок меню оказывается частично за границей экрана
	useEffect(() => {
		try {
			window.history.scrollRestoration = 'manual'
		} catch {}
		window.scrollTo(0, 0)
	}, [location.pathname])

	const [sections, setSections] = useState(() => readStorage(STORAGE_SECTIONS, {}))

	const menu = ADMIN_MENU.map((section) => ({
		...section,
		items: section.items.filter((i) => hasAccess(admin, requiredPermission(i.path)) && !(i.hideWhen && i.hideWhen(admin))),
	})).filter((s) => s.items.length > 0)

	const isOpen = (section) => {
		const hasActive = section.items.some((i) => i.path === location.pathname)
		if (hasActive) return true
		return sections[section.id] ?? section.id !== 'banners'
	}

	const toggleSection = (section) => {
		const next = { ...sections, [section.id]: !isOpen(section) }
		setSections(next)
		writeStorage(STORAGE_SECTIONS, next)
	}

	// Меню скрывается после выбора пункта и по нажатию вне его (кроме кнопки Menu / Hide menu). Автоскрытие не запоминается:
	// в localStorage пишется только выбор кнопкой, чтобы после обновления страницы меню не пропадало само
	const sideRef = useRef(null)
	const toggleRef = useRef(null)
	const closeSide = () => setOpen(false)

	useEffect(() => {
		if (!open) return undefined
		const onOutside = (event) => {
			const target = event.target
			if (sideRef.current?.contains(target) || toggleRef.current?.contains(target)) return
			setOpen(false)
		}
		document.addEventListener('mousedown', onOutside)
		document.addEventListener('touchstart', onOutside)
		return () => {
			document.removeEventListener('mousedown', onOutside)
			document.removeEventListener('touchstart', onOutside)
		}
	}, [open])

	const toggleSide = () => {
		setOpen(!open)
		writeStorage(STORAGE_OPEN, !open)
	}

	return (
		<div className={classes.shell}>
			{open && (
				<aside className={classes.side} ref={sideRef}>
					<Link to="/a" className={classes.brand} onClick={closeSide}>
						<img src={logo} alt="Rankoff Work" />
					</Link>
					<nav className={classes.nav}>
					{menu.map((section) => (
						<div key={section.id} className={classes.section}>
							<div className={classes.sectionHead} onClick={() => toggleSection(section)}>
								<span>{section.title}</span>
								<span>{isOpen(section) ? '−' : '+'}</span>
							</div>
							{isOpen(section) &&
								section.items.map((item) => (
									<NavLink key={item.path} to={item.path} onClick={closeSide} className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`}>
										{item.label}
									</NavLink>
								))}
						</div>
					))}
					</nav>
					<div className={classes.footer}>
						<NavLink to="/a/ACCOUNT" onClick={closeSide} className={({ isActive }) => `${classes.link} ${isActive ? classes.active : ''}`}>
							ACCOUNT
						</NavLink>
						<div className={classes.who}>{admin.name || admin.login}</div>
						<div className={classes.muted}>{admin.is_super ? 'Super admin' : 'Admin'}</div>
						<button type="button" className={classes.signOut} onClick={logout}>
							Sign out
						</button>
						<button type="button" className={classes.hideBtn} onClick={toggleSide}>
							Hide menu
						</button>
					</div>
				</aside>
			)}
			<div className={`${classes.content} ${open ? classes.contentShifted : ''}`}>{children}</div>
			<button type="button" ref={toggleRef} className={`${classes.toggle} ${open ? classes.toggleOpen : ''}`} onClick={toggleSide}>
				{open ? 'Hide menu' : 'Menu'}
			</button>
		</div>
	)
}

export default AdminShell
