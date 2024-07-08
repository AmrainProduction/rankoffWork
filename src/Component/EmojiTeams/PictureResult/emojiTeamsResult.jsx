import React from 'react';
import classes from "../emojiTeams.module.css";

const EmojiTeamsResult = (props) => {

    const team = props.team

    if (team?.length > 0) {
        return (
            <div className={classes.wrapperTopResult} ref={props.test}>
                <img src={`/images/LogoTeams/${team}`} alt="/"/>
            </div>
        )
    }


};

export default EmojiTeamsResult;