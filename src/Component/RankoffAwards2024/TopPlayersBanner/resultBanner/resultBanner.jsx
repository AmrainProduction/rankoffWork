import React from 'react';
import classes from './resultBanner.module.css'
import {useGetPlayerByNickQuery} from "../../../../store/api/apiSlice";
import WhatBirthday from "../../../../Function/whatBirthday";

const ResultBanner = (props) => {

    const id = props.player[0].player_id
    const nickname = props.player[0].nickname

    const playerTeam = useGetPlayerByNickQuery({id, nickname})

    const whatCurrentTeam = (playerTeam) => {
        let logo_team
        let team_id
        let team

        if (playerTeam && playerTeam.length > 0) {
            logo_team = playerTeam[0].back_logo_team
            team_id = playerTeam[0].team_id
            team = playerTeam[0].team

            return [logo_team, team_id, team]
        } else {
            return []
        }

    }

    const playerInfo = props.player

    if (playerInfo && playerInfo.length > 0) {

        let teamPlayerInfo = whatCurrentTeam(playerTeam.data)

        playerInfo[0].back_logo_team = teamPlayerInfo[0]
        playerInfo[0].team_id = teamPlayerInfo[1]
        playerInfo[0].team = teamPlayerInfo[2]
// console.log(props.allEvents)
        return (
            <div className={classes.wrapperBanner}>
                <div className={classes.resultDataBanner}>
                    <div className={classes.titleSection}>
                        <div className={classes.titleBanner}>
                            <img src="/images/DataInImage/RANKOFF_AWARDS_2024/TOP_PLAYERS_LOGO.svg" alt="/"/>
                        </div>
                        <div className={classes.positionPlayer}>#{props.position}</div>
                    </div>
                    <div className={classes.mainSection}>
                        <div className={classes.statsBlock}>
                            <div className={classes.personalStatsTitle}>Персональная статистика</div>
                            <div className={classes.personalStats}>
                                <div className={classes.item} style={{
                                    background: playerInfo[0].rating < 1 ? "var(--red)" : playerInfo[0].rating > 1 ? playerInfo[0].rating >= 1.10 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                    color: playerInfo[0].rating < 1 ? "var(--redDark)" : playerInfo[0].rating > 1 ? playerInfo[0].rating >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)",
                                }}>
                                    <div className={classes.nameMetric} style={{
                                        color: playerInfo[0].rating < 1 ? "var(--redDark)" : playerInfo[0].rating > 1 ? playerInfo[0].rating >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)",
                                    }}>Rating
                                    </div>
                                    <div className={classes.valueMetric}>{playerInfo[0].rating}</div>
                                </div>
                                <div className={classes.item} style={
                                    {
                                        background: playerInfo[0].impact < 1 ? "var(--red)" : playerInfo[0].impact > 1 ? playerInfo[0].impact >= 1.10 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                        color: playerInfo[0].impact < 1 ? "var(--redDark)" : playerInfo[0].impact > 1 ? playerInfo[0].impact >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)",
                                    }}>
                                    <div className={classes.nameMetric} style={
                                        {
                                            color: playerInfo[0].impact < 1 ? "var(--redDark)" : playerInfo[0].impact > 1 ? playerInfo[0].impact >= 1.10 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)",
                                        }}>Impact
                                    </div>
                                    <div className={classes.valueMetric}>{playerInfo[0].impact}</div>
                                </div>
                                <div className={classes.item}>
                                    <div className={classes.nameMetric}>K</div>
                                    <div className={classes.valueMetric}>{playerInfo[0].k}</div>
                                </div>
                                <div className={classes.item} style={{
                                    background: playerInfo[0].kpr < 0.60 ? "var(--red)" : playerInfo[0].kpr > 0.65 ? playerInfo[0].kpr > 0.70 ? "var(--green)" : "var(--yellow)" : "var(--yellow)",
                                    color: playerInfo[0].kpr < 0.60 ? "var(--redDark)" : playerInfo[0].kpr > 0.65 ? playerInfo[0].kpr > 0.70 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)",
                                }}>
                                    <div className={classes.nameMetric} style={{
                                        color: playerInfo[0].kpr < 0.60 ? "var(--redDark)" : playerInfo[0].kpr > 0.65 ? playerInfo[0].kpr > 0.70 ? "var(--greenDark)" : "var(--yellowDark)" : "var(--yellowDark)",
                                    }}>KPR
                                    </div>
                                    <div className={classes.valueMetric}>{playerInfo[0].kpr}</div>
                                </div>
                                <div className={classes.item} style={{
                                    background: playerInfo[0].dpr < 0.68 ? "var(--green)" : playerInfo[0].dpr > 0.7 ? playerInfo[0].dpr > 0.8 ? "var(--red)" : "var(--yellow)" : "var(--yellow)",
                                    color: playerInfo[0].dpr < 0.68 ? "var(--greenDark)" : playerInfo[0].dpr > 0.7 ? playerInfo[0].dpr > 0.8 ? "var(--redDark)" : "var(--yellowDark)" : "var(--yellowDark)",
                                }}>
                                    <div className={classes.nameMetric} style={{
                                        color: playerInfo[0].dpr < 0.68 ? "var(--greenDark)" : playerInfo[0].dpr > 0.7 ? playerInfo[0].dpr > 0.8 ? "var(--redDark)" : "var(--yellowDark)" : "var(--yellowDark)",
                                    }}>DPR
                                    </div>
                                    <div className={classes.valueMetric}>{playerInfo[0].dpr}</div>
                                </div>
                                <div className={classes.item}>
                                    <div className={classes.nameMetric}>A</div>
                                    <div className={classes.valueMetric}>{playerInfo[0].a}</div>
                                </div>
                                <div className={classes.item} style={{
                                    background: playerInfo[0].kd < 0.9 ? "var(--red)" : playerInfo[0].kd > 1.05 ? "var(--green)" : "var(--yellow)",
                                    color: playerInfo[0].kd < 0.9 ? "var(--redDark)" : playerInfo[0].kd > 1.05 ? "var(--greenDark)" : "var(--yellowDark)",
                                }}>
                                    <div className={classes.nameMetric} style={{
                                        color: playerInfo[0].kd < 0.9 ? "var(--redDark)" : playerInfo[0].kd > 1.05 ? "var(--greenDark)" : "var(--yellowDark)",
                                    }}>KD
                                    </div>
                                    <div className={classes.valueMetric}>{playerInfo[0].kd}</div>
                                </div>
                                <div className={classes.item} style={{
                                    background: playerInfo[0].k - playerInfo[0].d < 0 ? "var(--red)" : "var(--green)",
                                    color: playerInfo[0].k - playerInfo[0].d < 0 ? "var(--redDark)" : "var(--greenDark)",
                                }}>
                                    <div className={classes.nameMetric} style={{
                                        color: playerInfo[0].k - playerInfo[0].d < 0 ? "var(--redDark)" : "var(--greenDark)",
                                    }}>DIFF
                                    </div>
                                    <div className={classes.valueMetric}>{playerInfo[0].k - playerInfo[0].d}</div>
                                </div>
                                <div className={classes.item}>
                                    <div className={classes.nameMetric}>D</div>
                                    <div className={classes.valueMetric}>{playerInfo[0].d}</div>
                                </div>
                            </div>
                            <div className={classes.generalMetricsTitle}>Общие показатели</div>
                            <div className={classes.generalMetrics}>
                                <div className={classes.item}>
                                    <div className={classes.doubleMetric}>
                                        <div className={classes.nameMetric}>Сыграно матчей:</div>
                                        <div className={classes.valueMetric}>{playerInfo[0].matches}</div>
                                    </div>
                                    <div className={classes.doubleMetric} style={{
                                        color: playerInfo[0].w_match - playerInfo[0].l_match < 0 ? "var(--red)" : "var(--green)",
                                    }}>
                                        <div className={classes.nameMetric}>Разница матчей:</div>
                                        <div
                                            className={classes.valueMetric}>{playerInfo[0].w_match - playerInfo[0].l_match < 0 ? playerInfo[0].w_match - playerInfo[0].l_match : `+${playerInfo[0].w_match - playerInfo[0].l_match}`}</div>
                                    </div>
                                </div>
                                <div className={classes.item}>
                                    <div className={classes.doubleMetric}>
                                        <div className={classes.nameMetric}>Сыграно карт:</div>
                                        <div className={classes.valueMetric}>{playerInfo[0].maps}</div>
                                    </div>
                                    <div className={classes.doubleMetric} style={{
                                        color: playerInfo[0].w_maps - playerInfo[0].l_maps < 0 ? "var(--red)" : "var(--green)",
                                    }}>
                                        <div className={classes.nameMetric}>Разница карт:</div>
                                        <div
                                            className={classes.valueMetric}>{playerInfo[0].w_maps - playerInfo[0].l_maps < 0 ? playerInfo[0].w_maps - playerInfo[0].l_maps : `+${playerInfo[0].w_maps - playerInfo[0].l_maps}`}</div>
                                    </div>
                                </div>
                                <div className={classes.item}>
                                    <div className={classes.doubleMetric}>
                                        <div className={classes.nameMetric}>Сыграно раундов:</div>
                                        <div className={classes.valueMetric}>{playerInfo[0].rounds}</div>
                                    </div>
                                    <div className={classes.doubleMetric} style={{
                                        color: playerInfo[0].w_rounds - playerInfo[0].l_rounds < 0 ? "var(--red)" : "var(--green)",
                                    }}>
                                        <div className={classes.nameMetric}>Разница раундов:</div>
                                        <div
                                            className={classes.valueMetric}>{playerInfo[0].w_rounds - playerInfo[0].l_rounds < 0 ? playerInfo[0].w_rounds - playerInfo[0].l_rounds : `+${playerInfo[0].w_rounds - playerInfo[0].l_rounds}`}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.generalMetricsNext}>
                                <div className={classes.item} style={{
                                    background: "var(--green)",
                                    color: "var(--greenDark)",
                                }}>
                                    <div className={classes.verticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--greenDark)",
                                        }}>Выиграно матчей:
                                        </div>
                                        <div className={classes.valueMetric}>{playerInfo[0].w_match}</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--red)",
                                    color: "var(--redDark)",
                                }}>
                                    <div className={classes.verticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--redDark)",
                                        }}>Проиграно матчей:
                                        </div>
                                        <div className={classes.valueMetric}>{playerInfo[0].l_match}</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--green)",
                                    color: "var(--greenDark)",
                                }}>
                                    <div className={classes.verticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--greenDark)",
                                        }}>Выиграно карт:
                                        </div>
                                        <div className={classes.valueMetric}>{playerInfo[0].w_maps}</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--red)",
                                    color: "var(--redDark)",
                                }}>
                                    <div className={classes.verticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--redDark)",
                                        }}>Проиграно карт:
                                        </div>
                                        <div className={classes.valueMetric}>{playerInfo[0].l_maps}</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--green)",
                                    color: "var(--greenDark)",
                                }}>
                                    <div className={classes.verticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--greenDark)",
                                        }}>Выиграно раундов:
                                        </div>
                                        <div className={classes.valueMetric}>{playerInfo[0].w_rounds}</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--red)",
                                    color: "var(--redDark)",
                                }}>
                                    <div className={classes.verticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--redDark)",
                                        }}>Проиграно раундов:
                                        </div>
                                        <div className={classes.valueMetric}>{playerInfo[0].l_rounds}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.teamAchievementsTitle}>Личные и командные достижения</div>
                            <div className={classes.teamAchievements}>
                                <div className={classes.item} style={{
                                    background: "var(--gold)",
                                    color: "var(--goldDark)",
                                }}>
                                    <div className={classes.leftBottomMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--goldDark)",
                                        }}>Количесвто наград MVP:
                                        </div>
                                        <div className={classes.valueMetric}>{props.MVP?.length}</div>
                                    </div>
                                </div>
                                <div className={classes.item}>
                                    <div className={classes.bottomVerticalMetric}>
                                        <div className={classes.nameMetric}>Процент побед в групповой стадии:</div>
                                        <div className={classes.valueMetric}>{playerInfo[0].wr_group}%</div>
                                    </div>
                                </div>
                                <div className={classes.item}>
                                    <div className={classes.bottomVerticalMetric}>
                                        <div className={classes.nameMetric}>Процент побед в плей-офф стадии:</div>
                                        <div className={classes.valueMetric}>{playerInfo[0].wr_playoff}%</div>
                                    </div>
                                </div>
                                <div className={classes.item}>
                                    <div className={classes.bottomVerticalMetric}>
                                        <div className={classes.nameMetric}>Процент побед в финалах:</div>
                                        <div className={classes.valueMetric}>{playerInfo[0].wr_final}%</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--gray)",
                                    color: "var(--grayDark)",
                                }}>
                                    <div className={classes.leftBottomMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--grayDark)",
                                        }}>Количесвто наград EVP:
                                        </div>
                                        <div className={classes.valueMetric}>{props.EVP?.length}</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--gold)",
                                    color: "var(--goldDark)",
                                }}>
                                    <div className={classes.bottomVerticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--goldDark)",
                                        }}>Количество 1-х мест:
                                        </div>
                                        <div className={classes.valueMetric}>{props.countFirstPlaces[0]}</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--gray)",
                                    color: "var(--grayDark)",
                                }}>
                                    <div className={classes.bottomVerticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--grayDark)",
                                        }}>Количество 2-х мест:
                                        </div>
                                        <div className={classes.valueMetric}>{props.countFirstPlaces[1]}</div>
                                    </div>
                                </div>
                                <div className={classes.item} style={{
                                    background: "var(--bronze)",
                                    color: "var(--bronzeDark)",
                                }}>
                                    <div className={classes.bottomVerticalMetric}>
                                        <div className={classes.nameMetric} style={{
                                            color: "var(--bronzeDark)",
                                        }}>Количество 3-х мест:
                                        </div>
                                        <div className={classes.valueMetric}>{props.countFirstPlaces[2]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.listEvent}>
                            {props.allEvents?.reverse().map(e => {
                                return (
                                    <div className={classes.event}>
                                        <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/LogoAndBannerTour/${e.logo_tour}`}
                                             alt="/"/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className={classes.infoPlayer}>
                    <div className={classes.logoTeamPlayer}>
                        <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/LogoTeams/${playerInfo[0].back_logo_team}`}
                             alt="/"/>
                    </div>
                    <div className={classes.flagAndAge}>
                        <img
                            src={`/images/DataInImage/RANKOFF_AWARDS_2024/RegionsFlags/${playerInfo[0].country_flag}.svg`}
                            alt="/"/>
                        {WhatBirthday(playerInfo[0].date_birth)} лет
                    </div>
                    <div className={classes.nickname}>{playerInfo[0].nickname}</div>
                    <div className={classes.name}>{playerInfo[0].name + " " + playerInfo[0].surname}</div>
                </div>
                <div className={classes.logoTeam}>
                    <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/LogoTeams/${playerInfo[0].back_logo_team}`}
                         alt="/"/>
                </div>
                <div className={classes.photoPlayer}>
                    <img src={`/images/LogoPlayers/${playerInfo[0].logo_player}`} alt="/"/>
                </div>
                <div className={classes.shadowToTop}></div>
                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/BG.png`} alt="/"/>
            </div>
        )
    }
};

export default ResultBanner;