import React, { useState } from 'react'
import classes from '../rankingTeams.module.css'
import { useGetCurrentRankingTeamsQuery, useGetMatchesByNameTourQuery, useGetMatchesQuery, useGetPlayersQuery, useGetRankingTeamsQuery, useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery } from '../../../../store/api/apiSlice'
import CountryFlagTeam from '../../../../Function/countryFlagTeam'

const RankingTeamsResult = (props) => {
	let date = props.date

	//получаем рейтинг за выбранную дату
	const rankingsTeam = useGetCurrentRankingTeamsQuery({ date })

	// подсчет разницы положения каждой команды, поднялась она или опустилась в топе и на сколько

	const teamsTours = useGetRankingTeamsQuery()

	let arrAllDates = []

	if (teamsTours.data) {
		if (teamsTours.data.length > 0) {
			// получаем массив всех дат турниров

			teamsTours.data.map((e) => {
				if (e.points_team !== null) {
					arrAllDates.push(e.end_date)
				}
			})

			// убираем повторяющиеся даты, оставляем уникальные

			arrAllDates = arrAllDates.filter((item, index) => {
				return arrAllDates.indexOf(item) === index
			})

			arrAllDates = arrAllDates.filter((e) => e <= date)

			date = arrAllDates[1] //берем предыдущую дату от самой последней для посчета разницы положения команд в топе
		}
	}

	//функция подсчета показателя смещения команды в топе

	let penultimateDateRankingsTeam = useGetCurrentRankingTeamsQuery({ date })

	const diffPositionTeam = (positionTeam1, team1, id) => {
		let diff
		if (penultimateDateRankingsTeam.data) {
			if (penultimateDateRankingsTeam.data.length > 0) {
				return penultimateDateRankingsTeam.data
					.filter((team) => team.name_team === team1 && team.team_id === id)
					.map((e, index) => {
						diff = e.position_team - positionTeam1

						if (diff > 0) {
							return (
								<div
									className={classes.wrapperMetric}
									key={index}
									style={{
										color: 'var(--green)',
									}}>
									<div className={classes.metricSign}>
										<img src="/images/DataInImage/greenSign.svg" alt="" />
									</div>
									<div className={classes.metricValue}>{diff}</div>
								</div>
							)
						} else if (diff < 0) {
							return (
								<div
									className={classes.wrapperMetric}
									key={index}
									style={{
										color: 'var(--red)',
									}}>
									<div className={classes.metricSign}>
										<img src="/images/DataInImage/redSign.svg" alt="" />
									</div>
									<div className={classes.metricValue}>{Math.abs(diff)}</div>
								</div>
							)
						} else {
							return <div key={index}></div>
						}
					})
			}
		}
	}

	if (teamsTours.data && rankingsTeam.data) {
		if (teamsTours.data.length > 0 && rankingsTeam.data.length > 0) {
			let objDate = new Date(rankingsTeam.data[0].end_date).toLocaleString('en-us', { month: 'long' })

			objDate = +rankingsTeam.data[0].end_date.slice(8) + ' ' + objDate + ', ' + rankingsTeam.data[0].end_date.slice(0, 4)

			return (
				<div className={classes.wrapperTopResult}>
					<div className={classes.wrapperTitleBanner}>
						<div className={classes.logoAndTitleBanner}>
							<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/RANKOFF_LOGO.svg`} alt="/" />
							<div className={classes.titleBanner}>RANKOFF RANKING TEAMS</div>
						</div>
						<div className={classes.themeBanner}>{objDate.toUpperCase()}</div>
					</div>

					<div className={classes.wrapperTableSection}>
						<div className={classes.wrapperTableTitle}>
							<div className={classes.tableTitle}>
								<div className={classes.dataNumberPlayerTitle}>#</div>
								<div className={classes.wrapperTeam}>TEAM</div>
								<div className={classes.dataRoster}>ROSTER</div>
								<div className={classes.dataPoints}>POINTS</div>
								<div className={classes.dataDiffPosition}></div>
							</div>
						</div>
						{rankingsTeam.data.map((e, index) => {
							let diffPos = diffPositionTeam(e.position_team, e.name_team, e.team_id)
							console.log(diffPos)
							if (index < 10) {
								return (
									<div key={index} className={classes.wrapperTable}>
										<div className={classes.dataNumberPlayerTitle}>{++index}</div>
										<div className={classes.wrapperTeam}>
											<div className={classes.logoTeam}>
												<img src={`/images/LogoTeams/${e.logo_team}`} alt="/" />
											</div>
											<div className={classes.dataNameTeam}>
												<div className={classes.dataFlagTeamCountry}>
													<CountryFlagTeam p1={e.player1} p2={e.player2} p3={e.player3} p4={e.player4} p5={e.player5} mode="team" />
												</div>
												{e.name_team}
											</div>
										</div>

										<div className={classes.dataRoster}>
											<div className={classes.playerRoster}>
												<img
													src={`/images/LogoPlayers/${e.logo_player1 === 'PlayerDefaultLogo.png' ? 'PlayerDefaultLogo.png' : e.logo_player1}`}
													onError={(event) => event.target.setAttribute('src', '/images/LogoPlayers/PlayerDefaultLogo.png')}
													alt="/"
												/>
												<div className={classes.nicknamePlayerRoster}>{e.player1}</div>
											</div>
											<div className={classes.playerRoster}>
												<img
													src={`/images/LogoPlayers/${e.logo_player2 === 'PlayerDefaultLogo.png' ? 'PlayerDefaultLogo.png' : e.logo_player2}`}
													onError={(event) => event.target.setAttribute('src', '/images/LogoPlayers/PlayerDefaultLogo.png')}
													alt="/"
												/>
												<div className={classes.nicknamePlayerRoster}>{e.player2}</div>
											</div>
											<div className={classes.playerRoster}>
												<img
													src={`/images/LogoPlayers/${e.logo_player3 === 'PlayerDefaultLogo.png' ? 'PlayerDefaultLogo.png' : e.logo_player3}`}
													onError={(event) => event.target.setAttribute('src', '/images/LogoPlayers/PlayerDefaultLogo.png')}
													alt="/"
												/>
												<div className={classes.nicknamePlayerRoster}>{e.player3}</div>
											</div>
											<div className={classes.playerRoster}>
												<img
													src={`/images/LogoPlayers/${e.logo_player4 === 'PlayerDefaultLogo.png' ? 'PlayerDefaultLogo.png' : e.logo_player4}`}
													onError={(event) => event.target.setAttribute('src', '/images/LogoPlayers/PlayerDefaultLogo.png')}
													alt="/"
												/>
												<div className={classes.nicknamePlayerRoster}>{e.player4}</div>
											</div>
											<div className={classes.playerRoster}>
												<img
													src={`/images/LogoPlayers/${e.logo_player5 === 'PlayerDefaultLogo.png' ? 'PlayerDefaultLogo.png' : e.logo_player5}`}
													onError={(event) => event.target.setAttribute('src', '/images/LogoPlayers/PlayerDefaultLogo.png')}
													alt="/"
												/>
												<div className={classes.nicknamePlayerRoster}>{e.player5}</div>
											</div>
										</div>
										<div className={classes.dataPoints}>{e.points_team}</div>
										<div className={classes.dataDiffPosition}>{diffPos}</div>
									</div>
								)
							}
						})}
					</div>
					<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/TOP_PLAYERS_BANNER.png`} className={classes.bgImg} alt="/" />
				</div>
			)
		}
	}
}

export default RankingTeamsResult
