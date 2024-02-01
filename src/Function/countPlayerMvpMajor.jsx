import React from 'react';
import {useGetAwardsPlayersByNickQuery} from "../store/api/apiSlice";
import classes from "../Pages/PlayersPage/PlayerProfile/InfoPlayer/infoPlayer.module.css";

const CountPlayerMvpMajor = (props) => {
    const nickname = props.nickname
    const id = props.id

    const {data} = useGetAwardsPlayersByNickQuery({id, nickname})

    if (data) {
        if (data.length > 0) {
            let arr = data.filter(e => e.name_tour_sort.slice(0, 5) === "Major" && e.logo_award.slice(0, 3).toLowerCase() === 'mvp')
            if (arr.length > 0) {
                return (
                    <div className={classes.wrapperCountPlayerMajorMvp}>
                        {arr.length} x Major MVP
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

export default CountPlayerMvpMajor;