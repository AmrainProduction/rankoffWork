import React, {createRef, useCallback, useState} from 'react';
import {
    useGetAwardsPlayersByNickQuery,
    useGetAwardsQuery,
    useGetMatchesByNameQuery, useGetMatchesQuery,
    useGetPlayerByNickQuery,
    useGetPlayersQuery, useGetPlayersTournamentsByNickQuery,
    useGetShortMatchQuery
} from "../../../store/api/apiSlice";
import {toPng} from "html-to-image";
import classes from "../../MatchPicture2/matchPicture2.module.css";
import logo from "../../../logo.svg";
import PictureResult2 from "../../MatchPicture2/PictureResult/pictureResult2";
import ResultBanner from "./resultBanner/resultBanner";
import Kpr from "../../Formulas/kpr";
import Dpr from "../../Formulas/dpr";
import Rating from "../../Formulas/rating";

const TopPlayersBanner = () => {
    let [choicePlayer, setChoicePlayer] = useState([])
    let [enterPosition, setEnterPosition] = useState('')

    let id = choicePlayer.id
    let nickname = choicePlayer.nickname

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesQuery()
    const allShortMatches = useGetShortMatchQuery()
    const allAwards = useGetAwardsPlayersByNickQuery({id, nickname})
    const allEvents = useGetPlayersTournamentsByNickQuery({id, nickname})

    let MVPAwards = []
    let EVPAwards = []
    let positionsTeamPlayer = []
    let allAwardsPlayer = []
    let allEventsPlayer = []

    if(allAwards.data && allAwards.data.length >= 0 && allEvents.data && allEvents.data.length > 0) {
        allAwardsPlayer = allAwards.data.filter(e => e.end_date_tour.slice(0, 4) === "2024" && !e.name_tour_sort.toLowerCase().includes("rankoff") && (
            e.name_tour_sort === "WinlineEpicStandoff2Season14_11_12_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Major2_25_11_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season13_08_10_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season12_04_09_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season11_01_08_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Major_10_07_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season10_30_05_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season9_25_04_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season8_28_03_24"
            || e.name_tour_sort === "GamesOfFuture_03_03_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season7_11_02_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Brazil4_24_09_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Brazil_20_08_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Brazil2_14_05_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Brazil_12_03_24"
        ))
        allEventsPlayer = allEvents.data.filter(e => e.end_date_tour.slice(0, 4) === "2024" && !e.name_tour.toLowerCase().includes("rankoff") && (
            e.name_tour_sort === "WinlineEpicStandoff2Season14_11_12_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Major2_25_11_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season13_08_10_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season12_04_09_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season11_01_08_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Major_10_07_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season10_30_05_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season9_25_04_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season8_28_03_24"
            || e.name_tour_sort === "GamesOfFuture_03_03_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Season7_11_02_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Brazil4_24_09_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Brazil_20_08_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Brazil2_14_05_24"
            || e.name_tour_sort === "WinlineEpicStandoff2Brazil_12_03_24"
        ))

        let one = 0
        let two = 0
        let three = 0
        positionsTeamPlayer = []

        allEventsPlayer.forEach(e => {
            if(e.position_team === 1) {
                one++
            } else if (e.position_team === 2) {
                two++
            } else if (e.position_team === 3) {
                three++
            }

            positionsTeamPlayer = [one, two, three]
        })

        MVPAwards = allAwardsPlayer.filter(e => e.logo_award.slice(0, 3).toLowerCase() === "mpv")
        EVPAwards = allAwardsPlayer.filter(e => e.logo_award.slice(0, 3).toLowerCase() === "evp")
    }


    const calculatePersonalStatsForYear = (allPlayers, allMatches, allShortMatches) => {

        let allMatchesForPeriod
        let necessaryPlayers = []
        let resultStatsPlayers = []

        let player_id
        let name
        let nickname
        let surname
        let team
        let logo_player
        let date_birth
        let back_logo_team
        let country_flag
        let rating = 0
        let impact = 0
        let k = 0
        let a = 0
        let d = 0
        let maps = 0
        let rounds = 0
        let matches = 0
        let w_maps = 0
        let l_maps = 0
        let w_rounds = 0
        let l_rounds = 0
        let w_match = 0
        let l_match = 0
        let w_group = 0
        let w_playoff = 0
        let w_final = 0
        let l_group = 0
        let l_playoff = 0
        let l_final = 0


        if (allMatches.data && allMatches.data.length > 0 && allPlayers.data && allPlayers.data.length > 0 && allShortMatches.data && allShortMatches.data.length > 0) {

            allMatchesForPeriod = allMatches.data.filter(e => e.db_date_match.slice(0, 4) === "2024" && (
                e.name_tour_for_sort === "WinlineEpicStandoff2Season14_11_12_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Major2_25_11_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Season13_08_10_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Season12_04_09_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Season11_01_08_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Major_10_07_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Season10_30_05_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Season9_25_04_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Season8_28_03_24"
                || e.name_tour_for_sort === "GamesOfFuture_03_03_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Season7_11_02_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Brazil4_24_09_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Brazil_20_08_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Brazil2_14_05_24"
                || e.name_tour_for_sort === "WinlineEpicStandoff2Brazil_12_03_24"
                )
            )

            allMatchesForPeriod.map(e => {
                for (let i = 1; i < 3; i++) {
                    for (let j = 1; j < 6; j++) {
                        let nicknameKey = `t${i}p${j}`
                        let playerIdKey = `t${i}p${j}_id`

                        let nickname = e[nicknameKey]
                        let player_id = e[playerIdKey]

                        // Проверка на наличие игрока с таким же ником
                        let alreadyExists = necessaryPlayers.some(player => player.nickname === nickname)

                        if (!alreadyExists) {
                            necessaryPlayers.push({
                                nickname: nickname,
                                player_id: player_id,
                            })
                        }
                    }
                }
            })

            if (allPlayers.data.length === 1) {
                necessaryPlayers = [{player_id: allPlayers.data[0].player_id}]
            }

            necessaryPlayers.map(e1 => {
                let tempDataPlayer = allPlayers.data.filter(player => player.player_id === e1.player_id)

                player_id = tempDataPlayer[0]?.player_id
                date_birth = tempDataPlayer[0]?.date_birth
                name = tempDataPlayer[0]?.name
                nickname = tempDataPlayer[0]?.nickname
                surname = tempDataPlayer[0]?.surname
                team = tempDataPlayer[0]?.team
                logo_player = tempDataPlayer[0]?.logo_player
                back_logo_team = tempDataPlayer[0]?.back_logo_team
                country_flag = tempDataPlayer[0]?.country_flag

                let tempMatchId = ""

                allMatchesForPeriod.map(e2 => {
                    if (e2.t1p1_id === e1.player_id || e2.t1p2_id === e1.player_id || e2.t1p3_id === e1.player_id || e2.t1p4_id === e1.player_id || e2.t1p5_id === e1.player_id) {

                        //подсчет выигранных и проигранных матчей

                        let temp = allShortMatches.data.find(e => e.name_match_for_sort === e2.name_match_for_sort)

                        if(temp?.total_score_match_t1 >= temp?.total_score_match_t2 && tempMatchId !== e2.name_match_for_sort) {
                            matches++
                            w_match++
                        }

                        if(temp?.total_score_match_t1 < temp?.total_score_match_t2 && tempMatchId !== e2.name_match_for_sort) {
                            matches++
                            l_match++
                        }

                        tempMatchId = e2.name_match_for_sort
                        //подсчет процента выигранных матчей на разных стадиях

                        if(temp?.total_score_match_t1 >= temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes("group")) {
                            w_group++
                        }

                        if (temp?.total_score_match_t1 >= temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes("playoff")) {
                            w_playoff++
                        }

                        if (temp?.total_score_match_t1 >= temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes("final")) {
                            w_final++
                        }

                        if(temp?.total_score_match_t2 >= temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes("group")) {
                            l_group++
                        }

                        if (temp?.total_score_match_t2 >= temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes("playoff")) {
                            l_playoff++
                        }

                        if (temp?.total_score_match_t2 >= temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes("final")) {
                            l_final++
                        }

                        //подсчет поражений и побед игрока

                        if (e2.total_r_team1 > e2.total_r_team2) {
                            w_maps++
                        }
                        if (e2.total_r_team1 < e2.total_r_team2) {
                            l_maps++
                        }

                        //подсчет победных и проигранных раундов игрока

                        w_rounds += e2.total_r_team1
                        l_rounds += e2.total_r_team2

                    }

                    if (e2.t2p1_id === e1.player_id || e2.t2p2_id === e1.player_id || e2.t2p3_id === e1.player_id || e2.t2p4_id === e1.player_id || e2.t2p5_id === e1.player_id) {

                        let temp = allShortMatches.data.find(e => e.name_match_for_sort === e2.name_match_for_sort)

                        if(temp?.total_score_match_t2 >= temp?.total_score_match_t1 && tempMatchId !== e2.name_match_for_sort) {
                            matches++
                            w_match++
                        }

                        if(temp?.total_score_match_t2 < temp?.total_score_match_t1 && tempMatchId !== e2.name_match_for_sort) {
                            matches++
                            l_match++
                        }

                        tempMatchId = e2.name_match_for_sort
                        //подсчет процента выигранных матчей на разных стадиях

                        if(temp?.total_score_match_t2 >= temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes("group")) {
                            w_group++
                        }

                        if (temp?.total_score_match_t2 >= temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes("playoff")) {
                            w_playoff++
                        }

                        if (temp?.total_score_match_t2 >= temp?.total_score_match_t1 && temp?.name_stage.toLowerCase().includes("final")) {
                            w_final++
                        }

                        if(temp?.total_score_match_t1 >= temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes("group")) {
                            l_group++
                        }

                        if (temp?.total_score_match_t1 >= temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes("playoff")) {
                            l_playoff++
                        }

                        if (temp?.total_score_match_t1 >= temp?.total_score_match_t2 && temp?.name_stage.toLowerCase().includes("final")) {
                            l_final++
                        }

                        //подсчет поражений и побед игрока

                        if (e2.total_r_team1 < e2.total_r_team2) {
                            w_maps++
                        }
                        if (e2.total_r_team1 > e2.total_r_team2) {
                            l_maps++
                        }

                        //подсчет победных и проигранных раундов игрока

                        w_rounds += e2.total_r_team2
                        l_rounds += e2.total_r_team1
                    }

                    if (e2.t1p1_id === e1.player_id) {
                        impact += e2.t1p1_impact
                        k += e2.t1p1_k
                        a += e2.t1p1_a
                        d += e2.t1p1_d
                    }

                    if (e2.t1p2_id === e1.player_id) {
                        impact += e2.t1p2_impact
                        k += e2.t1p2_k
                        a += e2.t1p2_a
                        d += e2.t1p2_d
                    }

                    if (e2.t1p3_id === e1.player_id) {
                        impact += e2.t1p3_impact
                        k += e2.t1p3_k
                        a += e2.t1p3_a
                        d += e2.t1p3_d
                    }

                    if (e2.t1p4_id === e1.player_id) {
                        impact += e2.t1p4_impact
                        k += e2.t1p4_k
                        a += e2.t1p4_a
                        d += e2.t1p4_d
                    }

                    if (e2.t1p5_id === e1.player_id) {
                        impact += e2.t1p5_impact
                        k += e2.t1p5_k
                        a += e2.t1p5_a
                        d += e2.t1p5_d
                    }

                    if (e2.t2p1_id === e1.player_id) {
                        impact += e2.t2p1_impact
                        k += e2.t2p1_k
                        a += e2.t2p1_a
                        d += e2.t2p1_d
                    }

                    if (e2.t2p2_id === e1.player_id) {
                        impact += e2.t2p2_impact
                        k += e2.t2p2_k
                        a += e2.t2p2_a
                        d += e2.t2p2_d
                    }

                    if (e2.t2p3_id === e1.player_id) {
                        impact += e2.t2p3_impact
                        k += e2.t2p3_k
                        a += e2.t2p3_a
                        d += e2.t2p3_d
                    }

                    if (e2.t2p4_id === e1.player_id) {
                        impact += e2.t2p4_impact
                        k += e2.t2p4_k
                        a += e2.t2p4_a
                        d += e2.t2p4_d
                    }

                    if (e2.t2p5_id === e1.player_id) {
                        impact += e2.t2p5_impact
                        k += e2.t2p5_k
                        a += e2.t2p5_a
                        d += e2.t2p5_d
                    }

                    maps = w_maps + l_maps
                    rounds = w_rounds + l_rounds
                })

                if (k && d) {
                    let kd = (k / d)
                    let kpr = Kpr(k, rounds)
                    let dpr = Dpr(d, rounds)
                    impact = impact / maps
                    rating = Rating(kd, kpr, dpr, impact)

                    resultStatsPlayers.push({
                        "player_id": player_id,
                        "name": name,
                        "nickname": nickname,
                        "surname": surname,
                        "team": team,
                        "date_birth": date_birth,
                        "logo_player": logo_player,
                        "back_logo_team": back_logo_team,
                        "country_flag": country_flag,
                        "kd": Math.round(kd * 100) / 100,
                        "kpr": Math.round(kpr * 100) / 100,
                        "dpr": Math.round(dpr * 100) / 100,
                        "impact": Math.round(impact * 100) / 100,
                        "rating": rating,
                        "k": k,
                        "a": a,
                        "d": d,
                        "matches": matches,
                        "w_match": w_match,
                        "l_match": l_match,
                        "maps": maps,
                        "rounds": rounds,
                        "w_maps": w_maps,
                        "l_maps": l_maps,
                        "w_rounds": w_rounds,
                        "l_rounds": l_rounds,
                        "w_group": w_group,
                        "w_playoff": w_playoff,
                        "w_final": w_final,
                        "l_group": l_group,
                        "l_playoff": l_playoff,
                        "l_final": l_final,
                        "wr_group": isNaN(Math.round(((w_group / (w_group + l_group))*100))) ? 0: Math.round(((w_group / (w_group + l_group))*100)),
                        "wr_playoff": isNaN(Math.round(((w_playoff / (w_playoff + l_playoff))*100))) ? 0: Math.round(((w_playoff / (w_playoff + l_playoff))*100)),
                        "wr_final": isNaN(Math.round(((w_final / (w_final + l_final))*100))) ? 0: Math.round(((w_final / (w_final + l_final))*100)),
                    })

                    rating = 0
                    impact = 0
                    k = 0
                    a = 0
                    d = 0
                    maps = 0
                    rounds = 0
                    w_maps = 0
                    l_maps = 0
                    w_rounds = 0
                    l_rounds = 0
                    matches = 0
                    w_match = 0
                    l_match = 0
                    w_group = 0
                    w_playoff = 0
                    w_final = 0
                    l_group = 0
                    l_playoff = 0
                    l_final = 0
                }
            })

        }

        if (resultStatsPlayers && resultStatsPlayers.length > 0) {
            return (
                resultStatsPlayers
            )
        }
    }

    let necessaryPlayers = calculatePersonalStatsForYear(allPlayers, allMatches, allShortMatches)
    let necessaryPlayer = necessaryPlayers?.filter(e => e.player_id === choicePlayer.id)

    let listPlayers = []

    if (necessaryPlayers && necessaryPlayers.length > 0) {
        necessaryPlayers.map(e => {
            listPlayers.push({
                id: e.player_id,
                nickname: e.nickname
            })
        })
    }

    const handleEnterPosition = (event) => {
       const value = event.target.value;

        if (value.length > 3) {
            setEnterPosition(event.target.value.slice(0, 3))
        } else {
            setEnterPosition(event.target.value)
        }
    }

//--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${nickname}.jpg`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    return (
        <>
            <div className={classes.wrapperMenu}>
                <div className={classes.wrapperLogo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={classes.menu}>
                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Позиция в топе:</div>
                        <input type="number" className={classes.inputPosition} autoComplete="off"
                              value={enterPosition} onChange={handleEnterPosition}/>
                    </div>
                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Выбор игрока:</div>
                        <div className={classes.listMatches}>
                            {listPlayers.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoicePlayer(e)
                                    }}>
                                        {e.nickname}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={classes.btnSaveAsImage} onClick={onButtonClick}>
                        Скачать
                    </div>
                </div>
            </div>
            <div className={classes.wrapperPicture} ref={ref}>
                {necessaryPlayer?.length > 0 ? <ResultBanner player={necessaryPlayer} position={enterPosition} MVP={MVPAwards} EVP={EVPAwards}
                countFirstPlaces={positionsTeamPlayer} allEvents={allEventsPlayer}/> : ''}
            </div>
        </>
    );
};

export default TopPlayersBanner;