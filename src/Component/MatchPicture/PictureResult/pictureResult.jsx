import React from 'react';
import classes from "../matchPicture.module.css";
import {useGetMatchesByNameQuery} from "../../../store/api/apiSlice";

const PictureResult = (props) => {

    const name = props.name

    const necessaryMatch = useGetMatchesByNameQuery({name})

    let matchTeamsInfo = []
    let matchScore = []
    let matchMaps = []

    let scoreT1 = 0
    let scoreT2 = 0


    if (necessaryMatch.data && necessaryMatch.data.length > 0 && name === necessaryMatch.data[0].name_match_for_sort) {

        // команды матча

        necessaryMatch.data.map((e) => {
            matchTeamsInfo[0] = {
                "team1": e.team1,
                "team2": e.team2,
                "team1Logo": e.team1_logo,
                "team2Logo": e.team2_logo,
            }
        })

        // счет матча

        necessaryMatch.data.map((e) => {
            if (e.total_r_team1 > e.total_r_team2) {
                scoreT1++
            }

            if (e.total_r_team1 < e.total_r_team2) {
                scoreT2++
            }

            matchScore[0] = {
                "scoreT1": scoreT1,
                "scoreT2": scoreT2,
            }
        })

        // карты матча

        necessaryMatch.data.map((e) => {
            matchMaps.push({
                "map": e.map + ".jpg",
                "mapPickTeam": e.map_pick,
                "mapPick": (e.team1_logo.indexOf(`${e.map_pick.replace(/\s/g, "")}`) >= 0 ? e.team1_logo : e.team2_logo.indexOf(`${e.map_pick.replace(/\s/g, "")}`) >= 0 ? e.team2_logo : 'Decider'),
                "scoreT1": e.total_r_team1,
                "scoreT2": e.total_r_team2,
            })
        })
    }

    if (matchTeamsInfo && matchTeamsInfo.length > 0 && matchScore && matchScore.length > 0 && matchMaps && matchMaps.length > 0) {
        return (
            <div className={classes.wrapperMatchResult}>
                <div className={classes.wrapperNameTeams}>
                    <div className={classes.NameTeam1}>{matchTeamsInfo[0].team1}</div>
                    <div className={classes.NameTeam2}>{matchTeamsInfo[0].team2}</div>
                </div>

                <div className={classes.wrapperLogoTeams}>
                    <div className={classes.logoTeam1}>
                        <img src={`/images/LogoTeams/${matchTeamsInfo[0].team1Logo}`} alt="/"/>
                    </div>
                    <div className={classes.score}>{matchScore[0].scoreT1}:{matchScore[0].scoreT2}</div>
                    <div className={classes.logoTeam2}>
                        <img src={`/images/LogoTeams/${matchTeamsInfo[0].team2Logo}`} alt="/"/>
                    </div>
                </div>

                <div className={classes.wrapperMaps}>
                    <div className={classes.maps}>
                        {matchMaps.map((e, index) => {
                            return (
                                <div key={index} className={classes.wrapperMap}>
                                    <div className={classes.nameMap}>{e.map.slice(0,-4) === "Zone9" ? "Zone 9" : e.map.slice(0,-4)}</div>
                                    <div className={classes.wrapperLogoMap}>
                                        <img src={`/images/LogoMaps/${e.map}`} className={classes.logoMap} alt="/"/>
                                        <div className={classes.blackBG}></div>
                                        <div className={classes.scoreMap}>{e.scoreT1}:{e.scoreT2}</div>
                                    </div>
                                    <div className={classes.wrapperPickTeam}>
                                        <div className={classes.pickTeam}>{e.mapPickTeam === "Decider" ? <div>Decider</div> : `Picked by ${e.mapPickTeam}`}</div>
                                        <div className={classes.pickLogoTeam}>
                                            {e.mapPick === "Decider" ? <div className={classes.empty}></div> :
                                                <img src={`/images/LogoTeams/${e.mapPick}`} alt="/"/>}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <img src={`/images/DataInImage/matchResult.png`} className={classes.bgImg} alt="/"/>
            </div>
        )
    }

};

export default PictureResult;