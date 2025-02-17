import React, {useEffect, useState} from 'react';
import classes from "../matchPicture2.module.css";
import {useGetMatchesByNameQuery} from "../../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../../Function/countryFlagPlayer";
import Rating from "../../../Formulas/rating";
import Kpr from "../../../Formulas/kpr";
import Dpr from "../../../Formulas/dpr";

const PictureResult2 = (props) => {

    const name = props.name
    const choiceMap = props.map
    const entryDataMatch = props.entryDataMatch

    const [isValidData, setIsValidData] = useState(false)

    useEffect(() => {

        const isDataValid = entryDataMatch?.every(item => {
            return Object.values(item).every(value => value !== null && value !== '' && value !== "NaN")
        })

        setIsValidData(isDataValid)

    }, [props.entryDataMatch])

    const necessaryMatch = useGetMatchesByNameQuery({name})

    let players = []
    let matchTeamsInfo = []
    let matchMaps = []

    let count = 0

    let t1p1_nickname
    let t1p2_nickname
    let t1p3_nickname
    let t1p4_nickname
    let t1p5_nickname
    let t2p1_nickname
    let t2p2_nickname
    let t2p3_nickname
    let t2p4_nickname
    let t2p5_nickname

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
    let tempArr = []
    let necessaryData = []

    if (necessaryMatch.data && necessaryMatch.data.length > 0) {
        necessaryData = necessaryMatch.data
    } else if (isValidData) {
        necessaryData = entryDataMatch
    }

    if (necessaryData && necessaryData.length > 0) {
        tempArr = isValidData ? necessaryData : (choiceMap.length > 0 && choiceMap !== "AllMaps") ? necessaryData.filter(e => e.map === choiceMap) : necessaryData

        tempArr.map(el => {

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
                "name": el.map,
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

            allRounds += (el.total_r_team1 + el.total_r_team2)

            count++
            t1p1_nickname = t1p1
            t1p2_nickname = t1p2
            t1p3_nickname = t1p3
            t1p4_nickname = t1p4
            t1p5_nickname = t1p5
            t2p1_nickname = t2p1
            t2p2_nickname = t2p2
            t2p3_nickname = t2p3
            t2p4_nickname = t2p4
            t2p5_nickname = t2p5

            if (el.t1p1 && (el.t1p1 === t1p1_nickname)) {
                t1p1 = el.t1p1
                t1p1_logo = el.t1p1_logo
                t1p1_k += el.t1p1_k
                t1p1_a += el.t1p1_a
                t1p1_d += el.t1p1_d
                t1p1_impact += el.t1p1_impact
                t1p1_count_maps += 1
            } else {
                t1p1 = el.t1p1
                t1p1_logo = el.t1p1_logo
                t1p1_k = el.t1p1_k
                t1p1_a = el.t1p1_a
                t1p1_d = el.t1p1_d
                t1p1_impact = el.t1p1_impact
                t1p1_count_maps = 1
            }
            if (el.t1p2 && (el.t1p2 === t1p2_nickname)) {
                t1p2 = el.t1p2
                t1p2_logo = el.t1p2_logo
                t1p2_k += el.t1p2_k
                t1p2_a += el.t1p2_a
                t1p2_d += el.t1p2_d
                t1p2_impact += el.t1p2_impact
                t1p2_count_maps += 1
            } else {
                t1p2 = el.t1p2
                t1p2_logo = el.t1p2_logo
                t1p2_k = el.t1p2_k
                t1p2_a = el.t1p2_a
                t1p2_d = el.t1p2_d
                t1p2_impact = el.t1p2_impact
                t1p2_count_maps = 1
            }
            if (el.t1p3 && (el.t1p3 === t1p3_nickname)) {
                t1p3 = el.t1p3
                t1p3_logo = el.t1p3_logo
                t1p3_k += el.t1p3_k
                t1p3_a += el.t1p3_a
                t1p3_d += el.t1p3_d
                t1p3_impact += el.t1p3_impact
                t1p3_count_maps += 1
            } else {
                t1p3 = el.t1p3
                t1p3_logo = el.t1p3_logo
                t1p3_k = el.t1p3_k
                t1p3_a = el.t1p3_a
                t1p3_d = el.t1p3_d
                t1p3_impact = el.t1p3_impact
                t1p3_count_maps = 1
            }
            if (el.t1p4 && (el.t1p4 === t1p4_nickname)) {
                t1p4 = el.t1p4
                t1p4_logo = el.t1p4_logo
                t1p4_k += el.t1p4_k
                t1p4_a += el.t1p4_a
                t1p4_d += el.t1p4_d
                t1p4_impact += el.t1p4_impact
                t1p4_count_maps += 1
            } else {
                t1p4 = el.t1p4
                t1p4_logo = el.t1p4_logo
                t1p4_k = el.t1p4_k
                t1p4_a = el.t1p4_a
                t1p4_d = el.t1p4_d
                t1p4_impact = el.t1p4_impact
                t1p4_count_maps = 1
            }
            if (el.t1p5 && (el.t1p5 === t1p5_nickname)) {
                t1p5 = el.t1p5
                t1p5_logo = el.t1p5_logo
                t1p5_k += el.t1p5_k
                t1p5_a += el.t1p5_a
                t1p5_d += el.t1p5_d
                t1p5_impact += el.t1p5_impact
                t1p5_count_maps += 1
            } else {
                t1p5 = el.t1p5
                t1p5_logo = el.t1p5_logo
                t1p5_k = el.t1p5_k
                t1p5_a = el.t1p5_a
                t1p5_d = el.t1p5_d
                t1p5_impact = el.t1p5_impact
                t1p5_count_maps = 1
            }

            if (el.t2p1 && (el.t2p1 === t2p1_nickname)) {
                t2p1 = el.t2p1
                t2p1_logo = el.t2p1_logo
                t2p1_k += el.t2p1_k
                t2p1_a += el.t2p1_a
                t2p1_d += el.t2p1_d
                t2p1_impact += el.t2p1_impact
                t2p1_count_maps += 1
            } else {
                t2p1 = el.t2p1
                t2p1_logo = el.t2p1_logo
                t2p1_k = el.t2p1_k
                t2p1_a = el.t2p1_a
                t2p1_d = el.t2p1_d
                t2p1_impact = el.t2p1_impact
                t2p1_count_maps = 1
            }
            if (el.t2p2 && (el.t2p2 === t2p2_nickname)) {
                t2p2 = el.t2p2
                t2p2_logo = el.t2p2_logo
                t2p2_k += el.t2p2_k
                t2p2_a += el.t2p2_a
                t2p2_d += el.t2p2_d
                t2p2_impact += el.t2p2_impact
                t2p2_count_maps += 1
            } else {
                t2p2 = el.t2p2
                t2p2_logo = el.t2p2_logo
                t2p2_k = el.t2p2_k
                t2p2_a = el.t2p2_a
                t2p2_d = el.t2p2_d
                t2p2_impact = el.t2p2_impact
                t2p2_count_maps = 1
            }
            if (el.t2p3 && (el.t2p3 === t2p3_nickname)) {
                t2p3 = el.t2p3
                t2p3_logo = el.t2p3_logo
                t2p3_k += el.t2p3_k
                t2p3_a += el.t2p3_a
                t2p3_d += el.t2p3_d
                t2p3_impact += el.t2p3_impact
                t2p3_count_maps += 1
            } else {
                t2p3 = el.t2p3
                t2p3_logo = el.t2p3_logo
                t2p3_k = el.t2p3_k
                t2p3_a = el.t2p3_a
                t2p3_d = el.t2p3_d
                t2p3_impact = el.t2p3_impact
                t2p3_count_maps = 1
            }

            if (el.t2p4 && (el.t2p4 === t2p4_nickname)) {
                t2p4 = el.t2p4
                t2p4_logo = el.t2p4_logo
                t2p4_k += el.t2p4_k
                t2p4_a += el.t2p4_a
                t2p4_d += el.t2p4_d
                t2p4_impact += el.t2p4_impact
                t2p4_count_maps += 1
            } else {
                t2p4 = el.t2p4
                t2p4_logo = el.t2p4_logo
                t2p4_k = el.t2p4_k
                t2p4_a = el.t2p4_a
                t2p4_d = el.t2p4_d
                t2p4_impact = el.t2p4_impact
                t2p4_count_maps = 1
            }
            if (el.t2p5 && (el.t2p5 === t2p5_nickname)) {
                t2p5 = el.t2p5
                t2p5_logo = el.t2p5_logo
                t2p5_k += el.t2p5_k
                t2p5_a += el.t2p5_a
                t2p5_d += el.t2p5_d
                t2p5_impact += el.t2p5_impact
                t2p5_count_maps += 1
            } else {
                t2p5 = el.t2p5
                t2p5_logo = el.t2p5_logo
                t2p5_k = el.t2p5_k
                t2p5_a = el.t2p5_a
                t2p5_d = el.t2p5_d
                t2p5_impact = el.t2p5_impact
                t2p5_count_maps = 1
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
            t1p1_kd: Math.round((t1p1_k / t1p1_d) * 100) / 100,
            t1p2_kd: Math.round((t1p2_k / t1p2_d) * 100) / 100,
            t1p3_kd: Math.round((t1p3_k / t1p3_d) * 100) / 100,
            t1p4_kd: Math.round((t1p4_k / t1p4_d) * 100) / 100,
            t1p5_kd: Math.round((t1p5_k / t1p5_d) * 100) / 100,
            t2p1_kd: Math.round((t2p1_k / t2p1_d) * 100) / 100,
            t2p2_kd: Math.round((t2p2_k / t2p2_d) * 100) / 100,
            t2p3_kd: Math.round((t2p3_k / t2p3_d) * 100) / 100,
            t2p4_kd: Math.round((t2p4_k / t2p4_d) * 100) / 100,
            t2p5_kd: Math.round((t2p5_k / t2p5_d) * 100) / 100,
            t1p1_kpr: Math.round(Kpr(t1p1_k, allRounds) * 100) / 100,
            t1p2_kpr: Math.round(Kpr(t1p2_k, allRounds) * 100) / 100,
            t1p3_kpr: Math.round(Kpr(t1p3_k, allRounds) * 100) / 100,
            t1p4_kpr: Math.round(Kpr(t1p4_k, allRounds) * 100) / 100,
            t1p5_kpr: Math.round(Kpr(t1p5_k, allRounds) * 100) / 100,
            t2p1_kpr: Math.round(Kpr(t2p1_k, allRounds) * 100) / 100,
            t2p2_kpr: Math.round(Kpr(t2p2_k, allRounds) * 100) / 100,
            t2p3_kpr: Math.round(Kpr(t2p3_k, allRounds) * 100) / 100,
            t2p4_kpr: Math.round(Kpr(t2p4_k, allRounds) * 100) / 100,
            t2p5_kpr: Math.round(Kpr(t2p5_k, allRounds) * 100) / 100,
            t1p1_dpr: Math.round(Dpr(t1p1_d, allRounds) * 100) / 100,
            t1p2_dpr: Math.round(Dpr(t1p2_d, allRounds) * 100) / 100,
            t1p3_dpr: Math.round(Dpr(t1p3_d, allRounds) * 100) / 100,
            t1p4_dpr: Math.round(Dpr(t1p4_d, allRounds) * 100) / 100,
            t1p5_dpr: Math.round(Dpr(t1p5_d, allRounds) * 100) / 100,
            t2p1_dpr: Math.round(Dpr(t2p1_d, allRounds) * 100) / 100,
            t2p2_dpr: Math.round(Dpr(t2p2_d, allRounds) * 100) / 100,
            t2p3_dpr: Math.round(Dpr(t2p3_d, allRounds) * 100) / 100,
            t2p4_dpr: Math.round(Dpr(t2p4_d, allRounds) * 100) / 100,
            t2p5_dpr: Math.round(Dpr(t2p5_d, allRounds) * 100) / 100,
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
            t1p1_rating: Rating((t1p1_k / t1p1_d), (t1p1_k / allRounds), (t1p1_d / allRounds), (t1p1_impact / t1p1_count_maps)),
            t1p2_rating: Rating((t1p2_k / t1p2_d), (t1p2_k / allRounds), (t1p2_d / allRounds), (t1p2_impact / t1p2_count_maps)),
            t1p3_rating: Rating((t1p3_k / t1p3_d), (t1p3_k / allRounds), (t1p3_d / allRounds), (t1p3_impact / t1p3_count_maps)),
            t1p4_rating: Rating((t1p4_k / t1p4_d), (t1p4_k / allRounds), (t1p4_d / allRounds), (t1p4_impact / t1p4_count_maps)),
            t1p5_rating: Rating((t1p5_k / t1p5_d), (t1p5_k / allRounds), (t1p5_d / allRounds), (t1p5_impact / t1p5_count_maps)),
            t2p1_rating: Rating((t2p1_k / t2p1_d), (t2p1_k / allRounds), (t2p1_d / allRounds), (t2p1_impact / t2p1_count_maps)),
            t2p2_rating: Rating((t2p2_k / t2p2_d), (t2p2_k / allRounds), (t2p2_d / allRounds), (t2p2_impact / t2p2_count_maps)),
            t2p3_rating: Rating((t2p3_k / t2p3_d), (t2p3_k / allRounds), (t2p3_d / allRounds), (t2p3_impact / t2p3_count_maps)),
            t2p4_rating: Rating((t2p4_k / t2p4_d), (t2p4_k / allRounds), (t2p4_d / allRounds), (t2p4_impact / t2p4_count_maps)),
            t2p5_rating: Rating((t2p5_k / t2p5_d), (t2p5_k / allRounds), (t2p5_d / allRounds), (t2p5_impact / t2p5_count_maps)),
        }

        let ratingPlayers = []
        let maxRating = 0
        let mvp = []

        for (let i = 1; i < 3; i++) {
            for (let j = 1; j < 6; j++) {
                ratingPlayers.push({
                    nickname: players[0][`t${i}p${j}`],
                    rating: players[0][`t${i}p${j}_rating`]
                })
            }
        }

        ratingPlayers.forEach(e => {
            if (e.rating > maxRating) {
                maxRating = e.rating
                mvp = e
            }
        })

        return (
            <div className={classes.wrapperMatchResult}>
                <div className={classes.titleAndMapsSection}>
                    <div className={classes.titleBanner}>
                        <div className={classes.logoRankoff}>
                            <img src={`/images/DataInImage/NEW_DESIGN_2025/Logo_And_Name.svg`} alt="/"/>
                            <div className={classes.textTitleBanner}>RESULT MATCH</div>
                        </div>
                    </div>
                    <div className={classes.infoMatch}>
                        <div className={classes.nameTour}>
                            <img src={`/images/LogoAndBannerTour/${players[0].logoTour.slice(0, -4)}.png`} alt="/"/>
                            <span>{players[0].NameTour}</span>
                        </div>
                        <div className={classes.dateMatch}>{players[0].dateMatch}</div>
                    </div>
                    <div className={classes.mapsMatch}>
                        {matchMaps.map((e, index) => {
                            return (
                                <div key={index} className={classes.map}>
                                    <div className={classes.scoreMap}>
                                        <img src={`/images/LogoTeams/${e.team1Logo}`} alt="/"/>
                                        <div className={classes.totalScoreMap}>{e.scoreT1}:{e.scoreT2}</div>
                                        <img src={`/images/LogoTeams/${e.team2Logo}`} alt="/"/>
                                    </div>
                                    <div className={classes.imgMap}>
                                        <img src={`/images/LogoMaps/${e.map}`} alt=""/>
                                        <div className={classes.mapColor}></div>
                                    </div>
                                    <div className={classes.pickMap}>
                                        <div className={classes.mapTeamPick}>
                                            <img
                                                src={`/images/LogoTeams/${e.mapPick === 'Decider' ? e.team2Logo : e.mapPick}`}
                                                alt="/" style={{
                                                opacity: e.mapPick === 'Decider' ? "0" : "1"
                                            }}/>
                                        </div>
                                        <div className={classes.mapName}>{e.name.replace(/(\D)(\d)/, "$1 $2")}</div>
                                        <div className={classes.teamName}>
                                            <span>{e.mapPickTeam}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={classes.playersAndScoreSection}>
                    <div className={classes.playersTeam} style={{
                        background: players[0].scoreT1 >= players[0].scoreT2 ? "var(--greenOpacity)" : "var(--redOpacity)"
                    }}>
                        <div className={classes.playersTeamLogo}>
                            <img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/"/>
                        </div>
                        <div className={classes.players}>
                            <img src={`/images/LogoPlayers/${players[0].t1p1_logo}`} className={classes.player1}
                                 alt="/"/>
                            <img src={`/images/LogoPlayers/${players[0].t1p2_logo}`} className={classes.player2}
                                 alt="/"/>
                            <img src={`/images/LogoPlayers/${players[0].t1p3_logo}`} className={classes.player3}
                                 alt="/"/>
                            <img src={`/images/LogoPlayers/${players[0].t1p4_logo}`} className={classes.player4}
                                 alt="/"/>
                            <img src={`/images/LogoPlayers/${players[0].t1p5_logo}`} className={classes.player5}
                                 alt="/"/>
                        </div>
                    </div>
                    <div className={classes.scoreMatch}>
                        <div className={classes.scoreLogoTeam} style={{
                            // background: players[0].scoreT1 >= players[0].scoreT2 ? "linear-gradient(to right, var(--greenLowOpacity), transparent)" : "linear-gradient(to right, var(--redLowOpacity), transparent)"
                        }}>
                            <img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/"/>
                        </div>
                        <div className={classes.totalScore}>{
                            (choiceMap.length > 0 && choiceMap !== "AllMaps") ?
                                matchMaps.filter(e => e.name === choiceMap)[0].scoreT1 + ":" + matchMaps.filter(e => e.name === choiceMap)[0].scoreT2 :
                                players[0].scoreT1 + ":" + players[0].scoreT2
                        }</div>
                        <div className={classes.scoreLogoTeam} style={{
                            // background: players[0].scoreT2 >= players[0].scoreT1 ? "linear-gradient(to left, var(--greenLowOpacity), transparent)" : "linear-gradient(to left, var(--redLowOpacity), transparent)"
                        }}>
                            <img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/"/>
                        </div>
                    </div>
                    <div className={classes.playersTeam} style={{
                        background: players[0].scoreT2 >= players[0].scoreT1 ? "var(--greenOpacity)" : "var(--redOpacity)"
                    }}>
                        <div className={classes.playersTeamLogo}>
                            <img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/"/>
                        </div>
                        <div className={classes.players}>
                            <img src={`/images/LogoPlayers/${players[0].t2p1_logo}`} className={classes.player1}
                                 alt="/"/>
                            <img src={`/images/LogoPlayers/${players[0].t2p2_logo}`} className={classes.player2}
                                 alt="/"/>
                            <img src={`/images/LogoPlayers/${players[0].t2p3_logo}`} className={classes.player3}
                                 alt="/"/>
                            <img src={`/images/LogoPlayers/${players[0].t2p4_logo}`} className={classes.player4}
                                 alt="/"/>
                            <img src={`/images/LogoPlayers/${players[0].t2p5_logo}`} className={classes.player5}
                                 alt="/"/>
                        </div>
                    </div>
                </div>
                <div className={classes.statsSection}>
                    <div className={classes.teamSection}>
                        <div className={classes.titleRowTable}>
                            <div className={classes.cell}>PLAYER</div>
                            <div className={classes.cell}>K</div>
                            <div className={classes.cell}>A</div>
                            <div className={classes.cell}>D</div>
                            <div className={classes.cell}>+/-</div>
                            <div className={classes.cell}>KD</div>
                            <div className={classes.cell}>KPR</div>
                            <div className={classes.cell}>DPR</div>
                            <div className={classes.cell}>IMPACT</div>
                            <div className={classes.cell}>RATING</div>
                        </div>
                        {[1].map((team) =>
                            [1, 2, 3, 4, 5].map((player) => {
                                return (
                                    <div className={classes.rowTable} style={
                                        {
                                            background: players[0][`t${team}p${player}`] === mvp.nickname ? "var(--gold)" : ""
                                        }
                                    }>
                                        <div className={classes.startCell}>
                                            <div className={classes.dataFlagPlayer}>
                                                <CountryFlagPlayer nickname={players[0][`t${team}p${player}`]}/>
                                            </div>
                                            {players[0][`t${team}p${player}`]}
                                        </div>
                                        <div className={classes.cell}>{players[0][`t${team}p${player}_k`]}</div>
                                        <div className={classes.cell}>{players[0][`t${team}p${player}_a`]}</div>
                                        <div className={classes.cell}>{players[0][`t${team}p${player}_d`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: (players[0][`t${team}p${player}_k`] - players[0][`t${team}p${player}_d`]) < 0 ? "var(--red)" : "var(--green)",
                                                color: (players[0][`t${team}p${player}_k`] - players[0][`t${team}p${player}_d`]) < 0 ? "var(--redDark)" : "var(--greenDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_k`] - players[0][`t${team}p${player}_d`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_kd`] < 0.9 ? "var(--red)" : players[0][`t${team}p${player}_kd`] > 1.05 ? "var(--green)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_kd`] < 0.9 ? "var(--redDark)" : players[0][`t${team}p${player}_kd`] > 1.05 ? "var(--greenDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_kd`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_kpr`] < 0.60 ? "var(--red)" : players[0][`t${team}p${player}_kpr`] > 0.65 ? players[0][`t${team}p${player}_kpr`] > 0.70 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_kpr`] < 0.60 ? "var(--redDark)" : players[0][`t${team}p${player}_kpr`] > 0.65 ? players[0][`t${team}p${player}_kpr`] > 0.70 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_kpr`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_dpr`] < 0.68 ? "var(--green)" : players[0][`t${team}p${player}_dpr`] > 0.7 ? players[0][`t${team}p${player}_dpr`] > 0.8 ? "var(--red)" : "var(--yellow)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_dpr`] < 0.68 ? "var(--greenDark)" : players[0][`t${team}p${player}_dpr`] > 0.7 ? players[0][`t${team}p${player}_dpr`] > 0.8 ? "var(--redDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_dpr`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_impact`] < 1 ? "var(--red)" : players[0][`t${team}p${player}_impact`] > 1 ? players[0][`t${team}p${player}_impact`] >= 1.10 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_impact`] < 1 ? "var(--redDark)" : players[0][`t${team}p${player}_impact`] > 1 ? players[0][`t${team}p${player}_impact`] >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_impact`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_rating`] < 1 ? "var(--red)" : players[0][`t${team}p${player}_rating`] > 1 ? players[0][`t${team}p${player}_rating`] >= 1.10 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_rating`] < 1 ? "var(--redDark)" : players[0][`t${team}p${player}_rating`] > 1 ? players[0][`t${team}p${player}_rating`] >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_rating`]}</div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                    <div className={classes.teamSection}>
                        <div className={classes.titleRowTable}>
                            <div className={classes.cell}>PLAYER</div>
                            <div className={classes.cell}>K</div>
                            <div className={classes.cell}>A</div>
                            <div className={classes.cell}>D</div>
                            <div className={classes.cell}>+/-</div>
                            <div className={classes.cell}>KD</div>
                            <div className={classes.cell}>KPR</div>
                            <div className={classes.cell}>DPR</div>
                            <div className={classes.cell}>IMPACT</div>
                            <div className={classes.cell}>RATING</div>
                        </div>
                        {[2].map((team) =>
                            [1, 2, 3, 4, 5].map((player) => {
                                return (
                                    <div className={classes.rowTable} style={
                                        {
                                            background: players[0][`t${team}p${player}`] === mvp.nickname ? "var(--gold)" : ""
                                        }
                                    }>
                                        <div className={classes.startCell}>
                                            <div className={classes.dataFlagPlayer}>
                                                <CountryFlagPlayer nickname={players[0][`t${team}p${player}`]}/>
                                            </div>
                                            {players[0][`t${team}p${player}`]}
                                        </div>
                                        <div className={classes.cell}>{players[0][`t${team}p${player}_k`]}</div>
                                        <div className={classes.cell}>{players[0][`t${team}p${player}_a`]}</div>
                                        <div className={classes.cell}>{players[0][`t${team}p${player}_d`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: (players[0][`t${team}p${player}_k`] - players[0][`t${team}p${player}_d`]) < 0 ? "var(--red)" : "var(--green)",
                                                color: (players[0][`t${team}p${player}_k`] - players[0][`t${team}p${player}_d`]) < 0 ? "var(--redDark)" : "var(--greenDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_k`] - players[0][`t${team}p${player}_d`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_kd`] < 0.9 ? "var(--red)" : players[0][`t${team}p${player}_kd`] > 1.05 ? "var(--green)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_kd`] < 0.9 ? "var(--redDark)" : players[0][`t${team}p${player}_kd`] > 1.05 ? "var(--greenDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_kd`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_kpr`] < 0.60 ? "var(--red)" : players[0][`t${team}p${player}_kpr`] > 0.65 ? players[0][`t${team}p${player}_kpr`] > 0.70 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_kpr`] < 0.60 ? "var(--redDark)" : players[0][`t${team}p${player}_kpr`] > 0.65 ? players[0][`t${team}p${player}_kpr`] > 0.70 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_kpr`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_dpr`] < 0.68 ? "var(--green)" : players[0][`t${team}p${player}_dpr`] > 0.7 ? players[0][`t${team}p${player}_dpr`] > 0.8 ? "var(--red)" : "var(--yellow)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_dpr`] < 0.68 ? "var(--greenDark)" : players[0][`t${team}p${player}_dpr`] > 0.7 ? players[0][`t${team}p${player}_dpr`] > 0.8 ? "var(--redDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_dpr`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_impact`] < 1 ? "var(--red)" : players[0][`t${team}p${player}_impact`] > 1 ? players[0][`t${team}p${player}_impact`] >= 1.10 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_impact`] < 1 ? "var(--redDark)" : players[0][`t${team}p${player}_impact`] > 1 ? players[0][`t${team}p${player}_impact`] >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_impact`]}</div>
                                        <div className={classes.cell} style={
                                            {
                                                background: players[0][`t${team}p${player}_rating`] < 1 ? "var(--red)" : players[0][`t${team}p${player}_rating`] > 1 ? players[0][`t${team}p${player}_rating`] >= 1.10 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: players[0][`t${team}p${player}_rating`] < 1 ? "var(--redDark)" : players[0][`t${team}p${player}_rating`] > 1 ? players[0][`t${team}p${player}_rating`] >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{players[0][`t${team}p${player}_rating`]}</div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
                <img src={`/images/DataInImage/NEW_DESIGN_2025/resultMatch.png`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }

};

export default PictureResult2;