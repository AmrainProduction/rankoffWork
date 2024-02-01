import React from 'react';
import classes from "../TopYearPlayers.module.css";
import {
    useGetAwardsPlayersByNickQuery,
    useGetMatchesByNameQuery, useGetPlayerByNickQuery,
    useGetPlayersTournamentsByNickDescQuery
} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";

const PictureResult2 = (props) => {

    const id = props.name[0].id
    const nickname = props.name[0].nickname

    const player = useGetPlayerByNickQuery({id, nickname})

    let playerLogo
    let nameP
    let surnameP
    let stats2023 = []
    let place = props.name[0].place
    let team = props.name[0].team
    let teamLogo = props.name[0].logoTeam

    const awardsPlayer = useGetAwardsPlayersByNickQuery({id, nickname})
    const toursPlayer = useGetPlayersTournamentsByNickDescQuery({id, nickname})

    let MVP = []
    let statsPlayerFromTours = []

    if (awardsPlayer.data && awardsPlayer.data.length >= 0 && toursPlayer.data && toursPlayer.data.length > 0 && player.data && player.data.length > 0) {

        player.data.map(e => {
            playerLogo = e.logo_player
            nameP = e.name
            surnameP = e.surname
        })

        //получаем стату с турниров для игрока
        toursPlayer.data.map(e => {
            if (e.end_date_tour.slice(0, -6) === '2023' && e.name_tour_sort.slice(0, -4).toLowerCase() !== 'rankoffaward') {
                statsPlayerFromTours.push(e)
            }
        })

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

        //счиатем стату игрока за 2023 год
        statsPlayerFromTours?.map(e => {

            kd_p += e.kd_p
            kpr_p += e.kpr_p
            dpr_p += e.dpr_p
            k += e.k
            a += e.a
            d += e.d
            impact_p += e.impact_p
            rating += e.rating
            w_rounds += e.w_rounds
            l_rounds += e.l_rounds
            maps += e.maps

        })

        stats2023 = [{
            "kd": Math.round((kd_p / statsPlayerFromTours.length) * 100) / 100,
            "kpr": Math.round((kpr_p / statsPlayerFromTours.length) * 100) / 100,
            "dpr": Math.round((dpr_p / statsPlayerFromTours.length) * 100) / 100,
            "k": k,
            "a": a,
            "d": d,
            "diff": k - d,
            "impact": Math.round((impact_p / statsPlayerFromTours.length) * 100) / 100,
            "rating": Math.round((rating / statsPlayerFromTours.length) * 100) / 100,
            "w_rounds": w_rounds,
            "l_rounds": l_rounds,
            "maps": maps,
        }]

        //получаем МВП награды игрока
        awardsPlayer.data.map(e => {
            statsPlayerFromTours.map(e2 => {
                if (e.logo_award.slice(0, 3).toLowerCase() === 'mvp' && e.end_date_tour.slice(0, -6) === '2023') {
                    if (e2.name_tour_sort === e.name_tour_sort) {
                        MVP.push({
                            name_tour_sort: e.name_tour_sort,
                            logo_tour: e2.logo_tour,
                            name: e2.name_tour,
                            date: e.end_date_tour,
                            medal: e.logo_award,
                        })
                    }
                }
            })
        })

    }

    return (
        <div className={classes.wrapperTopYearPlayers}>

            <div className={classes.wrapperNumber}>
                <div className={classes.number} style={
                    {
                        // color: place === 3 ? "#995928" : place === 2 ? "#999FA3" :  place === 1 ? "#c5b74e" : ""
                    }
                }>#3</div>
            </div>

            <div className={classes.mainSection}>
                <div className={classes.wrapperPlayer}>
                    <div className={classes.wrapperLogoTeam}>
                        <img src={`/images/LogoTeams/${teamLogo}`} className={classes.teamLogo} alt="/"/>
                    </div>
                    <div className={classes.wrapperLogoPlayer}>
                        <img src={`/images/LogoPlayers/${playerLogo}`} className={classes.playerLogo}
                             alt="/"/>
                    </div>
                    <div className={classes.wrapperNickname}>
                        <div className={classes.nickname}>{nickname}</div>
                        <div className={classes.FIO}>
                            <div className={classes.dataFlagPlayer}>
                                <CountryFlagPlayer nickname={nickname} width={'24px'}
                                                   height={'17px'} margin={'0 0 0 5px'}/>
                            </div>
                            {nameP + " " + surnameP}</div>
                    </div>
                    <div className={classes.gradient}></div>
                </div>

                <div className={classes.wrapper2023Stats}>
                    <div className={classes.wrapperPlayerTitle}>
                        <div className={classes.playerTitle2023Stats}>
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
                    </div>
                    <div className={classes.wrapperPlayerTitle}>
                        {stats2023.map((e, index) => {
                            return (
                                <div key={index} className={classes.player2023Stats}>
                                    <div className={classes.dataPlayer1} style={
                                        {
                                            background: e.kd < 0.9 ? "#854141" : e.kd > 1.05 ? "#528347" : "#a29747"
                                        }
                                    }>{e.kd}</div>
                                    <div className={classes.dataPlayer2} style={
                                        {
                                            background: e.kpr < 0.60 ? "#854141" : e.kpr > 0.65 ? e.kpr > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                        }
                                    }>{e.kpr}</div>
                                    <div className={classes.dataPlayer3} style={
                                        {
                                            background: e.dpr < 0.68 ? "#528347" : e.dpr > 0.7 ? e.dpr > 0.8 ? "#854141" : "#a29747" : "#854141"
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
                                            background: e.impact < 1 ? "#854141" : e.impact > 1 ? e.impact >= 1.15 ? "#528347" : "#a29747" : "#a29747"
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
                </div>

                <div className={classes.wrapperMvpAwards}>
                    {MVP.map((e, index) => {
                        return (
                            <div key={index} className={classes.mvpAward}>
                                <img src={`/images/LogoAndBannerTour/${e.logo_tour}`}
                                     alt="/"/>
                                {e.name} - {e.date}</div>
                        )
                    })}
                </div>
                <div className={classes.wrapperTeamAchieve}>
                    {statsPlayerFromTours.map((e, index) => {
                        return (
                            <div key={index} className={classes.teamAchieve} style={
                                {
                                   background: e.position_team === 3 ? " linear-gradient(to right, #995928 1%, transparent 70%)" : e.position_team === 2 ? " linear-gradient(to right, #868B8DFF 1%, transparent 70%)" : e.position_team === 1 ? " linear-gradient(to right, #A29747FF 1%, transparent 70%)" : ""
                                }
                            }>
                                <div>
                                    <img src={`/images/LogoAndBannerTour/${e.logo_tour}`} alt="/"/>
                                </div>
                                <div className={classes.teamAchieve1}>{e.name_tour}</div>
                                <div className={classes.teamAchieve2}>{" - " + e.end_date_tour}</div>
                                <div className={classes.teamAchieve3}>{" - " + e.position_team} Place</div>
                            </div>
                        )
                    })}
                </div>
                <div className={classes.wrapperPersonalStats}>
                    <div className={classes.wrapperPlayerTitle}>
                        <div className={classes.playerTitle}>
                            <div className={classes.teamTeamTitle}>team</div>
                            <div className={classes.dataNameTourTitle}>tournament</div>
                            <div className={classes.dataDateTourTitle}>date</div>
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
                    </div>

                    {statsPlayerFromTours.map((e, index) => {
                        return (
                            <div key={index} className={classes.player}>
                                <div className={classes.logoTeamPersonalStats}>
                                    <img src={`/images/LogoTeams/${e.logo_team}`} alt="/"/>
                                </div>
                                <div className={classes.dataNameTeam}>{e.team}</div>
                                <div className={classes.dataLogoTour}>
                                    <img src={`/images/LogoAndBannerTour/${e.logo_tour}`} alt="/"/>
                                </div>
                                <div className={classes.dataNameTour}>{e.name_tour}</div>
                                <div className={classes.dataDateTour}>{e.end_date_tour}</div>
                                <div className={classes.dataPlayer1} style={
                                    {
                                        background: e.kd_p < 0.9 ? "#854141" : e.kd_p > 1.05 ? "#528347" : "#a29747"
                                    }
                                }>{e.kd_p}
                                </div>
                                <div className={classes.dataPlayer2} style={
                                    {
                                        background: e.kpr_p < 0.60 ? "#854141" : e.kpr_p > 0.65 ? e.kpr_p > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{e.kpr_p}</div>
                                <div className={classes.dataPlayer3} style={
                                    {
                                        background: e.dpr_p < 0.68 ? "#528347" : e.dpr_p > 0.7 ? e.dpr_p > 0.8 ? "#854141" : "#a29747" : "#854141"
                                    }
                                }>{e.dpr_p}</div>
                                <div className={classes.dataPlayer4}>{e.k}</div>
                                <div className={classes.dataPlayer5}>{e.a}</div>
                                <div className={classes.dataPlayer6}>{e.d}</div>
                                <div className={classes.dataPlayer7} style={
                                    {
                                        background: (e.k - e.d) > 0 ? "#528347" : "#854141"
                                    }
                                }>{e.k - e.d}</div>
                                <div className={classes.dataPlayer8} style={
                                    {
                                        background: e.impact_p < 1 ? "#854141" : e.impact_p > 1 ? e.impact_p >= 1.15 ? "#528347" : "#a29747" : "#a29747"
                                    }
                                }>{e.impact_p}</div>
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

            </div>

            <img src={`/images/DataInImage/TOP_YEAR_PLAYERS.png`} className={classes.bgImg} alt="/"/>
        </div>
    )

};

export default PictureResult2;