import React, { useEffect, useState } from 'react'
import classes from '../matchPicture2.module.css'
import { useGetMatchesByNameQuery } from '../../../../store/api/apiSlice'
import CountryFlagPlayer from '../../../../Function/countryFlagPlayer'
import Rating from '../../../Formulas/rating'
import Kpr from '../../../Formulas/kpr'
import Dpr from '../../../Formulas/dpr'
import Loader from '../../../UI/Loader/loader'

const PictureResult2 = (props) => {
	const name = props.name
	const choiceMap = props.map ?? ''
	const entryDataMatch = props.entryDataMatch

	const [isValidData, setIsValidData] = useState(false)

	useEffect(() => {
		const isDataValid = entryDataMatch?.every((item) => {
			return Object.values(item).every((value) => value !== null && value !== '' && value !== 'NaN')
		})

		setIsValidData(isDataValid)
	}, [props.entryDataMatch])

	const necessaryMatch = useGetMatchesByNameQuery({ name })

	const isLoading = necessaryMatch.isLoading

	if (isLoading) {
		return <Loader />
	}

	let playersTemp = []
	let matchTeamsInfo = []
	let matchMaps = []
	let players = []
	let players2 = []
	let numbersT = [1, 2]
	let numbersP = [1, 2, 3, 4, 5]

	let count = 0

	let t1p1_idCheck
	let t1p2_idCheck
	let t1p3_idCheck
	let t1p4_idCheck
	let t1p5_idCheck
	let t2p1_idCheck
	let t2p2_idCheck
	let t2p3_idCheck
	let t2p4_idCheck
	let t2p5_idCheck

	let scoreT1 = 0
	let scoreT2 = 0
	let dateMatch
	let NameTour
	let logoTour
	let team1_id
	let team2_id

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

	let t1p1_id
	let t1p2_id
	let t1p3_id
	let t1p4_id
	let t1p5_id
	let t2p1_id
	let t2p2_id
	let t2p3_id
	let t2p4_id
	let t2p5_id

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
			logoTour = el.name_tour_for_sort + '.png'
			team1_id = el.team1_id
			team2_id = el.team2_id

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
				mapPick: el.team1_logo.indexOf(`${el.map_pick.replace(/\s/g, '')}`) >= 0 ? el.team1_logo : el.team2_logo.indexOf(`${el.map_pick.replace(/\s/g, '')}`) >= 0 ? el.team2_logo : 'Decider',
				scoreT1: el.total_r_team1,
				scoreT2: el.total_r_team2,
				team1: el.team1,
				team2: el.team2,
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
			t1p1_idCheck = t1p1_id
			t1p2_idCheck = t1p2_id
			t1p3_idCheck = t1p3_id
			t1p4_idCheck = t1p4_id
			t1p5_idCheck = t1p5_id
			t2p1_idCheck = t2p1_id
			t2p2_idCheck = t2p2_id
			t2p3_idCheck = t2p3_id
			t2p4_idCheck = t2p4_id
			t2p5_idCheck = t2p5_id

			if (el.t1p1_id && el.t1p1_id === t1p1_idCheck) {
				t1p1_id = el.t1p1_id
				t1p1 = el.t1p1
				t1p1_logo = el.t1p1_logo
				t1p1_k += el.t1p1_k
				t1p1_a += el.t1p1_a
				t1p1_d += el.t1p1_d
				t1p1_impact += el.t1p1_impact
				t1p1_count_maps += 1
			} else {
				t1p1_id = el.t1p1_id
				t1p1 = el.t1p1
				t1p1_logo = el.t1p1_logo
				t1p1_k = el.t1p1_k
				t1p1_a = el.t1p1_a
				t1p1_d = el.t1p1_d
				t1p1_impact = el.t1p1_impact
				t1p1_count_maps = 1
			}
			if (el.t1p2_id && el.t1p2_id === t1p2_idCheck) {
				t1p2_id = el.t1p2_id
				t1p2 = el.t1p2
				t1p2_logo = el.t1p2_logo
				t1p2_k += el.t1p2_k
				t1p2_a += el.t1p2_a
				t1p2_d += el.t1p2_d
				t1p2_impact += el.t1p2_impact
				t1p2_count_maps += 1
			} else {
				t1p2_id = el.t1p2_id
				t1p2 = el.t1p2
				t1p2_logo = el.t1p2_logo
				t1p2_k = el.t1p2_k
				t1p2_a = el.t1p2_a
				t1p2_d = el.t1p2_d
				t1p2_impact = el.t1p2_impact
				t1p2_count_maps = 1
			}
			if (el.t1p3_id && el.t1p3_id === t1p3_idCheck) {
				t1p3_id = el.t1p3_id
				t1p3 = el.t1p3
				t1p3_logo = el.t1p3_logo
				t1p3_k += el.t1p3_k
				t1p3_a += el.t1p3_a
				t1p3_d += el.t1p3_d
				t1p3_impact += el.t1p3_impact
				t1p3_count_maps += 1
			} else {
				t1p3_id = el.t1p3_id
				t1p3 = el.t1p3
				t1p3_logo = el.t1p3_logo
				t1p3_k = el.t1p3_k
				t1p3_a = el.t1p3_a
				t1p3_d = el.t1p3_d
				t1p3_impact = el.t1p3_impact
				t1p3_count_maps = 1
			}
			if (el.t1p4_id && el.t1p4_id === t1p4_idCheck) {
				t1p4_id = el.t1p4_id
				t1p4 = el.t1p4
				t1p4_logo = el.t1p4_logo
				t1p4_k += el.t1p4_k
				t1p4_a += el.t1p4_a
				t1p4_d += el.t1p4_d
				t1p4_impact += el.t1p4_impact
				t1p4_count_maps += 1
			} else {
				t1p4_id = el.t1p4_id
				t1p4 = el.t1p4
				t1p4_logo = el.t1p4_logo
				t1p4_k = el.t1p4_k
				t1p4_a = el.t1p4_a
				t1p4_d = el.t1p4_d
				t1p4_impact = el.t1p4_impact
				t1p4_count_maps = 1
			}
			if (el.t1p5_id && el.t1p5_id === t1p5_idCheck) {
				t1p5_id = el.t1p5_id
				t1p5 = el.t1p5
				t1p5_logo = el.t1p5_logo
				t1p5_k += el.t1p5_k
				t1p5_a += el.t1p5_a
				t1p5_d += el.t1p5_d
				t1p5_impact += el.t1p5_impact
				t1p5_count_maps += 1
			} else {
				t1p5_id = el.t1p5_id
				t1p5 = el.t1p5
				t1p5_logo = el.t1p5_logo
				t1p5_k = el.t1p5_k
				t1p5_a = el.t1p5_a
				t1p5_d = el.t1p5_d
				t1p5_impact = el.t1p5_impact
				t1p5_count_maps = 1
			}

			if (el.t2p1_id && el.t2p1_id === t2p1_idCheck) {
				t2p1_id = el.t2p1_id
				t2p1 = el.t2p1
				t2p1_logo = el.t2p1_logo
				t2p1_k += el.t2p1_k
				t2p1_a += el.t2p1_a
				t2p1_d += el.t2p1_d
				t2p1_impact += el.t2p1_impact
				t2p1_count_maps += 1
			} else {
				t2p1_id = el.t2p1_id
				t2p1 = el.t2p1
				t2p1_logo = el.t2p1_logo
				t2p1_k = el.t2p1_k
				t2p1_a = el.t2p1_a
				t2p1_d = el.t2p1_d
				t2p1_impact = el.t2p1_impact
				t2p1_count_maps = 1
			}
			if (el.t2p2_id && el.t2p2_id === t2p2_idCheck) {
				t2p2_id = el.t2p2_id
				t2p2 = el.t2p2
				t2p2_logo = el.t2p2_logo
				t2p2_k += el.t2p2_k
				t2p2_a += el.t2p2_a
				t2p2_d += el.t2p2_d
				t2p2_impact += el.t2p2_impact
				t2p2_count_maps += 1
			} else {
				t2p2_id = el.t2p2_id
				t2p2 = el.t2p2
				t2p2_logo = el.t2p2_logo
				t2p2_k = el.t2p2_k
				t2p2_a = el.t2p2_a
				t2p2_d = el.t2p2_d
				t2p2_impact = el.t2p2_impact
				t2p2_count_maps = 1
			}
			if (el.t2p3_id && el.t2p3_id === t2p3_idCheck) {
				t2p3_id = el.t2p3_id
				t2p3 = el.t2p3
				t2p3_logo = el.t2p3_logo
				t2p3_k += el.t2p3_k
				t2p3_a += el.t2p3_a
				t2p3_d += el.t2p3_d
				t2p3_impact += el.t2p3_impact
				t2p3_count_maps += 1
			} else {
				t2p3_id = el.t2p3_id
				t2p3 = el.t2p3
				t2p3_logo = el.t2p3_logo
				t2p3_k = el.t2p3_k
				t2p3_a = el.t2p3_a
				t2p3_d = el.t2p3_d
				t2p3_impact = el.t2p3_impact
				t2p3_count_maps = 1
			}

			if (el.t2p4_id && el.t2p4_id === t2p4_idCheck) {
				t2p4_id = el.t2p4_id
				t2p4 = el.t2p4
				t2p4_logo = el.t2p4_logo
				t2p4_k += el.t2p4_k
				t2p4_a += el.t2p4_a
				t2p4_d += el.t2p4_d
				t2p4_impact += el.t2p4_impact
				t2p4_count_maps += 1
			} else {
				t2p4_id = el.t2p4_id
				t2p4 = el.t2p4
				t2p4_logo = el.t2p4_logo
				t2p4_k = el.t2p4_k
				t2p4_a = el.t2p4_a
				t2p4_d = el.t2p4_d
				t2p4_impact = el.t2p4_impact
				t2p4_count_maps = 1
			}
			if (el.t2p5_id && el.t2p5_id === t2p5_idCheck) {
				t2p5_id = el.t2p5_id
				t2p5 = el.t2p5
				t2p5_logo = el.t2p5_logo
				t2p5_k += el.t2p5_k
				t2p5_a += el.t2p5_a
				t2p5_d += el.t2p5_d
				t2p5_impact += el.t2p5_impact
				t2p5_count_maps += 1
			} else {
				t2p5_id = el.t2p5_id
				t2p5 = el.t2p5
				t2p5_logo = el.t2p5_logo
				t2p5_k = el.t2p5_k
				t2p5_a = el.t2p5_a
				t2p5_d = el.t2p5_d
				t2p5_impact = el.t2p5_impact
				t2p5_count_maps = 1
			}
		})

		playersTemp[0] = {
			dateMatch: dateMatch,
			NameTour: NameTour,
			logoTour: logoTour,
			team1_id: team1_id,
			team2_id: team2_id,
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
			t1p1_id: t1p1_id,
			t1p2_id: t1p2_id,
			t1p3_id: t1p3_id,
			t1p4_id: t1p4_id,
			t1p5_id: t1p5_id,
			t2p1_id: t2p1_id,
			t2p2_id: t2p2_id,
			t2p3_id: t2p3_id,
			t2p4_id: t2p4_id,
			t2p5_id: t2p5_id,
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
			t1p1_kd: (Math.round((t1p1_k / t1p1_d) * 100) / 100).toFixed(2),
			t1p2_kd: (Math.round((t1p2_k / t1p2_d) * 100) / 100).toFixed(2),
			t1p3_kd: (Math.round((t1p3_k / t1p3_d) * 100) / 100).toFixed(2),
			t1p4_kd: (Math.round((t1p4_k / t1p4_d) * 100) / 100).toFixed(2),
			t1p5_kd: (Math.round((t1p5_k / t1p5_d) * 100) / 100).toFixed(2),
			t2p1_kd: (Math.round((t2p1_k / t2p1_d) * 100) / 100).toFixed(2),
			t2p2_kd: (Math.round((t2p2_k / t2p2_d) * 100) / 100).toFixed(2),
			t2p3_kd: (Math.round((t2p3_k / t2p3_d) * 100) / 100).toFixed(2),
			t2p4_kd: (Math.round((t2p4_k / t2p4_d) * 100) / 100).toFixed(2),
			t2p5_kd: (Math.round((t2p5_k / t2p5_d) * 100) / 100).toFixed(2),
			t1p1_kpr: (Math.round(Kpr(t1p1_k, allRounds) * 100) / 100).toFixed(2),
			t1p2_kpr: (Math.round(Kpr(t1p2_k, allRounds) * 100) / 100).toFixed(2),
			t1p3_kpr: (Math.round(Kpr(t1p3_k, allRounds) * 100) / 100).toFixed(2),
			t1p4_kpr: (Math.round(Kpr(t1p4_k, allRounds) * 100) / 100).toFixed(2),
			t1p5_kpr: (Math.round(Kpr(t1p5_k, allRounds) * 100) / 100).toFixed(2),
			t2p1_kpr: (Math.round(Kpr(t2p1_k, allRounds) * 100) / 100).toFixed(2),
			t2p2_kpr: (Math.round(Kpr(t2p2_k, allRounds) * 100) / 100).toFixed(2),
			t2p3_kpr: (Math.round(Kpr(t2p3_k, allRounds) * 100) / 100).toFixed(2),
			t2p4_kpr: (Math.round(Kpr(t2p4_k, allRounds) * 100) / 100).toFixed(2),
			t2p5_kpr: (Math.round(Kpr(t2p5_k, allRounds) * 100) / 100).toFixed(2),
			t1p1_dpr: (Math.round(Dpr(t1p1_d, allRounds) * 100) / 100).toFixed(2),
			t1p2_dpr: (Math.round(Dpr(t1p2_d, allRounds) * 100) / 100).toFixed(2),
			t1p3_dpr: (Math.round(Dpr(t1p3_d, allRounds) * 100) / 100).toFixed(2),
			t1p4_dpr: (Math.round(Dpr(t1p4_d, allRounds) * 100) / 100).toFixed(2),
			t1p5_dpr: (Math.round(Dpr(t1p5_d, allRounds) * 100) / 100).toFixed(2),
			t2p1_dpr: (Math.round(Dpr(t2p1_d, allRounds) * 100) / 100).toFixed(2),
			t2p2_dpr: (Math.round(Dpr(t2p2_d, allRounds) * 100) / 100).toFixed(2),
			t2p3_dpr: (Math.round(Dpr(t2p3_d, allRounds) * 100) / 100).toFixed(2),
			t2p4_dpr: (Math.round(Dpr(t2p4_d, allRounds) * 100) / 100).toFixed(2),
			t2p5_dpr: (Math.round(Dpr(t2p5_d, allRounds) * 100) / 100).toFixed(2),
			t1p1_impact: (Math.round((t1p1_impact / t1p1_count_maps) * 100) / 100).toFixed(2),
			t1p2_impact: (Math.round((t1p2_impact / t1p2_count_maps) * 100) / 100).toFixed(2),
			t1p3_impact: (Math.round((t1p3_impact / t1p3_count_maps) * 100) / 100).toFixed(2),
			t1p4_impact: (Math.round((t1p4_impact / t1p4_count_maps) * 100) / 100).toFixed(2),
			t1p5_impact: (Math.round((t1p5_impact / t1p5_count_maps) * 100) / 100).toFixed(2),
			t2p1_impact: (Math.round((t2p1_impact / t2p1_count_maps) * 100) / 100).toFixed(2),
			t2p2_impact: (Math.round((t2p2_impact / t2p2_count_maps) * 100) / 100).toFixed(2),
			t2p3_impact: (Math.round((t2p3_impact / t2p3_count_maps) * 100) / 100).toFixed(2),
			t2p4_impact: (Math.round((t2p4_impact / t2p4_count_maps) * 100) / 100).toFixed(2),
			t2p5_impact: (Math.round((t2p5_impact / t2p5_count_maps) * 100) / 100).toFixed(2),
			t1p1_rating: Rating(t1p1_k / t1p1_d, t1p1_k / allRounds, t1p1_d / allRounds, t1p1_impact / t1p1_count_maps).toFixed(2),
			t1p2_rating: Rating(t1p2_k / t1p2_d, t1p2_k / allRounds, t1p2_d / allRounds, t1p2_impact / t1p2_count_maps).toFixed(2),
			t1p3_rating: Rating(t1p3_k / t1p3_d, t1p3_k / allRounds, t1p3_d / allRounds, t1p3_impact / t1p3_count_maps).toFixed(2),
			t1p4_rating: Rating(t1p4_k / t1p4_d, t1p4_k / allRounds, t1p4_d / allRounds, t1p4_impact / t1p4_count_maps).toFixed(2),
			t1p5_rating: Rating(t1p5_k / t1p5_d, t1p5_k / allRounds, t1p5_d / allRounds, t1p5_impact / t1p5_count_maps).toFixed(2),
			t2p1_rating: Rating(t2p1_k / t2p1_d, t2p1_k / allRounds, t2p1_d / allRounds, t2p1_impact / t2p1_count_maps).toFixed(2),
			t2p2_rating: Rating(t2p2_k / t2p2_d, t2p2_k / allRounds, t2p2_d / allRounds, t2p2_impact / t2p2_count_maps).toFixed(2),
			t2p3_rating: Rating(t2p3_k / t2p3_d, t2p3_k / allRounds, t2p3_d / allRounds, t2p3_impact / t2p3_count_maps).toFixed(2),
			t2p4_rating: Rating(t2p4_k / t2p4_d, t2p4_k / allRounds, t2p4_d / allRounds, t2p4_impact / t2p4_count_maps).toFixed(2),
			t2p5_rating: Rating(t2p5_k / t2p5_d, t2p5_k / allRounds, t2p5_d / allRounds, t2p5_impact / t2p5_count_maps).toFixed(2),
		}

		numbersT.forEach((team) => {
			if (team === 1) {
				numbersP.forEach((player) => {
					players.push({
						nickname: playersTemp[0][`t${team}p${player}`],
						player_id: playersTemp[0][`t${team}p${player}_id`],
						logo: playersTemp[0][`t${team}p${player}_logo`],
						k: playersTemp[0][`t${team}p${player}_k`],
						a: playersTemp[0][`t${team}p${player}_a`],
						d: playersTemp[0][`t${team}p${player}_d`],
						kd: playersTemp[0][`t${team}p${player}_kd`],
						kpr: playersTemp[0][`t${team}p${player}_kpr`],
						dpr: playersTemp[0][`t${team}p${player}_dpr`],
						impact: playersTemp[0][`t${team}p${player}_impact`],
						rating: playersTemp[0][`t${team}p${player}_rating`],
					})
				})
			}

			if (team === 2) {
				numbersP.forEach((player) => {
					players2.push({
						nickname: playersTemp[0][`t${team}p${player}`],
						player_id: playersTemp[0][`t${team}p${player}_id`],
						logo: playersTemp[0][`t${team}p${player}_logo`],
						k: playersTemp[0][`t${team}p${player}_k`],
						a: playersTemp[0][`t${team}p${player}_a`],
						d: playersTemp[0][`t${team}p${player}_d`],
						kd: playersTemp[0][`t${team}p${player}_kd`],
						kpr: playersTemp[0][`t${team}p${player}_kpr`],
						dpr: playersTemp[0][`t${team}p${player}_dpr`],
						impact: playersTemp[0][`t${team}p${player}_impact`],
						rating: playersTemp[0][`t${team}p${player}_rating`],
					})
				})
			}
		})

		players = players.sort((a, b) => b.rating - a.rating)
		players2 = players2.sort((a, b) => b.rating - a.rating)

		let mvp = [...players, ...players2].sort((a, b) => b.rating - a.rating)

		return (
			<div className={classes.wrapperMatchResult}>
				<div className={classes.wrapperTitleBanner}>
					<div className={classes.logoAndTitleBanner}>
						<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/RANKOFF_LOGO.svg`} alt="/" />
						<div className={classes.titleBanner}>RANKOFF STATISTICS</div>
					</div>
					<div className={classes.themeBanner}>MATCH RESULT</div>
				</div>

				<div className={classes.wrapperInfoMatch}>
					<div className={classes.infoMatch}>
						<div className={classes.wrapperTeamScore}>
							<div className={classes.teamLogo}>
								<img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/" />
							</div>
							<div className={classes.teamScore}>{choiceMap.length > 0 && choiceMap !== 'AllMaps' ? matchMaps.filter((e) => e.name === choiceMap)[0].scoreT1 : playersTemp[0].scoreT1}</div>
						</div>
						<span>:</span>
						<div className={classes.wrapperTeamScore}>
							<div className={classes.teamScore}>{choiceMap.length > 0 && choiceMap !== 'AllMaps' ? matchMaps.filter((e) => e.name === choiceMap)[0].scoreT2 : playersTemp[0].scoreT2}</div>
							<div className={classes.teamLogo}>
								<img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/" />
							</div>
						</div>
					</div>
					<div className={classes.wrapperInfoTour}>
						<div className={classes.wrapperNameAndLogoTour}>
							<div className={classes.tourLogo}>
								<img src={`/images/LogoAndBannerTour/${playersTemp[0].logoTour}`} alt="/" />
							</div>
							<div className={classes.tourName}>{playersTemp[0].NameTour.toUpperCase()}</div>
						</div>
						<div className={classes.tourDate}>{playersTemp[0].dateMatch}</div>
					</div>
				</div>

				<div className={classes.wrapperMapsMatch}>
					{matchMaps.map((e, index) => {
						return (
							<div key={index} className={matchMaps?.length > 2 ? classes.wrapperMapMore : classes.wrapperMap}>
								<div className={matchMaps?.length > 2 ? classes.infoMapMore : classes.infoMap}>
									<div className={classes.nameMap}>
										<div className={classes.pickMapTitle}>MAP:</div>
										{e.name.toUpperCase()}
									</div>
									<div className={classes.pickMap}>
										<div className={classes.pickMapTitle}>PICK:</div>
										<div className={classes.pickMapTeam}>{e.mapPick === 'Decider' ? 'Decider' : e.mapPickTeam.toUpperCase()}</div>
									</div>
									<div className={classes.scoreT1}>
										<div className={classes.scoreTLogo}>
											<img src={`/images/LogoTeams/${e.team1Logo}`} alt="/" />
										</div>
										<div className={classes.score}>{e.scoreT1}</div>
									</div>
									<div className={classes.scoreT2}>
										<div className={classes.scoreTLogo}>
											<img src={`/images/LogoTeams/${e.team2Logo}`} alt="/" />
										</div>
										<div className={classes.score}>{e.scoreT2}</div>
									</div>
								</div>
								<div className={classes.logoMap}>
									<img src={`/images/LogoMaps/${e.map}`} alt="" />
								</div>
							</div>
						)
					})}
				</div>

				<div className={classes.wrapperStatsT1}>
					<div className={classes.wrapperTable}>
						<div className={classes.tableRowTitle}>
							<div className={classes.cell}>PLAYER</div>
							<div className={classes.cell}>K</div>
							<div className={classes.cell}>A</div>
							<div className={classes.cell}>D</div>
							<div className={classes.cell}>+/-</div>
							<div className={classes.cell}>KD</div>
							<div className={classes.cell}>KPR</div>
							<div className={classes.cell}>DPR</div>
							<div className={classes.cell}>IMPACT</div>
							<div className={classes.cell}>RATING</div>
						</div>
						{players.map((e, index) => {
							return (
								<div className={classes.tableRow}>
									<div
										className={classes.cellPlayer}
										style={{
											background: e.nickname === mvp[0].nickname ? 'var(--gold)' : '',
										}}>
										<div className={classes.dataFlagPlayer}>
											<CountryFlagPlayer player_id={e.player_id} />
										</div>
										<div className={classes.photoPlayer}>
											<img src={`/images/LogoPlayers/${e.logo}`} className={classes.player1} alt="/" />
										</div>
										<div className={classes.nickname}>{e.nickname}</div>
									</div>

									<div className={classes.cell}>{e.k}</div>
									<div className={classes.cell}>{e.a}</div>
									<div className={classes.cell}>{e.d}</div>
									<div
										className={classes.cell}
										style={{
											background: e.k - e.d < 0 ? 'var(--red)' : 'var(--green)',
										}}>
										{e.k - e.d}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.kd < 0.9 ? 'var(--red)' : e.kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
										}}>
										{e.kd}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.kpr < 0.6 ? 'var(--red)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
										}}>
										{e.kpr}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.dpr < 0.68 ? 'var(--green)' : e.dpr > 0.7 ? (e.dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
										}}>
										{e.dpr}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.impact < 1 ? 'var(--red)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
										}}>
										{e.impact}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.rating < 1 ? 'var(--red)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
										}}>
										{e.rating}
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<div className={classes.wrapperStatsT2}>
					<div className={classes.wrapperTable}>
						<div className={classes.tableRowTitle}>
							<div className={classes.cell}>PLAYER</div>
							<div className={classes.cell}>K</div>
							<div className={classes.cell}>A</div>
							<div className={classes.cell}>D</div>
							<div className={classes.cell}>+/-</div>
							<div className={classes.cell}>KD</div>
							<div className={classes.cell}>KPR</div>
							<div className={classes.cell}>DPR</div>
							<div className={classes.cell}>IMPACT</div>
							<div className={classes.cell}>RATING</div>
						</div>
						{players2.map((e, index) => {
							return (
								<div className={classes.tableRow}>
									<div
										className={classes.cellPlayer}
										style={{
											background: e.nickname === mvp[0].nickname ? 'var(--gold)' : '',
										}}>
										<div className={classes.dataFlagPlayer}>
											<CountryFlagPlayer player_id={e.player_id} />
										</div>
										<div className={classes.photoPlayer}>
											<img src={`/images/LogoPlayers/${e.logo}`} className={classes.player1} alt="/" />
										</div>
										<div className={classes.nickname}>{e.nickname}</div>
									</div>

									<div className={classes.cell}>{e.k}</div>
									<div className={classes.cell}>{e.a}</div>
									<div className={classes.cell}>{e.d}</div>
									<div
										className={classes.cell}
										style={{
											background: e.k - e.d < 0 ? 'var(--red)' : 'var(--green)',
										}}>
										{e.k - e.d}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.kd < 0.9 ? 'var(--red)' : e.kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
										}}>
										{e.kd}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.kpr < 0.6 ? 'var(--red)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
										}}>
										{e.kpr}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.dpr < 0.68 ? 'var(--green)' : e.dpr > 0.7 ? (e.dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
										}}>
										{e.dpr}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.impact < 1 ? 'var(--red)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
										}}>
										{e.impact}
									</div>
									<div
										className={classes.cell}
										style={{
											background: e.rating < 1 ? 'var(--red)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
										}}>
										{e.rating}
									</div>
								</div>
							)
						})}
					</div>
				</div>
				<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/TOP_PLAYERS_BANNER.png`} className={classes.bgImg} alt="/" />
			</div>
		)
	}
}

export default PictureResult2
