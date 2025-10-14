import React from 'react'
import classes from './sideTop.module.css'
import {
	useGetMatchesQuery,
	useGetPlayersQuery,
	useGetShortMatchesByTournamentQuery,
	useGetShortMatchQuery,
	useGetTeamsTournamentsByNameQuery,
	useGetTeamsTournamentsQuery,
	useGetTournamentByNameQuery,
	useGetTournamentsQuery,
} from '../../../../store/api/apiSlice'
import { calculatePlayersTopV2 } from '../../../../Function/calculatePlayersTopV2'
import CountryFlagPlayer from '../../../../Function/countryFlagPlayer'
import Loader from '../../../UI/Loader/loader'

const RightTopResult = (props) => {
	let leftTop = props.leftTop
	const name = ''

	const allPlayers = useGetPlayersQuery()
	const allMatches = useGetMatchesQuery()
	const allShortMatches = useGetShortMatchQuery()
	const teamsTour = useGetTeamsTournamentsQuery()
	const tourInfo = useGetTournamentsQuery()

	let filterTours = [
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

		'WinlineEPICStandoff2PawPawEp5_29_09_25',
		// 'WinlineEPICStandoff2PawPawEp3_18_08_25',
		// 'WinlineEPICStandoff2CosmoBrasilCrux_31_02_25',
		// 'WinlineEPICStandoff2CosmoBrasilOctans_03_02_25',
		// 'UnitedNorthTournament_12_01_25',
		// 'NorthAmericanProLeague_17_06_25',
		// 'NorthAmericanProLeagueSeason2_14_09_25',
	]

	let players_tournaments = calculatePlayersTopV2(name, props.stage, allPlayers, allMatches, teamsTour, tourInfo, allShortMatches, filterTours)

	const diffPlayerPosition = (player_id, leftTop, currentPos) => {
		const positionLeft = leftTop.find((e) => e.player_id === player_id)?.position

		let diff = positionLeft - currentPos

		if (diff > 0) {
			return `+${diff}`
		} else if (diff < 0) {
			return `${diff}`
		} else if (diff === 0) {
			return ``
		} else {
			return `NEW`
		}
	}

	const playersWithIndex = players_tournaments?.map((item, index) => ({
		...item,
		position: index + 1,
	}))

	const isLoading = allPlayers.isLoading || allMatches.isLoading || allShortMatches.isLoading || teamsTour.isLoading || tourInfo.isLoading

	if (isLoading) {
		return <Loader />
	}

	if (playersWithIndex.length > 0) {
		return (
			<div className={classes.wrapperTopResult}>
				<div className={classes.wrapperTourInfo}>
					<div className={classes.nameTour}>{'ТОП 20 ИГРОКОВ epic pawpaw: ep.5'.toUpperCase()}</div>
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
							<div className={classes.dataPlayerImpact}>Impact</div>
							<div className={classes.dataPlayerRating}>Rating</div>
							<div className={classes.dataPlayerMaps}>Maps</div>
						</div>
					</div>
					<div className={classes.wrapperPlayer}>
						{playersWithIndex.map((e, index) => {
							if (index < 20) {
								return (
									<div key={index} className={classes.wrapperDiffPosition}>
										<div
											className={classes.diffPositionPlayer}
											style={{
												background: !diffPlayerPosition(e.player_id, leftTop, e.position)
													? ''
													: diffPlayerPosition(e.player_id, leftTop, e.position) === 'NEW'
													? 'var(--yellow)'
													: diffPlayerPosition(e.player_id, leftTop, e.position) > 0
													? 'var(--green)'
													: 'var(--red)',
											}}>
											{diffPlayerPosition(e.player_id, leftTop, e.position)}
										</div>
										<div className={classes.player}>
											<div className={classes.dataNumberPlayerTitle}>{e.position}</div>
											<div className={classes.logoTeam}>
												<img src={`/images/LogoTeams/${e.logo_team}`} alt="/" />
											</div>
											<div className={classes.dataNicknamePlayerNickname}>{e.nickname}</div>
											<div className={classes.dataFlagPlayerCountry}>
												<CountryFlagPlayer player_id={e.player_id} width={'20px'} height={'13px'} margin={'0 0 0 5px'} />
											</div>
											<div
												className={classes.dataPlayerKd}
												style={{
													background: e.kd_p < 0.9 ? 'var(--red)' : e.kd_p > 1.05 ? 'var(--green)' : 'var(--yellow)',
												}}>
												{e.kd_p}
											</div>
											<div
												className={classes.dataPlayerKpr}
												style={{
													background: e.kpr_p < 0.6 ? 'var(--red)' : e.kpr_p > 0.65 ? (e.kpr_p > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												}}>
												{e.kpr_p}
											</div>
											<div
												className={classes.dataPlayerDpr}
												style={{
													background: e.dpr_p < 0.68 ? 'var(--green)' : e.dpr_p > 0.7 ? (e.dpr_p > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
												}}>
												{e.dpr_p}
											</div>
											<div
												className={classes.dataPlayerImpact}
												style={{
													background: e.impact_p < 1 ? 'var(--red)' : e.impact_p > 1 ? (e.impact_p >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												}}>
												{e.impact_p}
											</div>
											<div
												className={classes.dataPlayerRating}
												style={{
													background: e.rating < 1 ? 'var(--red)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												}}>
												{e.rating}
											</div>
											<div className={classes.dataPlayerMaps}>{e.maps}</div>
										</div>
									</div>
								)
							}
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default RightTopResult
