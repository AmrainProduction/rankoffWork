import React from 'react';
import classes from './ResultPredicts1.module.css'
import {WhoWinPredict} from "../../../Function/whoWinPredict";

const ResultPredicts = (props) => {
    return (
        <div className={classes.wrapperTopResult}>
            <div className={classes.wrapperPickTeams}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[0], props.p1)
                }}>
                    <img src={`/images/LogoTeams/${props.p1.length > 0 ? props.p1 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[0], props.p2)
                }}>
                    <img src={`/images/LogoTeams/${props.p2.length > 0 ? props.p2 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[0], props.p3)
                }}>
                    <img src={`/images/LogoTeams/${props.p3.length > 0 ? props.p3 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[0], props.p4)
                }}>
                    <img src={`/images/LogoTeams/${props.p4.length > 0 ? props.p4 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[0], props.p5)
                }}>
                    <img src={`/images/LogoTeams/${props.p5.length > 0 ? props.p5 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[0], props.p6)
                }}>
                    <img src={`/images/LogoTeams/${props.p6.length > 0 ? props.p6 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[0], props.p7)
                }}>
                    <img src={`/images/LogoTeams/${props.p7.length > 0 ? props.p7 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[0], props.p8)
                }}>
                    <img src={`/images/LogoTeams/${props.p8.length > 0 ? props.p8 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <img src={`/images/DataInImage/new_predicts_banner.png`} className={classes.bgImg} alt="/"/>
        </div>
    );
};

export default ResultPredicts;