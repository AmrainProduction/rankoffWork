import React, { useEffect } from 'react'
import classes from '../playersTourMVP.module.css'
import {
	useGetMatchesByNameTourQuery,
	useGetMatchesNecessaryPlayerQuery,
	useGetMatchesQuery,
	useGetPlayerByNickQuery,
	useGetPlayersQuery,
	useGetTeamsTournamentsByNameQuery,
	useGetTournamentByNameQuery,
} from '../../../../store/api/apiSlice'
import CountryFlagPlayer from '../../../../Function/countryFlagPlayer'
import normalizeImpact from '../../../Functions/AllFunctions/normalizeImpact'
import Kpr from '../../../Formulas/kpr'
import Dpr from '../../../Formulas/dpr'
import Rating from '../../../Formulas/rating'
import Loader from '../../../UI/Loader/loader'
import WhatBirthday from '../../../../Function/whatBirthday'

const PlayerMVPResult = (props) => {
	const choiceStage = props.stage
	const name = props.player.nickname
	const nickname = props.player.nickname
	const id = props.player.player_id
	const tour = props.name

	const matchesPlayer = useGetMatchesNecessaryPlayerQuery({ name })
	const playerInfo = useGetPlayerByNickQuery({ id, nickname })

	const isLoading = playerInfo.isLoading || matchesPlayer.isLoading

	if (isLoading) {
		return <Loader />
	}

	let matchesID = []
	let statsMvpPlayer = []
	let totalStatsPlayer = []

	let name_tour
	let date_match
	let logolayer
	let player_id
	let date_birth
	let name_tour_sort
	let nameP
	let surname
	let country_flag
	let kd = 0
	let kpr = 0
	let dpr = 0
	let impact = 0
	let rating = 0
	let k = 0
	let a = 0
	let d = 0
	let rm
	let team
	let logo_team
	let team_opponent
	let logo_team_opponent

	let count_1_win = 0
	let count_1_lose = 0
	let count_2_win = 0
	let count_2_lose = 0
	let rounds_win = 0
	let rounds_lose = 0
	let rounds = 0
	let maps_all = 0
	let maps_win = 0
	let maps_lose = 0

	let count = 0
	let personal_kd = 0
	let personal_kpr = 0
	let personal_dpr = 0
	let personal_impact = 0
	let personal_rating = 0
	let personal_k = 0
	let personal_a = 0
	let personal_d = 0
	let personal_all_r = 0
	let personal_all_maps = 0

	playerInfo?.data?.map((e) => {
		player_id = e.player_id
		nameP = e.name
		surname = e.surname
		country_flag = e.country_flag
		date_birth = e.date_birth
	})

	matchesPlayer?.data?.map((e) => {
		if (e.name_tour_for_sort === tour) {
			matchesID.push(e.name_match_for_sort)
		}
	})

	matchesID = matchesID.filter((item, pos) => {
		return matchesID.indexOf(item) === pos
	})

	matchesID.map((e2, index) => {
		matchesPlayer?.data?.map((match) => {
			if (match.name_match_for_sort === e2) {
				date_match = match.db_date_match
				name_tour = match.name_tour
				name_tour_sort = match.name_tour_for_sort

				if (match.t1p1 === nickname || match.t1p2 === nickname || match.t1p3 === nickname || match.t1p4 === nickname || match.t1p5 === nickname) {
					team = match.team1
					logo_team = match.team1_logo

					team_opponent = match.team2
					logo_team_opponent = match.team2_logo

					//подсчет поражений и побед игрока

					if (match.total_r_team1 > match.total_r_team2) {
						count_1_win++
					}
					if (match.total_r_team1 < match.total_r_team2) {
						count_1_lose++
					}

					//подсчет победных и проигранных раундов игрока

					rounds += match.total_r_team1 + match.total_r_team2
					rounds_win += match.total_r_team1
					rounds_lose += match.total_r_team2
				}

				if (match.t1p1 === nickname) {
					logolayer = match.t1p1_logo
					impact += match.t1p1_impact
					k += match.t1p1_k
					a += match.t1p1_a
					d += match.t1p1_d
					count++
				}

				if (match.t1p2 === nickname) {
					logolayer = match.t1p2_logo
					impact += match.t1p2_impact
					k += match.t1p2_k
					a += match.t1p2_a
					d += match.t1p2_d
					count++
				}

				if (match.t1p3 === nickname) {
					logolayer = match.t1p3_logo
					impact += match.t1p3_impact
					k += match.t1p3_k
					a += match.t1p3_a
					d += match.t1p3_d
					count++
				}

				if (match.t1p4 === nickname) {
					logolayer = match.t1p4_logo
					impact += match.t1p4_impact
					k += match.t1p4_k
					a += match.t1p4_a
					d += match.t1p4_d
					count++
				}

				if (match.t1p5 === nickname) {
					logolayer = match.t1p5_logo
					impact += match.t1p5_impact
					k += match.t1p5_k
					a += match.t1p5_a
					d += match.t1p5_d
					count++
				}

				//----------сбор статистики игрока из второй команды------------------------------

				if (match.t2p1 === nickname || match.t2p2 === nickname || match.t2p3 === nickname || match.t2p4 === nickname || match.t2p5 === nickname) {
					team = match.team2
					logo_team = match.team2_logo

					team_opponent = match.team1
					logo_team_opponent = match.team1_logo

					//подсчет поражений и побед игрока

					if (match.total_r_team1 < match.total_r_team2) {
						count_2_win++
					}
					if (match.total_r_team1 > match.total_r_team2) {
						count_2_lose++
					}

					//подсчет победных и проигранных раундов игрока

					rounds += match.total_r_team1 + match.total_r_team2
					rounds_win += match.total_r_team2
					rounds_lose += match.total_r_team1
				}

				if (match.t2p1 === nickname) {
					logolayer = match.t2p1_logo
					impact += match.t2p1_impact
					k += match.t2p1_k
					a += match.t2p1_a
					d += match.t2p1_d
					count++
				}

				if (match.t2p2 === nickname) {
					logolayer = match.t2p2_logo
					impact += match.t2p2_impact
					k += match.t2p2_k
					a += match.t2p2_a
					d += match.t2p2_d
					count++
				}

				if (match.t2p3 === nickname) {
					logolayer = match.t2p3_logo
					impact += match.t2p3_impact
					k += match.t2p3_k
					a += match.t2p3_a
					d += match.t2p3_d
					count++
				}

				if (match.t2p4 === nickname) {
					logolayer = match.t2p4_logo
					impact += match.t2p4_impact
					k += match.t2p4_k
					a += match.t2p4_a
					d += match.t2p4_d
					count++
				}

				if (match.t2p5 === nickname) {
					logolayer = match.t2p5_logo
					impact += match.t2p5_impact
					k += match.t2p5_k
					a += match.t2p5_a
					d += match.t2p5_d
					count++
				}

				//----------сбор общей информации о трунире------------------------------

				maps_all = count_1_win + count_2_win + (count_1_lose + count_2_lose)
				maps_win = count_1_win + count_2_win
				maps_lose = count_1_lose + count_2_lose
			}
		})

		//фиксируем статистику игрока

		if (k && d) {
			personal_kd += kd
			personal_kpr += kpr
			personal_dpr += dpr
			personal_impact += impact
			personal_rating += rating
			personal_k += k
			personal_a += a
			personal_d += d
			personal_all_maps += maps_all
			personal_all_r += rounds_win + rounds_lose

			kd = k / d
			kpr = Kpr(k, rounds_win + rounds_lose)
			dpr = Dpr(d, rounds_win + rounds_lose)
			impact = impact / maps_all
			rating = Rating(kd, kpr, dpr, impact)

			statsMvpPlayer[index] = {
				name_tour: name_tour,
				date_match: date_match,
				name_tour_sort: name_tour_sort,
				logolayer: logolayer,
				player_id: player_id,
				name: nameP,
				nickname: nickname,
				surname: surname,
				country_flag: country_flag,
				kd: Math.round(kd * 100) / 100,
				kpr: Math.round(kpr * 100) / 100,
				dpr: Math.round(dpr * 100) / 100,
				impact: Math.round(impact * 100) / 100,
				rating: rating,
				k: k,
				a: a,
				d: d,
				w_rounds: rounds_win,
				l_rounds: rounds_lose,
				maps: maps_all,
				rm: maps_all,
				team: team,
				logo_team: logo_team,
				team_opponent: team_opponent,
				logo_team_opponent: logo_team_opponent,
				scoreWin: count_1_win + count_2_win,
				scoreLose: count_1_lose + count_2_lose,
			}
		}

		kd = 0
		kpr = 0
		dpr = 0
		impact = 0
		rating = 0
		k = 0
		a = 0
		d = 0
		rounds_win = 0
		rounds_lose = 0
		maps_all = 0
		maps_win = 0
		maps_lose = 0
		count_1_win = 0
		count_2_win = 0
		count_1_lose = 0
		count_2_lose = 0
		rm = 0
		team = 0
		logo_team = 0
		team_opponent = 0
		logo_team_opponent = 0
	})

	totalStatsPlayer[0] = {
		name: nameP,
		nickname: nickname,
		player_id: player_id,
		surname: surname,
		date_birth: date_birth,
		country_flag: country_flag,
		kd: Math.round((personal_k / personal_d) * 100) / 100,
		kpr: Math.round(Kpr(personal_k, personal_all_r) * 100) / 100,
		dpr: Math.round(Dpr(personal_d, personal_all_r) * 100) / 100,
		impact: Math.round((personal_impact / count) * 100) / 100,
		rating: Rating(personal_k / personal_d, Kpr(personal_k, personal_all_r), Dpr(personal_d, personal_all_r), personal_impact / count),
		k: personal_k,
		a: personal_a,
		d: personal_d,
		maps: personal_all_maps,
	}

	function ifCloseQualification(name) {
		return name?.toLowerCase().replace(/closed qualifications/gi, 'CQ')
	}

	if (matchesID?.length > 0) {
		return (
			<div className={classes.wrapperTopResult}>
				<div className={classes.wrapperTitleSection}>
					<div className={classes.titleBanner}>
						<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/RANKOFF_LOGO.svg`} alt="/" />
						<div className={classes.titleBanner}>RANKOFF MVP PLAYER</div>
					</div>
					<div className={classes.nameTourWrapper}>
						<div className={classes.logoTour}>
							<img src={`/images/LogoAndBannerTour/${statsMvpPlayer[0]?.name_tour_sort}.png`} alt="/" />
						</div>
						<div className={classes.nameTour}>{`${ifCloseQualification(statsMvpPlayer[0]?.name_tour)?.toUpperCase()} ${choiceStage.length > 0 ? '[' + choiceStage?.toUpperCase() + ']' : ''}`}</div>
					</div>
				</div>

				<div className={classes.playerAndStatsSection}>
					<div className={classes.wrapperPlayerInfo}>
						<div className={classes.wrapperPlayerTeam}>
							<img src={`/images/LogoTeams/${statsMvpPlayer[0]?.logo_team}`} alt="/" />
						</div>
						<div className={classes.wrapperPlayerPhoto}>
							<div className={classes.playerPhoto}>
								<img src={`/images/LogoPlayers/${statsMvpPlayer[0]?.logolayer}`} alt="/" />
							</div>
						</div>
					</div>
					<div className={classes.wrapperPlayerPersonalInfo}>
						<div className={classes.logoTeam}>
							<img src={`/images/LogoTeams/${statsMvpPlayer[0]?.logo_team}`} alt="/" />
						</div>
						<div className={classes.nickname}>{totalStatsPlayer[0]?.nickname.toUpperCase()}</div>
						<div className={classes.flagAndName}>
							<div className={classes.flag}>
								<CountryFlagPlayer player_id={totalStatsPlayer[0]?.player_id} width={'20px'} height={'13px'} margin={'0 0 0 5px'} />
							</div>
							<div className={classes.nameSurname}>
								<div className={classes.name}>{totalStatsPlayer[0]?.name.toUpperCase()}</div>
								<div className={classes.surname}>{totalStatsPlayer[0]?.surname.toUpperCase()}</div>
							</div>
						</div>
						<div className={classes.age}>Age: {WhatBirthday(totalStatsPlayer[0]?.date_birth)}</div>
					</div>

					<div className={classes.wrapperPlayerStatsSection}>
						<div className={classes.wrapperTable}>
							<div className={classes.rowTableTitle}>
								<div>MACTH</div>
								<div>DATE</div>
								<div>KD</div>
								<div>KPR</div>
								<div>DPR</div>
								<div>IMPACT</div>
								<div>RATING</div>
								<div>MAPS</div>
							</div>
							{statsMvpPlayer?.map((e, index) => {
								return (
									<div className={classes.rowTable} key={index}>
										<div className={classes.cellScore}>
											<span style={{ color: e.scoreWin >= e.scoreLose ? 'var(--greenDark)' : 'var(--redDark)' }}>{e.scoreWin}</span>:<span>{e.scoreLose}</span>
										</div>
										<div className={classes.cell}>
											<div className={classes.opponentLogo}>
												<img src={`/images/LogoTeams/${e.logo_team_opponent}`} alt="/" />
											</div>
										</div>
										<div className={classes.cell}>{e.date_match}</div>
										<div
											className={classes.cell}
											style={{
												background: e.kd < 0.9 ? 'var(--red)' : e.kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
												// color: e.kd < 0.9 ? 'var(--redDark)' : e.kd > 1.05 ? 'var(--greenDark)' : 'var(--yellowDark)',
											}}>
											{e.kd}
										</div>
										<div
											className={classes.cell}
											style={{
												background: e.kpr < 0.6 ? 'var(--red)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.kpr < 0.6 ? 'var(--redDark)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.kpr}
										</div>
										<div
											className={classes.cell}
											style={{
												background: e.dpr < 0.6 ? 'var(--green)' : e.dpr > 0.65 ? (e.dpr > 0.7 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.kpr < 0.6 ? 'var(--redDark)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.dpr}
										</div>
										<div
											className={classes.cell}
											style={{
												background: e.impact < 1 ? 'var(--red)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.impact < 1 ? 'var(--redDark)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.impact}
										</div>
										<div
											className={classes.cell}
											style={{
												background: e.rating < 1 ? 'var(--red)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.rating < 1 ? 'var(--redDark)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.rating}
										</div>
										<div className={classes.cell}>{e.maps}</div>
									</div>
								)
							})}
							<div className={classes.total}>TOTAL:</div>
							<div className={classes.rowTableTotal}>
								<div>
									<div className={classes.nickname}>{totalStatsPlayer[0]?.nickname.toUpperCase()}</div>
								</div>
								<div
									style={{
										color: totalStatsPlayer[0]?.kd < 0.9 ? 'var(--redDark)' : totalStatsPlayer[0]?.kd > 1.05 ? 'var(--greenDark)' : 'var(--yellowDark)',
									}}>
									{totalStatsPlayer[0]?.kd}
								</div>
								<div
									style={{
										color: totalStatsPlayer[0]?.kpr < 0.6 ? 'var(--redDark)' : totalStatsPlayer[0]?.kpr > 0.65 ? (totalStatsPlayer[0]?.kpr > 0.7 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
									}}>
									{totalStatsPlayer[0]?.kpr}
								</div>
								<div
									style={{
										color: totalStatsPlayer[0]?.dpr < 0.6 ? 'var(--greenDark)' : totalStatsPlayer[0]?.dpr > 0.65 ? (totalStatsPlayer[0]?.dpr > 0.7 ? 'var(--redDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
									}}>
									{totalStatsPlayer[0]?.dpr}
								</div>
								<div
									style={{
										color: totalStatsPlayer[0]?.impact < 1 ? 'var(--redDark)' : totalStatsPlayer[0]?.impact > 1 ? (totalStatsPlayer[0]?.impact >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
									}}>
									{totalStatsPlayer[0]?.impact}
								</div>
								<div
									style={{
										color: totalStatsPlayer[0]?.rating < 1 ? 'var(--redDark)' : totalStatsPlayer[0]?.rating > 1 ? (totalStatsPlayer[0]?.rating >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
									}}>
									{totalStatsPlayer[0]?.rating}
								</div>
								<div>{totalStatsPlayer[0]?.maps}</div>
							</div>
						</div>
					</div>
					<div className={classes.gradientToTop}></div>
				</div>
				<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/MVP_PLAYERS.png`} className={classes.bgImg} alt="/" />
			</div>
		)
	}
}

export default PlayerMVPResult
