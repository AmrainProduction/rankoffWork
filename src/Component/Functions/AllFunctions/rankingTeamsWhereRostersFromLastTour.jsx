import React from 'react';
import {
    useGetPlayersPointsQuery,
    useGetPlayersQuery,
    useGetPlayersTournamentsQuery, useGetTeamsPointsQuery,
    useGetTeamsQuery,
    useGetTeamsTournamentsQuery, useGetTransferTeamsPointsQuery
} from "../../../store/api/apiSlice";
import CalculateCurrentPlayerPoints from "../../../Function/calculateCurrentPlayerPoints";
import CalculateCurrentTeamPoints from "../../../Function/calculateCurrentTeamPoints";
import PlayerPointsApproved from "../../../Function/playerPointsApproved";
import GetCurrentDate from "../../../Function/getCurrentDate";

const RankingTeamsWhereRostersFromLastTour = () => {

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

    if (playersPoints.data && playersPoints.data.length && teamsPoints.data && teamsPoints.data.length > 0 && allPlayers.data
        && allPlayers.data.length > 0 && transferTeamsPoints.data && transferTeamsPoints.data.length > 0
        && allPlayersTours.data && allPlayersTours.data.length > 0
        && allTeamsTours.data && allTeamsTours.data.length > 0) {

        // посчитали текушие поинты всем игрокам

        allPlayers.data.map(player => {
            players.push({
                player_id: player.player_id,
                nickname: player.nickname,
                logo_player: player.logo_player,
                points: CalculateCurrentPlayerPoints(playersPoints.data.filter(e => e.player_id === player.player_id)),
            })
        })

        // посчитали текушие поинты всем командам

        let delTeams = []
        let approvedTeams = []
        let transfers = []

        // удалили очки командам, у которых они перешли в другую команду
        transferTeamsPoints.data.map(e1 => {
            delTeams.push(e1.from_team_id)
            transfers.push({
                team_id: e1.to_team_id,
                name_team: e1.to_name_team,
                event_id: e1.event_id,
                points: e1.points,
                date_accepted_points: e1.date_transfer_points,
                description: "",
            })
        })

        // удаляем дубликаты из массива айдишников уже несуществующих команд
        delTeams = delTeams.filter((item, index) => delTeams.indexOf(item) === index)

        // удаляем несуществующие команды из списка активных
        delTeams.map(e1 => {
            teamsPoints.data.map(e2 => {
                if (e2.team_id !== e1) {
                    approvedTeams.push(e2)
                }
            })
        })

        //совмещаем трансферные очки с очками команд
        approvedTeams = approvedTeams.concat(transfers)

        allTeams.data.map(team => {
            delTeams.map(e1 => {
                if (team.team_id !== e1 && CalculateCurrentTeamPoints(approvedTeams.filter(e => e.team_id === team.team_id)) > 0) {
                    teams.push({
                        name_team: team.name_team,
                        logo_team: team.logo_team,
                        team_id: team.team_id,
                        points: CalculateCurrentTeamPoints(approvedTeams.filter(e => e.team_id === team.team_id)),
                    })
                }
            })
        })

        // теперь для каждой команды собираем ее состав согласно последнему сыгранному турниру и суммируем все очки
        teams.map(team => {

            let lastEvent = allPlayersTours.data.filter(e => team.team_id === e.team_id)[0].name_tour_sort
            let lastRosterTeam = allPlayersTours.data.filter(e => team.team_id === e.team_id && e.name_tour_sort === lastEvent)
            let lastEventTeam = allTeamsTours.data.filter(e => team.team_id === e.team_id && e.name_tour_sort === lastEvent)
            let allPlayersPoints = 0

            lastRosterTeam = PlayerPointsApproved(lastRosterTeam).slice(-5)

            players.filter(e1 => lastRosterTeam.find(e2 => e2.player_id === e1.player_id)).map(player => {
                allPlayersPoints += player.points
            })

            ranking.push({
                name_team: team.name_team,
                logo_team: team.logo_team,
                team_id: team.team_id,
                points_team: (team.points + allPlayersPoints),
                country_team: lastEventTeam[0].country_team,
                start_date: "",
                end_date: GetCurrentDate(),
                position_team: 0,
                player1: lastRosterTeam[0].nickname,
                player2: lastRosterTeam[1].nickname,
                player3: lastRosterTeam[2].nickname,
                player4: lastRosterTeam[3].nickname,
                player5: lastRosterTeam[4].nickname,
                logo_player1: lastRosterTeam[0].logo_player,
                logo_player2: lastRosterTeam[1].logo_player,
                logo_player3: lastRosterTeam[2].logo_player,
                logo_player4: lastRosterTeam[3].logo_player,
                logo_player5: lastRosterTeam[4].logo_player,
            })
        })

        ranking = ranking.sort((a, b) => b.points_team - a.points_team)
        ranking.map((e, index) => {
            e.position_team = index+1
        })

        console.log(ranking)
    }

    return (
        <div>
            RankingTeamsWhereRostersFromLastTour
        </div>
    );
};

export default RankingTeamsWhereRostersFromLastTour;