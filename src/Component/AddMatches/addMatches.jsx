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

        listMatches.data.map((e) => {
            if (e.date_match === date) {
                matchesID.push(e.name_match_for_sort)
            }
        })
    }

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
                        {/*<button className={classes.btnSaveAsImage} onClick={onButtonClick}>*/}
                        {/*    Save as image*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>

            <div>
                {choiceMatch.length > 0 ? <DataEntryMatch match_id={choiceMatch}/> : "Choice match"}
            </div>
        </>
    );
};

export default AddMatches;


