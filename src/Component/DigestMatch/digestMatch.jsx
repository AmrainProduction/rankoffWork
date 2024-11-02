import React, {createRef, useCallback, useState} from 'react';
import classes from './digestMatch.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {
    useGetMatchesByNameQuery,
    useGetShortMatchesTeamByNameQuery,
    useGetShortMatchQuery
} from "../../store/api/apiSlice";
import PictureResult2 from "./PictureResult/pictureResult2";
import logo from "../../logo.svg";

const DigestMatch = () => {

    const listMatches = useGetShortMatchQuery()

    let [choiceMatch, setChoiceMatch] = useState([])
    let [choiceMap, setChoiceMap] = useState([])

    let name = choiceMatch
    const listMapMatch = useGetMatchesByNameQuery({name})

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
                <div className={classes.wrapperLogo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={classes.menu}>
                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Выбор карты:</div>
                        <div className={classes.listMatches}>
                            {choiceMatch.length > 0 ?
                                <div className={classes.match} style={{background: "#7db489"}} onClick={() => {
                                    setChoiceMap("AllMaps")
                                }}>
                                    All maps
                                </div> : ""}
                            {listMapMatch?.data?.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoiceMap(e.map)
                                    }}>
                                        {e.map}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Выбор матча:</div>
                        <div className={classes.listMatches}>
                            {matchesID.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoiceMatch(e)
                                        setChoiceMap("")
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
                {choiceMatch.length > 0 ? <PictureResult2 name={choiceMatch} map={choiceMap}/> : ''}
            </div>

        </>
    );
};

export default DigestMatch;