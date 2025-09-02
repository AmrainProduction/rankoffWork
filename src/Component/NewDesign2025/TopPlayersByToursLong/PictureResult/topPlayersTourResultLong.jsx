import React from 'react'
import classes from '../topPlayersByToursLong.module.css'
import { useGetMatchesQuery, useGetPlayersQuery, useGetShortMatchesByTournamentQuery, useGetShortMatchQuery, useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery } from '../../../../store/api/apiSlice'
import CountryFlagPlayer from '../../../../Function/countryFlagPlayer'
import { calculatePlayersTop } from '../../../../Function/calculatePlayersTop'
import { calculatePlayersTopV2 } from '../../../../Function/calculatePlayersTopV2'

const TopPlayersTourResultLong = (props) => {
	const name = props.name

	const allPlayers = useGetPlayersQuery()
	const allMatches = useGetMatchesQuery()
	const allShortMatches = useGetShortMatchQuery()
	const allShorts = useGetShortMatchQuery()
	const teamsTour = useGetTeamsTournamentsByNameQuery({ name })
	const tourInfo = useGetTournamentByNameQuery({ name })

	let filterTours = [
		// "WinlineEpicStandoff2Season14_11_12_24",
		// "WinlineEpicStandoff2Season13_08_10_24",
		// "WinlineEpicStandoff2Season12_04_09_24",
		// "WinlineEpicStandoff2Season11_01_08_24",
		// "WinlineEpicStandoff2Season10_30_05_24",
		// "WinlineEpicStandoff2Season9_25_04_24",
		// "WinlineEpicStandoff2Season8_28_03_24",
		// "WinlineEpicStandoff2Season7_11_02_24",
		// "ScamOffBeeline_23_08_24",
		// "WinlineEpicStandoff2Major2_25_11_24",
		// "WinlineEpicStandoff2Major_10_07_24",
		// "GamesOfFuture_03_03_24",
		// 'Standoff2EPICAcademy2025Week1_17_03_25',
		// 'Standoff2EPICAcademy2025Week2_31_03_25',
		// 'Standoff2EPICAcademy2025Week3_28_04_25',
		// 'Standoff2EPICAcademy2025SpringFinals_28_05_25',
		// "WinlineEPICStandoff2PawPawEp1_24_06_25",
		// "WinlineEPICStandoff2CosmoMajor_04_06_25",
		// "WinlineEPICStandoff2CosmoCancriE_09_04_25",
		// "WinlineEPICStandoff2CosmoSaffar_04_03_25",
		// "RushVTBCUPPro_13_02_25",
		// "WinlineEPICStandoff2CosmoEarth_09_01_25",
	]

	let players_tournaments = calculatePlayersTopV2(name, props.stage, allPlayers, allMatches, teamsTour, tourInfo, allShortMatches, filterTours, allShorts)

	if (players_tournaments.length > 0) {
		return (
			<div className={classes.wrapperTopResult}>
				<div className={classes.wrapperTourInfo}>
					<div className={classes.rankoffAndNameEvent}>
						<div className={classes.logoRankoff}>
							<img src={`/images/DataInImage/NEW_DESIGN_2025/Logo_And_Name.svg`} alt="/" />
							<div className={classes.titleBanner}>ТОП 20 ИГРОКОВ</div>
						</div>
						<div className={classes.nameTour}>
							{players_tournaments[0].name_tour.toUpperCase()} {props.stage && props.stage.length > 0 && props.stage !== 'FULL' ? '[' + props.stage.toUpperCase() + ']' : ''}
						</div>
					</div>
					<div className={classes.logoTour}>
						<img src={`/images/LogoAndBannerTour/${players_tournaments[0].logo_tour}`} alt="/" />
					</div>
				</div>
				<div className={classes.topResult}>
					<div className={classes.wrapperPlayerTitle}>
						<div className={classes.playerTitle}>
							<div className={classes.dataNumberPlayerTitle}>#</div>
							<div className={classes.logoTeamTeam}>Team</div>
							<div className={classes.dataNicknamePlayerNickname}>Nickname</div>
							<div className={classes.dataFlagPlayerCountry}>CTR</div>
							<div className={classes.dataPlayerKd}>KD</div>
							<div className={classes.dataPlayerKpr}>KPR</div>
							<div className={classes.dataPlayerDpr}>DPR</div>
							<div className={classes.dataPlayerK}>K</div>
							<div className={classes.dataPlayerA}>A</div>
							<div className={classes.dataPlayerD}>D</div>
							<div className={classes.dataPlayerImpact}>Impact</div>
							<div className={classes.dataPlayerRating}>Rating</div>
							<div className={classes.dataPlayerW_rounds}>WR</div>
							<div className={classes.dataPlayerL_rounds}>LR</div>
							<div className={classes.dataPlayerMaps}>Maps</div>
						</div>
					</div>
					{players_tournaments.map((e, index) => {
						return (
							<div key={index} className={classes.wrapperPlayer}>
								<div className={classes.player}>
									<div className={classes.dataNumberPlayerTitle}>{++index}</div>
									<div className={classes.logoTeam}>
										<img src={`/images/LogoTeams/${e.logo_team}`} alt="/" />
									</div>
									<div className={classes.dataNicknamePlayerNickname}>{e.nickname}</div>
									<div className={classes.dataFlagPlayerCountry}>
										<CountryFlagPlayer nickname={e.nickname} width={'20px'} height={'13px'} margin={'0 0 0 5px'} />
									</div>
									<div
										className={classes.dataPlayerKd}
										style={{
											background: e.kd_p < 0.9 ? 'var(--red)' : e.kd_p > 1.05 ? 'var(--green)' : 'var(--yellow)',
											color: e.kd_p < 0.9 ? 'var(--redDark)' : e.kd_p > 1.05 ? 'var(--greenDark)' : 'var(--yellowDark)',
										}}>
										{e.kd_p}
									</div>
									<div
										className={classes.dataPlayerKpr}
										style={{
											background: e.kpr_p < 0.6 ? 'var(--red)' : e.kpr_p > 0.65 ? (e.kpr_p > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
											color: e.kpr_p < 0.6 ? 'var(--redDark)' : e.kpr_p > 0.65 ? (e.kpr_p > 0.7 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
										}}>
										{e.kpr_p}
									</div>
									<div
										className={classes.dataPlayerDpr}
										style={{
											background: e.dpr_p < 0.68 ? 'var(--green)' : e.dpr_p > 0.7 ? (e.dpr_p > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
											color: e.dpr_p < 0.68 ? 'var(--greenDark)' : e.dpr_p > 0.7 ? (e.dpr_p > 0.8 ? 'var(--redDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
										}}>
										{e.dpr_p}
									</div>
									<div className={classes.dataPlayerK}>{e.k}</div>
									<div className={classes.dataPlayerA}>{e.a}</div>
									<div className={classes.dataPlayerD}>{e.d}</div>
									<div
										className={classes.dataPlayerImpact}
										style={{
											background: e.impact_p < 1 ? 'var(--red)' : e.impact_p > 1 ? (e.impact_p >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
											color: e.impact_p < 1 ? 'var(--redDark)' : e.impact_p > 1 ? (e.impact_p >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
										}}>
										{e.impact_p}
									</div>
									<div
										className={classes.dataPlayerRating}
										style={{
											background: e.rating < 1 ? 'var(--red)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
											color: e.rating < 1 ? 'var(--redDark)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
										}}>
										{Math.round(e.rating * 100) / 100}
									</div>
									<div className={classes.dataPlayerW_rounds}>{e.w_rounds}</div>
									<div className={classes.dataPlayerL_rounds}>{e.l_rounds}</div>
									<div className={classes.dataPlayerMaps}>{e.maps}</div>
								</div>
							</div>
						)
					})}
				</div>
				<img src={`/images/DataInImage/NEW_DESIGN_2025/TOP_PLAYERS_TOUR_LONG.png`} className={classes.bgImg} alt="/" />
			</div>
		)
	}
}

export default TopPlayersTourResultLong
