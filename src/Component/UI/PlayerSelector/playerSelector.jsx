import React, { useEffect, useRef, useState } from 'react'
import classes from './playerSelector.module.css'
import { useGetPlayersQuery } from '../../../store/api/apiSlice'
import CountryFlagPlayer from '../../../Function/countryFlagPlayer'

const PlayerSelector = ({ label, onSelect, defaultPlayerValue }) => {
	const listPlayers = useGetPlayersQuery()

	const [inputValue, setInputValue] = useState('')
	const [filteredPlayers, setFilteredPlayers] = useState([])
	const [showDropdownMenu, setShowDropdownMenu] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState(-1)

	const wrapperRef = useRef(null)

	useEffect(() => {
		if (defaultPlayerValue) {
			let defaultPlayer = listPlayers.data?.filter((e) => e.player_id === defaultPlayerValue)
			if (defaultPlayer) {
				setInputValue(defaultPlayer[0])
				onSelect(defaultPlayer[0])
			}
		}
	}, [defaultPlayerValue])

	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setShowDropdownMenu(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleChoicePlayer = (event) => {
		const value = event.target.value
		setSelectedIndex(-1)
		setInputValue(value)

		if (value.trim() === '') {
			setFilteredPlayers([])
			setShowDropdownMenu(false)
		} else {
			const filtered = listPlayers.data?.filter((e) => e.nickname.toLowerCase().includes(value.toLowerCase()))
			setFilteredPlayers(filtered)
			setShowDropdownMenu(filtered?.length > 0)
		}
	}

	const handleSelectPlayer = (player) => {
		setInputValue(player)
		setShowDropdownMenu(false)
		setSelectedIndex(-1)
		onSelect(player)
	}

	const handleKeyDown = (event) => {
		if (!showDropdownMenu) return

		if (event.key === 'ArrowDown') {
			setSelectedIndex((prev) => Math.min(prev + 1, filteredPlayers.length - 1))
		} else if (event.key === 'ArrowUp') {
			setSelectedIndex((prev) => Math.max(prev - 1, 0))
		} else if (event.key === 'Enter' && selectedIndex >= 0) {
			handleSelectPlayer(filteredPlayers[selectedIndex])
			setShowDropdownMenu(false)
		}

		if (event.key === 'Enter') {
			setShowDropdownMenu(false)
		}
	}

	return (
		<div className={classes.wrapperList} ref={wrapperRef}>
			<div className={classes.titleBox}>{label}</div>
			<input type="text" value={inputValue.nickname || inputValue} onChange={handleChoicePlayer} onFocus={() => setShowDropdownMenu(filteredPlayers.length > 0)} onKeyDown={handleKeyDown} className={classes.inputData} />
			{showDropdownMenu && (
				<div className={classes.dropdownMenu}>
					{filteredPlayers.map((player, index) => (
						<div
							key={index}
							className={classes.dropdownMenuItem}
							onClick={() => handleSelectPlayer(player)}
							style={{
								background: selectedIndex === index ? 'var(--componentBlockColorHover)' : '',
							}}>
							<CountryFlagPlayer player_id={player.player_id} />
							{player.nickname}
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default PlayerSelector
