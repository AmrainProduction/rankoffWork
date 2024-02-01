import React from 'react';
import {useGetPlayersQuery} from "../store/api/apiSlice";

const CurrentTeamPlayer = (props) => {

    const {data} = useGetPlayersQuery()

    return (
        data?.filter(e => e.nickname === props.nickname).map((e, index) => {
            if (props.nickname === e.nickname) {
                return (
                    <img src={`/images/LogoTeams/${e.back_logo_team}`} alt="/"/>
                )
            }
        })
    )
};

export default CurrentTeamPlayer;