import React, { useEffect, useState } from 'react'
import classes from '../CYBERSHOKE.module.css'
import { useGetMatchesByNameQuery } from '../../../store/api/apiSlice'
import CountryFlagPlayer from '../../../Function/countryFlagPlayer'
import normalizeImpact from '../../Functions/AllFunctions/normalizeImpact'
import normalizeRating from '../../Functions/AllFunctions/normalizeRating'
import normalizeKD from '../../Functions/AllFunctions/normalizeKD'
import Rating from '../../Formulas/rating'
import Kpr from '../../Formulas/kpr'
import Dpr from '../../Formulas/dpr'

const PictureResult2 = (props) => {
	const name = props.name
	const choiceMap = props.map
	const entryDataMatch = props.entryDataMatch

	const [isValidData, setIsValidData] = useState(false)

	useEffect(() => {
		const isDataValid = entryDataMatch?.every((item) => {
			return Object.values(item).every((value) => value !== null && value !== '' && value !== 'NaN')
		})

		setIsValidData(isDataValid)
	}, [props.entryDataMatch])

	const necessaryMatch = useGetMatchesByNameQuery({ name })

	let players = []
	let matchTeamsInfo = []
	let matchMaps = []

	let count = 0

	let t1p1_nickname
	let t1p2_nickname
	let t1p3_nickname
	let t1p4_nickname
	let t1p5_nickname
	let t2p1_nickname
	let t2p2_nickname
	let t2p3_nickname
	let t2p4_nickname
	let t2p5_nickname

	let scoreT1 = 0
	let scoreT2 = 0
	let dateMatch
	let NameTour
	let logoTour

	let t1p1
	let t1p2
	let t1p3
	let t1p4
	let t1p5
	let t2p1
	let t2p2
	let t2p3
	let t2p4
	let t2p5
	let t1p1_logo
	let t1p2_logo
	let t1p3_logo
	let t1p4_logo
	let t1p5_logo
	let t2p1_logo
	let t2p2_logo
	let t2p3_logo
	let t2p4_logo
	let t2p5_logo

	let t1p1_k = 0
	let t1p2_k = 0
	let t1p3_k = 0
	let t1p4_k = 0
	let t1p5_k = 0
	let t2p1_k = 0
	let t2p2_k = 0
	let t2p3_k = 0
	let t2p4_k = 0
	let t2p5_k = 0

	let t1p1_a = 0
	let t1p2_a = 0
	let t1p3_a = 0
	let t1p4_a = 0
	let t1p5_a = 0
	let t2p1_a = 0
	let t2p2_a = 0
	let t2p3_a = 0
	let t2p4_a = 0
	let t2p5_a = 0

	let t1p1_d = 0
	let t1p2_d = 0
	let t1p3_d = 0
	let t1p4_d = 0
	let t1p5_d = 0
	let t2p1_d = 0
	let t2p2_d = 0
	let t2p3_d = 0
	let t2p4_d = 0
	let t2p5_d = 0

	let t1p1_impact = 0
	let t1p2_impact = 0
	let t1p3_impact = 0
	let t1p4_impact = 0
	let t1p5_impact = 0
	let t2p1_impact = 0
	let t2p2_impact = 0
	let t2p3_impact = 0
	let t2p4_impact = 0
	let t2p5_impact = 0

	let t1p1_count_maps = 0
	let t1p2_count_maps = 0
	let t1p3_count_maps = 0
	let t1p4_count_maps = 0
	let t1p5_count_maps = 0
	let t2p1_count_maps = 0
	let t2p2_count_maps = 0
	let t2p3_count_maps = 0
	let t2p4_count_maps = 0
	let t2p5_count_maps = 0

	let allRounds = 0
	let tempArr = []
	let necessaryData = []

	if (necessaryMatch.data && necessaryMatch.data.length > 0) {
		necessaryData = necessaryMatch.data
	} else if (isValidData) {
		necessaryData = entryDataMatch
	}

	if (necessaryData && necessaryData.length > 0) {
		tempArr = isValidData ? necessaryData : choiceMap.length > 0 && choiceMap !== 'AllMaps' ? necessaryData.filter((e) => e.map === choiceMap) : necessaryData

		tempArr.map((el) => {
			dateMatch = el.db_date_match
			NameTour = el.name_tour
			logoTour = el.name_tour_for_sort + '.jpg'

			// команды матча
			matchTeamsInfo[0] = {
				team1: el.team1,
				team2: el.team2,
				team1Logo: el.team1_logo,
				team2Logo: el.team2_logo,
			}

			// карты матча

			matchMaps.push({
				map: el.map + '.jpg',
				name: el.map,
				mapPickTeam: el.map_pick,
				mapPick: el.team1_logo.indexOf(`${el.map_pick.replace(/\s/g, '')}`) >= 0 ? el.team1_logo : el.team2_logo.indexOf(`${el.map_pick.replace(/\s/g, '')}`) >= 0 ? el.team2_logo : 'DECIDER',
				scoreT1: el.total_r_team1,
				scoreT2: el.total_r_team2,
				team1Logo: el.team1_logo,
				team2Logo: el.team2_logo,
			})

			if (el.total_r_team1 > el.total_r_team2) {
				scoreT1++
			}

			if (el.total_r_team1 < el.total_r_team2) {
				scoreT2++
			}

			allRounds += el.total_r_team1 + el.total_r_team2

			count++
			t1p1_nickname = t1p1
			t1p2_nickname = t1p2
			t1p3_nickname = t1p3
			t1p4_nickname = t1p4
			t1p5_nickname = t1p5
			t2p1_nickname = t2p1
			t2p2_nickname = t2p2
			t2p3_nickname = t2p3
			t2p4_nickname = t2p4
			t2p5_nickname = t2p5

			if (el.t1p1 && el.t1p1 === t1p1_nickname) {
				t1p1 = el.t1p1
				t1p1_logo = el.t1p1_logo
				t1p1_k += el.t1p1_k
				t1p1_a += el.t1p1_a
				t1p1_d += el.t1p1_d
				t1p1_impact += el.t1p1_impact
				t1p1_count_maps += 1
			} else {
				t1p1 = el.t1p1
				t1p1_logo = el.t1p1_logo
				t1p1_k = el.t1p1_k
				t1p1_a = el.t1p1_a
				t1p1_d = el.t1p1_d
				t1p1_impact = el.t1p1_impact
				t1p1_count_maps = 1
			}
			if (el.t1p2 && el.t1p2 === t1p2_nickname) {
				t1p2 = el.t1p2
				t1p2_logo = el.t1p2_logo
				t1p2_k += el.t1p2_k
				t1p2_a += el.t1p2_a
				t1p2_d += el.t1p2_d
				t1p2_impact += el.t1p2_impact
				t1p2_count_maps += 1
			} else {
				t1p2 = el.t1p2
				t1p2_logo = el.t1p2_logo
				t1p2_k = el.t1p2_k
				t1p2_a = el.t1p2_a
				t1p2_d = el.t1p2_d
				t1p2_impact = el.t1p2_impact
				t1p2_count_maps = 1
			}
			if (el.t1p3 && el.t1p3 === t1p3_nickname) {
				t1p3 = el.t1p3
				t1p3_logo = el.t1p3_logo
				t1p3_k += el.t1p3_k
				t1p3_a += el.t1p3_a
				t1p3_d += el.t1p3_d
				t1p3_impact += el.t1p3_impact
				t1p3_count_maps += 1
			} else {
				t1p3 = el.t1p3
				t1p3_logo = el.t1p3_logo
				t1p3_k = el.t1p3_k
				t1p3_a = el.t1p3_a
				t1p3_d = el.t1p3_d
				t1p3_impact = el.t1p3_impact
				t1p3_count_maps = 1
			}
			if (el.t1p4 && el.t1p4 === t1p4_nickname) {
				t1p4 = el.t1p4
				t1p4_logo = el.t1p4_logo
				t1p4_k += el.t1p4_k
				t1p4_a += el.t1p4_a
				t1p4_d += el.t1p4_d
				t1p4_impact += el.t1p4_impact
				t1p4_count_maps += 1
			} else {
				t1p4 = el.t1p4
				t1p4_logo = el.t1p4_logo
				t1p4_k = el.t1p4_k
				t1p4_a = el.t1p4_a
				t1p4_d = el.t1p4_d
				t1p4_impact = el.t1p4_impact
				t1p4_count_maps = 1
			}
			if (el.t1p5 && el.t1p5 === t1p5_nickname) {
				t1p5 = el.t1p5
				t1p5_logo = el.t1p5_logo
				t1p5_k += el.t1p5_k
				t1p5_a += el.t1p5_a
				t1p5_d += el.t1p5_d
				t1p5_impact += el.t1p5_impact
				t1p5_count_maps += 1
			} else {
				t1p5 = el.t1p5
				t1p5_logo = el.t1p5_logo
				t1p5_k = el.t1p5_k
				t1p5_a = el.t1p5_a
				t1p5_d = el.t1p5_d
				t1p5_impact = el.t1p5_impact
				t1p5_count_maps = 1
			}

			if (el.t2p1 && el.t2p1 === t2p1_nickname) {
				t2p1 = el.t2p1
				t2p1_logo = el.t2p1_logo
				t2p1_k += el.t2p1_k
				t2p1_a += el.t2p1_a
				t2p1_d += el.t2p1_d
				t2p1_impact += el.t2p1_impact
				t2p1_count_maps += 1
			} else {
				t2p1 = el.t2p1
				t2p1_logo = el.t2p1_logo
				t2p1_k = el.t2p1_k
				t2p1_a = el.t2p1_a
				t2p1_d = el.t2p1_d
				t2p1_impact = el.t2p1_impact
				t2p1_count_maps = 1
			}
			if (el.t2p2 && el.t2p2 === t2p2_nickname) {
				t2p2 = el.t2p2
				t2p2_logo = el.t2p2_logo
				t2p2_k += el.t2p2_k
				t2p2_a += el.t2p2_a
				t2p2_d += el.t2p2_d
				t2p2_impact += el.t2p2_impact
				t2p2_count_maps += 1
			} else {
				t2p2 = el.t2p2
				t2p2_logo = el.t2p2_logo
				t2p2_k = el.t2p2_k
				t2p2_a = el.t2p2_a
				t2p2_d = el.t2p2_d
				t2p2_impact = el.t2p2_impact
				t2p2_count_maps = 1
			}
			if (el.t2p3 && el.t2p3 === t2p3_nickname) {
				t2p3 = el.t2p3
				t2p3_logo = el.t2p3_logo
				t2p3_k += el.t2p3_k
				t2p3_a += el.t2p3_a
				t2p3_d += el.t2p3_d
				t2p3_impact += el.t2p3_impact
				t2p3_count_maps += 1
			} else {
				t2p3 = el.t2p3
				t2p3_logo = el.t2p3_logo
				t2p3_k = el.t2p3_k
				t2p3_a = el.t2p3_a
				t2p3_d = el.t2p3_d
				t2p3_impact = el.t2p3_impact
				t2p3_count_maps = 1
			}

			if (el.t2p4 && el.t2p4 === t2p4_nickname) {
				t2p4 = el.t2p4
				t2p4_logo = el.t2p4_logo
				t2p4_k += el.t2p4_k
				t2p4_a += el.t2p4_a
				t2p4_d += el.t2p4_d
				t2p4_impact += el.t2p4_impact
				t2p4_count_maps += 1
			} else {
				t2p4 = el.t2p4
				t2p4_logo = el.t2p4_logo
				t2p4_k = el.t2p4_k
				t2p4_a = el.t2p4_a
				t2p4_d = el.t2p4_d
				t2p4_impact = el.t2p4_impact
				t2p4_count_maps = 1
			}
			if (el.t2p5 && el.t2p5 === t2p5_nickname) {
				t2p5 = el.t2p5
				t2p5_logo = el.t2p5_logo
				t2p5_k += el.t2p5_k
				t2p5_a += el.t2p5_a
				t2p5_d += el.t2p5_d
				t2p5_impact += el.t2p5_impact
				t2p5_count_maps += 1
			} else {
				t2p5 = el.t2p5
				t2p5_logo = el.t2p5_logo
				t2p5_k = el.t2p5_k
				t2p5_a = el.t2p5_a
				t2p5_d = el.t2p5_d
				t2p5_impact = el.t2p5_impact
				t2p5_count_maps = 1
			}
		})

		players[0] = {
			dateMatch: dateMatch,
			NameTour: NameTour,
			logoTour: logoTour,
			scoreT1: scoreT1,
			scoreT2: scoreT2,
			t1p1: t1p1,
			t1p2: t1p2,
			t1p3: t1p3,
			t1p4: t1p4,
			t1p5: t1p5,
			t2p1: t2p1,
			t2p2: t2p2,
			t2p3: t2p3,
			t2p4: t2p4,
			t2p5: t2p5,
			t1p1_logo: t1p1_logo,
			t1p2_logo: t1p2_logo,
			t1p3_logo: t1p3_logo,
			t1p4_logo: t1p4_logo,
			t1p5_logo: t1p5_logo,
			t2p1_logo: t2p1_logo,
			t2p2_logo: t2p2_logo,
			t2p3_logo: t2p3_logo,
			t2p4_logo: t2p4_logo,
			t2p5_logo: t2p5_logo,
			t1p1_k: t1p1_k,
			t1p2_k: t1p2_k,
			t1p3_k: t1p3_k,
			t1p4_k: t1p4_k,
			t1p5_k: t1p5_k,
			t2p1_k: t2p1_k,
			t2p2_k: t2p2_k,
			t2p3_k: t2p3_k,
			t2p4_k: t2p4_k,
			t2p5_k: t2p5_k,
			t1p1_a: t1p1_a,
			t1p2_a: t1p2_a,
			t1p3_a: t1p3_a,
			t1p4_a: t1p4_a,
			t1p5_a: t1p5_a,
			t2p1_a: t2p1_a,
			t2p2_a: t2p2_a,
			t2p3_a: t2p3_a,
			t2p4_a: t2p4_a,
			t2p5_a: t2p5_a,
			t1p1_d: t1p1_d,
			t1p2_d: t1p2_d,
			t1p3_d: t1p3_d,
			t1p4_d: t1p4_d,
			t1p5_d: t1p5_d,
			t2p1_d: t2p1_d,
			t2p2_d: t2p2_d,
			t2p3_d: t2p3_d,
			t2p4_d: t2p4_d,
			t2p5_d: t2p5_d,
			t1p1_kd: Math.round((t1p1_k / t1p1_d) * 100) / 100,
			t1p2_kd: Math.round((t1p2_k / t1p2_d) * 100) / 100,
			t1p3_kd: Math.round((t1p3_k / t1p3_d) * 100) / 100,
			t1p4_kd: Math.round((t1p4_k / t1p4_d) * 100) / 100,
			t1p5_kd: Math.round((t1p5_k / t1p5_d) * 100) / 100,
			t2p1_kd: Math.round((t2p1_k / t2p1_d) * 100) / 100,
			t2p2_kd: Math.round((t2p2_k / t2p2_d) * 100) / 100,
			t2p3_kd: Math.round((t2p3_k / t2p3_d) * 100) / 100,
			t2p4_kd: Math.round((t2p4_k / t2p4_d) * 100) / 100,
			t2p5_kd: Math.round((t2p5_k / t2p5_d) * 100) / 100,
			t1p1_kpr: Math.round(Kpr(t1p1_k, allRounds) * 100) / 100,
			t1p2_kpr: Math.round(Kpr(t1p2_k, allRounds) * 100) / 100,
			t1p3_kpr: Math.round(Kpr(t1p3_k, allRounds) * 100) / 100,
			t1p4_kpr: Math.round(Kpr(t1p4_k, allRounds) * 100) / 100,
			t1p5_kpr: Math.round(Kpr(t1p5_k, allRounds) * 100) / 100,
			t2p1_kpr: Math.round(Kpr(t2p1_k, allRounds) * 100) / 100,
			t2p2_kpr: Math.round(Kpr(t2p2_k, allRounds) * 100) / 100,
			t2p3_kpr: Math.round(Kpr(t2p3_k, allRounds) * 100) / 100,
			t2p4_kpr: Math.round(Kpr(t2p4_k, allRounds) * 100) / 100,
			t2p5_kpr: Math.round(Kpr(t2p5_k, allRounds) * 100) / 100,
			t1p1_dpr: Math.round(Dpr(t1p1_d, allRounds) * 100) / 100,
			t1p2_dpr: Math.round(Dpr(t1p2_d, allRounds) * 100) / 100,
			t1p3_dpr: Math.round(Dpr(t1p3_d, allRounds) * 100) / 100,
			t1p4_dpr: Math.round(Dpr(t1p4_d, allRounds) * 100) / 100,
			t1p5_dpr: Math.round(Dpr(t1p5_d, allRounds) * 100) / 100,
			t2p1_dpr: Math.round(Dpr(t2p1_d, allRounds) * 100) / 100,
			t2p2_dpr: Math.round(Dpr(t2p2_d, allRounds) * 100) / 100,
			t2p3_dpr: Math.round(Dpr(t2p3_d, allRounds) * 100) / 100,
			t2p4_dpr: Math.round(Dpr(t2p4_d, allRounds) * 100) / 100,
			t2p5_dpr: Math.round(Dpr(t2p5_d, allRounds) * 100) / 100,
			t1p1_impact: Math.round((t1p1_impact / t1p1_count_maps) * 100) / 100,
			t1p2_impact: Math.round((t1p2_impact / t1p2_count_maps) * 100) / 100,
			t1p3_impact: Math.round((t1p3_impact / t1p3_count_maps) * 100) / 100,
			t1p4_impact: Math.round((t1p4_impact / t1p4_count_maps) * 100) / 100,
			t1p5_impact: Math.round((t1p5_impact / t1p5_count_maps) * 100) / 100,
			t2p1_impact: Math.round((t2p1_impact / t2p1_count_maps) * 100) / 100,
			t2p2_impact: Math.round((t2p2_impact / t2p2_count_maps) * 100) / 100,
			t2p3_impact: Math.round((t2p3_impact / t2p3_count_maps) * 100) / 100,
			t2p4_impact: Math.round((t2p4_impact / t2p4_count_maps) * 100) / 100,
			t2p5_impact: Math.round((t2p5_impact / t2p5_count_maps) * 100) / 100,
			t1p1_rating: Rating(t1p1_k / t1p1_d, t1p1_k / allRounds, t1p1_d / allRounds, t1p1_impact / t1p1_count_maps),
			t1p2_rating: Rating(t1p2_k / t1p2_d, t1p2_k / allRounds, t1p2_d / allRounds, t1p2_impact / t1p2_count_maps),
			t1p3_rating: Rating(t1p3_k / t1p3_d, t1p3_k / allRounds, t1p3_d / allRounds, t1p3_impact / t1p3_count_maps),
			t1p4_rating: Rating(t1p4_k / t1p4_d, t1p4_k / allRounds, t1p4_d / allRounds, t1p4_impact / t1p4_count_maps),
			t1p5_rating: Rating(t1p5_k / t1p5_d, t1p5_k / allRounds, t1p5_d / allRounds, t1p5_impact / t1p5_count_maps),
			t2p1_rating: Rating(t2p1_k / t2p1_d, t2p1_k / allRounds, t2p1_d / allRounds, t2p1_impact / t2p1_count_maps),
			t2p2_rating: Rating(t2p2_k / t2p2_d, t2p2_k / allRounds, t2p2_d / allRounds, t2p2_impact / t2p2_count_maps),
			t2p3_rating: Rating(t2p3_k / t2p3_d, t2p3_k / allRounds, t2p3_d / allRounds, t2p3_impact / t2p3_count_maps),
			t2p4_rating: Rating(t2p4_k / t2p4_d, t2p4_k / allRounds, t2p4_d / allRounds, t2p4_impact / t2p4_count_maps),
			t2p5_rating: Rating(t2p5_k / t2p5_d, t2p5_k / allRounds, t2p5_d / allRounds, t2p5_impact / t2p5_count_maps),
		}

		let ratingPlayers = []
		let maxRating = 0
		let mvp = []

		for (let i = 1; i < 3; i++) {
			for (let j = 1; j < 6; j++) {
				ratingPlayers.push({
					nickname: players[0][`t${i}p${j}`],
					photo: players[0][`t${i}p${j}_logo`],
					rating: players[0][`t${i}p${j}_rating`],
					team: matchTeamsInfo[0][`team${i}`],
				})
			}
		}

		ratingPlayers.forEach((e) => {
			if (e.rating > maxRating) {
				maxRating = e.rating
				mvp = e
			}
		})

		function ourTeamWinOrNot(score, teams) {
			let res

			if (score[0].scoreT1 > score[0].scoreT2 && teams[0].team1 === 'CYBERSHOKE') {
				res = 'VICTORY'
			} else if (score[0].scoreT1 < score[0].scoreT2 && teams[0].team2 === 'CYBERSHOKE') {
				res = 'VICTORY'
			} else if (score[0].scoreT1 === score[0].scoreT2 && (teams[0].team1 === 'CYBERSHOKE' || teams[0].team2 === 'CYBERSHOKE')) {
				res = 'DRAW'
			} else {
				res = 'DEFEAT'
			}

			return res
		}

		let arr = []

		ratingPlayers.forEach((e) => {
			if (e.team === 'CYBERSHOKE') {
				arr.push(e)
			}

			return arr
		})

		return (
			<div className={classes.wrapperMatchResult}>
				<div className={classes.wrapperTopSection}>
					<div className={classes.generalInfoMatch}>
						<div
							className={classes.statusMatch}
							style={{
								background: ourTeamWinOrNot(players, matchTeamsInfo) === 'VICTORY' ? 'var(--green)' : ourTeamWinOrNot(players, matchTeamsInfo) === 'VICTORY' ? 'var(--red)' : 'var(--draw)',
							}}>
							{ourTeamWinOrNot(players, matchTeamsInfo)}
						</div>
						<div className={classes.scoreMatch}>
							<div className={classes.team1Logo}>
								<img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/" />
							</div>
							<div className={classes.score}>
								{players[0].scoreT1}:{players[0].scoreT2}
							</div>
							<div className={classes.team2Logo}>
								<img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/" />
							</div>
						</div>
						<div className={classes.event}>
							<div className={classes.nameEvent}>{players[0].NameTour}</div>
							<div className={classes.nameEvent}>{players[0].dateMatch}</div>
						</div>
					</div>
					<div className={classes.wrapperMapsMatch}>
						<div className={classes.titleMaps}>MAPS</div>

						<div className={classes.wrapperMatchMaps}>
							{matchMaps.map((e, index) => {
								return (
									<div className={classes.maps}>
										<div className={classes.imgMap}>
											<img src={`/images/LogoMaps/${e.map}`} alt="" />
										</div>
										<div className={classes.scoreMap}>
											<div className={classes.scoreMapTeamLogo}>
												<img src={`/images/LogoTeams/${e.team1Logo}`} alt="/" />
											</div>
											<div className={classes.totalScoreMap}>
												{e.scoreT1}:{e.scoreT2}
											</div>
											<div className={classes.scoreMapTeamLogo}>
												<img src={`/images/LogoTeams/${e.team2Logo}`} alt="/" />
											</div>
										</div>
										<div className={classes.pickMapTeamLogo}>{e.mapPick === 'DECIDER' ? '' : <img src={`/images/LogoTeams/${e.mapPick}`} alt="/" />}</div>
									</div>
								)
							})}
						</div>
					</div>
					<div className={classes.rankoff}>
						<div className={classes.logoRankoff}>
							<img src={`/images/CYBERSHOKE/Rankoff.svg`} alt="/" />
						</div>
						<div className={classes.linkRankoff}>RANKOFF.ORG</div>
					</div>
				</div>
				<div className={classes.mainSections}>
					<div className={classes.leftSection}>
						<img src={`/images/LogoPlayers/${arr[Math.floor(Math.random() * arr.length)].photo}`} alt="/" />
					</div>
					<div className={classes.rightSection}>
						<div className={classes.teamSection}>
							<div className={classes.titleLineTable}>
								<div className={classes.startCell}>
									<div className={classes.startCellTeamLogo}>
										<img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/" />
										<div className={classes.startCellTeamName}>{matchTeamsInfo[0].team1}</div>
									</div>
								</div>
								<div className={classes.cell1}>K</div>
								<div className={classes.cell2}>A</div>
								<div className={classes.cell3}>D</div>
								<div className={classes.cell4}>+/-</div>
								<div className={classes.cell5}>KD</div>
								<div className={classes.cell6}>KPR</div>
								<div className={classes.cell7}>DPR</div>
								<div className={classes.cell8}>Impact</div>
								<div className={classes.endCell}>Rating</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t1p1} />
									</div>
									{players[0].t1p1 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t1p1}
								</div>
								<div className={classes.cell1}>{players[0].t1p1_k}</div>
								<div className={classes.cell2}>{players[0].t1p1_a}</div>
								<div className={classes.cell3}>{players[0].t1p1_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t1p1_k - players[0].t1p1_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t1p1_k - players[0].t1p1_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t1p1_kd < 0.9 ? 'var(--red)' : players[0].t1p1_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t1p1_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t1p1_kpr < 0.6 ? 'var(--red)' : players[0].t1p1_kpr > 0.65 ? (players[0].t1p1_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p1_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t1p1_dpr < 0.68 ? 'var(--green)' : players[0].t1p1_dpr > 0.7 ? (players[0].t1p1_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p1_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t1p1_impact < 1 ? 'var(--red)' : players[0].t1p1_impact > 1 ? (players[0].t1p1_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p1_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t1p1_rating < 1 ? 'var(--red)' : players[0].t1p1_rating > 1 ? (players[0].t1p1_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p1_rating}
								</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t1p2} />
									</div>
									{players[0].t1p2 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t1p2}
								</div>
								<div className={classes.cell1}>{players[0].t1p2_k}</div>
								<div className={classes.cell2}>{players[0].t1p2_a}</div>
								<div className={classes.cell3}>{players[0].t1p2_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t1p2_k - players[0].t1p2_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t1p2_k - players[0].t1p2_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t1p2_kd < 0.9 ? 'var(--red)' : players[0].t1p2_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t1p2_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t1p2_kpr < 0.6 ? 'var(--red)' : players[0].t1p2_kpr > 0.65 ? (players[0].t1p2_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p2_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t1p2_dpr < 0.68 ? 'var(--green)' : players[0].t1p2_dpr > 0.7 ? (players[0].t1p2_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p2_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t1p2_impact < 1 ? 'var(--red)' : players[0].t1p2_impact > 1 ? (players[0].t1p2_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p2_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t1p2_rating < 1 ? 'var(--red)' : players[0].t1p2_rating > 1 ? (players[0].t1p2_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p2_rating}
								</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t1p3} />
									</div>
									{players[0].t1p3 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t1p3}
								</div>
								<div className={classes.cell1}>{players[0].t1p3_k}</div>
								<div className={classes.cell2}>{players[0].t1p3_a}</div>
								<div className={classes.cell3}>{players[0].t1p3_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t1p3_k - players[0].t1p3_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t1p3_k - players[0].t1p3_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t1p3_kd < 0.9 ? 'var(--red)' : players[0].t1p3_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t1p3_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t1p3_kpr < 0.6 ? 'var(--red)' : players[0].t1p3_kpr > 0.65 ? (players[0].t1p3_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p3_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t1p3_dpr < 0.68 ? 'var(--green)' : players[0].t1p3_dpr > 0.7 ? (players[0].t1p3_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p3_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t1p3_impact < 1 ? 'var(--red)' : players[0].t1p3_impact > 1 ? (players[0].t1p3_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p3_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t1p3_rating < 1 ? 'var(--red)' : players[0].t1p3_rating > 1 ? (players[0].t1p3_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p3_rating}
								</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t1p4} />
									</div>
									{players[0].t1p4 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t1p4}
								</div>
								<div className={classes.cell1}>{players[0].t1p4_k}</div>
								<div className={classes.cell2}>{players[0].t1p4_a}</div>
								<div className={classes.cell3}>{players[0].t1p4_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t1p4_k - players[0].t1p4_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t1p4_k - players[0].t1p4_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t1p4_kd < 0.9 ? 'var(--red)' : players[0].t1p4_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t1p4_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t1p4_kpr < 0.6 ? 'var(--red)' : players[0].t1p4_kpr > 0.65 ? (players[0].t1p4_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p4_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t1p4_dpr < 0.68 ? 'var(--green)' : players[0].t1p4_dpr > 0.7 ? (players[0].t1p4_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p4_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t1p4_impact < 1 ? 'var(--red)' : players[0].t1p4_impact > 1 ? (players[0].t1p4_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p4_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t1p4_rating < 1 ? 'var(--red)' : players[0].t1p4_rating > 1 ? (players[0].t1p4_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p4_rating}
								</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t1p5} />
									</div>
									{players[0].t1p5 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t1p5}
								</div>
								<div className={classes.cell1}>{players[0].t1p5_k}</div>
								<div className={classes.cell2}>{players[0].t1p5_a}</div>
								<div className={classes.cell3}>{players[0].t1p5_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t1p5_k - players[0].t1p5_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t1p5_k - players[0].t1p5_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t1p5_kd < 0.9 ? 'var(--red)' : players[0].t1p5_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t1p5_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t1p5_kpr < 0.6 ? 'var(--red)' : players[0].t1p5_kpr > 0.65 ? (players[0].t1p5_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p5_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t1p5_dpr < 0.68 ? 'var(--green)' : players[0].t1p5_dpr > 0.7 ? (players[0].t1p5_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p5_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t1p5_impact < 1 ? 'var(--red)' : players[0].t1p5_impact > 1 ? (players[0].t1p5_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p5_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t1p5_rating < 1 ? 'var(--red)' : players[0].t1p5_rating > 1 ? (players[0].t1p5_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t1p5_rating}
								</div>
							</div>
						</div>

						<div className={classes.teamSection}>
							<div className={classes.titleLineTable}>
								<div className={classes.startCell}>
									<div className={classes.startCellTeamLogo}>
										<img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/" />
										<div className={classes.startCellTeamName}>{matchTeamsInfo[0].team2}</div>
									</div>
								</div>
								<div className={classes.cell1}>K</div>
								<div className={classes.cell2}>A</div>
								<div className={classes.cell3}>D</div>
								<div className={classes.cell4}>+/-</div>
								<div className={classes.cell5}>KD</div>
								<div className={classes.cell6}>KPR</div>
								<div className={classes.cell7}>DPR</div>
								<div className={classes.cell8}>Impact</div>
								<div className={classes.endCell}>Rating</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t2p1} />
									</div>
									{players[0].t2p1 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t2p1}
								</div>
								<div className={classes.cell1}>{players[0].t2p1_k}</div>
								<div className={classes.cell2}>{players[0].t2p1_a}</div>
								<div className={classes.cell3}>{players[0].t2p1_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t2p1_k - players[0].t2p1_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t2p1_k - players[0].t2p1_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t2p1_kd < 0.9 ? 'var(--red)' : players[0].t2p1_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t2p1_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t2p1_kpr < 0.6 ? 'var(--red)' : players[0].t2p1_kpr > 0.65 ? (players[0].t2p1_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p1_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t2p1_dpr < 0.68 ? 'var(--green)' : players[0].t2p1_dpr > 0.7 ? (players[0].t2p1_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p1_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t2p1_impact < 1 ? 'var(--red)' : players[0].t2p1_impact > 1 ? (players[0].t2p1_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p1_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t2p1_rating < 1 ? 'var(--red)' : players[0].t2p1_rating > 1 ? (players[0].t2p1_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p1_rating}
								</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t2p2} />
									</div>
									{players[0].t2p2 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t2p2}
								</div>
								<div className={classes.cell1}>{players[0].t2p2_k}</div>
								<div className={classes.cell2}>{players[0].t2p2_a}</div>
								<div className={classes.cell3}>{players[0].t2p2_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t2p2_k - players[0].t2p2_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t2p2_k - players[0].t2p2_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t2p2_kd < 0.9 ? 'var(--red)' : players[0].t2p2_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t2p2_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t2p2_kpr < 0.6 ? 'var(--red)' : players[0].t2p2_kpr > 0.65 ? (players[0].t2p2_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p2_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t2p2_dpr < 0.68 ? 'var(--green)' : players[0].t2p2_dpr > 0.7 ? (players[0].t2p2_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p2_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t2p2_impact < 1 ? 'var(--red)' : players[0].t2p2_impact > 1 ? (players[0].t2p2_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p2_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t2p2_rating < 1 ? 'var(--red)' : players[0].t2p2_rating > 1 ? (players[0].t2p2_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p2_rating}
								</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t2p3} />
									</div>
									{players[0].t2p3 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t2p3}
								</div>
								<div className={classes.cell1}>{players[0].t2p3_k}</div>
								<div className={classes.cell2}>{players[0].t2p3_a}</div>
								<div className={classes.cell3}>{players[0].t2p3_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t2p3_k - players[0].t2p3_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t2p3_k - players[0].t2p3_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t2p3_kd < 0.9 ? 'var(--red)' : players[0].t2p3_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t2p3_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t2p3_kpr < 0.6 ? 'var(--red)' : players[0].t2p3_kpr > 0.65 ? (players[0].t2p3_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p3_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t2p3_dpr < 0.68 ? 'var(--green)' : players[0].t2p3_dpr > 0.7 ? (players[0].t2p3_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p3_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t2p3_impact < 1 ? 'var(--red)' : players[0].t2p3_impact > 1 ? (players[0].t2p3_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p3_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t2p3_rating < 1 ? 'var(--red)' : players[0].t2p3_rating > 1 ? (players[0].t2p3_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p3_rating}
								</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t2p4} />
									</div>
									{players[0].t2p4 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t2p4}
								</div>
								<div className={classes.cell1}>{players[0].t2p4_k}</div>
								<div className={classes.cell2}>{players[0].t2p4_a}</div>
								<div className={classes.cell3}>{players[0].t2p4_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t2p4_k - players[0].t2p4_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t2p4_k - players[0].t2p4_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t2p4_kd < 0.9 ? 'var(--red)' : players[0].t2p4_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t2p4_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t2p4_kpr < 0.6 ? 'var(--red)' : players[0].t2p4_kpr > 0.65 ? (players[0].t2p4_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p4_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t2p4_dpr < 0.68 ? 'var(--green)' : players[0].t2p4_dpr > 0.7 ? (players[0].t2p4_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p4_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t2p4_impact < 1 ? 'var(--red)' : players[0].t2p4_impact > 1 ? (players[0].t2p4_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p4_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t2p4_rating < 1 ? 'var(--red)' : players[0].t2p4_rating > 1 ? (players[0].t2p4_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p4_rating}
								</div>
							</div>
							<div className={classes.rowTable}>
								<div className={classes.startCell}>
									<div className={classes.dataFlagPlayer}>
										<CountryFlagPlayer nickname={players[0].t2p5} />
									</div>
									{players[0].t2p5 === mvp.nickname ? <div className={classes.MVP}>MVP</div> : ''}
									{players[0].t2p5}
								</div>
								<div className={classes.cell1}>{players[0].t2p5_k}</div>
								<div className={classes.cell2}>{players[0].t2p5_a}</div>
								<div className={classes.cell3}>{players[0].t2p5_d}</div>
								<div
									className={classes.cell4}
									style={{
										background: players[0].t2p5_k - players[0].t2p5_d < 0 ? 'var(--red)' : 'var(--green)',
									}}>
									{players[0].t2p5_k - players[0].t2p5_d}
								</div>
								<div
									className={classes.cell5}
									style={{
										background: players[0].t2p5_kd < 0.9 ? 'var(--red)' : players[0].t2p5_kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}>
									{players[0].t2p5_kd}
								</div>
								<div
									className={classes.cell6}
									style={{
										background: players[0].t2p5_kpr < 0.6 ? 'var(--red)' : players[0].t2p5_kpr > 0.65 ? (players[0].t2p5_kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p5_kpr}
								</div>
								<div
									className={classes.cell7}
									style={{
										background: players[0].t2p5_dpr < 0.68 ? 'var(--green)' : players[0].t2p5_dpr > 0.7 ? (players[0].t2p5_dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p5_dpr}
								</div>
								<div
									className={classes.cell8}
									style={{
										background: players[0].t2p5_impact < 1 ? 'var(--red)' : players[0].t2p5_impact > 1 ? (players[0].t2p5_impact >= 1.15 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p5_impact}
								</div>
								<div
									className={classes.endCell}
									style={{
										background: players[0].t2p5_rating < 1 ? 'var(--red)' : players[0].t2p5_rating > 1 ? (players[0].t2p5_rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}>
									{players[0].t2p5_rating}
								</div>
							</div>
						</div>
					</div>
				</div>
				<img src={`/images/CYBERSHOKE/CYBERSHOKE.png`} className={classes.bgImg} alt="/" />
			</div>
		)
	}
}

export default PictureResult2
