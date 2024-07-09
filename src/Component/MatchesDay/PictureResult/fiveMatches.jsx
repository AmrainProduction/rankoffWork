import React from 'react';
import classes from "./fiveMatches.module.css";

const FiveMatches = (props) => {
    return (
        <div className={classes.wrapperTopResult}>
            <div className={classes.wrapperInfoMatch}>
                <div className={classes.infoMatches}>
                    {props.matches[0]?.date.replaceAll("-", ".")}
                </div>
            </div>
            <div className={classes.wrapperMatch1}>
                <div className={classes.match}>
                    <div className={classes.leftHalf}>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[0].logo_t1 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                        <div className={classes.VS}>VS</div>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[0].logo_t2 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                    </div>
                    <div className={classes.rightHalf}>
                        <div className={classes.topSection}>
                            <div className={classes.teamName}>{props.matches[0]?.team1}</div>
                            <div className={classes.VSRight}>VS</div>
                            <div className={classes.teamName}>{props.matches[0]?.team2}</div>
                        </div>
                        <div className={classes.bottomSection}>
                            <div className={classes.time}>{props.matches[0]?.time}</div>
                            <div className={classes.format}>{props.matches[0]?.format}</div>
                            <div className={classes.stage}>{props.matches[0]?.stage}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.wrapperMatch2}>
                <div className={classes.match}>
                    <div className={classes.leftHalf}>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[1].logo_t1 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                        <div className={classes.VS}>VS</div>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[1].logo_t2 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                    </div>
                    <div className={classes.rightHalf}>
                        <div className={classes.topSection}>
                            <div className={classes.teamName}>{props.matches[1]?.team1}</div>
                            <div className={classes.VSRight}>VS</div>
                            <div className={classes.teamName}>{props.matches[1]?.team2}</div>
                        </div>
                        <div className={classes.bottomSection}>
                            <div className={classes.time}>{props.matches[1]?.time}</div>
                            <div className={classes.format}>{props.matches[1]?.format}</div>
                            <div className={classes.stage}>{props.matches[1]?.stage}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.wrapperMatch3}>
                <div className={classes.match}>
                    <div className={classes.leftHalf}>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[2].logo_t1 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                        <div className={classes.VS}>VS</div>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[2].logo_t2 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                    </div>
                    <div className={classes.rightHalf}>
                        <div className={classes.topSection}>
                            <div className={classes.teamName}>{props.matches[2]?.team1}</div>
                            <div className={classes.VSRight}>VS</div>
                            <div className={classes.teamName}>{props.matches[2]?.team2}</div>
                        </div>
                        <div className={classes.bottomSection}>
                            <div className={classes.time}>{props.matches[2]?.time}</div>
                            <div className={classes.format}>{props.matches[2]?.format}</div>
                            <div className={classes.stage}>{props.matches[2]?.stage}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.wrapperMatch4}>
                <div className={classes.match}>
                    <div className={classes.leftHalf}>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[3].logo_t1 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                        <div className={classes.VS}>VS</div>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[3].logo_t2 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                    </div>
                    <div className={classes.rightHalf}>
                        <div className={classes.topSection}>
                            <div className={classes.teamName}>{props.matches[3]?.team1}</div>
                            <div className={classes.VSRight}>VS</div>
                            <div className={classes.teamName}>{props.matches[3]?.team2}</div>
                        </div>
                        <div className={classes.bottomSection}>
                            <div className={classes.time}>{props.matches[3]?.time}</div>
                            <div className={classes.format}>{props.matches[3]?.format}</div>
                            <div className={classes.stage}>{props.matches[3]?.stage}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.wrapperMatch5}>
                <div className={classes.match}>
                    <div className={classes.leftHalf}>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[4].logo_t1 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                        <div className={classes.VS}>VS</div>
                        <div className={classes.teamLogo}>
                            <img
                                src={`/images/LogoTeams/${props.matches.length > 0 ? props.matches[4].logo_t2 : "teamDefaults.svg"}`}
                                alt="/"/>
                        </div>
                    </div>
                    <div className={classes.rightHalf}>
                        <div className={classes.topSection}>
                            <div className={classes.teamName}>{props.matches[4]?.team1}</div>
                            <div className={classes.VSRight}>VS</div>
                            <div className={classes.teamName}>{props.matches[4]?.team2}</div>
                        </div>
                        <div className={classes.bottomSection}>
                            <div className={classes.time}>{props.matches[4]?.time}</div>
                            <div className={classes.format}>{props.matches[4]?.format}</div>
                            <div className={classes.stage}>{props.matches[4]?.stage}</div>
                        </div>
                    </div>
                </div>
            </div>
            <img src={`/images/DataInImage/matches_day_5.png`} alt="/"/>
        </div>
    );
};

export default FiveMatches;