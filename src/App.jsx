import React from "react"
import './App.css'
import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom"
import Layout from "./Component/Layout"
import {useEffect} from "react"
import ErrorPage from "./Component/errorPage"
import Functions from "./Component/Functions/functions"
import {
    useGetAllPlayersAllTournamentsQuery,
    useGetMatchesQuery,
    useGetPlayersPointsQuery,
    useGetPlayersQuery,
    useGetPlayersTournamentsByNameTourQuery,
    useGetPlayersTournamentsQuery,
    useGetTeamsPointsQuery,
    useGetTeamsQuery,
    useGetTeamsTournamentsByNameQuery,
    useGetTeamsTournamentsQuery,
    useGetTournamentByNameQuery, useGetTransferTeamsPointsQuery,
    useGetTransferToTeamsPointsQuery
} from "./store/api/apiSlice"
import MatchPicture2 from "./Component/MatchPicture2/MatchPicture2"
import TopYearPlayers from "./Component/TopYearPlayers/TopYearPlayers"
import TopYearTeams from "./Component/TopYearTeams/TopYearTeams"
import ResultMatchNoobs from "./Component/MatchNoobsResult/resultMatchNoobs"
import ResultMatchRGG from "./Component/RGGTournament/MatchRGGResult/resultMatchRGG"
import PrematchStatsTeams from "./Component/RGGTournament/PrematchStatsTeams/prematchStatsTeams"
import TopPlayersRGG from "./Component/RGGTournament/RGGTopPlayers/topPlayersRGG"
import TopMinorPlayers from "./Component/TopMinorPlayers/topMinorPlayers"
import TopPlayersTour from "./Component/TopPlayersTour/topPlayersTour"
import RankoffPredicts from "./Component/RankoffPredicts/rankoffPredicts"
import PlayersTourMVP from "./Component/PlayersTourMVP/playersTourMVP"
import RankingTeams from "./Component/RankingTeams/rankingTeams"
import EmojiTeams from "./Component/EmojiTeams/emojiTeams"
import TopPlayersByTours from "./Component/TopPlayersByTours/topPlayersByTours"
import MatchesDay from "./Component/MatchesDay/matchesDay"

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>} errorElement={<ErrorPage/>}>
        <Route index element={<ErrorPage/>}/>
        <Route path='MATCHES' element={<MatchPicture2/>}/>
        <Route path='FUNCTIONS' element={<Functions/>}/>
        <Route path='RESULT_MATCH' element={<MatchPicture2/>}/>
        <Route path='TOP_PLAYERS_TOUR' element={<TopPlayersTour/>}/>
        <Route path='MVP_PLAYER_TOUR' element={<PlayersTourMVP/>}/>
        <Route path='PREDICT' element={<RankoffPredicts/>}/>
        <Route path='MATCHESDAY' element={<MatchesDay/>}/>
        <Route path='RANKING_TEAMS' element={<RankingTeams/>}/>
        <Route path='topYearPlayers' element={<TopYearPlayers/>}/>
        <Route path='topYearTeams' element={<TopYearTeams/>}/>
        <Route path='topMinorPlayers' element={<TopMinorPlayers/>}/>
        <Route path='RGG_RESULT_MATCH' element={<ResultMatchRGG/>}/>
        <Route path='NOOBS_MATCH_RESULT' element={<ResultMatchNoobs/>}/>
        <Route path='RGG_PREMATCH' element={<PrematchStatsTeams/>}/>
        <Route path='RGG_TOP_TOUR' element={<TopPlayersRGG/>}/>
        <Route path='EMOJI' element={<EmojiTeams/>}/>
        <Route path='TOP' element={<TopPlayersByTours/>}/> // топ игроков за несколько турниров сразу, надо в коде
        менять за какие
    </Route>
))

function App() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <RouterProvider router={router}/>
    )
}

export default App
