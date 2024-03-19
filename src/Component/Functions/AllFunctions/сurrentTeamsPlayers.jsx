import React from 'react';
import {useGetPlayersQuery, useGetTeamsQuery} from "../../../store/api/apiSlice";
import classes from "../functions.module.css";

const CurrentTeamsPlayers = () => {

    const teams = useGetTeamsQuery()
    const players = useGetPlayersQuery()

    let query = ""

    if (teams.data && teams.data.length > 0 && players.data && players.data.length > 0) {

        let player1
        let player2
        let player3
        let player4
        let player5

        let player1_id
        let player2_id
        let player3_id
        let player4_id
        let player5_id

        //пробегаемся по командам и записываем какой игрок какой команде принадлжеит

        teams.data.map((team, index) => {

            player1 = team.player_1
            player2 = team.player_2
            player3 = team.player_3
            player4 = team.player_4
            player5 = team.player_5
            player1_id = team.player_1_id
            player2_id = team.player_2_id
            player3_id = team.player_3_id
            player4_id = team.player_4_id
            player5_id = team.player_5_id


            if (player1 && player2 && player3 && player4 && player5) {
                if (player1 && player1 !== 'nickname') {
                    query += "UPDATE players SET team =" + `'` + `${team.name_team}` + `',` + " back_logo_team" + "=" + `'` + `${team.logo_team}` + `'` + ", team_id=" + team.team_id + " WHERE player_id=" + player1_id + " AND nickname=" + `'` + `${player1}` + `'; \n`
                }

                if (player2 && player2 !== 'nickname') {
                    query += "UPDATE players SET team =" + `'` + `${team.name_team}` + `',` + " back_logo_team" + "=" + `'` + `${team.logo_team}` + `'` + ", team_id=" + team.team_id + " WHERE player_id=" + player2_id + " AND nickname=" + `'` + `${player2}` + `'; \n`
                }

                if (player3 && player3 !== 'nickname') {
                    query += "UPDATE players SET team =" + `'` + `${team.name_team}` + `',` + " back_logo_team" + "=" + `'` + `${team.logo_team}` + `'` + ", team_id=" + team.team_id + " WHERE player_id=" + player3_id + " AND nickname=" + `'` + `${player3}` + `'; \n`
                }

                if (player4 && player4 !== 'nickname') {
                    query += "UPDATE players SET team =" + `'` + `${team.name_team}` + `',` + " back_logo_team" + "=" + `'` + `${team.logo_team}` + `'` + ", team_id=" + team.team_id + " WHERE player_id=" + player4_id + " AND nickname=" + `'` + `${player4}` + `'; \n`
                }

                if (player5 && player5 !== 'nickname') {
                    query += "UPDATE players SET team =" + `'` + `${team.name_team}` + `',` + " back_logo_team" + "=" + `'` + `${team.logo_team}` + `'` + ", team_id=" + team.team_id + " WHERE player_id=" + player5_id + " AND nickname=" + `'` + `${player5}` + `'; \n`
                }

            }

            // console.log(query) //вывод только тех игроков, у которых есть команла
        })

        //теперь записываем всех игроков без команд


        let allPlayers = players.data

        teams.data.map((team) => {

            if (team.player_1 !== 'nickname') {
                allPlayers = allPlayers.filter(e => e.nickname !== team.player_1 && e.player_id !== team.player_1_id)
            }
            if (team.player_2 !== 'nickname') {
                allPlayers = allPlayers.filter(e => e.nickname !== team.player_2 && e.player_id !== team.player_2_id)
            }
            if (team.player_3 !== 'nickname') {
                allPlayers = allPlayers.filter(e => e.nickname !== team.player_3 && e.player_id !== team.player_3_id)
            }
            if (team.player_4 !== 'nickname') {
                allPlayers = allPlayers.filter(e => e.nickname !== team.player_4 && e.player_id !== team.player_4_id)
            }
            if (team.player_5 !== 'nickname') {
                allPlayers = allPlayers.filter(e => e.nickname !== team.player_5 && e.player_id !== team.player_5_id)
            }

        })

        allPlayers.map((player) => {
            query += "UPDATE players SET team =" + `'` + `teamDefaults` + `',` + " back_logo_team" + "=" + `'` + `teamDefaults.svg` + `'` + ", team_id=" + "NULL" + " WHERE player_id=" + player.player_id + " AND nickname=" + `'` + `${player.nickname}` + `'; \n`
        })

        // console.log(query) //вывод всех игроков с командой и без

    }

    return (
        <div className={classes.wrapperStatsPlayersTour}>
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

export default CurrentTeamsPlayers;