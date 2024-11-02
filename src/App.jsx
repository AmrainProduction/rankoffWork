import React from "react"
import './App.css'
import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom"
import Layout from "./Component/Layout"
import {useEffect} from "react"
import ErrorPage from "./Component/errorPage"
import Functions from "./Component/Functions/functions"
import {
    useGetAllPlayersAllTournamentsQuery,
    useGetAwardsQuery,
    useGetAwardsTeamsByNameQuery,
    useGetCurrentRankingTeamsQuery,
    useGetMatchesQuery,
    useGetPlayersPointsQuery,
    useGetPlayersQuery,
    useGetPlayersTournamentsByNameTourQuery,
    useGetPlayersTournamentsByNickDescQuery,
    useGetPlayersTournamentsByNickQuery,
    useGetPlayersTournamentsQuery,
    useGetTeamsPointsQuery,
    useGetTeamsQuery,
    useGetTeamsTournamentsByNameQuery,
    useGetTeamsTournamentsQuery,
    useGetTournamentByNameQuery,
    useGetTournamentsQuery,
    useGetTransferTeamsPointsQuery,
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
import whatBirthday from "./Function/whatBirthday";
import TopPlayersByToursLong from "./Component/TopPlayersByToursLong/topPlayersByToursLong";
import formatDate from "./Function/transformDateDDMMYY";
import DigestMatch from "./Component/DigestMatch/digestMatch";
import JemmMatch from "./Component/jemmMatch/jemmMatch";
import StatsPlayerTour from "./Component/StatsPlayerTour/statsPlayerTour";
import AddMatches from "./Component/AddMatches/addMatches";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>} errorElement={<ErrorPage/>}>
        <Route index element={<ErrorPage/>}/>
        <Route path='i/MATCHES' element={<MatchPicture2/>}/>
        <Route path='i/FUNCTIONS' element={<Functions/>}/>
        <Route path='i/RESULT_MATCH' element={<MatchPicture2/>}/>
        <Route path='i/TOP_PLAYERS_TOUR' element={<TopPlayersTour/>}/>
        <Route path='i/MVP_PLAYER_TOUR' element={<PlayersTourMVP/>}/>
        <Route path='i/STATS_PLAYER_TOUR' element={<StatsPlayerTour/>}/>
        <Route path='i/PREDICTORS' element={<RankoffPredicts/>}/>
        <Route path='i/MATCHESDAY' element={<MatchesDay/>}/>
        <Route path='i/RANKING_TEAMS' element={<RankingTeams/>}/>
        <Route path='i/topYearPlayers' element={<TopYearPlayers/>}/>
        <Route path='i/topYearTeams' element={<TopYearTeams/>}/>
        <Route path='i/topMinorPlayers' element={<TopMinorPlayers/>}/>
        <Route path='i/RGG_RESULT_MATCH' element={<ResultMatchRGG/>}/>
        <Route path='NOOBS_MATCH_RESULT' element={<ResultMatchNoobs/>}/>
        <Route path='RGG_PREMATCH' element={<PrematchStatsTeams/>}/>
        <Route path='RGG_TOP_TOUR' element={<TopPlayersRGG/>}/>
        <Route path='DIGEST_MATCH' element={<DigestMatch/>}/>
        <Route path='JEMM_MATCH' element={<JemmMatch/>}/>
        <Route path='i/ADDMATCHES' element={<AddMatches/>}/>
        <Route path='i/EMOJI' element={<EmojiTeams/>}/>
        <Route path='i/TOP' element={<TopPlayersByTours/>}/> // топ игроков за несколько турниров сразу, надо в коде менять за какие
        <Route path='i/LONG_TOP' element={<TopPlayersByToursLong/>}/>
    </Route>
))

function App() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // let id = "198"
    // let nickname = "CraNkz"
    //
    // const playerTours = useGetPlayersTournamentsByNickQuery({id, nickname})
    //
    // console.log(playerTours?.data?.filter(e => !e.name_tour.toLowerCase().includes('rankoff')))


    return (
        <RouterProvider router={router}/>
    )
}

export default App
