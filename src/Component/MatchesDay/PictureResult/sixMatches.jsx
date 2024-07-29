import React from 'react';
import classes from "./sixMatches.module.css";

const FiveMatches = (props) => {
    return (
        <div className={classes.wrapperTopResult}>
            <div className={classes.wrapperMatches}>
                <div className={classes.wrapperInfoMatch}>
                    <div className={classes.infoMatches}>
                        {props.matches[0]?.date?.replaceAll("-", ".")}
                    </div>
                </div>
                {props.matches.length > 0 ? props.matches.map((e, index) => {
                    return (
                        <div key={index} className={classes.wrapperMatch}>
                            <div className={classes.match}>
                                <div className={classes.leftHalf}>
                                    <div className={classes.teamLogo}>
                                        <img
                                            src={`/images/LogoTeams/${e.logo_t1}`}
                                            alt="/"/>
                                    </div>
                                    <div className={classes.VS}>VS</div>
                                    <div className={classes.teamLogo}>
                                        <img
                                            src={`/images/LogoTeams/${e.logo_t2}`}
                                            alt="/"/>
                                    </div>
                                </div>
                                <div className={classes.rightHalf}>
                                    <div className={classes.topSection}>
                                        <div className={classes.teamName}>{e.team1}</div>
                                        <div className={classes.VSRight}>VS</div>
                                        <div className={classes.teamName}>{e.team2}</div>
                                    </div>
                                    <div className={classes.bottomSection}>
                                        <div className={classes.time}>{e.time}</div>
                                        <div className={classes.format}>{e.format}</div>
                                        <div className={classes.stage}>{e.stage}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) : ""}
            </div>
            <img src={`/images/DataInImage/matches_day_6.png`} alt="/"/>
        </div>
    );
};

export default FiveMatches;