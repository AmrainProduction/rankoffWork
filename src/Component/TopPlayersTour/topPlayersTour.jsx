import React, {createRef, useCallback, useState} from 'react';
import classes from './topPlayersTour.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {useGetTournamentsQuery} from "../../store/api/apiSlice";
import PictureResult from "./PictureResult/topPlayersTourResult";
import TopPlayersTourResult from "./PictureResult/topPlayersTourResult";

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
                <button className={classes.btnSaveAsImage} onClick={onButtonClick}>
                    Save as image
                </button>
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
            <div className={classes.wrapperPicture}  ref={ref}>
                {choiceMatch.length > 0 ? <TopPlayersTourResult name={choiceMatch}/> : ''}
            </div>

        </>
    );
};

export default TopPlayersTour;