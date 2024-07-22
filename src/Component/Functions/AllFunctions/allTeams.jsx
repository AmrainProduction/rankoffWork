import React from 'react';
import {useGetTeamsQuery} from "../../../store/api/apiSlice";

const AllTeams = () => {

    let arrT = []

    const teams = useGetTeamsQuery()

    teams?.data?.map(e => {
        arrT.push({
            "name": e.name_team,
            "logo": e.logo_team,
            "id": e.team_id,
        })
    })

    console.log(arrT)

    return (
        <div>
            arrT
        </div>
    );
};

export default AllTeams;