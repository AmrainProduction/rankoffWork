import React, {createRef, useCallback, useState} from 'react';
import classes from './comparePlayers.module.css'
import {toJpeg, toPng} from 'html-to-image';
import logo from "../../../logo.svg";
import ComparePlayersResult from "./PictureResult_v2/comparePlayersResult";
import {useGetPlayersQuery} from "../../../store/api/apiSlice";
import PlayerSelector from "./PictureResult_v2/playerSelector";

const ComparePlayers = () => {

    const listPlayers = useGetPlayersQuery()

    const [player1, setPlayer1] = useState(null)
    const [player2, setPlayer2] = useState(null)
    const [dateEnd, setDateEnd] = useState("")
    const [days, setDays] = useState("")

    const handleInputDays = (event) => {
        const value = event.target.value
        setDays(Number(value))
    }

    const handleInputDate = (event) => {
        const value = event.target.value
        setDateEnd(value)
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
                link.download = `${player1.nickname}_VS_${player2.nickname}.jpg`
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
                    <PlayerSelector label={"Player #1:"} onSelect={setPlayer1}/>
                    <PlayerSelector label={"Player #2:"} onSelect={setPlayer2}/>
                    <div className={classes.wrapperList}>
                        <div className={classes.titleBox}>Date end:</div>
                        <input type="text" value={dateEnd} onChange={handleInputDate}/>
                    </div>
                    <div className={classes.wrapperList}>
                        <div className={classes.titleBox}>Days interval:</div>
                        <input type="number" value={days} onChange={handleInputDays}/>
                    </div>
                    <div className={classes.btnSaveAsImage} onClick={onButtonClick}>
                        Download
                    </div>
                </div>
            </div>
            <div ref={ref}>
                <ComparePlayersResult player1={player1} player2={player2} dateEnd={dateEnd} days={days}/>
            </div>
        </>
    );
};

export default ComparePlayers;
