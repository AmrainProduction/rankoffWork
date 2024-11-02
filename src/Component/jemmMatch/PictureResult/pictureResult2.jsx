import React from 'react';
import classes from "../jemmMatch.module.css";
import {useGetMatchesByNameQuery} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";
import normalizeImpact from "../../Functions/AllFunctions/normalizeImpact";
import normalizeRating from "../../Functions/AllFunctions/normalizeRating";
import normalizeKD from "../../Functions/AllFunctions/normalizeKD";
import clsx from "clsx";

const PictureResult2 = (props) => {

    const name = props.name
    const choiceMap = props.map

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
    let tempArr = []

    if (necessaryMatch.data && necessaryMatch.data.length > 0) {
        tempArr = (choiceMap.length > 0 && choiceMap !== "AllMaps") ? necessaryMatch.data.filter(e => e.map === choiceMap) : necessaryMatch.data

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

            allRounds = (el.total_r_team1 + el.total_r_team2)
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
                t1p1_kd += el.t1p1_kd
                t1p1_dpr += (el.t1p1_d / allRounds)
                t1p1_kpr += (el.t1p1_k / allRounds)
                t1p1_impact += el.t1p1_impact
                t1p1_rating += tempArr.length > 1 ? normalizeRating(el.t1p1_rating) : el.t1p1_rating
                t1p1_count_maps += 1
            } else {
                t1p1 = el.t1p1
                t1p1_logo = el.t1p1_logo
                t1p1_k = el.t1p1_k
                t1p1_a = el.t1p1_a
                t1p1_d = el.t1p1_d
                t1p1_kd = el.t1p1_kd
                t1p1_dpr = (el.t1p1_d / allRounds)
                t1p1_kpr = (el.t1p1_k / allRounds)
                t1p1_impact = el.t1p1_impact
                t1p1_rating = tempArr.length > 1 ? normalizeRating(el.t1p1_rating) : el.t1p1_rating
                t1p1_count_maps = 1
            }
            if (el.t1p2 && (el.t1p2 === t1p2_nickname)) {
                t1p2 = el.t1p2
                t1p2_logo = el.t1p2_logo
                t1p2_k += el.t1p2_k
                t1p2_a += el.t1p2_a
                t1p2_d += el.t1p2_d
                t1p2_kd += el.t1p2_kd
                t1p2_dpr += (el.t1p2_d / allRounds)
                t1p2_kpr += (el.t1p2_k / allRounds)
                t1p2_impact += el.t1p2_impact
                t1p2_rating += tempArr.length > 1 ? normalizeRating(el.t1p2_rating) : el.t1p2_rating
                t1p2_count_maps += 1
            } else {
                t1p2 = el.t1p2
                t1p2_logo = el.t1p2_logo
                t1p2_k = el.t1p2_k
                t1p2_a = el.t1p2_a
                t1p2_d = el.t1p2_d
                t1p2_kd = el.t1p2_kd
                t1p2_dpr = (el.t1p2_d / allRounds)
                t1p2_kpr = (el.t1p2_k / allRounds)
                t1p2_impact = el.t1p2_impact
                t1p2_rating = tempArr.length > 1 ? normalizeRating(el.t1p2_rating) : el.t1p2_rating
                t1p2_count_maps = 1
            }
            if (el.t1p3 && (el.t1p3 === t1p3_nickname)) {
                t1p3 = el.t1p3
                t1p3_logo = el.t1p3_logo
                t1p3_k += el.t1p3_k
                t1p3_a += el.t1p3_a
                t1p3_d += el.t1p3_d
                t1p3_kd += el.t1p3_kd
                t1p3_dpr += (el.t1p3_d / allRounds)
                t1p3_kpr += (el.t1p3_k / allRounds)
                t1p3_impact += el.t1p3_impact
                t1p3_rating += tempArr.length > 1 ? normalizeRating(el.t1p3_rating) : el.t1p3_rating
                t1p3_count_maps += 1
            } else {
                t1p3 = el.t1p3
                t1p3_logo = el.t1p3_logo
                t1p3_k = el.t1p3_k
                t1p3_a = el.t1p3_a
                t1p3_d = el.t1p3_d
                t1p3_kd = el.t1p3_kd
                t1p3_dpr = (el.t1p3_d / allRounds)
                t1p3_kpr = (el.t1p3_k / allRounds)
                t1p3_impact = el.t1p3_impact
                t1p3_rating = tempArr.length > 1 ? normalizeRating(el.t1p3_rating) : el.t1p3_rating
                t1p3_count_maps = 1
            }
            if (el.t1p4 && (el.t1p4 === t1p4_nickname)) {
                t1p4 = el.t1p4
                t1p4_logo = el.t1p4_logo
                t1p4_k += el.t1p4_k
                t1p4_a += el.t1p4_a
                t1p4_d += el.t1p4_d
                t1p4_kd += el.t1p4_kd
                t1p4_dpr += (el.t1p4_d / allRounds)
                t1p4_kpr += (el.t1p4_k / allRounds)
                t1p4_impact += el.t1p4_impact
                t1p4_rating += tempArr.length > 1 ? normalizeRating(el.t1p4_rating) : el.t1p4_rating
                t1p4_count_maps += 1
            } else {
                t1p4 = el.t1p4
                t1p4_logo = el.t1p4_logo
                t1p4_k = el.t1p4_k
                t1p4_a = el.t1p4_a
                t1p4_d = el.t1p4_d
                t1p4_kd = el.t1p4_kd
                t1p4_dpr = (el.t1p4_d / allRounds)
                t1p4_kpr = (el.t1p4_k / allRounds)
                t1p4_impact = el.t1p4_impact
                t1p4_rating = tempArr.length > 1 ? normalizeRating(el.t1p4_rating) : el.t1p4_rating
                t1p4_count_maps = 1
            }
            if (el.t1p5 && (el.t1p5 === t1p5_nickname)) {
                t1p5 = el.t1p5
                t1p5_logo = el.t1p5_logo
                t1p5_k += el.t1p5_k
                t1p5_a += el.t1p5_a
                t1p5_d += el.t1p5_d
                t1p5_kd += el.t1p5_kd
                t1p5_dpr += (el.t1p5_d / allRounds)
                t1p5_kpr += (el.t1p5_k / allRounds)
                t1p5_impact += el.t1p5_impact
                t1p5_rating += tempArr.length > 1 ? normalizeRating(el.t1p5_rating) : el.t1p5_rating
                t1p5_count_maps += 1
            } else {
                t1p5 = el.t1p5
                t1p5_logo = el.t1p5_logo
                t1p5_k = el.t1p5_k
                t1p5_a = el.t1p5_a
                t1p5_d = el.t1p5_d
                t1p5_kd = el.t1p5_kd
                t1p5_dpr = (el.t1p5_d / allRounds)
                t1p5_kpr = (el.t1p5_k / allRounds)
                t1p5_impact = el.t1p5_impact
                t1p5_rating = tempArr.length > 1 ? normalizeRating(el.t1p5_rating) : el.t1p5_rating
                t1p5_count_maps = 1
            }

            if (el.t2p1 && (el.t2p1 === t2p1_nickname)) {
                t2p1 = el.t2p1
                t2p1_logo = el.t2p1_logo
                t2p1_k += el.t2p1_k
                t2p1_a += el.t2p1_a
                t2p1_d += el.t2p1_d
                t2p1_kd += el.t2p1_kd
                t2p1_dpr += (el.t2p1_d / allRounds)
                t2p1_kpr += (el.t2p1_k / allRounds)
                t2p1_impact += el.t2p1_impact
                t2p1_rating += tempArr.length > 1 ? normalizeRating(el.t2p1_rating) : el.t2p1_rating
                t2p1_count_maps += 1
            } else {
                t2p1 = el.t2p1
                t2p1_logo = el.t2p1_logo
                t2p1_k = el.t2p1_k
                t2p1_a = el.t2p1_a
                t2p1_d = el.t2p1_d
                t2p1_kd = el.t2p1_kd
                t2p1_dpr = (el.t2p1_d / allRounds)
                t2p1_kpr = (el.t2p1_k / allRounds)
                t2p1_impact = el.t2p1_impact
                t2p1_rating = tempArr.length > 1 ? normalizeRating(el.t2p1_rating) : el.t2p1_rating
                t2p1_count_maps = 1
            }
            if (el.t2p2 && (el.t2p2 === t2p2_nickname)) {
                t2p2 = el.t2p2
                t2p2_logo = el.t2p2_logo
                t2p2_k += el.t2p2_k
                t2p2_a += el.t2p2_a
                t2p2_d += el.t2p2_d
                t2p2_kd += el.t2p2_kd
                t2p2_dpr += (el.t2p2_d / allRounds)
                t2p2_kpr += (el.t2p2_k / allRounds)
                t2p2_impact += el.t2p2_impact
                t2p2_rating += tempArr.length > 1 ? normalizeRating(el.t2p2_rating) : el.t2p2_rating
                t2p2_count_maps += 1
            } else {
                t2p2 = el.t2p2
                t2p2_logo = el.t2p2_logo
                t2p2_k = el.t2p2_k
                t2p2_a = el.t2p2_a
                t2p2_d = el.t2p2_d
                t2p2_kd = el.t2p2_kd
                t2p2_dpr = (el.t2p2_d / allRounds)
                t2p2_kpr = (el.t2p2_k / allRounds)
                t2p2_impact = el.t2p2_impact
                t2p2_rating = tempArr.length > 1 ? normalizeRating(el.t2p2_rating) : el.t2p2_rating
                t2p2_count_maps = 1
            }
            if (el.t2p3 && (el.t2p3 === t2p3_nickname)) {
                t2p3 = el.t2p3
                t2p3_logo = el.t2p3_logo
                t2p3_k += el.t2p3_k
                t2p3_a += el.t2p3_a
                t2p3_d += el.t2p3_d
                t2p3_kd += el.t2p3_kd
                t2p3_dpr += (el.t2p3_d / allRounds)
                t2p3_kpr += (el.t2p3_k / allRounds)
                t2p3_impact += el.t2p3_impact
                t2p3_rating += tempArr.length > 1 ? normalizeRating(el.t2p3_rating) : el.t2p3_rating
                t2p3_count_maps += 1
            } else {
                t2p3 = el.t2p3
                t2p3_logo = el.t2p3_logo
                t2p3_k = el.t2p3_k
                t2p3_a = el.t2p3_a
                t2p3_d = el.t2p3_d
                t2p3_kd = el.t2p3_kd
                t2p3_dpr = (el.t2p3_d / allRounds)
                t2p3_kpr = (el.t2p3_k / allRounds)
                t2p3_impact = el.t2p3_impact
                t2p3_rating = tempArr.length > 1 ? normalizeRating(el.t2p3_rating) : el.t2p3_rating
                t2p3_count_maps = 1
            }

            if (el.t2p4 && (el.t2p4 === t2p4_nickname)) {
                t2p4 = el.t2p4
                t2p4_logo = el.t2p4_logo
                t2p4_k += el.t2p4_k
                t2p4_a += el.t2p4_a
                t2p4_d += el.t2p4_d
                t2p4_kd += el.t2p4_kd
                t2p4_dpr += (el.t2p4_d / allRounds)
                t2p4_kpr += (el.t2p4_k / allRounds)
                t2p4_impact += el.t2p4_impact
                t2p4_rating += tempArr.length > 1 ? normalizeRating(el.t2p4_rating) : el.t2p4_rating
                t2p4_count_maps += 1
            } else {
                t2p4 = el.t2p4
                t2p4_logo = el.t2p4_logo
                t2p4_k = el.t2p4_k
                t2p4_a = el.t2p4_a
                t2p4_d = el.t2p4_d
                t2p4_kd = el.t2p4_kd
                t2p4_dpr = (el.t2p4_d / allRounds)
                t2p4_kpr = (el.t2p4_k / allRounds)
                t2p4_impact = el.t2p4_impact
                t2p4_rating = tempArr.length > 1 ? normalizeRating(el.t2p4_rating) : el.t2p4_rating
                t2p4_count_maps = 1
            }
            if (el.t2p5 && (el.t2p5 === t2p5_nickname)) {
                t2p5 = el.t2p5
                t2p5_logo = el.t2p5_logo
                t2p5_k += el.t2p5_k
                t2p5_a += el.t2p5_a
                t2p5_d += el.t2p5_d
                t2p5_kd += el.t2p5_kd
                t2p5_dpr += (el.t2p5_d / allRounds)
                t2p5_kpr += (el.t2p5_k / allRounds)
                t2p5_impact += el.t2p5_impact
                t2p5_rating += tempArr.length > 1 ? normalizeRating(el.t2p5_rating) : el.t2p5_rating
                t2p5_count_maps += 1
            } else {
                t2p5 = el.t2p5
                t2p5_logo = el.t2p5_logo
                t2p5_k = el.t2p5_k
                t2p5_a = el.t2p5_a
                t2p5_d = el.t2p5_d
                t2p5_kd = el.t2p5_kd
                t2p5_dpr = (el.t2p5_d / allRounds)
                t2p5_kpr = (el.t2p5_k / allRounds)
                t2p5_impact = el.t2p5_impact
                t2p5_rating = tempArr.length > 1 ? normalizeRating(el.t2p5_rating) : el.t2p5_rating
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
        }

        let max = []
        let maxRating = 0

        if (t1p1_rating > maxRating) {
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
                <div className={classes.wrapperTopSection}>
                    <div className={classes.wrapperLeftTopSection}>
                        <div className={classes.team1Logo}>
                            <img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/"/>
                        </div>
                        <div className={classes.scoreMatch}>{players[0].scoreT1}:{players[0].scoreT2}</div>
                        <div className={classes.team2Logo}>
                            <img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/"/>
                        </div>
                    </div>
                    <div className={classes.wrapperMiddleTopSection}>
                        <div className={classes.infoTour}>
                            <div className={classes.titleInfoTour}>EVENT</div>
                            <div className={classes.nameTour}>
                                {players[0].NameTour} {players[0].dateMatch}
                            </div>
                        </div>
                        {matchMaps.map((e, index) => {
                            return (
                                <div key={index} className={classes.wrapperMap}>
                                    <div className={classes.scoreMap}>
                                        <img src={`/images/LogoTeams/${e.team1Logo}`} alt="/"/>
                                        <div className={classes.totalScoreMap}>{e.scoreT1}:{e.scoreT2}</div>
                                        <img src={`/images/LogoTeams/${e.team2Logo}`} alt="/"/>
                                    </div>
                                    <div className={classes.imgMap}>
                                        <img src={`/images/LogoMaps/${e.map}`} alt=""/>
                                    </div>
                                    <div className={classes.pickMap}>
                                        <div className={classes.mapTeam}>{e.mapPickTeam}</div>
                                        <div className={classes.mapName}>{e.name.replace(/(\D)(\d)/, "$1 $2")}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.wrapperRightTopSection}>
                        <div className={classes.logoCollab}>
                            <img src={`/images/CyberNews/Rankoff.svg`} alt="/"/>
                        </div>
                        <div className={classes.logoCollab}>
                            <img src={`/images/CyberNews/JemmNews.svg`} alt="/"/>
                        </div>
                    </div>
                </div>

                <div className={classes.wrapperMiddleSection}>
                    <div className={classes.leftMiddleSection}>
                        <div className={classes.teamLogo}>
                            <img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/"/>
                        </div>
                        <div className={classes.nameTeam}>
                            {matchTeamsInfo[0].team1}
                        </div>
                        <div className={classes.victoryDefeat} style={
                            {
                                background: players[0].scoreT1 >= players[0].scoreT2 ? "var(--victory)" : "var(--defeat)"
                            }
                        }>
                            {players[0].scoreT1 >= players[0].scoreT2 ? "VICTORY" : "DEFEAT"}
                        </div>
                    </div>

                    <div className={classes.rightMiddleSection}>
                        <div className={classes.titleLineTable}>
                            <div className={classes.titleStartCell}>NICKNAME</div>
                            <div className={classes.titleCell}>K</div>
                            <div className={classes.titleCell}>A</div>
                            <div className={classes.titleCell}>D</div>
                            <div className={classes.titleCell}>+/-</div>
                            <div className={classes.titleCell}>KD</div>
                            <div className={classes.titleCell}>KPR</div>
                            <div className={classes.titleCell}>DPR</div>
                            <div className={classes.titleCell}>Impact</div>
                            <div className={classes.titleEndCell}>Rating</div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t1p1}/>
                                </div>
                                {players[0].t1p1}
                                <div className={classes.mvp} style={
                                    {
                                        display: t1p1 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t1p1_k}</div>
                            <div className={classes.cell}>{players[0].t1p1_a}</div>
                            <div className={classes.cell}>{players[0].t1p1_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t1p1_k - players[0].t1p1_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t1p1_k - players[0].t1p1_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p1_kd < 0.9 ? "var(--redStats)" : players[0].t1p1_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p1_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p1_kpr < 0.60 ? "var(--redStats)" : players[0].t1p1_kpr > 0.65 ? players[0].t1p1_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p1_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p1_dpr < 0.68 ? "var(--greenStats)" : players[0].t1p1_dpr > 0.7 ? players[0].t1p1_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t1p1_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p1_impact < 1 ? "var(--redStats)" : players[0].t1p1_impact > 1 ? players[0].t1p1_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p1_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p1_rating < 1 ? "var(--redStats)" : players[0].t1p1_rating > 1 ? players[0].t1p1_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p1_rating}
                            </div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t1p2}/>
                                </div>
                                {players[0].t1p2}
                                <div className={classes.mvp} style={
                                    {
                                        display: t1p2 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t1p2_k}</div>
                            <div className={classes.cell}>{players[0].t1p2_a}</div>
                            <div className={classes.cell}>{players[0].t1p2_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t1p2_k - players[0].t1p2_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t1p2_k - players[0].t1p2_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p2_kd < 0.9 ? "var(--redStats)" : players[0].t1p2_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p2_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p2_kpr < 0.60 ? "var(--redStats)" : players[0].t1p2_kpr > 0.65 ? players[0].t1p2_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p2_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p2_dpr < 0.68 ? "var(--greenStats)" : players[0].t1p2_dpr > 0.7 ? players[0].t1p2_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t1p2_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p2_impact < 1 ? "var(--redStats)" : players[0].t1p2_impact > 1 ? players[0].t1p2_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p2_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p2_rating < 1 ? "var(--redStats)" : players[0].t1p2_rating > 1 ? players[0].t1p2_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p2_rating}
                            </div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t1p3}/>
                                </div>
                                {players[0].t1p3}
                                <div className={classes.mvp} style={
                                    {
                                        display: t1p3 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t1p3_k}</div>
                            <div className={classes.cell}>{players[0].t1p3_a}</div>
                            <div className={classes.cell}>{players[0].t1p3_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t1p3_k - players[0].t1p3_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t1p3_k - players[0].t1p3_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p3_kd < 0.9 ? "var(--redStats)" : players[0].t1p3_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p3_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p3_kpr < 0.60 ? "var(--redStats)" : players[0].t1p3_kpr > 0.65 ? players[0].t1p3_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p3_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p3_dpr < 0.68 ? "var(--greenStats)" : players[0].t1p3_dpr > 0.7 ? players[0].t1p3_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t1p3_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p3_impact < 1 ? "var(--redStats)" : players[0].t1p3_impact > 1 ? players[0].t1p3_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p3_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p3_rating < 1 ? "var(--redStats)" : players[0].t1p3_rating > 1 ? players[0].t1p3_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p3_rating}
                            </div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t1p4}/>
                                </div>
                                {players[0].t1p4}
                                <div className={classes.mvp} style={
                                    {
                                        display: t1p4 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t1p4_k}</div>
                            <div className={classes.cell}>{players[0].t1p4_a}</div>
                            <div className={classes.cell}>{players[0].t1p4_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t1p4_k - players[0].t1p4_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t1p4_k - players[0].t1p4_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p4_kd < 0.9 ? "var(--redStats)" : players[0].t1p4_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p4_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p4_kpr < 0.60 ? "var(--redStats)" : players[0].t1p4_kpr > 0.65 ? players[0].t1p4_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p4_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p4_dpr < 0.68 ? "var(--greenStats)" : players[0].t1p4_dpr > 0.7 ? players[0].t1p4_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t1p4_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p4_impact < 1 ? "var(--redStats)" : players[0].t1p4_impact > 1 ? players[0].t1p4_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p4_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p4_rating < 1 ? "var(--redStats)" : players[0].t1p4_rating > 1 ? players[0].t1p4_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p4_rating}
                            </div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t1p5}/>
                                </div>
                                {players[0].t1p5}
                                <div className={classes.mvp} style={
                                    {
                                        display: t1p5 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t1p5_k}</div>
                            <div className={classes.cell}>{players[0].t1p5_a}</div>
                            <div className={classes.cell}>{players[0].t1p5_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t1p5_k - players[0].t1p5_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t1p5_k - players[0].t1p5_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p5_kd < 0.9 ? "var(--redStats)" : players[0].t1p5_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p5_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p5_kpr < 0.60 ? "var(--redStats)" : players[0].t1p5_kpr > 0.65 ? players[0].t1p5_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p5_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p5_dpr < 0.68 ? "var(--greenStats)" : players[0].t1p5_dpr > 0.7 ? players[0].t1p5_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t1p5_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p5_impact < 1 ? "var(--redStats)" : players[0].t1p5_impact > 1 ? players[0].t1p5_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p5_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t1p5_rating < 1 ? "var(--redStats)" : players[0].t1p5_rating > 1 ? players[0].t1p5_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t1p5_rating}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.wrapperBottomSection}>
                    <div className={classes.bottomLeftMiddleSection}>
                        <div className={classes.teamLogo}>
                            <img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/"/>
                        </div>
                        <div className={classes.nameTeam}>
                            {matchTeamsInfo[0].team2}
                        </div>
                        <div className={classes.victoryDefeat} style={
                            {
                                background: players[0].scoreT2 >= players[0].scoreT1 ? "var(--victory)" : "var(--defeat)"
                            }
                        }>
                            {players[0].scoreT2 >= players[0].scoreT1 ? "VICTORY" : "DEFEAT"}
                        </div>
                    </div>

                    <div className={classes.bottomRightMiddleSection}>
                        <div className={classes.titleLineTable}>
                            <div className={classes.titleStartCell}>NICKNAME</div>
                            <div className={classes.titleCell}>K</div>
                            <div className={classes.titleCell}>A</div>
                            <div className={classes.titleCell}>D</div>
                            <div className={classes.titleCell}>+/-</div>
                            <div className={classes.titleCell}>KD</div>
                            <div className={classes.titleCell}>KPR</div>
                            <div className={classes.titleCell}>DPR</div>
                            <div className={classes.titleCell}>Impact</div>
                            <div className={classes.titleEndCell}>Rating</div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t2p1}/>
                                </div>
                                {players[0].t2p1}
                                <div className={classes.mvp} style={
                                    {
                                        display: t2p1 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t2p1_k}</div>
                            <div className={classes.cell}>{players[0].t2p1_a}</div>
                            <div className={classes.cell}>{players[0].t2p1_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t2p1_k - players[0].t2p1_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t2p1_k - players[0].t2p1_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p1_kd < 0.9 ? "var(--redStats)" : players[0].t2p1_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p1_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p1_kpr < 0.60 ? "var(--redStats)" : players[0].t2p1_kpr > 0.65 ? players[0].t2p1_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p1_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p1_dpr < 0.68 ? "var(--greenStats)" : players[0].t2p1_dpr > 0.7 ? players[0].t2p1_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t2p1_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p1_impact < 1 ? "var(--redStats)" : players[0].t2p1_impact > 1 ? players[0].t2p1_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p1_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p1_rating < 1 ? "var(--redStats)" : players[0].t2p1_rating > 1 ? players[0].t2p1_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p1_rating}
                            </div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t2p2}/>
                                </div>
                                {players[0].t2p2}
                                <div className={classes.mvp} style={
                                    {
                                        display: t2p2 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t2p2_k}</div>
                            <div className={classes.cell}>{players[0].t2p2_a}</div>
                            <div className={classes.cell}>{players[0].t2p2_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t2p2_k - players[0].t2p2_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t2p2_k - players[0].t2p2_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p2_kd < 0.9 ? "var(--redStats)" : players[0].t2p2_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p2_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p2_kpr < 0.60 ? "var(--redStats)" : players[0].t2p2_kpr > 0.65 ? players[0].t2p2_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p2_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p2_dpr < 0.68 ? "var(--greenStats)" : players[0].t2p2_dpr > 0.7 ? players[0].t2p2_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t2p2_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p2_impact < 1 ? "var(--redStats)" : players[0].t2p2_impact > 1 ? players[0].t2p2_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p2_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p2_rating < 1 ? "var(--redStats)" : players[0].t2p2_rating > 1 ? players[0].t2p2_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p2_rating}
                            </div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t2p3}/>
                                </div>
                                {players[0].t2p3}
                                <div className={classes.mvp} style={
                                    {
                                        display: t2p3 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t2p3_k}</div>
                            <div className={classes.cell}>{players[0].t2p3_a}</div>
                            <div className={classes.cell}>{players[0].t2p3_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t2p3_k - players[0].t2p3_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t2p3_k - players[0].t2p3_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p3_kd < 0.9 ? "var(--redStats)" : players[0].t2p3_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p3_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p3_kpr < 0.60 ? "var(--redStats)" : players[0].t2p3_kpr > 0.65 ? players[0].t2p3_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p3_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p3_dpr < 0.68 ? "var(--greenStats)" : players[0].t2p3_dpr > 0.7 ? players[0].t2p3_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t2p3_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p3_impact < 1 ? "var(--redStats)" : players[0].t2p3_impact > 1 ? players[0].t2p3_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p3_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p3_rating < 1 ? "var(--redStats)" : players[0].t2p3_rating > 1 ? players[0].t2p3_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p3_rating}
                            </div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t2p4}/>
                                </div>
                                {players[0].t2p4}
                                <div className={classes.mvp} style={
                                    {
                                        display: t2p4 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t2p4_k}</div>
                            <div className={classes.cell}>{players[0].t2p4_a}</div>
                            <div className={classes.cell}>{players[0].t2p4_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t2p4_k - players[0].t2p4_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t2p4_k - players[0].t2p4_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p4_kd < 0.9 ? "var(--redStats)" : players[0].t2p4_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p4_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p4_kpr < 0.60 ? "var(--redStats)" : players[0].t2p4_kpr > 0.65 ? players[0].t2p4_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p4_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p4_dpr < 0.68 ? "var(--greenStats)" : players[0].t2p4_dpr > 0.7 ? players[0].t2p4_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t2p4_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p4_impact < 1 ? "var(--redStats)" : players[0].t2p4_impact > 1 ? players[0].t2p4_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p4_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p4_rating < 1 ? "var(--redStats)" : players[0].t2p4_rating > 1 ? players[0].t2p4_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p4_rating}
                            </div>
                        </div>
                        <div className={classes.rowTable}>
                            <div className={classes.startCell}>
                                <div className={classes.dataFlagPlayer}>
                                    <CountryFlagPlayer nickname={players[0].t2p5}/>
                                </div>
                                {players[0].t2p5}
                                <div className={classes.mvp} style={
                                    {
                                        display: t2p5 === max[0].player ? "flex" : "none"
                                    }
                                }>MVP
                                </div>
                            </div>
                            <div className={classes.cell}>{players[0].t2p5_k}</div>
                            <div className={classes.cell}>{players[0].t2p5_a}</div>
                            <div className={classes.cell}>{players[0].t2p5_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: (players[0].t2p5_k - players[0].t2p5_d) < 0 ? "var(--redStats)" : "var(--greenStats)"
                                }
                            }>{players[0].t2p5_k - players[0].t2p5_d}</div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p5_kd < 0.9 ? "var(--redStats)" : players[0].t2p5_kd > 1.05 ? "var(--greenStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p5_kd}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p5_kpr < 0.60 ? "var(--redStats)" : players[0].t2p5_kpr > 0.65 ? players[0].t2p5_kpr > 0.70 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p5_kpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p5_dpr < 0.68 ? "var(--greenStats)" : players[0].t2p5_dpr > 0.7 ? players[0].t2p5_dpr > 0.8 ? "var(--redStats)" : "var(--yellowStats)" : "var(--redStats)"
                                }
                            }>{players[0].t2p5_dpr}
                            </div>
                            <div className={classes.cell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p5_impact < 1 ? "var(--redStats)" : players[0].t2p5_impact > 1 ? players[0].t2p5_impact >= 1.15 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p5_impact}
                            </div>
                            <div className={classes.endCell} style={
                                {
                                    color: "var(--tableStatsTextColor)",
                                    background: players[0].t2p5_rating < 1 ? "var(--redStats)" : players[0].t2p5_rating > 1 ? players[0].t2p5_rating >= 1.10 ? "var(--greenStats)" : "var(--yellowStats)" : "var(--yellowStats)"
                                }
                            }>{players[0].t2p5_rating}
                            </div>
                        </div>
                    </div>

                </div>

                <img src={`/images/CyberNews/Yellow.png`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }

};

export default PictureResult2;