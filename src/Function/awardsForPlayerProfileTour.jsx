import React from 'react';
import classes from '../Pages/PlayersPage/PlayerProfile/PlayedToursPlayer/playedToursPlayer.module.css'
import {useGetAwardsPlayersByNickQuery} from "../store/api/apiSlice";

const AwardsForPlayerProfileTour = (props) => {

    const nickname = props.nickname;
    const tour = props.tour;
    const id = props.id;

    const {data} = useGetAwardsPlayersByNickQuery({id, nickname})

    if (data && data.length > 0) {
        return (
            data.map((e, index) => {
                if (e.name_player === nickname && e.name_tour_sort === tour && e.player_id === +id) {
                    return (
                        <img key={index} src={`/images/Awards/${e.logo_award}`} alt={`${e.award_description}`}
                             title={`${e.award_description}`} className={classes.awardPlayer}/>
                    )
                }
            })
        )
    }

};

export default AwardsForPlayerProfileTour;