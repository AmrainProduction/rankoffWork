import React from 'react';
import {
    useGetMatchesByNameTourQuery,
    useGetMatchesQuery,
    useGetPlayersQuery,
    useGetTeamsQuery,
    useGetTournamentsQuery
} from "../../../store/api/apiSlice";
import {useState} from "react";
import classes from "../functions.module.css";

const RosterTeamFromNecessaryTour = () => {
    const tours = useGetTournamentsQuery()

    const [choiceTour, setChoiceTour] = useState([])

    const name = choiceTour

    const teams = useGetTeamsQuery()
    const players = useGetPlayersQuery()
    const matches = useGetMatchesByNameTourQuery({name})

    let player1 = 0
    let player2 = 0
    let player3 = 0
    let player4 = 0
    let player5 = 0
    let player1_id = 0
    let player2_id = 0
    let player3_id = 0
    let player4_id = 0
    let player5_id = 0

    let tempmatches = []
    let playersTeams = []
    let allPlayers = []

    let teamsFromMatches = []

    let query = ""

    if (teams.data && teams.data.length > 0 && matches.data && matches.data.length > 0 && players.data && players.data.length > 0) {

        //получаем список всех комнад из списка матчей, чтобы получить их хронологический порядок

        matches.data.map(e => {
            teamsFromMatches.push({
                "name_team": e.team1,
                "team_id": e.team1_id,
            })
            teamsFromMatches.push({
                "name_team": e.team2,
                "team_id": e.team2_id,
            })
        })

        //удаляем дубликаты команд

        teamsFromMatches = teamsFromMatches.filter((value, index, self) =>
                index === self.findIndex((t) => (
                    t.team === value.team && t.team_id === value.team_id
                ))
        )

        //получаем список всех игроков чтобы контролировать их использование в составе команды

        players.data.map((player) => {
            allPlayers.push({
                "nickname": player.nickname,
                "player_id": player.player_id,
            })
        })


        teamsFromMatches.map((team, index) => {
            tempmatches = [...matches.data].reverse().filter(e => (e.team1 === team.name_team && e.team1_id === team.team_id) || (e.team2 === team.name_team && e.team2_id === team.team_id))

            if (tempmatches[0].team1 === team.name_team && tempmatches[0].team1_id === team.team_id) {
                playersTeams[index] = {
                    "team": tempmatches[0].team1,
                    "team_id": tempmatches[0].team1_id,
                    "player1": allPlayers.filter(el => el.nickname === tempmatches[0].t1p1).length > 0 ? tempmatches[0].t1p1 : 'nickname',
                    "player2": allPlayers.filter(el => el.nickname === tempmatches[0].t1p2).length > 0 ? tempmatches[0].t1p2 : 'nickname',
                    "player3": allPlayers.filter(el => el.nickname === tempmatches[0].t1p3).length > 0 ? tempmatches[0].t1p3 : 'nickname',
                    "player4": allPlayers.filter(el => el.nickname === tempmatches[0].t1p4).length > 0 ? tempmatches[0].t1p4 : 'nickname',
                    "player5": allPlayers.filter(el => el.nickname === tempmatches[0].t1p5).length > 0 ? tempmatches[0].t1p5 : 'nickname',
                    "player1_id": allPlayers.filter(el => el.player_id === tempmatches[0].t1p1_id).length > 0 ? tempmatches[0].t1p1_id : 0,
                    "player2_id": allPlayers.filter(el => el.player_id === tempmatches[0].t1p2_id).length > 0 ? tempmatches[0].t1p2_id : 0,
                    "player3_id": allPlayers.filter(el => el.player_id === tempmatches[0].t1p3_id).length > 0 ? tempmatches[0].t1p3_id : 0,
                    "player4_id": allPlayers.filter(el => el.player_id === tempmatches[0].t1p4_id).length > 0 ? tempmatches[0].t1p4_id : 0,
                    "player5_id": allPlayers.filter(el => el.player_id === tempmatches[0].t1p5_id).length > 0 ? tempmatches[0].t1p5_id : 0,
                }

                //проверяем найденных игроков на повторное вхождение, если они повторяются - ставим вместо них nickname

                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t1p1 && e.player_id !== tempmatches[0].t1p1_id )
                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t1p2 && e.player_id !== tempmatches[0].t1p2_id )
                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t1p3 && e.player_id !== tempmatches[0].t1p3_id )
                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t1p4 && e.player_id !== tempmatches[0].t1p4_id )
                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t1p5 && e.player_id !== tempmatches[0].t1p5_id )

            } else if (tempmatches[0].team2 === team.name_team && tempmatches[0].team2_id === team.team_id) {

                playersTeams[index] = {
                    "team": tempmatches[0].team2,
                    "team_id": tempmatches[0].team2_id,
                    "player1": allPlayers.filter(el => el.nickname === tempmatches[0].t2p1).length > 0 ? tempmatches[0].t2p1 : 'nickname',
                    "player2": allPlayers.filter(el => el.nickname === tempmatches[0].t2p2).length > 0 ? tempmatches[0].t2p2 : 'nickname',
                    "player3": allPlayers.filter(el => el.nickname === tempmatches[0].t2p3).length > 0 ? tempmatches[0].t2p3 : 'nickname',
                    "player4": allPlayers.filter(el => el.nickname === tempmatches[0].t2p4).length > 0 ? tempmatches[0].t2p4 : 'nickname',
                    "player5": allPlayers.filter(el => el.nickname === tempmatches[0].t2p5).length > 0 ? tempmatches[0].t2p5 : 'nickname',
                    "player1_id": allPlayers.filter(el => el.player_id === tempmatches[0].t2p1_id).length > 0 ? tempmatches[0].t2p1_id : 0,
                    "player2_id": allPlayers.filter(el => el.player_id === tempmatches[0].t2p2_id).length > 0 ? tempmatches[0].t2p2_id : 0,
                    "player3_id": allPlayers.filter(el => el.player_id === tempmatches[0].t2p3_id).length > 0 ? tempmatches[0].t2p3_id : 0,
                    "player4_id": allPlayers.filter(el => el.player_id === tempmatches[0].t2p4_id).length > 0 ? tempmatches[0].t2p4_id : 0,
                    "player5_id": allPlayers.filter(el => el.player_id === tempmatches[0].t2p5_id).length > 0 ? tempmatches[0].t2p5_id : 0,
                }

                //проверяем найденных игроков на повторное вхождение, если они повторяются - ставим вместо них nickname

                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t2p1 && e.player_id !== tempmatches[0].t2p1_id )
                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t2p2 && e.player_id !== tempmatches[0].t2p2_id )
                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t2p3 && e.player_id !== tempmatches[0].t2p3_id )
                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t2p4 && e.player_id !== tempmatches[0].t2p4_id )
                allPlayers = allPlayers.filter(e => e.nickname !== tempmatches[0].t2p5 && e.player_id !== tempmatches[0].t2p5_id )
            }




            query += "UPDATE teams SET name_team " + "=" + `'` + `${playersTeams[index].team}` + `'` + "," + " team_id " + "=" + `${playersTeams[index].team_id}` + "," + " player_1 " + "=" + `'` + `${playersTeams[index].player1}` + `'` + "," + " player_2 " + "=" + `'` + `${playersTeams[index].player2}` + `'` + "," + " player_3 " + "=" + `'` + `${playersTeams[index].player3}` + `'` + "," + " player_4 " + "=" + `'` + `${playersTeams[index].player4}` + `'` + "," + " player_5 " + "=" + `'` + `${playersTeams[index].player5}` + `'` + "," + " player_1_id " + "=" + `${playersTeams[index].player1_id}` + "," + " player_2_id " + "=" + `${playersTeams[index].player2_id}` + "," + " player_3_id " + "=" + `${playersTeams[index].player3_id}` + "," + " player_4_id " + "=" + `${playersTeams[index].player4_id}` + "," + " player_5_id " + "=" + `${playersTeams[index].player5_id}` + " WHERE name_team " + "=" + `'` + `${playersTeams[index].team}` + `'` + " AND team_id " + "=" + `${playersTeams[index].team_id}` + ";\n\n"

            tempmatches = []
        })
    }

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

export default RosterTeamFromNecessaryTour;