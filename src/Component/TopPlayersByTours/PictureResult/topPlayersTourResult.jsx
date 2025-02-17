import React from 'react';
import classes from "../topPlayersByTours.module.css";
import {
    useGetMatchesByNameTourQuery,
    useGetMatchesQuery,
    useGetPlayersQuery, useGetShortMatchesByTournamentQuery, useGetShortMatchQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery
} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";
import {calculatePlayersTop} from "../../../Function/calculatePlayersTop";

const TopPlayersTourResult = (props) => {

    const name = props.name
    const stage = (props.stage === "playoff" ? "PLAYOFF" : props.stage === "group" ? "GROUP STAGE" : "")

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesQuery()
    const allShortMatches = useGetShortMatchesByTournamentQuery({name})
    const allShorts = useGetShortMatchQuery()
    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const tourInfo = useGetTournamentByNameQuery({name})

    let filterTours = [
        // "WinlineEpicStandoff2Season14_11_12_24",
        // "WinlineEpicStandoff2Season13_08_10_24",
        // "WinlineEpicStandoff2Season12_04_09_24",
        // "WinlineEpicStandoff2Season11_01_08_24",
        // "WinlineEpicStandoff2Season10_30_05_24",
        // "WinlineEpicStandoff2Season9_25_04_24",
        // "WinlineEpicStandoff2Season8_28_03_24",
        // "WinlineEpicStandoff2Season7_11_02_24",
        // "ScamOffBeeline_23_08_24",
        // "WinlineEpicStandoff2Major2_25_11_24",
        // "WinlineEpicStandoff2Major_10_07_24",
        // "GamesOfFuture_03_03_24",
        // "VozwoodenRevialCupSeason1_17_01_24",

        "WinlineEpicStandoff2Brazil4_24_09_24",
        "WinlineEpicStandoff2Brazil_20_08_24",
        "WinlineEpicStandoff2Brazil2_14_05_24",
        "WinlineEpicStandoff2Brazil_12_03_24",
        "WinlineEpicStandoff2Major_10_07_24",
        "WinlineEpicStandoff2Major2_25_11_24"
    ]

    let players_tournaments = calculatePlayersTop(name, stage, allPlayers, allMatches, teamsTour, tourInfo, allShortMatches, filterTours, allShorts)

    if (players_tournaments.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <div className={classes.wrapperTourInfo}>
                    <div className={classes.nameTour}>{"ТОП ЗА ТУРНИРЫ С УЧАСТИЕМ БРАЗИЛЬЦЕВ 2024"}</div>
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
                                                background: e.kd_p < 0.9 ? "#854141" : e.kd_p > 1.05 ? "#528347" : "#a29747"
                                            }
                                        }>{e.kd_p}
                                        </div>
                                        <div className={classes.dataPlayerKpr} style={
                                            {
                                                background: e.kpr_p < 0.60 ? "#854141" : e.kpr_p > 0.65 ? e.kpr_p > 0.70 ? "#528347" : "#a29747" : "#a29747"
                                            }
                                        }>{e.kpr_p}</div>
                                        <div className={classes.dataPlayerDpr} style={
                                            {
                                                background: e.dpr_p < 0.68 ? "#528347" : e.dpr_p > 0.7 ? e.dpr_p > 0.8 ? "#854141" : "#a29747" : "#a29747"
                                            }
                                        }>{e.dpr_p}</div>
                                        <div className={classes.dataPlayerK}>{e.k}</div>
                                        <div className={classes.dataPlayerA}>{e.a}</div>
                                        <div className={classes.dataPlayerD}>{e.d}</div>
                                        <div className={classes.dataPlayerImpact} style={
                                            {
                                                background: e.impact_p < 1 ? "#854141" : e.impact_p > 1 ? e.impact_p >= 1.10 ? "#528347" : "#a29747" : "#a29747"
                                            }
                                        }>{e.impact_p}</div>
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