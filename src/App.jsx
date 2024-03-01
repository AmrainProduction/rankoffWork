import React from "react";
import './App.css';
import {createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom";
import Content from "./Component/Content/content";
import Layout from "./Component/Layout";
import {useEffect} from "react";
import ErrorPage from "./Component/errorPage";
import MatchPicture from "./Component/MatchPicture/MatchPicture";
import Functions from "./Component/Functions/functions";
import {
    useGetAllPlayersAllTournamentsQuery,
    useGetMatchesQuery,
    useGetPlayersQuery,
    useGetPlayersTournamentsByNameTourQuery, useGetPlayersTournamentsQuery,
    useGetTeamsQuery, useGetTeamsTournamentsByNameQuery, useGetTeamsTournamentsQuery, useGetTournamentByNameQuery
} from "./store/api/apiSlice";
import Nir2 from "./Component/NIR2/nir_2";
import Nir21 from "./Component/NIR2/nir_2_1";
import MatchPicture2 from "./Component/MatchPicture2/MatchPicture2";
import TopYearPlayers from "./Component/TopYearPlayers/TopYearPlayers";
import TopYearTeams from "./Component/TopYearTeams/TopYearTeams";
import ResultMatchNoobs from "./Component/MatchNoobsResult/resultMatchNoobs";
import ResultMatchRGG from "./Component/RGGTournament/MatchRGGResult/resultMatchRGG";
import PrematchStatsTeams from "./Component/RGGTournament/PrematchStatsTeams/prematchStatsTeams";
import TopPlayersRGG from "./Component/RGGTournament/RGGTopPlayers/topPlayersRGG";
import TopMinorPlayers from "./Component/TopMinorPlayers/topMinorPlayers";
import TopPlayersTour from "./Component/TopPlayersTour/topPlayersTour";
import RankoffPredicts from "./Component/RankoffPredicts/rankoffPredicts";
import PlayersTourMVP from "./Component/PlayersTourMVP/playersTourMVP";
import TopPlayersTourML from "./Component/MOBLIVE_TopPlayersTour/topPlayersTourML";
import RankingTeams from "./Component/RankingTeams/rankingTeams";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>} errorElement={<ErrorPage/>}>
        <Route index element={<MatchPicture2/>}/>
        <Route path='functions' element={<Functions/>}/>
        <Route path='RESULT_MATCH' element={<MatchPicture2/>}/>
        <Route path='TOP_PLAYERS_TOUR' element={<TopPlayersTour/>}/>
        <Route path='MVP_PLAYER_TOUR' element={<PlayersTourMVP/>}/>
        <Route path='PREDICT' element={<RankoffPredicts/>}/>
        <Route path='RANKING_TEAMS' element={<RankingTeams/>}/>
        <Route path='nir' element={<Nir2/>}/>
        <Route path='nir2' element={<Nir21/>}/>
        <Route path='topYearPlayers' element={<TopYearPlayers/>}/>
        <Route path='topYearTeams' element={<TopYearTeams/>}/>
        <Route path='topMinorPlayers' element={<TopMinorPlayers/>}/>
        <Route path='NOOBS_RESULT_MATCH' element={<ResultMatchNoobs/>}/>
        <Route path='RGG_RESULT_MATCH' element={<ResultMatchRGG/>}/>
        <Route path='RGG_PREMATCH' element={<PrematchStatsTeams/>}/>
        <Route path='RGG_TOP_TOUR' element={<TopPlayersRGG/>}/>
    </Route>
))

function App() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <RouterProvider router={router}/>
    );
}

export default App;
