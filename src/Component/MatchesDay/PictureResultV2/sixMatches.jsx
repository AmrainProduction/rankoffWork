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
                                    <div className={classes.wrapperTeamInfo}>
                                        <div className={classes.backLogoTeam}>
                                            <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                        </div>
                                        <div className={classes.wrapperPlayers}>
                                            <div className={classes.players}>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam1.length > 0 ? e.playersTeam1[0]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player1} alt="/"/>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam1.length > 1 ? e.playersTeam1[1]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player2} alt="/"/>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam1.length > 2 ? e.playersTeam1[2]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player3} alt="/"/>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam1.length > 3 ? e.playersTeam1[3]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player4} alt="/"/>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam1.length > 4 ? e.playersTeam1[4]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player5} alt="/"/>
                                            </div>
                                            <div className={classes.shadowToTop}></div>
                                            <div className={classes.teamInfo}>{e.team1}</div>
                                        </div>
                                    </div>
                                    <div className={classes.VS}>VS</div>
                                    <div className={classes.wrapperTeamInfo}>
                                        <div className={classes.backLogoTeam}>
                                            <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                        </div>
                                        <div className={classes.wrapperPlayers}>
                                            <div className={classes.players}>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam2.length > 0 ? e.playersTeam2[0]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player1} alt="/"/>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam2.length > 1 ? e.playersTeam2[1]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player2} alt="/"/>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam2.length > 2 ? e.playersTeam2[2]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player3} alt="/"/>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam2.length > 3 ? e.playersTeam2[3]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player4} alt="/"/>
                                                <img
                                                    src={`/images/LogoPlayers/${e.playersTeam2.length > 4 ? e.playersTeam2[4]?.playerPhoto : "PlayerDefaultLogo.png"}`}
                                                    className={classes.player5} alt="/"/>
                                            </div>
                                            <div className={classes.shadowToTop}></div>
                                            <div className={classes.teamInfo}>{e.team2}</div>
                                        </div>
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
            <img src={`/images/DataInImage/matches_day_5.png`} alt="/"/>
        </div>
    );
};

export default FiveMatches;