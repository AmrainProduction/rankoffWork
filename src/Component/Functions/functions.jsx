import React, {useState} from 'react';
import classes from './functions.module.css'
import AllStatsPlayersLastTour from "./AllFunctions/allStatsPlayersLastTour";
import StatsPlayersNecessaryTour from "./AllFunctions/statsPlayersNecessaryTour";
import StatsTeamsNecessaryTour from "./AllFunctions/statsTeamsNecessaryTour";
import CurrentTeamsPlayers from "./AllFunctions/сurrentTeamsPlayers";
import RosterTeamFromNecessaryTour from "./AllFunctions/rosterTeamFromNecessaryTour";
import CalculateRankingPointsTeams from "./AllFunctions/calculateRankingPointsTeams";
import CalculateRankingPointsPlayers from "./AllFunctions/calculateRankingPointsPlayers";
import CalculateCurrentPlayerPoints from "../../Function/calculateCurrentPlayerPoints";
import RankingTeamsWhereRostersFromLastTour from "./AllFunctions/rankingTeamsWhereRostersFromLastTour";
import RankingTeamsWithCurrentRosters from "./AllFunctions/rankingTeamsWithCurrentRosters";
import AllPlayers from "./AllFunctions/allPlayers";
import AllTeams from "./AllFunctions/allTeams";
import GiveAwardsPlayersAndTeams from "./AllFunctions/giveAwardsPlayersAndTeams";
import Kpr from "../Formulas/kpr";
import Dpr from "../Formulas/dpr";
import Rating from "../Formulas/rating";

const Functions = () => {

    const [choiceFunc, setChoiceFunc] = useState([])


    return (
        <div className={classes.wrapperContent}>
            <div className={classes.wrapperListCommands}>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('StatsPlayersFromNecessaryTour')
                }}>
                    Статистика всех игроков выбранного турнира
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('StatsTeamsNecessaryTour')
                }}>
                    Статистика всех команд выбранного турнира
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('AllStatsPlayersLastTour')
                }}>
                    Статистика игроков с последнего турнира за все время
                </div>
                <div className={classes.wrapperElement} onClick={e => {
                    setChoiceFunc('CurrentTeamsPlayers')
                }}>
                    Текущие команды игроков согласно информации о составах команд
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('RosterTeamFromNecessaryTour')
                }}>
                    Ростеры всех команд с выбранного турнира
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('GiveAwardsPlayersAndTeams')
                }}>
                    Выдать награды игрокам и командам
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('AllPlayersList')
                }}>
                    Список всех игроков
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('AllTeamsList')
                }}>
                    Список всех команд
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('CalculateRankingPointsPlayers')
                }}>
                    Начислить игрокам очки за выбранный турнир
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('CalculateRankingPointsTeams')
                }}>
                    Начислить командам очки за выбранный турнир
                </div>
                <div className={classes.wrapperElement} onClick={() => {
                    setChoiceFunc('RankingTeamsWithCurrentRosters')
                }}>
                    Обновить мировой рейтинг команд
                </div>
            </div>

            <div className={classes.wrapperOutputRes}>
                {choiceFunc === 'AllStatsPlayersLastTour' ? <AllStatsPlayersLastTour/> :
                    choiceFunc === 'StatsPlayersFromNecessaryTour' ? <StatsPlayersNecessaryTour/> :
                        choiceFunc === 'StatsTeamsNecessaryTour' ? <StatsTeamsNecessaryTour/> :
                            choiceFunc === 'CurrentTeamsPlayers' ? <CurrentTeamsPlayers/> :
                                choiceFunc === 'RosterTeamFromNecessaryTour' ? <RosterTeamFromNecessaryTour/> :
                                    choiceFunc === 'GiveAwardsPlayersAndTeams' ? <GiveAwardsPlayersAndTeams/> :
                                        choiceFunc === 'AllPlayersList' ? <AllPlayers/> :
                                            choiceFunc === 'AllTeamsList' ? <AllTeams/> :
                                                choiceFunc === 'CalculateRankingPointsPlayers' ? <CalculateRankingPointsPlayers/> :
                                                    choiceFunc === 'CalculateRankingPointsTeams' ? <CalculateRankingPointsTeams/> :
                                                        choiceFunc === 'RankingTeamsWithCurrentRosters' ? <RankingTeamsWithCurrentRosters/> :
                                                            ""}
            </div>
        </div>
    );
};

export default Functions;