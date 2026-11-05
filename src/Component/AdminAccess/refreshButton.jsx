import React from 'react'
import classes from './adminAccess.module.css'

// Кнопка «обновить данные» (круговая стрелка): перезапрашивает данные таблицы без перезагрузки страницы.
// spinning — идёт загрузка: иконка крутится, кнопка неактивна. Размер совпадает с остальными кнопками админки (36px)
const RefreshButton = ({ onClick, spinning = false, title = 'Refresh data' }) => (
	<button type="button" className={`${classes.btnDark} ${classes.refreshBtn}`} onClick={onClick} disabled={spinning} title={title} aria-label={title}>
		<svg className={spinning ? classes.refreshSpin : undefined} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
			<path d="M21 12a9 9 0 1 1-2.64-6.36" />
			<path d="M21 3v6h-6" />
		</svg>
	</button>
)

export default RefreshButton
