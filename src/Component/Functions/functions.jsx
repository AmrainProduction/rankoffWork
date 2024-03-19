import React, {useState} from 'react';
import classes from './functions.module.css'
import AllStatsPlayersLastTour from "./AllFunctions/allStatsPlayersLastTour";
import StatsPlayersNecessaryTour from "./AllFunctions/statsPlayersNecessaryTour";
import StatsTeamsNecessaryTour from "./AllFunctions/statsTeamsNecessaryTour";
import CurrentTeamsPlayers from "./AllFunctions/сurrentTeamsPlayers";
import RosterTeamFromNecessaryTour from "./AllFunctions/rosterTeamFromNecessaryTour";

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
                <div className={classes.wrapperElement} onClick={ e => {
                    setChoiceFunc('CurrentTeamsPlayers')
                }}>
                    Текущие команды игроков согласно информации о составах команд
                </div>
                <div className={classes.wrapperElement} onClick={ e => {
                    setChoiceFunc('RosterTeamFromNecessaryTour')
                }}>
                    Ростеры всех команд с выбранного турнира
                </div>
            </div>
            <div className={classes.wrapperOutputRes}>
                {choiceFunc === 'AllStatsPlayersLastTour' ? <AllStatsPlayersLastTour/> :
                    choiceFunc === 'StatsPlayersFromNecessaryTour' ? <StatsPlayersNecessaryTour/> :
                        choiceFunc === 'StatsTeamsNecessaryTour' ? <StatsTeamsNecessaryTour/> :
                            choiceFunc === 'CurrentTeamsPlayers' ? <CurrentTeamsPlayers/> :
                                choiceFunc === 'RosterTeamFromNecessaryTour' ? <RosterTeamFromNecessaryTour/> : ""}
            </div>
        </div>
    );
};

export default Functions;