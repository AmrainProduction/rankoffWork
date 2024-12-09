import React from 'react';
import classes from "../functions.module.css";
import {
    useGetMatchesByNameTourQuery,
    useGetMatchesQuery,
    useGetPlayersQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery,
    useGetTournamentsQuery
} from "../../../store/api/apiSlice";
import {useState} from "react";
import normalizeRating from "./normalizeRating";
import normalizeImpact from "./normalizeImpact";
import normalizeKD from "./normalizeKD";
import {calculatePlayersTop} from "../../../Function/calculatePlayersTop";

const StatsPlayersNecessaryTour = () => {
    const tours = useGetTournamentsQuery()

    const [choiceTour, setChoiceTour] = useState([])

    const name = choiceTour

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesByNameTourQuery({name})
    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const tourInfo = useGetTournamentByNameQuery({name})

    let query = ''
    let players_tournaments = calculatePlayersTop(name, "", allPlayers, allMatches, teamsTour, tourInfo, "")

    players_tournaments.map(e => {
        query += "INSERT INTO players_tournaments (`id`, `name_tour_sort`, `name_tour`, `date_tour`, `end_date_tour`, `logo_tour`, `logo_player`, `player_id`, `name`, `nickname`, `surname`, `country_flag`, `kd_p`, `kpr_p`, `dpr_p`, `impact_p`, `rating`, `k`, `a`, `d`, `w_rounds`, `l_rounds`, `maps`, `rm`, `team`, `logo_team`, `team_id`, `position_team`) VALUES ("
            + 0 + ','
            + `'` + `${e.name_tour_sort}` + `'` + ','
            + `'` + `${e.name_tour}` + `'` + ','
            + `'` + `${e.date_tour}` + `'` + ','
            + `'` + `${e.end_date_tour}` + `'` + ','
            + `'` + `${e.logo_tour}` + `'` + ','
            + `'` + `${e.logo_player}` + `'` + ','
            + e.player_id + ','
            + `'` + `${e.name}` + `'` + ','
            + `'` + `${e.nickname}` + `'` + ','
            + `'` + `${e.surname}` + `'` + ','
            + `'` + `${e.country_flag}` + `'` + ','
            + (Math.round((e.k / e.d) * 100) / 100) + ','
            + (Math.round(e.kpr_p * 100) / 100) + ','
            + (Math.round(e.dpr_p * 100) / 100) + ','
            + (Math.round(e.impact_p * 100) / 100) + ','
            + (Math.round(e.rating * 100) / 100) + ','
            + e.k + ','
            + e.a + ','
            + e.d + ','
            + e.w_rounds + ','
            + e.l_rounds + ','
            + e.maps + ','
            + e.rm + ','
            + `'` + `${e.team}` + `'` + ','
            + `'` + `${e.logo_team}` + `'` + ','
            + e.team_id + ','
            + `'` + `${e.position_team}` + `'`
            + "); \n"
    })

    // console.log(sortPlayersArr)

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

export default StatsPlayersNecessaryTour;