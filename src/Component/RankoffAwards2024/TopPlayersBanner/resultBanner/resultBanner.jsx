import React from 'react';
import classes from './resultBanner.module.css'

const ResultBanner = (props) => {
    return (
        <div className={classes.wrapperBanner}>
            <div className={classes.resultDataBanner}>
                <div className={classes.titleSection}>
                    <div className={classes.titleBanner}>
                        <img src="/images/DataInImage/RANKOFF_AWARDS_2024/TOP_PLAYERS_LOGO.svg" alt="/"/>
                    </div>
                    <div className={classes.positionPlayer}>#20</div>
                </div>
                <div className={classes.mainSection}>
                    <div className={classes.statsBlock}>
                        <div className={classes.personalStatsTitle}>Персональная статистика</div>
                        <div className={classes.personalStats}>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>Rating</div>
                                <div className={classes.valueMetric}>1.99</div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>Impact</div>
                                <div className={classes.valueMetric}>1.99</div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>K</div>
                                <div className={classes.valueMetric}>-200</div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>KPR</div>
                                <div className={classes.valueMetric}>1.99</div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>DPR</div>
                                <div className={classes.valueMetric}>1.99</div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>A</div>
                                <div className={classes.valueMetric}>-200</div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>KD</div>
                                <div className={classes.valueMetric}>1.99</div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>DIFF</div>
                                <div className={classes.valueMetric}>-200</div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.nameMetric}>D</div>
                                <div className={classes.valueMetric}>-200</div>
                            </div>
                        </div>
                        <div className={classes.generalMetricsTitle}>Общие показатели</div>
                        <div className={classes.generalMetrics}>
                            <div className={classes.item}>
                                <div className={classes.doubleMetric}>
                                    <div className={classes.nameMetric}>Сыграно матчей:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                                <div className={classes.doubleMetric}>
                                    <div className={classes.nameMetric}>Разница матчей:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.doubleMetric}>
                                    <div className={classes.nameMetric}>Сыграно карт:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                                <div className={classes.doubleMetric}>
                                    <div className={classes.nameMetric}>Разница карт:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.doubleMetric}>
                                    <div className={classes.nameMetric}>Сыграно раундов:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                                <div className={classes.doubleMetric}>
                                    <div className={classes.nameMetric}>Разница раундов:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.generalMetricsNext}>
                            <div className={classes.item}>
                                <div className={classes.verticalMetric}>
                                    <div className={classes.nameMetric}>Выиграно матчей:</div>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.verticalMetric}>
                                    <div className={classes.nameMetric}>Проиграно матчей:</div>
                                    <div className={classes.valueMetric}>999</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.verticalMetric}>
                                    <div className={classes.nameMetric}>Выиграно карт:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.verticalMetric}>
                                    <div className={classes.nameMetric}>Проиграно карт:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.verticalMetric}>
                                    <div className={classes.nameMetric}>Выиграно раундов:</div>
                                    <div className={classes.valueMetric}>-999</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.verticalMetric}>
                                    <div className={classes.nameMetric}>Проиграно раундов:</div>
                                    <div className={classes.valueMetric}>-999</div>
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
                                    <div className={classes.valueMetric}>9</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.bottomVerticalMetric}>
                                    <div className={classes.nameMetric}>Процент побед в групповой стадии:</div>
                                    <div className={classes.valueMetric}>99%</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.bottomVerticalMetric}>
                                    <div className={classes.nameMetric}>Процент побед в плей-офф стадии:</div>
                                    <div className={classes.valueMetric}>99%</div>
                                </div>
                            </div>
                            <div className={classes.item}>
                                <div className={classes.bottomVerticalMetric}>
                                    <div className={classes.nameMetric}>Процент побед в финалах:</div>
                                    <div className={classes.valueMetric}>99%</div>
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
                                    <div className={classes.valueMetric}>9</div>
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
                                    <div className={classes.valueMetric}>9</div>
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
                                    <div className={classes.valueMetric}>9</div>
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
                                    <div className={classes.valueMetric}>9</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.listEvent}>
                        <div className={classes.event}>
                            <img src={`/images/LogoAndBannerTour/WinlineEpicStandoff2Season12_04_09_24.png`} alt="/"/>
                        </div>
                        <div className={classes.event}>
                            <img src={`/images/LogoAndBannerTour/WinlineEpicStandoff2Season12_04_09_24.png`} alt="/"/>
                        </div>
                        <div className={classes.event}>
                            <img src={`/images/LogoAndBannerTour/WinlineEpicStandoff2Season12_04_09_24.png`} alt="/"/>
                        </div>
                        <div className={classes.event}>
                            <img src={`/images/LogoAndBannerTour/WinlineEpicStandoff2Season12_04_09_24.png`} alt="/"/>
                        </div>
                        <div className={classes.event}>
                            <img src={`/images/LogoAndBannerTour/WinlineEpicStandoff2Season12_04_09_24.png`} alt="/"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.infoPlayer}>
                <div className={classes.logoTeamPlayer}>
                    <img src={`/images/LogoTeams/Virtus.pro.svg`} alt="/"/>
                </div>
                <div className={classes.flagAndAge}>
                    <img src={`/images/RegionsFlags/RU.svg`} alt="/"/>
                    20 лет
                </div>
                <div className={classes.nickname}>schizophrenia</div>
                <div className={classes.name}>Адильльльль Кожамабаевевеве</div>
            </div>
            <div className={classes.logoTeam}>
            <img src={`/images/LogoTeams/Virtus.pro.svg`} alt="/"/>
            </div>
            <div className={classes.photoPlayer}>
                <img src={`/images/LogoPlayers/y9do5.png`} alt="/"/>
            </div>
            <div className={classes.shadowToTop}></div>
            <img src={`/images/DataInImage/RANKOFF_AWARDS_2024/BG.png`} alt="/"/>
        </div>
    );
};

export default ResultBanner;