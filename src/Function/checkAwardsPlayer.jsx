import React from 'react';
import classes from "../Pages/PlayersPage/PlayerProfile/AwardsPlayer/awardsPlayer.module.css";
import {Link} from "react-router-dom";

const  CheckAwardsPlayer = (props) => {
    if (props.length > 0) {
        return (
            props.array.map((elem, index) => {
                return (
                    <div key={index} className={classes.wrapperAward}
                         title={`${elem.award_description}`} style={
                        {
                            backgroundImage: elem.name_tour_sort.slice(0, 5) === "Major" ? "linear-gradient(to top, #938420FF 3%, transparent 80%)" : ""
                        }
                    }>
                        <Link to={`/events/${elem.name_tour_sort}`}>
                            <img className={classes.medal} src={`/images/Awards/${elem.logo_award}`}
                                 alt={`${elem.award_description}`}/>
                        </Link>
                    </div>
                )
            })
        )
    } else {
        return (
            <strong className={classes.noAwards}>No awards</strong>
        )
    }

};

export default CheckAwardsPlayer;
