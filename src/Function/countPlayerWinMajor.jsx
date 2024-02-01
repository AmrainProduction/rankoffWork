import React from 'react';
import {useGetAwardsPlayersByNickQuery} from "../store/api/apiSlice";
import classes from "../Pages/PlayersPage/PlayerProfile/InfoPlayer/infoPlayer.module.css";

const CountPlayerWinMajor = (props) => {
    const nickname = props.nickname
    const id = props.id

    const {data} = useGetAwardsPlayersByNickQuery({id, nickname})

    if (data) {
        if (data.length > 0) {
            let arr = data.filter(e => e.name_tour_sort.slice(0, 5) === "Major" && e.logo_award.slice(0, 3).toLowerCase() !== 'mvp')
            if (arr.length > 0) {
                return (
                    <div className={classes.wrapperCountPlayerMajorWinner}>
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

export default CountPlayerWinMajor;