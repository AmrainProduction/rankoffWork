import React, { useRef, useCallback, useMemo, useState } from 'react'
import classes from './topPlayersTour.module.css'
import menuClasses from '../CompareTops/compareTops.module.css'
import { toPng } from 'html-to-image'
import TopPlayersTourResult from './PictureResult_v2/topPlayersTourResult'
import TopSettings, { collectMaps } from '../CompareTops/topSettings'
import { useGetMatchesQuery, useGetShortMatchQuery, useGetTournamentsQuery } from '../../../store/api/apiSlice'

const TopPlayersTour = () => {
	const listTours = useGetTournamentsQuery()
	const shortMatches = useGetShortMatchQuery()
	const allMatches = useGetMatchesQuery()

	// Настройки топа: заголовок, стадия, турниры, исключённые матчи (name_match_for_sort), карты (пусто = все)
	const [settings, setSettings] = useState({ title: '', stage: '', tours: [], excluded: [], maps: [], limit: '' })

	const toursID = (listTours.data ?? []).map((e) => e.name_tour_sort)
	// Тир турнира из таблицы tournaments (как на rankoff.org/events)
	const tierByTour = Object.fromEntries((listTours.data ?? []).map((e) => [e.name_tour_sort, Number(e.tier) || null]))

	// Карты, сыгранные в выбранных (и не исключённых) матчах, с количеством
	const maps = useMemo(() => collectMaps(allMatches.data, settings.tours, settings.excluded), [allMatches.data, settings.tours, settings.excluded])

	//--------------------------------HTML to IMG def-------------------------------------------------

	const ref = useRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) return

		toPng(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = 'top_players.png'
				link.href = dataUrl
				link.click()
			})
			.catch((err) => console.log(err))
	}, [])

	return (
		<>
			<div className={menuClasses.wrapperMenu}>
				<div className={menuClasses.btnSaveAsImage} onClick={onButtonClick}>
					Download
				</div>
				<div className={menuClasses.settingsGridSingle}>
					<TopSettings settings={settings} setSettings={setSettings} allTours={toursID} tierByTour={tierByTour} shortMatches={shortMatches.data} maps={maps} />
				</div>
			</div>
			<div className={classes.wrapperPicture} ref={ref}>
				{settings.tours.length > 0 ? <TopPlayersTourResult stage={settings.stage} tours={settings.tours} excluded={settings.excluded} maps={settings.maps} limit={settings.limit} title={settings.title} /> : ''}
			</div>
		</>
	)
}

export default TopPlayersTour
