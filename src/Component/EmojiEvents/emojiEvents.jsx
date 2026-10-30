import React, { useRef, useCallback, useState } from 'react'
import classes from './emojiEvents.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetMatchesByNameTourQuery, useGetPlayersQuery, useGetTeamsQuery, useGetTournamentsQuery } from '../../store/api/apiSlice'
import EmojiEventsResult from './PictureResult/emojiEventsResult'

const EmojiEvents = () => {
	const data = useGetTournamentsQuery()

	const [choice, setChoice] = useState('')
	const [width, setWidth] = useState('')
	const [bg, setBg] = useState(false)

	const handleInputWidth = (event) => {
		const value = event.target.value
		setWidth(Number(value))
	}

	const handleToggleBg = (event) => {
		setBg(event.target.checked)
	}

	//--------------------------------HTML to IMG def-------------------------------------------------

	const ref = useRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toPng(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${choice.slice(0, -4)}.png`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [choice])

	return (
		<>
			<div className={classes.wrapperMenu}>
				<div className={classes.menu}>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Выбор размера лого:</div>
						<input type="number" onChange={handleInputWidth} />
						<div className={classes.titleBox}>Вкл/Выкл фона:</div>
						<input type="checkbox" checked={bg} onChange={handleToggleBg} />
					</div>
					<div className={classes.wrapperListMatches}>
						<div className={classes.titleBox}>Выбор команды:</div>
						<div className={classes.listMatches}>
							{data.data?.map((e, index) => {
								return (
									<div
										key={index}
										className={classes.match}
										onClick={() => {
											setChoice(e.logo_tour)
										}}>
										{e.name_tour}
									</div>
								)
							})}
						</div>
					</div>
					<div className={classes.btnSaveAsImage} onClick={onButtonClick}>
						Скачать
					</div>
				</div>
			</div>
			<div className={classes.wrapperPicture}>{choice.length > 0 ? <EmojiEventsResult player={choice} test={ref} width={width} bg={bg} /> : ''}</div>
		</>
	)
}

export default EmojiEvents
