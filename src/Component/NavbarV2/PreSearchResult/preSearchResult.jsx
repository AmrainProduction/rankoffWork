import React from 'react';
import classes from './preSearchResult.module.css'
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {findFlagUrlByCountryName} from "country-flags-svg";

const PreSearchResult = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const teams = props.teams
    const players = props.players

    let query = props.query

    const choiceSearch = () => {
        props.setQuery('')
    }

    const nameSurname = (name, surname) => {
        return name?.toLowerCase() + surname?.toLowerCase()
    }

    if (props.len >= 2 && query) {
        return (
            <div className={classes.wrapperPreSearchResult} >
                <div className={classes.titleSearch}>Players:</div>
                {players?.filter(
                    search => search.nickname?.toLowerCase().includes(query?.toLowerCase()) || search.name?.toLowerCase().includes(query?.toLowerCase()) || search.surname?.toLowerCase().includes(query?.toLowerCase()
                    || nameSurname(search.name,search.surname).includes(query?.toLowerCase()) )
                ).map((el, index) => {
                    if (el.nickname !== "nickname" && index <=5) {
                        return (
                            <div key={index} className={classes.wrapperPlayerSearch} onClick={choiceSearch}>
                                <Link to={`/player/${el.player_id}/${el.nickname}`} className={classes.cardPlayer}>
                                    <div className={classes.cardPlayerLogo}>
                                        <img className={classes.logoPlayerImg}
                                             src={`/images/LogoPlayers/${el.logo_player}`}
                                             alt={`${el.nickname}`}/>
                                        <img className={classes.logoTeamImg}
                                             src={`/images/LogoTeams/${el.back_logo_team}`}
                                             alt=''/>
                                    </div>
                                    <div className={classes.cardPlayerTeam}>
                                        Team: {el.team === 'teamDefaults' ? "No team" : el.team}
                                    </div>
                                    <div className={classes.cardPlayerNickname}>
                                        <div className={classes.nick}>{el.name}</div>
                                        <div className={classes.nick}>'{el.nickname}'</div>
                                        <div className={classes.nick}>{el.surname}</div>
                                        <img className={classes.logoPlayerCountry}
                                             src={`${findFlagUrlByCountryName(`${el.country_flag}`)}`}
                                             alt={`${el.country_flag}`} title={`${el.country_flag}`}/>
                                    </div>
                                </Link>
                            </div>
                        )
                    }
                })}
                <div className={classes.titleSearch}>Teams:</div>
                {teams?.filter(
                    search => search.name_team?.toLowerCase().includes(query?.toLowerCase())
                ).map((el, index) => {
                    if (index <= 2) {
                        return (
                            <Link to={`/team/${el.team_id}/${el.name_team}`} key={index} className={classes.wrapperCardTeam} onClick={choiceSearch}>
                                <div className={classes.cardLogoTeam}>
                                    <img className={classes.logoTeam}
                                         src={`/images/LogoTeams/${el.logo_team}`}
                                         alt={`/`}/>
                                </div>
                                <div className={classes.nameTeam}>{el.name_team}</div>
                            </Link>
                        )
                    }
                })}
            </div>
        )
    } else {
        return (
            <></>
        )
    }
};

export default PreSearchResult;