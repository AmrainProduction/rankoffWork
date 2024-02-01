import React from 'react';
import classes from '../Component/Content/RatingTeams/ratingTeams.module.css'
import {Link} from "react-router-dom";
import {useGetTeamsQuery, useGetTeamsTournamentsQuery} from "../store/api/apiSlice";
import CountryFlagTeam from "./countryFlagTeam";

const CurrentRatingTeams = (props) => {

    const {data} = useGetTeamsTournamentsQuery()
    const allTeams = useGetTeamsQuery()

    let list = []

    let arr = []
    let temp2 = [];
    let temp3 = [];
    let allPoints = 0
    let arrTeams = []

    if(data) {
        list = data

        for (let i = 0; i < list.length; i++) {
            temp2.push(list[i].name_team)

        }

        temp2 = temp2.filter((item, index) => {
            return temp2.indexOf(item) === index
        });

        for (let i = 0; i < list.length; i++) {
            temp3.push(list[i].logo_team)
        }

        temp3 = temp3.filter((item, index) => {
            return temp3.indexOf(item) === index
        });

        //
        // temp2.map((name, index) => {
        //     temp3.map(logo => {
        //         if (name.replace(/ /g, "") === logo.slice(0, -4)) {
        //             // console.log(name.replace(/ /g, ""), logo)
        //             arrTeams.push({
        //                 id: index,
        //                 name: name,
        //                 logo: logo,
        //             })
        //         }
        //     })
        // })

        temp2.map((name, index) => {
            temp3.map(logo => {
                allTeams.data?.map(e => {
                    if (name.replace(/ /g, "") === logo.slice(0, -4) && e.name_team.replace(/ /g, "") === name.replace(/ /g, "")) {
                        arrTeams.push({
                            id: index,
                            name: name,
                            logo: logo,
                            p1: e.player_1,
                            p2: e.player_2,
                            p3: e.player_3,
                            p4: e.player_4,
                            p5: e.player_5,
                        })
                    }
                })
            })
        })

        function whatDateDiff(date1) {
            let now = new Date();
            let tourDate1 = new Date(date1.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
            let tourDate2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            return tourDate2.getMonth() - tourDate1.getMonth() +
                (12 * (tourDate2.getFullYear() - tourDate1.getFullYear()))
        }

        if (list.length > 0) {
            arrTeams.map((el, index) => {
                list.map(team => {
                    if (el.name === team.name_team && (whatDateDiff(team.date_tour) <= 3)) {
                        allPoints += team.points_team
                        arr[index] = {
                            id: index,
                            img: team.logo_team,
                            name: team.name_team,
                            p1: el.p1,
                            p2: el.p2,
                            p3: el.p3,
                            p4: el.p4,
                            p5: el.p5,
                            points: allPoints,
                        }
                    }
                })

                allPoints = 0
            })

            arrTeams.map((el, index) => {
                let count = 0;
                arr.map(t => {
                    if (el.name === t.name) {
                        count++
                    }
                })

                if (count === 0) {
                    arr.push({
                        id: index,
                        img: el.logo,
                        name: el.name,
                        p1: el.p1,
                        p2: el.p2,
                        p3: el.p3,
                        p4: el.p4,
                        p5: el.p5,
                        points: 0,
                    })
                }
            })

            arr = arr.filter(function (n) {
                return n;
            })

            arr.sort(function (a, b) {
                return a.points < b.points ? -1 : a.points > b.points ? 1 : 0;
            }).reverse().map((el, index) => {
                arr[index].id = index
            })

        }
    }

    if (props.teams === 'teams') {
        return (
            arr.map(team => {
                if (team.id < 10) {
                    return (
                        <div key={team.id} className={classes.wrapperCardTeam}>
                            <Link to={`/teams/profile/${team.name}`} className={classes.cardLogoTeam}>
                                <img className={classes.logoTeam}
                                     src={`/images/LogoTeams/${team.img}`}
                                     alt={`/`}/>
                            </Link>
                            <div className={classes.nameTeam}>{team.name}
                                <CountryFlagTeam p1={team.p1} p2={team.p2} p3={team.p3} p4={team.p4} p5={team.p5} mode="team"/>
                            </div>
                            <div className={classes.pointsTeam}>Points: {team.points}</div>
                            <span className={classes.positionTeam}>#<li></li></span>
                        </div>
                    )
                }
            })
        )
    } else {
        return (
            arr.map(team => {
                if (props.nameTeam === team.name) {
                    return (
                        <span key={team.id}>Points: {team.points}</span>
                    )
                }
            })
        )
    }


};

export default CurrentRatingTeams;
//
// const {data} = useGetTeamsTournamentsQuery()
// const allTeams = useGetTeamsQuery()
//
// let list = []
//
// let arr = []
// let temp2 = [];
// let temp3 = [];
// let allPoints = 0
// let arrTeams = []
//
// if(data) {
//     list = data
//
//     for (let i = 0; i < list.length; i++) {
//         temp2.push(list[i].name_team)
//
//     }
//
//     temp2 = temp2.filter((item, index) => {
//         return temp2.indexOf(item) === index
//     });
//
//     for (let i = 0; i < list.length; i++) {
//         temp3.push(list[i].logo_team)
//     }
//
//     temp3 = temp3.filter((item, index) => {
//         return temp3.indexOf(item) === index
//     });
//
//
//     temp2.map((name, index) => {
//         temp3.map(logo => {
//             if (name.replace(/ /g, "") === logo.slice(0, -4)) {
//                 // console.log(name.replace(/ /g, ""), logo)
//                 arrTeams.push({
//                     id: index,
//                     name: name,
//                     logo: logo,
//                 })
//             }
//         })
//     })
//
//     function whatDateDiff(date1) {
//         let now = new Date();
//         let tourDate1 = new Date(date1.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
//         let tourDate2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//         return tourDate2.getMonth() - tourDate1.getMonth() +
//             (12 * (tourDate2.getFullYear() - tourDate1.getFullYear()))
//     }
//
//     if (list.length > 0) {
//         arrTeams.map((el, index) => {
//             list.map(team => {
//                 if (el.name === team.name_team && (whatDateDiff(team.date_tour) <= 4)) {
//                     allPoints += team.points_team
//                     arr[index] = {
//                         id: index,
//                         img: team.logo_team,
//                         name: team.name_team,
//                         points: allPoints,
//                     }
//                 }
//             })
//
//             allPoints = 0
//         })
//
//         arrTeams.map((el, index) => {
//             let count = 0;
//             arr.map(t => {
//                 if (el.name === t.name) {
//                     count++
//                 }
//             })
//
//             if (count === 0) {
//                 arr.push({
//                     id: index,
//                     img: el.logo,
//                     name: el.name,
//                     points: 0,
//                 })
//             }
//         })
//
//         arr = arr.filter(function (n) {
//             return n;
//         })
//
//         arr.sort(function (a, b) {
//             return a.points < b.points ? -1 : a.points > b.points ? 1 : 0;
//         }).reverse().map((el, index) => {
//             arr[index].id = index
//         })
//
//     }
// }