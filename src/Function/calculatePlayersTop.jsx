import normalizeImpact from "../Component/Functions/AllFunctions/normalizeImpact";
import Kpr from "../Component/Formulas/kpr";
import Dpr from "../Component/Formulas/dpr";
import Rating from "../Component/Formulas/rating";

export function calculatePlayersTop(name, stageTour, allPlayers, allMatches, teamsTour, tourInfo, allShortMatches, filterTours) {

    let stage = (stageTour === "playoff" ? "PLAYOFF" : stageTour === "group" ? "GROUP STAGE" : "")

    let players_tournaments = []
    let sortMatches = []
    let sortByStageMatches = []
    let necessaryMatches = []

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
    let k = 0
    let a = 0
    let d = 0
    let impact = 0
    let rating = 0
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

    if (stage && stage.length > 0) {
        if (stage === "group") {
            sortByStageMatches = allShortMatches?.data?.filter(e => e.name_stage.toLowerCase().includes(stage))
            sortByStageMatches?.map(e => {
                sortMatches?.map((e2, index) => {
                    if (e.name_match_for_sort === e2.name_match_for_sort) {
                        necessaryMatches[index] = e2
                    }
                })
            })
        }

        if (stage === "playoff") {
            sortByStageMatches = allShortMatches?.data?.filter(e => e.name_stage.toLowerCase().includes(stage) || e.name_stage.toLowerCase().includes("final"))

            sortByStageMatches?.map(e => {
                sortMatches?.map((e2, index) => {
                    if (e.name_match_for_sort === e2.name_match_for_sort) {
                        necessaryMatches[index] = e2
                    }
                })
            })
        }
        if (stage === "full") {
            necessaryMatches = allMatches?.data?.filter(e => e.name_tour_for_sort === name)
        }
    } else if (filterTours && filterTours.length > 0) {
        necessaryMatches = allMatches?.data?.filter(e1 => filterTours.some(e2 => e2 === e1.name_tour_for_sort))
    } else {
        necessaryMatches = allMatches?.data?.filter(e => e.name_tour_for_sort === name)
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

        necessaryMatches?.map((match, indexMatch) => {

            //----------сбор общей информации о трунире------------------------------

            name_tour_sort = match.name_tour_for_sort
            name_tour = match.name_tour

            //----------сбор статистики игрока из первой команды------------------------------

            if (match.t1p1_id === player_id || match.t1p2_id === player_id || match.t1p3_id === player_id || match.t1p4_id === player_id || match.t1p5_id === player_id) {
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

            if (match.t1p1_id === player_id) {
                logo_player = match.t1p1_logo
                impact += match.t1p1_impact
                k += match.t1p1_k
                a += match.t1p1_a
                d += match.t1p1_d
            }

            if (match.t1p2_id === player_id) {
                logo_player = match.t1p2_logo
                impact += match.t1p2_impact
                k += match.t1p2_k
                a += match.t1p2_a
                d += match.t1p2_d
            }

            if (match.t1p3_id === player_id) {

                logo_player = match.t1p3_logo
                impact += match.t1p3_impact
                k += match.t1p3_k
                a += match.t1p3_a
                d += match.t1p3_d
            }

            if (match.t1p4_id === player_id) {
                logo_player = match.t1p4_logo
                impact += match.t1p4_impact
                k += match.t1p4_k
                a += match.t1p4_a
                d += match.t1p4_d
            }

            if (match.t1p5_id === player_id) {
                logo_player = match.t1p5_logo
                impact += match.t1p5_impact
                k += match.t1p5_k
                a += match.t1p5_a
                d += match.t1p5_d
            }

            //----------сбор статистики игрока из второй команды------------------------------

            if (match.t2p1_id === player_id || match.t2p2_id === player_id || match.t2p3_id === player_id || match.t2p4_id === player_id || match.t2p5_id === player_id) {

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

            if (match.t2p1_id === player_id) {
                logo_player = match.t2p1_logo
                impact += match.t2p1_impact
                k += match.t2p1_k
                a += match.t2p1_a
                d += match.t2p1_d
            }

            if (match.t2p2_id === player_id) {
                logo_player = match.t2p2_logo
                impact += match.t2p2_impact
                k += match.t2p2_k
                a += match.t2p2_a
                d += match.t2p2_d
            }

            if (match.t2p3_id === player_id) {
                logo_player = match.t2p3_logo
                impact += match.t2p3_impact
                k += match.t2p3_k
                a += match.t2p3_a
                d += match.t2p3_d
            }

            if (match.t2p4_id === player_id) {
                logo_player = match.t2p4_logo
                impact += match.t2p4_impact
                k += match.t2p4_k
                a += match.t2p4_a
                d += match.t2p4_d
            }

            if (match.t2p5_id === player_id) {
                logo_player = match.t2p5_logo
                impact += match.t2p5_impact
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

        if (k && d) {
            let kd = (k / d)
            let kpr = Kpr(k, rounds_win + rounds_lose)
            let dpr = Dpr(d, rounds_win + rounds_lose)
            impact = impact / maps_all
            rating = Rating(kd, kpr, dpr, impact)

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
                "kd_p": Math.round(kd * 100) / 100,
                "kpr_p": Math.round(kpr * 100) / 100,
                "dpr_p": Math.round(dpr * 100) / 100,
                "impact_p": Math.round(impact * 100) / 100,
                "rating": rating,
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

        k = 0
        a = 0
        d = 0
        impact = 0
        rating = 0
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

    // players_tournaments = players_tournaments.sort(function (a, b) {
    //     return (parseFloat(b.rating) - parseFloat(a.rating))
    // });

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

    return sortPlayersArr
}