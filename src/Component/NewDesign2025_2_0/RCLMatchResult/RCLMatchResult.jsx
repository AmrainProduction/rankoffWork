import React, { useRef, useCallback, useState } from 'react'
import classes from './RCLMatchResult.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetMatchesByNameQuery, useGetShortMatchesTeamByNameQuery, useGetShortMatchQuery } from '../../../store/api/apiSlice'
import RCLMatchBanner from './PictureResult/RCLMatchBanner'

const RCLMatchResult = () => {
	const listMatches = useGetShortMatchQuery()

	let [choiceMatch, setChoiceMatch] = useState('')
	let [choiceMap, setChoiceMap] = useState('')

	const [date, setDate] = useState('')

	let name = choiceMatch
	const listMapMatch = useGetMatchesByNameQuery({ name })

	let matchesID = []
	let necessaryMatchesID = []

	if (listMatches.data && listMatches.data.length > 0) {
		listMatches.data.map((e) => {
			if (e.date_match === date) {
				necessaryMatchesID.push(e.name_match_for_sort)
			}
			matchesID.push(e.name_match_for_sort)
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
		setChoiceMatch('')
	}

	//--------------------------------HTML to IMG def-------------------------------------------------

	const ref = useRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toPng(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${choiceMatch}.png`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [choiceMatch])

	return (
		<>
			<div className={classes.wrapperMenu}>
				<div className={classes.menu}>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Today:</div>
						<div className={classes.listMatches}>
							{necessaryMatchesID.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceMatch(e)
											setChoiceMap('')
										}}>
										{e}
									</div>
								)
							})}
						</div>
					</div>

					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Choose map:</div>
						<div className={classes.listMatches}>
							{choiceMatch.length > 0 ? (
								<div
									className={classes.match}
									style={{ background: '#7db489' }}
									onClick={() => {
										setChoiceMap('AllMaps')
									}}>
									All maps
								</div>
							) : (
								''
							)}
							{listMapMatch?.data?.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceMap(e.map)
										}}>
										{e.map}
									</div>
								)
							})}
						</div>
					</div>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Choose match:</div>
						<div className={classes.listMatches}>
							{matchesID.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceMatch(e)
											setChoiceMap('')
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
						<button className={classes.btnSaveAsImage} onClick={onButtonClick}>
							Download
						</button>
					</div>
				</div>
			</div>
			<div ref={ref}>{choiceMatch.length > 0 ? <RCLMatchBanner name={choiceMatch} map={choiceMap} /> : ''}</div>
		</>
	)
}

export default RCLMatchResult
