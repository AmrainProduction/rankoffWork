import React from 'react'
import classes from '../metricsPlayer.module.css'
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
import Kpr from '../../../Formulas/kpr'
import Dpr from '../../../Formulas/dpr'
import Rating from '../../../Formulas/rating'
import Loader from '../../../UI/Loader/loader'
import WhatBirthday from '../../../../Function/whatBirthday'
import CalculateStatsPlayerForPeriod from '../../../../Function/calculateStatsPlayerForPeriod'

const MetricsPlayerResult = ({ player1, dateEnd1, days1, dateStart1, title, choiceMap }) => {
	const allMatches = useGetMatchesQuery()

	const player1Stats = CalculateStatsPlayerForPeriod(player1, dateStart1, dateEnd1, days1, choiceMap)

	const isLoading = allMatches.isLoading

	if (isLoading) {
		return <Loader />
	}

	const daysToMonths = (days) => {
		const daysInMonth = 30.44
		return ((days ? days : 90) / daysInMonth).toFixed(0)
	}

	if (player1 && player1Stats && player1Stats.length > 0) {
		return (
			<div className={classes.wrapperTopResult}>
				<div className={classes.wrapperStatsSection}>
					<div className={classes.wrapperTitleSection}>
						<div className={classes.titleBanner}>
							<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/RANKOFF_LOGO.svg`} alt="/" />
							<div className={classes.titleBanner}>RANKOFF STATS</div>
						</div>
					</div>
					<div className={classes.nameTourWrapper}>
						<div className={classes.nameTour}>{`${title}`.toUpperCase()}</div>
						{/* <div className={classes.logoTour}>
							<img src={`/images/LogoAndBannerTour/${nameEvent?.name_tour_sort}.png`} alt="/" />
						</div>
						<div className={classes.nameTour}>{`${ifCloseQualification(nameEvent?.name_tour)?.toUpperCase()}`}</div> */}
					</div>

					<div className={classes.wrapperStats}>
						<div className={classes.stats}>
							<div className={classes.statsItem}>
								<div className={classes.titleMetric}>RATING</div>
								<div className={classes.metric}>{player1Stats[0]?.rating}</div>
								<span
									className={classes.colorIndex}
									style={{
										background: player1Stats[0]?.rating < 1 ? 'var(--red)' : player1Stats[0]?.rating > 1 ? (player1Stats[0]?.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}></span>
							</div>
							<div className={classes.statsItem}>
								<div className={classes.titleMetric}>IMPACT</div>
								<div className={classes.metric}>{player1Stats[0]?.impact}</div>
								<span
									className={classes.colorIndex}
									style={{
										background: player1Stats[0]?.impact < 1 ? 'var(--red)' : player1Stats[0]?.impact > 1 ? (player1Stats[0]?.impact >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}></span>
							</div>
							<div className={classes.statsItem}>
								<div className={classes.titleMetric}>KD</div>
								<div className={classes.metric}>{player1Stats[0]?.kd}</div>
								<span
									className={classes.colorIndex}
									style={{
										background: player1Stats[0]?.kd < 0.9 ? 'var(--red)' : player1Stats[0]?.kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
									}}></span>
							</div>
							<div className={classes.statsItem}>
								<div className={classes.titleMetric}>KPR</div>
								<div className={classes.metric}>{player1Stats[0]?.kpr}</div>
								<span
									className={classes.colorIndex}
									style={{
										background: player1Stats[0]?.kpr < 0.6 ? 'var(--red)' : player1Stats[0]?.kpr > 0.65 ? (player1Stats[0]?.kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
									}}></span>
							</div>
							<div className={classes.statsItem}>
								<div className={classes.titleMetric}>DPR</div>
								<div className={classes.metric}>{player1Stats[0]?.dpr}</div>
								<span
									className={classes.colorIndex}
									style={{
										background: player1Stats[0]?.dpr < 0.68 ? 'var(--green)' : player1Stats[0]?.dpr > 0.7 ? (player1Stats[0]?.dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
									}}></span>
							</div>
							<div className={classes.statsItem}>
								<div className={classes.titleMetric}>MAPS</div>
								<div className={classes.metric}>{player1Stats[0]?.maps}</div>
								<span className={classes.colorIndex}></span>
							</div>
							<div className={classes.statsItem}>
								<div className={classes.titleMetric}>KILLS</div>
								<div className={classes.metric}>{player1Stats[0]?.k}</div>
								<span className={classes.colorIndex}></span>
							</div>
							<div className={classes.statsItem}>
								<div className={classes.titleMetric}>DEATHS</div>
								<div className={classes.metric}>{player1Stats[0]?.d}</div>
								<span className={classes.colorIndex}></span>
							</div>
						</div>
					</div>
				</div>

				<div className={classes.wrapperInfoPlayer}>
					<div className={classes.wrapperPlayerInfo}>
						<div className={classes.wrapperPlayerTeam}>
							<img src={`/images/LogoTeams/${player1Stats[0]?.logoTeam}`} alt="/" />
						</div>
						<div className={classes.wrapperPlayerPhoto}>
							<div className={classes.playerPhoto}>
								<img src={`/images/LogoPlayers/${player1Stats[0]?.photoPlayer}`} alt="/" />
							</div>
						</div>
					</div>

					<div className={classes.wrapperPlayerPersonalInfo}>
						<div className={classes.logoTeam}>
							<img src={`/images/LogoTeams/${player1?.back_logo_team}`} alt="/" />
						</div>
						<div className={classes.nickname}>{player1?.nickname.toUpperCase()}</div>
						<div className={classes.flagAndName}>
							<div className={classes.flag}>
								<CountryFlagPlayer player_id={player1?.player_id} />
							</div>
							<div className={classes.nameSurname}>
								<div className={classes.name}>{player1?.name.toUpperCase()}</div>
								<div className={classes.surname}>{player1?.surname.toUpperCase()}</div>
							</div>
						</div>
						<div className={classes.age}>Age: {WhatBirthday(player1?.date_birth)}</div>
					</div>
				</div>

				<div className={classes.gradientToTop}></div>
				<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/METRICS_PLAYER.png`} className={classes.bgImg} alt="/" />
			</div>
		)
	}
}

export default MetricsPlayerResult
