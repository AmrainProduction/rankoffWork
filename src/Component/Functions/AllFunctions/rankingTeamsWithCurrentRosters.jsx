import React from 'react'
import { useGetPlayersPointsQuery, useGetPlayersQuery, useGetPlayersTournamentsQuery, useGetTeamsPointsQuery, useGetTeamsQuery, useGetTeamsTournamentsQuery, useGetTransferTeamsPointsQuery } from '../../../store/api/apiSlice'
import CalculateCurrentPlayerPoints from '../../../Function/calculateCurrentPlayerPoints'
import CalculateCurrentTeamPoints from '../../../Function/calculateCurrentTeamPoints'
import GetCurrentDate from '../../../Function/getCurrentDate'
import WhatCountryTeam from '../../../Function/whatCountryTeam'
import classes from '../functions.module.css'
import exportFromJSON from 'export-from-json'
import CurrentCoefficientPoints from '../../../Function/currentCoefficientPoints'

const RankingTeamsWithCurrentRosters = () => {
	let res
	let teams = []
	let players = []
	let ranking = []

	const allPlayers = useGetPlayersQuery()
	const allTeams = useGetTeamsQuery()
	const allPlayersTours = useGetPlayersTournamentsQuery()
	const allTeamsTours = useGetTeamsTournamentsQuery()
	const playersPoints = useGetPlayersPointsQuery()
	const teamsPoints = useGetTeamsPointsQuery()
	const transferTeamsPoints = useGetTransferTeamsPointsQuery()

	const onExportLocal = (data) => {
		const fileName = `ranking_${GetCurrentDate()}`
		const exportType = exportFromJSON.types.csv
		exportFromJSON({ data, fileName, exportType, delimiter: ';' })
	}

	if (
		playersPoints.data &&
		playersPoints.data.length &&
		teamsPoints.data &&
		teamsPoints.data.length > 0 &&
		allPlayers.data &&
		allPlayers.data.length > 0 &&
		transferTeamsPoints.data &&
		transferTeamsPoints.data.length > 0 &&
		allPlayersTours.data &&
		allPlayersTours.data.length > 0 &&
		allTeamsTours.data &&
		allTeamsTours.data.length > 0
	) {
		// let tempPlayersPoints = playersPoints.data.filter(e =>
		//     e.event_id !== "WinlineEPICStandoff2CosmoSaffar_04_03_25" &&
		//     e.event_id !== "WinlineEPICStandoff2CosmoEarth_09_01_25" &&
		//     e.event_id !== "WinlineEpicStandoff2Season14_11_12_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season14CloseQuals_09_12_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Major2_25_11_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Major2ClosedQuals_05_11_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season13_08_10_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season12_04_09_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season12_04_09_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season11_01_08_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Major_10_07_24" &&
		//     e.event_id !== "WinlineEpicStandoff2MajorClosedQuals_21_06_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season10_30_05_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season10CloseQuals_27_05_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season9_25_04_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season9ClosedQuals_22_04_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season8_28_03_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season8ClosedQuals_25_03_24"
		// )
		// let tempTeamsPoints = teamsPoints.data.filter(e =>
		//     e.event_id !== "WinlineEPICStandoff2CosmoSaffar_04_03_25" &&
		//     e.event_id !== "WinlineEPICStandoff2CosmoEarth_09_01_25" &&
		//     e.event_id !== "WinlineEpicStandoff2Season14_11_12_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season14CloseQuals_09_12_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Major2_25_11_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Major2ClosedQuals_05_11_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season13_08_10_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season12_04_09_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season12_04_09_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season11_01_08_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Major_10_07_24" &&
		//     e.event_id !== "WinlineEpicStandoff2MajorClosedQuals_21_06_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season10_30_05_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season10CloseQuals_27_05_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season9_25_04_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season9ClosedQuals_22_04_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season8_28_03_24" &&
		//     e.event_id !== "WinlineEpicStandoff2Season8ClosedQuals_25_03_24"
		// )

		// посчитали текушие поинты всем игрокам

		allPlayers.data.map((player) => {
			players.push({
				player_id: player.player_id,
				nickname: player.nickname,
				logo_player: player.logo_player,
				points: CalculateCurrentPlayerPoints(playersPoints.data.filter((e) => e.player_id === player.player_id)),
			})
		})

		// сколько очков у конкретного игрока
		// let t = 0

		// players
		// 	.filter((e) => e.player_id === 14 || e.player_id === 277 || e.player_id === 25 || e.player_id === 29 || e.player_id === 244)
		// 	.map((e) => {
		// 		console.log(e.points)
		// 		t += e.points
		// 	})

		// console.log(t)

		// посчитали текушие поинты всем командам

		let delTeams = []
		let approvedTeams = []
		let transfers = []

		// удалили очки командам, которые перешли под другую организацию
		transferTeamsPoints.data.map((e1) => {
			delTeams.push(e1.from_team_id)
			transfers.push({
				team_id: e1.to_team_id,
				name_team: e1.to_name_team,
				event_id: e1.event_id,
				points: e1.points,
				date_accepted_points: e1.date_transfer_points,
				description: '',
			})
		})

		// удаляем дубликаты из массива айдишников уже несуществующих команд
		delTeams = delTeams.filter((item, index) => delTeams.indexOf(item) === index)

		teamsPoints.data
			.filter((team) => !delTeams.includes(team.team_id))
			.map((e) => {
				approvedTeams.push(e)
			})

		//совмещаем трансферные очки с очками команд
		approvedTeams = approvedTeams.concat(transfers)

		// allTeams.data
		// 	.filter((team) => !delTeams.includes(team.team_id))
		// 	.map((team) => {
		// 		teams.push({
		// 			name_team: team.name_team,
		// 			logo_team: team.logo_team,
		// 			team_id: team.team_id,
		// 			points: CalculateCurrentTeamPoints(approvedTeams.filter((e) => e.team_id === team.team_id)),
		// 		})
		// 	})

		allTeams.data.map((team) => {
			teams.push({
				name_team: team.name_team,
				logo_team: team.logo_team,
				team_id: team.team_id,
				points: CalculateCurrentTeamPoints(approvedTeams.filter((e) => e.team_id === team.team_id)),
			})
		})

		// теперь для каждой команды собираем ее состав согласно последнему сыгранному турниру и суммируем все очки
		teams.map((team) => {
			let rosterTeam = allTeams.data.filter((e) => team.team_id === e.team_id)
			let playersInfo = allPlayers.data.filter((e) => team.team_id === e.team_id)

			let allPlayersPoints = 0

			if (playersInfo.length > 0) {
				rosterTeam.map((e1) => {
					players.map((e2) => {
						if (e2.player_id === e1.player_1_id || e2.player_id === e1.player_2_id || e2.player_id === e1.player_3_id || e2.player_id === e1.player_4_id || e2.player_id === e1.player_5_id) {
							allPlayersPoints += +e2.points.toFixed(1)
						}
					})
				})

				ranking.push({
					name_team: team.name_team,
					logo_team: team.logo_team,
					team_id: team.team_id,
					points_team: +team.points.toFixed(0) + +allPlayersPoints.toFixed(0),
					country_team: WhatCountryTeam(allPlayers.data, playersInfo[0]?.nickname, playersInfo[1]?.nickname, playersInfo[2]?.nickname, playersInfo[3]?.nickname, playersInfo[4]?.nickname),
					start_date: '',
					end_date: GetCurrentDate(),
					position_team: 0,
					player1: playersInfo[0]?.nickname ? playersInfo[0]?.nickname : '',
					player2: playersInfo[1]?.nickname ? playersInfo[1]?.nickname : '',
					player3: playersInfo[2]?.nickname ? playersInfo[2]?.nickname : '',
					player4: playersInfo[3]?.nickname ? playersInfo[3]?.nickname : '',
					player5: playersInfo[4]?.nickname ? playersInfo[4]?.nickname : '',
					player1_id: playersInfo[0]?.player_id ? playersInfo[0]?.player_id : '',
					player2_id: playersInfo[1]?.player_id ? playersInfo[1]?.player_id : '',
					player3_id: playersInfo[2]?.player_id ? playersInfo[2]?.player_id : '',
					player4_id: playersInfo[3]?.player_id ? playersInfo[3]?.player_id : '',
					player5_id: playersInfo[4]?.player_id ? playersInfo[4]?.player_id : '',
					logo_player1: playersInfo[0]?.logo_player ? playersInfo[0]?.logo_player : 'PlayerDefaultLogo.png',
					logo_player2: playersInfo[1]?.logo_player ? playersInfo[1]?.logo_player : 'PlayerDefaultLogo.png',
					logo_player3: playersInfo[2]?.logo_player ? playersInfo[2]?.logo_player : 'PlayerDefaultLogo.png',
					logo_player4: playersInfo[3]?.logo_player ? playersInfo[3]?.logo_player : 'PlayerDefaultLogo.png',
					logo_player5: playersInfo[4]?.logo_player ? playersInfo[4]?.logo_player : 'PlayerDefaultLogo.png',
				})
			}
		})

		ranking = ranking.sort((a, b) => b.points_team - a.points_team)
		ranking.map((e, index) => {
			e.position_team = index + 1
		})
		// console.log(ranking)
		res = JSON.stringify(ranking)

		return (
			<div className={classes.wrapperStatsPlayersTour}>
				<div className={classes.actionButtons}>
					<div
						className={classes.tour}
						onClick={(e) => {
							navigator.clipboard.writeText(res.length > 0 ? res : '').then(
								() => {
									console.log('Copy good')
								},
								() => {
									console.log('Fail copy')
								},
							)
						}}>
						Copy
					</div>
					<div className={classes.tour} onClick={() => onExportLocal(ranking)}>
						Download CSV
					</div>
				</div>
				<div className={classes.resultCommand}>{res.length > 0 ? res : ''}</div>
			</div>
		)
	}
}

export default RankingTeamsWithCurrentRosters
