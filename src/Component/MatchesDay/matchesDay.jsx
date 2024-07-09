import React, {createRef, useCallback, useEffect, useState} from 'react';
import classes from './matchesDay.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {
    useGetMatchesByNameQuery,
    useGetMatchesQuery,
    useGetShortMatchByNameQuery,
    useGetShortMatchQuery
} from "../../store/api/apiSlice";
import logo from "../../logo.svg";
import OneMatch from "./PictureResult/oneMatch";
import TwoMatches from "./PictureResult/twoMatches";
import ThreeMatches from "./PictureResult/threeMatches";
import FourMatches from "./PictureResult/fourMatches";
import FiveMatches from "./PictureResult/fiveMatches";

const MatchesDay = () => {

    const listMatches = useGetShortMatchQuery()

    const [date, setDate] = useState([])

    const [choiceMatch, setChoiceMatch] = useState([])

    let dates = []
    let matchesData = []
    let matchesID = []

    if (listMatches.data && listMatches.data.length > 0) {
        listMatches.data.map((e) => {
            dates.push(e.date_match)
        })

        dates = dates.filter((item, index) => {
            return dates.indexOf(item) === index
        }).sort().reverse()

        listMatches.data.map((e) => {
            if (e.date_match === date) {
                matchesID.push(e.name_match_for_sort)
                matchesData.push({
                    team1: e.team1,
                    team2: e.team2,
                    logo_t1: e.logo_t1,
                    logo_t2: e.logo_t2,
                    score_t1: e.total_score_match_t1,
                    score_t2: e.total_score_match_t2,
                    match_id: e.name_match_for_sort,
                    format: e.format,
                    date: e.date_match,
                    stage: e.name_stage,
                    time: e.time_match.slice(0,-3),
                })
            }
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
                link.download = `${date}.jpg`
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

                    <div className={classes.listMatches}>
                        {dates.map((e, index) => {
                            return (
                                <div key={index} className={classes.match} onClick={() => {
                                    setDate(e)
                                    setChoiceMatch([])
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

            <div ref={ref}>
                {choiceMatch.length > 0 ? <OneMatch matches={matchesData}/> :
                    matchesData.length === 1 ? <OneMatch matches={matchesData}/> :
                    matchesData.length === 2 ? <TwoMatches matches={matchesData}/> :
                    matchesData.length === 3 ? <ThreeMatches matches={matchesData}/> :
                    matchesData.length === 4 ? <FourMatches matches={matchesData}/> :
                    matchesData.length === 5 ? <FiveMatches matches={matchesData}/> : <OneMatch matches={matchesData}/>
                }
            </div>

        </>
    );
};

export default MatchesDay;


