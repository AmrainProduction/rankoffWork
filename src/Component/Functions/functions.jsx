import React, {useState} from 'react';
import classes from './functions.module.css'
import {useGetMatchesQuery, useGetPlayersQuery, useGetTeamsTournamentsQuery} from "../../store/api/apiSlice";

const Functions = () => {

    const [choiceFunc, setChoiceFunc] = useState([])

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesQuery()
    const allTeamsFromTours = useGetTeamsTournamentsQuery()

    const statsAllPlayersFromLastTour = () => {

        let sortMatches = []
        let infoTour = []

        let name_tour_sort
        let name_tour
        let date_tour
        let end_date_tour
        let logo_tour
        let logo_player
        let player_id
        let name
        let nickname
        let surname
        let country_flag
        let kd_p = 0
        let kpr_p = 0
        let dpr_p = 0
        let impact_p = 0
        let rating = 0
        let k = 0
        let a = 0
        let d = 0
        let rm
        let team
        let logo_team
        let team_id
        let position_team

        let count_1_win = 0
        let count_1_lose = 0
        let count_2_win = 0
        let count_2_lose = 0
        let w_rounds = 0
        let l_rounds = 0
        let rounds = 0
        let maps = 0
        let maps_win = 0
        let maps_lose = 0

        let sqlQuery = "INSERT INTO players_tournaments(id, name_tour_sort, name_tour, date_tour, end_date_tour, logo_tour, logo_player, player_id, name, nickname, surname, country_flag, kd_p, kpr_p, dpr_p, impact_p, rating, k, a, d, w_rounds, l_rounds, maps, rm, team, logo_team, team_id, position_team) VALUES "

        if (allPlayers && allMatches && allTeamsFromTours && allPlayers.data.length > 0 && allMatches.data.length > 0 && allTeamsFromTours.data.length > 0) {

            sortMatches = allMatches.data.filter(e => e.name_tour_for_sort === 'WinlineEpic_23_09_23')
            infoTour = allTeamsFromTours.data.filter(e => e.name_tour_sort === 'WinlineEpic_23_09_23')
            // sortMatches = allMatches?.data

            allPlayers.data.map((player, index) => {
                player_id = player.player_id
                name = player.name
                nickname = player.nickname
                surname = player.surname
                country_flag = player.country_flag

                sortMatches?.map((match, indexMatch) => {

                    //----------сбор общей информации о трунире------------------------------

                    name_tour_sort = match.name_tour_for_sort
                    name_tour = match.name_tour
                    logo_tour = infoTour[0].logo_tour
                    date_tour = infoTour[0].date_tour
                    end_date_tour = infoTour[0].end_date_tour

                    //----------сбор статистики игрока из первой команды------------------------------

                    if ((match.t1p1 === nickname && match.t1p1_id === player_id) || (match.t1p2 === nickname && match.t1p2_id === player_id) || (match.t1p3 === nickname && match.t1p3_id === player_id) || (match.t1p4 === nickname && match.t1p4_id === player_id) || (match.t1p5 === nickname && match.t1p5_id === player_id)) {
                        team = match.team1
                        team_id = match.team1_id
                        logo_team = match.team1_logo
                        position_team = infoTour.filter(e => e.name_team === team)[0].position_team

                        //подсчет поражений и побед игрока

                        if (match.total_r_team1 > match.total_r_team2) {
                            count_1_win++
                        }
                        if (match.total_r_team1 < match.total_r_team2) {
                            count_1_lose++
                        }

                        //подсчет победных и проигранных раундов игрока

                        rounds += (match.total_r_team1 + match.total_r_team2)
                        w_rounds += match.total_r_team1
                        l_rounds += match.total_r_team2

                    }

                    if ((match.t1p1 === nickname && match.t1p1_id === player_id)) {
                        logo_player = match.t1p1_logo
                        rating += match.t1p1_rating
                        impact_p += match.t1p1_impact
                        kd_p += match.t1p1_kd
                        kpr_p += (match.t1p1_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t1p1_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t1p1_k
                        a += match.t1p1_a
                        d += match.t1p1_d
                    }

                    if ((match.t1p2 === nickname && match.t1p2_id === player_id)) {
                        logo_player = match.t1p2_logo
                        rating += match.t1p2_rating
                        impact_p += match.t1p2_impact
                        kd_p += match.t1p2_kd
                        kpr_p += (match.t1p2_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t1p2_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t1p2_k
                        a += match.t1p2_a
                        d += match.t1p2_d
                    }

                    if ((match.t1p3 === nickname && match.t1p3_id === player_id)) {

                        logo_player = match.t1p3_logo
                        rating += match.t1p3_rating
                        impact_p += match.t1p3_impact
                        kd_p += match.t1p3_kd
                        kpr_p += (match.t1p3_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t1p3_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t1p3_k
                        a += match.t1p3_a
                        d += match.t1p3_d
                    }

                    if ((match.t1p4 === nickname && match.t1p4_id === player_id)) {
                        logo_player = match.t1p4_logo
                        rating += match.t1p4_rating
                        impact_p += match.t1p4_impact
                        kd_p += match.t1p4_kd
                        kpr_p += (match.t1p4_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t1p4_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t1p4_k
                        a += match.t1p4_a
                        d += match.t1p4_d
                    }

                    if ((match.t1p5 === nickname && match.t1p5_id === player_id)) {
                        logo_player = match.t1p5_logo
                        rating += match.t1p5_rating
                        impact_p += match.t1p5_impact
                        kd_p += match.t1p5_kd
                        kpr_p += (match.t1p5_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t1p5_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t1p5_k
                        a += match.t1p5_a
                        d += match.t1p5_d
                    }

                    //----------сбор статистики игрока из второй команды------------------------------

                    if ((match.t2p1 === nickname && match.t2p1_id === player_id) || (match.t2p2 === nickname && match.t2p2_id === player_id) || (match.t2p3 === nickname && match.t2p3_id === player_id) || (match.t2p4 === nickname && match.t2p4_id === player_id) || (match.t2p5 === nickname && match.t2p5_id === player_id)) {

                        team = match.team2
                        team_id = match.team2_id
                        logo_team = match.team2_logo
                        position_team = infoTour.filter(e => e.name_team === team)[0].position_team

                        //подсчет поражений и побед игрока

                        if (match.total_r_team1 < match.total_r_team2) {
                            count_2_win++
                        }
                        if (match.total_r_team1 > match.total_r_team2) {
                            count_2_lose++
                        }

                        //подсчет победных и проигранных раундов игрока

                        rounds += (match.total_r_team1 + match.total_r_team2)
                        w_rounds += match.total_r_team2
                        l_rounds += match.total_r_team1
                    }

                    if ((match.t2p1 === nickname && match.t2p1_id === player_id)) {
                        logo_player = match.t2p1_logo
                        rating += match.t2p1_rating
                        impact_p += match.t2p1_impact
                        kd_p += match.t2p1_kd
                        kpr_p += (match.t2p1_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t2p1_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t2p1_k
                        a += match.t2p1_a
                        d += match.t2p1_d
                    }

                    if ((match.t2p2 === nickname && match.t2p2_id === player_id)) {
                        logo_player = match.t2p2_logo
                        rating += match.t2p2_rating
                        impact_p += match.t2p2_impact
                        kd_p += match.t2p2_kd
                        kpr_p += (match.t2p2_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t2p2_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t2p2_k
                        a += match.t2p2_a
                        d += match.t2p2_d
                    }

                    if ((match.t2p3 === nickname && match.t2p3_id === player_id)) {
                        logo_player = match.t2p3_logo
                        rating += match.t2p3_rating
                        impact_p += match.t2p3_impact
                        kd_p += match.t2p3_kd
                        kpr_p += (match.t2p3_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t2p3_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t2p3_k
                        a += match.t2p3_a
                        d += match.t2p3_d
                    }

                    if ((match.t2p4 === nickname && match.t2p4_id === player_id)) {
                        logo_player = match.t2p4_logo
                        rating += match.t2p4_rating
                        impact_p += match.t2p4_impact
                        kd_p += match.t2p4_kd
                        kpr_p += (match.t2p4_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t2p4_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t2p4_k
                        a += match.t2p4_a
                        d += match.t2p4_d
                    }

                    if ((match.t2p5 === nickname && match.t2p5_id === player_id)) {
                        logo_player = match.t2p5_logo
                        rating += match.t2p5_rating
                        impact_p += match.t2p5_impact
                        kd_p += match.t2p5_kd
                        kpr_p += (match.t2p5_k / (match.total_r_team1 + match.total_r_team2))
                        dpr_p += (match.t2p5_d / (match.total_r_team1 + match.total_r_team2))
                        k += match.t2p5_k
                        a += match.t2p5_a
                        d += match.t2p5_d
                    }

                    //----------сбор общей информации о трунире------------------------------

                    maps = (count_1_win + count_2_win) + (count_1_lose + count_2_lose)
                    maps_win = count_1_win + count_2_win
                    maps_lose = (count_1_lose + count_2_lose)

                })

                //фиксируем статистику каждого игрока

                if (rating && impact_p) {

                    rating = Math.round(rating / maps * 100) / 100
                    impact_p = Math.round(impact_p / maps * 100) / 100
                    kd_p = Math.round(kd_p / maps * 100) / 100
                    kpr_p = Math.round(kpr_p / maps * 100) / 100
                    dpr_p = Math.round(dpr_p / maps * 100) / 100
                    rm = Math.round(rating + maps * 100) / 100

                    sqlQuery += `('` + `NULL` + `','` + `${name_tour_sort}` + `','` + `${name_tour}` + `','` + `${date_tour}` + `','` + `${end_date_tour}` + `','` + `${logo_tour}` + `','` + `${logo_player}` + `',` + player_id + `,'` + `${name}` + `','` + `${nickname}` + `','` + `${surname}` + `','` + `${country_flag}` + `',` + kd_p + `,` + kpr_p + `,` + dpr_p + `,` + impact_p + `,` + rating + `,` + k + `,` + a + `,` + d + `,` + w_rounds + `,` + l_rounds + `,` + maps + `,` + rm + `,'` + `${team}` + `','` + `${logo_team}` + `',` + team_id + `,` + position_team + '),'
                }

                kd_p = 0
                kpr_p = 0
                dpr_p = 0
                impact_p = 0
                rating = 0
                k = 0
                a = 0
                d = 0
                w_rounds = 0
                l_rounds = 0
                maps = 0
                maps_win = 0
                maps_lose = 0
                count_1_win = 0
                count_2_win = 0
                count_1_lose = 0
                count_2_lose = 0
                rm = 0
                team = 0
                logo_team = 0
                team_id = 0
                position_team = 0

            })

            sqlQuery = sqlQuery.slice(0,sqlQuery.length - 1)
            sqlQuery += ';'

            setChoiceFunc(sqlQuery)
        }
        console.log(sqlQuery)
    }

    return (
        <div className={classes.wrapperContent}>
            <div className={classes.wrapperListCommands}>
                <div className={classes.wrapperElement} onClick={statsAllPlayersFromLastTour}>
                    Статистика всех игроков турнира за этот турнир
                </div>
                <div className={classes.wrapperElement}>
                    Обновить статистику игроков включая данные последнего турнира
                </div>
                <div className={classes.wrapperElement}>
                    Обновить статистику команд включая данные последнего турнира
                </div>
                <div className={classes.wrapperElement}>
                    Обновить топ команд включая данные последнего турнира
                </div>
                <div className={classes.wrapperElement}>
                    Ростеры всех команд из последнего турнира
                </div>
                <div className={classes.wrapperElement}>
                    Обновить игрокам их команды согласно ростеру с последнего турнира
                </div>
                <div className={classes.wrapperElement}>
                    Обновить FFT игроков
                </div>
            </div>
            <div className={classes.wrapperOutputRes}>
                {JSON.stringify(choiceFunc)}
            </div>
        </div>
    );
};

export default Functions;