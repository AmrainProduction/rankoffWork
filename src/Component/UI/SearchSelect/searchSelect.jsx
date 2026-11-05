import React, { useEffect, useMemo, useRef, useState } from 'react'
import classes from '../PlayerSelector/playerSelector.module.css'

const MAX_ITEMS = 50

// Поле с поиском и выпадающим списком в том же стиле, что выбор игрока на странице METRICS_PLAYER (PlayerSelector).
// Управляемое: выбранное значение приходит снаружи (value = ключ элемента), очистка поля снимает выбор (onSelect(null)).
// items — любой список; getKey/getLabel/matches/renderItem задают, как элемент показывается и ищется.
const SearchSelect = ({ label, items = [], value, getKey, getLabel, matches, renderItem, onSelect, placeholder = '' }) => {
	const [text, setText] = useState('')
	const [isEditing, setIsEditing] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [highlighted, setHighlighted] = useState(-1)
	const wrapperRef = useRef(null)

	const selected = useMemo(() => (value == null || value === '' ? null : (items.find((item) => String(getKey(item)) === String(value)) ?? null)), [items, value, getKey])

	const filtered = useMemo(() => {
		const query = text.trim().toLowerCase()
		if (!query) return []
		const isMatch = matches ?? ((item, q) => getLabel(item).toLowerCase().includes(q))
		return items.filter((item) => isMatch(item, query)).slice(0, MAX_ITEMS)
	}, [items, text, matches, getLabel])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsOpen(false)
				setIsEditing(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	const select = (item) => {
		onSelect(item)
		setIsOpen(false)
		setIsEditing(false)
		setHighlighted(-1)
	}

	const handleChange = (event) => {
		const next = event.target.value
		setText(next)
		setIsEditing(true)
		setHighlighted(-1)
		setIsOpen(next.trim() !== '')
		if (next.trim() === '' && selected) onSelect(null)
	}

	const handleKeyDown = (event) => {
		if (event.key === 'ArrowDown') {
			event.preventDefault()
			setIsOpen(true)
			setHighlighted((prev) => Math.min(prev + 1, filtered.length - 1))
		} else if (event.key === 'ArrowUp') {
			event.preventDefault()
			setHighlighted((prev) => Math.max(prev - 1, 0))
		} else if (event.key === 'Enter') {
			event.preventDefault()
			const item = filtered[highlighted >= 0 ? highlighted : 0]
			if (isOpen && item) select(item)
		} else if (event.key === 'Escape') {
			setIsOpen(false)
			setIsEditing(false)
		}
	}

	const shownText = isEditing ? text : selected ? getLabel(selected) : ''

	return (
		<div className={classes.wrapperList} ref={wrapperRef} style={{ height: 'auto' }}>
			{label && <div style={{ padding: '0 0 4px', fontSize: '0.85em', color: 'var(--textPlaceholderColor)' }}>{label}</div>}
			<input
				type="text"
				value={shownText}
				placeholder={placeholder}
				onChange={handleChange}
				onFocus={() => {
					setText(shownText)
					setIsEditing(true)
					setIsOpen(shownText.trim() !== '')
				}}
				onKeyDown={handleKeyDown}
				className={classes.inputData}
				autoComplete="off"
			/>
			{isOpen && filtered.length > 0 && (
				<div className={classes.dropdownMenu} style={{ maxHeight: 'min(360px, 55vh)', zIndex: 1000, padding: '4px 0', boxSizing: 'border-box' }}>
					{filtered.map((item, index) => (
						<div key={getKey(item)} className={classes.dropdownMenuItem} onMouseDown={(e) => e.preventDefault()} onClick={() => select(item)} style={{ padding: '9px 14px', background: highlighted === index ? 'var(--componentBlockColorHover)' : '' }}>
							{renderItem ? renderItem(item) : getLabel(item)}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default SearchSelect
