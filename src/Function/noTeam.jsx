import React from 'react';
import {Link} from "react-router-dom";

const NoTeam = (props) => {
    const player = [...props.team]

    if (props.nameTeam === `teamDefaults`) {
        return (
            <span>No team</span>
        );
    } else {
        return (
            <Link to={`/team/${player[0].team_id}/${player[0].team}`}> {player[0].team}</Link>
        );
    }

};

export default NoTeam;