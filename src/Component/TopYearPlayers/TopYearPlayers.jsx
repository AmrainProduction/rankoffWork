import React, {createRef, useCallback, useState} from 'react';
import classes from './TopYearPlayers.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {useGetTop20PlayersQuery} from "../../store/api/apiSlice";
import PictureResult2 from "./PictureResult/pictureResult2";

const TopYearPlayers = () => {

    const name = 'RankoffAward2023'

    const listPlayers = useGetTop20PlayersQuery({name})

    let [choiceMatch, setChoiceMatch] = useState([])

    let playersID = []

    if (listPlayers.data && listPlayers.data.length > 0) {
        listPlayers.data.map((e) => {
            playersID.push({
                nickname: e.nickname,
                id: e.player_id,
                place: e.position_team,
                team: e.team,
                logoTeam: e.logo_team
            })
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
                link.download = `${choiceMatch[0].nickname}.jpg`
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
                    {playersID.map((e, index) => {
                        return (
                            <div key={index} className={classes.match} onClick={() => {
                                setChoiceMatch([e])
                            }}>
                                {e.nickname}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={classes.wrapperPicture} ref={ref}>
                {choiceMatch.length > 0 ? <PictureResult2 name={choiceMatch}/> : ''}
            </div>

        </>
    );
};

export default TopYearPlayers;