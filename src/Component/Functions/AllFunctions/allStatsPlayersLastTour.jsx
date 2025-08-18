import React from 'react';
import classes from '../functions.module.css'
import {
    useGetMatchesQuery,
    useGetPlayersQuery,
    useGetPlayersTournamentsByNameTourQuery,
    useGetTournamentsQuery
} from "../../../store/api/apiSlice";
import {useState} from "react";
import normalizeRating from "./normalizeRating";
import normalizeImpact from "./normalizeImpact";
import normalizeKD from "./normalizeKD";
import Kpr from "../../Formulas/kpr";
import Dpr from "../../Formulas/dpr";
import Rating from "../../Formulas/rating";

const AllStatsPlayersLastTour = () => {
    const tours = useGetTournamentsQuery()

    const [choiceTour, setChoiceTour] = useState([])

    const playersData = useGetPlayersQuery()
    const matchesData = useGetMatchesQuery()

    let allPlayers = []

    let nameTour = choiceTour

    const playersFromTour = useGetPlayersTournamentsByNameTourQuery({nameTour}) // получение игроков с последнего турнира

    let arr = []
    let count = 0
    let csv = []
    let count_2 = 0
    let count_l = 0
    let count_2_l = 0
    let count_player = 0
    let rounds = 0
    let rounds_w = 0
    let rounds_l = 0
    let maps = 0
    let maps_w = 0
    let maps_l = 0
    let kd = 0
    let kpr = 0
    let dpr = 0
    let impact = 0
    let rating = 0
    let k = 0
    let a = 0
    let d = 0
    let logo_player
    let name
    let surname
    let player_id
    let country_flag
    let date_birth
    let team
    let rm = 0
    let back_logo_team
    let link_vk
    let link_yt
    let link_telegram
    let link_discord
    let nickname
    let query = ''

    if (playersData.data && matchesData.data && playersData.data.length > 0 && matchesData.data.length > 0) {

        if (playersFromTour.data && playersFromTour.data.length > 0) {
            playersData.data.map((e) => {
                playersFromTour.data.map(e1 => {
                    if (e.nickname === e1.nickname && e.player_id === e1.player_id) {
                        allPlayers.push(e)
                    }
                })
            })

        }

        // allPlayers = playersData.data // разкомментить для перебора всех игроков со всех турниров

        allPlayers.map((players, index) => {

            logo_player = players.logo_player
            name = players.name
            nickname = players.nickname
            surname = players.surname
            player_id = players.player_id
            country_flag = players.country_flag
            date_birth = players.date_birth
            // rm = players.maps + players.rating
            team = players.team
            back_logo_team = players.back_logo_team
            link_vk = players.link_vk
            link_yt = players.link_yt
            link_telegram = players.link_telegram
            link_discord = players.link_discord

            matchesData.data.map(matches => {
                if ((matches.t1p1_id === player_id || matches.t1p2_id === player_id || matches.t1p3_id === player_id || matches.t1p4_id === player_id || matches.t1p5_id === player_id)) {
                    if (matches.total_r_team1 > matches.total_r_team2) {
                        count++
                    }
                    if (matches.total_r_team1 < matches.total_r_team2) {
                        count_l++
                    }

                    rounds += (matches.total_r_team1 + matches.total_r_team2)
                    rounds_w += matches.total_r_team1
                    rounds_l += matches.total_r_team2
                }

                if ((matches.t2p1_id === player_id || matches.t2p2_id === player_id || matches.t2p3_id === player_id || matches.t2p4_id === player_id || matches.t2p5_id === player_id)) {
                    if (matches.total_r_team1 < matches.total_r_team2) {
                        count_2++
                    }
                    if (matches.total_r_team1 > matches.total_r_team2) {
                        count_2_l++
                    }

                    rounds += (matches.total_r_team1 + matches.total_r_team2)
                    rounds_w += matches.total_r_team2
                    rounds_l += matches.total_r_team1
                }

                if (matches.t2p1_id === player_id || matches.t2p2_id === player_id || matches.t2p3_id === player_id || matches.t2p4_id === player_id || matches.t2p5_id === player_id || matches.t1p1_id === player_id || matches.t1p2_id === player_id || matches.t1p3_id === player_id || matches.t1p4_id === player_id || matches.t1p5_id === player_id) {
                    if (matches.t1p1_id === player_id) {
                        impact += matches.t1p1_impact
                        k += matches.t1p1_k
                        a += matches.t1p1_a
                        d += matches.t1p1_d
                    }
                    if (matches.t1p2_id === player_id) {
                        impact += matches.t1p2_impact
                        k += matches.t1p2_k
                        a += matches.t1p2_a
                        d += matches.t1p2_d
                    }
                    if (matches.t1p3_id === player_id) {
                        impact += matches.t1p3_impact
                        k += matches.t1p3_k
                        a += matches.t1p3_a
                        d += matches.t1p3_d
                    }
                    if (matches.t1p4_id === player_id) {
                        impact += matches.t1p4_impact
                        k += matches.t1p4_k
                        a += matches.t1p4_a
                        d += matches.t1p4_d
                    }
                    if (matches.t1p5_id === player_id) {
                        impact += matches.t1p5_impact
                        k += matches.t1p5_k
                        a += matches.t1p5_a
                        d += matches.t1p5_d
                    }
                    if (matches.t2p1_id === player_id) {
                        impact += matches.t2p1_impact
                        k += matches.t2p1_k
                        a += matches.t2p1_a
                        d += matches.t2p1_d
                    }
                    if (matches.t2p2_id === player_id) {
                        impact += matches.t2p2_impact
                        k += matches.t2p2_k
                        a += matches.t2p2_a
                        d += matches.t2p2_d
                    }
                    if (matches.t2p3_id === player_id) {
                        impact += matches.t2p3_impact
                        k += matches.t2p3_k
                        a += matches.t2p3_a
                        d += matches.t2p3_d
                    }
                    if (matches.t2p4_id === player_id) {
                        impact += matches.t2p4_impact
                        k += matches.t2p4_k
                        a += matches.t2p4_a
                        d += matches.t2p4_d
                    }
                    if (matches.t2p5_id === player_id) {
                        impact += matches.t2p5_impact
                        k += matches.t2p5_k
                        a += matches.t2p5_a
                        d += matches.t2p5_d
                    }
                }

                maps = (count_l + count_2_l) + (count + count_2)
                maps_w = count + count_2
                maps_l = (count_l + count_2_l)

            })


            if (k && d) {
                let kd = Math.round((k / d) * 100) / 100
                let kpr = Math.round(Kpr(k, rounds) * 100) / 100
                let dpr = Math.round(Dpr(d, rounds) * 100) / 100
                impact = Math.round((impact / maps) * 100) / 100
                rating = Rating(kd, kpr, dpr, impact)

                csv[index] =
                    [{
                        'logo_player': logo_player,
                        'name': name,
                        'nickname': nickname,
                        'surname': surname,
                        'player_id': player_id,
                        'country_flag': country_flag,
                        'date_birth': date_birth,
                        'kd': kd,
                        'kpr': kpr,
                        'dpr': dpr,
                        'impact': impact,
                        'rating': rating,
                        'k': k,
                        'a': a,
                        'd': d,
                        'rounds_w': rounds_w,
                        'rounds_l': rounds_l,
                        'maps': maps,
                        'maps_w': maps_w,
                        'maps_l': maps_l,
                        'rm': rm,
                        'team': team,
                        'back_logo_team': back_logo_team,
                        'link_vk': link_vk,
                        'link_yt': link_yt,
                        'link_telegram': link_telegram,
                        'link_discord': link_discord,
                    }]


                query += "UPDATE players SET " + 'kd=' + kd + ',' + 'kpr=' + kpr + ',' + 'dpr=' + dpr + ',' + 'impact=' + impact + ',' + 'rating=' + rating + ',' + 'k=' + k + ',' + 'a=' + a + ',' + 'd=' + d + ',' + 'w_rounds=' + rounds_w + ',' + 'l_rounds=' + rounds_l + ',' + 'maps=' + maps + ',' + 'w_maps=' + maps_w + ',' + 'l_maps=' + maps_l + ',' + 'rm=' + rm + " WHERE player_id=" + player_id + `; \n`
            }

            count = 0
            count_2 = 0
            count_l = 0
            count_2_l = 0
            // count_player = 0
            rounds = 0
            rounds_w = 0
            rounds_l = 0
            maps = 0
            maps_w = 0
            maps_l = 0
            kd = 0
            kpr = 0
            dpr = 0
            impact = 0
            rating = 0
            k = 0
            a = 0
            d = 0
            rm = 0

        })

        // console.log(csv)
        // console.log(query)
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
                    navigator.clipboard.writeText(query).then(() => {
                        console.log('Copy good')
                    }, () => {
                        console.log('Fail copy')
                    })
                }}>
                    Enter
                </div>
            </div>
            <div className={classes.resultCommand}>
                {query}
            </div>
        </div>
    );
};

export default AllStatsPlayersLastTour;