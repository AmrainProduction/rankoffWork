import React from 'react';
import classes from "../topPlayersTourML.module.css";
import {
    useGetMatchesByNameTourQuery,
    useGetMatchesQuery,
    useGetPlayersQuery, useGetShortMatchesByTournamentQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery
} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";
import CurrentTeamPlayer from "../../../Function/currentTeamPlayer";

const TopPlayersTourResultML = (props) => {

    const name = props.name
    const stage = (props.stage === "playoff" ? "PLAYOFF" : props.stage === "group" ? "GROUP STAGE" : "")

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesQuery()
    const allShortMatches = useGetShortMatchesByTournamentQuery({name})
    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const tourInfo = useGetTournamentByNameQuery({name})

    let players_tournaments = []
    let sortMatches = []
    let sortByStageMatches = []
    let nececssaryMatches = []

    let name_tour_sort
    let name_tour
    let date_tour
    let end_date_tour
    let logo_tour
    let logo_player
    let player_id
    let nameP
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
    let w_rounds
    let l_rounds
    let maps
    let rm
    let team
    let logo_team
    let team_id
    let position_team

    let count_1_win = 0
    let count_1_lose = 0
    let count_2_win = 0
    let count_2_lose = 0
    let rounds_win = 0
    let rounds_lose = 0
    let rounds = 0
    let maps_all = 0
    let maps_win = 0
    let maps_lose = 0

    sortMatches = allMatches?.data?.filter(e => e.name_tour_for_sort === name)

    if (props.stage && props.stage.length > 0) {
        if (props.stage === "group") {
            sortByStageMatches = allShortMatches?.data?.filter(e => e.name_stage.toLowerCase().includes(props.stage))

            sortByStageMatches?.map(e => {
                sortMatches?.map((e2, index) => {
                    if (e.name_match_for_sort === e2.name_match_for_sort) {
                        nececssaryMatches[index] = e2
                    }
                })
            })
        }

        if (props.stage === "playoff") {
            sortByStageMatches = allShortMatches?.data?.filter(e => e.name_stage.toLowerCase().includes(props.stage))

            sortByStageMatches?.map(e => {
                sortMatches?.map((e2, index) => {
                    if (e.name_match_for_sort === e2.name_match_for_sort) {
                        nececssaryMatches[index] = e2
                    }
                })
            })
        }

        if (props.stage === "full") {
            nececssaryMatches =  allMatches?.data?.filter(e => e.name_tour_for_sort === name)
        }

    } else {
        nececssaryMatches =  allMatches?.data?.filter(e => e.name_tour_for_sort === name)
    }

    allPlayers?.data?.map((player, index) => {
        player_id = player.player_id
        nameP = player.name
        nickname = player.nickname
        surname = player.surname
        country_flag = player.country_flag

        teamsTour?.data?.map(e => {
            if (player.team === e.name_team && e.name_tour_sort === name) {
                position_team = e.position_team
            }
        })

        tourInfo?.data?.map(e => {
            if (e.name_tour_sort === name) {
                date_tour = e.date_tour
                end_date_tour = e.date_end
                logo_tour = e.logo_tour
            }
        })

        nececssaryMatches?.map((match, indexMatch) => {

            //----------сбор общей информации о трунире------------------------------

            name_tour_sort = match.name_tour_for_sort
            name_tour = match.name_tour

            //----------сбор статистики игрока из первой команды------------------------------

            if ((match.t1p1 === nickname && match.t1p1_id === player_id) || (match.t1p2 === nickname && match.t1p2_id === player_id) || (match.t1p3 === nickname && match.t1p3_id === player_id) || (match.t1p4 === nickname && match.t1p4_id === player_id) || (match.t1p5 === nickname && match.t1p5_id === player_id)) {
                team = match.team1
                team_id = match.team1_id
                logo_team = match.team1_logo

                //подсчет поражений и побед игрока

                if (match.total_r_team1 > match.total_r_team2) {
                    count_1_win++
                }
                if (match.total_r_team1 < match.total_r_team2) {
                    count_1_lose++
                }

                //подсчет победных и проигранных раундов игрока

                rounds += (match.total_r_team1 + match.total_r_team2)
                rounds_win += match.total_r_team1
                rounds_lose += match.total_r_team2

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

                //подсчет поражений и побед игрока

                if (match.total_r_team1 < match.total_r_team2) {
                    count_2_win++
                }
                if (match.total_r_team1 > match.total_r_team2) {
                    count_2_lose++
                }

                //подсчет победных и проигранных раундов игрока

                rounds += (match.total_r_team1 + match.total_r_team2)
                rounds_win += match.total_r_team2
                rounds_lose += match.total_r_team1
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

            maps_all = (count_1_win + count_2_win) + (count_1_lose + count_2_lose)
            maps_win = count_1_win + count_2_win
            maps_lose = (count_1_lose + count_2_lose)

        })

        //фиксируем статистику каждого игрока

        if (rating && impact_p) {

            rating = rating / maps_all
            impact_p = impact_p / maps_all
            kd_p = kd_p / maps_all
            kpr_p = kpr_p / maps_all
            dpr_p = dpr_p / maps_all
            rm = rating + maps_all

            players_tournaments.push({
                "name_tour_sort": name_tour_sort,
                "name_tour": name_tour,
                "date_tour": date_tour,
                "end_date_tour": end_date_tour,
                "logo_tour": logo_tour,
                "logo_player": logo_player,
                "player_id": player_id,
                "name": nameP,
                "nickname": nickname,
                "surname": surname,
                "country_flag": country_flag,
                "kd_p": Math.round(kd_p * 100) / 100,
                "kpr_p": Math.round(kpr_p * 100) / 100,
                "dpr_p": Math.round(dpr_p * 100) / 100,
                "impact_p": Math.round(impact_p * 100) / 100,
                "rating": Math.round(rating * 100) / 100,
                "k": k,
                "a": a,
                "d": d,
                "w_rounds": rounds_win,
                "l_rounds": rounds_lose,
                "w_maps": (count_1_win + count_2_win),
                "l_maps": (count_1_lose + count_2_lose),
                "WL": Math.round((((count_1_win + count_2_win) === 0 ? 0 : (count_1_win + count_2_win)) / ((count_1_lose + count_2_lose) === 0 ? 1 : (count_1_lose + count_2_lose))) * 100) / 100,
                "maps": maps_all,
                "rm": maps_all,
                "team": team,
                "logo_team": logo_team,
                "team_id": team_id,
                "position_team": position_team,
            })
        }

        kd_p = 0
        kpr_p = 0
        dpr_p = 0
        impact_p = 0
        rating = 0
        k = 0
        a = 0
        d = 0
        rounds_win = 0
        rounds_lose = 0
        maps_all = 0
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
        date_tour = 0
        end_date_tour = 0
        logo_tour = 0


    })

    players_tournaments = players_tournaments.sort(function (a, b) {
        return (parseFloat(b.rating) - parseFloat(a.rating))
    });

//сортировочный алгоритм

    let max_maps = 0
    let tempArr = []
    let sortPlayersArr = []

    players_tournaments.map(e => {
        if (max_maps < e.maps) {
            max_maps = e.maps
        }
    })

    let divider = 2

    while (max_maps > 1) {

        tempArr = []

        max_maps = Math.round((max_maps / divider) * 10) / 10

        divider += 0.04

        players_tournaments.map(e => {
            if (e.maps >= max_maps) {
                tempArr.push(e)
            }
        })

        tempArr = tempArr.sort((a, b) => (b.rating) - (a.rating))

        sortPlayersArr = [...sortPlayersArr, ...tempArr]

    }

    sortPlayersArr = sortPlayersArr.filter((item, index) => {
        return sortPlayersArr.indexOf(item) === index
    });

    if (players_tournaments.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <div className={classes.nameTour}>{players_tournaments[0].name_tour.toUpperCase()} {stage}</div>
                <div className={classes.topResult}>
                    <div className={classes.wrapperPlayerTitle}>
                        <div className={classes.playerTitle}>
                            <div className={classes.dataNumberPlayerTitle}>#</div>
                            <div className={classes.dataNicknamePlayerNickname}>NICKNAME</div>
                            <div className={classes.dataPlayerK}>KILLS</div>
                            <div className={classes.dataPlayerD}>DEATHS</div>
                            <div className={classes.dataPlayerA}>ASSISTS</div>
                            <div className={classes.dataPlayerDiff}>DIFF</div>
                            <div className={classes.dataPlayerKd}>KD</div>
                            <div className={classes.dataPlayerKpr}>KPR</div>
                            <div className={classes.dataPlayerMaps}>MAPS</div>
                            <div className={classes.dataPlayerW_rounds}>W/L</div>
                            <div className={classes.dataPlayerImpact}>IMPACT</div>
                            <div className={classes.dataPlayerRating}>RATING</div>
                        </div>
                    </div>
                    {sortPlayersArr.map((e, index) => {
                        if (index < 20) {
                            return (
                                <div key={index} className={classes.wrapperPlayer}>
                                    <div className={classes.player}>
                                        <div className={classes.dataNumberPlayerTitle}>{++index}<span
                                            className={classes.separator1}></span></div>
                                        <div className={classes.dataNicknamePlayerNickname}>{e.nickname}<span
                                            className={classes.separator2}></span></div>
                                        <div className={classes.dataPlayerK}>{e.k}<span
                                            className={classes.separator3}></span></div>
                                        <div className={classes.dataPlayerD}>{e.d}<span
                                            className={classes.separator4}></span></div>
                                        <div className={classes.dataPlayerA}>{e.a}<span
                                            className={classes.separator5}></span></div>
                                        <div className={classes.dataPlayerDiff} style={
                                            {
                                                color: (e.k - e.d) < 0 ? "#e02b25" : "#4ae025"
                                            }
                                        }>{e.k - e.d}<span className={classes.separator6}></span></div>
                                        <div className={classes.dataPlayerKd} style={
                                            {
                                                color: e.kd_p < 0.9 ? "#e02b25" : e.kd_p > 1.05 ? "#4ae025" : "#e0c725"
                                            }
                                        }>{e.kd_p}
                                            <span className={classes.separator7}></span></div>
                                        <div className={classes.dataPlayerKpr} style={
                                            {
                                                color: e.kpr_p < 0.60 ? "#e02b25" : e.kpr_p > 0.65 ? e.kpr_p > 0.70 ? "#4ae025" : "#e0c725" : "#e0c725"
                                            }
                                        }>{e.kpr_p}<span className={classes.separator8}></span></div>
                                        <div className={classes.dataPlayerMaps}>{e.maps}<span
                                            className={classes.separator9}></span></div>
                                        <div className={classes.dataPlayerW_rounds} style={
                                            {
                                                color: e.WL >= 1 ? "#4ae025" : "#e02b25"
                                            }
                                        }>{e.WL}<span className={classes.separator10}></span></div>
                                        <div className={classes.dataPlayerImpact} style={
                                            {
                                                color: e.impact_p < 1 ? "#e02b25" : e.impact_p > 1 ? e.impact_p >= 1.15 ? "#4ae025" : "#e0c725" : "#e0c725"
                                            }
                                        }>{e.impact_p}<span className={classes.separator11}></span></div>
                                        <div className={classes.dataPlayerRating} style={
                                            {
                                                color: e.rating < 1 ? "#e02b25" : e.rating > 1 ? e.rating >= 1.10 ? "#4ae025" : "#e0c725" : "#e0c725"
                                            }
                                        }>{e.rating}</div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <img src={`/images/DataInImage/TOP_PLAYERS_TOUR_MOBLIVE2.png`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }


};

export default TopPlayersTourResultML;