import React, { useMemo } from 'react'
import classes from './sideTop.module.css'
import {
	useGetMatchesQuery,
	useGetPlayersQuery,
	useGetShortMatchesByTournamentQuery,
	useGetShortMatchQuery,
	useGetTeamsTournamentsByNameQuery,
	useGetTeamsTournamentsQuery,
	useGetTournamentByNameQuery,
	useGetTournamentsQuery,
} from '../../../../store/api/apiSlice'
import { calculatePlayersTopV2 } from '../../../../Function/calculatePlayersTopV2'
import CountryFlagPlayer from '../../../../Function/countryFlagPlayer'
import Loader from '../../../UI/Loader/loader'

// Сколько строк выводить: пусто / 0 = весь топ
const limitRows = (list, limit) => (Number(limit) > 0 ? list.slice(0, Number(limit)) : list)

const RightTopResult = (props) => {
	let leftTop = props.leftTop
	const name = ''
	// Список турниров для выборки приходит со страницы (выбирается мышкой в меню)
	const filterTours = props.tours
	const excluded = props.excluded
	const maps = props.maps

	const allPlayers = useGetPlayersQuery()
	const allMatches = useGetMatchesQuery()
	const allShortMatches = useGetShortMatchQuery()
	const teamsTour = useGetTeamsTournamentsQuery()
	const tourInfo = useGetTournamentsQuery()

	// Убираем исключённые в меню матчи (по name_match_for_sort) до расчёта — функция берёт из allMatches только .data
	// + оставляем только выбранные карты (пусто = все)
	const filteredMatches = useMemo(() => {
		if (!excluded?.length && !maps?.length) return allMatches
		const set = new Set(excluded)
		const mapsSet = new Set(maps)
		return { ...allMatches, data: allMatches.data?.filter((m) => !set.has(m.name_match_for_sort) && (mapsSet.size === 0 || mapsSet.has(m.map))) }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allMatches.data, excluded, maps])

	// Пересчёт только при смене стадии, турниров или данных; пустой выбор = пустой топ (иначе функция берёт все турниры)
	const players_tournaments = useMemo(
		() => (filterTours.length > 0 ? (calculatePlayersTopV2(name, props.stage, allPlayers, filteredMatches, teamsTour, tourInfo, allShortMatches, filterTours) ?? []) : []),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props.stage, filterTours, allPlayers.data, filteredMatches, teamsTour.data, tourInfo.data, allShortMatches.data],
	)

	const diffPlayerPosition = (player_id, leftTop, currentPos) => {
		const positionLeft = leftTop.find((e) => e.player_id === player_id)?.position

		let diff = positionLeft - currentPos

		if (diff > 0) {
			return `+${diff}`
		} else if (diff < 0) {
			return `${diff}`
		} else if (diff === 0) {
			return ``
		} else {
			return `NEW`
		}
	}

	const playersWithIndex = players_tournaments?.map((item, index) => ({
		...item,
		position: index + 1,
	}))

	const isLoading = allPlayers.isLoading || allMatches.isLoading || allShortMatches.isLoading || teamsTour.isLoading || tourInfo.isLoading

	if (isLoading) {
		return <Loader />
	}

	if (playersWithIndex.length > 0) {
		return (
			<div className={classes.wrapperTopResult}>
				<div className={classes.wrapperTourInfo}>
					<div className={classes.nameTour}>{props.title.toUpperCase()}</div>
				</div>
				<div className={classes.topResult}>
					<div className={classes.wrapperPlayerTitle}>
						<div className={classes.playerTitle}>
							<div className={classes.dataNumberPlayerTitle}>#</div>
							<div className={classes.logoTeamTeam}>Team</div>
							<div className={classes.dataNicknamePlayerNickname}>Nickname</div>
							<div className={classes.dataFlagPlayerCountry}>CTR</div>
							<div className={classes.dataPlayerKd}>KD</div>
							<div className={classes.dataPlayerKpr}>KPR</div>
							<div className={classes.dataPlayerDpr}>DPR</div>
							<div className={classes.dataPlayerImpact}>Impact</div>
							<div className={classes.dataPlayerRating}>Rating</div>
							<div className={classes.dataPlayerMaps}>Maps</div>
						</div>
					</div>
					<div className={classes.wrapperPlayer}>
						{limitRows(playersWithIndex, props.limit).map((e, index) => {
							if (index < 1000) {
								return (
									<div key={index} className={classes.wrapperDiffPosition}>
										<div
											className={classes.diffPositionPlayer}
											style={{
												background: !diffPlayerPosition(e.player_id, leftTop, e.position)
													? ''
													: diffPlayerPosition(e.player_id, leftTop, e.position) === 'NEW'
														? 'var(--yellow)'
														: diffPlayerPosition(e.player_id, leftTop, e.position) > 0
															? 'var(--green)'
															: 'var(--red)',
											}}>
											{diffPlayerPosition(e.player_id, leftTop, e.position)}
										</div>
										<div className={classes.player}>
											<div className={classes.dataNumberPlayerTitle}>{e.position}</div>
											<div className={classes.logoTeam}>
												<img src={`/images/LogoTeams/${e.logo_team}`} alt="/" />
											</div>
											<div className={classes.dataNicknamePlayerNickname}>{e.nickname}</div>
											<div className={classes.dataFlagPlayerCountry}>
												<CountryFlagPlayer player_id={e.player_id} width={'20px'} height={'13px'} margin={'0 0 0 5px'} />
											</div>
											<div
												className={classes.dataPlayerKd}
												style={{
													background: e.kd < 0.9 ? 'var(--red)' : e.kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
												}}>
												{e.kd}
											</div>
											<div
												className={classes.dataPlayerKpr}
												style={{
													background: e.kpr < 0.6 ? 'var(--red)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												}}>
												{e.kpr}
											</div>
											<div
												className={classes.dataPlayerDpr}
												style={{
													background: e.dpr < 0.68 ? 'var(--green)' : e.dpr > 0.7 ? (e.dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
												}}>
												{e.dpr}
											</div>
											<div
												className={classes.dataPlayerImpact}
												style={{
													background: e.impact < 1 ? 'var(--red)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												}}>
												{e.impact}
											</div>
											<div
												className={classes.dataPlayerRating}
												style={{
													background: e.rating < 1 ? 'var(--red)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												}}>
												{e.rating}
											</div>
											<div className={classes.dataPlayerMaps}>{e.maps}</div>
										</div>
									</div>
								)
							}
						})}
					</div>
				</div>
			</div>
		)
	}
}

export default RightTopResult
