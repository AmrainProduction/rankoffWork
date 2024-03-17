import React, {createRef, useCallback, useState} from 'react';
import classes from './emojiTeams.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {useGetMatchesByNameTourQuery, useGetTeamsQuery, useGetTournamentsQuery} from "../../store/api/apiSlice";
import logo from "../../logo.svg";
import EmojiTeamsResult from "./PictureResult/emojiTeamsResult";

const EmojiTeams = () => {

    const teams = useGetTeamsQuery()

    const [choiceTeam, setChoiceTeam] = useState([])

//--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toPng(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${choiceTeam.slice(0,-4)}.png`
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
                            {teams.data?.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoiceTeam(e.logo_team)
                                    }}>
                                        {e.name_team}
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
                {choiceTeam.length > 0 ?
                    <EmojiTeamsResult team={choiceTeam}/> : ""}
            </div>

        </>

    );
};

export default EmojiTeams;


