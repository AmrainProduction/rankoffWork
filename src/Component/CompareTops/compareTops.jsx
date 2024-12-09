import React, {createRef, useCallback, useState} from 'react';
import classes from './compareTops.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {useGetTournamentsQuery} from "../../store/api/apiSlice";
import PictureResult from "./PictureResult/leftTopResult";
import LeftTopResult from "./PictureResult/leftTopResult";
import logo from "../../logo.svg";
import PictureResult2 from "../MatchPicture2/PictureResult/pictureResult2";
import TopPlayersTourResultML from "../MOBLIVE_TopPlayersTour/PictureResult/topPlayersTourResultML";
import RightTopResult from "./PictureResult/rightTopResult";

const CompareTops = () => {

    const listTours = useGetTournamentsQuery()

    let [choiceMatch, setChoiceMatch] = useState([])
    let [choiceStage, setChoiceStage] = useState([])

    let toursID = []

    if (listTours.data && listTours.data.length > 0) {
        listTours.data.map((e) => {
            toursID.push(e.name_tour_sort)
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
        <div className={classes.container}>
            <div className={classes.wrapperMenu}>
                <div className={classes.wrapperLogo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={classes.menu}>
                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Выбор стадии:</div>
                        <div className={classes.listMatches}>
                            <div className={classes.match} onClick={() => {
                                setChoiceStage("full")
                            }}>
                                Full
                            </div>
                            <div className={classes.match} onClick={() => {
                                setChoiceStage("playoff")
                            }}>
                                Play-off Stage
                            </div>
                            <div className={classes.match} onClick={() => {
                                setChoiceStage("group")
                            }}>
                                Group Stage
                            </div>
                        </div>
                    </div>

                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Выбор турнира:</div>
                        <div className={classes.listMatches}>
                            {toursID.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoiceMatch(e)
                                    }}>
                                        {e}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className={classes.btnSaveAsImage} onClick={onButtonClick}>
                        Скачать
                    </div>
                </div>
            </div>
            <div className={classes.wrapperPicture} ref={ref}>
                <div className={classes.wrapperTops}>
                    <div className={classes.leftTop}>
                        {choiceMatch.length > 0 ? <LeftTopResult stage={choiceStage} name={choiceMatch}/> : ''}
                    </div>
                    <div className={classes.rightTop}>
                        {choiceMatch.length > 0 ? <RightTopResult stage={choiceStage} name={choiceMatch}/> : ''}
                    </div>
                </div>
                <img src={`/images/DataInImage/TOP_PLAYERS_TOUR_V4.png`} className={classes.bgImg} alt="/"/>
            </div>
        </div>
    );
};

export default CompareTops;
