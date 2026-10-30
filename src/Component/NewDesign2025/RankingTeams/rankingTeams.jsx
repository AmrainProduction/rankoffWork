import React, { useRef, useCallback, useState } from 'react'
import classes from './rankingTeams.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetRankingTeamsQuery, useGetTournamentsQuery } from '../../../store/api/apiSlice'
import RankingTeamsResult from './PictureResult/rankingTeamsResult'

const RankingTeams = () => {
	const allRankings = useGetRankingTeamsQuery()

	let [choiceDate, setChoiceDate] = useState('')

	let date
	let allDates = []

	if (allRankings.data && allRankings.data.length > 0) {
		allRankings.data.map((e) => {
			allDates.push(e.end_date)
		})

		allDates = allDates.filter((item, index) => {
			//оставляем только уникальные значения
			return allDates.indexOf(item) === index
		})
	}

	//--------------------------------HTML to IMG def-------------------------------------------------

	const ref = useRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toJpeg(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${choiceDate}.jpg`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [choiceDate])

	return (
		<>
			<div className={classes.wrapperMenu}>
				<div className={classes.menu}>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Choose date:</div>
						<div className={classes.listMatches}>
							{allDates.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceDate(e)
										}}>
										{e}
									</div>
								)
							})}
						</div>
					</div>

					<div className={classes.btnSaveAsImage} onClick={onButtonClick}>
						Download
					</div>
				</div>
			</div>
			<div className={classes.wrapperPicture} ref={ref}>
				{choiceDate.length > 0 ? <RankingTeamsResult date={choiceDate} /> : ''}
			</div>
		</>
	)
}

export default RankingTeams
