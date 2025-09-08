import React, { createRef, useCallback, useState } from 'react'
import classes from './playersTourMVP.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetMatchesByNameTourQuery, useGetTournamentsQuery } from '../../../store/api/apiSlice'
import logo from '../../../logo.svg'
import PlayerMVPResult from './PictureResult/playerMVPResult'

const PlayersTourMVP = () => {
	const listTours = useGetTournamentsQuery()

	const [choiceTour, setChoiceTour] = useState([])
	const [choiceStage, setChoiceStage] = useState([])

	let name = choiceTour

	const tourMatches = useGetMatchesByNameTourQuery({ name })

	let toursID = []
	let players = []

	if (listTours.data && listTours.data.length > 0) {
		listTours.data.map((e) => {
			toursID.push(e.name_tour_sort)
		})
	}

	tourMatches?.data?.map((e) => {
		players.push({
			nickname: e.t1p1,
			player_id: e.t1p1_id,
		})
		players.push({
			nickname: e.t1p2,
			player_id: e.t1p2_id,
		})
		players.push({
			nickname: e.t1p3,
			player_id: e.t1p3_id,
		})
		players.push({
			nickname: e.t1p4,
			player_id: e.t1p4_id,
		})
		players.push({
			nickname: e.t1p5,
			player_id: e.t1p5_id,
		})
		players.push({
			nickname: e.t2p1,
			player_id: e.t2p1_id,
		})
		players.push({
			nickname: e.t2p2,
			player_id: e.t2p2_id,
		})
		players.push({
			nickname: e.t2p3,
			player_id: e.t2p3_id,
		})
		players.push({
			nickname: e.t2p4,
			player_id: e.t2p4_id,
		})
		players.push({
			nickname: e.t2p5,
			player_id: e.t2p5_id,
		})
	})

	players = players.filter((value, index, self) => index === self.findIndex((t) => t.nickname === value.nickname && t.player_id === value.player_id))

	const [choicePlayer, setChoicePlayer] = useState([])
	//--------------------------------HTML to IMG def-------------------------------------------------

	const ref = createRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toJpeg(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${choiceTour}.jpg`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [ref])

	return (
		<>
			<div className={classes.wrapperMenu}>
				<div className={classes.wrapperLogo}>
					<img src={logo} alt="logo" />
				</div>
				<div className={classes.menu}>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Choose stage:</div>
						<div className={classes.listMatches}>
							<div
								className={classes.match}
								onClick={() => {
									setChoiceStage('')
								}}>
								Full
							</div>
							<div
								className={classes.match}
								onClick={() => {
									setChoiceStage('PLAYOFF STAGE')
								}}>
								Play-off Stage
							</div>
							<div
								className={classes.match}
								onClick={() => {
									setChoiceStage('GROUP STAGE')
								}}>
								Group Stage
							</div>
						</div>
					</div>

					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Choose player:</div>
						<div className={classes.listMatches}>
							{players?.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoicePlayer(e)
										}}>
										{e.nickname}
									</div>
								)
							})}
						</div>
					</div>

					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Choose event:</div>
						<div className={classes.listMatches}>
							{toursID.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoiceTour(e)
										}}>
										{e}
									</div>
								)
							})}
						</div>
					</div>

					<div className={classes.btnSaveAsImage} onClick={onButtonClick}>
						Download
					</div>
				</div>
			</div>
			<div className={classes.wrapperPicture} ref={ref}>
				{choiceTour.length > 0 && choicePlayer?.nickname?.length > 0 ? <PlayerMVPResult name={choiceTour} player={choicePlayer} stage={choiceStage} /> : ''}
			</div>
		</>
	)
}

export default PlayersTourMVP
