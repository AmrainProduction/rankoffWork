import React, {createRef, useCallback, useState} from 'react';
import classes from './updateRoster.module.css'
import {toJpeg, toPng} from 'html-to-image';
import logo from "../../../logo.svg";
import UpdateRosterResult from "./PictureResult_v2/updateRosterResult";
import {useGetPlayersQuery, useGetTeamsQuery} from "../../../store/api/apiSlice";
import PlayerSelector from "../../UI/PlayerSelector/playerSelector";
import TeamSelector from "../../UI/TeamSelector/teamSelector";
import toSQLCommandAddMatch from "../../AddMatches/PictureResult/toSQLCommandAddMatch";
import toSQLCommandUpdateShortMatch from "../../AddMatches/PictureResult/toSQLCommandUpdateShortMatch";

const UpdateRoster = () => {

    const listTeams = useGetTeamsQuery()
    const listPlayers = useGetPlayersQuery()

    const [player1, setPlayer1] = useState(null)
    const [player2, setPlayer2] = useState(null)
    const [player3, setPlayer3] = useState(null)
    const [player4, setPlayer4] = useState(null)
    const [player5, setPlayer5] = useState(null)
    const [team, setTeam] = useState(null)

    let query = ""

    const copyToClipboard = () => {
        const textToCopy = query

        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Попытка использовать API Clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                console.log('Copy good');
            }, () => {
                console.log('Fail copy');
            });
        } else {
            // Альтернативный способ для iOS и старых браузеров
            const textArea = document.createElement("textarea");
            textArea.value = textToCopy;
            // Прячем текстовое поле из видимости
            textArea.style.position = "absolute";
            textArea.style.left = "-9999px";
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand("copy"); // Используем устаревший метод
                console.log('Copy good');
            } catch (err) {
                console.log('Fail copy');
            }
            document.body.removeChild(textArea); // Удаляем текстовое поле после копирования
        }
    };

    query = "UPDATE teams SET "
    + "player_1='" + `${player1?.nickname}` + "', "
    + "player_2='" + `${player2?.nickname}` + "', "
    + "player_3='" + `${player3?.nickname}` + "', "
    + "player_4='" + `${player4?.nickname}` + "', "
    + "player_5='" + `${player5?.nickname}` + "', "
    + "player_1_id=" + player1?.player_id + ", "
    + "player_2_id=" + player2?.player_id + ", "
    + "player_3_id=" + player3?.player_id + ", "
    + "player_4_id=" + player4?.player_id + ", "
    + "player_5_id=" + player5?.player_id
    + " WHERE "
    + "team_id=" + team?.team_id + ";"

    let currentTeam = listTeams.data?.find(item => item.team_id === team?.team_id)

    return (
        <div className={classes.wrapperMenu}>
            <div className={classes.menu}>
                <div className={classes.wrapperLogo}>
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <div>
                <div className={classes.addPlayers}>
                    <TeamSelector label={"Team:"} onSelect={setTeam}/>
                    <PlayerSelector label={"Player #1:"} onSelect={setPlayer1} defaultPlayerValue={currentTeam?.player_1_id}/>
                    <PlayerSelector label={"Player #2:"} onSelect={setPlayer2} defaultPlayerValue={currentTeam?.player_2_id}/>
                    <PlayerSelector label={"Player #3:"} onSelect={setPlayer3} defaultPlayerValue={currentTeam?.player_3_id}/>
                    <PlayerSelector label={"Player #4:"} onSelect={setPlayer4} defaultPlayerValue={currentTeam?.player_4_id}/>
                    <PlayerSelector label={"Player #5:"} onSelect={setPlayer5} defaultPlayerValue={currentTeam?.player_5_id}/>
                    <div className={classes.btnSaveAsImage} onClick={copyToClipboard}>
                        Enter
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateRoster;
