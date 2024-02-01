import React from 'react';
import {
    useGetCurrentRankingNecessaryTeamQuery,
    useGetLastTopTeamQuery,
    useGetRankingTeamsQuery
} from "../store/api/apiSlice";

const CurrentRankingTeams = (props) => {

    const lastDateData = useGetRankingTeamsQuery()

    let date
    let team
    let points = 0
    let place = 0

    team = props.team

    if (lastDateData.data && lastDateData.data.length > 0) {
        date = lastDateData?.data[0]?.end_date
    }

    const {data} = useGetCurrentRankingNecessaryTeamQuery({date, team})

    if (data && data.length > 0) {

        if (data[0].points_team) {
            points = data[0].points_team
            place = data[0].position_team
        } else {
            points = 0
        }

        //------------------------FOR CURRENT POINTS TEAM--------------------------------------
        if (props.forTeamDiagram === "false") {
            return (
                <div>
                    Points: {points}
                </div>
            )
        }

        //------------------------FOR DIAGRAM RANKING TEAMS--------------------------------------

        if (props.forTeamDiagram === "true") {
            return (
                place ? " #" + place : "-"
            )
        }
    } else if (props.forTeamDiagram === "true") {
        return " -"
    } else if (props.forTeamDiagram === "false") {
        return (
            <div>
                Points: {0}
            </div>
        )
    }

};

export default CurrentRankingTeams;