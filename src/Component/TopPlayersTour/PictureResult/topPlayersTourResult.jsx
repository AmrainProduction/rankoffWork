import React from 'react';
import classes from "../topPlayersTour.module.css";
import {
    useGetMatchesByNameTourQuery,
    useGetMatchesQuery,
    useGetPlayersQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery
} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";
import CurrentTeamPlayer from "../../../Function/currentTeamPlayer";

const TopPlayersTourResult = (props) => {

    const name = props.name

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesQuery()
    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const tourInfo = useGetTournamentByNameQuery({name})

    let players_tournaments = []
    let sortMatches = []

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
// sortMatches = allMatches?.data

    allPlayers?.data?.map((player, index) => {
        player_id = player.player_id
        nameP = player.name
        nickname = player.nickname
        surname = player.surname
        country_flag = player.country_flag

        teamsTour?.data?.map(e => {
            if(player.team === e.name_team && e.name_tour_sort === name) {
                position_team = e.position_team
            }
        })

        tourInfo?.data?.map(e => {
            if(e.name_tour_sort === name) {
                date_tour = e.date_tour
                end_date_tour = e.date_end
                logo_tour = e.logo_tour
            }
        })

        sortMatches?.map((match, indexMatch) => {

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

    while(max_maps > 1) {

        tempArr = []

        max_maps = Math.round((max_maps / divider) * 10) / 10

        divider += 0.04

        players_tournaments.map(e => {
            if(e.maps >= max_maps) {
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
                <div className={classes.wrapperTourInfo}>
                <div className={classes.nameTour}>{players_tournaments[0].name_tour} [GROUP STAGE]</div>
                <div className={classes.nameTour}></div>
                <div className={classes.logoTour}>
                    <img src={`/images/LogoAndBannerTour/${players_tournaments[0].logo_tour}`} alt="/"/>
                </div>
                </div>
                <div className={classes.topResult}>
                    <div className={classes.wrapperPlayerTitle}>
                        <div className={classes.playerTitle}>
                            <div className={classes.dataNumberPlayerTitle}>#</div>
                            <div className={classes.logoTeamTeam}>Team</div>
                            <div className={classes.dataNicknamePlayerNickname}>Nickname</div>
                            <div className={classes.dataFlagPlayerCountry}>CTR</div>
                            <div className={classes.dataPlayerKd}>KD</div>
                            <div className={classes.dataPlayerKpr}>KPR</div>
                            <div className={classes.dataPlayerDpr}>DPR</div>
                            <div className={classes.dataPlayerK}>K</div>
                            <div className={classes.dataPlayerA}>A</div>
                            <div className={classes.dataPlayerD}>D</div>
                            <div className={classes.dataPlayerImpact}>Impact</div>
                            <div className={classes.dataPlayerRating}>Rating</div>
                            <div className={classes.dataPlayerW_rounds}>WR</div>
                            <div className={classes.dataPlayerL_rounds}>LR</div>
                            <div className={classes.dataPlayerMaps}>Maps</div>
                        </div>
                    </div>
                    {sortPlayersArr.map((e, index) => {
                        if (index < 20) {
                            return (
                                <div key={index} className={classes.wrapperPlayer}>
                                    <div className={classes.player}>
                                        <div className={classes.dataNumberPlayerTitle}>{++index}</div>
                                        <div className={classes.logoTeam}>
                                            <img src={`/images/LogoTeams/${e.logo_team}`} alt="/"/>
                                        </div>
                                        <div className={classes.dataNicknamePlayerNickname}>{e.nickname}</div>
                                        <div className={classes.dataFlagPlayerCountry}>
                                            <CountryFlagPlayer nickname={e.nickname} width={'20px'}
                                                               height={'13px'} margin={'0 0 0 5px'}/>
                                        </div>
                                        <div className={classes.dataPlayerKd} style={
                                            {
                                                background: e.kd_p < 0.9 ? "#854141" : e.kd_p > 1.05 ? "#528347" : "#a29747"
                                            }
                                        }>{e.kd_p}
                                        </div>
                                        <div className={classes.dataPlayerKpr} style={
                                            {
                                                background: e.kpr_p < 0.60 ? "#854141" : e.kpr_p > 0.65 ? e.kpr_p > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                            }
                                        }>{e.kpr_p}</div>
                                        <div className={classes.dataPlayerDpr} style={
                                            {
                                                background: e.dpr_p < 0.68 ? "#528347" : e.dpr_p > 0.7 ? e.dpr_p > 0.8 ? "#854141" : "#a29747" : "#854141"
                                            }
                                        }>{e.dpr_p}</div>
                                        <div className={classes.dataPlayerK}>{e.k}</div>
                                        <div className={classes.dataPlayerA}>{e.a}</div>
                                        <div className={classes.dataPlayerD}>{e.d}</div>
                                        <div className={classes.dataPlayerImpact} style={
                                            {
                                                background: e.impact_p < 1 ? "#854141" : e.impact_p > 1 ? e.impact_p >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                            }
                                        }>{e.impact_p}</div>
                                        <div className={classes.dataPlayerRating} style={
                                            {
                                                background: e.rating < 1 ? "#854141" : e.rating > 1 ? e.rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                            }
                                        }>{e.rating}</div>
                                        <div className={classes.dataPlayerW_rounds}>{e.w_rounds}</div>
                                        <div className={classes.dataPlayerL_rounds}>{e.l_rounds}</div>
                                        <div className={classes.dataPlayerMaps}>{e.maps}</div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <img src={`/images/DataInImage/TOP_PLAYERS_TOUR_V3.png`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }


};

export default TopPlayersTourResult;