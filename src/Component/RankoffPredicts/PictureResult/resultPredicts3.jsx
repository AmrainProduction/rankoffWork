import React from 'react';
import classes from './ResultPredicts3.module.css'
import {WhoWinPredict} from "../../../Function/whoWinPredict";

const ResultPredicts3 = (props) => {

    let score = props.matches

    return (
        <div className={classes.wrapperTopResult}>
            <div className={classes.wrapperPickTeams}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p1)
                }}>
                    <img src={`/images/LogoTeams/${props.p1.length > 0 ? props.p1 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p2)
                }}>
                    <img src={`/images/LogoTeams/${props.p2.length > 0 ? props.p2 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p3)
                }}>
                    <img src={`/images/LogoTeams/${props.p3.length > 0 ? props.p3 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p4)
                }}>
                    <img src={`/images/LogoTeams/${props.p4.length > 0 ? props.p4 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p5)
                }}>
                    <img src={`/images/LogoTeams/${props.p5.length > 0 ? props.p5 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p6)
                }}>
                    <img src={`/images/LogoTeams/${props.p6.length > 0 ? props.p6 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p7)
                }}>
                    <img src={`/images/LogoTeams/${props.p7.length > 0 ? props.p7 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p8)
                }}>
                    <img src={`/images/LogoTeams/${props.p8.length > 0 ? props.p8 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <div className={classes.wrapperPickTeams2}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p21)
                }}>
                    <img src={`/images/LogoTeams/${props.p21.length > 0 ? props.p21 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p22)
                }}>
                    <img src={`/images/LogoTeams/${props.p22.length > 0 ? props.p22 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p23)
                }}>
                    <img src={`/images/LogoTeams/${props.p23.length > 0 ? props.p23 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p24)
                }}>
                    <img src={`/images/LogoTeams/${props.p24.length > 0 ? props.p24 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p25)
                }}>
                    <img src={`/images/LogoTeams/${props.p25.length > 0 ? props.p25 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p26)
                }}>
                    <img src={`/images/LogoTeams/${props.p26.length > 0 ? props.p26 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p27)
                }}>
                    <img src={`/images/LogoTeams/${props.p27.length > 0 ? props.p27 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p28)
                }}>
                    <img src={`/images/LogoTeams/${props.p28.length > 0 ? props.p28 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <div className={classes.wrapperPickTeams3}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p31)
                }}>
                    <img src={`/images/LogoTeams/${props.p31.length > 0 ? props.p31 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p32)
                }}>
                    <img src={`/images/LogoTeams/${props.p32.length > 0 ? props.p32 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p33)
                }}>
                    <img src={`/images/LogoTeams/${props.p33.length > 0 ? props.p33 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p34)
                }}>
                    <img src={`/images/LogoTeams/${props.p34.length > 0 ? props.p34 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p35)
                }}>
                    <img src={`/images/LogoTeams/${props.p35.length > 0 ? props.p35 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p36)
                }}>
                    <img src={`/images/LogoTeams/${props.p36.length > 0 ? props.p36 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p37)
                }}>
                    <img src={`/images/LogoTeams/${props.p37.length > 0 ? props.p37 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(score, props.p38)
                }}>
                    <img src={`/images/LogoTeams/${props.p38.length > 0 ? props.p38 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <img src={`/images/DataInImage/new_predicts_banner_3.png`} className={classes.bgImg} alt="/"/>
        </div>
    );
};

export default ResultPredicts3;