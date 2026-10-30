import React, {createRef, useCallback, useState} from 'react';
import classes from './resultMatchRGG.module.css'
import {toBlob, toCanvas, toJpeg, toPixelData, toPng, toSvg} from 'html-to-image';

import PictureResultRGG from "./PictureResult/pictureResultRGG";
import {useGetShortMatchQuery} from "../../../store/api/apiSlice";


const ResultMatchRGG = () => {

    const id = 2

    const listMatches = useGetShortMatchQuery()

    let [choiceMatch, setChoiceMatch] = useState([])

    let matchesID = []

    if (listMatches.data && listMatches.data.length > 0) {
        listMatches.data.map((e) => {
            matchesID.push(e.name_match_for_sort)
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
                    <button className={classes.btnSaveAsImage} onClick={onButtonClick}>
                        Save as image
                    </button>
                </div>
            </div>
            <div className={classes.wrapperPicture} ref={ref}>
                {choiceMatch.length > 0 ? <PictureResultRGG name={choiceMatch}/> : ''}
            </div>

        </>
    );
};

export default ResultMatchRGG;