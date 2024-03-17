import React from 'react';
import classes from "../emojiTeams.module.css";
import {
    useGetMatchesByNameTourQuery, useGetMatchesNecessaryPlayerQuery,
    useGetMatchesQuery, useGetPlayerByNickQuery,
    useGetPlayersQuery,
    useGetTeamsTournamentsByNameQuery, useGetTournamentByNameQuery
} from "../../../store/api/apiSlice";
import CountryFlagPlayer from "../../../Function/countryFlagPlayer";
import CurrentTeamPlayer from "../../../Function/currentTeamPlayer";

const EmojiTeamsResult = (props) => {

    const team = props.team

    if (team?.length > 0) {
        return (
            <div className={classes.wrapperTopResult}>
                <img src={`/images/LogoTeams/${team}`} alt="/"/>
            </div>
        )
    }


};

export default EmojiTeamsResult;