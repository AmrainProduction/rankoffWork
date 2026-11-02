import React, { useRef, useCallback, useState } from 'react'
import classes from './matchPicture2.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetMatchesByNameQuery, useGetShortMatchesTeamByNameQuery, useGetShortMatchQuery } from '../../../store/api/apiSlice'
import PictureResult2 from './PictureResult/pictureResult2'

const MatchPicture2 = () => {
	const listMatches = useGetShortMatchQuery()

	let [choiceMatch, setChoiceMatch] = useState('')
	let [choiceMap, setChoiceMap] = useState('')

	const [date, setDate] = useState([])

	let name = choiceMatch
	// Пока матч не выбран, запрос не нужен (иначе уходит matches/teams/ с пустым именем)
	const listMapMatch = useGetMatchesByNameQuery({ name }, { skip: !name })

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

	const [downloadError, setDownloadError] = useState('')

	const onButtonClick = useCallback(() => {
		setDownloadError('')
		if (ref.current === null || !choiceMatch) {
			setDownloadError('Choose a match first')
			return
		}

		// Картинка, которая не загрузилась (на сервере нет файла: вместо него приходит страница сайта), ломает сохранение без внятной ошибки.
		// Перед сохранением находим такие картинки и показываем их адреса
		const broken = [...ref.current.querySelectorAll('img')].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.getAttribute('src'))
		if (broken.length > 0) {
			setDownloadError(`Missing images: ${[...new Set(broken)].join(', ')}`)
			return
		}

		toPng(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${choiceMatch}.jpg`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
				setDownloadError('Could not render the banner, see the browser console')
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
					{downloadError && <div style={{ color: '#bd5d5d', padding: '6px 0', wordBreak: 'break-all' }}>{downloadError}</div>}
				</div>
			</div>
			<div ref={ref}>{choiceMatch.length > 0 ? <PictureResult2 name={choiceMatch} map={choiceMap} /> : ''}</div>
		</>
	)
}

export default MatchPicture2
