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
import CompareTops from './Component/NewDesign2025 2.0/CompareTops/compareTops'
// import CompareTops from './Component/CompareTops/compareTops'
import CYBERSHOKE from './Component/CYBERSHOKE/CYBERSHOKE'
import TopPlayersBanner from './Component/RankoffAwards2024/TopPlayersBanner/topPlayersBanner'
import TopPlayersYear from './Component/RankoffAwards2024/TopPlayersByTours/topPlayersYear'
import TopTeamsBanner from './Component/RankoffAwards2024/TopTeamsBanner/topTeamsBanner'
import TopPlayersYearAllTours from './Component/RankoffAwards2024/TopPlayersAllEventsBanner/topPlayersBanner'
// import TopPlayersTour from './Component/NewDesign2025/TopPlayersTourV2/topPlayersTour'
import TopPlayersTour from './Component/NewDesign2025 2.0/TopPlayersTourV2/topPlayersTour'
import RankingTeams from './Component/NewDesign2025 2.0/RankingTeams/rankingTeams'
// import RankingTeams from './Component/NewDesign2025/RankingTeams/rankingTeams'
import PlayersTourMVP from './Component/NewDesign2025 2.0/PlayersTourMVP/playersTourMVP'
// import PlayersTourMVP from './Component/NewDesign2025/PlayersTourMVP/playersTourMVP'
import StatsPlayerTour from './Component/NewDesign2025/StatsPlayerTour/statsPlayerTour'
import RankoffPredicts from './Component/NewDesign2025 2.0/RankoffPredicts/rankoffPredicts'
// import RankoffPredicts from './Component/NewDesign2025/RankoffPredicts/rankoffPredicts'
import MatchesDay from './Component/NewDesign2025 2.0/MatchesDay/matchesDay'
// import MatchesDay from './Component/NewDesign2025/MatchesDay/matchesDay'
import MatchPicture2 from './Component/NewDesign2025 2.0/MatchResult/MatchPicture2'
// import MatchPicture2 from './Component/NewDesign2025/MatchResult/MatchPicture2'
import TopPlayersByToursLong from './Component/NewDesign2025/TopPlayersByToursLong/topPlayersByToursLong'
import EmojiPlayers from './Component/EmojiPlayers/emojiPlayers'
import EmojiEvents from './Component/EmojiEvents/emojiEvents'
import ComparePlayers from './Component/NewDesign2025 2.0/ComparePlayers/comparePlayers'
// import ComparePlayers from './Component/NewDesign2025/ComparePlayers/comparePlayers'
import UpdateRoster from './Component/NewDesign2025/UpdateRoster/updateRoster'
import { useGetMatchesQuery, useGetPlayersQuery, useGetTeamsTournamentsByNameQuery } from './store/api/apiSlice'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
			<Route index element={<ErrorPage />} />
			<Route path="i/TOP_PLAYERS_TOUR" element={<TopPlayersTour />} />
			<Route path="i/MATCHES" element={<MatchPicture2 />} />
			<Route path="i/FUNCTIONS" element={<Functions />} />
			<Route path="i/MVP_PLAYER_TOUR" element={<PlayersTourMVP />} />
			<Route path="i/RANKING_TEAMS" element={<RankingTeams />} />
			<Route path="i/STATS_PLAYER_TOUR" element={<StatsPlayerTour />} />
			<Route path="i/PREDICTORS" element={<RankoffPredicts />} />
			<Route path="i/MATCHESDAY" element={<MatchesDay />} />
			<Route path="i/COMPARE" element={<ComparePlayers />} />
			<Route path="i/COMPARE_TOPS" element={<CompareTops />} /> // сравнить два топа на одном баннере
			<Route path="i/ADDMATCHES" element={<AddMatches />} />
			<Route path="i/UPDATE_ROSTER" element={<UpdateRoster />} />
			<Route path="i/LONG_TOP" element={<TopPlayersByToursLong />} />
			<Route path="RA2024/topYearPlayers" element={<TopPlayersBanner />} />
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
		</Route>
	)
)

function App() {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return <RouterProvider router={router} />
}

export default App
