import React, {createRef, useCallback, useState} from 'react';
import classes from './comparePlayers.module.css'
import {toJpeg, toPng} from 'html-to-image';
import logo from "../../../logo.svg";
import ComparePlayersResult from "./PictureResult_v2/comparePlayersResult";
import {useGetPlayersQuery} from "../../../store/api/apiSlice";
import PlayerSelector from "../../UI/PlayerSelector/playerSelector";

const ComparePlayers = () => {

    const [player1, setPlayer1] = useState(null)
    const [player2, setPlayer2] = useState(null)
    const [dateEnd1, setDateEnd1] = useState("")
    const [days1, setDays1] = useState("")
    const [dateEnd2, setDateEnd2] = useState("")
    const [days2, setDays2] = useState("")

    const handleInputDays1 = (event) => {
        const value = event.target.value
        setDays1(Number(value))
    }

    const handleInputDate1 = (event) => {
        const value = event.target.value
        const isValidDate = !isNaN(Date.parse(value))
        const endDate = isValidDate ? new Date(value).toISOString().split("T")[0] : "";
        setDateEnd1(endDate)
    }
    const handleInputDays2 = (event) => {
        const value = event.target.value
        setDays2(Number(value))
    }

    const handleInputDate2 = (event) => {
        const value = event.target.value
        const isValidDate = !isNaN(Date.parse(value))
        const endDate = isValidDate ? new Date(value).toISOString().split("T")[0] : "";
        setDateEnd2(endDate)
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
                        <div className={classes.titleBox}>Date end (Player 1):</div>
                        <input type="text" placeholder="XXXX-MM-DD" onChange={handleInputDate1}/>
                        <div className={classes.titleBox}>Days interval (Player 1):</div>
                        <input type="number" value={days1} onChange={handleInputDays1}/>
                    </div>
                    <div className={classes.wrapperList}>
                        <div className={classes.titleBox}>Date end (Player 2):</div>
                        <input type="text" placeholder="XXXX-MM-DD" onChange={handleInputDate2}/>
                        <div className={classes.titleBox}>Days interval (Player 2):</div>
                        <input type="number" value={days2} onChange={handleInputDays2}/>
                    </div>
                    <div className={classes.btnSaveAsImage} onClick={onButtonClick}>
                        Download
                    </div>
                </div>
            </div>
            <div ref={ref}>
                <ComparePlayersResult player1={player1} player2={player2} dateEnd1={dateEnd1} days1={days1} dateEnd2={dateEnd2} days2={days2}/>
            </div>
        </>
    );
};

export default ComparePlayers;
