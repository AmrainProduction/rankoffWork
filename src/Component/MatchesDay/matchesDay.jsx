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
import SixMatches from "./PictureResult/sixMatches";

const MatchesDay = () => {

    const listMatches = useGetShortMatchQuery()

    const [date, setDate] = useState([])
    const [today, setToday] = useState([])

    const [choiceMatch, setChoiceMatch] = useState([])
    const [matches, setMatches] = useState([])

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
                    time: e.time_match.slice(0, -3),
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

    const onButtonTodayClick = () => {
        const date = new Date()

        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        let res = `${year}-${month}-${day}`;

        setDate(res)
        setChoiceMatch([])
    }


    useEffect(() => {
        if (choiceMatch.length > 0) {
            setMatches(matchesData.filter(e => e.match_id === choiceMatch))
        } else {
            setMatches(matchesData.reverse())
        }
    }, [choiceMatch])

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
                                    setMatches(e)
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
                    <div className={classes.wrapperButtons}>
                        <button className={classes.btnSaveAsImage} onClick={onButtonTodayClick}>
                            today
                        </button>
                        <button className={classes.btnSaveAsImage} onClick={onButtonClick}>
                            Save as image
                        </button>
                    </div>
                </div>
            </div>

            <div ref={ref}>
                {
                    matches.length === 1 ? <OneMatch matches={matches}/> :
                        matches.length === 2 ? <TwoMatches matches={matches}/> :
                            matches.length === 3 ? <ThreeMatches matches={matches}/> :
                                matches.length === 4 ? <FourMatches matches={matches}/> :
                                    matches.length === 5 ? <FiveMatches matches={matches}/> :
                                        matches.length === 6 ? <SixMatches matches={matches}/> :
                                        ""
                }
            </div>

        </>
    );
};

export default MatchesDay;


