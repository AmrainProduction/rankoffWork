import React, {createRef, useCallback, useEffect, useState} from 'react';
import classes from './addMatches.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {
    useGetMatchesByNameQuery, useGetMatchesByNameTourQuery,
    useGetMatchesQuery,
    useGetShortMatchByNameQuery,
    useGetShortMatchQuery, useGetTournamentsQuery
} from "../../store/api/apiSlice";
import logo from "../../logo.svg";
import DataEntryMatch from "./PictureResult/dataEntryMatch";

const AddMatches = () => {

    const listMatches = useGetShortMatchQuery()
    const listTours = useGetTournamentsQuery()

    const [date, setDate] = useState([])
    const [today, setToday] = useState([])

    const [choiceMatch, setChoiceMatch] = useState([])
    const [matches, setMatches] = useState([])

    const [choiceTour, setChoiceTour] = useState([])

    let dates = []
    let matchesData = []
    let matchesID = []
    let toursID = []

    if (listTours.data && listTours.data.length > 0) {
        listTours.data.map((e) => {
            toursID.push(e.name_tour_sort)
        })
    }

    if (listMatches.data && listMatches.data.length > 0) {
        listMatches.data.map((e) => {
            dates.push(e.date_match)
        })

        dates = dates.filter((item, index) => {
            return dates.indexOf(item) === index
        }).sort().reverse()

        // name_tour_for_sort	name_match_for_sort	name_tour	db_date_match	link_match	map	map_pick	team1	team2	team1_id	team2_id	team1_logo	team2_logo	total_r_team1	total_r_team2	half1_team1	half1_team2	half2_team1	half2_team2	start_side_team1	start_side_team2	t1p1	t1p2	t1p3	t1p4	t1p5	t2p1	t2p2	t2p3	t2p4	t2p5	t1p1_logo	t1p2_logo	t1p3_logo	t1p4_logo	t1p5_logo	t2p1_logo	t2p2_logo	t2p3_logo	t2p4_logo	t2p5_logo	t1p1_id	t1p2_id	t1p3_id	t1p4_id	t1p5_id	t2p1_id	t2p2_id	t2p3_id	t2p4_id	t2p5_id	t1p1_kd	t1p2_kd	t1p3_kd	t1p4_kd	t1p5_kd	t2p1_kd	t2p2_kd	t2p3_kd	t2p4_kd	t2p5_kd	t1p1_k	t1p2_k	t1p3_k	t1p4_k	t1p5_k	t2p1_k	t2p2_k	t2p3_k	t2p4_k	t2p5_k	t1p1_a	t1p2_a	t1p3_a	t1p4_a	t1p5_a	t2p1_a	t2p2_a	t2p3_a	t2p4_a	t2p5_a	t1p1_d	t1p2_d	t1p3_d	t1p4_d	t1p5_d	t2p1_d	t2p2_d	t2p3_d	t2p4_d	t2p5_d	t1p1_impact	t1p2_impact	t1p3_impact	t1p4_impact	t1p5_impact	t2p1_impact	t2p2_impact	t2p3_impact	t2p4_impact	t2p5_impact	t1p1_rating	t1p2_rating	t1p3_rating	t1p4_rating	t1p5_rating	t2p1_rating	t2p2_rating	t2p3_rating	t2p4_rating	t2p5_rating

        listMatches.data.map((e) => {
            if (e.date_match === date) {
                matchesID.push(e.name_match_for_sort)
                // matchesData.push({
                //     team1: e.team1,
                //     team2: e.team2,
                //     logo_t1: e.logo_t1,
                //     logo_t2: e.logo_t2,
                //     score_t1: e.total_score_match_t1,
                //     score_t2: e.total_score_match_t2,
                //     match_id: e.name_match_for_sort,
                //     tour_id: e.name_tour_sort,
                //     format: e.format,
                //     date: e.date_match,
                //     stage: e.name_stage,
                //     time: e.time_match.slice(0, -3),
                // })
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

    return (
        <>
            <div className={classes.wrapperMenu}>
                <div className={classes.wrapperLogo}>
                    <img src={logo} alt="logo"/>
                </div>

                <div className={classes.menu}>

                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Выбор матча:</div>
                        <div className={classes.listMatches}>
                            {matchesID.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoiceTour("")
                                        setChoiceMatch(e)
                                    }}>
                                        {e}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Выбор даты:</div>
                        <div className={classes.listMatches}>
                            {dates.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoiceTour("")
                                        setDate(e)
                                        setChoiceMatch([])
                                    }}>
                                        {e}
                                    </div>
                                )
                            })}
                        </div>
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
                {choiceMatch.length > 0 ? <DataEntryMatch match_id={choiceMatch}/> : "Choice match"}
            </div>
        </>
    );
};

export default AddMatches;


