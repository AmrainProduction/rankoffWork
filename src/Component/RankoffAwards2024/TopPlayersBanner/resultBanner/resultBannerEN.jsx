import React from 'react'
import classes from './resultBanner.module.css'
import { useGetPlayerByNickQuery } from '../../../../store/api/apiSlice'
import WhatBirthday from '../../../../Function/whatBirthday'

const ResultBanner = (props) => {
	const id = props.player[0].player_id
	const nickname = props.player[0].nickname
	const awards = props.allEvents?.reverse()

	const playerTeam = useGetPlayerByNickQuery({ id, nickname })

	const whatCurrentTeam = (playerTeam) => {
		let logo_team
		let team_id
		let team

		if (playerTeam && playerTeam.length > 0) {
			logo_team = playerTeam[0].back_logo_team
			team_id = playerTeam[0].team_id
			team = playerTeam[0].team

			return [logo_team, team_id, team]
		} else {
			return []
		}
	}

	const playerInfo = props.player

	if (playerInfo && playerInfo.length > 0) {
		let teamPlayerInfo = whatCurrentTeam(playerTeam.data)

		playerInfo[0].back_logo_team = teamPlayerInfo[0]
		playerInfo[0].team_id = teamPlayerInfo[1]
		playerInfo[0].team = teamPlayerInfo[2]

		return (
			<div className={classes.wrapperBanner}>
				<div className={classes.resultDataBanner}>
					<div className={classes.titleSection}>
						<div className={classes.titleBanner}>
							<img src="/images/DataInImage/RANKOFF_AWARDS_2025/TOP_PLAYERS_LOGO.svg" alt="/" />
						</div>
						{props.position ? <div className={classes.positionPlayer}>#{props.position}</div> : ''}
					</div>
					<div className={classes.mainSection}>
						<div className={classes.statsBlock}>
							<div className={classes.personalStatsTitle}>PERSONAL STATISTICS</div>
							<div className={classes.personalStats}>
								<div
									className={classes.item}
									style={{
										background:
											playerInfo[0].rating < 1
												? 'linear-gradient(to right top, var(--red), var(--redLight))'
												: playerInfo[0].rating > 1
													? playerInfo[0].rating >= 1.1
														? 'linear-gradient(to right top, var(--green), var(--greenLight))'
														: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))'
													: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))',
										color: playerInfo[0].rating < 1 ? 'var(--redDark)' : playerInfo[0].rating > 1 ? (playerInfo[0].rating >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
									}}>
									<div
										className={classes.nameMetric}
										style={{
											color: playerInfo[0].rating < 1 ? 'var(--redDark)' : playerInfo[0].rating > 1 ? (playerInfo[0].rating >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
										}}>
										RATING
									</div>
									<div className={classes.valueMetric}>{playerInfo[0].rating}</div>
								</div>
								<div
									className={classes.item}
									style={{
										background:
											playerInfo[0].impact < 1
												? 'linear-gradient(to right top, var(--red), var(--redLight))'
												: playerInfo[0].impact > 1
													? playerInfo[0].impact >= 1.1
														? 'linear-gradient(to right top, var(--green), var(--greenLight))'
														: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))'
													: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))',
										color: playerInfo[0].impact < 1 ? 'var(--redDark)' : playerInfo[0].impact > 1 ? (playerInfo[0].impact >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
									}}>
									<div
										className={classes.nameMetric}
										style={{
											color: playerInfo[0].impact < 1 ? 'var(--redDark)' : playerInfo[0].impact > 1 ? (playerInfo[0].impact >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
										}}>
										IMPACT
									</div>
									<div className={classes.valueMetric}>{playerInfo[0].impact}</div>
								</div>
								<div className={classes.item}>
									<div className={classes.nameMetric}>K</div>
									<div className={classes.valueMetric}>{playerInfo[0].k}</div>
								</div>
								<div
									className={classes.item}
									style={{
										background:
											playerInfo[0].kpr < 0.6
												? 'linear-gradient(to right top, var(--red), var(--redLight))'
												: playerInfo[0].kpr > 0.65
													? playerInfo[0].kpr > 0.7
														? 'linear-gradient(to right top, var(--green), var(--greenLight))'
														: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))'
													: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))',
										color: playerInfo[0].kpr < 0.6 ? 'var(--redDark)' : playerInfo[0].kpr > 0.65 ? (playerInfo[0].kpr > 0.7 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
									}}>
									<div
										className={classes.nameMetric}
										style={{
											color: playerInfo[0].kpr < 0.6 ? 'var(--redDark)' : playerInfo[0].kpr > 0.65 ? (playerInfo[0].kpr > 0.7 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
										}}>
										KPR
									</div>
									<div className={classes.valueMetric}>{playerInfo[0].kpr}</div>
								</div>
								<div
									className={classes.item}
									style={{
										background:
											playerInfo[0].dpr < 0.68
												? 'linear-gradient(to right top, var(--green), var(--greenLight))'
												: playerInfo[0].dpr > 0.7
													? playerInfo[0].dpr > 0.8
														? 'linear-gradient(to right top, var(--red), var(--redLight))'
														: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))'
													: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))',
										color: playerInfo[0].dpr < 0.68 ? 'var(--greenDark)' : playerInfo[0].dpr > 0.7 ? (playerInfo[0].dpr > 0.8 ? 'var(--redDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
									}}>
									<div
										className={classes.nameMetric}
										style={{
											color: playerInfo[0].dpr < 0.68 ? 'var(--greenDark)' : playerInfo[0].dpr > 0.7 ? (playerInfo[0].dpr > 0.8 ? 'var(--redDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
										}}>
										DPR
									</div>
									<div className={classes.valueMetric}>{playerInfo[0].dpr}</div>
								</div>
								<div className={classes.item}>
									<div className={classes.nameMetric}>A</div>
									<div className={classes.valueMetric}>{playerInfo[0].a}</div>
								</div>
								<div
									className={classes.item}
									style={{
										background:
											playerInfo[0].kd < 0.9
												? 'linear-gradient(to right top, var(--red), var(--redLight))'
												: playerInfo[0].kd > 1.05
													? 'linear-gradient(to right top, var(--green), var(--greenLight))'
													: 'linear-gradient(to right top, var(--yellow), var(--yellowLight))',
										color: playerInfo[0].kd < 0.9 ? 'var(--redDark)' : playerInfo[0].kd > 1.05 ? 'var(--greenDark)' : 'var(--yellowDark)',
									}}>
									<div
										className={classes.nameMetric}
										style={{
											color: playerInfo[0].kd < 0.9 ? 'var(--redDark)' : playerInfo[0].kd > 1.05 ? 'var(--greenDark)' : 'var(--yellowDark)',
										}}>
										KD
									</div>
									<div className={classes.valueMetric}>{playerInfo[0].kd}</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: playerInfo[0].k - playerInfo[0].d < 0 ? 'linear-gradient(to right top, var(--red), var(--redLight))' : 'linear-gradient(to right top, var(--green), var(--greenLight))',
										color: playerInfo[0].k - playerInfo[0].d < 0 ? 'var(--redDark)' : 'var(--greenDark)',
									}}>
									<div
										className={classes.nameMetric}
										style={{
											color: playerInfo[0].k - playerInfo[0].d < 0 ? 'var(--redDark)' : 'var(--greenDark)',
										}}>
										DIFF
									</div>
									<div className={classes.valueMetric}>{playerInfo[0].k - playerInfo[0].d}</div>
								</div>
								<div className={classes.item}>
									<div className={classes.nameMetric}>D</div>
									<div className={classes.valueMetric}>{playerInfo[0].d}</div>
								</div>
							</div>
							<div className={classes.generalMetricsTitle}>GENERAL METRICS</div>
							<div className={classes.generalMetrics}>
								<div className={classes.item}>
									<div className={classes.doubleMetric}>
										<div className={classes.nameMetric}>Matches played:</div>
										<div className={classes.valueMetric}>{playerInfo[0].matches}</div>
									</div>
									<div
										className={classes.doubleMetric}
										style={{
											color: playerInfo[0].w_match - playerInfo[0].l_match < 0 ? 'linear-gradient(to right top, var(--red), var(--redLight))' : 'linear-gradient(to right top, var(--green), var(--greenLight))',
										}}>
										<div className={classes.nameMetric}>Matches difference:</div>
										<div className={classes.valueMetric}>{playerInfo[0].w_match - playerInfo[0].l_match < 0 ? playerInfo[0].w_match - playerInfo[0].l_match : `+${playerInfo[0].w_match - playerInfo[0].l_match}`}</div>
									</div>
								</div>
								<div className={classes.item}>
									<div className={classes.doubleMetric}>
										<div className={classes.nameMetric}>Maps played:</div>
										<div className={classes.valueMetric}>{playerInfo[0].maps}</div>
									</div>
									<div
										className={classes.doubleMetric}
										style={{
											color: playerInfo[0].w_maps - playerInfo[0].l_maps < 0 ? 'linear-gradient(to right top, var(--red), var(--redLight))' : 'linear-gradient(to right top, var(--green), var(--greenLight))',
										}}>
										<div className={classes.nameMetric}>Maps difference:</div>
										<div className={classes.valueMetric}>{playerInfo[0].w_maps - playerInfo[0].l_maps < 0 ? playerInfo[0].w_maps - playerInfo[0].l_maps : `+${playerInfo[0].w_maps - playerInfo[0].l_maps}`}</div>
									</div>
								</div>
								<div className={classes.item}>
									<div className={classes.doubleMetric}>
										<div className={classes.nameMetric}>Rounds played:</div>
										<div className={classes.valueMetric}>{playerInfo[0].rounds}</div>
									</div>
									<div
										className={classes.doubleMetric}
										style={{
											color: playerInfo[0].w_rounds - playerInfo[0].l_rounds < 0 ? 'linear-gradient(to right top, var(--red), var(--redLight))' : 'linear-gradient(to right top, var(--green), var(--greenLight))',
										}}>
										<div className={classes.nameMetric}>Rounds difference:</div>
										<div className={classes.valueMetric}>
											{playerInfo[0].w_rounds - playerInfo[0].l_rounds < 0 ? playerInfo[0].w_rounds - playerInfo[0].l_rounds : `+${playerInfo[0].w_rounds - playerInfo[0].l_rounds}`}
										</div>
									</div>
								</div>
							</div>
							<div className={classes.generalMetricsNext}>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--green), var(--greenLight))',
										color: 'var(--greenDark)',
									}}>
									<div className={classes.verticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--greenDark)',
											}}>
											Matches <br /> won:
										</div>
										<div className={classes.valueMetric}>{playerInfo[0].w_match}</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--red), var(--redLight))',
										color: 'var(--redDark)',
									}}>
									<div className={classes.verticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--redDark)',
											}}>
											Matches <br />
											lost:
										</div>
										<div className={classes.valueMetric}>{playerInfo[0].l_match}</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--green), var(--greenLight))',
										color: 'var(--greenDark)',
									}}>
									<div className={classes.verticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--greenDark)',
											}}>
											Maps won:
										</div>
										<div className={classes.valueMetric}>{playerInfo[0].w_maps}</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--red), var(--redLight))',
										color: 'var(--redDark)',
									}}>
									<div className={classes.verticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--redDark)',
											}}>
											Maps lost:
										</div>
										<div className={classes.valueMetric}>{playerInfo[0].l_maps}</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--green), var(--greenLight))',
										color: 'var(--greenDark)',
									}}>
									<div className={classes.verticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--greenDark)',
											}}>
											Rounds <br />
											won:
										</div>
										<div className={classes.valueMetric}>{playerInfo[0].w_rounds}</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--red), var(--redLight))',
										color: 'var(--redDark)',
									}}>
									<div className={classes.verticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--redDark)',
											}}>
											Rounds <br /> lost:
										</div>
										<div className={classes.valueMetric}>{playerInfo[0].l_rounds}</div>
									</div>
								</div>
							</div>
							<div className={classes.teamAchievementsTitle}>PERSONAL AND TEAM ACHIEVEMENTS</div>
							<div className={classes.teamAchievements}>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--gold), var(--goldLight))',
										color: 'var(--goldDark)',
									}}>
									<div className={classes.leftBottomMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--goldDark)',
											}}>
											Number of MVP Awards:
										</div>
										<div className={classes.valueMetric}>{props.MVP?.length}</div>
									</div>
								</div>
								<div className={classes.item}>
									<div className={classes.bottomVerticalMetric}>
										<div className={classes.nameMetric}>Percentage of wins in the group stage:</div>
										<div className={classes.valueMetric}>{playerInfo[0].wr_group}%</div>
									</div>
								</div>
								<div className={classes.item}>
									<div className={classes.bottomVerticalMetric}>
										<div className={classes.nameMetric}>Percentage of wins in the playoff stage:</div>
										<div className={classes.valueMetric}>{playerInfo[0].wr_playoff}%</div>
									</div>
								</div>
								<div className={classes.item}>
									<div className={classes.bottomVerticalMetric}>
										<div className={classes.nameMetric}>Percentage of wins in finals:</div>
										<div className={classes.valueMetric}>{playerInfo[0].wr_final}%</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--gray), var(--grayLight))',
										color: 'var(--grayDark)',
									}}>
									<div className={classes.leftBottomMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--grayDark)',
											}}>
											Number of EVP Awards:
										</div>
										<div className={classes.valueMetric}>{props.EVP?.length}</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--gold), var(--goldLight))',
										color: 'var(--goldDark)',
									}}>
									<div className={classes.bottomVerticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--goldDark)',
											}}>
											Number of first places:
										</div>
										<div className={classes.valueMetric}>{props.countFirstPlaces[0]}</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--gray), var(--grayLight))',
										color: 'var(--grayDark)',
									}}>
									<div className={classes.bottomVerticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--grayDark)',
											}}>
											Number of second places:
										</div>
										<div className={classes.valueMetric}>{props.countFirstPlaces[1]}</div>
									</div>
								</div>
								<div
									className={classes.item}
									style={{
										background: 'linear-gradient(to right top, var(--bronze), var(--bronzeLight))',
										color: 'var(--bronzeDark)',
									}}>
									<div className={classes.bottomVerticalMetric}>
										<div
											className={classes.nameMetric}
											style={{
												color: 'var(--bronzeDark)',
											}}>
											Number of third places:
										</div>
										<div className={classes.valueMetric}>{props.countFirstPlaces[2]}</div>
									</div>
								</div>
							</div>
						</div>
						<div className={classes.listEvent}>
							{awards?.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.event}
										style={{
											background: e.position_team === 1 ? 'var(--goldOpacity)' : e.position_team === 2 ? 'var(--silverOpacity)' : e.position_team === 3 ? 'var(--bronzeOpacity)' : '',
										}}>
										<img src={`/images/DataInImage/RANKOFF_AWARDS_2025/LogoAndBannerTour/${e.logo_tour}`} alt="/" />
										{props.MVP?.map((e2) => e2.name_tour_sort).includes(e.name_tour_sort) ? (
											<div
												className={classes.checkAwardEvent}
												style={{
													background: 'linear-gradient(to right top, var(--gold), var(--goldLight))',
													color: 'var(--goldDark)',
												}}>
												MVP
											</div>
										) : (
											''
										)}
										{props.EVP?.map((e2) => e2.name_tour_sort).includes(e.name_tour_sort) ? (
											<div
												className={classes.checkAwardEvent}
												style={{
													background: 'linear-gradient(to right top, var(--gray), var(--grayLight))',
													color: 'var(--grayDark)',
												}}>
												EVP
											</div>
										) : (
											''
										)}
									</div>
								)
							})}
						</div>
					</div>
				</div>
				<div className={classes.infoPlayer}>
					<div className={classes.logoTeamPlayer}>
						<img src={`/images/DataInImage/RANKOFF_AWARDS_2025/LogoTeams/${playerInfo[0].back_logo_team}`} alt="/" />
					</div>
					<div className={classes.flagAndAge}>
						<img src={`/images/DataInImage/RANKOFF_AWARDS_2025/RegionsFlags/${playerInfo[0].country_flag}.svg`} alt="/" />
						{WhatBirthday(playerInfo[0].date_birth)} YEARS
					</div>
					<div className={classes.nickname}>{playerInfo[0].nickname.toUpperCase()}</div>
					<div className={classes.name}>{playerInfo[0].name + ' ' + playerInfo[0].surname}</div>
				</div>
				<div className={classes.logoTeam}>
					<img src={`/images/DataInImage/RANKOFF_AWARDS_2025/LogoTeams/${playerInfo[0].back_logo_team}`} alt="/" />
				</div>
				<div className={classes.photoPlayer}>
					<img src={`/images/LogoPlayers/${playerInfo[0].logo_player}`} alt="/" />
				</div>
				<div className={classes.shadowToTop}>
					<img src={`/images/DataInImage/RANKOFF_AWARDS_2025/BGOpacity.png`} alt="/" />
				</div>
				<img src={`/images/DataInImage/RANKOFF_AWARDS_2025/BG.png`} alt="/" />
			</div>
		)
	}
}

export default ResultBanner
