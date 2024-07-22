import React from 'react';
import {useGetTeamsTournamentsByNameQuery, useGetTeamsTournamentsQuery} from "../../../store/api/apiSlice";

const CalculateRankingPointsTeams = () => {

    let res = []
    let query = ''

    // let name = "WinlineEpicStandoff2Major_10_07_24"
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

    const points = useGetTeamsTournamentsQuery()

    if (points.data && points.data.length > 0) {
        names.map(e2 => {
            points.data.map(team => {
                if (team.points_team > 0 && team.name_tour_sort === e2) {
                    res.push({
                        team_id: team.team_id,
                        name_team: team.name_team,
                        event_id: team.name_tour_sort,
                        points: Math.round((team.points_team * 0.25) * 100) / 100,
                        date_accepted_points: team.end_date_tour,
                    })
                }
            })
        })

    }

    res.reverse().map(e => {
        query += "INSERT INTO teams_points(team_id, name_team, event_id, points, date_accepted_points) VALUES (" + e.team_id + "," + `'` + `${e.name_team}` + `'` + "," + `'` + `${e.event_id}` + `'` + "," + e.points + "," + `'` + `${e.date_accepted_points}` + `'` + ");"
    })

    console.log(query)

    return (
        <div>

        </div>
    );
};

export default CalculateRankingPointsTeams;