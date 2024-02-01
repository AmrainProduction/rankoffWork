import React from 'react';
import classes from "../TopYearTeams.module.css";
import {
    useGetAwardsPlayersByNickQuery,
    useGetMatchesByNameQuery, useGetMatchesNecessaryTeamQuery, useGetPlayerByNickQuery,
    useGetPlayersTournamentsByNickDescQuery, useGetTeamsTournamentsByNameTeamQuery
} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";

const PictureResult2 = (props) => {

    let id = props.team[0]
    let name = props.team[1]

    const teamMatches = useGetMatchesNecessaryTeamQuery({id})
    const teamTours = useGetTeamsTournamentsByNameTeamQuery({id, name})
    id = 6
    name = 'Death Or Glory'
    const teamMatches2 = useGetMatchesNecessaryTeamQuery({id})
    const teamTours2 = useGetTeamsTournamentsByNameTeamQuery({id, name})
    let temp1 = []
    let temp2 = []

    if(teamMatches2.data && teamTours2.data && teamMatches.data && teamTours.data && teamMatches2.data.length > 0 && teamTours2.data.length > 0 && teamMatches.data.length > 0 && teamTours.data.length > 0) {
        teamMatches2.data = teamMatches2.data.filter(e => e.name_tour_for_sort === "GamesOfFuture_27_05_23" || e.name_tour_for_sort === "Major_06_06_23" || e.name_tour_for_sort === "Epic_09_07_23" || e.name_tour_for_sort === "MastersWay_28_07_23")
        teamTours2.data = teamTours2.data.filter(e => e.name_tour_sort === "GamesOfFuture_27_05_23" || e.name_tour_sort === "Major_06_06_23" || e.name_tour_sort === "Epic_09_07_23" || e.name_tour_sort === "MastersWay_28_07_23")

        teamMatches.data = [...teamMatches.data, ...teamMatches2.data]
        teamTours.data = [...teamTours.data, ...teamTours2.data]
    }


    id = props.team[0]
    name = props.team[1]
// console.log(teamMatches.data)
    let stats2023 = []
    let tours2023 = []
    let maps2023 = []

    let Sandstone = 0
    let Rust = 0
    let Province = 0
    let Zone9 = 0
    let Sakura = 0
    let Breeze = 0
    let Dune = 0
    let SandstoneL = 0
    let RustL = 0
    let ProvinceL = 0
    let Zone9L = 0
    let SakuraL = 0
    let BreezeL = 0
    let DuneL = 0
    let allMaps = 0

    let logo_team
    let p1
    let p2
    let p3
    let p4
    let p5
    let p1_logo
    let p2_logo
    let p3_logo
    let p4_logo
    let p5_logo
    let kd_p = 0
    let kpr_p = 0
    let dpr_p = 0
    let k = 0
    let a = 0
    let d = 0
    let impact_p = 0
    let rating = 0
    let w_rounds = 0
    let l_rounds = 0
    let maps = 0
    let count = 0

    //счиатем стату игрока за 2023 год
    if (teamMatches.data && teamMatches.data.length > 0 && teamTours.data && teamTours.data.length > 0) {


        teamMatches.data.map(e => {
            if (e.db_date_match.slice(0, 4) === '2023') {
                if (e.team1_id === id || e.team1_id === 6) {

                    if( e.name_match_for_sort === 'HorizonPepes_06_12_23') {
                        logo_team = e.team1_logo
                        p1 = e.t1p1
                        p2 = e.t1p2
                        p3 = e.t1p3
                        p4 = e.t1p4
                        p5 = e.t1p5

                        p1_logo = e.t1p1_logo
                        p2_logo = e.t1p2_logo
                        p3_logo = e.t1p3_logo
                        p4_logo = e.t1p4_logo
                        p5_logo = e.t1p5_logo
                    }

                    kd_p += e.t1p1_kd + e.t1p2_kd + e.t1p3_kd + e.t1p4_kd + e.t1p5_kd
                    kpr_p += (e.t1p1_k / (e.total_r_team1 + e.total_r_team2)) + (e.t1p2_k / (e.total_r_team1 + e.total_r_team2)) + (e.t1p3_k / (e.total_r_team1 + e.total_r_team2)) + (e.t1p4_k / (e.total_r_team1 + e.total_r_team2)) + (e.t1p5_k / (e.total_r_team1 + e.total_r_team2))
                    dpr_p += (e.t1p1_d / (e.total_r_team1 + e.total_r_team2)) + (e.t1p2_d / (e.total_r_team1 + e.total_r_team2)) + (e.t1p3_d / (e.total_r_team1 + e.total_r_team2)) + (e.t1p4_d / (e.total_r_team1 + e.total_r_team2)) + (e.t1p5_d / (e.total_r_team1 + e.total_r_team2))
                    k += e.t1p1_k + e.t1p2_k + e.t1p3_k + e.t1p4_k + e.t1p5_k
                    a += e.t1p1_a + e.t1p2_a + e.t1p3_a + e.t1p4_a + e.t1p5_a
                    d += e.t1p1_d + e.t1p2_d + e.t1p3_d + e.t1p4_d + e.t1p5_d
                    impact_p += e.t1p1_impact + e.t1p2_impact + e.t1p3_impact + e.t1p4_impact + e.t1p5_impact
                    rating += e.t1p1_rating + e.t1p2_rating + e.t1p3_rating + e.t1p4_rating + e.t1p5_rating
                    w_rounds += e.total_r_team1
                    l_rounds += e.total_r_team2
                    maps++
                    count = count + 5

                    if (e.map === "Sandstone") {
                        if (e.total_r_team1 > e.total_r_team2) {
                            Sandstone++
                        } else {
                            SandstoneL++
                        }
                    }

                    if (e.map === "Rust") {
                        if (e.total_r_team1 > e.total_r_team2) {
                            Rust++
                        } else {
                            RustL++
                        }
                    }

                    if (e.map === "Province") {
                        if (e.total_r_team1 > e.total_r_team2) {
                            Province++
                        } else {
                            ProvinceL++
                        }
                    }

                    if (e.map === "Zone9") {
                        if (e.total_r_team1 > e.total_r_team2) {
                            Zone9++
                        } else {
                            Zone9L++
                        }
                    }

                    if (e.map === "Sakura") {
                        if (e.total_r_team1 > e.total_r_team2) {
                            Sakura++
                        } else {
                            SakuraL++
                        }
                    }

                    if (e.map === "Breeze") {
                        if (e.total_r_team1 > e.total_r_team2) {
                            Breeze++
                        } else {
                            BreezeL++
                        }
                    }

                    if (e.map === "Dune") {
                        if (e.total_r_team1 > e.total_r_team2) {
                            Dune++
                        } else {
                            DuneL++
                        }
                    }

                }

                if (e.team2_id === id || e.team2_id === 6) {

                    if( e.name_match_for_sort === 'HorizonPepes_06_12_23') {
                        logo_team = e.team2_logo
                        p1 = e.t2p1
                        p2 = e.t2p2
                        p3 = e.t2p3
                        p4 = e.t2p4
                        p5 = e.t2p5

                        p1_logo = e.t2p1_logo
                        p2_logo = e.t2p2_logo
                        p3_logo = e.t2p3_logo
                        p4_logo = e.t2p4_logo
                        p5_logo = e.t2p5_logo
                    }

                    kd_p += e.t2p1_kd + e.t2p2_kd + e.t2p3_kd + e.t2p4_kd + e.t2p5_kd
                    kpr_p += (e.t2p1_k / (e.total_r_team1 + e.total_r_team2)) + (e.t2p2_k / (e.total_r_team1 + e.total_r_team2)) + (e.t2p3_k / (e.total_r_team1 + e.total_r_team2)) + (e.t2p4_k / (e.total_r_team1 + e.total_r_team2)) + (e.t2p5_k / (e.total_r_team1 + e.total_r_team2))
                    dpr_p += (e.t2p1_d / (e.total_r_team1 + e.total_r_team2)) + (e.t2p2_d / (e.total_r_team1 + e.total_r_team2)) + (e.t2p3_d / (e.total_r_team1 + e.total_r_team2)) + (e.t2p4_d / (e.total_r_team1 + e.total_r_team2)) + (e.t2p5_d / (e.total_r_team1 + e.total_r_team2))
                    k += e.t2p1_k + e.t2p2_k + e.t2p3_k + e.t2p4_k + e.t2p5_k
                    a += e.t2p1_a + e.t2p2_a + e.t2p3_a + e.t2p4_a + e.t2p5_a
                    d += e.t2p1_d + e.t2p2_d + e.t2p3_d + e.t2p4_d + e.t2p5_d
                    impact_p += e.t2p1_impact + e.t2p2_impact + e.t2p3_impact + e.t2p4_impact + e.t2p5_impact
                    rating += e.t2p1_rating + e.t2p2_rating + e.t2p3_rating + e.t2p4_rating + e.t2p5_rating
                    w_rounds += e.total_r_team2
                    l_rounds += e.total_r_team1
                    maps++
                    count = count + 5

                    if (e.map === "Sandstone") {
                        if (e.total_r_team1 < e.total_r_team2) {
                            Sandstone++
                        } else {
                            SandstoneL++
                        }
                    }

                    if (e.map === "Rust") {
                        if (e.total_r_team1 < e.total_r_team2) {
                            Rust++
                        } else {
                            RustL++
                        }
                    }

                    if (e.map === "Province") {
                        if (e.total_r_team1 < e.total_r_team2) {
                            Province++
                        } else {
                            ProvinceL++
                        }
                    }

                    if (e.map === "Zone9") {
                        if (e.total_r_team1 < e.total_r_team2) {
                            Zone9++
                        } else {
                            Zone9L++
                        }
                    }

                    if (e.map === "Sakura") {
                        if (e.total_r_team1 < e.total_r_team2) {
                            Sakura++
                        } else {
                            SakuraL++
                        }
                    }

                    if (e.map === "Breeze") {
                        if (e.total_r_team1 < e.total_r_team2) {
                            Breeze++
                        } else {
                            BreezeL++
                        }
                    }

                    if (e.map === "Dune") {
                        if (e.total_r_team1 < e.total_r_team2) {
                            Dune++
                        } else {
                            DuneL++
                        }
                    }
                }
            }

        })

        stats2023 = [{
            "logo_team": logo_team,
            "p1": p1,
            "p2": p2,
            "p3": p3,
            "p4": p4,
            "p5": p5,
            "p1_logo": p1_logo,
            "p2_logo": p2_logo,
            "p3_logo": p3_logo,
            "p4_logo": p4_logo,
            "p5_logo": p5_logo,
            "kd": Math.round((kd_p / count) * 100) / 100,
            "kpr": Math.round((kpr_p / count) * 100) / 100,
            "dpr": Math.round((dpr_p / count) * 100) / 100,
            "k": k,
            "a": a,
            "d": d,
            "diff": k - d,
            "impact": Math.round((impact_p / count) * 100) / 100,
            "rating": Math.round((rating / count) * 100) / 100,
            "w_rounds": w_rounds,
            "l_rounds": l_rounds,
            "maps": maps,
        }]

        teamTours.data.map(e => {
            if (e.end_date_tour.slice(0, 4) === '2023') {
                tours2023.push(e)
            }
        })

        allMaps = Sandstone + Rust + Province + Zone9 + Sakura + Breeze + Dune + SandstoneL + RustL + ProvinceL + Zone9L + SakuraL + BreezeL + DuneL

        maps2023 = [{
            "Sandstone": Math.floor(100 / (allMaps / Sandstone)),
            "Rust": Math.floor(100 / (allMaps / Rust)),
            "Province": Math.floor(100 / (allMaps / Province)),
            "Zone9": Math.floor(100 / (allMaps / Zone9)),
            "Sakura": Math.floor(100 / (allMaps / Sakura)),
            "Breeze": Math.floor(100 / (allMaps / Breeze)),
            "Dune": Math.floor(100 / (allMaps / Dune)),
        }]

        return (
            <div className={classes.wrapperTopYearTeams}>
                <div className={classes.topYearTeams}>
                    <div className={classes.topSection}>
                        <div className={classes.placeTeam}>#7</div>
                    </div>
                    <div className={classes.playersSection}>
                        <div className={classes.logoTeam}>
                            <img src={`/images/LogoTeams/${stats2023[0].logo_team}`} alt="/"/>
                        </div>
                        <div className={classes.gradLogoTeam}></div>
                        {/*<div className={classes.nicknameP1}>{stats2023[0].p1}</div>*/}
                        {/*<div className={classes.nicknameP2}>{stats2023[0].p2}</div>*/}
                        {/*<div className={classes.nicknameP3}>{stats2023[0].p3}</div>*/}
                        {/*<div className={classes.nicknameP4}>{stats2023[0].p4}</div>*/}
                        {/*<div className={classes.nicknameP5}>{stats2023[0].p5}</div>*/}
                        <div className={classes.nicknames}>{stats2023[0].p1 + " - " + stats2023[0].p2 + " - " + stats2023[0].p3 + " - " + stats2023[0].p4 + " - " + stats2023[0].p5}</div>
                        <div className={classes.playersTeam}>
                            <img src={`/images/LogoPlayers/${stats2023[0].p1_logo}`} className={classes.playersTeam1} alt="/"/>
                            <img src={`/images/LogoPlayers/${stats2023[0].p2_logo}`} className={classes.playersTeam2} alt="/"/>
                            <img src={`/images/LogoPlayers/${stats2023[0].p3_logo}`} className={classes.playersTeam3} alt="/"/>
                            <img src={`/images/LogoPlayers/${stats2023[0].p4_logo}`} className={classes.playersTeam4} alt="/"/>
                            <img src={`/images/LogoPlayers/${stats2023[0].p5_logo}`} className={classes.playersTeam5} alt="/"/>
                        </div>
                        <div className={classes.gradPlayersTeam}>{name.toUpperCase()}</div>
                    </div>
                    <div className={classes.statsSection}>
                        <div className={classes.wrapperPlayerTitle}>
                            <div className={classes.dataPlayerKd}>kd</div>
                            <div className={classes.dataPlayerKpr}>kpr</div>
                            <div className={classes.dataPlayerDpr}>dpr</div>
                            <div className={classes.dataPlayerK}>k</div>
                            <div className={classes.dataPlayerA}>a</div>
                            <div className={classes.dataPlayerD}>d</div>
                            <div className={classes.dataPlayerDiff}>k-d</div>
                            <div className={classes.dataPlayerImpact}>impact</div>
                            <div className={classes.dataPlayerRating}>rating</div>
                            <div className={classes.dataPlayerW_rounds}>w_rounds</div>
                            <div className={classes.dataPlayerL_rounds}>l_rounds</div>
                            <div className={classes.dataPlayerMaps}>maps</div>
                        </div>

                        {stats2023.map((e, index) => {
                            return (
                                <div key={index} className={classes.player2023Stats}>
                                    <div className={classes.dataPlayer1} style={
                                        {
                                            background: e.kd_p < 0.9 ? "#854141" : e.kd_p > 1.05 ? "#528347" : "#a29747"
                                        }
                                    }>{e.kd}</div>
                                    <div className={classes.dataPlayer2} style={
                                        {
                                            background: e.kpr_p < 0.60 ? "#854141" : e.kpr_p > 0.65 ? e.kpr_p > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                        }
                                    }>{e.kpr}</div>
                                    <div className={classes.dataPlayer3} style={
                                        {
                                            background: e.dpr_p < 0.68 ? "#528347" : e.dpr_p > 0.7 ? e.dpr_p > 0.8 ? "#854141" : "#a29747" : "#854141"
                                        }
                                    }>{e.dpr}</div>
                                    <div className={classes.dataPlayer4}>{e.k}</div>
                                    <div className={classes.dataPlayer5}>{e.a}</div>
                                    <div className={classes.dataPlayer6}>{e.d}</div>
                                    <div className={classes.dataPlayer7} style={
                                        {
                                            background: (e.k - e.d) > 0 ? "#528347" : "#854141"
                                        }
                                    }>{e.diff}</div>
                                    <div className={classes.dataPlayer8} style={
                                        {
                                            background: e.impact_p < 1 ? "#854141" : e.impact_p > 1 ? e.impact_p >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                        }
                                    }>{e.impact}</div>
                                    <div className={classes.dataPlayer9} style={
                                        {
                                            background: e.rating < 1 ? "#854141" : e.rating > 1 ? e.rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                        }
                                    }>{e.rating}</div>
                                    <div className={classes.dataPlayer10}>{e.w_rounds}</div>
                                    <div className={classes.dataPlayer11}>{e.l_rounds}</div>
                                    <div className={classes.dataPlayer12}>{e.maps}</div>
                                </div>
                            )
                        })}

                    </div>
                    <div className={classes.eventsSection}>
                        <div className={classes.leftSection}>
                            {tours2023.map((e, index) => {
                                return (
                                    <div className={classes.wrapperTourCard} style={
                                        {
                                            background: e.position_team === 3 ? " linear-gradient(to right, #995928 1%, transparent 70%)" : e.position_team === 2 ? " linear-gradient(to right, #868B8DFF 1%, transparent 70%)" : e.position_team === 1 ? " linear-gradient(to right, #A29747FF 1%, transparent 70%)" : ""
                                        }
                                    }>
                                        <img src={`/images/LogoAndBannerTour/${e.logo_tour}`} alt="/"/>
                                        <div className={classes.name_tour}>{e.name_tour}</div>
                                        <div className={classes.end_date_tour}>{e.end_date_tour}</div>
                                        <div className={classes.position_team}>{e.position_team} Place</div>
                                        <div className={classes.prize_team}>Prize: {e.prize_team}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={classes.rightSection}>
                            <div className={classes.wrapperMap}>
                                <div className={classes.nameMap}>Sandstone</div>
                                <div className={classes.mapMatch}>
                                    <img src={`/images/LogoMaps/Sandstone.jpg`} alt=""/>
                                    <div className={classes.mapMatchBG}></div>
                                    <div className={classes.wrapperScoreForMap}>
                                        {Math.floor(100 / ((Sandstone + SandstoneL) / Sandstone))}%
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wrapperMap}>
                                <div className={classes.nameMap}>Rust</div>
                                <div className={classes.mapMatch}>
                                    <img src={`/images/LogoMaps/Rust.jpg`} alt=""/>
                                    <div className={classes.mapMatchBG}></div>
                                    <div className={classes.wrapperScoreForMap}>
                                        {Math.floor(100 / ((Rust + RustL) / Rust))}%
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wrapperMap}>
                                <div className={classes.nameMap}>Province</div>
                                <div className={classes.mapMatch}>
                                    <img src={`/images/LogoMaps/Province.jpg`} alt=""/>
                                    <div className={classes.mapMatchBG}></div>
                                    <div className={classes.wrapperScoreForMap}>
                                        {Math.floor(100 / ((Province + ProvinceL) / Province))}%
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wrapperMap}>
                                <div className={classes.nameMap}>Zone 9</div>
                                <div className={classes.mapMatch}>
                                    <img src={`/images/LogoMaps/Zone9.jpg`} alt=""/>
                                    <div className={classes.mapMatchBG}></div>
                                    <div className={classes.wrapperScoreForMap}>
                                        {Math.floor(100 / ((Zone9 + Zone9L) / Zone9))}%
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wrapperMap}>
                                <div className={classes.nameMap}>Sakura</div>
                                <div className={classes.mapMatch}>
                                    <img src={`/images/LogoMaps/Sakura.jpg`} alt=""/>
                                    <div className={classes.mapMatchBG}></div>
                                    <div className={classes.wrapperScoreForMap}>
                                        {Math.floor(100 / ((Sakura + SakuraL) / Sakura))}%
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wrapperMap}>
                                <div className={classes.nameMap}>Breeze</div>
                                <div className={classes.mapMatch}>
                                    <img src={`/images/LogoMaps/Breeze.jpg`} alt=""/>
                                    <div className={classes.mapMatchBG}></div>
                                    <div className={classes.wrapperScoreForMap}>
                                        {Math.floor(100 / ((Breeze + BreezeL) / Breeze))}%
                                    </div>
                                </div>
                            </div>
                            <div className={classes.wrapperMap}>
                                <div className={classes.nameMap}>Dune</div>
                                <div className={classes.mapMatch}>
                                    <img src={`/images/LogoMaps/Dune.jpg`} alt=""/>
                                    <div className={classes.mapMatchBG}></div>
                                    <div className={classes.wrapperScoreForMap}>
                                        {Math.floor(100 / ((Dune + DuneL) / Dune))}%
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <img src={`/images/DataInImage/TOP_TEAMS_2023_TEST.png`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }
};

export default PictureResult2;