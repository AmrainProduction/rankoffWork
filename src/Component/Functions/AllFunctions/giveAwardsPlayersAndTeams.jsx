import React, {useEffect, useState} from 'react'
import classes from "../functions.module.css"
import {
    useGetPlayersTournamentsByNameTourQuery,
    useGetTeamsTournamentsByNameQuery,
    useGetTournamentsQuery
} from "../../../store/api/apiSlice"
import formatDate from "../../../Function/transformDateDDMMYY"

const GiveAwardsPlayersAndTeams = () => {
    const tours = useGetTournamentsQuery()

    const [choiceTour, setChoiceTour] = useState([])
    const [teamsAwards, setTeamsAwards] = useState([])
    const [playersAwards, setPlayersAwards] = useState([])
    const [choiceTeam, setChoiceTeam] = useState(null)
    const [query, setQuery] = useState('')
    const [listPlayers, setListPlayers] = useState([])

    const name = choiceTour
    const nameTour = choiceTour

    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const playersTour = useGetPlayersTournamentsByNameTourQuery({nameTour})

    const giveTeamAward = (team_id) => {
        if (teamsAwards.length === 0) {
            const newTeams = []
            const newPlayers = []

            playersTour.data.filter(e => e.team_id === team_id).forEach((player, index) => {
                if (index === 0) {
                    newTeams.push({
                        "name_tour_sort": player.name_tour_sort,
                        "end_date_tour": player.end_date_tour,
                        "name_team": player.team,
                        "team_id": player.team_id,
                        "logo_award": player.logo_tour,
                        "award_description": `${player.name_tour} Winner ${formatDate(player.end_date_tour)}`,
                    })
                }

                newPlayers.push({
                    "name_tour_sort": player.name_tour_sort,
                    "end_date_tour": player.end_date_tour,
                    "name_player": player.nickname,
                    "player_id": player.player_id,
                    "logo_award": player.logo_tour,
                    "award_description": `${player.name_tour} Winner ${formatDate(player.end_date_tour)}`,
                })
            })

            setTeamsAwards([...teamsAwards, ...newTeams])
            setPlayersAwards([...playersAwards, ...newPlayers])
        }
    }

    const giveMVPAward = (player_id) => {
        const exists = playersAwards.some(e => e.logo_award === "MVP.png")

        if (!exists) {
            const newPlayers = playersTour.data.filter(e => e.player_id === player_id).map(player => ({
                "name_tour_sort": player.name_tour_sort,
                "end_date_tour": player.end_date_tour,
                "name_player": player.nickname,
                "player_id": player.player_id,
                "logo_award": "MVP.png",
                "award_description": `MVP ${player.name_tour} ${formatDate(player.end_date_tour)}`,
            }))

            setPlayersAwards([...playersAwards, ...newPlayers])
        }
    }

    const giveEVPAward = (player_id) => {
        const newPlayers = playersTour.data.filter(e => e.player_id === player_id).map(player => ({
            "name_tour_sort": player.name_tour_sort,
            "end_date_tour": player.end_date_tour,
            "name_player": player.nickname,
            "player_id": player.player_id,
            "logo_award": "EVP.png",
            "award_description": `EVP ${player.name_tour} ${formatDate(player.end_date_tour)}`,
        }))

        setPlayersAwards([...playersAwards, ...newPlayers])
    }

    useEffect(() => {
        let newQuery = ''

        playersAwards.forEach(e => {
            newQuery += "INSERT INTO `awards`(`name_tour_sort`, `end_date_tour`, `name_player`, `player_id`, `logo_award`, `award_description`) VALUES (" +
                `'` + e.name_tour_sort + `'` + "," +
                `'` + e.end_date_tour + `'` + "," +
                `'` + e.name_player + `'` + "," +
                `'` + e.player_id + `'` + "," +
                `'` + e.logo_award + `'` + "," +
                `'` + e.award_description + `'` +
                ");\n"
        })

        teamsAwards.forEach(e => {
            newQuery += "INSERT INTO `awards`(`name_tour_sort`, `end_date_tour`, `name_team`, `team_id`, `logo_award`, `award_description`) VALUES (" +
                `'` + e.name_tour_sort + `'` + "," +
                `'` + e.end_date_tour + `'` + "," +
                `'` + e.name_team + `'` + "," +
                `'` + e.team_id + `'` + "," +
                `'` + e.logo_award + `'` + "," +
                `'` + e.award_description + `'` +
                ");\n"
        })

        setQuery(newQuery)
    }, [playersAwards, teamsAwards])


    useEffect(() => {
        if (playersTour.data && playersTour.data.length > 0) {
            const sortedPlayers = [...playersTour.data].sort((a, b) => {
                return parseFloat(a.id) - parseFloat(b.id)
            })

            setListPlayers(sortedPlayers)
        }
    }, [playersTour.data])

    return (
        <div className={classes.wrapperStatsPlayersTour}>
            <div className={classes.listTours}>
                {tours.data?.map((e, index) => (
                    <div key={index} className={classes.tour} onClick={() => {
                        setChoiceTour(e.name_tour_sort)
                        setChoiceTeam(null)
                        setQuery("")
                        setPlayersAwards([])
                        setTeamsAwards([])
                    }}>{e.name_tour_sort}</div>
                ))}
            </div>

            {teamsTour.data ? (
                <div className={classes.listTours}>
                    {teamsTour.data.map((e, index) => (
                        <div key={index} className={classes.tour} onClick={() => {
                            giveTeamAward(e.team_id)
                            setChoiceTeam(e.team_id)
                        }}>{e.name_team}</div>
                    ))}
                </div>
            ) : <div></div>}

            {listPlayers ? (
                <div className={classes.listTours}>
                    {listPlayers?.filter(e => e.team_id === choiceTeam).map((e, index) => (
                        <div key={index} className={classes.tour} onClick={() => {
                            giveMVPAward(e.player_id)
                        }}>{e.nickname}</div>
                    ))}
                </div>
            ) : <div></div>}

            {listPlayers ? (
                <div className={classes.listTours}>
                    {listPlayers?.map((e, index) => (
                        <div key={index} className={classes.tour} onClick={() => {
                            giveEVPAward(e.player_id)
                        }}>{e.nickname}</div>
                    ))}
                </div>
            ) : <div></div>}

            <div className={classes.actionButtons}>
                <div className={classes.tour} onClick={() => {
                    navigator.clipboard.writeText(query).then(() => {
                        console.log('Copy good')
                    }, () => {
                        console.log('Fail copy')
                    })
                }}>
                    Copy
                </div>
            </div>
            <div className={classes.resultCommand}>
                {query}
            </div>
        </div>
    )
}

export default GiveAwardsPlayersAndTeams
