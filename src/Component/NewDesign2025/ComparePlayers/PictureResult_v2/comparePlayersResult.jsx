import React from 'react';
import classes from "../comparePlayers.module.css";
import {
    useGetMatchesQuery
} from "../../../../store/api/apiSlice";
import CalculateStatsPlayerForPeriod from "../../../../Function/calculateStatsPlayerForPeriod";
import WhatBirthdayThen from "../../../../Function/whatBirthdayThen";

const ComparePlayersResult = ({player1, player2, dateEnd1, days1, dateEnd2, days2, dateStart1, dateStart2}) => {

    const allMatches = useGetMatchesQuery()

    const player1Stats = CalculateStatsPlayerForPeriod(player1, dateStart1, dateEnd1, days1, '')
    const player2Stats = CalculateStatsPlayerForPeriod(player2, dateStart2, dateEnd2, days2, '')

    const daysToMonths = (days) => {
        const daysInMonth = 30.44
        return ((days ? days : 90) / daysInMonth).toFixed(0)
    }

    if (player1 && player2 && player1Stats && player1Stats.length > 0 && player2Stats && player2Stats.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <div className={classes.leftPlayer}>
                    <img src={`/images/LogoPlayers/${player1Stats[0].photoPlayer}`} alt="/"/>
                    <div className={classes.shadowToTop}></div>
                    <div className={classes.infoPlayer}>
                        <div className={classes.logoTeams}>
                            <img src={`/images/LogoTeams/${player1Stats[0].logoTeam}`} alt="/"/>
                        </div>
                        <div className={classes.flagAndAge}>
                            <img
                                src={`/images/DataInImage/RANKOFF_AWARDS_2024/RegionsFlags/${player1.country_flag}.svg`}
                                alt="/"/>
                            лет: {WhatBirthdayThen(player1.date_birth, dateEnd1)}
                        </div>
                        <div className={classes.nickname}>{player1.nickname}</div>
                        <div className={classes.name}>{player1.name + " " + player1.surname}</div>
                    </div>
                    <div className={classes.backLogoTeam}>
                        <img src={`/images/LogoTeams/${player1Stats[0].logoTeam}`} alt="/"/>
                    </div>
                </div>
                <div className={classes.statsSection}>
                    <div className={classes.rankoff}>RANKOFF.RU</div>
                    <div className={classes.wrapperStats}>
                        <div className={classes.metric}>
                            <div className={classes.valuePlayer} style={{
                                background: player1Stats[0]?.rating >= player2Stats[0]?.rating ? "linear-gradient(to right, var(--green) 1%, transparent)" : "linear-gradient(to right, var(--red) 1%, transparent)",
                                color: player1Stats[0]?.rating >= player2Stats[0]?.rating ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player1Stats[0]?.rating}</div>
                            <div className={classes.nameMetric}>RATING</div>
                            <div className={classes.valuePlayer} style={{
                                background: player2Stats[0]?.rating >= player1Stats[0]?.rating ? "linear-gradient(to left, var(--green) 1%, transparent)" : "linear-gradient(to left, var(--red) 1%, transparent)",
                                color: player2Stats[0]?.rating >= player1Stats[0]?.rating ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player2Stats[0]?.rating}</div>
                        </div>
                        <div className={classes.metric}>
                            <div className={classes.valuePlayer} style={{
                                background: player1Stats[0]?.impact >= player2Stats[0]?.impact ? "linear-gradient(to right, var(--green) 1%, transparent)" : "linear-gradient(to right, var(--red) 1%, transparent)",
                                color: player1Stats[0]?.impact >= player2Stats[0]?.impact ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player1Stats[0]?.impact}</div>
                            <div className={classes.nameMetric}>IMPACT</div>
                            <div className={classes.valuePlayer} style={{
                                background: player2Stats[0]?.impact >= player1Stats[0]?.impact ? "linear-gradient(to left, var(--green) 1%, transparent)" : "linear-gradient(to left, var(--red) 1%, transparent)",
                                color: player2Stats[0]?.impact >= player1Stats[0]?.impact ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player2Stats[0]?.impact}</div>
                        </div>
                        <div className={classes.metric}>
                            <div className={classes.valuePlayer} style={{
                                background: player1Stats[0]?.kd >= player2Stats[0]?.kd ? "linear-gradient(to right, var(--green) 1%, transparent)" : "linear-gradient(to right, var(--red) 1%, transparent)",
                                color: player1Stats[0]?.kd >= player2Stats[0]?.kd ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player1Stats[0]?.kd}</div>
                            <div className={classes.nameMetric}>KD</div>
                            <div className={classes.valuePlayer} style={{
                                background: player2Stats[0]?.kd >= player1Stats[0]?.kd ? "linear-gradient(to left, var(--green) 1%, transparent)" : "linear-gradient(to left, var(--red) 1%, transparent)",
                                color: player2Stats[0]?.kd >= player1Stats[0]?.kd ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player2Stats[0]?.kd}</div>
                        </div>
                        <div className={classes.metric}>
                            <div className={classes.valuePlayer} style={{
                                background: player1Stats[0]?.kpr >= player2Stats[0]?.kpr ? "linear-gradient(to right, var(--green) 1%, transparent)" : "linear-gradient(to right, var(--red) 1%, transparent)",
                                color: player1Stats[0]?.kpr >= player2Stats[0]?.kpr ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player1Stats[0]?.kpr}</div>
                            <div className={classes.nameMetric}>KPR</div>
                            <div className={classes.valuePlayer} style={{
                                background: player2Stats[0]?.kpr >= player1Stats[0]?.kpr ? "linear-gradient(to left, var(--green) 1%, transparent)" : "linear-gradient(to left, var(--red) 1%, transparent)",
                                color: player2Stats[0]?.kpr >= player1Stats[0]?.kpr ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player2Stats[0]?.kpr}</div>
                        </div>
                        <div className={classes.metric}>
                            <div className={classes.valuePlayer} style={{
                                background: player1Stats[0]?.dpr <= player2Stats[0]?.dpr ? "linear-gradient(to right, var(--green) 1%, transparent)" : "linear-gradient(to right, var(--red) 1%, transparent)",
                                color: player1Stats[0]?.dpr <= player2Stats[0]?.dpr ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player1Stats[0]?.dpr}</div>
                            <div className={classes.nameMetric}>DPR</div>
                            <div className={classes.valuePlayer} style={{
                                background: player2Stats[0]?.dpr <= player1Stats[0]?.dpr ? "linear-gradient(to left, var(--green) 1%, transparent)" : "linear-gradient(to left, var(--red) 1%, transparent)",
                                color: player2Stats[0]?.dpr <= player1Stats[0]?.dpr ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player2Stats[0]?.dpr}</div>
                        </div>
                        <div className={classes.metric}>
                            <div className={classes.valuePlayer} style={{
                                background: (player1Stats[0]?.k - player1Stats[0]?.d) >= (player2Stats[0]?.k - player2Stats[0]?.d) ? "linear-gradient(to right, var(--green) 1%, transparent)" : "linear-gradient(to right, var(--red) 1%, transparent)",
                                color: (player1Stats[0]?.k - player1Stats[0]?.d) >= (player2Stats[0]?.k - player2Stats[0]?.d) ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player1Stats[0]?.k - player1Stats[0]?.d}</div>
                            <div className={classes.nameMetric}>DIFF</div>
                            <div className={classes.valuePlayer} style={{
                                background: (player2Stats[0]?.k - player2Stats[0]?.d) >= (player1Stats[0]?.k - player1Stats[0]?.d) ? "linear-gradient(to left, var(--green) 1%, transparent)" : "linear-gradient(to left, var(--red) 1%, transparent)",
                                color: (player2Stats[0]?.k - player2Stats[0]?.d) >= (player1Stats[0]?.k - player1Stats[0]?.d) ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player2Stats[0]?.k - player2Stats[0]?.d}</div>
                        </div>
                        <div className={classes.metric}>
                            <div className={classes.valuePlayer} style={{
                                background: (player1Stats[0]?.maps >= player2Stats[0]?.maps) ? "linear-gradient(to right, var(--green) 1%, transparent)" : "linear-gradient(to right, var(--red) 1%, transparent)",
                                color: (player1Stats[0]?.maps >= player2Stats[0]?.maps) ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player1Stats[0]?.maps}</div>
                            <div className={classes.nameMetric}>MAPS</div>
                            <div className={classes.valuePlayer} style={{
                                background: (player2Stats[0]?.maps >= player1Stats[0]?.maps) ? "linear-gradient(to left, var(--green) 1%, transparent)" : "linear-gradient(to left, var(--red) 1%, transparent)",
                                color: (player2Stats[0]?.maps >= player1Stats[0]?.maps) ? "var(--greenDark)" : "var(--redDark)",
                            }}>{player2Stats[0]?.maps}</div>
                        </div>
                    </div>
                    {/*<div className={classes.description}>{"ЗИМНИЙ МАЖОР 2024 И ЛЕТНИЙ МАЖОР 2025"}</div>*/}
                    <div className={classes.description}>{(days1 === days2 && (days1 && days2)) ? `Past ${daysToMonths(days1)} months` : ""}</div>
                </div>
                <div className={classes.rightPlayer}>
                    <img src={`/images/LogoPlayers/${player2Stats[0].photoPlayer}`} alt="/"/>
                    <div className={classes.shadowToTop}></div>
                    <div className={classes.infoPlayer}>
                        <div className={classes.logoTeams}>
                            <img src={`/images/LogoTeams/${player2Stats[0].logoTeam}`} alt="/"/>
                        </div>
                        <div className={classes.flagAndAge}>
                            <img
                                src={`/images/DataInImage/RANKOFF_AWARDS_2024/RegionsFlags/${player2.country_flag}.svg`}
                                alt="/"/>
                            лет: {WhatBirthdayThen(player2.date_birth, dateEnd2)}
                        </div>
                        <div className={classes.nickname}>{player2.nickname}</div>
                        <div className={classes.name}>{player2.name + " " + player2.surname}</div>
                    </div>
                    <div className={classes.backLogoTeam}>
                        <img src={`/images/LogoTeams/${player2Stats[0].logoTeam}`} alt="/"/>
                    </div>
                </div>
                <img src={`/images/DataInImage/NEW_DESIGN_2025/COMPARE_PLAYERS.png`} className={classes.bgImg}
                     alt="/"/>
            </div>
        )
    }


};

export default ComparePlayersResult;