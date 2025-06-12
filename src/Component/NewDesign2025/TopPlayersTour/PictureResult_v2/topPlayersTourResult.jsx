import React, {useEffect, useState} from 'react';
import classes from "../topPlayersTour.module.css";
import {
    useGetMatchesQuery,
    useGetPlayersQuery, useGetShortMatchesByTournamentQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery
} from "../../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../../Function/countryFlagPlayer";
import {calculatePlayersTop} from "../../../../Function/calculatePlayersTop";

const TopPlayersTourResult = (props) => {

    const name = props.name
    const stage = (props.stage === "PLAYOFF" ? "PLAYOFF" : props.stage === "GROUP" ? "GROUP STAGE" : props.stage === "FINAL" ? "FINAL" : "")
    const [matches, setMatches] = useState([])

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesQuery()
    const allShortMatches = useGetShortMatchesByTournamentQuery({name})
    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const tourInfo = useGetTournamentByNameQuery({name})

    let filterTours = [
        // "WinlineEPICStandoff2CosmoMajorClosedQuals_06_05_25",
        "WinlineEpicStandoff2Major2_25_11_24",
        // "WinlineEpicStandoff2Major2ClosedQuals_05_11_24",
        "WinlineEpicStandoff2Major_10_07_24",
        // "WinlineEpicStandoff2MajorClosedQuals_21_06_24",
        "WinlineEpicStandoff2Major_06_12_23",
        "Major_06_06_23",
        "Major_13_09_22",
    ]

    let players_tournaments = calculatePlayersTop(name, props.stage, allPlayers, allMatches, teamsTour, tourInfo, allShortMatches, filterTours)

    if (players_tournaments.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <div className={classes.wrapperTourInfo}>
                    <div className={classes.rankoffAndNameEvent}>
                        <div className={classes.logoRankoff}>
                            <img src={`/images/DataInImage/NEW_DESIGN_2025/Logo_And_Name.svg`} alt="/"/>
                            <div className={classes.titleBanner}>ТОП 20 ИГРОКОВ</div>
                            </div>
                        <div className={classes.nameTour}>
                            {/*ЗА ВСЕ МАЖОРЫ С 2022 ПО 2024*/}
                            {players_tournaments[0].name_tour.toUpperCase()} {stage ? "[" + stage.toUpperCase() + "]" : ""}
                        </div>
                    </div>
                    <div className={classes.logoTour}>
                        {filterTours.length > 0 ? "" :
                            <img src={`/images/LogoAndBannerTour/${players_tournaments[0].logo_tour}`} alt="/"/>}
                    </div>
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
                    {players_tournaments.map((e, index) => {
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
                                                background: e.kd_p < 0.9 ? "var(--red)" : e.kd_p > 1.05 ? "var(--green)" : "var(--yellow)",
                                                color: e.kd_p < 0.9 ? "var(--redDark)" : e.kd_p > 1.05 ? "var(--greenDark)" : "var(--yellowDark)"
                                            }
                                        }>{e.kd_p}
                                        </div>
                                        <div className={classes.dataPlayerKpr} style={
                                            {
                                                background: e.kpr_p < 0.60 ? "var(--red)" : e.kpr_p > 0.65 ? e.kpr_p > 0.70 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: e.kpr_p < 0.60 ? "var(--redDark)" : e.kpr_p > 0.65 ? e.kpr_p > 0.70 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{e.kpr_p}</div>
                                        <div className={classes.dataPlayerDpr} style={
                                            {
                                                background: e.dpr_p < 0.68 ? "var(--green)" : e.dpr_p > 0.7 ? e.dpr_p > 0.8 ? "var(--red)" : "var(--yellow)" : "var(--yellow)",
                                                color: e.dpr_p < 0.68 ? "var(--greenDark)" : e.dpr_p > 0.7 ? e.dpr_p > 0.8 ? "var(--redDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{e.dpr_p}</div>
                                        <div className={classes.dataPlayerK}>{e.k}</div>
                                        <div className={classes.dataPlayerA}>{e.a}</div>
                                        <div className={classes.dataPlayerD}>{e.d}</div>
                                        <div className={classes.dataPlayerImpact} style={
                                            {
                                                background: e.impact_p < 1 ? "var(--red)" : e.impact_p > 1 ? e.impact_p >= 1.10 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: e.impact_p < 1 ? "var(--redDark)" : e.impact_p > 1 ? e.impact_p >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
                                            }
                                        }>{e.impact_p}</div>
                                        <div className={classes.dataPlayerRating} style={
                                            {
                                                background: e.rating < 1 ? "var(--red)" : e.rating > 1 ? e.rating >= 1.10 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                                color: e.rating < 1 ? "var(--redDark)" : e.rating > 1 ? e.rating >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)"
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
                <img src={`/images/DataInImage/NEW_DESIGN_2025/TOP_PLAYERS_BANNER.png`} className={classes.bgImg}
                     alt="/"/>
            </div>
        )
    }


};

export default TopPlayersTourResult;