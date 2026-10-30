import React, { useMemo, useState } from 'react'
import classes from './compareTops.module.css'

export const STAGES = [
	{ value: 'FULL', label: 'Full' },
	{ value: 'GROUP', label: 'Group' },
	{ value: 'PLAYOFF', label: 'Playoff' },
	{ value: 'FINAL', label: 'Final' },
]

// Та же логика отбора по стадии, что в calculatePlayersTopV2 — чтобы в меню было видно, какие матчи стадия отрежет
export const isMatchInStage = (nameStage, stage) => {
	const s = String(nameStage ?? '').toUpperCase()
	if (stage === 'GROUP') return s.includes('GROUP')
	if (stage === 'PLAYOFF') return s.includes('PLAYOFF') || s.includes('FINAL')
	if (stage === 'FINAL') return s === 'FINAL'
	return true
}

// Карты, сыгранные в выбранных турнирах (без исключённых матчей), с количеством — для фильтра по картам
export const collectMaps = (matchesData, tours, excluded) => {
	const counts = {}
	const excludedSet = new Set(excluded)
	;(matchesData ?? []).forEach((m) => {
		if (tours.includes(m.name_tour_for_sort) && !excludedSet.has(m.name_match_for_sort) && m.map) {
			counts[m.map] = (counts[m.map] ?? 0) + 1
		}
	})
	return Object.entries(counts)
		.sort((a, b) => b[1] - a[1])
		.map(([name, count]) => ({ name, count }))
}

// Тиры как на rankoff.org/events: 1–5; Others — турниры без тира
const TIERS = [1, 2, 3, 4, 5]

const formatDate = (value) => {
	const str = String(value ?? '')
	const m = str.match(/^(\d{4})-(\d{2})-(\d{2})/)
	return m ? `${m[3]}.${m[2]}` : str
}

