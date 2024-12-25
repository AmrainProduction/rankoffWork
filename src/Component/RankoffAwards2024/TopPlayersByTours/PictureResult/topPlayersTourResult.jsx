import React from 'react';
import classes from "../topPlayersByTours.module.css";
import {calculatePlayersTop} from "../../calculatePlayersTop";
import {
    useGetAwardsQuery,
    useGetMatchesQuery,
    useGetPlayersQuery,
    useGetShortMatchesByTournamentQuery,
    useGetShortMatchQuery,
    useGetTeamsTournamentsByNameQuery,
    useGetTournamentByNameQuery
} from "../../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../../Function/countryFlagPlayer";


const TopPlayersTourResult = (props) => {

    const name = props.name
    const stage = (props.stage === "playoff" ? "PLAYOFF" : props.stage === "group" ? "GROUP STAGE" : "")

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesQuery()
    const allShortMatches = useGetShortMatchesByTournamentQuery({name})
    const allShorts = useGetShortMatchQuery()
    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const tourInfo = useGetTournamentByNameQuery({name})
    const allAwards = useGetAwardsQuery()

    // "WinlineEpicStandoff2Brazil4_24_09_24",
    // "WinlineEpicStandoff2Brazil_20_08_24",
    // "WinlineEpicStandoff2Brazil2_14_05_24",
    // "WinlineEpicStandoff2Brazil_12_03_24"

    let filterToursOnline = [
        "WinlineEpicStandoff2Season14_11_12_24",
        "WinlineEpicStandoff2Season13_08_10_24",
        "WinlineEpicStandoff2Season12_04_09_24",
        "WinlineEpicStandoff2Season11_01_08_24",
        "WinlineEpicStandoff2Season10_30_05_24",
        "WinlineEpicStandoff2Season9_25_04_24",
        "WinlineEpicStandoff2Season8_28_03_24",
        "WinlineEpicStandoff2Season7_11_02_24",
        "ScamOffBeeline_23_08_24",
    ]

    let filterToursOffline = [
        "WinlineEpicStandoff2Major2_25_11_24",
        "WinlineEpicStandoff2Major_10_07_24",
        "GamesOfFuture_03_03_24",
    ]

    const delNecessaryFieldsAwards = (nickname, data) => {
        const fieldsToKeep = [nickname] // Список полей, которые нужно оставить
        let res = []

        data?.map(e => {
            const cleanedObj = {}
            fieldsToKeep.forEach(field => {
                if (field in e) {
                    cleanedObj[field] = e[field]
                }
            })
            res.push(cleanedObj)
        })

        return res
    }

    const delNecessaryFields = (nickname, metric, data) => {
        const fieldsToKeep = [nickname, metric] // Список полей, которые нужно оставить
        let res = []

        data.map(e => {
            const cleanedObj = {}
            fieldsToKeep.forEach(field => {
                if (field in e) {
                    cleanedObj[field] = e[field]
                }
            })
            res.push(cleanedObj)
        })

        return res
    }

    const addPointsOnlineGroupRating = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 4
        }))

        return res
    }

    const addPointsOnlinePlayoffRating = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 6
        }))

        return res
    }

    const addPointsOnlineFinalRating = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 5
        }))

        return res
    }

    const addPointsOfflineGroupRating = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 8
        }))

        return res
    }

    const addPointsOfflinePlayoffRating = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 12
        }))

        return res
    }

    const addPointsOfflineFinalRating = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 10
        }))

        return res
    }

    const addPointsOnlineGroup = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: (data.length + 1) - 1 - index
        }))

        return res
    }

    const addPointsOnlinePlayoff = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 1.5
        }))

        return res
    }

    const addPointsOnlineFinal = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 3
        }))

        return res
    }

    const addPointsOfflineGroup = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 3
        }))

        return res
    }

    const addPointsOfflinePlayoff = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 5
        }))

        return res
    }

    const addPointsOfflineFinal = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: ((data.length + 1) - 1 - index) * 10
        }))

        return res
    }

    const addPointsOnlineMVP = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: 350
        }))

        return res
    }

    const addPointsOfflineMVP = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: 600
        }))

        return res
    }

    const addPointsOnlineEVP = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: 200
        }))

        return res
    }

    const addPointsOfflineEVP = (data) => {
        let res = []

        res = data.map((e, index) => ({
            ...e,
            points: 300
        }))

        return res
    }

    const updatedData = (data) => {
        let res = []

        res = data.map(({name_player, ...rest}) => ({
            nickname: name_player,
            ...rest
        }))

        return res
    }

    //сортировки для топа игроков 2024

    let ONLINE_GROUP_MATCHES = allMatches?.data?.filter(e => allShorts?.data?.some(e2 => e2.name_stage.toLowerCase().includes("group") && e2.name_match_for_sort === e.name_match_for_sort))
    let ONLINE_GROUP_RATING = addPointsOnlineGroupRating(delNecessaryFields("nickname", "rating", calculatePlayersTop(name, stage, false, "rating", allPlayers.data, ONLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_GROUP_IMPACT = addPointsOnlineGroup(delNecessaryFields("nickname", "impact", calculatePlayersTop(name, stage, false, "impact", allPlayers.data, ONLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_GROUP_KD = addPointsOnlineGroup(delNecessaryFields("nickname", "kd", calculatePlayersTop(name, stage, false, "kd", allPlayers.data, ONLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_GROUP_KPR = addPointsOnlineGroup(delNecessaryFields("nickname", "kpr", calculatePlayersTop(name, stage, false, "kpr", allPlayers.data, ONLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_GROUP_DPR = addPointsOnlineGroup(delNecessaryFields("nickname", "dpr", calculatePlayersTop(name, stage, true, "dpr", allPlayers.data, ONLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_GROUP_K = addPointsOnlineGroup(delNecessaryFields("nickname", "K", calculatePlayersTop(name, stage, false, "k", allPlayers.data, ONLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_GROUP_A = addPointsOnlineGroup(delNecessaryFields("nickname", "A", calculatePlayersTop(name, stage, false, "a", allPlayers.data, ONLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_GROUP_D = addPointsOnlineGroup(delNecessaryFields("nickname", "D", calculatePlayersTop(name, stage, true, "d", allPlayers.data, ONLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))

    let ONLINE_PLAYOFF_MATCHES = allMatches?.data?.filter(e => allShorts?.data?.some(e2 => e2.name_stage.toLowerCase().includes("playoff") && e2.name_match_for_sort === e.name_match_for_sort))
    let ONLINE_PLAYOFF_RATING = addPointsOnlinePlayoffRating(delNecessaryFields("nickname", "rating", calculatePlayersTop(name, stage, false, "rating", allPlayers.data, ONLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_PLAYOFF_IMPACT = addPointsOnlinePlayoff(delNecessaryFields("nickname", "impact", calculatePlayersTop(name, stage, false, "impact", allPlayers.data, ONLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_PLAYOFF_KD = addPointsOnlinePlayoff(delNecessaryFields("nickname", "kd", calculatePlayersTop(name, stage, false, "kd", allPlayers.data, ONLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_PLAYOFF_KPR = addPointsOnlinePlayoff(delNecessaryFields("nickname", "kpr", calculatePlayersTop(name, stage, false, "kpr", allPlayers.data, ONLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_PLAYOFF_DPR = addPointsOnlinePlayoff(delNecessaryFields("nickname", "dpr", calculatePlayersTop(name, stage, true, "dpr", allPlayers.data, ONLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_PLAYOFF_K = addPointsOnlinePlayoff(delNecessaryFields("nickname", "K", calculatePlayersTop(name, stage, false, "k", allPlayers.data, ONLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_PLAYOFF_A = addPointsOnlinePlayoff(delNecessaryFields("nickname", "A", calculatePlayersTop(name, stage, false, "a", allPlayers.data, ONLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_PLAYOFF_D = addPointsOnlinePlayoff(delNecessaryFields("nickname", "D", calculatePlayersTop(name, stage, true, "d", allPlayers.data, ONLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))

    let ONLINE_FINAL_MATCHES = allMatches?.data?.filter(e => allShorts?.data?.some(e2 => e2.name_stage.toLowerCase().includes("final") && e2.name_match_for_sort === e.name_match_for_sort))
    let ONLINE_FINAL_RATING = addPointsOnlinePlayoffRating(delNecessaryFields("nickname", "rating", calculatePlayersTop(name, stage, false, "rating", allPlayers.data, ONLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_FINAL_IMPACT = addPointsOnlinePlayoff(delNecessaryFields("nickname", "impact", calculatePlayersTop(name, stage, false, "impact", allPlayers.data, ONLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_FINAL_KD = addPointsOnlinePlayoff(delNecessaryFields("nickname", "kd", calculatePlayersTop(name, stage, false, "kd", allPlayers.data, ONLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_FINAL_KPR = addPointsOnlinePlayoff(delNecessaryFields("nickname", "kpr", calculatePlayersTop(name, stage, false, "kpr", allPlayers.data, ONLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_FINAL_DPR = addPointsOnlinePlayoff(delNecessaryFields("nickname", "dpr", calculatePlayersTop(name, stage, true, "dpr", allPlayers.data, ONLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_FINAL_K = addPointsOnlinePlayoff(delNecessaryFields("nickname", "K", calculatePlayersTop(name, stage, false, "k", allPlayers.data, ONLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_FINAL_A = addPointsOnlinePlayoff(delNecessaryFields("nickname", "A", calculatePlayersTop(name, stage, false, "a", allPlayers.data, ONLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))
    let ONLINE_FINAL_D = addPointsOnlinePlayoff(delNecessaryFields("nickname", "D", calculatePlayersTop(name, stage, true, "d", allPlayers.data, ONLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOnline, allShorts.data)))

    let OFFLINE_GROUP_MATCHES = allMatches?.data?.filter(e => allShorts?.data?.some(e2 => e2.name_stage.toLowerCase().includes("group") && e2.name_match_for_sort === e.name_match_for_sort))
    let OFFLINE_GROUP_RATING = addPointsOfflineGroupRating(delNecessaryFields("nickname", "rating", calculatePlayersTop(name, stage, false, "rating", allPlayers.data, OFFLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_GROUP_IMPACT = addPointsOfflineGroup(delNecessaryFields("nickname", "impact", calculatePlayersTop(name, stage, false, "impact", allPlayers.data, OFFLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_GROUP_KD = addPointsOfflineGroup(delNecessaryFields("nickname", "kd", calculatePlayersTop(name, stage, false, "kd", allPlayers.data, OFFLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_GROUP_KPR = addPointsOfflineGroup(delNecessaryFields("nickname", "kpr", calculatePlayersTop(name, stage, false, "kpr", allPlayers.data, OFFLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_GROUP_DPR = addPointsOfflineGroup(delNecessaryFields("nickname", "dpr", calculatePlayersTop(name, stage, true, "dpr", allPlayers.data, OFFLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_GROUP_K = addPointsOfflineGroup(delNecessaryFields("nickname", "K", calculatePlayersTop(name, stage, false, "k", allPlayers.data, OFFLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_GROUP_A = addPointsOfflineGroup(delNecessaryFields("nickname", "A", calculatePlayersTop(name, stage, false, "a", allPlayers.data, OFFLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_GROUP_D = addPointsOfflineGroup(delNecessaryFields("nickname", "D", calculatePlayersTop(name, stage, true, "d", allPlayers.data, OFFLINE_GROUP_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))

    let OFFLINE_PLAYOFF_MATCHES = allMatches?.data?.filter(e => allShorts?.data?.some(e2 => e2.name_stage.toLowerCase().includes("playoff") && e2.name_match_for_sort === e.name_match_for_sort))
    let OFFLINE_PLAYOFF_RATING = addPointsOfflinePlayoffRating(delNecessaryFields("nickname", "rating", calculatePlayersTop(name, stage, false, "rating", allPlayers.data, OFFLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_PLAYOFF_IMPACT = addPointsOfflinePlayoff(delNecessaryFields("nickname", "impact", calculatePlayersTop(name, stage, false, "impact", allPlayers.data, OFFLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_PLAYOFF_KD = addPointsOfflinePlayoff(delNecessaryFields("nickname", "kd", calculatePlayersTop(name, stage, false, "kd", allPlayers.data, OFFLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_PLAYOFF_KPR = addPointsOfflinePlayoff(delNecessaryFields("nickname", "kpr", calculatePlayersTop(name, stage, false, "kpr", allPlayers.data, OFFLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_PLAYOFF_DPR = addPointsOfflinePlayoff(delNecessaryFields("nickname", "dpr", calculatePlayersTop(name, stage, true, "dpr", allPlayers.data, OFFLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_PLAYOFF_K = addPointsOfflinePlayoff(delNecessaryFields("nickname", "K", calculatePlayersTop(name, stage, false, "k", allPlayers.data, OFFLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_PLAYOFF_A = addPointsOfflinePlayoff(delNecessaryFields("nickname", "A", calculatePlayersTop(name, stage, false, "a", allPlayers.data, OFFLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_PLAYOFF_D = addPointsOfflinePlayoff(delNecessaryFields("nickname", "D", calculatePlayersTop(name, stage, true, "d", allPlayers.data, OFFLINE_PLAYOFF_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))

    let OFFLINE_FINAL_MATCHES = allMatches?.data?.filter(e => allShorts?.data?.some(e2 => e2.name_stage.toLowerCase().includes("final") && e2.name_match_for_sort === e.name_match_for_sort))
    let OFFLINE_FINAL_RATING = addPointsOfflinePlayoffRating(delNecessaryFields("nickname", "rating", calculatePlayersTop(name, stage, false, "rating", allPlayers.data, OFFLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_FINAL_IMPACT = addPointsOfflinePlayoff(delNecessaryFields("nickname", "impact", calculatePlayersTop(name, stage, false, "impact", allPlayers.data, OFFLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_FINAL_KD = addPointsOfflinePlayoff(delNecessaryFields("nickname", "kd", calculatePlayersTop(name, stage, false, "kd", allPlayers.data, OFFLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_FINAL_KPR = addPointsOfflinePlayoff(delNecessaryFields("nickname", "kpr", calculatePlayersTop(name, stage, false, "kpr", allPlayers.data, OFFLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_FINAL_DPR = addPointsOfflinePlayoff(delNecessaryFields("nickname", "dpr", calculatePlayersTop(name, stage, true, "dpr", allPlayers.data, OFFLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_FINAL_K = addPointsOfflinePlayoff(delNecessaryFields("nickname", "K", calculatePlayersTop(name, stage, false, "k", allPlayers.data, OFFLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_FINAL_A = addPointsOfflinePlayoff(delNecessaryFields("nickname", "A", calculatePlayersTop(name, stage, false, "a", allPlayers.data, OFFLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))
    let OFFLINE_FINAL_D = addPointsOfflinePlayoff(delNecessaryFields("nickname", "D", calculatePlayersTop(name, stage, true, "d", allPlayers.data, OFFLINE_FINAL_MATCHES, teamsTour.data, tourInfo.data, allShortMatches.data, filterToursOffline, allShorts.data)))

    let ONLINE_AWARDS_EVP = updatedData(addPointsOnlineEVP(delNecessaryFieldsAwards('name_player', allAwards?.data?.filter(e => filterToursOnline.some(e2 => e2 === e.name_tour_sort && e.player_id && e.logo_award.toLowerCase().includes('evp'))))))
    let ONLINE_AWARDS_MVP = updatedData(addPointsOnlineMVP(delNecessaryFieldsAwards('name_player', allAwards?.data?.filter(e => filterToursOnline.some(e2 => e2 === e.name_tour_sort && e.player_id && e.logo_award.toLowerCase().includes('mvp'))))))
    let OFFLINE_AWARDS_EVP = updatedData(addPointsOfflineEVP(delNecessaryFieldsAwards('name_player', allAwards?.data?.filter(e => filterToursOffline.some(e2 => e2 === e.name_tour_sort && e.player_id && e.logo_award.toLowerCase().includes('evp'))))))
    let OFFLINE_AWARDS_MVP = updatedData(addPointsOfflineMVP(delNecessaryFieldsAwards('name_player', allAwards?.data?.filter(e => filterToursOffline.some(e2 => e2 === e.name_tour_sort && e.player_id && e.logo_award.toLowerCase().includes('mvp'))))))

    let generalPlayersAndPoints = [
        ...OFFLINE_FINAL_RATING,
        ...OFFLINE_FINAL_IMPACT,
        ...OFFLINE_FINAL_KD,
        ...OFFLINE_FINAL_KPR,
        ...OFFLINE_FINAL_DPR,
        ...OFFLINE_FINAL_K,
        ...OFFLINE_FINAL_A,
        ...OFFLINE_FINAL_D,
        ...OFFLINE_PLAYOFF_RATING,
        ...OFFLINE_PLAYOFF_IMPACT,
        ...OFFLINE_PLAYOFF_KD,
        ...OFFLINE_PLAYOFF_KPR,
        ...OFFLINE_PLAYOFF_DPR,
        ...OFFLINE_PLAYOFF_K,
        ...OFFLINE_PLAYOFF_A,
        ...OFFLINE_PLAYOFF_D,
        ...OFFLINE_GROUP_RATING,
        ...OFFLINE_GROUP_IMPACT,
        ...OFFLINE_GROUP_KD,
        ...OFFLINE_GROUP_KPR,
        ...OFFLINE_GROUP_DPR,
        ...OFFLINE_GROUP_K,
        ...OFFLINE_GROUP_A,
        ...OFFLINE_GROUP_D,
        ...ONLINE_FINAL_RATING,
        ...ONLINE_FINAL_IMPACT,
        ...ONLINE_FINAL_KD,
        ...ONLINE_FINAL_KPR,
        ...ONLINE_FINAL_DPR,
        ...ONLINE_FINAL_K,
        ...ONLINE_FINAL_A,
        ...ONLINE_FINAL_D,
        ...ONLINE_PLAYOFF_RATING,
        ...ONLINE_PLAYOFF_IMPACT,
        ...ONLINE_PLAYOFF_KD,
        ...ONLINE_PLAYOFF_KPR,
        ...ONLINE_PLAYOFF_DPR,
        ...ONLINE_PLAYOFF_K,
        ...ONLINE_PLAYOFF_A,
        ...ONLINE_PLAYOFF_D,
        ...ONLINE_GROUP_RATING,
        ...ONLINE_GROUP_IMPACT,
        ...ONLINE_GROUP_KD,
        ...ONLINE_GROUP_KPR,
        ...ONLINE_GROUP_DPR,
        ...ONLINE_GROUP_K,
        ...ONLINE_GROUP_A,
        ...ONLINE_GROUP_D,
        ...ONLINE_AWARDS_EVP,
        ...ONLINE_AWARDS_MVP,
        ...OFFLINE_AWARDS_EVP,
        ...OFFLINE_AWARDS_MVP
    ]

    let calculatePointsPlayers = Object.values(
        generalPlayersAndPoints.reduce((acc, item) => {
            const {nickname, points} = item;

            // Если nickname уже есть, добавляем points, иначе инициализируем объект
            if (!acc[nickname]) {
                acc[nickname] = {nickname, points: 0};
            }
            acc[nickname].points += points;

            return acc;
        }, {})
    );

    calculatePointsPlayers = calculatePointsPlayers.sort((a, b) => b.points - a.points)

    console.log(calculatePointsPlayers)

    if (ONLINE_GROUP_IMPACT.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <div className={classes.wrapperTourInfo}>
                    <div className={classes.nameTour}>{"ТОП ИГРОКОВ ЗА ВСЕ МАЖОРЫ"}</div>
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
                    {ONLINE_GROUP_IMPACT.map((e, index) => {
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
                                                background: e.kd < 0.9 ? "#854141" : e.kd > 1.05 ? "#528347" : "#a29747"
                                            }
                                        }>{e.kd}
                                        </div>
                                        <div className={classes.dataPlayerKpr} style={
                                            {
                                                background: e.kpr < 0.60 ? "#854141" : e.kpr > 0.65 ? e.kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                            }
                                        }>{e.kpr}</div>
                                        <div className={classes.dataPlayerDpr} style={
                                            {
                                                background: e.dpr < 0.68 ? "#528347" : e.dpr > 0.7 ? e.dpr > 0.8 ? "#854141" : "#a29747" : "#a29747"
                                            }
                                        }>{e.dpr}</div>
                                        <div className={classes.dataPlayerK}>{e.k}</div>
                                        <div className={classes.dataPlayerA}>{e.a}</div>
                                        <div className={classes.dataPlayerD}>{e.d}</div>
                                        <div className={classes.dataPlayerImpact} style={
                                            {
                                                background: e.impact < 1 ? "#854141" : e.impact > 1 ? e.impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                            }
                                        }>{e.impact}</div>
                                        <div className={classes.dataPlayerRating} style={
                                            {
                                                background: e.rating < 1 ? "#854141" : e.rating > 1 ? e.rating >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                            }
                                        }>{Math.round(e.rating * 100) / 100}</div>
                                        <div className={classes.dataPlayerW_rounds}>{e.w_rounds}</div>
                                        <div className={classes.dataPlayerL_rounds}>{e.l_rounds}</div>
                                        <div className={classes.dataPlayerMaps}>{e.maps}</div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <img src={`/images/DataInImage/TOP_PLAYERS_TOUR_V4.png`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }


};

export default TopPlayersTourResult;