import React, {useEffect, useState} from 'react';
import classes from "../functions.module.css";
import {
    useGetPlayersTournamentsByNameTourQuery,
    useGetTeamsTournamentsByNameQuery,
    useGetTournamentsQuery
} from "../../../store/api/apiSlice";
import formatDate from "../../../Function/transformDateDDMMYY";

const GiveAwardsPlayersAndTeams = () => {

    const tours = useGetTournamentsQuery()

    const [choiceTour, setChoiceTour] = useState([])
    const [choiceTeam, setChoiceTeam] = useState(null)
    const [choiceMVP, setChoiceMVP] = useState(null)

    const name = choiceTour
    const nameTour = choiceTour

    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const playersTour = useGetPlayersTournamentsByNameTourQuery({nameTour})

    let query = ""
    let playersAwards = []
    let teamsAwards = []

    if (tours.data?.length && teamsTour.data?.length && playersTour.data?.length) {

        if (choiceMVP !== null) {
            playersTour.data.filter(e => e.player_id === choiceMVP).map(player => {
                playersAwards.push({
                    "name_tour_sort": player.name_tour_sort,
                    "end_date_tour": player.end_date_tour,
                    "name_player": player.nickname,
                    "player_id": player.player_id,
                    "logo_award": "MVP.png",
                    "award_description": `MVP ${player.name_tour} ${formatDate(player.end_date_tour)}`,
                })
            })
        }

        playersTour.data.filter(e => e.team_id === choiceTeam).map((player, index) => {
            if (index === 0) {
                teamsAwards.push({
                    "name_tour_sort": player.name_tour_sort,
                    "end_date_tour": player.end_date_tour,
                    "name_team": player.team,
                    "team_id": player.team_id,
                    "logo_award": player.logo_tour,
                    "award_description": `${player.name_tour} Winner ${formatDate(player.end_date_tour)}`,
                })
            }

            playersAwards.push({
                "name_tour_sort": player.name_tour_sort,
                "end_date_tour": player.end_date_tour,
                "name_player": player.nickname,
                "player_id": player.player_id,
                "logo_award": player.logo_tour,
                "award_description": `${player.name_tour} Winner ${formatDate(player.end_date_tour)}`,
            })
        })
    }

    playersAwards.map(e => {
        query += "INSERT INTO `awards`(`name_tour_sort`, `end_date_tour`, `name_player`, `player_id`, `logo_award`, `award_description`) VALUES (" +
            `'` + e.name_tour_sort + `'` + "," +
            `'` + e.end_date_tour + `'` + "," +
            `'` + e.name_player + `'` + "," +
            `'` + e.player_id + `'` + "," +
            `'` + e.logo_award + `'` + "," +
            `'` + e.award_description + `'` +
            ");\n"
    })

    teamsAwards.map(e => {
        query += "INSERT INTO `awards`(`name_tour_sort`, `end_date_tour`, `name_team`, `team_id`, `logo_award`, `award_description`) VALUES (" +
            `'` + e.name_tour_sort + `'` + "," +
            `'` + e.end_date_tour + `'` + "," +
            `'` + e.name_team + `'` + "," +
            `'` + e.team_id + `'` + "," +
            `'` + e.logo_award + `'` + "," +
            `'` + e.award_description + `'` +
            ");\n"
    })

    return (
        <div className={classes.wrapperStatsPlayersTour}>
            <div className={classes.listTours}>
                {tours.data?.map((e, index) => {
                    return (
                        <div key={index} className={classes.tour} onClick={el => {
                            setChoiceTour(e.name_tour_sort)
                            setChoiceTeam(null)
                            setChoiceMVP(null)
                        }}>{e.name_tour_sort}</div>
                    )
                })}
            </div>

            {teamsTour.data ? <div className={classes.listTours}>
                {teamsTour.data.map((e, index) => {
                    return (
                        <div key={index} className={classes.tour} onClick={el => {
                            setChoiceTeam(e.team_id)
                            setChoiceMVP(null)
                        }}>{e.name_team}</div>
                    )
                })}
            </div> : <div></div>}

            {playersTour.data ? <div className={classes.listTours}>
                {playersTour.data.filter(e => e.team_id === choiceTeam).map((e, index) => {
                    return (
                        <div key={index} className={classes.tour} onClick={el => {
                            setChoiceMVP(e.player_id)
                        }}>{e.nickname}</div>
                    )
                })}
            </div> : <div></div>}

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
    )

};

export default GiveAwardsPlayersAndTeams;