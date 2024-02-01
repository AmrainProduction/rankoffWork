import React, {createRef, useCallback, useState} from 'react';
import classes from './TopYearTeams.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {useGetTeamsQuery, useGetTop20PlayersQuery} from "../../store/api/apiSlice";
import PictureResult2 from "./PictureResult/pictureResult2";

const TopYearTeams = () => {

    const listTeams = useGetTeamsQuery()

    let [choiceMatch, setChoiceMatch] = useState([])

//--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `Pepes7.jpg`
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
                    {listTeams?.data?.map((e, index) => {
                        return (
                            <div key={index} className={classes.match} onClick={() => {
                                setChoiceMatch([e.team_id, e.name_team])
                            }}>
                                {e.name_team}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={classes.wrapperPicture} ref={ref}>
                {choiceMatch.length > 0 ? <PictureResult2 team={choiceMatch}/> : ''}
            </div>

        </>
    );
};

export default TopYearTeams;