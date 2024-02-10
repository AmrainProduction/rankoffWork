import React, {createRef, useCallback, useState} from 'react';
import classes from './topPlayersTour.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {useGetTournamentsQuery} from "../../store/api/apiSlice";
import PictureResult from "./PictureResult/topPlayersTourResult";
import TopPlayersTourResult from "./PictureResult/topPlayersTourResult";
import logo from "../../logo.svg";
import PictureResult2 from "../MatchPicture2/PictureResult/pictureResult2";

const TopPlayersTour = () => {

    const listTours = useGetTournamentsQuery()

    let [choiceMatch, setChoiceMatch] = useState([])

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
        <>
            <div className={classes.wrapperMenu}>
                <div className={classes.wrapperLogo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={classes.menu}>
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
            <div className={classes.wrapperPicture}  ref={ref}>
                {choiceMatch.length > 0 ? <TopPlayersTourResult name={choiceMatch}/> : ''}
            </div>
        </>
    );
};

export default TopPlayersTour;
