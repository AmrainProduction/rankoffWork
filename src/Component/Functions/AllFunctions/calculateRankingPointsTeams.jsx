import React, {useState} from 'react';
import {
    useGetTeamsTournamentsByNameQuery,
    useGetTournamentsQuery
} from "../../../store/api/apiSlice";
import classes from "../functions.module.css";

const CalculateRankingPointsTeams = () => {

    let res = []
    let query = ''

    const tours = useGetTournamentsQuery()

    const [choiceTour, setChoiceTour] = useState([])

    const name = choiceTour

    const points = useGetTeamsTournamentsByNameQuery({name})

    if (points.data && points.data.length > 0) {
        points.data.map(team => {
            if (team.points_team > 0) {
                res.push({
                    team_id: team.team_id,
                    name_team: team.name_team,
                    event_id: team.name_tour_sort,
                    points: Math.round((team.points_team * 0.25) * 100) / 100,
                    date_accepted_points: team.end_date_tour,
                })
            }
        })
    }

    res.reverse().map(e => {
        query += "INSERT INTO teams_points(team_id, name_team, event_id, points, date_accepted_points) VALUES (" + e.team_id + "," + `'` + `${e.name_team}` + `'` + "," + `'` + `${e.event_id}` + `'` + "," + e.points + "," + `'` + `${e.date_accepted_points}` + `'` + ");"
    })

    return (
        <div className={classes.wrapperStatsPlayersTour}>
            <div className={classes.listTours}>
                {tours.data?.map((e, index) => {
                    return (
                        <div key={index} className={classes.tour} onClick={el => {
                            setChoiceTour(e.name_tour_sort)
                        }}>{e.name_tour_sort}</div>
                    )
                })}
            </div>
            <div className={classes.actionButtons}>
                <div className={classes.tour} onClick={e => {
                    navigator.clipboard.writeText(query.length > 0 ? query : "").then(() => {
                        console.log('Copy good')
                    }, () => {
                        console.log('Fail copy')
                    })
                }}>
                    Copy
                </div>
            </div>
            <div className={classes.resultCommand}>
                {query.length > 0 ? query : ""}
            </div>
        </div>
    );
};

export default CalculateRankingPointsTeams;