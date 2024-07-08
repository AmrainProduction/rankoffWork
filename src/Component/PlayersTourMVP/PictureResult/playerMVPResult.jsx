import React from 'react';
import classes from "../playersTourMVP.module.css";
import {
    useGetMatchesByNameTourQuery, useGetMatchesNecessaryPlayerQuery,
    useGetMatchesQuery, useGetPlayerByNickQuery,
    useGetPlayersQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery
} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";
import CurrentTeamPlayer from "../../../Function/currentTeamPlayer";
import normalizeRating from "../../Functions/AllFunctions/normalizeRating";
import normalizeImpact from "../../Functions/AllFunctions/normalizeImpact";
import normalizeKD from "../../Functions/AllFunctions/normalizeKD";

const PlayerMVPResult = (props) => {

    const choiceStage = props.stage
    const name = props.player.nickname
    const nickname = props.player.nickname
    const id = props.player.player_id
    const tour = props.name

    const matchesPlayer = useGetMatchesNecessaryPlayerQuery({name})
    const playerInfo = useGetPlayerByNickQuery({id, nickname})

    let matchesID = []
    let statsMvpPlayer = []
    let totalStatsPlayer = []

    let name_tour
    let date_match
    let logo_player
    let player_id
    let nameP
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
    let team_opponent
    let logo_team_opponent

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

    let count = 0
    let personal_let = 0
    let personal_kd_p = 0
    let personal_kpr_p = 0
    let personal_dpr_p = 0
    let personal_impact_p = 0
    let personal_rating = 0
    let personal_k = 0
    let personal_a = 0
    let personal_d = 0
    let personal_all_r = 0


    playerInfo?.data?.map(e => {
        player_id = e.player_id
        nameP = e.name
        surname = e.surname
        country_flag = e.country_flag
    })

    matchesPlayer?.data?.map(e => {
        if (e.name_tour_for_sort === tour) {
            matchesID.push(e.name_match_for_sort)
        }
    })

    matchesID = matchesID.filter((item, pos) => {
        return matchesID.indexOf(item) === pos
    })

    matchesID.map((e2, index) => {

        matchesPlayer?.data?.map(match => {
            if (match.name_match_for_sort === e2) {

                date_match = match.db_date_match
                name_tour = match.name_tour

                if ((match.t1p1 === nickname) || (match.t1p2 === nickname) || (match.t1p3 === nickname) || (match.t1p4 === nickname) || (match.t1p5 === nickname)) {
                    team = match.team1
                    logo_team = match.team1_logo

                    team_opponent = match.team2
                    logo_team_opponent = match.team2_logo

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

                if (match.t1p1 === nickname) {
                    logo_player = match.t1p1_logo
                    rating += normalizeRating(match.t1p1_rating)
                    impact_p += normalizeImpact(( match.t1p1_impact))
                    kd_p += normalizeKD(match.t1p1_kd)
                    kpr_p += (match.t1p1_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t1p1_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t1p1_k
                    a += match.t1p1_a
                    d += match.t1p1_d
                    count++
                }

                if (match.t1p2 === nickname) {
                    logo_player = match.t1p2_logo
                    rating += normalizeRating(match.t1p2_rating)
                    impact_p += normalizeImpact(match.t1p2_impact)
                    kd_p += normalizeKD(match.t1p2_kd)
                    kpr_p += (match.t1p2_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t1p2_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t1p2_k
                    a += match.t1p2_a
                    d += match.t1p2_d
                    count++
                }

                if (match.t1p3 === nickname) {
                    logo_player = match.t1p3_logo
                    rating += normalizeRating(match.t1p3_rating)
                    impact_p += normalizeImpact(match.t1p3_impact)
                    kd_p += normalizeKD(match.t1p3_kd)
                    kpr_p += (match.t1p3_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t1p3_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t1p3_k
                    a += match.t1p3_a
                    d += match.t1p3_d
                    count++
                }

                if (match.t1p4 === nickname) {
                    logo_player = match.t1p4_logo
                    rating += normalizeRating(match.t1p4_rating)
                    impact_p += normalizeImpact(match.t1p4_impact)
                    kd_p += normalizeKD(match.t1p4_kd)
                    kpr_p += (match.t1p4_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t1p4_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t1p4_k
                    a += match.t1p4_a
                    d += match.t1p4_d
                    count++
                }

                if (match.t1p5 === nickname) {
                    logo_player = match.t1p5_logo
                    rating += normalizeRating(match.t1p5_rating)
                    impact_p += normalizeImpact(match.t1p5_impact)
                    kd_p += normalizeKD(match.t1p5_kd)
                    kpr_p += (match.t1p5_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t1p5_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t1p5_k
                    a += match.t1p5_a
                    d += match.t1p5_d
                    count++
                }


                //----------сбор статистики игрока из второй команды------------------------------

                if ((match.t2p1 === nickname) || (match.t2p2 === nickname) || (match.t2p3 === nickname) || (match.t2p4 === nickname) || (match.t2p5 === nickname)) {

                    team = match.team2
                    logo_team = match.team2_logo

                    team_opponent = match.team1
                    logo_team_opponent = match.team1_logo

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

                if (match.t2p1 === nickname) {
                    logo_player = match.t2p1_logo
                    rating += normalizeRating(match.t2p1_rating)
                    impact_p += normalizeImpact(match.t2p1_impact)
                    kd_p += normalizeKD(match.t2p1_kd)
                    kpr_p += (match.t2p1_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t2p1_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t2p1_k
                    a += match.t2p1_a
                    d += match.t2p1_d
                    count++
                }

                if (match.t2p2 === nickname) {
                    logo_player = match.t2p2_logo
                    rating += normalizeRating(match.t2p2_rating)
                    impact_p += normalizeImpact(match.t2p2_impact)
                    kd_p += normalizeKD(match.t2p2_kd)
                    kpr_p += (match.t2p2_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t2p2_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t2p2_k
                    a += match.t2p2_a
                    d += match.t2p2_d
                    count++
                }

                if (match.t2p3 === nickname) {
                    logo_player = match.t2p3_logo
                    rating += normalizeRating(match.t2p3_rating)
                    impact_p += normalizeImpact(match.t2p3_impact)
                    kd_p += normalizeKD(match.t2p3_kd)
                    kpr_p += (match.t2p3_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t2p3_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t2p3_k
                    a += match.t2p3_a
                    d += match.t2p3_d
                    count++
                }

                if (match.t2p4 === nickname) {
                    logo_player = match.t2p4_logo
                    rating += normalizeRating(match.t2p4_rating)
                    impact_p += normalizeImpact(match.t2p4_impact)
                    kd_p += normalizeKD(match.t2p4_kd)
                    kpr_p += (match.t2p4_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t2p4_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t2p4_k
                    a += match.t2p4_a
                    d += match.t2p4_d
                    count++
                }

                if (match.t2p5 === nickname) {
                    logo_player = match.t2p5_logo
                    rating += normalizeRating( match.t2p5_rating)
                    impact_p += normalizeImpact(match.t2p5_impact)
                    kd_p += normalizeKD( match.t2p5_kd)
                    kpr_p += (match.t2p5_k / (match.total_r_team1 + match.total_r_team2))
                    dpr_p += (match.t2p5_d / (match.total_r_team1 + match.total_r_team2))
                    k += match.t2p5_k
                    a += match.t2p5_a
                    d += match.t2p5_d
                    count++
                }


                //----------сбор общей информации о трунире------------------------------

                maps_all = (count_1_win + count_2_win) + (count_1_lose + count_2_lose)
                maps_win = count_1_win + count_2_win
                maps_lose = (count_1_lose + count_2_lose)

            }
        })

        //фиксируем статистику игрока

        if (rating && impact_p) {

            personal_kd_p += kd_p
            personal_kpr_p += kpr_p
            personal_dpr_p += dpr_p
            personal_impact_p += impact_p
            personal_rating += rating
            personal_k += k
            personal_a += a
            personal_d += d
            personal_all_r += rounds_win + rounds_lose

            rating = rating / maps_all
            impact_p = impact_p / maps_all
            kd_p = kd_p / maps_all
            kpr_p = kpr_p / maps_all
            dpr_p = dpr_p / maps_all
            rm = rating + maps_all

            statsMvpPlayer[index] = {
                "name_tour": name_tour,
                "date_match": date_match,
                "logo_player": logo_player,
                "player_id": player_id,
                "name": nameP,
                "nickname": nickname,
                "surname": surname,
                "country_flag": country_flag,
                "kd_p": Math.round((k/d) * 100) / 100,
                "kpr_p": Math.round((k / (rounds_win + rounds_lose)) * 100) / 100,
                "dpr_p": Math.round((d / (rounds_win + rounds_lose)) * 100) / 100,
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
                "team_opponent": team_opponent,
                "logo_team_opponent": logo_team_opponent,
                "scoreWin": (count_1_win + count_2_win),
                "scoreLose": (count_1_lose + count_2_lose),
            }
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
        team_opponent = 0
        logo_team_opponent = 0
    })

    totalStatsPlayer[0] = {
        "name": nameP,
        "nickname": nickname,
        "surname": surname,
        "country_flag": country_flag,
        "kd_p": Math.round((personal_k/personal_d) * 100) / 100,
        "kpr_p": Math.round((personal_k / personal_all_r) * 100) / 100,
        "dpr_p": Math.round((personal_d / personal_all_r) * 100) / 100,
        "impact_p": Math.round((personal_impact_p / count) * 100) / 100,
        "rating": Math.round((personal_rating / count) * 100) / 100,
        "k": personal_k,
        "a": personal_a,
        "d": personal_d,
    }

    if (matchesID?.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <div className={classes.wrapperMain}>
                    <div className={classes.titleBanner}>
                        <img src={`/images/DataInImage/MVP_banner_title.svg`} alt="/"/>
                    </div>
                    <div
                        className={classes.nameTour}>{statsMvpPlayer[0]?.name_tour.toUpperCase()} {choiceStage.length > 0 ? "[" + choiceStage.toUpperCase() + "]" : ""}</div>
                    <div className={classes.tableStats}>
                        <div className={classes.rowTitleTable}>
                            <div className={classes.opponent}>Match</div>
                            <div className={classes.dateMatch}>Date</div>
                            <div className={classes.k}>K</div>
                            <div className={classes.a}>A</div>
                            <div className={classes.d}>D</div>
                            <div className={classes.kd}>KD</div>
                            <div className={classes.kpr}>KPR</div>
                            <div className={classes.impact}>Impact</div>
                            <div className={classes.rating}>Rating</div>
                        </div>
                        {statsMvpPlayer?.map((e, index) => {
                            return (
                                <div key={index} className={classes.rowTable}>
                                    <div className={classes.opponent}>
                                        <span style={{
                                            color: e.scoreWin >= e.scoreLose ? "#7bc551" : "#cc5656",
                                            marginRight: "5%"
                                        }}>{e.scoreWin}</span>:
                                        <span style={{
                                            marginLeft: "5%"
                                        }}>{e.scoreLose}</span>
                                        <img src={`/images/LogoTeams/${e.logo_team_opponent}`} alt="/"/>
                                    </div>
                                    <div className={classes.dateMatch}>{e.date_match}</div>
                                    <div className={classes.k}>{e.k}</div>
                                    <div className={classes.a}>{e.a}</div>
                                    <div className={classes.d}>{e.d}</div>
                                    <div className={classes.kd} style={
                                        {
                                            color: e.kd_p < 0.9 ? "#cc5656" : e.kd_p > 1.05 ? "#7bc551" : "#b29936"
                                        }
                                    }>{e.kd_p}</div>
                                    <div className={classes.kpr} style={
                                        {
                                            color: e.kpr_p < 0.60 ? "#cc5656" : e.kpr_p > 0.65 ? e.kpr_p > 0.70 ? "#7bc551" : "#b29936" : "#b29936"
                                        }
                                    }>{e.kpr_p}</div>
                                    <div className={classes.impact} style={
                                        {
                                            color: e.impact_p < 1 ? "#cc5656" : e.impact_p > 1 ? e.impact_p >= 1.15 ? "#7bc551" : "#b29936" : "#b29936"
                                        }
                                    }>{e.impact_p}</div>
                                    <div className={classes.rating} style={
                                        {
                                            color: e.rating < 1 ? "#cc5656" : e.rating > 1 ? e.rating >= 1.10 ? "#7bc551" : "#b29936" : "#b29936"
                                        }
                                    }>{e.rating}</div>
                                </div>
                            )
                        })}
                        <div className={classes.rowTitle}>Total:</div>
                        <div className={classes.rowTitleTotalTable}>
                            <div className={classes.flag}>
                                <CountryFlagPlayer nickname={totalStatsPlayer[0]?.nickname} width={'20px'}
                                                   height={'13px'} margin={'0 0 0 5px'}/>
                            </div>
                            <div className={classes.nicknameRow}>
                                {totalStatsPlayer[0]?.nickname}
                            </div>
                            <div className={classes.k}>{totalStatsPlayer[0]?.k}</div>
                            <div className={classes.a}>{totalStatsPlayer[0]?.a}</div>
                            <div className={classes.d}>{totalStatsPlayer[0]?.d}</div>
                            <div className={classes.kd} style={
                                {
                                    color: totalStatsPlayer[0]?.kd_p < 0.9 ? "#cc5656" : totalStatsPlayer[0]?.kd_p > 1.05 ? "#7bc551" : "#b29936"
                                }
                            }>{totalStatsPlayer[0]?.kd_p}</div>
                            <div className={classes.kpr} style={
                                {
                                    color: totalStatsPlayer[0]?.kpr_p < 0.60 ? "#cc5656" : totalStatsPlayer[0]?.kpr_p > 0.65 ? totalStatsPlayer[0]?.kpr_p > 0.70 ? "#7bc551" : "#b29936" : "#b29936"
                                }
                            }>{totalStatsPlayer[0]?.kpr_p}</div>
                            <div className={classes.impact} style={
                                {
                                    color: totalStatsPlayer[0]?.impact_p < 1 ? "#cc5656" : totalStatsPlayer[0]?.impact_p > 1 ? totalStatsPlayer[0]?.impact_p >= 1.15 ? "#7bc551" : "#b29936" : "#b29936"
                                }
                            }>{totalStatsPlayer[0]?.impact_p}</div>
                            <div className={classes.rating} style={
                                {
                                    color: totalStatsPlayer[0]?.rating < 1 ? "#cc5656" : totalStatsPlayer[0]?.rating > 1 ? totalStatsPlayer[0]?.rating >= 1.10 ? "#7bc551" : "#b29936" : "#b29936"
                                }
                            }>{totalStatsPlayer[0]?.rating}</div>
                        </div>
                    </div>
                    <div className={classes.player}>
                        <img src={`/images/LogoPlayers/${statsMvpPlayer[0]?.logo_player}`} alt="/"/>
                    </div>
                    <div className={classes.nickname}>{statsMvpPlayer[0]?.nickname.toUpperCase()}</div>
                    <div className={classes.name}>{statsMvpPlayer[0]?.name + " " + statsMvpPlayer[0]?.surname}</div>
                    <div className={classes.leftPictureMVP}>
                        <img src={`/images/DataInImage/MVP_banner_left_part_picture.svg`} alt="/"/>
                    </div>
                    <div className={classes.gradient}></div>
                    <div className={classes.backLogoPlayer}>
                        <img src={`/images/LogoTeams/${statsMvpPlayer[0]?.logo_team}`} alt="/"/>
                    </div>
                </div>
                <img src={`/images/DataInImage/MVP_banner.png`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }


};

export default PlayerMVPResult;