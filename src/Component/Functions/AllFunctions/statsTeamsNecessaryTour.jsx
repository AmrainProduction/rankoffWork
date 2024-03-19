import React from 'react';
import {
    useGetMatchesQuery,
    useGetTeamsQuery,
    useGetTeamsTournamentsByNameQuery,
    useGetTournamentsQuery
} from "../../../store/api/apiSlice";
import {useState} from "react";
import classes from "../functions.module.css";

const StatsTeamsNecessaryTour = () => {

    const tours = useGetTournamentsQuery()

    const [choiceTour, setChoiceTour] = useState([])

    const name = choiceTour  //имя турнира с которого берем команды для обновления их информации

    const allMatchesData = useGetMatchesQuery()
    const allTeamsData = useGetTeamsQuery()

    const allTeamsFromTourData = useGetTeamsTournamentsByNameQuery({name})

    let allMatches = []
    let allTeams = []
    let query = ''

    let arr = []
    let logo_team
    let name_team
    let team_id
    let player_1
    let player_2
    let player_3
    let player_4
    let player_5
    let w_map = 0
    let l_map = 0
    let w_rounds = 0
    let l_rounds = 0
    let played_sandstone = 0
    let played_rust = 0
    let played_province = 0
    let played_zone9 = 0
    let played_sakura = 0
    let played_breeze = 0
    let played_dune = 0
    let played_zone7 = 0
    let w_sandstone = 0
    let w_rust = 0
    let w_province = 0
    let w_zone9 = 0
    let w_sakura = 0
    let w_breeze = 0
    let w_dune = 0
    let w_zone7 = 0
    let l_sandstone = 0
    let l_rust = 0
    let l_province = 0
    let l_zone9 = 0
    let l_sakura = 0
    let l_breeze = 0
    let l_dune = 0
    let l_zone7 = 0
    let pick_sandstone = 0
    let pick_rust = 0
    let pick_province = 0
    let pick_zone9 = 0
    let pick_sakura = 0
    let pick_breeze = 0
    let pick_dune = 0
    let pick_zone7 = 0
    let awards_team
    let link_vk
    let link_yt
    let link_tg
    let link_dis
    let points_team = 0

    if (allMatchesData.data && allTeamsData.data && allMatchesData.data.length > 0 && allTeamsData.data.length > 0) {

        if (allTeamsFromTourData.data && allTeamsFromTourData.data.length > 0) {
            allTeamsFromTourData.data.map((e, index) => {
                allTeamsData.data.map((e1) => {
                    if (e1.name_team === e.name_team && e1.team_id === e.team_id) {
                        allTeams[index] = e1
                    }
                })
            })
        }

        allMatches = allMatchesData.data

        // allTeams = allTeamsData.data //разкомментить для подсчета статистики всех команд всех турниров

        allTeams.map((teams, index) => {
            logo_team = teams.logo_team
            name_team = teams.name_team
            team_id = teams.team_id
            player_1 = teams.player_1
            player_2 = teams.player_2
            player_3 = teams.player_3
            player_4 = teams.player_4
            player_5 = teams.player_5
            awards_team = teams.awards_team
            link_vk = teams.link_vk
            link_yt = teams.link_yt
            link_tg = teams.link_telegram
            link_dis = teams.link_discord
            points_team = teams.points_team
            allMatches.map((matches, indexM) => {
                if (matches.team1 === teams.name_team && matches.team1_id === teams.team_id) {
                    if (matches.map === 'Rust') {
                        w_rounds += matches.total_r_team1
                        l_rounds += matches.total_r_team2
                        played_rust++
                        if (matches.map_pick === teams.name_team) {
                            pick_rust++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            w_map++
                            w_rust++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            l_map++
                            l_rust++
                        }
                    }

                    if (matches.map === 'Dune') {
                        w_rounds += matches.total_r_team1
                        l_rounds += matches.total_r_team2
                        played_dune++
                        if (matches.map_pick === teams.name_team) {
                            pick_dune++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            w_map++
                            w_dune++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            l_map++
                            l_dune++
                        }
                    }

                    if (matches.map === 'Zone7') {
                        w_rounds += matches.total_r_team1
                        l_rounds += matches.total_r_team2
                        played_zone7++
                        if (matches.map_pick === teams.name_team) {
                            pick_zone7++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            w_map++
                            w_zone7++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            l_map++
                            l_zone7++
                        }
                    }

                    if (matches.map === 'Sandstone') {
                        w_rounds += matches.total_r_team1
                        l_rounds += matches.total_r_team2
                        played_sandstone++
                        if (matches.map_pick === teams.name_team) {
                            pick_sandstone++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            w_map++
                            w_sandstone++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            l_map++
                            l_sandstone++
                        }
                    }

                    if (matches.map === 'Province') {
                        w_rounds += matches.total_r_team1
                        l_rounds += matches.total_r_team2
                        played_province++
                        if (matches.map_pick === teams.name_team) {
                            pick_province++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            w_map++
                            w_province++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            l_map++
                            l_province++
                        }
                    }

                    if (matches.map === 'Sakura') {
                        w_rounds += matches.total_r_team1
                        l_rounds += matches.total_r_team2
                        played_sakura++
                        if (matches.map_pick === teams.name_team) {
                            pick_sakura++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            w_map++
                            w_sakura++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            l_map++
                            l_sakura++
                        }
                    }

                    if (matches.map === 'Zone9') {
                        w_rounds += matches.total_r_team1
                        l_rounds += matches.total_r_team2
                        played_zone9++
                        if (matches.map_pick === teams.name_team) {
                            pick_zone9++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            w_map++
                            w_zone9++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            l_map++
                            l_zone9++
                        }
                    }

                    if (matches.map === 'Breeze') {
                        w_rounds += matches.total_r_team1
                        l_rounds += matches.total_r_team2
                        played_breeze++
                        if (matches.map_pick === teams.name_team) {
                            pick_breeze++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            w_map++
                            w_breeze++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            l_map++
                            l_breeze++
                        }
                    }
                }
                if (matches.team2 === teams.name_team && matches.team2_id === teams.team_id) {
                    if (matches.map === 'Rust') {
                        w_rounds += matches.total_r_team2
                        l_rounds += matches.total_r_team1
                        played_rust++
                        if (matches.map_pick === teams.name_team) {
                            pick_rust++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            w_rust++
                            w_map++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            l_rust++
                            l_map++
                        }
                    }

                    if (matches.map === 'Dune') {
                        w_rounds += matches.total_r_team2
                        l_rounds += matches.total_r_team1
                        played_dune++
                        if (matches.map_pick === teams.name_team) {
                            pick_dune++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            w_dune++
                            w_map++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            l_dune++
                            l_map++
                        }
                    }

                    if (matches.map === 'Sandstone') {
                        w_rounds += matches.total_r_team2
                        l_rounds += matches.total_r_team1
                        played_sandstone++
                        if (matches.map_pick === teams.name_team) {
                            pick_sandstone++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            w_sandstone++
                            w_map++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            l_sandstone++
                            l_map++
                        }
                    }

                    if (matches.map === 'Province') {
                        w_rounds += matches.total_r_team2
                        l_rounds += matches.total_r_team1
                        played_province++
                        if (matches.map_pick === teams.name_team) {
                            pick_province++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            w_province++
                            w_map++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            l_province++
                            l_map++
                        }
                    }

                    if (matches.map === 'Sakura') {
                        w_rounds += matches.total_r_team2
                        l_rounds += matches.total_r_team1
                        played_sakura++
                        if (matches.map_pick === teams.name_team) {
                            pick_sakura++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            w_sakura++
                            w_map++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            l_sakura++
                            l_map++
                        }
                    }

                    if (matches.map === 'Zone9') {
                        w_rounds += matches.total_r_team2
                        l_rounds += matches.total_r_team1
                        played_zone9++
                        if (matches.map_pick === teams.name_team) {
                            pick_zone9++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            w_zone9++
                            w_map++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            l_zone9++
                            l_map++
                        }
                    }

                    if (matches.map === 'Breeze') {
                        w_rounds += matches.total_r_team2
                        l_rounds += matches.total_r_team1
                        played_breeze++
                        if (matches.map_pick === teams.name_team) {
                            pick_breeze++
                        }
                        if (matches.total_r_team1 < matches.total_r_team2) {
                            w_breeze++
                            w_map++
                        }
                        if (matches.total_r_team1 > matches.total_r_team2) {
                            l_breeze++
                            l_map++
                        }
                    }
                }
            })

            arr[index] =
                [{
                    'logo_team': logo_team,
                    'name_team': name_team,
                    'team_id': team_id,
                    'player_1': player_1,
                    'player_2': player_2,
                    'player_3': player_3,
                    'player_4': player_4,
                    'player_5': player_5,
                    'w_map': w_map,
                    'l_map': l_map,
                    'w_rounds': w_rounds,
                    'l_rounds': l_rounds,
                    'played_sandstone': played_sandstone,
                    'played_rust': played_rust,
                    'played_province': played_province,
                    'played_zone9': played_zone9,
                    'played_sakura': played_sakura,
                    'played_breeze': played_breeze,
                    'played_dune': played_dune,
                    'played_zone7': played_zone7,
                    'w_sandstone': w_sandstone,
                    'w_rust': w_rust,
                    'w_province': w_province,
                    'w_zone9': w_zone9,
                    'w_sakura': w_sakura,
                    'w_breeze': w_breeze,
                    'w_dune': w_dune,
                    'w_zone7': w_zone7,
                    'l_sandstone': l_sandstone,
                    'l_rust': l_rust,
                    'l_province': l_province,
                    'l_zone9': l_zone9,
                    'l_sakura': l_sakura,
                    'l_breeze': l_breeze,
                    'l_dune': l_dune,
                    'l_zone7': l_zone7,
                    'pick_sandstone': pick_sandstone,
                    'pick_rust': pick_rust,
                    'pick_province': pick_province,
                    'pick_zone9': pick_zone9,
                    'pick_sakura': pick_sakura,
                    'pick_breeze': pick_breeze,
                    'pick_dune': pick_dune,
                    'pick_zone7': pick_zone7,
                    'awards_team': awards_team,
                    'link_vk': link_vk,
                    'link_yt': link_yt,
                    'link_tg': link_tg,
                    'link_dis': link_dis,
                    'points_team': points_team,
                }]

            query += "UPDATE teams SET w_map=" + `'`+ w_map + `'` + ',' + 'l_map=' + `'`+ l_map + `'` + ',' + 'w_rounds=' + `'`+ w_rounds + `'` + ',' + 'l_rounds=' + `'`+ l_rounds + `'` + ',' + 'played_sandstone=' + `'`+ played_sandstone + `'` + ',' + 'played_rust=' + `'`+ played_rust + `'` + ',' + 'played_province=' + `'`+ played_province + `'` + ',' + 'played_zone9=' + `'`+ played_zone9 + `'` + ',' + 'played_sakura=' + `'`+ played_sakura + `'` + ',' + 'played_breeze=' + `'`+ played_breeze + `'` + ',' +'played_dune=' + `'`+ played_dune + `'` + ',' +'played_zone7=' + `'`+ played_zone7 + `'` + ',' + 'w_sandstone=' + `'`+ w_sandstone + `'` + ',' + 'w_rust=' + `'`+ w_rust + `'` + ',' + 'w_province=' + `'`+ w_province + `'` + ',' + 'w_zone9=' + `'`+ w_zone9 + `'` + ',' + 'w_sakura=' + `'`+ w_sakura + `'` + ',' + 'w_breeze=' + `'`+ w_breeze + `'`+ ',' + 'w_dune=' + `'`+ w_dune + `'` + ',' + 'w_zone7=' + `'`+ w_zone7 + `'` + ',' + 'l_sandstone=' + `'`+ l_sandstone + `'` + ',' + 'l_rust=' + `'`+ l_rust + `'` + ',' + 'l_province=' + `'`+ l_province + `'` + ',' + 'l_zone9=' + `'`+ l_zone9 + `'` + ',' + 'l_sakura=' + `'`+ l_sakura + `'` + ',' + 'l_breeze=' + `'`+ l_breeze + `'` + ',' + 'l_dune=' + `'`+ l_dune + `'` + ',' + 'l_zone7=' + `'`+ l_zone7 + `'` + ',' + 'pick_sandstone=' + `'`+ pick_sandstone + `'` + ',' + 'pick_rust=' + `'`+ pick_rust + `'` + ',' + 'pick_province=' + `'`+ pick_province + `'` + ',' + 'pick_zone9=' + `'`+ pick_zone9 + `'` + ',' + 'pick_sakura=' + `'`+ pick_sakura + `'` + ',' + 'pick_breeze=' + `'`+ pick_breeze + `'` + ',' + 'pick_dune=' + `'` + pick_dune + `'` + ',' + 'pick_zone7=' + `'` + pick_zone7 + `'` + " WHERE " + 'name_team=' + `'`+ `${name_team}` + `'` + ' AND team_id=' + `'`+ team_id + `'` + ';\n'

            logo_team = 0
            name_team = 0
            player_1 = 0
            player_2 = 0
            player_3 = 0
            player_4 = 0
            player_5 = 0
            w_map = 0
            l_map = 0
            w_rounds = 0
            l_rounds = 0
            played_sandstone = 0
            played_rust = 0
            played_province = 0
            played_zone9 = 0
            played_sakura = 0
            played_breeze = 0
            played_dune = 0
            played_zone7 = 0
            w_sandstone = 0
            w_rust = 0
            w_province = 0
            w_zone9 = 0
            w_sakura = 0
            w_breeze = 0
            w_dune = 0
            w_zone7 = 0
            l_sandstone = 0
            l_rust = 0
            l_province = 0
            l_zone9 = 0
            l_sakura = 0
            l_breeze = 0
            l_dune = 0
            l_zone7 = 0
            pick_sandstone = 0
            pick_rust = 0
            pick_province = 0
            pick_zone9 = 0
            pick_sakura = 0
            pick_breeze = 0
            pick_dune = 0
            pick_zone7 = 0
            awards_team = 0
            link_vk = 0
            link_yt = 0
            points_team = 0
        })
    }

    return (
        <div className={classes.wrapperStatsPlayersTour}>
            <div className={classes.listTours}>
                {tours.data?.map((e, index) => {
                    return (
                        <div key={index} className={classes.tour} onClick={el => {
                            setChoiceTour(e.name_tour_sort)
                        }}>{e.name_tour_sort}</div>
                    )
                })}
            </div>
            <div className={classes.actionButtons}>
                <div className={classes.tour} onClick={e => {
                    navigator.clipboard.writeText(query.length > 0 ? query : "").then(() => {
                        console.log('Copy good')
                    }, () => {
                        console.log('Fail copy')
                    })
                }}>
                    Copy
                </div>
            </div>
            <div className={classes.resultCommand}>
                {query.length > 0 ? query : ""}
            </div>
        </div>
    );
};

export default StatsTeamsNecessaryTour;