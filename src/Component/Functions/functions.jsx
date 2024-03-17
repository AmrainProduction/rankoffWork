import React, {useState} from 'react';
import classes from './functions.module.css'
import {useGetMatchesQuery, useGetPlayersQuery, useGetTeamsTournamentsQuery} from "../../store/api/apiSlice";
import AllStatsPlayersLastTour from "./AllFunctions/allStatsPlayersLastTour";
import StatsPlayersNecessaryTour from "./AllFunctions/statsPlayersNecessaryTour";

const Functions = () => {

    const [choiceFunc, setChoiceFunc] = useState([])


    return (
        <div className={classes.wrapperContent}>
            <div className={classes.wrapperListCommands}>
                <div className={classes.wrapperElement}  onClick={ e => {
                    setChoiceFunc('StatsPlayersFromNecessaryTour')
                }}>
                    Статистика всех игроков выбранного турнира
                </div>
                <div className={classes.wrapperElement} onClick={ e => {
                    setChoiceFunc('StatsTeamsNecessaryTour')
                }}>
                    Статистика всех команд выбранного турнира
                </div>
                <div className={classes.wrapperElement} onClick={ e => {
                    setChoiceFunc('AllStatsPlayersLastTour')
                }}>
                    Статистика игроков с последнего турнира за все время
                </div>
                <div className={classes.wrapperElement}>
                    Ростеры всех команд с выбранного турнира
                </div>
                <div className={classes.wrapperElement}>
                    Обновить игрокам их команды согласно ростеру с последнего турнира
                </div>
            </div>
            <div className={classes.wrapperOutputRes}>
                {choiceFunc === 'AllStatsPlayersLastTour' ? <AllStatsPlayersLastTour/> : choiceFunc === 'StatsPlayersFromNecessaryTour' ? <StatsPlayersNecessaryTour/> : ""}
            </div>
        </div>
    );
};

export default Functions;