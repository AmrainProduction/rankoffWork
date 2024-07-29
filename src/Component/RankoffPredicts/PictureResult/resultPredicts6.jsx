import React from 'react';
import classes from './resultPredicts6.module.css'
import {WhoWinPredict} from "../../../Function/whoWinPredict";

const ResultPredicts5 = (props) => {
    return (
        <className className={classes.wrapperTopResult}>
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
                    background: WhoWinPredict(props.matches[1], props.p27)
                }}>
                    <img src={`/images/LogoTeams/${props.p28.length > 0 ? props.p28 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <div className={classes.wrapperPickTeams3}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[2], props.p31)
                }}>
                    <img src={`/images/LogoTeams/${props.p31.length > 0 ? props.p31 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[2], props.p32)
                }}>
                    <img src={`/images/LogoTeams/${props.p32.length > 0 ? props.p32 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[2], props.p33)
                }}>
                    <img src={`/images/LogoTeams/${props.p33.length > 0 ? props.p33 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[2], props.p34)
                }}>
                    <img src={`/images/LogoTeams/${props.p34.length > 0 ? props.p34 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[2], props.p35)
                }}>
                    <img src={`/images/LogoTeams/${props.p35.length > 0 ? props.p35 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[2], props.p36)
                }}>
                    <img src={`/images/LogoTeams/${props.p36.length > 0 ? props.p36 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[2], props.p37)
                }}>
                    <img src={`/images/LogoTeams/${props.p37.length > 0 ? props.p37 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[2], props.p38)
                }}>
                    <img src={`/images/LogoTeams/${props.p38.length > 0 ? props.p38 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <div className={classes.wrapperPickTeams4}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[3], props.p41)
                }}>
                    <img src={`/images/LogoTeams/${props.p41.length > 0 ? props.p41 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[3], props.p42)
                }}>
                    <img src={`/images/LogoTeams/${props.p42.length > 0 ? props.p42 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[3], props.p43)
                }}>
                    <img src={`/images/LogoTeams/${props.p43.length > 0 ? props.p43 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[3], props.p44)
                }}>
                    <img src={`/images/LogoTeams/${props.p44.length > 0 ? props.p44 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[3], props.p45)
                }}>
                    <img src={`/images/LogoTeams/${props.p45.length > 0 ? props.p45 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[3], props.p46)
                }}>
                    <img src={`/images/LogoTeams/${props.p46.length > 0 ? props.p46 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[3], props.p47)
                }}>
                    <img src={`/images/LogoTeams/${props.p47.length > 0 ? props.p47 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[3], props.p48)
                }}>
                    <img src={`/images/LogoTeams/${props.p48.length > 0 ? props.p48 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <div className={classes.wrapperPickTeams5}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[4], props.p51)
                }}>
                    <img src={`/images/LogoTeams/${props.p51.length > 0 ? props.p51 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[4], props.p52)
                }}>
                    <img src={`/images/LogoTeams/${props.p52.length > 0 ? props.p52 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[4], props.p53)
                }}>
                    <img src={`/images/LogoTeams/${props.p53.length > 0 ? props.p53 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[4], props.p54)
                }}>
                    <img src={`/images/LogoTeams/${props.p54.length > 0 ? props.p54 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[4], props.p55)
                }}>
                    <img src={`/images/LogoTeams/${props.p55.length > 0 ? props.p55 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[4], props.p56)
                }}>
                    <img src={`/images/LogoTeams/${props.p56.length > 0 ? props.p56 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[4], props.p57)
                }}>
                    <img src={`/images/LogoTeams/${props.p57.length > 0 ? props.p57 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[4], props.p58)
                }}>
                    <img src={`/images/LogoTeams/${props.p58.length > 0 ? props.p58 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <div className={classes.wrapperPickTeams6}>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[5], props.p61)
                }}>
                    <img src={`/images/LogoTeams/${props.p61.length > 0 ? props.p61 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[5], props.p62)
                }}>
                    <img src={`/images/LogoTeams/${props.p62.length > 0 ? props.p62 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[5], props.p63)
                }}>
                    <img src={`/images/LogoTeams/${props.p63.length > 0 ? props.p63 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[5], props.p64)
                }}>
                    <img src={`/images/LogoTeams/${props.p64.length > 0 ? props.p64 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[5], props.p65)
                }}>
                    <img src={`/images/LogoTeams/${props.p65.length > 0 ? props.p65 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[5], props.p66)
                }}>
                    <img src={`/images/LogoTeams/${props.p66.length > 0 ? props.p66 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[5], props.p67)
                }}>
                    <img src={`/images/LogoTeams/${props.p67.length > 0 ? props.p67 : "teamDefaults.svg"}`} alt="/"/>
                </div>
                <div className={classes.pickTeamItem} style={{
                    background: WhoWinPredict(props.matches[5], props.p68)
                }}>
                    <img src={`/images/LogoTeams/${props.p68.length > 0 ? props.p68 : "teamDefaults.svg"}`} alt="/"/>
                </div>
            </div>

            <img src={`/images/DataInImage/predicts_banner_2024_6.png`} className={classes.bgImg} alt="/"/>
        </className>
    );
};

export default ResultPredicts5;