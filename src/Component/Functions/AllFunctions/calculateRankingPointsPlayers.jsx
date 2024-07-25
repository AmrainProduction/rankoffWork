import React, {useState} from 'react';
import {
    useGetPlayersTournamentsByNameTourQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentsQuery
} from "../../../store/api/apiSlice";
import PlayerPointsApproved from "../../../Function/playerPointsApproved";
import classes from "../functions.module.css";

const CalculateRankingPointsPlayers = () => {

    let res = []
    let query = ''

    const tours = useGetTournamentsQuery()

    const [choiceTour, setChoiceTour] = useState([])

    const name = choiceTour
    const nameTour = choiceTour

    const points = useGetTeamsTournamentsByNameQuery({name})
    const playersTour = useGetPlayersTournamentsByNameTourQuery({nameTour})

    if (points.data && points.data.length > 0 && playersTour.data && playersTour.data.length > 0) {
        points.data.map(team => {
            PlayerPointsApproved(playersTour.data.filter(e => e.team_id === team.team_id)).map(e => {
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

        })
    }

    res.reverse().map(e => {
        query += "INSERT INTO players_points(player_id, nickname, event_id, points, date_accepted_points) VALUES (" + e.player_id + "," + `'` + `${e.nickname}` + `'` + "," + `'` + `${e.event_id}` + `'` + "," + e.points + "," + `'` + `${e.date_accepted_points}` + `'` + ");"
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

export default CalculateRankingPointsPlayers;