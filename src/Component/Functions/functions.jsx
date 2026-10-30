import React, { useState } from 'react'
import classes from './functions.module.css'
import { Awards, CurrentTeamsPlayers, PlayerStats, RankingPoints, TeamStats, TournamentRosters } from './AllFunctions/serverFunctions'
import CalculateCurrentPlayerPoints from '../../Function/calculateCurrentPlayerPoints'
import RankingTeamsWhereRostersFromLastTour from './AllFunctions/rankingTeamsWhereRostersFromLastTour'
import RankingTeamsWithCurrentRosters from './AllFunctions/rankingTeamsWithCurrentRosters'
import AllPlayers from './AllFunctions/allPlayers'
import AllTeams from './AllFunctions/allTeams'
import Kpr from '../Formulas/kpr'
import Dpr from '../Formulas/dpr'
import Rating from '../Formulas/rating'

const Functions = () => {
	const [choiceFunc, setChoiceFunc] = useState([])

	return (
		<div className={classes.wrapperContent}>
			<div className={classes.wrapperListCommands}>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('StatsPlayersFromNecessaryTour')
					}}>
					Stats of all players of a tournament (tournament top)
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('StatsTeamsNecessaryTour')
					}}>
					All-time stats of the teams of a tournament
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('AllStatsPlayersLastTour')
					}}>
					All-time stats of the players of a tournament
				</div>
				<div
					className={classes.wrapperElement}
					onClick={(e) => {
						setChoiceFunc('CurrentTeamsPlayers')
					}}>
					Current teams of players according to team rosters
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('RosterTeamFromNecessaryTour')
					}}>
					Team rosters from the last maps of a tournament
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('GiveAwardsPlayersAndTeams')
					}}>
					Give awards to players and teams
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('AllPlayersList')
					}}>
					List of all players
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('AllTeamsList')
					}}>
					List of all teams
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('CalculateRankingPointsPlayers')
					}}>
					Give players ranking points for a tournament
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('CalculateRankingPointsTeams')
					}}>
					Give teams ranking points for a tournament
				</div>
				<div
					className={classes.wrapperElement}
					onClick={() => {
						setChoiceFunc('RankingTeamsWithCurrentRosters')
					}}>
					World team ranking (JSON/CSV export)
				</div>
			</div>

			<div className={classes.wrapperOutputRes}>
				{choiceFunc === 'AllStatsPlayersLastTour' ? (
					<PlayerStats scope="all" />
				) : choiceFunc === 'StatsPlayersFromNecessaryTour' ? (
					<PlayerStats scope="tournament" />
				) : choiceFunc === 'StatsTeamsNecessaryTour' ? (
					<TeamStats />
				) : choiceFunc === 'CurrentTeamsPlayers' ? (
					<CurrentTeamsPlayers />
				) : choiceFunc === 'RosterTeamFromNecessaryTour' ? (
					<TournamentRosters />
				) : choiceFunc === 'GiveAwardsPlayersAndTeams' ? (
					<Awards />
				) : choiceFunc === 'AllPlayersList' ? (
					<AllPlayers />
				) : choiceFunc === 'AllTeamsList' ? (
					<AllTeams />
				) : choiceFunc === 'CalculateRankingPointsPlayers' ? (
					<RankingPoints target="players" />
				) : choiceFunc === 'CalculateRankingPointsTeams' ? (
					<RankingPoints target="teams" />
				) : choiceFunc === 'RankingTeamsWithCurrentRosters' ? (
					<RankingTeamsWithCurrentRosters />
				) : (
					''
				)}
			</div>
		</div>
	)
}

export default Functions
