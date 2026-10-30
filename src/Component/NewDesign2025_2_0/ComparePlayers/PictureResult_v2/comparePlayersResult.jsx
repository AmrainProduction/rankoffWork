import React from 'react'
import classes from '../comparePlayers.module.css'
import { useGetMatchesQuery } from '../../../../store/api/apiSlice'
import CalculateStatsPlayerForPeriod from '../../../../Function/calculateStatsPlayerForPeriod'
import WhatBirthdayThen from '../../../../Function/whatBirthdayThen'
import Loader from '../../../UI/Loader/loader'

const ComparePlayersResult = ({ player1, player2, dateEnd1, days1, dateEnd2, days2, dateStart1, dateStart2 }) => {
	const allMatches = useGetMatchesQuery()

	const player1Stats = CalculateStatsPlayerForPeriod(player1, dateStart1, dateEnd1, days1, '')
	const player2Stats = CalculateStatsPlayerForPeriod(player2, dateStart2, dateEnd2, days2, '')

	const isLoading = allMatches.isLoading

	if (isLoading) {
		return <Loader />
	}

	const daysToMonths = (days) => {
		const daysInMonth = 30.44
		return ((days ? days : 90) / daysInMonth).toFixed(0)
	}

	if (player1 && player2 && player1Stats && player1Stats.length > 0 && player2Stats && player2Stats.length > 0) {
		console.log('player1Stats', player2)
		return (
			<div className={classes.wrapperTopResult}>
				<div className={classes.logoRankoff}>
					<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/RANKOFF_LOGO.svg`} alt="/" />
					<div className={classes.titleBanner}>RANKOFF COMPARE</div>
				</div>

				<div className={classes.leftPlayer}>
					<img src={`/images/LogoPlayers/${player1Stats[0].photoPlayer}`} alt="/" />
					<div className={classes.shadowToTop}></div>
					<div className={classes.infoPlayer}>
						<div className={classes.logoTeams}>
							<img src={`/images/LogoTeams/${player1Stats[0].logoTeam}`} alt="/" />
						</div>
						<div className={classes.flagAndAge}>
							<img src={`/images/DataInImage/RANKOFF_AWARDS_2024/RegionsFlags/${player1.country_flag}.svg`} alt="/" />
							лет: {WhatBirthdayThen(player1.date_birth, dateEnd1 ? dateEnd1 : new Date().toISOString().split('T')[0])}
						</div>
						<div className={classes.nickname}>{player1.nickname}</div>
						<div className={classes.name}>{player1.name + ' ' + player1.surname}</div>
					</div>
					<div className={classes.backLogoTeam}>
						<img src={`/images/LogoTeams/${player1Stats[0].logoTeam}`} alt="/" />
					</div>
				</div>
				<div className={classes.statsSection}>
					<div className={classes.rankoff}>RANKOFF.ORG</div>
					<div className={classes.wrapperStats}>
						<div className={classes.metric}>
							<div className={classes.valuePlayer}>{player1Stats[0]?.rating}</div>
							<div className={classes.metricSign}>
								{player1Stats[0]?.rating > player2Stats[0]?.rating ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player1Stats[0]?.rating === player2Stats[0]?.rating ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.nameMetric}>RATING</div>
							<div className={classes.metricSign}>
								{player2Stats[0]?.rating > player1Stats[0]?.rating ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player2Stats[0]?.rating === player1Stats[0]?.rating ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.valuePlayer}>{player2Stats[0]?.rating}</div>
						</div>
						<div className={classes.metric}>
							<div className={classes.valuePlayer}>{player1Stats[0]?.impact}</div>
							<div className={classes.metricSign}>
								{player1Stats[0]?.impact > player2Stats[0]?.impact ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player2Stats[0]?.impact === player1Stats[0]?.impact ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.nameMetric}>IMPACT</div>
							<div className={classes.metricSign}>
								{player2Stats[0]?.impact > player1Stats[0]?.impact ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player2Stats[0]?.impact === player1Stats[0]?.impact ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.valuePlayer}>{player2Stats[0]?.impact}</div>
						</div>
						<div className={classes.metric}>
							<div className={classes.valuePlayer}>{player1Stats[0]?.kd}</div>
							<div className={classes.metricSign}>
								{player1Stats[0]?.kd > player2Stats[0]?.kd ? <img src="/images/DataInImage/greenSign.svg" alt="" /> : player1Stats[0]?.kd === player2Stats[0]?.kd ? null : <img src="/images/DataInImage/redSign.svg" alt="" />}
							</div>
							<div className={classes.nameMetric}>KD</div>
							<div className={classes.metricSign}>
								{player2Stats[0]?.kd > player1Stats[0]?.kd ? <img src="/images/DataInImage/greenSign.svg" alt="" /> : player2Stats[0]?.kd === player1Stats[0]?.kd ? null : <img src="/images/DataInImage/redSign.svg" alt="" />}
							</div>
							<div className={classes.valuePlayer}>{player2Stats[0]?.kd}</div>
						</div>
						<div className={classes.metric}>
							<div className={classes.valuePlayer}>{player1Stats[0]?.kpr}</div>
							<div className={classes.metricSign}>
								{player1Stats[0]?.kpr > player2Stats[0]?.kpr ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player2Stats[0]?.kpr === player1Stats[0]?.kpr ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.nameMetric}>KPR</div>
							<div className={classes.metricSign}>
								{player2Stats[0]?.kpr > player1Stats[0]?.kpr ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player2Stats[0]?.kpr === player1Stats[0]?.kpr ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.valuePlayer}>{player2Stats[0]?.kpr}</div>
						</div>
						<div className={classes.metric}>
							<div className={classes.valuePlayer}>{player1Stats[0]?.dpr}</div>
							<div className={classes.metricSign}>
								{player1Stats[0]?.dpr > player2Stats[0]?.dpr ? (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								) : player2Stats[0]?.dpr === player1Stats[0]?.dpr ? null : (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								)}
							</div>
							<div className={classes.nameMetric}>DPR</div>
							<div className={classes.metricSign}>
								{player2Stats[0]?.dpr > player1Stats[0]?.dpr ? (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								) : player2Stats[0]?.dpr === player1Stats[0]?.dpr ? null : (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								)}
							</div>
							<div className={classes.valuePlayer}>{player2Stats[0]?.dpr}</div>
						</div>
						<div className={classes.metric}>
							<div className={classes.valuePlayer}>{player1Stats[0]?.k - player1Stats[0]?.d}</div>
							<div className={classes.metricSign}>
								{player1Stats[0]?.k - player1Stats[0]?.d > player2Stats[0]?.k - player2Stats[0]?.d ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player1Stats[0]?.k - player1Stats[0]?.d === player2Stats[0]?.k - player2Stats[0]?.d ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.nameMetric}>DIFF</div>
							<div className={classes.metricSign}>
								{player2Stats[0]?.k - player2Stats[0]?.d > player1Stats[0]?.k - player1Stats[0]?.d ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player1Stats[0]?.k - player1Stats[0]?.d === player2Stats[0]?.k - player2Stats[0]?.d ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.valuePlayer}>{player2Stats[0]?.k - player2Stats[0]?.d}</div>
						</div>
						<div className={classes.metric}>
							<div className={classes.valuePlayer}>{player1Stats[0]?.maps}</div>
							<div className={classes.metricSign}>
								{player1Stats[0]?.maps > player2Stats[0]?.maps ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player2Stats[0]?.maps === player1Stats[0]?.maps ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.nameMetric}>MAPS</div>
							<div className={classes.metricSign}>
								{player2Stats[0]?.maps > player1Stats[0]?.maps ? (
									<img src="/images/DataInImage/greenSign.svg" alt="" />
								) : player2Stats[0]?.maps === player1Stats[0]?.maps ? null : (
									<img src="/images/DataInImage/redSign.svg" alt="" />
								)}
							</div>
							<div className={classes.valuePlayer}>{player2Stats[0]?.maps}</div>
						</div>
					</div>
					{/* <div className={classes.description}>{'ЗА ВСЕ ТУРНИРЫ 2025'}</div> */}
					<div className={classes.description}>{days1 === days2 && days1 && days2 ? `Past ${daysToMonths(days1)} months` : ''}</div>
				</div>
				<div className={classes.rightPlayer}>
					<img src={`/images/LogoPlayers/${player2.logo_player}`} alt="/" />
					<div className={classes.shadowToTop}></div>
					<div className={classes.infoPlayer}>
						<div className={classes.logoTeams}>
							<img src={`/images/LogoTeams/${player2.back_logo_team}`} alt="/" />
						</div>
						<div className={classes.flagAndAge}>
							<img src={`/images/DataInImage/RANKOFF_AWARDS_2024/RegionsFlags/${player2.country_flag}.svg`} alt="/" />
							лет: {WhatBirthdayThen(player2.date_birth, dateEnd2 ? dateEnd2 : new Date().toISOString().split('T')[0])}
						</div>
						<div className={classes.nickname}>{player2.nickname}</div>
						<div className={classes.name}>{player2.name + ' ' + player2.surname}</div>
					</div>
					<div className={classes.backLogoTeam}>
						<img src={`/images/LogoTeams/${player2.back_logo_team}`} alt="/" />
					</div>
				</div>
				{/* <div className={classes.shadowToTop2}></div> */}
				<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/COMPARE_PLAYERS.png`} className={classes.bgImg} alt="/" />
			</div>
		)
	}
}

export default ComparePlayersResult
