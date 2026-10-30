import React, { createRef, useCallback, useState } from 'react'
import {
	useGetAwardsPlayersByNickQuery,
	useGetAwardsQuery,
	useGetMatchesByNameQuery,
	useGetMatchesQuery,
	useGetPlayerByNickQuery,
	useGetPlayersQuery,
	useGetPlayersTournamentsByNickQuery,
	useGetShortMatchQuery,
} from '../../../store/api/apiSlice'
import { toPng } from 'html-to-image'
import classes from '../../MatchPicture2/matchPicture2.module.css'
import PictureResult2 from '../../MatchPicture2/PictureResult/pictureResult2'
import ResultBanner from './resultBanner/resultBanner'
import Kpr from '../../Formulas/kpr'
import Dpr from '../../Formulas/dpr'
import Rating from '../../Formulas/rating'
import ResultBannerEN from './resultBanner/resultBannerEN'

const TopPlayersBanner = () => {
	let [choicePlayer, setChoicePlayer] = useState([])
	let [enterPosition, setEnterPosition] = useState('')

	let id = choicePlayer.id
	let nickname = choicePlayer.nickname

	const allPlayers = useGetPlayersQuery()
	const allMatches = useGetMatchesQuery()
	const allShortMatches = useGetShortMatchQuery()
	const allAwards = useGetAwardsPlayersByNickQuery({ id, nickname })
	const allEvents = useGetPlayersTournamentsByNickQuery({ id, nickname })

	let MVPAwards = []
	let EVPAwards = []
	let positionsTeamPlayer = []
	let allAwardsPlayer = []
	let allEventsPlayer = []

	if (allAwards.data && allAwards.data.length >= 0 && allEvents.data && allEvents.data.length > 0) {
		allAwardsPlayer = allAwards.data.filter(
			(e) =>
				// e.name_tour_sort === 'WinlineEPICStandoff2CosmoEarth_09_01_25' ||
				// e.name_tour_sort === 'RushVTBCUPPro_13_02_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2CosmoCancriE_09_04_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2CosmoSaffar_04_03_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2CosmoMajor_04_06_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp1_24_06_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp2_29_07_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp4_09_09_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp6_14_10_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawMajor_19_11_25' ||
				// e.name_tour_sort === 'WINLINEEPICStandoff2NewYearBounty_08_12_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SummerWeek3_11_08_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SummerWeek2_21_07_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SummerWeek1_30_06_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SummerFinals_27_08_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025Week1_17_03_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025Week2_31_03_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025Week3_28_04_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SpringFinals_28_05_25'
				e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp3_18_08_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp5_29_09_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2CosmoBrasilCrux_31_02_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2CosmoBrasilOctans_03_02_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2PawPawMajor_19_11_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2CosmoMajor_04_06_25',
			// e.name_tour_sort === 'UnitedNorthTournament_12_01_25' ||
			// e.name_tour_sort === 'ProMastersSeriesAsiaSeason1_16_08_25' ||
			// e.name_tour_sort === 'CONDRLeagueSeason1_30_09_25' ||
			// e.name_tour_sort === 'CONDRWINTERCUP_15_12_25' ||
			// e.name_tour_sort === 'NorthAmericanProLeague_17_06_25'
		)
		allEventsPlayer = allEvents.data.filter(
			(e) =>
				// e.name_tour_sort === 'WinlineEPICStandoff2CosmoEarth_09_01_25' ||
				// e.name_tour_sort === 'RushVTBCUPPro_13_02_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2CosmoCancriE_09_04_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2CosmoSaffar_04_03_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2CosmoMajor_04_06_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp1_24_06_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp2_29_07_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp4_09_09_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp6_14_10_25' ||
				// e.name_tour_sort === 'WinlineEPICStandoff2PawPawMajor_19_11_25' ||
				// e.name_tour_sort === 'WINLINEEPICStandoff2NewYearBounty_08_12_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SummerWeek3_11_08_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SummerWeek2_21_07_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SummerWeek1_30_06_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SummerFinals_27_08_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025Week1_17_03_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025Week2_31_03_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025Week3_28_04_25' ||
				// e.name_tour_sort === 'Standoff2EPICAcademy2025SpringFinals_28_05_25'
				e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp3_18_08_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2PawPawEp5_29_09_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2CosmoBrasilCrux_31_02_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2CosmoBrasilOctans_03_02_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2PawPawMajor_19_11_25' ||
				e.name_tour_sort === 'WinlineEPICStandoff2CosmoMajor_04_06_25',
			// e.name_tour_sort === 'UnitedNorthTournament_12_01_25' ||
			// e.name_tour_sort === 'ProMastersSeriesAsiaSeason1_16_08_25' ||
			// e.name_tour_sort === 'CONDRLeagueSeason1_30_09_25' ||
			// e.name_tour_sort === 'CONDRWINTERCUP_15_12_25' ||
			// e.name_tour_sort === 'NorthAmericanProLeague_17_06_25'
		)

		let one = 0
		let two = 0
		let three = 0
		positionsTeamPlayer = []

		allEventsPlayer.forEach((e) => {
			if (e.position_team === 1) {
				one++
			} else if (e.position_team === 2) {
				two++
			} else if (e.position_team === 3) {
				three++
			}

			positionsTeamPlayer = [one, two, three]
		})

		MVPAwards = allAwardsPlayer.filter((e) => e.logo_award.slice(0, 3).toLowerCase() === 'mvp')
		EVPAwards = allAwardsPlayer.filter((e) => e.logo_award.slice(0, 3).toLowerCase() === 'evp')
	}

	const calculatePersonalStatsForYear = (allPlayers, allMatches, allShortMatches) => {
		let allMatchesForPeriod
		let necessaryPlayers = []
		let resultStatsPlayers = []

		let player_id
		let name
		let nickname
		let surname
		let team
		let logo_player
		let date_birth
		let back_logo_team
		let country_flag
		let rating = 0
		let impact = 0
		let k = 0
		let a = 0
		let d = 0
		let maps = 0
		let rounds = 0
		let matches = 0
		let w_maps = 0
		let l_maps = 0
		let w_rounds = 0
		let l_rounds = 0
		let w_match = 0
		let l_match = 0
		let w_group = 0
		let w_playoff = 0
		let w_final = 0
		let l_group = 0
		let l_playoff = 0
		let l_final = 0

		if (allMatches.data && allMatches.data.length > 0 && allPlayers.data && allPlayers.data.length > 0 && allShortMatches.data && allShortMatches.data.length > 0) {
			allMatchesForPeriod = allMatches.data.filter(
				(e) =>
					// e.name_tour_for_sort === 'WinlineEPICStandoff2CosmoEarth_09_01_25' ||
					// e.name_tour_for_sort === 'RushVTBCUPPro_13_02_25' ||
					// e.name_tour_for_sort === 'WinlineEPICStandoff2CosmoCancriE_09_04_25' ||
					// e.name_tour_for_sort === 'WinlineEPICStandoff2CosmoSaffar_04_03_25' ||
					// e.name_tour_for_sort === 'WinlineEPICStandoff2CosmoMajor_04_06_25' ||
					// e.name_tour_for_sort === 'WinlineEPICStandoff2PawPawEp1_24_06_25' ||
					// e.name_tour_for_sort === 'WinlineEPICStandoff2PawPawEp2_29_07_25' ||
					// e.name_tour_for_sort === 'WinlineEPICStandoff2PawPawEp4_09_09_25' ||
					// e.name_tour_for_sort === 'WinlineEPICStandoff2PawPawEp6_14_10_25' ||
					// e.name_tour_for_sort === 'WinlineEPICStandoff2PawPawMajor_19_11_25' ||
					// e.name_tour_for_sort === 'WINLINEEPICStandoff2NewYearBounty_08_12_25' ||
					// e.name_tour_for_sort === 'Standoff2EPICAcademy2025SummerWeek3_11_08_25' ||
					// e.name_tour_for_sort === 'Standoff2EPICAcademy2025SummerWeek2_21_07_25' ||
					// e.name_tour_for_sort === 'Standoff2EPICAcademy2025SummerWeek1_30_06_25' ||
					// e.name_tour_for_sort === 'Standoff2EPICAcademy2025SummerFinals_27_08_25' ||
					// e.name_tour_for_sort === 'Standoff2EPICAcademy2025Week1_17_03_25' ||
					// e.name_tour_for_sort === 'Standoff2EPICAcademy2025Week2_31_03_25' ||
					// e.name_tour_for_sort === 'Standoff2EPICAcademy2025Week3_28_04_25' ||
					// e.name_tour_for_sort === 'Standoff2EPICAcademy2025SpringFinals_28_05_25'
					e.name_tour_for_sort === 'WinlineEPICStandoff2PawPawEp3_18_08_25' ||
					e.name_tour_for_sort === 'WinlineEPICStandoff2PawPawEp5_29_09_25' ||
					e.name_tour_for_sort === 'WinlineEPICStandoff2CosmoBrasilCrux_31_02_25' ||
					e.name_tour_for_sort === 'WinlineEPICStandoff2CosmoBrasilOctans_03_02_25' ||
					e.name_tour_for_sort === 'WinlineEPICStandoff2PawPawMajor_19_11_25' ||
					e.name_tour_for_sort === 'WinlineEPICStandoff2CosmoMajor_04_06_25',
				// e.name_tour_for_sort === 'UnitedNorthTournament_12_01_25' ||
				// e.name_tour_for_sort === 'ProMastersSeriesAsiaSeason1_16_08_25' ||
				// e.name_tour_for_sort === 'CONDRLeagueSeason1_30_09_25' ||
				// e.name_tour_for_sort === 'CONDRWINTERCUP_15_12_25' ||
				// e.name_tour_for_sort === 'NorthAmericanProLeague_17_06_25'
			)

			allMatchesForPeriod.map((e) => {
				for (let i = 1; i < 3; i++) {
					for (let j = 1; j < 6; j++) {
						let nicknameKey = `t${i}p${j}`
						let playerIdKey = `t${i}p${j}_id`

						let nickname = e[nicknameKey]
						let player_id = e[playerIdKey]

						// Проверка на наличие игрока с таким же ником
						let alreadyExists = necessaryPlayers.some((player) => player.player_id === player_id)

						if (!alreadyExists) {
							necessaryPlayers.push({
								nickname: nickname,
								player_id: player_id,
							})
						}
					}
				}
			})

			if (allPlayers.data.length === 1) {
				necessaryPlayers = [{ player_id: allPlayers.data[0].player_id }]
			}

			necessaryPlayers.map((e1) => {
				let tempDataPlayer = allPlayers.data.filter((player) => player.player_id === e1.player_id)

				player_id = tempDataPlayer[0]?.player_id
				date_birth = tempDataPlayer[0]?.date_birth
				name = tempDataPlayer[0]?.name
				nickname = tempDataPlayer[0]?.nickname
				surname = tempDataPlayer[0]?.surname
				team = tempDataPlayer[0]?.team
				logo_player = tempDataPlayer[0]?.logo_player
				back_logo_team = tempDataPlayer[0]?.back_logo_team
				country_flag = tempDataPlayer[0]?.country_flag

				let tempMatchId = ''

				allMatchesForPeriod.map((e2) => {
					if (e2.t1p1_id === e1.player_id || e2.t1p2_id === e1.player_id || e2.t1p3_id === e1.player_id || e2.t1p4_id === e1.player_id || e2.t1p5_id === e1.player_id) {
						//подсчет выигранных и проигранных матчей

						let temp = allShortMatches.data.find((e) => e.name_match_for_sort === e2.name_match_for_sort)

						if (temp?.total_score_match_t1 >= temp?.total_score_match_t2 && tempMatchId !== e2.name_match_for_sort) {
							matches++
							w_match++
						}

						if (temp?.total_score_match_t1 < temp?.total_score_match_t2 && tempMatchId !== e2.name_match_for_sort) {
							matches++
							l_match++
						}

						//подсчет процента выигранных матчей на разных стадиях

						if (temp?.total_score_match_t1 >= temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes('group') && tempMatchId !== e2.name_match_for_sort) {
							w_group++
						}

						if (temp?.total_score_match_t1 > temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes('playoff') && tempMatchId !== e2.name_match_for_sort) {
							w_playoff++
						}

						if (temp?.total_score_match_t1 > temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes('final') && tempMatchId !== e2.name_match_for_sort) {
							w_final++
						}

						if (temp?.total_score_match_t1 < temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes('group') && tempMatchId !== e2.name_match_for_sort) {
							l_group++
						}

						if (temp?.total_score_match_t1 < temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes('playoff') && tempMatchId !== e2.name_match_for_sort) {
							l_playoff++
						}

						if (temp?.total_score_match_t1 < temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes('final') && tempMatchId !== e2.name_match_for_sort) {
							l_final++
						}

						tempMatchId = e2.name_match_for_sort

						//подсчет поражений и побед игрока

						if (e2.total_r_team1 > e2.total_r_team2) {
							w_maps++
						}
						if (e2.total_r_team1 < e2.total_r_team2) {
							l_maps++
						}

						//подсчет победных и проигранных раундов игрока

						w_rounds += e2.total_r_team1
						l_rounds += e2.total_r_team2
					}

					if (e2.t2p1_id === e1.player_id || e2.t2p2_id === e1.player_id || e2.t2p3_id === e1.player_id || e2.t2p4_id === e1.player_id || e2.t2p5_id === e1.player_id) {
						let temp = allShortMatches.data.find((e) => e.name_match_for_sort === e2.name_match_for_sort)

						if (temp?.total_score_match_t2 >= temp?.total_score_match_t1 && tempMatchId !== e2.name_match_for_sort) {
							matches++
							w_match++
						}

						if (temp?.total_score_match_t2 < temp?.total_score_match_t1 && tempMatchId !== e2.name_match_for_sort) {
							matches++
							l_match++
						}

						//подсчет процента выигранных матчей на разных стадиях

						if (temp?.total_score_match_t2 >= temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes('group') && tempMatchId !== e2.name_match_for_sort) {
							w_group++
						}

						if (temp?.total_score_match_t2 > temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes('playoff') && tempMatchId !== e2.name_match_for_sort) {
							w_playoff++
						}

						if (temp?.total_score_match_t2 > temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes('final') && tempMatchId !== e2.name_match_for_sort) {
							w_final++
						}

						if (temp?.total_score_match_t2 < temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes('group') && tempMatchId !== e2.name_match_for_sort) {
							l_group++
						}

						if (temp?.total_score_match_t2 < temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes('playoff') && tempMatchId !== e2.name_match_for_sort) {
							l_playoff++
						}

						if (temp?.total_score_match_t2 < temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes('final') && tempMatchId !== e2.name_match_for_sort) {
							l_final++
						}

						tempMatchId = e2.name_match_for_sort

						//подсчет поражений и побед игрока

						if (e2.total_r_team1 < e2.total_r_team2) {
							w_maps++
						}
						if (e2.total_r_team1 > e2.total_r_team2) {
							l_maps++
						}

						//подсчет победных и проигранных раундов игрока

						w_rounds += e2.total_r_team2
						l_rounds += e2.total_r_team1
					}

					if (e2.t1p1_id === e1.player_id) {
						impact += e2.t1p1_impact
						k += e2.t1p1_k
						a += e2.t1p1_a
						d += e2.t1p1_d
					}

					if (e2.t1p2_id === e1.player_id) {
						impact += e2.t1p2_impact
						k += e2.t1p2_k
						a += e2.t1p2_a
						d += e2.t1p2_d
					}

					if (e2.t1p3_id === e1.player_id) {
						impact += e2.t1p3_impact
						k += e2.t1p3_k
						a += e2.t1p3_a
						d += e2.t1p3_d
					}

					if (e2.t1p4_id === e1.player_id) {
						impact += e2.t1p4_impact
						k += e2.t1p4_k
						a += e2.t1p4_a
						d += e2.t1p4_d
					}

					if (e2.t1p5_id === e1.player_id) {
						impact += e2.t1p5_impact
						k += e2.t1p5_k
						a += e2.t1p5_a
						d += e2.t1p5_d
					}

					if (e2.t2p1_id === e1.player_id) {
						impact += e2.t2p1_impact
						k += e2.t2p1_k
						a += e2.t2p1_a
						d += e2.t2p1_d
					}

					if (e2.t2p2_id === e1.player_id) {
						impact += e2.t2p2_impact
						k += e2.t2p2_k
						a += e2.t2p2_a
						d += e2.t2p2_d
					}

					if (e2.t2p3_id === e1.player_id) {
						impact += e2.t2p3_impact
						k += e2.t2p3_k
						a += e2.t2p3_a
						d += e2.t2p3_d
					}

					if (e2.t2p4_id === e1.player_id) {
						impact += e2.t2p4_impact
						k += e2.t2p4_k
						a += e2.t2p4_a
						d += e2.t2p4_d
					}

					if (e2.t2p5_id === e1.player_id) {
						impact += e2.t2p5_impact
						k += e2.t2p5_k
						a += e2.t2p5_a
						d += e2.t2p5_d
					}

					maps = w_maps + l_maps
					rounds = w_rounds + l_rounds
				})

				if (d) {
					let kd = k / d
					let kpr = Kpr(k, rounds)
					let dpr = Dpr(d, rounds)
					impact = impact / maps
					rating = Rating(kd, kpr, dpr, impact)

					resultStatsPlayers.push({
						player_id: player_id,
						name: name,
						nickname: nickname,
						surname: surname,
						team: team,
						date_birth: date_birth,
						logo_player: logo_player,
						back_logo_team: back_logo_team,
						country_flag: country_flag,
						kd: Math.round(kd * 100) / 100,
						kpr: Math.round(kpr * 100) / 100,
						dpr: Math.round(dpr * 100) / 100,
						impact: Math.round(impact * 100) / 100,
						rating: rating,
						k: k,
						a: a,
						d: d,
						matches: matches,
						w_match: w_match,
						l_match: l_match,
						maps: maps,
						rounds: rounds,
						w_maps: w_maps,
						l_maps: l_maps,
						w_rounds: w_rounds,
						l_rounds: l_rounds,
						w_group: w_group,
						w_playoff: w_playoff,
						w_final: w_final,
						l_group: l_group,
						l_playoff: l_playoff,
						l_final: l_final,
						wr_group: isNaN(Math.round((w_group / (w_group + l_group)) * 100)) ? 0 : Math.round((w_group / (w_group + l_group)) * 100),
						wr_playoff: isNaN(Math.round((w_playoff / (w_playoff + l_playoff)) * 100)) ? 0 : Math.round((w_playoff / (w_playoff + l_playoff)) * 100),
						wr_final: isNaN(Math.round((w_final / (w_final + l_final)) * 100)) ? 0 : Math.round((w_final / (w_final + l_final)) * 100),
					})

					rating = 0
					impact = 0
					k = 0
					a = 0
					d = 0
					maps = 0
					rounds = 0
					w_maps = 0
					l_maps = 0
					w_rounds = 0
					l_rounds = 0
					matches = 0
					w_match = 0
					l_match = 0
					w_group = 0
					w_playoff = 0
					w_final = 0
					l_group = 0
					l_playoff = 0
					l_final = 0
				}
			})
		}

		if (resultStatsPlayers && resultStatsPlayers.length > 0) {
			return resultStatsPlayers
		}
	}

	let necessaryPlayers = calculatePersonalStatsForYear(allPlayers, allMatches, allShortMatches)
	let necessaryPlayer = necessaryPlayers?.filter((e) => e.player_id === choicePlayer.id)
	// console.log(necessaryPlayer[0]?.w_final, necessaryPlayer[0]?.l_final, necessaryPlayer[0]?.wr_final)
	// console.log(positionsTeamPlayer)
	let listPlayers = []

	if (necessaryPlayers && necessaryPlayers.length > 0) {
		necessaryPlayers.map((e) => {
			listPlayers.push({
				id: e.player_id,
				nickname: e.nickname,
			})
		})
	}

	const handleEnterPosition = (event) => {
		const value = event.target.value

		if (value.length > 3) {
			setEnterPosition(event.target.value.slice(0, 3))
		} else {
			setEnterPosition(event.target.value)
		}
	}

	//--------------------------------HTML to IMG def-------------------------------------------------

	const ref = createRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toPng(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${nickname}.png`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [ref])

	return (
		<>
			<div className={classes.wrapperMenu}>
				<div className={classes.menu}>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Позиция в топе:</div>
						<input type="number" className={classes.inputPosition} autoComplete="off" value={enterPosition} onChange={handleEnterPosition} />
					</div>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Выбор игрока:</div>
						<div className={classes.listMatches}>
							{listPlayers.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoicePlayer(e)
										}}>
										{e.nickname}
									</div>
								)
							})}
						</div>
					</div>
					<div className={classes.btnSaveAsImage} onClick={onButtonClick}>
						Скачать
					</div>
				</div>
			</div>
			<div ref={ref}>{necessaryPlayer?.length > 0 ? <ResultBannerEN player={necessaryPlayer} position={enterPosition} MVP={MVPAwards} EVP={EVPAwards} countFirstPlaces={positionsTeamPlayer} allEvents={allEventsPlayer} /> : ''}</div>
		</>
	)
}

export default TopPlayersBanner
