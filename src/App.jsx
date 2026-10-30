import React from 'react'
import './App.css'
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom'
import Layout from './Component/Layout'
import { useEffect } from 'react'
import ErrorPage from './Component/errorPage'
import Functions from './Component/Functions/functions'
import ResultMatchRGG from './Component/RGGTournament/MatchRGGResult/resultMatchRGG'
import TopMinorPlayers from './Component/TopMinorPlayers/topMinorPlayers'
import EmojiTeams from './Component/EmojiTeams/emojiTeams'
import TopPlayersByTours from './Component/TopPlayersByTours/topPlayersByTours'
import DigestMatch from './Component/DigestMatch/digestMatch'
import JemmMatch from './Component/jemmMatch/jemmMatch'
import AddMatches from './Component/AddMatches/addMatches'
import AddMatchesForClient from './Component/AddMatchesForClient/AddMatchesForClient'
import CompareTops from './Component/NewDesign2025_2_0/CompareTops/compareTops'
// import CompareTops from './Component/CompareTops/compareTops'
import CYBERSHOKE from './Component/CYBERSHOKE/CYBERSHOKE'
import TopPlayersBanner from './Component/RankoffAwards2024/TopPlayersBanner/topPlayersBanner'
import TopPlayersYear from './Component/RankoffAwards2024/TopPlayersByTours/topPlayersYear'
import TopTeamsBanner from './Component/RankoffAwards2024/TopTeamsBanner/topTeamsBanner'
import TopPlayersYearAllTours from './Component/RankoffAwards2024/TopPlayersAllEventsBanner/topPlayersBanner'
// import TopPlayersTour from './Component/NewDesign2025/TopPlayersTourV2/topPlayersTour'
import TopPlayersTour from './Component/NewDesign2025_2_0/TopPlayersTourV2/topPlayersTour'
import RankingTeams from './Component/NewDesign2025_2_0/RankingTeams/rankingTeams'
// import RankingTeams from './Component/NewDesign2025/RankingTeams/rankingTeams'
import PlayersTourMVP from './Component/NewDesign2025_2_0/PlayersTourMVP/playersTourMVP'
// import PlayersTourMVP from './Component/NewDesign2025/PlayersTourMVP/playersTourMVP'
import StatsPlayerTour from './Component/NewDesign2025_2_0/StatsPlayerTour/statsPlayerTour'
// import StatsPlayerTour from './Component/NewDesign2025/StatsPlayerTour/statsPlayerTour'
import RankoffPredicts from './Component/NewDesign2025_2_0/RankoffPredicts/rankoffPredicts'
// import RankoffPredicts from './Component/NewDesign2025/RankoffPredicts/rankoffPredicts'
import MatchesDay from './Component/NewDesign2025_2_0/MatchesDay/matchesDay'
// import MatchesDay from './Component/NewDesign2025/MatchesDay/matchesDay'
import MatchPicture2 from './Component/NewDesign2025_2_0/MatchResult/MatchPicture2'
// import MatchPicture2 from './Component/NewDesign2025/MatchResult/MatchPicture2'
import TopPlayersByToursLong from './Component/NewDesign2025_2_0/TopPlayersByToursLong/topPlayersByToursLong'
// import TopPlayersByToursLong from './Component/NewDesign2025/TopPlayersByToursLong/topPlayersByToursLong'
import EmojiPlayers from './Component/EmojiPlayers/emojiPlayers'
import EmojiEvents from './Component/EmojiEvents/emojiEvents'
import ComparePlayers from './Component/NewDesign2025_2_0/ComparePlayers/comparePlayers'
// import ComparePlayers from './Component/NewDesign2025/ComparePlayers/comparePlayers'
import UpdateRoster from './Component/NewDesign2025/UpdateRoster/updateRoster'
import AddTeamsTour from './Component/NewDesign2025_2_0/AddTeamsTour/addTeamsTour'
import AddShortMatches from './Component/NewDesign2025_2_0/AddShortMatches/addShortMatches'
import RCLMatchResult from './Component/NewDesign2025_2_0/RCLMatchResult/RCLMatchResult'
import RequireAdmin from './Component/AdminAccess/requireAdmin'
import AdminsPage from './Component/AdminAccess/adminsPage'
import AccountPage from './Component/AdminAccess/accountPage'
import AuditLogPage from './Component/AdminAccess/auditLogPage'
import AdminHome from './Component/AdminAccess/adminHome'
import { PlayersPage, TeamsPage, TournamentsPage } from './Component/AdminEntities/entityPages'
import PollsAdmin from './Component/NewDesign2025_2_0/PollsAdmin/pollsAdmin'
import {
	useGetAwardsQuery,
	useGetMatchesByNameTourQuery,
	useGetMatchesNecessaryPlayerQuery,
	useGetMatchesQuery,
	useGetPlayersQuery,
	useGetPlayersTournamentsByNickDescQuery,
	useGetPlayersTournamentsByNickQuery,
	useGetPlayersTournamentsQuery,
	useGetShortMatchQuery,
	useGetTeamsQuery,
	useGetTeamsTournamentsByNameQuery,
	useGetTeamsTournamentsQuery,
	useGetTournamentsQuery,
} from './store/api/apiSlice'
import MetricsPlayer from './Component/NewDesign2025_2_0/MetricsPlayer/metricsPlayer'
import { all } from 'axios'
import Kpr from './Component/Formulas/kpr'
import Dpr from './Component/Formulas/dpr'
import Rating from './Component/Formulas/rating'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
			<Route index element={<ErrorPage />} />
			<Route element={<RequireAdmin />}>
				<Route path="a" element={<AdminHome />} />
				<Route path="a/TOP_PLAYERS_TOUR" element={<TopPlayersTour />} />
				<Route path="a/MATCHES" element={<MatchPicture2 />} />
				<Route path="a/FUNCTIONS" element={<Functions />} />
				<Route path="a/MVP_PLAYER_TOUR" element={<PlayersTourMVP />} />
				<Route path="a/RANKING_TEAMS" element={<RankingTeams />} />
				<Route path="a/STATS_PLAYER_TOUR" element={<StatsPlayerTour />} />
				<Route path="a/METRICS_PLAYER" element={<MetricsPlayer />} />
				<Route path="a/PREDICTORS" element={<RankoffPredicts />} />
				<Route path="a/MATCHESDAY" element={<MatchesDay />} />
				<Route path="a/COMPARE_PLAYERS" element={<ComparePlayers />} />
				<Route path="a/COMPARE_TOPS" element={<CompareTops />} /> // сравнить два топа на одном баннере
				<Route path="a/ADDMATCHES" element={<AddMatches />} />
				<Route path="a/TOURNAMENT_MATCHES" element={<AddMatchesForClient />} />
				<Route path="a/UPDATE_ROSTER" element={<UpdateRoster />} />
				<Route path="a/ADD_TEAMS_TOUR" element={<AddTeamsTour />} />
				<Route path="a/ADD_SHORT_MATCHES" element={<AddShortMatches />} />
				<Route path="a/RCL/MATCHES_STATS" element={<RCLMatchResult />} />
				<Route path="a/POLLS" element={<PollsAdmin />} />
				<Route path="a/LONG_TOP" element={<TopPlayersByToursLong />} />
				<Route path="RA2025/TOP_YEAR_PLAYERS" element={<TopPlayersBanner />} />
				<Route path="RA2024/topYearTeams" element={<TopTeamsBanner />} />
				<Route path="RA2024/TOP_YEAR_ALL_EVENTS" element={<TopPlayersYearAllTours />} /> // топ игроков за несколько турниров сразу, надо в коде
				<Route path="i/topMinorPlayers" element={<TopMinorPlayers />} />
				<Route path="i/RGG_RESULT_MATCH" element={<ResultMatchRGG />} />
				<Route path="DIGEST_MATCH" element={<DigestMatch />} />
				<Route path="JEMM_MATCH" element={<JemmMatch />} />
				<Route path="i/CYBERSHOKE" element={<CYBERSHOKE />} />
				<Route path="i/EMOJI" element={<EmojiTeams />} />
				<Route path="i/EMOJI_PLAYERS" element={<EmojiPlayers />} />
				<Route path="i/EMOJI_EVENTS" element={<EmojiEvents />} />
				<Route path="i/TOP_YEAR" element={<TopPlayersYear />} /> // топ игроков за несколько турниров сразу, надо в коде
				<Route path="i/TOP" element={<TopPlayersByTours />} /> // топ игроков за несколько турниров сразу, надо в коде менять за какие
				<Route path="a/ADMINS" element={<AdminsPage />} />
				<Route path="a/ACCOUNT" element={<AccountPage />} />
				<Route path="a/LOGS" element={<AuditLogPage />} />
				<Route path="a/PLAYERS" element={<PlayersPage />} />
				<Route path="a/TEAMS" element={<TeamsPage />} />
				<Route path="a/TOURNAMENTS" element={<TournamentsPage />} />
			</Route>
		</Route>,
	),
)

