import React from 'react';
import {useGetPlayersQuery} from "../../../store/api/apiSlice";

const AllPlayers = () => {

    let arrP = []

    const {data} = useGetPlayersQuery()

    data?.map(e => {
            arrP.push({
                "logo": e.logo_player,
                "nickname": e.nickname,
                "player_id": e.player_id,
            })

    })

    console.log(arrP)

    return (
        <div>
            arrP
        </div>
    );
};

export default AllPlayers;