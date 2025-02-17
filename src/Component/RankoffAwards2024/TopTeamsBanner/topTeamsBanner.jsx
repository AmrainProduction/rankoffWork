import React, {createRef, useCallback, useState} from 'react';
import {
    useGetAwardsPlayersByNickQuery,
    useGetAwardsQuery, useGetAwardsTeamsByNameQuery,
    useGetMatchesByNameQuery, useGetMatchesQuery, useGetNecessaryTeamQuery,
    useGetPlayerByNickQuery,
    useGetPlayersQuery, useGetPlayersTournamentsByNickQuery,
    useGetShortMatchQuery, useGetTeamsQuery, useGetTeamsTournamentsByNameTeamQuery, useGetTeamsTournamentsQuery
} from "../../../store/api/apiSlice";
import {toPng} from "html-to-image";
import classes from "../../MatchPicture2/matchPicture2.module.css";
import logo from "../../../logo.svg";
import PictureResult2 from "../../MatchPicture2/PictureResult/pictureResult2";
import ResultBanner from "./resultBanner/resultBanner";
import Kpr from "../../Formulas/kpr";
import Dpr from "../../Formulas/dpr";
import Rating from "../../Formulas/rating";

const TopTeamsBanner = () => {
    let [choiceTeam, setChoiceTeam] = useState([])
    let [enterPosition, setEnterPosition] = useState('')

    let id = choiceTeam.id
    let name = choiceTeam.name

    const allTeams = useGetTeamsQuery()
    const allMatches = useGetMatchesQuery()
    const allShortMatches = useGetShortMatchQuery()
    const allAwards = useGetAwardsTeamsByNameQuery({id, name})
    const necessaryTeam = useGetNecessaryTeamQuery({id, name})
    const allEvents = useGetTeamsTournamentsByNameTeamQuery({id, name})
    const allEvents2024 = useGetTeamsTournamentsQuery()

    let allAwardsTeams = []
    let allEventsTeam = []
    let listTeams = []

    allAwardsTeams = allAwards.data?.filter(e => e.end_date_tour.slice(0, 4) === "2024")
    allEventsTeam = allEvents.data?.filter(e => e.end_date_tour.slice(0, 4) === "2024")

    if(allEvents2024.data && allEvents2024.data.length > 0) {
        let events2024 = allEvents2024.data.filter(e => e.end_date_tour.slice(0, 4) === "2024")

        let tempArr = [
            ...new Map(events2024.map(obj => [obj.name_team, obj])).values()
        ]

        tempArr.map(e => {
            listTeams.push({
                id: e.team_id,
                name: e.name_team
            })
        })
    }

    const handleEnterPosition = (event) => {
       const value = event.target.value;

        if (value.length > 3) {
            setEnterPosition(event.target.value.slice(0, 3))
        } else {
            setEnterPosition(event.target.value)
        }
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
                link.download = `${name}.jpg`
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
                        <div className={classes.titleBox}>Позиция в топе:</div>
                        <input type="number" className={classes.inputPosition} autoComplete="off"
                              value={enterPosition} onChange={handleEnterPosition}/>
                    </div>
                    <div className={classes.wrapperListMatches}>
                        <div className={classes.titleBox}>Выбор игрока:</div>
                        <div className={classes.listMatches}>
                            {listTeams.map((e, index) => {
                                return (
                                    <div key={index} className={classes.match} onClick={() => {
                                        setChoiceTeam(e)
                                    }}>
                                        {e.name}
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
            <div ref={ref}>
                {necessaryTeam.data?.length > 0 ? <ResultBanner team={necessaryTeam.data} position={enterPosition} awards={allAwardsTeams} allEvents={allEventsTeam}/> : ''}
            </div>
        </>
    );
};

export default TopTeamsBanner;