// Блок настроек одного топа: заголовок, стадия, турниры (мультивыбор), матчи выбранных турниров (исключение)
// maps (необязательно): [{ name, count }] — если передан, показывается фильтр по картам; settings.maps — выбранные (пусто = все)
const TopSettings = ({ label, settings, setSettings, allTours, tierByTour = {}, shortMatches, maps }) => {
	const { title, stage, tours, excluded } = settings
	const selectedMaps = settings.maps ?? []
	const [filter, setFilter] = useState('')
	// Фильтр списка турниров по тиру: null — все, 'others' — без тира; повторный клик снимает фильтр
	const [tierFilter, setTierFilter] = useState(null)
	const toggleTier = (key) => setTierFilter((prev) => (prev === key ? null : key))
	// Список матчей по умолчанию свёрнут, разворачивается кликом по заголовку
	const [matchesOpen, setMatchesOpen] = useState(false)

	const update = (patch) => setSettings((prev) => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }))

	const toggleTour = (id) =>
		update((prev) =>
			prev.tours.includes(id)
				? {
						tours: prev.tours.filter((e) => e !== id),
						// убираем турнир — забываем и исключения его матчей
						excluded: prev.excluded.filter((m) => !(matchesByTour[id] ?? []).some((sm) => sm.name_match_for_sort === m)),
					}
				: { tours: [...prev.tours, id] },
		)

	const toggleMatch = (name) => update((prev) => ({ excluded: prev.excluded.includes(name) ? prev.excluded.filter((e) => e !== name) : [...prev.excluded, name] }))

	const setTourMatches = (id, include) =>
		update((prev) => {
			const names = (matchesByTour[id] ?? []).map((m) => m.name_match_for_sort)
			const rest = prev.excluded.filter((e) => !names.includes(e))
			return { excluded: include ? rest : [...rest, ...names] }
		})

	// Матчи выбранных турниров, по дате
	const matchesByTour = useMemo(() => {
		const map = {}
		tours.forEach((id) => {
			map[id] = (shortMatches ?? [])
				.filter((m) => m.name_tour_sort === id)
				.sort((a, b) => String(a.date_match).localeCompare(String(b.date_match)) || String(a.time_match).localeCompare(String(b.time_match)))
		})
		return map
	}, [tours, shortMatches])

	const toggleMap = (name) => update((prev) => {
		const current = prev.maps ?? []
		return { maps: current.includes(name) ? current.filter((e) => e !== name) : [...current, name] }
	})

	const filteredTours = allTours.filter((id) => {
		if (!id.toLowerCase().includes(filter.toLowerCase())) return false
		const tier = tierByTour[id]
		if (tierFilter === 'others') return !TIERS.includes(tier)
		if (tierFilter) return tier === tierFilter
		return true
	})
	// Сколько выбранных турниров сейчас скрыто фильтром тира/поиска
	const hiddenSelected = tours.filter((id) => !filteredTours.includes(id)).length

	const allSelectedMatches = tours.flatMap((id) => matchesByTour[id] ?? [])
	const includedCount = allSelectedMatches.filter((m) => !excluded.includes(m.name_match_for_sort)).length
	const inStageCount = allSelectedMatches.filter((m) => !excluded.includes(m.name_match_for_sort) && isMatchInStage(m.name_stage, stage)).length

	return (
		<div className={classes.topSettings}>
			<div className={classes.settingsLabel}>{label}</div>

			<div className={classes.titleBox}>Заголовок:</div>
			<input type="text" placeholder="ТОП ИГРОКОВ ..." value={title} onChange={(e) => update({ title: e.target.value })} className={classes.inputData} />

			<div className={classes.titleBox}>Строк в топе:</div>
			<div className={classes.limitRow}>
				<input
					type="number"
					min="1"
					placeholder="все"
					value={settings.limit ?? ''}
					onChange={(e) => update({ limit: e.target.value === '' ? '' : String(Math.max(1, parseInt(e.target.value, 10) || 1)) })}
					className={classes.inputData}
				/>
				{[10, 15, 20, 30].map((n) => (
					<div key={n} className={`${classes.stageButton} ${String(settings.limit) === String(n) ? classes.matchSelected : ''}`} onClick={() => update({ limit: String(n) })}>
						{n}
					</div>
				))}
				<div className={`${classes.stageButton} ${!settings.limit ? classes.matchSelected : ''}`} onClick={() => update({ limit: '' })}>
					Все
				</div>
			</div>

			<div className={classes.titleBox}>Стадия:</div>
			<div className={classes.stageButtons}>
				{STAGES.map((s) => (
					<div key={s.value} className={`${classes.stageButton} ${(stage || 'FULL') === s.value ? classes.matchSelected : ''}`} onClick={() => update({ stage: s.value })}>
						{s.label}
					</div>
				))}
			</div>

			{maps && (
				<>
					<div className={classes.titleBox}>
						Карты: {selectedMaps.length > 0 ? selectedMaps.join(', ') : 'все'}
						{selectedMaps.length > 0 && (
							<span className={classes.resetLink} onClick={() => update({ maps: [] })}>
								сбросить
							</span>
						)}
					</div>
					<div className={classes.stageButtons}>
						{maps.length === 0 && <div className={classes.emptyHint}>Карты появятся после выбора турниров</div>}
						{maps.map((m) => (
							<div key={m.name} className={`${classes.stageButton} ${selectedMaps.includes(m.name) ? classes.matchSelected : ''}`} onClick={() => toggleMap(m.name)}>
								{m.name} <span className={classes.muted}>{m.count}</span>
							</div>
						))}
					</div>
				</>
			)}

			<div className={classes.titleBox}>
				Турниры: {tours.length}
				{tours.length > 0 && (
					<span className={classes.resetLink} onClick={() => update({ tours: [], excluded: [] })}>
						сбросить
					</span>
				)}
			</div>
			<div className={classes.stageButtons}>
				{TIERS.map((t) => (
					<div key={t} className={`${classes.stageButton} ${tierFilter === t ? classes.matchSelected : ''}`} onClick={() => toggleTier(t)}>
						Tier {t}
					</div>
				))}
				<div className={`${classes.stageButton} ${tierFilter === 'others' ? classes.matchSelected : ''}`} onClick={() => toggleTier('others')}>
					Others
				</div>
				<div className={`${classes.stageButton} ${tierFilter === null ? classes.matchSelected : ''}`} onClick={() => setTierFilter(null)}>
					All
				</div>
			</div>
			<input type="text" placeholder="Search" value={filter} onChange={(e) => setFilter(e.target.value)} className={`${classes.inputData} ${classes.tierSearch}`} />
			<div className={classes.listTours}>
				{filteredTours.length === 0 && <div className={classes.emptyHint}>Нет турниров</div>}
				{filteredTours.map((id) => (
					<div key={id} className={`${classes.match} ${classes.tourItem} ${tours.includes(id) ? classes.matchSelected : ''}`} onClick={() => toggleTour(id)}>
						<span>{id}</span>
						<span className={classes.tierBadge}>{tierByTour[id] ? `T${tierByTour[id]}` : '—'}</span>
					</div>
				))}
			</div>
			{hiddenSelected > 0 && <div className={classes.emptyHint}>Ещё выбрано, но скрыто фильтром: {hiddenSelected}</div>}

			<div className={`${classes.titleBox} ${classes.collapseToggle}`} onClick={() => setMatchesOpen((v) => !v)}>
				<span className={classes.collapseArrow}>{matchesOpen ? '▾' : '▸'}</span>
				Матчи: в выборке {includedCount} из {allSelectedMatches.length}
				{stage && stage !== 'FULL' ? `, после фильтра стадии ${inStageCount}` : ''}
				<span className={classes.muted}> — {matchesOpen ? 'свернуть' : 'развернуть'}</span>
			</div>
			{matchesOpen && (
			<div className={classes.listMatchesTour}>
				{tours.length === 0 && <div className={classes.emptyHint}>Выбери турниры выше</div>}
				{tours.map((id) => {
					const matches = matchesByTour[id] ?? []
					const included = matches.filter((m) => !excluded.includes(m.name_match_for_sort)).length
					return (
						<div key={id} className={classes.tourGroup}>
							<div className={classes.tourGroupHeader}>
								<span className={classes.tourGroupName}>
									{id} <span className={classes.muted}>({included}/{matches.length})</span>
								</span>
								<span className={classes.groupActions}>
									<span className={classes.resetLink} onClick={() => setTourMatches(id, true)}>
										все
									</span>
									<span className={classes.resetLink} onClick={() => setTourMatches(id, false)}>
										ничего
									</span>
									<span className={classes.resetLink} onClick={() => toggleTour(id)}>
										убрать
									</span>
								</span>
							</div>
							{matches.length === 0 && <div className={classes.emptyHint}>Матчей нет</div>}
							{matches.map((m) => {
								const isIncluded = !excluded.includes(m.name_match_for_sort)
								const inStage = isMatchInStage(m.name_stage, stage)
								return (
									<div
										key={m.name_match_for_sort}
										className={`${classes.matchRow} ${isIncluded ? classes.matchRowOn : classes.matchRowOff} ${isIncluded && !inStage ? classes.matchRowOutStage : ''}`}
										onClick={() => toggleMatch(m.name_match_for_sort)}
										title={!inStage ? 'Не попадает в выбранную стадию' : ''}>
										<span className={classes.matchCheck}>{isIncluded ? '■' : '□'}</span>
										<span className={classes.matchDate}>{formatDate(m.date_match)}</span>
										<span className={classes.matchTeams}>
											{m.team1} <b>{m.total_score_match_t1 ?? '-'}:{m.total_score_match_t2 ?? '-'}</b> {m.team2}
										</span>
										<span className={classes.matchStage}>{m.name_stage}</span>
									</div>
								)
							})}
						</div>
					)
				})}
			</div>
			)}
		</div>
	)
}

export default TopSettings
