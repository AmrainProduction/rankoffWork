import React, {createRef, useCallback, useState} from 'react';
import classes from './emojiPlayers.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {
    useGetMatchesByNameTourQuery,
    useGetPlayersQuery,
    useGetTeamsQuery,
    useGetTournamentsQuery
} from "../../store/api/apiSlice";
import logo from "../../logo.svg";
import EmojiPlayersResult from "./PictureResult/emojiPlayersResult";

const EmojiPlayers = () => {

    const players = useGetPlayersQuery()

    const [choicePlayer, setChoicePlayer] = useState([])

//--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${choicePlayer.slice(0,-4)}.png`
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
                        <div className={classes.titleBox}>Выбор команды:</div>
                        <div className={classes.listMatches}>
                            {players.data?.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {

                                        setChoicePlayer(e.logo_player)
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
            <div className={classes.wrapperPicture} >
                {choicePlayer.length > 0 ?
                    <EmojiPlayersResult player={choicePlayer} test={ref}/> : ""}
            </div>

        </>

    );
};

export default EmojiPlayers;


