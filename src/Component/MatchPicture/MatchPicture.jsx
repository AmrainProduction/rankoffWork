import React, { useRef, useCallback, useState } from 'react'
import classes from './matchPicture.module.css'
import { toJpeg, toPng } from 'html-to-image'
import { useGetShortMatchQuery } from '../../store/api/apiSlice'
import PictureResult from './PictureResult/pictureResult'

const MatchPicture = () => {
	const listMatches = useGetShortMatchQuery()

	let [choiceMatch, setChoiceMatch] = useState('')

	let matchesID = []

	if (listMatches.data && listMatches.data.length > 0) {
		listMatches.data.map((e) => {
			matchesID.push(e.name_match_for_sort)
		})
	}

	//--------------------------------HTML to IMG def-------------------------------------------------

	const ref = useRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toJpeg(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${choiceMatch}.jpg`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [choiceMatch])

	return (
		<>
			<div className={classes.wrapperMenu}>
				<button className={classes.btnSaveAsImage} onClick={onButtonClick}>
					Save as image
				</button>
				<div className={classes.listMatches}>
					{matchesID.map((e, index) => {
						return (
							<div
								key={index}
								className={classes.match}
								onClick={() => {
									setChoiceMatch(e)
								}}>
								{e}
							</div>
						)
					})}
				</div>
			</div>
			<div className={classes.wrapperPicture} ref={ref}>
				{choiceMatch.length > 0 ? <PictureResult name={choiceMatch} /> : ''}
			</div>
		</>
	)
}

export default MatchPicture
