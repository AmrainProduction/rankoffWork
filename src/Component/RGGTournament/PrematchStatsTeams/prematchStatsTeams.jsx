import React, {createRef, useCallback, useEffect, useState} from 'react';
import classes from './prematchStatsTeams.module.css'
import {toBlob, toCanvas, toJpeg, toPixelData, toPng, toSvg} from 'html-to-image';

import PicturePrematch from "./PictureResult/picturePrematch";
import logo from "../../../logo.svg";
import {
    useGetMatchesNecessaryTeamQuery,
    useGetShortMatchQuery, useGetTeamsTournamentsByNameQuery,
    useGetTournamentsQuery
} from "../../../store/api/apiSlice";


const PrematchStatsTeams = () => {

    const listTours = useGetTournamentsQuery()


    let [choiceMatch, setChoiceMatch] = useState([])
    let [choiceTeam1, setChoiceTeam1] = useState([])
    let [choiceTeam2, setChoiceTeam2] = useState([])

    let name = choiceMatch
    const listTeamsTour = useGetTeamsTournamentsByNameQuery({name})

    // const matchesTeam = useGetMatchesNecessaryTeamQuery({id})

    let matchesID = []
    let teamsTour = []

    if (listTours.data && listTours.data.length > 0) {
        listTours.data.map((e) => {
            matchesID.push(e.name_tour_sort)
        })
    }


    if (listTeamsTour.data && listTeamsTour.data.length > 0) {
        listTeamsTour.data.map((e) => {
            teamsTour.push({
                name: e.name_team,
                id: e.team_id,
            })
        })
    }


//--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${choiceMatch}.jpg`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    return (
        <>
            <div className={classes.wrapperMenu}>
                <div className={classes.wrapperLogo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={classes.menu}>
                    <div className={classes.listMatches}>
                        {teamsTour.map((e, index) => {
                            return (
                                <div key={index} className={classes.match} onClick={() => {
                                    setChoiceTeam1(e.id)
                                }}>
                                    {e.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.listMatches}>
                        {teamsTour.map((e, index) => {
                            return (
                                <div key={index} className={classes.match} onClick={() => {
                                    setChoiceTeam2(e.id)
                                }}>
                                    {e.name}
                                </div>
                            )
                        })}
                    </div>
                    <div className={classes.listMatches}>
                        {matchesID.map((e, index) => {
                            return (
                                <div key={index} className={classes.match} onClick={() => {
                                    setChoiceMatch(e)
                                }}>
                                    {e}
                                </div>
                            )
                        })}
                    </div>
                    <button className={classes.btnSaveAsImage} onClick={onButtonClick}>
                        Save as image
                    </button>
                </div>
            </div>
            <div className={classes.wrapperPicture} ref={ref}>
                {choiceMatch.length > 0 ? <PicturePrematch name={choiceMatch} team1={choiceTeam1} team2={choiceTeam2}/> : ''}
            </div>

        </>
    );
};

export default PrematchStatsTeams;