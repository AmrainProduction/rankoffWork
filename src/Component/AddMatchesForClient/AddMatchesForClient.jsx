import React, { createRef, useCallback, useEffect, useState } from 'react'
import classes from './AddMatchesForClient.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetMatchesByNameQuery, useGetMatchesByNameTourQuery, useGetMatchesQuery, useGetShortMatchByNameQuery, useGetShortMatchQuery, useGetTournamentsQuery } from '../../store/api/apiSlice'
import { useOutletContext } from 'react-router-dom'
import DataEntryMatch from '../AddMatches/PictureResult/dataEntryMatch'
import { can } from '../../Function/adminAccess'

const AddMatchesForClient = () => {
	// Турниры, матчи которых этот администратор может вносить: у полного права data — любые, у внешних админов — только назначенные.
	// Сервер проверяет то же самое при сохранении, здесь список только скрывает лишнее
	const { admin } = useOutletContext()
	const hasFullAccess = can(admin, 'maps')
	const isAllowedTour = (nameTourSort) => hasFullAccess || (admin.tournaments ?? []).includes(nameTourSort)

	const listMatches = useGetShortMatchQuery()
	const listTours = useGetTournamentsQuery()

	const [date, setDate] = useState([])
	const [today, setToday] = useState([])

	const [choiceMatch, setChoiceMatch] = useState([])
	const [matches, setMatches] = useState([])

	const [choiceTour, setChoiceTour] = useState([])

	let dates = []
	let matchesData = []
	let matchesID = []
	let toursID = []

	if (listTours.data && listTours.data.length > 0) {
		listTours.data.map((e) => {
			toursID.push(e.name_tour_sort)
		})
	}

	if (listMatches.data && listMatches.data.length > 0) {
		listMatches.data.map((e) => {
			if (isAllowedTour(e.name_tour_sort)) {
				dates.push(e.date_match)
			}
		})

		dates = dates
			.filter((item, index) => {
				return dates.indexOf(item) === index
			})
			.sort()
			.reverse()

		listMatches.data.map((e) => {
			if (e.date_match === date && isAllowedTour(e.name_tour_sort)) {
				matchesID.push(e.name_match_for_sort)
			}
		})
	}

	const onButtonTodayClick = () => {
		const date = new Date()

		const year = date.getFullYear()
		let month = date.getMonth() + 1
		let day = date.getDate()

		month = month < 10 ? '0' + month : month
		day = day < 10 ? '0' + day : day

		let res = `${year}-${month}-${day}`

		setDate(res)
		setChoiceMatch([])
	}

	return (
		<>
			<div className={classes.wrapperMenu}>

				<div className={classes.menu}>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Select match:</div>
						<div className={classes.listMatches}>
							{matchesID.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceTour('')
											setChoiceMatch(e)
										}}>
										{e}
									</div>
								)
							})}
						</div>
					</div>

					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Select date:</div>
						<div className={classes.listMatches}>
							{dates.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceTour('')
											setDate(e)
											setChoiceMatch([])
										}}>
										{e}
									</div>
								)
							})}
						</div>
					</div>

					<div className={classes.wrapperButtons}>
						<button className={classes.btnSaveAsImage} onClick={onButtonTodayClick}>
							today
						</button>
						{/*<button className={classes.btnSaveAsImage} onClick={onButtonClick}>*/}
						{/*    Save as image*/}
						{/*</button>*/}
					</div>
				</div>
			</div>

			{!hasFullAccess && (admin.tournaments ?? []).length === 0 && <div>No tournaments are assigned to your account. Ask the site owner to assign one.</div>}
			<div>{choiceMatch.length > 0 ? <DataEntryMatch match_id={choiceMatch} /> : 'Choice match'}</div>
		</>
	)
}

export default AddMatchesForClient
