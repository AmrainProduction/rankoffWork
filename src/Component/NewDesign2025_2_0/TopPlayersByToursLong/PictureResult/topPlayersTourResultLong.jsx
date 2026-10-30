import React, { useState } from 'react'
import classes from '../topPlayersByToursLong.module.css'
import { useGetMatchesQuery, useGetPlayersQuery, useGetShortMatchesByTournamentQuery, useGetShortMatchQuery, useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery } from '../../../../store/api/apiSlice'
import CountryFlagPlayer from '../../../../Function/countryFlagPlayer'
import { calculatePlayersTop } from '../../../../Function/calculatePlayersTop'
import { calculatePlayersTopV2 } from '../../../../Function/calculatePlayersTopV2'
import Loader from '../../../UI/Loader/loader'

const TopPlayersTourResultLong = (props) => {
	const name = props.name
	const [matches, setMatches] = useState([])

	const allPlayers = useGetPlayersQuery()
	const allMatches = useGetMatchesQuery()
	const allShortMatches = useGetShortMatchQuery()
	const teamsTour = useGetTeamsTournamentsByNameQuery({ name })
	const tourInfo = useGetTournamentByNameQuery({ name })

	const isLoading = allPlayers.isLoading || allMatches.isLoading || allShortMatches.isLoading || teamsTour.isLoading || tourInfo.isLoading

	if (isLoading) {
		return <Loader />
	}

	let filterTours = [
		// 'WINLINEEPICStandoff2JumbleRumbleSeason4_03_05_26',
		// 'WINLINEEPICStandoff2JumbleRumbleSeason3_30_03_26',
		// 'WINLINEEPICStandoff2JumbleRumbleSeason1_24_02_26',
		// 'Standoff2EPICAcademy2025SummerWeek3_11_09_25',
		// 'Standoff2EPICAcademy2025SummerWeek2_21_07_25',
		// 'Standoff2EPICAcademy2025SummerWeek1_30_06_25',
		// 'Standoff2EPICAcademy2025SummerFinals_27_08_25',
		// 'Standoff2EPICAcademy2025Week1_17_03_25',
		// 'Standoff2EPICAcademy2025Week2_31_03_25',
		// 'Standoff2EPICAcademy2025Week3_28_04_25',
		// 'Standoff2EPICAcademy2025SpringFinals_28_05_25',
		// 'WinlineEPICStandoff2CosmoEarth_09_01_25',
		// 'RushVTBCUPPro_13_02_25',
		// 'WinlineEPICStandoff2CosmoCancriE_09_04_25',
		// 'WinlineEPICStandoff2CosmoSaffar_04_03_25',
		// 'WinlineEPICStandoff2CosmoMajor_04_06_25',
		// 'WinlineEPICStandoff2PawPawEp1_24_06_25',
		// 'WinlineEPICStandoff2PawPawEp2_29_07_25',
		// 'WinlineEPICStandoff2PawPawEp4_09_09_25',
		// 'WinlineEPICStandoff2PawPawEp6_14_10_25',
		// 'WinlineEPICStandoff2PawPawMajor_19_11_25',
		// 'WINLINEEPICStandoff2NewYearBounty_08_12_25',
		// 'CONDRLeagueSeason1_30_09_25',
		// 'Standoff2NewYearCup_29_12_24',
		// 'WinlineEpicStandoff2Season14_11_12_24',
		// 'WinlineEpicStandoff2Major2_25_11_24',
		// 'WinlineEpicStandoff2Season13_08_10_24',
		// 'WinlineEpicStandoff2Season12_04_09_24',
		// 'ScamOffBeeline_23_08_24',
		// 'WinlineEpicStandoff2Season11_01_08_24',
		// 'WinlineEpicStandoff2Major_10_07_24',
		// 'WinlineEpicStandoff2Season10_30_05_24',
		// 'WinlineEpicStandoff2Season9_25_04_24',
		// 'WinlineEpicStandoff2Season8_28_03_24',
		// 'GamesOfFuture_03_03_24',
		// 'WinlineEpicStandoff2Season7_11_02_24',
		// 'VozwoodenRevialCupSeason1_17_01_24',
		// 'WinlineEpicStandoff2Season6_15_12_23',
		// 'WinlineEpicStandoff2Major_06_12_23',
		// 'WinlineEpicStandoff2Season5_17_11_23',
		// 'WinlineEpicMinor_28_10_23',
		// 'WinlineEpic_23_09_23',
		// 'Epic_02_09_23',
		// 'Epic_11_08_23',
		// 'MastersWay_28_07_23',
		// 'Epic_09_07_23',
		// 'Major_06_06_23',
		// 'GamesOfFuture_27_05_23',
		// 'Minor1_18_02_23',
		// 'MastersWay_24_12_22',
		// 'StudentTournament_13_12_22',
		// 'Major_13_09_22',
		// 'Minor2_25_07_22',
		// 'Minor1_15_06_22',
		// 'WinlineEPICStandoff2PawPawEp3_18_08_25',
		// 'WinlineEPICStandoff2CosmoBrasilCrux_31_02_25',
		// 'WinlineEPICStandoff2CosmoBrasilOctans_03_02_25',
		// 'UnitedNorthTournament_12_01_25',
		// 'NorthAmericanProLeague_17_06_25',
	]

	let players_tournaments = calculatePlayersTopV2(name, props.stage, allPlayers, allMatches, teamsTour, tourInfo, allShortMatches, filterTours)

	if (players_tournaments.length > 0) {
		return (
			<div className={classes.wrapperTopResult}>
				<div className={classes.wrapperTourInfo}>
					<div className={classes.logoRankoff}>
						<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/RANKOFF_LOGO.svg`} alt="/" />
						<div className={classes.titleBanner}>RANKOFF TOP PLAYERS</div>
					</div>
					<div className={classes.nameTourWrapper}>
						<div className={classes.nameTour}>
							{/* {'ТОП ИГРОКОВ первого ПОЛУГОДИЯ 2026 ГОДА до мажора'.toUpperCase()} */}
							{players_tournaments[0].name_tour.toUpperCase()} {props.stage && props.stage.length > 0 && props.stage !== 'FULL' ? '[' + props.stage.toUpperCase() + ']' : ''}
						</div>
					</div>
					<div className={classes.logoTour}>{filterTours.length > 0 ? '' : <img src={`/images/LogoAndBannerTour/${players_tournaments[0].logo_tour}`} alt="/" />}</div>
				</div>
				<div className={classes.topResult}>
					<div className={classes.wrapperPlayerTitle}>
						<div className={classes.playerTitle}>
							<div>#</div>
							<div>Team</div>
							<div>Nickname</div>
							<div>CTR</div>
							<div>KD</div>
							<div>KPR</div>
							<div>DPR</div>
							<div>K</div>
							<div>A</div>
							<div>D</div>
							<div>Impact</div>
							<div>Rating</div>
							<div>WR</div>
							<div>LR</div>
							<div>Maps</div>
						</div>
					</div>
					<div className={classes.wrapperPlayer}>
						{players_tournaments.map((e, index) => {
							if (index < 98) {
								return (
									<div key={index} className={classes.player}>
										<div className={classes.contnentCenter}>{++index}</div>
										<div className={classes.logoTeam}>
											<img src={`/images/LogoTeams/${e.logo_team}`} alt="/" />
										</div>
										<div className={classes.dataNicknamePlayerNickname}>
											<div className={classes.logoPlayer}>
												<img src={`/images/LogoPlayers/${e.logo_player}`} alt="/" />
											</div>
											<div className={classes.nickname}>{e.nickname}</div>
										</div>
										<div className={classes.contnentCenter}>
											<CountryFlagPlayer player_id={e.player_id} width={'20px'} height={'13px'} margin={'0 0 0 5px'} />
										</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.kd < 0.9 ? 'var(--red)' : e.kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
												// color: e.kd < 0.9 ? 'var(--redDark)' : e.kd > 1.05 ? 'var(--greenDark)' : 'var(--yellowDark)',
											}}>
											{e.kd}
										</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.kpr < 0.6 ? 'var(--red)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.kpr < 0.6 ? 'var(--redDark)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.kpr}
										</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.dpr < 0.68 ? 'var(--green)' : e.dpr > 0.7 ? (e.dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.dpr < 0.68 ? 'var(--greenDark)' : e.dpr > 0.7 ? (e.dpr > 0.8 ? 'var(--redDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.dpr}
										</div>
										<div className={classes.contnentCenter}>{e.k}</div>
										<div className={classes.contnentCenter}>{e.a}</div>
										<div className={classes.contnentCenter}>{e.d}</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.impact < 1 ? 'var(--red)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.impact < 1 ? 'var(--redDark)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.impact}
										</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.rating < 1 ? 'var(--red)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.rating < 1 ? 'var(--redDark)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.rating}
										</div>
										<div className={classes.contnentCenter}>{e.w_rounds}</div>
										<div className={classes.contnentCenter}>{e.l_rounds}</div>
										<div className={classes.contnentCenter}>{e.maps}</div>
									</div>
								)
							}
						})}
					</div>
				</div>
				<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/TOP_PLAYERS_TOUR_LONG.png`} className={classes.bgImg} alt="/" />
			</div>
		)
	}
}

export default TopPlayersTourResultLong
