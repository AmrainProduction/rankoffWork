import React, {useEffect} from 'react';
import classes from "./sideTop.module.css";
import {
    useGetMatchesByNameTourQuery,
    useGetMatchesQuery,
    useGetPlayersQuery, useGetShortMatchesByTournamentQuery, useGetShortMatchQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery
} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";
import {calculatePlayersTop} from "../../../Function/calculatePlayersTop";
import {calculatePlayersTopV2} from "../../../Function/calculatePlayersTopV2";

const LeftTopResult = (props) => {

    const name = props.name

    const allPlayers = useGetPlayersQuery()
    const allMatches = useGetMatchesQuery()
    const allShortMatches = useGetShortMatchesByTournamentQuery({name})
    const teamsTour = useGetTeamsTournamentsByNameQuery({name})
    const tourInfo = useGetTournamentByNameQuery({name})

    let filterTours = [
        // "WinlineEpicStandoff2Major2_25_11_24",
        "WinlineEPICStandoff2CosmoCancriE_09_04_25",
    ]

    let players_tournaments = calculatePlayersTopV2(name, props.stage, allPlayers, allMatches, teamsTour, tourInfo, allShortMatches, filterTours)

    const playersWithIndex = players_tournaments?.map((item, index) => ({
        ...item,
        position: index + 1
    }))

    useEffect(() => {
            props.setLeftTop(playersWithIndex)
    }, [props.name]);

    if (playersWithIndex.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <div className={classes.wrapperTourInfo}>
                    <div className={classes.nameTour}>{"ТОП-20 ИГРОКОВ ЗИМНЕГО МАЖОРА 2024"}</div>
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
                            <div className={classes.dataPlayerImpact}>Impact</div>
                            <div className={classes.dataPlayerRating}>Rating</div>
                            <div className={classes.dataPlayerMaps}>Maps</div>
                        </div>
                    </div>
                    {playersWithIndex.map((e, index) => {
                        if (index < 20) {
                            return (
                                <div key={index} className={classes.wrapperPlayer}>
                                    <div className={classes.player}>
                                        <div className={classes.dataNumberPlayerTitle}>{e.position}</div>
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
                                        <div className={classes.dataPlayerMaps}>{e.maps}</div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
};

export default LeftTopResult;