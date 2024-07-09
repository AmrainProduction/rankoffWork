import React from 'react';
import classes from "./twoMatches.module.css";

const TwoMatches = (props) => {
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
            <img src={`/images/DataInImage/matches_day_2.png`} alt="/"/>
        </div>
    );
};

export default TwoMatches;