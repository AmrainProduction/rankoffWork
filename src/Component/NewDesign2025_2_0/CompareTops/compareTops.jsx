import React, { useCallback, useMemo, useRef, useState } from 'react'
import classes from './compareTops.module.css'
import { toJpeg } from 'html-to-image'
import LeftTopResult from './PictureResult/leftTopResult'
import RightTopResult from './PictureResult/rightTopResult'
import { useGetMatchesQuery, useGetShortMatchQuery, useGetTournamentsQuery } from '../../../store/api/apiSlice'
import TopSettings, { collectMaps } from './topSettings'

// Подложка баннера: рисуется CSS-фоном и обрезается по высоте топа (см. .wrapperPicture в CSS)
const BG_IMAGE = '/images/DataInImage/NEW_DESIGN_2025_2_0/TOP_PLAYERS_TOUR_LONG2.png'
// const BG_IMAGE = '/images/DataInImage/NEW_DESIGN_2025_2_0/TOP_PLAYERS_BANNER.png'

const emptySettings = (title) => ({ title, stage: '', tours: [], excluded: [], maps: [], limit: '' })

const CompareTops = () => {
	const listTours = useGetTournamentsQuery()
	const shortMatches = useGetShortMatchQuery()
	const allMatches = useGetMatchesQuery()

	const [leftTop, setLeftTop] = useState([])
	// Настройки каждого топа отдельно: заголовок, стадия, турниры, исключённые матчи (name_match_for_sort)
	const [left, setLeft] = useState(() => emptySettings(''))
	const [right, setRight] = useState(() => emptySettings(''))

	const toursID = (listTours.data ?? []).map((e) => e.name_tour_sort)
	// Тир турнира из таблицы tournaments (как на rankoff.org/events)
	const tierByTour = Object.fromEntries((listTours.data ?? []).map((e) => [e.name_tour_sort, Number(e.tier) || null]))

	// Карты для фильтра — свои у каждого топа, по его турнирам и не исключённым матчам
	const leftMaps = useMemo(() => collectMaps(allMatches.data, left.tours, left.excluded), [allMatches.data, left.tours, left.excluded])
	const rightMaps = useMemo(() => collectMaps(allMatches.data, right.tours, right.excluded), [allMatches.data, right.tours, right.excluded])

	//--------------------------------HTML to IMG def-------------------------------------------------

	// useRef, а не createRef: createRef в функциональном компоненте создаёт новый объект на каждый рендер,
	// и useCallback держал старый ref с current === null — скачивание молча не срабатывало
	const ref = useRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toJpeg(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = 'compare_tops.jpg'
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

	return (
		<div className={classes.container}>
			<div className={classes.wrapperMenu}>

				<div className={classes.btnSaveAsImage} onClick={onButtonClick}>
					Скачать
				</div>
				<div className={classes.settingsGrid}>
					<TopSettings label="Левый топ" settings={left} setSettings={setLeft} allTours={toursID} tierByTour={tierByTour} shortMatches={shortMatches.data} maps={leftMaps} />
					<TopSettings label="Правый топ" settings={right} setSettings={setRight} allTours={toursID} tierByTour={tierByTour} shortMatches={shortMatches.data} maps={rightMaps} />
				</div>
			</div>
			<div className={classes.wrapperPicture} ref={ref} style={{ backgroundImage: `url(${BG_IMAGE})` }}>
				<div className={classes.rankoffAndNameEvent}>
					<div className={classes.logoRankoff}>
						<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/RANKOFF_LOGO.svg`} alt="/" />
						<div className={classes.titleBanner}>RANKOFF COMPARE TOPS</div>
					</div>
				</div>
				<div className={classes.wrapperTops}>
					<div className={classes.leftTop}>
						<LeftTopResult stage={left.stage} setLeftTop={setLeftTop} tours={left.tours} excluded={left.excluded} maps={left.maps} limit={left.limit} title={left.title} />
					</div>
					<div className={classes.rightTop}>
						<RightTopResult stage={right.stage} leftTop={leftTop} tours={right.tours} excluded={right.excluded} maps={right.maps} limit={right.limit} title={right.title} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default CompareTops
