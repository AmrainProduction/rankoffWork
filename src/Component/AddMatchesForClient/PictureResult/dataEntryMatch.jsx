import React, { useRef, useCallback, useState } from 'react'
import classes from './dataEntryMatch.module.css'
import { useCreateAdminMatchMutation, useGetMatchesByNameQuery, useGetPlayersQuery, useGetShortMatchByNameQuery, useGetTeamsQuery, useUpdateAdminMatchMutation } from '../../../store/api/apiSlice'
import { matchApiError, toMatchPayload } from '../matchPayload'
import PictureResult2 from '../../MatchPicture2/PictureResult/pictureResult2'
import { toJpeg } from 'html-to-image'
import Impact from '../../Formulas/impact'
import Rating from '../../Formulas/rating'
import PlayerSelector from '../../UI/PlayerSelector/playerSelector'

// Значение считается заполненным, если оно не пустое и (для чисел) конечное — ловит NaN и Infinity
const isFilled = (value) => {
	if (value === null || value === undefined || value === '') return false
	if (typeof value === 'number' && !Number.isFinite(value)) return false
	return true
}

const DataEntryMatch = (props) => {
	const name = props.match_id

	const players = useGetPlayersQuery()
	const teams = useGetTeamsQuery()
	const shortMatches = useGetShortMatchByNameQuery({ name })
	const currentMatch = useGetMatchesByNameQuery({ name })
	const [createMatch, createState] = useCreateAdminMatchMutation()
	const [updateMatch, updateState] = useUpdateAdminMatchMutation()
	const [savedMessage, setSavedMessage] = useState('')
	const isSaving = createState.isLoading || updateState.isLoading
	const saveError = matchApiError(createState.error || updateState.error)

	const [player11, setPlayer11] = useState(null)
	const [player12, setPlayer12] = useState(null)
	const [player13, setPlayer13] = useState(null)
	const [player14, setPlayer14] = useState(null)
	const [player15, setPlayer15] = useState(null)
	const [player21, setPlayer21] = useState(null)
	const [player22, setPlayer22] = useState(null)
	const [player23, setPlayer23] = useState(null)
	const [player24, setPlayer24] = useState(null)
	const [player25, setPlayer25] = useState(null)

	const ref = useRef(null)

	const onButtonClick = useCallback(() => {
		if (ref.current === null) {
			return
		}

		toJpeg(ref.current, { cacheBust: true })
			.then((dataUrl) => {
				const link = document.createElement('a')
				link.download = `${name}.jpg`
				link.href = dataUrl
				link.click()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [name])

	const [choiceMap, setChoiceMap] = useState('')
	const [selectedSide, setSelectedSide] = useState('')
	const [pickMap, setPickMap] = useState('')

	// Обработчик для изменения значения
	const handlePickMap = (event) => {
		setPickMap(event.target.value)
	}

	// Обработчик для изменения значения
	const handleChangeSide = (event) => {
		setSelectedSide(event.target.value)
	}

	// Обработчик полей ввода инфы о матче
	const [matchInfo, setMatchInfo] = useState({
		half1_team1: '',
		half1_team2: '',
		half2_team1: '',
		half2_team2: '',
		t1p1: '',
		t1p2: '',
		t1p3: '',
		t1p4: '',
		t1p5: '',
		t2p1: '',
		t2p2: '',
		t2p3: '',
		t2p4: '',
		t2p5: '',
		t1p1_k: '',
		t1p2_k: '',
		t1p3_k: '',
		t1p4_k: '',
		t1p5_k: '',
		t2p1_k: '',
		t2p2_k: '',
		t2p3_k: '',
		t2p4_k: '',
		t2p5_k: '',
		t1p1_a: '',
		t1p2_a: '',
		t1p3_a: '',
		t1p4_a: '',
		t1p5_a: '',
		t2p1_a: '',
		t2p2_a: '',
		t2p3_a: '',
		t2p4_a: '',
		t2p5_a: '',
		t1p1_d: '',
		t1p2_d: '',
		t1p3_d: '',
		t1p4_d: '',
		t1p5_d: '',
		t2p1_d: '',
		t2p2_d: '',
		t2p3_d: '',
		t2p4_d: '',
		t2p5_d: '',
	})

	// Универсальный обработчик изменения значений полей инфы о матче
	const handleChangeInfoMatch = (event) => {
		const { name, value } = event.target
		// Функциональное обновление — всегда работаем с актуальным стейтом
		setMatchInfo((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	if (players.data && players.data.length > 0 && teams.data && teams.data.length > 0 && shortMatches.data && shortMatches.data.length > 0) {
		const team1Data = teams.data.find((team) => team.team_id === shortMatches.data[0].team1_id)
		const team2Data = teams.data.find((team) => team.team_id === shortMatches.data[0].team2_id)

		// Ник по умолчанию берём из состава команды, стейт при этом не мутируем
		const findPlayer = (nickname) => players.data.find((player) => player.nickname === nickname)

		const t1p1Data = findPlayer(matchInfo.t1p1 || team1Data?.player_1)
		const t1p2Data = findPlayer(matchInfo.t1p2 || team1Data?.player_2)
		const t1p3Data = findPlayer(matchInfo.t1p3 || team1Data?.player_3)
		const t1p4Data = findPlayer(matchInfo.t1p4 || team1Data?.player_4)
		const t1p5Data = findPlayer(matchInfo.t1p5 || team1Data?.player_5)
		const t2p1Data = findPlayer(matchInfo.t2p1 || team2Data?.player_1)
		const t2p2Data = findPlayer(matchInfo.t2p2 || team2Data?.player_2)
		const t2p3Data = findPlayer(matchInfo.t2p3 || team2Data?.player_3)
		const t2p4Data = findPlayer(matchInfo.t2p4 || team2Data?.player_4)
		const t2p5Data = findPlayer(matchInfo.t2p5 || team2Data?.player_5)

		const allK = +matchInfo.t1p1_k + +matchInfo.t1p2_k + +matchInfo.t1p3_k + +matchInfo.t1p4_k + +matchInfo.t1p5_k + +matchInfo.t2p1_k + +matchInfo.t2p2_k + +matchInfo.t2p3_k + +matchInfo.t2p4_k + +matchInfo.t2p5_k
		const allA = +matchInfo.t1p1_a + +matchInfo.t1p2_a + +matchInfo.t1p3_a + +matchInfo.t1p4_a + +matchInfo.t1p5_a + +matchInfo.t2p1_a + +matchInfo.t2p2_a + +matchInfo.t2p3_a + +matchInfo.t2p4_a + +matchInfo.t2p5_a
		const allRounds = +matchInfo.half1_team1 + (+matchInfo.half2_team1 - +matchInfo.half1_team1) + (+matchInfo.half1_team2 + (+matchInfo.half2_team2 - +matchInfo.half1_team2))

		const resultData = [
			{
				name_tour_for_sort: shortMatches.data[0].name_tour_sort,
				name_match_for_sort: shortMatches.data[0].name_match_for_sort,
				name_tour: shortMatches.data[0].name_tour,
				db_date_match: shortMatches.data[0].date_match,
				link_match: shortMatches.data[0].link_match,
				map: choiceMap,
				map_pick: pickMap,
				team1: shortMatches.data[0].team1,
				team2: shortMatches.data[0].team2,
				team1_id: shortMatches.data[0].team1_id,
				team2_id: shortMatches.data[0].team2_id,
				team1_logo: shortMatches.data[0].logo_t1,
				team2_logo: shortMatches.data[0].logo_t2,
				total_r_team1: +matchInfo.half1_team1 + (+matchInfo.half2_team1 - +matchInfo.half1_team1),
				total_r_team2: +matchInfo.half1_team2 + (+matchInfo.half2_team2 - +matchInfo.half1_team2),
				half1_team1: +matchInfo.half1_team1,
				half1_team2: +matchInfo.half1_team2,
				half2_team1: +matchInfo.half2_team1 - +matchInfo.half1_team1,
				half2_team2: +matchInfo.half2_team2 - +matchInfo.half1_team2,
				start_side_team1: selectedSide,
				start_side_team2: selectedSide === 'CT' ? 'T' : 'CT',
				t1p1: player11?.nickname,
				t1p2: player12?.nickname,
				t1p3: player13?.nickname,
				t1p4: player14?.nickname,
				t1p5: player15?.nickname,
				t2p1: player21?.nickname,
				t2p2: player22?.nickname,
				t2p3: player23?.nickname,
				t2p4: player24?.nickname,
				t2p5: player25?.nickname,
				t1p1_logo: player11?.logo_player,
				t1p2_logo: player12?.logo_player,
				t1p3_logo: player13?.logo_player,
				t1p4_logo: player14?.logo_player,
				t1p5_logo: player15?.logo_player,
				t2p1_logo: player21?.logo_player,
				t2p2_logo: player22?.logo_player,
				t2p3_logo: player23?.logo_player,
				t2p4_logo: player24?.logo_player,
				t2p5_logo: player25?.logo_player,
				t1p1_id: +player11?.player_id,
				t1p2_id: +player12?.player_id,
				t1p3_id: +player13?.player_id,
				t1p4_id: +player14?.player_id,
				t1p5_id: +player15?.player_id,
				t2p1_id: +player21?.player_id,
				t2p2_id: +player22?.player_id,
				t2p3_id: +player23?.player_id,
				t2p4_id: +player24?.player_id,
				t2p5_id: +player25?.player_id,
				t1p1_kd: +(+matchInfo.t1p1_k / +matchInfo.t1p1_d).toFixed(2),
				t1p2_kd: +(+matchInfo.t1p2_k / +matchInfo.t1p2_d).toFixed(2),
				t1p3_kd: +(+matchInfo.t1p3_k / +matchInfo.t1p3_d).toFixed(2),
				t1p4_kd: +(+matchInfo.t1p4_k / +matchInfo.t1p4_d).toFixed(2),
				t1p5_kd: +(+matchInfo.t1p5_k / +matchInfo.t1p5_d).toFixed(2),
				t2p1_kd: +(+matchInfo.t2p1_k / +matchInfo.t2p1_d).toFixed(2),
				t2p2_kd: +(+matchInfo.t2p2_k / +matchInfo.t2p2_d).toFixed(2),
				t2p3_kd: +(+matchInfo.t2p3_k / +matchInfo.t2p3_d).toFixed(2),
				t2p4_kd: +(+matchInfo.t2p4_k / +matchInfo.t2p4_d).toFixed(2),
				t2p5_kd: +(+matchInfo.t2p5_k / +matchInfo.t2p5_d).toFixed(2),
				t1p1_k: +matchInfo.t1p1_k,
				t1p2_k: +matchInfo.t1p2_k,
				t1p3_k: +matchInfo.t1p3_k,
				t1p4_k: +matchInfo.t1p4_k,
				t1p5_k: +matchInfo.t1p5_k,
				t2p1_k: +matchInfo.t2p1_k,
				t2p2_k: +matchInfo.t2p2_k,
				t2p3_k: +matchInfo.t2p3_k,
				t2p4_k: +matchInfo.t2p4_k,
				t2p5_k: +matchInfo.t2p5_k,
				t1p1_a: +matchInfo.t1p1_a,
				t1p2_a: +matchInfo.t1p2_a,
				t1p3_a: +matchInfo.t1p3_a,
				t1p4_a: +matchInfo.t1p4_a,
				t1p5_a: +matchInfo.t1p5_a,
				t2p1_a: +matchInfo.t2p1_a,
				t2p2_a: +matchInfo.t2p2_a,
				t2p3_a: +matchInfo.t2p3_a,
				t2p4_a: +matchInfo.t2p4_a,
				t2p5_a: +matchInfo.t2p5_a,
				t1p1_d: +matchInfo.t1p1_d,
				t1p2_d: +matchInfo.t1p2_d,
				t1p3_d: +matchInfo.t1p3_d,
				t1p4_d: +matchInfo.t1p4_d,
				t1p5_d: +matchInfo.t1p5_d,
				t2p1_d: +matchInfo.t2p1_d,
				t2p2_d: +matchInfo.t2p2_d,
				t2p3_d: +matchInfo.t2p3_d,
				t2p4_d: +matchInfo.t2p4_d,
				t2p5_d: +matchInfo.t2p5_d,
				t1p1_impact: Math.round(Impact(+matchInfo.t1p1_k, +matchInfo.t1p1_a, allK, allA) * 100) / 100,
				t1p2_impact: Math.round(Impact(+matchInfo.t1p2_k, +matchInfo.t1p2_a, allK, allA) * 100) / 100,
				t1p3_impact: Math.round(Impact(+matchInfo.t1p3_k, +matchInfo.t1p3_a, allK, allA) * 100) / 100,
				t1p4_impact: Math.round(Impact(+matchInfo.t1p4_k, +matchInfo.t1p4_a, allK, allA) * 100) / 100,
				t1p5_impact: Math.round(Impact(+matchInfo.t1p5_k, +matchInfo.t1p5_a, allK, allA) * 100) / 100,
				t2p1_impact: Math.round(Impact(+matchInfo.t2p1_k, +matchInfo.t2p1_a, allK, allA) * 100) / 100,
				t2p2_impact: Math.round(Impact(+matchInfo.t2p2_k, +matchInfo.t2p2_a, allK, allA) * 100) / 100,
				t2p3_impact: Math.round(Impact(+matchInfo.t2p3_k, +matchInfo.t2p3_a, allK, allA) * 100) / 100,
				t2p4_impact: Math.round(Impact(+matchInfo.t2p4_k, +matchInfo.t2p4_a, allK, allA) * 100) / 100,
				t2p5_impact: Math.round(Impact(+matchInfo.t2p5_k, +matchInfo.t2p5_a, allK, allA) * 100) / 100,
				t1p1_rating: Rating(+matchInfo.t1p1_k / +matchInfo.t1p1_d, +matchInfo.t1p1_k / allRounds, +matchInfo.t1p1_d / allRounds, Math.round(Impact(+matchInfo.t1p1_k, +matchInfo.t1p1_a, allK, allA) * 100) / 100),
				t1p2_rating: Rating(+matchInfo.t1p2_k / +matchInfo.t1p2_d, +matchInfo.t1p2_k / allRounds, +matchInfo.t1p2_d / allRounds, Math.round(Impact(+matchInfo.t1p2_k, +matchInfo.t1p2_a, allK, allA) * 100) / 100),
				t1p3_rating: Rating(+matchInfo.t1p3_k / +matchInfo.t1p3_d, +matchInfo.t1p3_k / allRounds, +matchInfo.t1p3_d / allRounds, Math.round(Impact(+matchInfo.t1p3_k, +matchInfo.t1p3_a, allK, allA) * 100) / 100),
				t1p4_rating: Rating(+matchInfo.t1p4_k / +matchInfo.t1p4_d, +matchInfo.t1p4_k / allRounds, +matchInfo.t1p4_d / allRounds, Math.round(Impact(+matchInfo.t1p4_k, +matchInfo.t1p4_a, allK, allA) * 100) / 100),
				t1p5_rating: Rating(+matchInfo.t1p5_k / +matchInfo.t1p5_d, +matchInfo.t1p5_k / allRounds, +matchInfo.t1p5_d / allRounds, Math.round(Impact(+matchInfo.t1p5_k, +matchInfo.t1p5_a, allK, allA) * 100) / 100),
				t2p1_rating: Rating(+matchInfo.t2p1_k / +matchInfo.t2p1_d, +matchInfo.t2p1_k / allRounds, +matchInfo.t2p1_d / allRounds, Math.round(Impact(+matchInfo.t2p1_k, +matchInfo.t2p1_a, allK, allA) * 100) / 100),
				t2p2_rating: Rating(+matchInfo.t2p2_k / +matchInfo.t2p2_d, +matchInfo.t2p2_k / allRounds, +matchInfo.t2p2_d / allRounds, Math.round(Impact(+matchInfo.t2p2_k, +matchInfo.t2p2_a, allK, allA) * 100) / 100),
				t2p3_rating: Rating(+matchInfo.t2p3_k / +matchInfo.t2p3_d, +matchInfo.t2p3_k / allRounds, +matchInfo.t2p3_d / allRounds, Math.round(Impact(+matchInfo.t2p3_k, +matchInfo.t2p3_a, allK, allA) * 100) / 100),
				t2p4_rating: Rating(+matchInfo.t2p4_k / +matchInfo.t2p4_d, +matchInfo.t2p4_k / allRounds, +matchInfo.t2p4_d / allRounds, Math.round(Impact(+matchInfo.t2p4_k, +matchInfo.t2p4_a, allK, allA) * 100) / 100),
				t2p5_rating: Rating(+matchInfo.t2p5_k / +matchInfo.t2p5_d, +matchInfo.t2p5_k / allRounds, +matchInfo.t2p5_d / allRounds, Math.round(Impact(+matchInfo.t2p5_k, +matchInfo.t2p5_a, allK, allA) * 100) / 100),
			},
		]

		// Проверка, что все данные матча заполнены корректно (считается прямо в рендере, без useEffect)
		const isValidData = resultData.every((item) => Object.values(item).every(isFilled))

		// После сохранения новой карты очищаем счёт и статистику, а выбранных игроков оставляем: на следующей карте состав обычно тот же
		const resetStats = () => {
			const cleared = {}
			;['t1p1', 't1p2', 't1p3', 't1p4', 't1p5', 't2p1', 't2p2', 't2p3', 't2p4', 't2p5'].forEach((p) => {
				cleared[`${p}_k`] = ''
				cleared[`${p}_a`] = ''
				cleared[`${p}_d`] = ''
			})
			setMatchInfo((prev) => ({ ...prev, ...cleared, half1_team1: '', half1_team2: '', half2_team1: '', half2_team2: '' }))
			setChoiceMap('')
			setPickMap('')
			setSelectedSide('')
		}

		// Отправка карты на сервер
		const saveMap = async () => {
			setSavedMessage('')
			createState.reset()
			try {
				await createMatch(toMatchPayload(resultData[0])).unwrap()
				setSavedMessage('Map saved')
				resetStats()
				currentMatch.refetch()
				shortMatches.refetch()
			} catch {}
		}

		const maps = ['Sandstone', 'Breeze', 'Rust', 'Province', 'Sakura', 'Dune', 'Zone7', 'Hanami', 'Prison']

		return (
			<div className={classes.wrapperAddMatches}>
				<div className={classes.selectMap}>
					{maps.map((mapName) => (
						<div
							key={mapName}
							className={classes.map}
							onClick={() => {
								setChoiceMap(mapName)
							}}>
							<div className={classes.mapImage}>
								<img src={`/images/LogoMaps/${mapName}.jpg`} alt="" />
							</div>
							<div className={classes.mapName}>{mapName}</div>
							<div className={classes.hoverMap}></div>
						</div>
					))}
				</div>
				<div className={classes.infoMatch}>
					<div className={classes.wrapperInputData}>
						<div className={classes.labelInput}>Pick map:</div>
						<label className={classes.labelRadio}>
							<input type="radio" value={shortMatches.data[0].team1} checked={pickMap === shortMatches.data[0].team1} onChange={handlePickMap} />
							<img src={`/images/LogoTeams/${shortMatches.data[0].logo_t1}`} alt="/" />
						</label>
						<label className={classes.labelRadio}>
							<input type="radio" value={shortMatches.data[0].team2} checked={pickMap === shortMatches.data[0].team2} onChange={handlePickMap} />
							<img src={`/images/LogoTeams/${shortMatches.data[0].logo_t2}`} alt="/" />
						</label>
						<label className={classes.labelRadio}>
							<input type="radio" value={'Decider'} onChange={handlePickMap} checked={pickMap === 'Decider'} /> Decider
						</label>
					</div>
					<div className={classes.wrapperInputData}>
						<div className={classes.labelInput}>
							Start side
							<img src={`/images/LogoTeams/${shortMatches.data[0].logo_t1}`} alt="/" />:
						</div>
						<label className={classes.labelRadio}>
							<input type="radio" value="CT" checked={selectedSide === 'CT'} onChange={handleChangeSide} />
							CT
						</label>
						<label className={classes.labelRadio}>
							<input type="radio" value="T" checked={selectedSide === 'T'} onChange={handleChangeSide} />T
						</label>
					</div>
					<div className={classes.wrapperInputData}>
						<div className={classes.labelInput}>Map:</div>
						<input type="text" className={classes.inputEntryData} value={choiceMap} readOnly />
					</div>
					<div className={classes.wrapperInputData}>
						<div className={classes.labelInput}>
							half 1
							<img src={`/images/LogoTeams/${shortMatches.data[0].logo_t1}`} alt="/" />:
						</div>
						<input type="number" className={classes.inputEntryData} name="half1_team1" autoComplete="off" value={matchInfo.half1_team1} onChange={handleChangeInfoMatch} />
					</div>
					<div className={classes.wrapperInputData}>
						<div className={classes.labelInput}>
							half 1
							<img src={`/images/LogoTeams/${shortMatches.data[0].logo_t2}`} alt="/" />:
						</div>
						<input type="number" className={classes.inputEntryData} name="half1_team2" autoComplete="off" value={matchInfo.half1_team2} onChange={handleChangeInfoMatch} />
					</div>
					<div className={classes.wrapperInputData}>
						<div className={classes.labelInput}>
							Score
							<img src={`/images/LogoTeams/${shortMatches.data[0].logo_t1}`} alt="/" />:
						</div>
						<input type="number" className={classes.inputEntryData} name="half2_team1" autoComplete="off" value={matchInfo.half2_team1} onChange={handleChangeInfoMatch} />
					</div>
					<div className={classes.wrapperInputData}>
						<div className={classes.labelInput}>
							Score
							<img src={`/images/LogoTeams/${shortMatches.data[0].logo_t2}`} alt="/" />:
						</div>
						<input type="number" className={classes.inputEntryData} name="half2_team2" autoComplete="off" value={matchInfo.half2_team2} onChange={handleChangeInfoMatch} />
					</div>
				</div>
				{isValidData ? (
					<div className={classes.wrapperCopyButton}>
						<div className={classes.copyButton} onClick={isSaving ? undefined : saveMap} style={isSaving ? { opacity: 0.5 } : undefined}>
							{isSaving ? 'Saving...' : 'Enter'}
						</div>
					</div>
				) : (
					''
				)}
				{saveError && <p style={{ color: '#ea2f2f' }}>{saveError}</p>}
				{savedMessage && !saveError && <p style={{ color: '#33ff00' }}>{savedMessage}</p>}
				<div className={classes.wrapperDataPlayersMatch}>
					<div className={classes.wrapperTitleCells}>
						<div className={classes.titleCell}>Players</div>
						<div className={classes.titleCell}>K</div>
						<div className={classes.titleCell}>A</div>
						<div className={classes.titleCell}>D</div>
					</div>
					<div className={classes.dataPlayersMatch}>
						<PlayerSelector onSelect={setPlayer11} defaultPlayerValue={t1p1Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t1p1_k" value={matchInfo.t1p1_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p1_a" value={matchInfo.t1p1_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p1_d" value={matchInfo.t1p1_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer12} defaultPlayerValue={t1p2Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t1p2_k" value={matchInfo.t1p2_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p2_a" value={matchInfo.t1p2_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p2_d" value={matchInfo.t1p2_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer13} defaultPlayerValue={t1p3Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t1p3_k" value={matchInfo.t1p3_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p3_a" value={matchInfo.t1p3_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p3_d" value={matchInfo.t1p3_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer14} defaultPlayerValue={t1p4Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t1p4_k" value={matchInfo.t1p4_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p4_a" value={matchInfo.t1p4_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p4_d" value={matchInfo.t1p4_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer15} defaultPlayerValue={t1p5Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t1p5_k" value={matchInfo.t1p5_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p5_a" value={matchInfo.t1p5_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t1p5_d" value={matchInfo.t1p5_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer21} defaultPlayerValue={t2p1Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t2p1_k" value={matchInfo.t2p1_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p1_a" value={matchInfo.t2p1_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p1_d" value={matchInfo.t2p1_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer22} defaultPlayerValue={t2p2Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t2p2_k" value={matchInfo.t2p2_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p2_a" value={matchInfo.t2p2_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p2_d" value={matchInfo.t2p2_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer23} defaultPlayerValue={t2p3Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t2p3_k" value={matchInfo.t2p3_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p3_a" value={matchInfo.t2p3_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p3_d" value={matchInfo.t2p3_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer24} defaultPlayerValue={t2p4Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t2p4_k" value={matchInfo.t2p4_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p4_a" value={matchInfo.t2p4_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p4_d" value={matchInfo.t2p4_d} onChange={handleChangeInfoMatch} autoComplete="off" />

						<PlayerSelector onSelect={setPlayer25} defaultPlayerValue={t2p5Data?.player_id} />
						<input type="number" className={classes.inputEntryData} name="t2p5_k" value={matchInfo.t2p5_k} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p5_a" value={matchInfo.t2p5_a} onChange={handleChangeInfoMatch} autoComplete="off" />
						<input type="number" className={classes.inputEntryData} name="t2p5_d" value={matchInfo.t2p5_d} onChange={handleChangeInfoMatch} autoComplete="off" />
					</div>
				</div>
				{isValidData ? (
					<>
						<div className={classes.wrapperCopyButton}>
							<div className={classes.copyButton} onClick={onButtonClick}>
								Download
							</div>
						</div>
						<div className={classes.resultBanner} ref={ref}>
							<PictureResult2 entryDataMatch={resultData} />
						</div>
					</>
				) : (
					<p>Entry data!</p>
				)}
			</div>
		)
	}

	// Пока данные грузятся — явно ничего не рендерим
	return null
}

export default DataEntryMatch
