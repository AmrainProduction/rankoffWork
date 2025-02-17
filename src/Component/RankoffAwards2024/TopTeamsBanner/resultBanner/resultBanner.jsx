import React from 'react';
import classes from './resultBanner.module.css'


const ResultBanner = (props) => {

    console.log(props.team)

    return (
        <div className={classes.wrapperBanner}>
            <div className={classes.wrapperResultDataBanner}>
                <div className={classes.resultDataBanner}>
                    <div className={classes.titleBanner}>
                        <img src="/images/DataInImage/RANKOFF_AWARDS_2024/TOP_TEAMS_LOGO.svg" alt="/"/>
                    </div>
                    {props.position ? <div className={classes.positionPlayer}>#{props.position}</div> : ""}
                    <div className={classes.mainAchiveInfoTitle}>Общие показатели</div>
                    <div className={classes.mainAchiveInfo}>
                        <div className={classes.wrapperPositions}>
                            <div className={classes.place1}>
                                <div className={classes.groupTop}>
                                    <div className={classes.nameMetric}>Выиграно матчей:</div>
                                </div>
                                <div className={classes.groupBottom}>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                            </div>
                            <div className={classes.place2}>mainAchiveInfo</div>
                            <div className={classes.place3}>mainAchiveInfo</div>
                        </div>
                        <div className={classes.wrapperOtherInfo}>
                            <div className={classes.prizePool}>mainAchiveInfo</div>
                            <div className={classes.points}>mainAchiveInfo</div>
                        </div>
                    </div>
                    <div className={classes.rosterInfo}>
                        <div className={classes.rosterPlayers}>
                            <div className={classes.player1}>
                                <img src={`/images/LogoPlayers/y9do5.png`} alt=""/>
                            </div>
                            <div className={classes.player2}>
                                <img src={`/images/LogoPlayers/y9do5.png`} alt=""/>
                            </div>
                            <div className={classes.player3}>
                                <img src={`/images/LogoPlayers/y9do5.png`} alt=""/>
                            </div>
                            <div className={classes.player4}>
                                <img src={`/images/LogoPlayers/y9do5.png`} alt=""/>
                            </div>
                            <div className={classes.player5}>
                                <img src={`/images/LogoPlayers/y9do5.png`} alt=""/>
                            </div>
                            <div className={classes.logoTeam}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/LogoTeams/Virtus.pro.svg`} alt=""/>
                            </div>
                        </div>
                        <div className={classes.nicknames}>
                            <div className={classes.nickname}>nickname</div>
                            <div className={classes.nickname}>nickname</div>
                            <div className={classes.nickname}>nickname</div>
                            <div className={classes.nickname}>nickname</div>
                            <div className={classes.nickname}>nickname</div>
                        </div>
                    </div>
                    <div className={classes.mapsWR}>
                        <div className={classes.map}>
                            <div className={classes.logoMap}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/Maps/Sandstone.png`} alt=""/>
                            </div>
                            <div className={classes.nameMap}>Sandstone</div>
                            <div className={classes.WR}>WR: 999%</div>
                        </div>
                        <div className={classes.map}>
                            <div className={classes.logoMap}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/Maps/Sandstone.png`} alt=""/>
                            </div>
                            <div className={classes.nameMap}>Sandstone</div>
                            <div className={classes.WR}>WR: 999%</div>
                        </div>
                        <div className={classes.map}>
                            <div className={classes.logoMap}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/Maps/Sandstone.png`} alt=""/>
                            </div>
                            <div className={classes.nameMap}>Sandstone</div>
                            <div className={classes.WR}>WR: 999%</div>
                        </div>
                        <div className={classes.map}>
                            <div className={classes.logoMap}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/Maps/Sandstone.png`} alt=""/>
                            </div>
                            <div className={classes.nameMap}>Sandstone</div>
                            <div className={classes.WR}>WR: 999%</div>
                        </div>
                        <div className={classes.map}>
                            <div className={classes.logoMap}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/Maps/Sandstone.png`} alt=""/>
                            </div>
                            <div className={classes.nameMap}>Sandstone</div>
                            <div className={classes.WR}>WR: 999%</div>
                        </div>
                        <div className={classes.map}>
                            <div className={classes.logoMap}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/Maps/Sandstone.png`} alt=""/>
                            </div>
                            <div className={classes.nameMap}>Sandstone</div>
                            <div className={classes.WR}>WR: 999%</div>
                        </div>
                        <div className={classes.map}>
                            <div className={classes.logoMap}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/Maps/Sandstone.png`} alt=""/>
                            </div>
                            <div className={classes.nameMap}>Sandstone</div>
                            <div className={classes.WR}>WR: 999%</div>
                        </div>
                        <div className={classes.map}>
                            <div className={classes.logoMap}>
                                <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/Maps/Sandstone.png`} alt=""/>
                            </div>
                            <div className={classes.nameMap}>Sandstone</div>
                            <div className={classes.WR}>WR: 999%</div>
                        </div>
                    </div>
                    <div className={classes.matchInfo}>
                        <div className={classes.matchInfoSectionTop}>
                            <div className={classes.matchInfoSectionTopItem}>
                                <div className={classes.groupTop}>
                                    <div className={classes.nameMetric}>Выиграно матчей:</div>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                                <div className={classes.groupBottom}>
                                    <div className={classes.nameMetric}>Выиграно матчей:</div>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                            </div>
                            <div className={classes.matchInfoSectionTopItem}>
                                <div className={classes.groupTop}>
                                    <div className={classes.nameMetric}>Выиграно матчей:</div>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                                <div className={classes.groupBottom}>
                                    <div className={classes.nameMetric}>Выиграно матчей:</div>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                            </div>
                            <div className={classes.matchInfoSectionTopItem}>
                                <div className={classes.groupTop}>
                                    <div className={classes.nameMetric}>Выиграно матчей:</div>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                                <div className={classes.groupBottom}>
                                    <div className={classes.nameMetric}>Выиграно матчей:</div>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.matchInfoSectionBottom}>
                            <div className={classes.matchInfoSectionItem}>
                                <div className={classes.nameMetric}>Выиграно матчей:</div>
                                <div className={classes.valueMetric}>999</div>
                            </div>
                            <div className={classes.matchInfoSectionItem}>
                                <div className={classes.nameMetric}>Проиграно матчей:</div>
                                <div className={classes.valueMetric}>999</div>
                            </div>
                            <div className={classes.matchInfoSectionItem}>
                                <div className={classes.nameMetric}>Выиграно карт:</div>
                                <div className={classes.valueMetric}>999</div>
                            </div>
                            <div className={classes.matchInfoSectionItem}>
                                <div className={classes.nameMetric}>Проиграно карт:</div>
                                <div className={classes.valueMetric}>999</div>
                            </div>
                            <div className={classes.matchInfoSectionItem}>
                                <div className={classes.nameMetric}>Выиграно раундов:</div>
                                <div className={classes.valueMetric}>999</div>
                            </div>
                            <div className={classes.matchInfoSectionItem}>
                                <div className={classes.nameMetric}>Проиграно раундов:</div>
                                <div className={classes.valueMetric}>999</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.eventsPlayedTitle}>Сыгранные турниры</div>
                    <div className={classes.eventsPlayed}>
                        <div className={classes.eventItem}>
                            <img
                                src={`/images/DataInImage/RANKOFF_AWARDS_2024/LogoAndBannerTour/WinlineEpicStandoff2Season14_11_12_24.png`}
                                alt="/"/>
                        </div>
                        <div className={classes.eventItem}>eventItem</div>
                        <div className={classes.eventItem}>eventItem</div>
                        <div className={classes.eventItem}>eventItem</div>
                    </div>
                    <div className={classes.rosterStatsTitle}>Средняя статистика ростера</div>
                    <div className={classes.rosterStats}>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>Rating:</div>
                            <div className={classes.valueMetric}>9.99</div>
                        </div>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>Impact:</div>
                            <div className={classes.valueMetric}>9.99</div>
                        </div>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>KD:</div>
                            <div className={classes.valueMetric}>9.99</div>
                        </div>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>KPR:</div>
                            <div className={classes.valueMetric}>9.99</div>
                        </div>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>DPR:</div>
                            <div className={classes.valueMetric}>9.99</div>
                        </div>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>DIFF:</div>
                            <div className={classes.valueMetric}>-999</div>
                        </div>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>K:</div>
                            <div className={classes.valueMetric}>9.99</div>
                        </div>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>A:</div>
                            <div className={classes.valueMetric}>9.99</div>
                        </div>
                        <div className={classes.statsItem}>
                            <div className={classes.nameMetric}>D:</div>
                            <div className={classes.valueMetric}>9.99</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className={classes.shadowToTop}></div>*/}
            <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/BG_TeamAwards_test.png`} alt="/"/>
        </div>
    )
};

export default ResultBanner;