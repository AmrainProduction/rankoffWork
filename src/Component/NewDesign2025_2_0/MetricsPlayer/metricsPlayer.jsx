import React, { useRef, useCallback, useState } from 'react'
import classes from './metricsPlayer.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetMatchesByNameTourQuery, useGetTournamentsQuery } from '../../../store/api/apiSlice'
import StatsPlayerTourResult from './PictureResult/metricsPlayerResult'
import MetricsPlayerResult from './PictureResult/metricsPlayerResult'
import PlayerSelector from '../../UI/PlayerSelector/playerSelector'

const MetricsPlayer = () => {
	const [player1, setPlayer1] = useState(null)
	const [dateEnd1, setDateEnd1] = useState('')
	const [dateStart1, setDateStart1] = useState('')
	const [choiceMap, setChoiceMap] = useState('AllMaps')
	const [title, setTitle] = useState('')
	const [days1, setDays1] = useState('')

	const validateDate = (value) => {
		// Проверка формата: YYYY-MM-DD
		const regex = /^\d{4}-\d{2}-\d{2}$/
		if (!regex.test(value)) return 'Неверный формат даты (YYYY-MM-DD)'

		// Проверка валидности реальной даты
		const parsed = Date.parse(value)
		if (isNaN(parsed)) return 'Некорректная дата'

		return ''
	}

	const handleInputEndDate1 = (event) => {
		const value = event.target.value
		const isValidDate = !isNaN(Date.parse(value))
		const date = isValidDate ? new Date(value).toISOString().split('T')[0] : ''
		setDateEnd1(date)
	}

	const handleInputStartDate1 = (event) => {
		const value = event.target.value
		const isValidDate = !isNaN(Date.parse(value))
		const date = isValidDate ? new Date(value).toISOString().split('T')[0] : ''
		setDateStart1(date)
		if (date) setDays1('')
	}

	const handleInputDays1 = (event) => {
		const value = event.target.value
		const days = value === '' || value < 0 ? '' : Number(value)
		setDays1(days)
		if (days !== '') setDateStart1('')
	}

	const handleInputTitle = (event) => {
		const value = event.target.value
		setTitle(value)
	}

	//--------------------------------HTML to IMG def-------------------------------------------------

	const ref = useRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null || !player1) {
			return
		}

		toJpeg(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${player1.nickname}.jpg`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [player1])

	const mapsList = ['Rust', 'Sandstone', 'Breeze', 'Dune', 'Hanami', 'Prison', 'Zone 7', 'Province', 'Zone 9', 'Sakura']

	return (
		<>
			<div className={classes.wrapperMenu}>
				<div className={classes.wrapperList}>
					<div className={classes.titleBox}>Title text:</div>
					<input type="text" placeholder="Example" onChange={handleInputTitle} />
				</div>
				<div className={classes.wrapperList}>
					<div className={classes.titleBox}>Choose map:</div>
					<div className={classes.list}>
						<div
							className={classes.match}
							style={{
								background: choiceMap === 'AllMaps' ? '#7db489' : undefined,
							}}
							onClick={() => setChoiceMap('AllMaps')}>
							All maps
						</div>

						{mapsList.map((e, index) => {
							return (
								<div
									key={index}
									className={classes.match}
									style={{
										background: choiceMap === e ? '#7db489' : undefined,
									}}
									onClick={() => setChoiceMap(e)}>
									{e}
								</div>
							)
						})}
					</div>
				</div>
				<div className={classes.menu}>
					<PlayerSelector label={'Player #1:'} onSelect={setPlayer1} />
					<div className={classes.wrapperList}>
						<div className={classes.titleBox}>Date end (Player 1):</div>
						<input type="text" placeholder="XXXX-MM-DD" onChange={handleInputEndDate1} />

						<div className={classes.titleBox}>Date start (Player 1):</div>
						<input type="text" placeholder="XXXX-MM-DD" disabled={days1 !== ''} onChange={handleInputStartDate1} />

						<div className={classes.titleBox}>Days interval (Player 1):</div>
						<input type="number" value={days1} disabled={dateStart1 !== ''} onChange={handleInputDays1} />
					</div>

					<div className={classes.btnSaveAsImage} onClick={onButtonClick}>
						Download
					</div>
				</div>
			</div>
			<div ref={ref}>
				<MetricsPlayerResult player1={player1} dateEnd1={dateEnd1} days1={days1} dateStart1={dateStart1} title={title} choiceMap={choiceMap} />
			</div>
		</>
	)
}
export default MetricsPlayer
