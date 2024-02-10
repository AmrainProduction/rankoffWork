import React from 'react';
import classes from "../resultMatchRGG.module.css";
import {useGetMatchesByNameQuery} from "../../../../store/api/apiSlice";


const PictureResultRGG = (props) => {
    const name = props.name

    const necessaryMatch = useGetMatchesByNameQuery({name})

    let players = []
    let matchTeamsInfo = []
    let matchMaps = []

    let count = 0

    let scoreT1 = 0
    let scoreT2 = 0
    let dateMatch
    let NameTour
    let logoTour

    let t1p1
    let t1p2
    let t1p3
    let t1p4
    let t1p5
    let t2p1
    let t2p2
    let t2p3
    let t2p4
    let t2p5
    let t1p1_logo
    let t1p2_logo
    let t1p3_logo
    let t1p4_logo
    let t1p5_logo
    let t2p1_logo
    let t2p2_logo
    let t2p3_logo
    let t2p4_logo
    let t2p5_logo

    let t1p1_k = 0
    let t1p2_k = 0
    let t1p3_k = 0
    let t1p4_k = 0
    let t1p5_k = 0
    let t2p1_k = 0
    let t2p2_k = 0
    let t2p3_k = 0
    let t2p4_k = 0
    let t2p5_k = 0

    let t1p1_a = 0
    let t1p2_a = 0
    let t1p3_a = 0
    let t1p4_a = 0
    let t1p5_a = 0
    let t2p1_a = 0
    let t2p2_a = 0
    let t2p3_a = 0
    let t2p4_a = 0
    let t2p5_a = 0

    let t1p1_d = 0
    let t1p2_d = 0
    let t1p3_d = 0
    let t1p4_d = 0
    let t1p5_d = 0
    let t2p1_d = 0
    let t2p2_d = 0
    let t2p3_d = 0
    let t2p4_d = 0
    let t2p5_d = 0

    let t1p1_kd = 0
    let t1p2_kd = 0
    let t1p3_kd = 0
    let t1p4_kd = 0
    let t1p5_kd = 0
    let t2p1_kd = 0
    let t2p2_kd = 0
    let t2p3_kd = 0
    let t2p4_kd = 0
    let t2p5_kd = 0

    let t1p1_kpr = 0
    let t1p2_kpr = 0
    let t1p3_kpr = 0
    let t1p4_kpr = 0
    let t1p5_kpr = 0
    let t2p1_kpr = 0
    let t2p2_kpr = 0
    let t2p3_kpr = 0
    let t2p4_kpr = 0
    let t2p5_kpr = 0

    let t1p1_dpr = 0
    let t1p2_dpr = 0
    let t1p3_dpr = 0
    let t1p4_dpr = 0
    let t1p5_dpr = 0
    let t2p1_dpr = 0
    let t2p2_dpr = 0
    let t2p3_dpr = 0
    let t2p4_dpr = 0
    let t2p5_dpr = 0

    let t1p1_impact = 0
    let t1p2_impact = 0
    let t1p3_impact = 0
    let t1p4_impact = 0
    let t1p5_impact = 0
    let t2p1_impact = 0
    let t2p2_impact = 0
    let t2p3_impact = 0
    let t2p4_impact = 0
    let t2p5_impact = 0

    let t1p1_rating = 0
    let t1p2_rating = 0
    let t1p3_rating = 0
    let t1p4_rating = 0
    let t1p5_rating = 0
    let t2p1_rating = 0
    let t2p2_rating = 0
    let t2p3_rating = 0
    let t2p4_rating = 0
    let t2p5_rating = 0
    let max_rating = 0

    let t1p1_count_maps = 0
    let t1p2_count_maps = 0
    let t1p3_count_maps = 0
    let t1p4_count_maps = 0
    let t1p5_count_maps = 0
    let t2p1_count_maps = 0
    let t2p2_count_maps = 0
    let t2p3_count_maps = 0
    let t2p4_count_maps = 0
    let t2p5_count_maps = 0

    let allRounds = 0

    if (necessaryMatch.data && necessaryMatch.data.length > 0) {

        necessaryMatch.data.map(el => {

            dateMatch = el.db_date_match
            NameTour = el.name_tour
            logoTour = el.name_tour_for_sort + ".jpg"

            // команды матча
            matchTeamsInfo[0] = {
                "team1": el.team1,
                "team2": el.team2,
                "team1Logo": el.team1_logo,
                "team2Logo": el.team2_logo,
            }

            // карты матча

            matchMaps.push({
                "map": el.map + ".jpg",
                "mapPickTeam": el.map_pick,
                "mapPick": (el.team1_logo.indexOf(`${el.map_pick.replace(/\s/g, "")}`) >= 0 ? el.team1_logo : el.team2_logo.indexOf(`${el.map_pick.replace(/\s/g, "")}`) >= 0 ? el.team2_logo : 'Decider'),
                "scoreT1": el.total_r_team1,
                "scoreT2": el.total_r_team2,
                "team1Logo": el.team1_logo,
                "team2Logo": el.team2_logo,
            })

            if (el.total_r_team1 > el.total_r_team2) {
                scoreT1++
            }

            if (el.total_r_team1 < el.total_r_team2) {
                scoreT2++
            }

            allRounds = (el.total_r_team1 + el.total_r_team2)
            count++
            if (el.t1p1) {
                t1p1 = el.t1p1
                t1p1_logo = el.t1p1_logo
                t1p1_k += el.t1p1_k
                t1p1_a += el.t1p1_a
                t1p1_d += el.t1p1_d
                t1p1_kd += el.t1p1_kd
                t1p1_dpr += (el.t1p1_d / allRounds)
                t1p1_kpr += (el.t1p1_k / allRounds)
                t1p1_impact += el.t1p1_impact
                t1p1_rating += el.t1p1_rating
                t1p1_count_maps += 1
            }
            if (el.t1p2) {
                t1p2 = el.t1p2
                t1p2_logo = el.t1p2_logo
                t1p2_k += el.t1p2_k
                t1p2_a += el.t1p2_a
                t1p2_d += el.t1p2_d
                t1p2_kd += el.t1p2_kd
                t1p2_dpr += (el.t1p2_d / allRounds)
                t1p2_kpr += (el.t1p2_k / allRounds)
                t1p2_impact += el.t1p2_impact
                t1p2_rating += el.t1p2_rating
                t1p2_count_maps += 1
            }
            if (el.t1p3) {
                t1p3 = el.t1p3
                t1p3_logo = el.t1p3_logo
                t1p3_k += el.t1p3_k
                t1p3_a += el.t1p3_a
                t1p3_d += el.t1p3_d
                t1p3_kd += el.t1p3_kd
                t1p3_dpr += (el.t1p3_d / allRounds)
                t1p3_kpr += (el.t1p3_k / allRounds)
                t1p3_impact += el.t1p3_impact
                t1p3_rating += el.t1p3_rating
                t1p3_count_maps += 1
            }
            if (el.t1p4) {
                t1p4 = el.t1p4
                t1p4_logo = el.t1p4_logo
                t1p4_k += el.t1p4_k
                t1p4_a += el.t1p4_a
                t1p4_d += el.t1p4_d
                t1p4_kd += el.t1p4_kd
                t1p4_dpr += (el.t1p4_d / allRounds)
                t1p4_kpr += (el.t1p4_k / allRounds)
                t1p4_impact += el.t1p4_impact
                t1p4_rating += el.t1p4_rating
                t1p4_count_maps += 1
            }
            if (el.t1p5) {
                t1p5 = el.t1p5
                t1p5_logo = el.t1p5_logo
                t1p5_k += el.t1p5_k
                t1p5_a += el.t1p5_a
                t1p5_d += el.t1p5_d
                t1p5_kd += el.t1p5_kd
                t1p5_dpr += (el.t1p5_d / allRounds)
                t1p5_kpr += (el.t1p5_k / allRounds)
                t1p5_impact += el.t1p5_impact
                t1p5_rating += el.t1p5_rating
                t1p5_count_maps += 1
            }

            if (el.t2p1) {
                t2p1 = el.t2p1
                t2p1_logo = el.t2p1_logo
                t2p1_k += el.t2p1_k
                t2p1_a += el.t2p1_a
                t2p1_d += el.t2p1_d
                t2p1_kd += el.t2p1_kd
                t2p1_dpr += (el.t2p1_d / allRounds)
                t2p1_kpr += (el.t2p1_k / allRounds)
                t2p1_impact += el.t2p1_impact
                t2p1_rating += el.t2p1_rating
                t2p1_count_maps += 1
            }
            if (el.t2p2) {
                t2p2 = el.t2p2
                t2p2_logo = el.t2p2_logo
                t2p2_k += el.t2p2_k
                t2p2_a += el.t2p2_a
                t2p2_d += el.t2p2_d
                t2p2_kd += el.t2p2_kd
                t2p2_dpr += (el.t2p2_d / allRounds)
                t2p2_kpr += (el.t2p2_k / allRounds)
                t2p2_impact += el.t2p2_impact
                t2p2_rating += el.t2p2_rating
                t2p2_count_maps += 1
            }
            if (el.t2p3) {
                t2p3 = el.t2p3
                t2p3_logo = el.t2p3_logo
                t2p3_k += el.t2p3_k
                t2p3_a += el.t2p3_a
                t2p3_d += el.t2p3_d
                t2p3_kd += el.t2p3_kd
                t2p3_dpr += (el.t2p3_d / allRounds)
                t2p3_kpr += (el.t2p3_k / allRounds)
                t2p3_impact += el.t2p3_impact
                t2p3_rating += el.t2p3_rating
                t2p3_count_maps += 1
            }

            if (el.t2p4) {
                t2p4 = el.t2p4
                t2p4_logo = el.t2p4_logo
                t2p4_k += el.t2p4_k
                t2p4_a += el.t2p4_a
                t2p4_d += el.t2p4_d
                t2p4_kd += el.t2p4_kd
                t2p4_dpr += (el.t2p4_d / allRounds)
                t2p4_kpr += (el.t2p4_k / allRounds)
                t2p4_impact += el.t2p4_impact
                t2p4_rating += el.t2p4_rating
                t2p4_count_maps += 1
            }
            if (el.t2p5) {
                t2p5 = el.t2p5
                t2p5_logo = el.t2p5_logo
                t2p5_k += el.t2p5_k
                t2p5_a += el.t2p5_a
                t2p5_d += el.t2p5_d
                t2p5_kd += el.t2p5_kd
                t2p5_dpr += (el.t2p5_d / allRounds)
                t2p5_kpr += (el.t2p5_k / allRounds)
                t2p5_impact += el.t2p5_impact
                t2p5_rating += el.t2p5_rating
                t2p5_count_maps += 1
            }
        })

        players[0] = {
            dateMatch: dateMatch,
            NameTour: NameTour,
            logoTour: logoTour,
            scoreT1: scoreT1,
            scoreT2: scoreT2,
            t1p1: t1p1,
            t1p2: t1p2,
            t1p3: t1p3,
            t1p4: t1p4,
            t1p5: t1p5,
            t2p1: t2p1,
            t2p2: t2p2,
            t2p3: t2p3,
            t2p4: t2p4,
            t2p5: t2p5,
            t1p1_logo: t1p1_logo,
            t1p2_logo: t1p2_logo,
            t1p3_logo: t1p3_logo,
            t1p4_logo: t1p4_logo,
            t1p5_logo: t1p5_logo,
            t2p1_logo: t2p1_logo,
            t2p2_logo: t2p2_logo,
            t2p3_logo: t2p3_logo,
            t2p4_logo: t2p4_logo,
            t2p5_logo: t2p5_logo,
            t1p1_k: t1p1_k,
            t1p2_k: t1p2_k,
            t1p3_k: t1p3_k,
            t1p4_k: t1p4_k,
            t1p5_k: t1p5_k,
            t2p1_k: t2p1_k,
            t2p2_k: t2p2_k,
            t2p3_k: t2p3_k,
            t2p4_k: t2p4_k,
            t2p5_k: t2p5_k,
            t1p1_a: t1p1_a,
            t1p2_a: t1p2_a,
            t1p3_a: t1p3_a,
            t1p4_a: t1p4_a,
            t1p5_a: t1p5_a,
            t2p1_a: t2p1_a,
            t2p2_a: t2p2_a,
            t2p3_a: t2p3_a,
            t2p4_a: t2p4_a,
            t2p5_a: t2p5_a,
            t1p1_d: t1p1_d,
            t1p2_d: t1p2_d,
            t1p3_d: t1p3_d,
            t1p4_d: t1p4_d,
            t1p5_d: t1p5_d,
            t2p1_d: t2p1_d,
            t2p2_d: t2p2_d,
            t2p3_d: t2p3_d,
            t2p4_d: t2p4_d,
            t2p5_d: t2p5_d,
            t1p1_kd: Math.round((t1p1_kd / t1p1_count_maps) * 100) / 100,
            t1p2_kd: Math.round((t1p2_kd / t1p2_count_maps) * 100) / 100,
            t1p3_kd: Math.round((t1p3_kd / t1p3_count_maps) * 100) / 100,
            t1p4_kd: Math.round((t1p4_kd / t1p4_count_maps) * 100) / 100,
            t1p5_kd: Math.round((t1p5_kd / t1p5_count_maps) * 100) / 100,
            t2p1_kd: Math.round((t2p1_kd / t2p1_count_maps) * 100) / 100,
            t2p2_kd: Math.round((t2p2_kd / t2p2_count_maps) * 100) / 100,
            t2p3_kd: Math.round((t2p3_kd / t2p3_count_maps) * 100) / 100,
            t2p4_kd: Math.round((t2p4_kd / t2p4_count_maps) * 100) / 100,
            t2p5_kd: Math.round((t2p5_kd / t2p5_count_maps) * 100) / 100,
            t1p1_kpr: Math.round((t1p1_kpr / t1p1_count_maps) * 100) / 100,
            t1p2_kpr: Math.round((t1p2_kpr / t1p2_count_maps) * 100) / 100,
            t1p3_kpr: Math.round((t1p3_kpr / t1p3_count_maps) * 100) / 100,
            t1p4_kpr: Math.round((t1p4_kpr / t1p4_count_maps) * 100) / 100,
            t1p5_kpr: Math.round((t1p5_kpr / t1p5_count_maps) * 100) / 100,
            t2p1_kpr: Math.round((t2p1_kpr / t2p1_count_maps) * 100) / 100,
            t2p2_kpr: Math.round((t2p2_kpr / t2p2_count_maps) * 100) / 100,
            t2p3_kpr: Math.round((t2p3_kpr / t2p3_count_maps) * 100) / 100,
            t2p4_kpr: Math.round((t2p4_kpr / t2p4_count_maps) * 100) / 100,
            t2p5_kpr: Math.round((t2p5_kpr / t2p5_count_maps) * 100) / 100,
            t1p1_dpr: Math.round((t1p1_dpr / t1p1_count_maps) * 100) / 100,
            t1p2_dpr: Math.round((t1p2_dpr / t1p2_count_maps) * 100) / 100,
            t1p3_dpr: Math.round((t1p3_dpr / t1p3_count_maps) * 100) / 100,
            t1p4_dpr: Math.round((t1p4_dpr / t1p4_count_maps) * 100) / 100,
            t1p5_dpr: Math.round((t1p5_dpr / t1p5_count_maps) * 100) / 100,
            t2p1_dpr: Math.round((t2p1_dpr / t2p1_count_maps) * 100) / 100,
            t2p2_dpr: Math.round((t2p2_dpr / t2p2_count_maps) * 100) / 100,
            t2p3_dpr: Math.round((t2p3_dpr / t2p3_count_maps) * 100) / 100,
            t2p4_dpr: Math.round((t2p4_dpr / t2p4_count_maps) * 100) / 100,
            t2p5_dpr: Math.round((t2p5_dpr / t2p5_count_maps) * 100) / 100,
            t1p1_impact: Math.round((t1p1_impact / t1p1_count_maps) * 100) / 100,
            t1p2_impact: Math.round((t1p2_impact / t1p2_count_maps) * 100) / 100,
            t1p3_impact: Math.round((t1p3_impact / t1p3_count_maps) * 100) / 100,
            t1p4_impact: Math.round((t1p4_impact / t1p4_count_maps) * 100) / 100,
            t1p5_impact: Math.round((t1p5_impact / t1p5_count_maps) * 100) / 100,
            t2p1_impact: Math.round((t2p1_impact / t2p1_count_maps) * 100) / 100,
            t2p2_impact: Math.round((t2p2_impact / t2p2_count_maps) * 100) / 100,
            t2p3_impact: Math.round((t2p3_impact / t2p3_count_maps) * 100) / 100,
            t2p4_impact: Math.round((t2p4_impact / t2p4_count_maps) * 100) / 100,
            t2p5_impact: Math.round((t2p5_impact / t2p5_count_maps) * 100) / 100,
            t1p1_rating: Math.round((t1p1_rating / t1p1_count_maps) * 100) / 100,
            t1p2_rating: Math.round((t1p2_rating / t1p2_count_maps) * 100) / 100,
            t1p3_rating: Math.round((t1p3_rating / t1p3_count_maps) * 100) / 100,
            t1p4_rating: Math.round((t1p4_rating / t1p4_count_maps) * 100) / 100,
            t1p5_rating: Math.round((t1p5_rating / t1p5_count_maps) * 100) / 100,
            t2p1_rating: Math.round((t2p1_rating / t2p1_count_maps) * 100) / 100,
            t2p2_rating: Math.round((t2p2_rating / t2p2_count_maps) * 100) / 100,
            t2p3_rating: Math.round((t2p3_rating / t2p3_count_maps) * 100) / 100,
            t2p4_rating: Math.round((t2p4_rating / t2p4_count_maps) * 100) / 100,
            t2p5_rating: Math.round((t2p5_rating / t2p5_count_maps) * 100) / 100,
            // max_rating: Math.round((Math.max((t1p1_rating / t1p1_count_maps), (t1p2_rating / t1p2_count_maps), (t1p3_rating / t1p3_count_maps), (t1p4_rating / t1p4_count_maps), (t1p5_rating / t1p5_count_maps), (t2p1_rating / t2p1_count_maps), (t2p2_rating / t2p2_count_maps), (t2p3_rating / t2p3_count_maps), (t2p4_rating / t2p4_count_maps), (t2p5_rating / t2p5_count_maps))) * 100) / 100,
        }

        let max = []
        let maxRating = 0

        if(t1p1_rating > maxRating) {
            max[0] = {
                player: t1p1,
                rating: t1p1_rating,
            }

            maxRating = t1p1_rating
        }
        if (t1p2_rating > maxRating) {
            max[0] = {
                player: t1p2,
                rating: t1p2_rating,
            }

            maxRating = t1p2_rating
        }
        if (t1p3_rating > maxRating) {
            max[0] = {
                player: t1p3,
                rating: t1p3_rating,
            }

            maxRating = t1p3_rating
        }
        if (t1p4_rating > maxRating) {
            max[0] = {
                player: t1p4,
                rating: t1p4_rating,
            }

            maxRating = t1p4_rating
        }
        if (t1p5_rating > maxRating) {
            max[0] = {
                player: t1p5,
                rating: t1p5_rating,
            }

            maxRating = t1p5_rating
        }
        if (t2p1_rating > maxRating) {
            max[0] = {
                player: t2p1,
                rating: t2p1_rating,
            }

            maxRating = t2p1_rating
        }
        if (t2p2_rating > maxRating) {
            max[0] = {
                player: t2p2,
                rating: t2p2_rating,
            }

            maxRating = t2p2_rating
        }
        if (t2p3_rating > maxRating) {
            max[0] = {
                player: t2p3,
                rating: t2p3_rating,
            }

            maxRating = t2p3_rating
        }
        if (t2p4_rating > maxRating) {
            max[0] = {
                player: t2p4,
                rating: t2p4_rating,
            }

            maxRating = t2p4_rating
        }
        if (t2p5_rating > maxRating) {
            max[0] = {
                player: t2p5,
                rating: t2p5_rating,
            }
        }

        return (
            <div className={classes.wrapperMatchResult}>

                <div className={classes.wrapperMain}>
                    <div className={classes.main}>

                        <div className={classes.topSection}>
                            <div className={classes.wrapperDateAndNameTour}>
                                <div className={classes.dateTour}>{dateMatch}</div>
                                <div className={classes.nameTour}>{NameTour}</div>
                            </div>
                            <div className={classes.wrapperMaps}>
                                <div className={classes.listMaps}>
                                    {matchMaps.map((e, index) => {
                                        return (
                                            <div key={index} className={classes.wrapperMap}>
                                                <div className={classes.mapPick}>
                                                    {e.mapPick === 'Decider' ? "Decider" : "pick"}
                                                    {e.mapPick === 'Decider' ? "" : <img src={`/images/LogoTeams/${e.mapPick}`} alt="" style={{
                                                        paddingLeft: e.mapPick === 'Decider' ? "0%" : "5%"
                                                    }}/>}
                                                </div>
                                                <div className={classes.mapLogo}>
                                                    <img src={`/images/LogoMaps/${e.map}`} alt=""/>
                                                </div>
                                                <div className={classes.mapScore}>
                                                    <div className={classes.logoTeam}>
                                                        <img src={`/images/LogoTeams/${e.team1Logo}`} alt=""/>
                                                    </div>
                                                    <div className={classes.score}>{e.scoreT1 + " : " + e.scoreT2}</div>
                                                    <div className={classes.logoTeam}>
                                                        <img src={`/images/LogoTeams/${e.team2Logo}`} alt=""/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className={classes.team1Section}>
                            <div className={classes.wrapperPlayers}>
                                <div className={classes.fivePlayers}>
                                    <img src={`/images/LogoPlayers/${players[0].t1p1_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t1p1_logo}`} className={classes.player1}
                                         alt="/"/>
                                    <img src={`/images/LogoPlayers/${players[0].t1p2_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t1p2_logo}`} className={classes.player2}
                                         alt="/"/>
                                    <img src={`/images/LogoPlayers/${players[0].t1p3_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t1p3_logo}`} className={classes.player3}
                                         alt="/"/>
                                    <img src={`/images/LogoPlayers/${players[0].t1p4_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t1p4_logo}`} className={classes.player4}
                                         alt="/"/>
                                    <img src={`/images/LogoPlayers/${players[0].t1p5_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t1p5_logo}`} className={classes.player5}
                                         alt="/"/>
                                </div>
                                <div className={classes.teamLogo}>
                                    <img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/"/>
                                </div>
                                <div className={classes.wrapperTeamScore}>
                                    <div className={classes.teamScore} style={
                                        {
                                            // background: players[0].scoreT1 > players[0].scoreT2 ? "radial-gradient(at bottom left, #d52933 10%, transparent 60%)" : players[0].scoreT1 === players[0].scoreT2 ? "radial-gradient(at bottom left, #d52933 10%, transparent 60%)" : "radial-gradient(at bottom left, #1b1b1d 10%, transparent 60%)",
                                            background: "radial-gradient(at bottom left, #000 10%, transparent 60%)",
                                            color: players[0].scoreT1 >= players[0].scoreT2 ? "#ffffff" : "#ffffff"
                                        }
                                    }><div className={classes.textScore}>{players[0].scoreT1}</div></div>
                                </div>
                                <div className={classes.teamName}>{matchTeamsInfo[0].team1.toUpperCase()}</div>
                            </div>
                            <div className={classes.wrapperTableStats}>
                                <div className={classes.titleRowTable}>
                                    <div className={classes.titleNickname}>NICKNAME</div>
                                    <div className={classes.titleK}>K</div>
                                    <div className={classes.titleA}>A</div>
                                    <div className={classes.titleD}>D</div>
                                    <div className={classes.titleDiff}>+/-</div>
                                    <div className={classes.titleKD}>KD</div>
                                    <div className={classes.titleKPR}>KPR</div>
                                    <div className={classes.titleDPR}>DPR</div>
                                    <div className={classes.titleIMPACT}>IMPACT</div>
                                    <div className={classes.titleRATING}>RATING</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t1p1 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t1p1}</div>
                                    <div className={classes.titleK}>{players[0].t1p1_k}</div>
                                    <div className={classes.titleA}>{players[0].t1p1_a}</div>
                                    <div className={classes.titleD}>{players[0].t1p1_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t1p1_k - players[0].t1p1_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t1p1_k - players[0].t1p1_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t1p1_kd < 0.9 ? "#854141" : players[0].t1p1_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t1p1_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t1p1_kpr < 0.60 ? "#854141" : players[0].t1p1_kpr > 0.65 ? players[0].t1p1_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p1_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t1p1_dpr < 0.68 ? "#528347" : players[0].t1p1_dpr > 0.7 ? players[0].t1p1_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t1p1_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t1p1_impact < 1 ? "#854141" : players[0].t1p1_impact > 1 ? players[0].t1p1_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p1_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t1p1_rating < 1 ? "#854141" : players[0].t1p1_rating > 1 ? players[0].t1p1_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p1_rating}</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t1p2 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t1p2}</div>
                                    <div className={classes.titleK}>{players[0].t1p2_k}</div>
                                    <div className={classes.titleA}>{players[0].t1p2_a}</div>
                                    <div className={classes.titleD}>{players[0].t1p2_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t1p2_k - players[0].t1p2_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t1p2_k - players[0].t1p2_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t1p2_kd < 0.9 ? "#854141" : players[0].t1p2_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t1p2_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t1p2_kpr < 0.60 ? "#854141" : players[0].t1p2_kpr > 0.65 ? players[0].t1p2_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p2_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t1p2_dpr < 0.68 ? "#528347" : players[0].t1p2_dpr > 0.7 ? players[0].t1p2_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t1p2_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t1p2_impact < 1 ? "#854141" : players[0].t1p2_impact > 1 ? players[0].t1p2_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p2_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t1p2_rating < 1 ? "#854141" : players[0].t1p2_rating > 1 ? players[0].t1p2_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p2_rating}</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t1p3 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t1p3}</div>
                                    <div className={classes.titleK}>{players[0].t1p3_k}</div>
                                    <div className={classes.titleA}>{players[0].t1p3_a}</div>
                                    <div className={classes.titleD}>{players[0].t1p3_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t1p3_k - players[0].t1p3_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t1p3_k - players[0].t1p3_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t1p3_kd < 0.9 ? "#854141" : players[0].t1p3_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t1p3_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t1p3_kpr < 0.60 ? "#854141" : players[0].t1p3_kpr > 0.65 ? players[0].t1p3_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p3_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t1p3_dpr < 0.68 ? "#528347" : players[0].t1p3_dpr > 0.7 ? players[0].t1p3_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t1p3_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t1p3_impact < 1 ? "#854141" : players[0].t1p3_impact > 1 ? players[0].t1p3_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p3_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t1p3_rating < 1 ? "#854141" : players[0].t1p3_rating > 1 ? players[0].t1p3_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p3_rating}</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t1p4 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t1p4}</div>
                                    <div className={classes.titleK}>{players[0].t1p4_k}</div>
                                    <div className={classes.titleA}>{players[0].t1p4_a}</div>
                                    <div className={classes.titleD}>{players[0].t1p4_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t1p4_k - players[0].t1p4_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t1p4_k - players[0].t1p4_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t1p4_kd < 0.9 ? "#854141" : players[0].t1p4_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t1p4_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t1p4_kpr < 0.60 ? "#854141" : players[0].t1p4_kpr > 0.65 ? players[0].t1p4_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p4_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t1p4_dpr < 0.68 ? "#528347" : players[0].t1p4_dpr > 0.7 ? players[0].t1p4_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t1p4_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t1p4_impact < 1 ? "#854141" : players[0].t1p4_impact > 1 ? players[0].t1p4_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p4_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t1p4_rating < 1 ? "#854141" : players[0].t1p4_rating > 1 ? players[0].t1p4_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p4_rating}</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                   <div className={classes.titleNickname} style={
                                        {
                                            background: t1p5 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t1p5}</div>
                                    <div className={classes.titleK}>{players[0].t1p5_k}</div>
                                    <div className={classes.titleA}>{players[0].t1p5_a}</div>
                                    <div className={classes.titleD}>{players[0].t1p5_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t1p5_k - players[0].t1p5_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t1p5_k - players[0].t1p5_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t1p5_kd < 0.9 ? "#854141" : players[0].t1p5_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t1p5_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t1p5_kpr < 0.60 ? "#854141" : players[0].t1p5_kpr > 0.65 ? players[0].t1p5_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p5_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t1p5_dpr < 0.68 ? "#528347" : players[0].t1p5_dpr > 0.7 ? players[0].t1p5_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t1p5_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t1p5_impact < 1 ? "#854141" : players[0].t1p5_impact > 1 ? players[0].t1p5_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p5_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t1p5_rating < 1 ? "#854141" : players[0].t1p5_rating > 1 ? players[0].t1p5_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t1p5_rating}</div>
                                </div>
                            </div>
                        </div>

                        <div className={classes.team2Section}>
                            <div className={classes.wrapperPlayers}>
                                <div className={classes.fivePlayers}>
                                    <img src={`/images/LogoPlayers/${players[0].t2p1_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t2p1_logo}`} className={classes.player1}
                                         alt="/"/>
                                    <img src={`/images/LogoPlayers/${players[0].t2p2_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t2p2_logo}`} className={classes.player2}
                                         alt="/"/>
                                    <img src={`/images/LogoPlayers/${players[0].t2p3_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t2p3_logo}`} className={classes.player3}
                                         alt="/"/>
                                    <img src={`/images/LogoPlayers/${players[0].t2p4_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t2p4_logo}`} className={classes.player4}
                                         alt="/"/>
                                    <img src={`/images/LogoPlayers/${players[0].t2p5_logo === 'PlayerDefaultLogo.png' ? "RGGDefault.png" : players[0].t2p5_logo}`} className={classes.player5}
                                         alt="/"/>
                                </div>
                                <div className={classes.teamLogo}>
                                    <img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/"/>
                                </div>
                                <div className={classes.wrapperTeamScore}>
                                    <div className={classes.teamScore} style={
                                        {
                                            // background: players[0].scoreT2 > players[0].scoreT1 ? "radial-gradient(at bottom left, #d52933 10%, transparent 60%)" : players[0].scoreT1 === players[0].scoreT2 ? "radial-gradient(at bottom left, #d52933 10%, transparent 60%)" : "radial-gradient(at bottom left, #1b1b1d 10%, transparent 60%)",
                                            background: "radial-gradient(at bottom left, #000 10%, transparent 60%)",
                                            color: players[0].scoreT2 >= players[0].scoreT1 ? "#ffffff" : "#ffffff"
                                        }
                                    }><div className={classes.textScore}>{players[0].scoreT2}</div></div>
                                </div>
                                <div className={classes.teamName}>{matchTeamsInfo[0].team2.toUpperCase()}</div>
                            </div>
                            <div className={classes.wrapperTableStats}>
                                <div className={classes.titleRowTable}>
                                    <div className={classes.titleNickname}>NICKNAME</div>
                                    <div className={classes.titleK}>K</div>
                                    <div className={classes.titleA}>A</div>
                                    <div className={classes.titleD}>D</div>
                                    <div className={classes.titleDiff}>+/-</div>
                                    <div className={classes.titleKD}>KD</div>
                                    <div className={classes.titleKPR}>KPR</div>
                                    <div className={classes.titleDPR}>DPR</div>
                                    <div className={classes.titleIMPACT}>IMPACT</div>
                                    <div className={classes.titleRATING}>RATING</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t2p1 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t2p1}</div>
                                    <div className={classes.titleK}>{players[0].t2p1_k}</div>
                                    <div className={classes.titleA}>{players[0].t2p1_a}</div>
                                    <div className={classes.titleD}>{players[0].t2p1_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t2p1_k - players[0].t2p1_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t2p1_k - players[0].t2p1_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t2p1_kd < 0.9 ? "#854141" : players[0].t2p1_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t2p1_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t2p1_kpr < 0.60 ? "#854141" : players[0].t2p1_kpr > 0.65 ? players[0].t2p1_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p1_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t2p1_dpr < 0.68 ? "#528347" : players[0].t2p1_dpr > 0.7 ? players[0].t2p1_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t2p1_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t2p1_impact < 1 ? "#854141" : players[0].t2p1_impact > 1 ? players[0].t2p1_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p1_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t2p1_rating < 1 ? "#854141" : players[0].t2p1_rating > 1 ? players[0].t2p1_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p1_rating}</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t2p2 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t2p2}</div>
                                    <div className={classes.titleK}>{players[0].t2p2_k}</div>
                                    <div className={classes.titleA}>{players[0].t2p2_a}</div>
                                    <div className={classes.titleD}>{players[0].t2p2_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t2p2_k - players[0].t2p2_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t2p2_k - players[0].t2p2_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t2p2_kd < 0.9 ? "#854141" : players[0].t2p2_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t2p2_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t2p2_kpr < 0.60 ? "#854141" : players[0].t2p2_kpr > 0.65 ? players[0].t2p2_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p2_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t2p2_dpr < 0.68 ? "#528347" : players[0].t2p2_dpr > 0.7 ? players[0].t2p2_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t2p2_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t2p2_impact < 1 ? "#854141" : players[0].t2p2_impact > 1 ? players[0].t2p2_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p2_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t2p2_rating < 1 ? "#854141" : players[0].t2p2_rating > 1 ? players[0].t2p2_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p2_rating}</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t2p3 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t2p3}</div>
                                    <div className={classes.titleK}>{players[0].t2p3_k}</div>
                                    <div className={classes.titleA}>{players[0].t2p3_a}</div>
                                    <div className={classes.titleD}>{players[0].t2p3_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t2p3_k - players[0].t2p3_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t2p3_k - players[0].t2p3_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t2p3_kd < 0.9 ? "#854141" : players[0].t2p3_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t2p3_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t2p3_kpr < 0.60 ? "#854141" : players[0].t2p3_kpr > 0.65 ? players[0].t2p3_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p3_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t2p3_dpr < 0.68 ? "#528347" : players[0].t2p3_dpr > 0.7 ? players[0].t2p3_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t2p3_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t2p3_impact < 1 ? "#854141" : players[0].t2p3_impact > 1 ? players[0].t2p3_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p3_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t2p3_rating < 1 ? "#854141" : players[0].t2p3_rating > 1 ? players[0].t2p3_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p3_rating}</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t2p4 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t2p4}</div>
                                    <div className={classes.titleK}>{players[0].t2p4_k}</div>
                                    <div className={classes.titleA}>{players[0].t2p4_a}</div>
                                    <div className={classes.titleD}>{players[0].t2p4_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t2p4_k - players[0].t2p4_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t2p4_k - players[0].t2p4_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t2p4_kd < 0.9 ? "#854141" : players[0].t2p4_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t2p4_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t2p4_kpr < 0.60 ? "#854141" : players[0].t2p4_kpr > 0.65 ? players[0].t2p4_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p4_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t2p4_dpr < 0.68 ? "#528347" : players[0].t2p4_dpr > 0.7 ? players[0].t2p4_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t2p4_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t2p4_impact < 1 ? "#854141" : players[0].t2p4_impact > 1 ? players[0].t2p4_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p4_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t2p4_rating < 1 ? "#854141" : players[0].t2p4_rating > 1 ? players[0].t2p4_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p4_rating}</div>
                                </div>
                                <div className={classes.statsRowTable}>
                                    <div className={classes.titleNickname} style={
                                        {
                                            background: t2p5 === max[0].player ? "#d52933" : ""
                                        }
                                    }>{players[0].t2p5}</div>
                                    <div className={classes.titleK}>{players[0].t2p5_k}</div>
                                    <div className={classes.titleA}>{players[0].t2p5_a}</div>
                                    <div className={classes.titleD}>{players[0].t2p5_d}</div>
                                    <div className={classes.titleDiff} style={
                                    {
                                        background: (players[0].t2p5_k - players[0].t2p5_d) < 0 ? "#854141" : "#528347"
                                    }
                                }>{players[0].t2p5_k - players[0].t2p5_d}</div>
                                    <div className={classes.titleKD} style={
                                    {
                                        background: players[0].t2p5_kd < 0.9 ? "#854141" : players[0].t2p5_kd > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{players[0].t2p5_kd}</div>
                                    <div className={classes.titleKPR} style={
                                    {
                                        background: players[0].t2p5_kpr < 0.60 ? "#854141" : players[0].t2p5_kpr > 0.65 ? players[0].t2p5_kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p5_kpr}</div>
                                    <div className={classes.titleDPR} style={
                                    {
                                        background: players[0].t2p5_dpr < 0.68 ? "#528347" : players[0].t2p5_dpr > 0.7 ? players[0].t2p5_dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{players[0].t2p5_dpr}</div>
                                    <div className={classes.titleIMPACT} style={
                                    {
                                        background: players[0].t2p5_impact < 1 ? "#854141" : players[0].t2p5_impact > 1 ? players[0].t2p5_impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p5_impact}</div>
                                    <div className={classes.titleRATING} style={
                                    {
                                        background: players[0].t2p5_rating < 1 ? "#854141" : players[0].t2p5_rating > 1 ? players[0].t2p5_rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{players[0].t2p5_rating}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <img src={`/images/DataInImage/RGG_RESULT_MATCH2.jpg`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }
};

export default PictureResultRGG;