import React, { useRef, useCallback, useEffect, useState } from 'react'
import classes from './matchesDay.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetMatchesByNameQuery, useGetMatchesByNameTourQuery, useGetMatchesQuery, useGetPlayersQuery, useGetShortMatchByNameQuery, useGetShortMatchQuery, useGetTeamsQuery, useGetTournamentsQuery } from '../../store/api/apiSlice'
import OneMatch from './PictureResultV2/oneMatch'
import TwoMatches from './PictureResultV2/twoMatches'
import ThreeMatches from './PictureResultV2/threeMatches'
import FourMatches from './PictureResultV2/fourMatches'
import FiveMatches from './PictureResultV2/fiveMatches'
import SixMatches from './PictureResultV2/sixMatches'

const MatchesDay = () => {
	const listMatches = useGetShortMatchQuery()
	const listTours = useGetTournamentsQuery()
	const allTeams = useGetTeamsQuery()
	const allPlayers = useGetPlayersQuery()

	const [date, setDate] = useState([])
	const [today, setToday] = useState([])

	const [choiceMatch, setChoiceMatch] = useState('')
	const [matches, setMatches] = useState('')

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

	const getPlayersTeam = (team_id) => {
		let rosterTeam = []

		allTeams.data
			.filter((e) => e.team_id === team_id)
			.forEach((e) => {
				allPlayers.data
					.filter((e1) => e1.nickname !== 'nickname' && (e1.player_id === e.player_1_id || e1.player_id === e.player_2_id || e1.player_id === e.player_3_id || e1.player_id === e.player_4_id || e1.player_id === e.player_5_id))
					.forEach((e2) => {
						rosterTeam.push({
							nickname: e2.nickname,
							playerPhoto: e2.logo_player ? e2.logo_player : 'PlayerDefaultLogo.png',
						})
					})
			})

		return rosterTeam
	}

	if (listMatches.data && listMatches.data.length > 0 && allTeams.data && allTeams.data.length > 0 && allPlayers.data && allPlayers.data.length > 0) {
		listMatches.data.map((e) => {
			dates.push(e.date_match)
		})

		dates = dates
			.filter((item, index) => {
				return dates.indexOf(item) === index
			})
			.sort()
			.reverse()

		listMatches.data.map((e) => {
			if (e.date_match === date) {
				matchesID.push(e.name_match_for_sort)
				matchesData.push({
					team1: e.team1,
					team2: e.team2,
					team1_id: e.team1_id,
					team2_id: e.team2_id,
					logo_t1: e.logo_t1,
					logo_t2: e.logo_t2,
					score_t1: e.total_score_match_t1,
					score_t2: e.total_score_match_t2,
					match_id: e.name_match_for_sort,
					tour_id: e.name_tour_sort,
					format: e.format,
					date: e.date_match,
					stage: e.name_stage,
					time: e.time_match.slice(0, -3),
					playersTeam1: getPlayersTeam(e.team1_id),
					playersTeam2: getPlayersTeam(e.team2_id),
				})
			}
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
				link.download = `${date}.jpg`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [date])

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

	useEffect(() => {
		if (choiceMatch.length > 0) {
			setMatches(matchesData.filter((e) => e.match_id === choiceMatch))
		} else if (choiceTour.length > 0) {
			setMatches(matchesData.filter((e) => e.tour_id === choiceTour).reverse())
		} else {
			setMatches(matchesData.reverse())
		}
	}, [choiceMatch, choiceTour])

	return (
		<>
			<div className={classes.wrapperMenu}>

				<div className={classes.menu}>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Выбор матча:</div>
						<div className={classes.listMatches}>
							{matchesID.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceTour('')
											setChoiceMatch(e)
											setMatches(e)
										}}>
										{e}
									</div>
								)
							})}
						</div>
					</div>

					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Выбор турнира:</div>
						<div className={classes.listMatches}>
							{toursID.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceTour(e)
											setChoiceMatch('')
										}}>
										{e}
									</div>
								)
							})}
						</div>
					</div>

					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Выбор даты:</div>
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
						<button className={classes.btnSaveAsImage} onClick={onButtonClick}>
							Save as image
						</button>
					</div>
				</div>
			</div>

			<div ref={ref}>
				{matches.length === 1 ? (
					<OneMatch matches={matches} />
				) : matches.length === 2 ? (
					<TwoMatches matches={matches} />
				) : matches.length === 3 ? (
					<ThreeMatches matches={matches} />
				) : matches.length === 4 ? (
					<FourMatches matches={matches} />
				) : matches.length === 5 ? (
					<FiveMatches matches={matches} />
				) : matches.length === 6 ? (
					<SixMatches matches={matches} />
				) : (
					''
				)}
			</div>
		</>
	)
}

export default MatchesDay
