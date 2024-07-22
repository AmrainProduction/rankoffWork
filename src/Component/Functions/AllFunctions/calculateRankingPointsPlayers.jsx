import React from 'react';
import {
    useGetPlayersTournamentsByNameTourQuery,
    useGetPlayersTournamentsQuery,
    useGetTeamsTournamentsByNameQuery, useGetTeamsTournamentsQuery
} from "../../../store/api/apiSlice";
import PlayerPointsApproved from "../../../Function/playerPointsApproved";

const CalculateRankingPointsPlayers = () => {

    let res = []
    let query = ''

    // let name = "WinlineEpicStandoff2Major_10_07_24"
    // let nameTour = name

    let names = ["WinlineEpicStandoff2Major_10_07_24",
        "WinlineEpicStandoff2MajorClosedQuals_21_06_24",
        "WinlineEpicStandoff2Season10_30_05_24",
        "WinlineEpicStandoff2Season10CloseQuals_27_05_24",
        "WinlineEpicStandoff2Brazil2_14_05_24",
        "WinlineEpicStandoff2Season9_25_04_24",
        "WinlineEpicStandoff2Season9ClosedQuals_22_04_24",
        "WinlineEpicStandoff2Season8_28_03_24",
        "WinlineEpicStandoff2Season8ClosedQuals_25_03_24",
        "WinlineEpicStandoff2Brazil_12_03_24",
        "GamesOfFuture_03_03_24",
        "WinlineEpicStandoff2Season7_11_02_24"]

    // const points = useGetTeamsTournamentsByNameQuery({name})
    // const playersTour = useGetPlayersTournamentsByNameTourQuery({nameTour})

    const points = useGetTeamsTournamentsQuery()
    const playersTour = useGetPlayersTournamentsQuery()


    if (points.data && points.data.length > 0 && playersTour.data && playersTour.data.length > 0) {

        names.map(e2 => {
            points.data.map(team => {
                if(team.name_tour_sort === e2) {
                    PlayerPointsApproved(playersTour.data.filter(e => e.team_id === team.team_id && e.name_tour_sort === e2)).map(e => {
                        if (team.points_team > 0) {
                            res.push({
                                player_id: e.player_id,
                                nickname: e.nickname,
                                event_id: e.name_tour_sort,
                                points: Math.round((team.points_team * 0.15) * 100) / 100,
                                date_accepted_points: e.end_date_tour,
                            })
                        }
                    })
                }

            })
        })

        
    }

    res.reverse().map(e => {
        query += "INSERT INTO players_points(player_id, nickname, event_id, points, date_accepted_points) VALUES (" + e.player_id + "," + `'` + `${e.nickname}` + `'` + "," + `'` + `${e.event_id}` + `'` + "," + e.points + "," + `'` + `${e.date_accepted_points}` + `'` + ");"
    })

    console.log(query)

    return (
        <div>
            CalculateRankingPointsPlayers
        </div>
    );
};

export default CalculateRankingPointsPlayers;