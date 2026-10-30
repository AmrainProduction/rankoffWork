import React, { useMemo } from 'react'
import classes from '../topPlayersTour.module.css'
import { useGetMatchesQuery, useGetPlayersQuery, useGetShortMatchQuery, useGetTeamsTournamentsQuery, useGetTournamentsQuery } from '../../../../store/api/apiSlice'
import CountryFlagPlayer from '../../../../Function/countryFlagPlayer'
import { calculatePlayersTopV2 } from '../../../../Function/calculatePlayersTopV2'
import Loader from '../../../UI/Loader/loader'

// Подложка баннера: рисуется CSS-фоном и обрезается по высоте топа (см. конец topPlayersTour.module.css)
const BG_IMAGE = '/images/DataInImage/NEW_DESIGN_2025_2_0/TOP_PLAYERS_TOUR_LONG2.png'

// Сколько строк выводить: пусто / 0 = весь топ
const limitRows = (list, limit) => (Number(limit) > 0 ? list.slice(0, Number(limit)) : list)

const TopPlayersTourResult = (props) => {
	const name = ''
	// Турниры, исключённые матчи и карты приходят из меню страницы
	const filterTours = props.tours
	const excluded = props.excluded
	const maps = props.maps

	const allPlayers = useGetPlayersQuery()
	const allMatches = useGetMatchesQuery()
	const allShortMatches = useGetShortMatchQuery()
	const teamsTour = useGetTeamsTournamentsQuery()
	const tourInfo = useGetTournamentsQuery()

	// Убираем исключённые матчи и чужие карты до расчёта — функция берёт из allMatches только .data
	const filteredMatches = useMemo(() => {
		const excludedSet = new Set(excluded)
		const mapsSet = new Set(maps)
		return {
			...allMatches,
			data: allMatches.data?.filter((m) => !excludedSet.has(m.name_match_for_sort) && (mapsSet.size === 0 || mapsSet.has(m.map))),
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allMatches.data, excluded, maps])

	// Пересчёт только при смене настроек или данных; пустой выбор = пустой топ (иначе функция берёт все турниры)
	const players_tournaments = useMemo(
		() => (filterTours.length > 0 ? (calculatePlayersTopV2(name, props.stage, allPlayers, filteredMatches, teamsTour, tourInfo, allShortMatches, filterTours) ?? []) : []),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[props.stage, filterTours, filteredMatches, allPlayers.data, teamsTour.data, tourInfo.data, allShortMatches.data],
	)

	// Логотип турнира показываем, только если выбран ровно один турнир
	const singleTourLogo = filterTours.length === 1 ? tourInfo.data?.find((t) => t.name_tour_sort === filterTours[0])?.logo_tour : null

	const isLoading = allPlayers.isLoading || allMatches.isLoading || allShortMatches.isLoading || teamsTour.isLoading || tourInfo.isLoading

	if (isLoading) {
		return <Loader />
	}

	if (players_tournaments.length > 0) {
		return (
			<div className={classes.wrapperTopResult} style={{ backgroundImage: `url(${BG_IMAGE})` }}>
				<div className={classes.wrapperTourInfo}>
					<div className={classes.logoRankoff}>
						<img src={`/images/DataInImage/NEW_DESIGN_2025_2_0/RANKOFF_LOGO.svg`} alt="/" />
						<div className={classes.titleBanner}>{Number(props.limit) > 0 ? `RANKOFF TOP ${props.limit} PLAYERS` : 'RANKOFF TOP PLAYERS'}</div>
					</div>
					<div className={classes.nameTourWrapper}>
						<div className={classes.nameTour}>{props.title.toUpperCase()}</div>
					</div>
					<div className={classes.logoTour}>{singleTourLogo ? <img src={`/images/LogoAndBannerTour/${singleTourLogo}`} alt="/" /> : ''}</div>
				</div>
				<div className={classes.topResult}>
					<div className={classes.wrapperPlayerTitle}>
						<div className={classes.playerTitle}>
							<div>#</div>
							<div>Team</div>
							<div>Nickname</div>
							<div>CTR</div>
							<div>KD</div>
							<div>KPR</div>
							<div>DPR</div>
							<div>K</div>
							<div>A</div>
							<div>D</div>
							<div>Impact</div>
							<div>Rating</div>
							<div>WR</div>
							<div>LR</div>
							<div>Maps</div>
						</div>
					</div>
					<div className={classes.wrapperPlayer}>
						{limitRows(players_tournaments, props.limit).map((e, index) => {
							if (index < 1000) {
								return (
									<div key={index} className={classes.player}>
										<div className={classes.contnentCenter}>{++index}</div>
										<div className={classes.logoTeam}>
											<img
												src={`/images/LogoTeams/${e.logo_team}`}
												alt="/"
												onError={(e) => {
													e.target.onerror = null
													e.target.src = '/images/LogoTeams/TeamDefaults.png'
												}}
											/>
										</div>
										<div className={classes.dataNicknamePlayerNickname}>
											<div className={classes.logoPlayer}>
												<img
													src={`/images/LogoPlayers/${e.logo_player}`}
													alt="/"
													onError={(e) => {
														e.target.onerror = null
														e.target.src = '/images/LogoPlayers/PlayerDefaultLogo.png'
													}}
												/>
											</div>
											<div className={classes.nickname}>{e.nickname}</div>
										</div>
										<div className={classes.contnentCenter}>
											<CountryFlagPlayer player_id={e.player_id} width={'20px'} height={'13px'} margin={'0 0 0 5px'} />
										</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.kd < 0.9 ? 'var(--red)' : e.kd > 1.05 ? 'var(--green)' : 'var(--yellow)',
												// color: e.kd < 0.9 ? 'var(--redDark)' : e.kd > 1.05 ? 'var(--greenDark)' : 'var(--yellowDark)',
											}}>
											{e.kd}
										</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.kpr < 0.6 ? 'var(--red)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.kpr < 0.6 ? 'var(--redDark)' : e.kpr > 0.65 ? (e.kpr > 0.7 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.kpr}
										</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.dpr < 0.68 ? 'var(--green)' : e.dpr > 0.7 ? (e.dpr > 0.8 ? 'var(--red)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.dpr < 0.68 ? 'var(--greenDark)' : e.dpr > 0.7 ? (e.dpr > 0.8 ? 'var(--redDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.dpr}
										</div>
										<div className={classes.contnentCenter}>{e.k}</div>
										<div className={classes.contnentCenter}>{e.a}</div>
										<div className={classes.contnentCenter}>{e.d}</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.impact < 1 ? 'var(--red)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.impact < 1 ? 'var(--redDark)' : e.impact > 1 ? (e.impact >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.impact}
										</div>
										<div
											className={classes.contnentCenter}
											style={{
												background: e.rating < 1 ? 'var(--red)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--green)' : 'var(--yellow)') : 'var(--yellow)',
												// color: e.rating < 1 ? 'var(--redDark)' : e.rating > 1 ? (e.rating >= 1.1 ? 'var(--greenDark)' : 'var(--yellowDark)') : 'var(--yellowDark)',
											}}>
											{e.rating}
										</div>
										<div className={classes.contnentCenter}>{e.w_rounds}</div>
										<div className={classes.contnentCenter}>{e.l_rounds}</div>
										<div className={classes.contnentCenter}>{e.maps}</div>
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

export default TopPlayersTourResult
