import React from 'react'
import classes from '../emojiEvents.module.css'

const EmojiEventsResult = (props) => {
	const player = props.player
	console.log(player)

	if (player?.length > 0) {
		return (
			<div
				className={classes.wrapperTopResult}
				ref={props.test}
				style={{
					background: props.bg ? 'red' : '',
				}}>
				<img
					src={`/images/LogoAndBannerTour/${player}`}
					alt="/"
					style={{
						width: props.width ? `${props.width}%` : '100%',
					}}
				/>
			</div>
		)
	}
}

export default EmojiEventsResult
