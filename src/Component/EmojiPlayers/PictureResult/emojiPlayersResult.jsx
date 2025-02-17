import React from 'react';
import classes from "../emojiPlayers.module.css";

const EmojiPlayersResult = (props) => {

    const player = props.player

    if (player?.length > 0) {
        return (
            <div className={classes.wrapperTopResult} ref={props.test}>
                <div className={classes.playerPhoto}>
                    <img src={`/images/LogoPlayers/${player}`} alt="/"/>
                </div>
            </div>
        )
    }


};

export default EmojiPlayersResult;