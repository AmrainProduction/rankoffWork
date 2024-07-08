import React from 'react';
import classes from './ResultPredicts1.module.css'
import {WhoWinPredict} from "../../../Function/whoWinPredict";

const ResultPredicts = (props) => {

    return (
        <div className={classes.wrapperTopResult}>
            <div className={classes.wrapperInfoMatches}>
                <div className={classes.infoMatches}>
                    {props.matches[0].date.replaceAll("-", ".")}
                </div>
            </div>
            <div className={classes.wrapperPredictorsName}>
                <div className={classes.predictorsName}>
                    {props.photos[0]}
                </div>
                <div className={classes.predictorsName}>
                    {props.photos[1]}
                </div>
                <div className={classes.predictorsName}>
                    {props.photos[2]}
                </div>
                <div className={classes.predictorsName}>
                    {props.photos[3]}
                </div>
                <div className={classes.predictorsName}>
                    {props.photos[4]}
                </div>
                <div className={classes.predictorsName}>
                    {props.photos[5]}
                </div>
                <div className={classes.predictorsName}>
                    {props.photos[6]}
                </div>
                <div className={classes.predictorsName}>
                    {props.photos[7]}
                </div>
            </div>
            <div className={classes.wrapperPredictors}>
                <div className={classes.predictorPhoto}>
                    <img src={`/images/Predictors/${props.photos[0] + ".jpg"}`} alt="/"/>
                </div>
                <div className={classes.predictorPhoto}>
                    <img src={`/images/Predictors/${props.photos[1] + ".jpg"}`} alt="/"/>
                </div>
                <div className={classes.predictorPhoto}>
                    <img src={`/images/Predictors/${props.photos[2] + ".jpg"}`} alt="/"/>
                </div>
                <div className={classes.predictorPhoto}>
                    <img src={`/images/Predictors/${props.photos[3] + ".jpg"}`} alt="/"/>
                </div>
                <div className={classes.predictorPhoto}>
                    <img src={`/images/Predictors/${props.photos[4] + ".jpg"}`} alt="/"/>
                </div>
                <div className={classes.predictorPhoto}>
                    <img src={`/images/Predictors/${props.photos[5] + ".jpg"}`} alt="/"/>
                </div>
                <div className={classes.predictorPhoto}>
                    <img src={`/images/Predictors/${props.photos[6] + ".jpg"}`} alt="/"/>
                </div>
                <div className={classes.predictorPhoto}>
                    <img src={`/images/Predictors/${props.photos[7] + ".jpg"}`} alt="/"/>
                </div>
            </div>
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

            <img src={`/images/DataInImage/predicts_banner_2024_1.png`} className={classes.bgImg} alt="/"/>
        </div>
    );
};

export default ResultPredicts;