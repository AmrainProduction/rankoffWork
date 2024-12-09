import React from 'react';
import classes from "../topPlayersTour.module.css";
import {
    useGetMatchesQuery,
    useGetPlayersQuery, useGetShortMatchesByTournamentQuery,
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
    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const tourInfo = useGetTournamentByNameQuery({name})

    let players_tournaments = calculatePlayersTop(name, stage, allPlayers, allMatches, teamsTour, tourInfo, allShortMatches)

    if (players_tournaments.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <div className={classes.wrapperTourInfo}>
                    <div
                        className={classes.nameTour}>{players_tournaments[0].name_tour.toUpperCase()} {stage ? "[" + stage + "]" : ""}</div>
                    <div className={classes.logoTour}>
                        <img src={`/images/LogoAndBannerTour/${players_tournaments[0].logo_tour}`} alt="/"/>
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
                                                background: e.impact_p < 1 ? "#854141" : e.impact_p > 1 ? e.impact_p >= 1.15 ? "#528347" : "#a29747" : "#a29747"
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