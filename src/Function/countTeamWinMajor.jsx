import React, {memo} from 'react';
import {useGetAwardsTeamsByNameQuery} from "../store/api/apiSlice";
import classes from "../Pages/TeamsPage/TeamProfile/teamProfile.module.css";

const CountTeamWinMajor = (props) => {

    const name = props.nameTeam
    const id = props.idTeam

    const {data} = useGetAwardsTeamsByNameQuery({id,name})

    if (data) {
        if (data.length > 0) {
            let arr = data.filter(e => e.name_tour_sort.slice(0, 5) === "Major")
            if (arr.length > 0) {
                return (
                    <div className={classes.wrapperCountMajorWinner}>
                        {arr.length} x Major winner
                    </div>
                )
            } else {
                return (
                    <div></div>
                )
            }

        } else {
            return (
                <div></div>
            )
        }
    }

};

export default memo(CountTeamWinMajor);