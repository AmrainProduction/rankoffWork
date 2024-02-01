import React from 'react';
import classes from "../Pages/TeamsPage/TeamProfile/AwardsTeam/awardsTeam.module.css";
import {Link} from "react-router-dom";
import {memo} from "react";

const CheckAwardsTeam = (props) => {

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
                                 alt={`${elem.logo_award}`}/>
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

export default memo(CheckAwardsTeam);