function App() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	// let allMatchesRevers = []
	// let necessaryPlayers = []
	// let res = []
	// let resTeams = []
	// let maxScore = []
	// let name = 'WINLINEEPICStandoff2JumbleRumbleMajorCQ_04_07_26'

	// const allMatches = useGetMatchesQuery()
	// const allShortMatches = useGetShortMatchQuery()
	// const teamsTour = useGetTeamsTournamentsByNameQuery({ name })
	// const allPlayers = useGetPlayersQuery()

	// const AVG = (arr) => {
	// 	console.log('AVG')
	// 	let i = 0

	// 	arr.map((e) => {
	// 		i += +e
	// 	})

	// 	return (i / arr.length).toFixed(2)
	// }

	// const MAX = (arr) => {
	// 	console.log('MAX')
	// 	let max = 0

	// 	arr.map((e) => {
	// 		if (e > 0) {
	// 			max = e
	// 		}
	// 	})

	// 	return max * 2
	// }

	// let newArrTeams = []

	// const pointForStage = (stage) => {
	// 	console.log('pointForStage')
	// 	if (stage.toLowerCase().includes('final')) {
	// 		return 200
	// 	} else if (stage.toLowerCase().includes('playoff')) {
	// 		return 100
	// 	} else if (stage.toLowerCase().includes('group')) {
	// 		return -200
	// 	} else {
	// 		return 0
	// 	}
	// }

	// const matchesPlayerVSPlayer = (matches, shortMatches, player1, player2) => {
	// 	console.log('matchesPlayerVSPlayer')
	// 	let scorePlayer = []

	// 	matches
	// 		.filter(
	// 			(e) =>
	// 				e.name_tour_for_sort.slice(-2) === '26' &&
	// 				(e.t1p1_id === player1.player_id || e.t1p2_id === player1.player_id || e.t1p3_id === player1.player_id || e.t1p4_id === player1.player_id || e.t1p5_id === player1.player_id) &&
	// 				(e.t2p1_id === player2.player_id || e.t2p2_id === player2.player_id || e.t2p3_id === player2.player_id || e.t2p4_id === player2.player_id || e.t2p5_id === player2.player_id),
	// 		)
	// 		.map((e, index) => {
	// 			if (index <= 150) {
	// 				scorePlayer.push({
	// 					player_id: player1.player_id,
	// 					nickname: player1.nickname,
	// 					score: e.total_r_team1 - e.total_r_team2 + pointForStage(shortMatches.filter((el) => el.name_match_for_sort === e.name_match_for_sort)[0]?.name_stage),
	// 					team: player1.team,
	// 					team_id: player1.team_id,
	// 				})
	// 			}
	// 		})

	// 	matches
	// 		.filter(
	// 			(e) =>
	// 				e.name_tour_for_sort.slice(-2) === '26' &&
	// 				(e.t1p1_id === player2.player_id || e.t1p2_id === player2.player_id || e.t1p3_id === player2.player_id || e.t1p4_id === player2.player_id || e.t1p5_id === player2.player_id) &&
	// 				(e.t2p1_id === player1.player_id || e.t2p2_id === player1.player_id || e.t2p3_id === player1.player_id || e.t2p4_id === player1.player_id || e.t2p5_id === player1.player_id),
	// 		)
	// 		.map((e, index) => {
	// 			if (index <= 150) {
	// 				scorePlayer.push({
	// 					player_id: player1.player_id,
	// 					nickname: player1.nickname,
	// 					score: e.total_r_team2 - e.total_r_team1 + pointForStage(shortMatches.filter((el) => el.name_match_for_sort === e.name_match_for_sort)[0]?.name_stage),
	// 					team: player1.team,
	// 					team_id: player1.team_id,
	// 				})
	// 			}
	// 		})
	// 	console.log(scorePlayer)
	// 	return scorePlayer
	// }

	// if (allMatches.data && allMatches.data.length > 0 && allShortMatches.data && allShortMatches.data.length > 0 && teamsTour.data && teamsTour.data.length > 0 && allPlayers.data && allPlayers.data.length > 0) {
	// 	let score = []

	// 	// настройки для плей-оффа
	// 	teamsTour.data.map((team) => {
	// 		if (team.team_id !== 71) {
	// 			newArrTeams.push(team)
	// 		}
	// 	})

	// 	allMatchesRevers = [...allMatches.data].reverse()

	// 	newArrTeams.map((team) => {
	// 		allPlayers.data.map((player) => {
	// 			if (team.team_id === player.team_id) {
	// 				necessaryPlayers.push({
	// 					player_id: player.player_id,
	// 					nickname: player.nickname,
	// 					team: player.team,
	// 					team_id: player.team_id,
	// 				})
	// 			}
	// 		})
	// 	})

	// 	necessaryPlayers.map((e1, index) => {
	// 		necessaryPlayers.map((e2) => {
	// 			if (e1.player_id !== e2.player_id && e1.team_id !== e2.team_id) {
	// 				matchesPlayerVSPlayer(allMatchesRevers, allShortMatches.data, e1, e2).map((e) => {
	// 					score.push(e.score)
	// 				})

	// 				if (!isNaN(AVG(score))) {
	// 					res[index] = {
	// 						player_id: e1.player_id,
	// 						nickname: e1.nickname,
	// 						score: AVG(score),
	// 						team: e1.team,
	// 						team_id: e1.team_id,
	// 					}
	// 				}
	// 			}
	// 		})
	// 		score = []
	// 	})

	// 	newArrTeams.map((team, index) => {
	// 		res.filter((e) => e.team_id === team.team_id).map((player) => {
	// 			score.push(player.score)
	// 		})

	// 		if (!isNaN(AVG(score))) {
	// 			resTeams[index] = {
	// 				team_id: team.team_id,
	// 				team: team.name_team,
	// 				score: +AVG(score),
	// 			}
	// 		}

	// 		score = []
	// 	})

	// 	resTeams.map((e) => {
	// 		maxScore.push(Math.abs(e.score))
	// 	})
	// 	console.log(resTeams)
	// 	for (let i = 0; i < resTeams.length; i++) {
	// 		resTeams[i].score = +resTeams[i].score + +MAX(maxScore)
	// 	}

	// 	// функция, убирающая отрицательные показатели очков
	// 	const toPositive = (data) => {
	// 		let diff = 0

	// 		//находим минимальное значение
	// 		data.map((e) => {
	// 			if (+e.score < diff) {
	// 				diff = +e.score
	// 			}
	// 		})

	// 		//заменяем отрицательные значения
	// 		data.map((e) => {
	// 			e.score = +e.score + Math.abs(diff) * 1.2
	// 		})

	// 		return data
	// 	}

	// 	// Функция для вычисления доли в процентах для каждого показателя
	// 	function calculatePercentageShares(data) {
	// 		const totalScore = data.reduce((acc, obj) => +acc + +obj.score, 0)

	// 		for (let i = 0; i < data.length; i++) {
	// 			data[i].score = ((+data[i].score / +totalScore) * 100).toFixed(2)
	// 		}

	// 		return data
	// 	}
	// 	console.log('2')
	// 	console.log(resTeams)
	// 	const percentageShares = calculatePercentageShares(toPositive(resTeams))

	// 	console.log(percentageShares.sort((a, b) => b.score - a.score))
	// }

	// ЛУЧШИЕ ПО РЕЙТИНГУ КАРТЫ ИГРОКА

	// const name = 'Hi-Lo'
	// const numberPlayer = [1, 2, 3, 4, 5]
	// const numberTeam = [1, 2]
	// let res = []
	// const players = useGetMatchesNecessaryPlayerQuery({ name })

	// players?.data?.map((e) => {
	// 	numberTeam.forEach((team) => {
	// 		numberPlayer.forEach((player) => {
	// 			if (e[`t${team}p${player}`] === name) {
	// 				res.push({
	// 					rating: e[`t${team}p${player}_rating`],
	// 					date: e.db_date_match,
	// 					match: e.name_match_for_sort,
	// 					map: e.map,
	// 				})
	// 			}
	// 		})
	// 	})
	// })

	// console.log(res.sort((b, a) => b.rating - a.rating))

	// players?.data?.map((e) => {
	// 	if ([58, 81, 122, 57, 82, 136, 60, 84, 173, 176, 12, 5, 161, 170, 102].includes(e.team_id)) {
	// 		res.push({
	// 			player_id: e.player_id,
	// 			nickname: e.nickname,
	// 			logo_player: e.logo_player,
	// 			name: e.name,
	// 			surname: e.surname,
	// 			date_birth: e.date_birth,
	// 			country_flag: e.country_flag,
	// 			team: e.team,
	// 			logo_team: e.logo_team,
	// 		})
	// 	}
	// })

	// console.log(res)

	return <RouterProvider router={router} />
}

export default App
