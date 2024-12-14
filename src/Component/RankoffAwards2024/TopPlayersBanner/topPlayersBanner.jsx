import React, {createRef, useCallback, useState} from 'react';
import {
    useGetMatchesByNameQuery,
    useGetPlayerByNickQuery,
    useGetPlayersQuery,
    useGetShortMatchQuery
} from "../../../store/api/apiSlice";
import {toPng} from "html-to-image";
import classes from "../../MatchPicture2/matchPicture2.module.css";
import logo from "../../../logo.svg";
import PictureResult2 from "../../MatchPicture2/PictureResult/pictureResult2";
import ResultBanner from "./resultBanner/resultBanner";

const TopPlayersBanner = () => {
    const listPlayers = useGetPlayersQuery()

    let [choicePlayer, setChoicePlayer] = useState([])

    let nickname = choicePlayer.nickname
    let id = choicePlayer.id
    //
    const player = useGetPlayerByNickQuery({id, nickname})

    let allPlayers = []

    if (listPlayers.data && listPlayers.data.length > 0) {
        listPlayers.data.map(e => {
            allPlayers.push({
                id: e.player_id,
                nickname: e.nickname
            })
        })
    }

//--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${choicePlayer}.jpg`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    // console.log(choicePlayer)

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
                            {allPlayers.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoicePlayer(e)
                                    }}>
                                        {e.nickname}
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
                {player.data?.length > 0 ? <ResultBanner player={player.data}/> : ''}
            </div>
        </>
    );
};

export default TopPlayersBanner;