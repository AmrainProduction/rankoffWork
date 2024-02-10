import React from 'react';
import classes from './ResultPredicts2.module.css'
import {WhoWinPredict} from "../../../Function/whoWinPredict";

const ResultPredicts2 = (props) => {

    let score = props.matches

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

            <div className={classes.wrapperPickTeams2}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[1], props.p21)
                }}>
                    <img src={`/images/LogoTeams/${props.p21.length > 0 ? props.p21 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[1], props.p22)
                }}>
                    <img src={`/images/LogoTeams/${props.p22.length > 0 ? props.p22 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[1], props.p23)
                }}>
                    <img src={`/images/LogoTeams/${props.p23.length > 0 ? props.p23 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[1], props.p24)
                }}>
                    <img src={`/images/LogoTeams/${props.p24.length > 0 ? props.p24 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[1], props.p25)
                }}>
                    <img src={`/images/LogoTeams/${props.p25.length > 0 ? props.p25 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[1], props.p26)
                }}>
                    <img src={`/images/LogoTeams/${props.p26.length > 0 ? props.p26 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[1], props.p27)
                }}>
                    <img src={`/images/LogoTeams/${props.p27.length > 0 ? props.p27 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[1], props.p28)
                }}>
                    <img src={`/images/LogoTeams/${props.p28.length > 0 ? props.p28 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <img src={`/images/DataInImage/new_predicts_banner_2.png`} className={classes.bgImg} alt="/"/>
        </div>
    );
};

export default ResultPredicts2;