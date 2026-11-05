import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchSelect from '../UI/SearchSelect/searchSelect'
import base from '../AdminAccess/adminAccess.module.css'
import classes from './contextPage.module.css'
import Rating from '../Formulas/rating'
import Kpr from '../Formulas/kpr'
import Dpr from '../Formulas/dpr'
import { useGetPlayersQuery, useGetStatsExplorerOptionsQuery, useGetTeamsQuery, useGetTournamentsQuery, useRunStatsExplorerMutation } from '../../store/api/apiSlice'

const SITE = 'https://rankoff.org'
const SMALL_SAMPLE = 10
const BREAKDOWN_ROWS = 15

const TIERS = [
	{ key: '1', label: 'Tier 1' },
	{ key: '2', label: 'Tier 2' },
	{ key: '3', label: 'Tier 3' },
	{ key: '4', label: 'Tier 4' },
	{ key: '5', label: 'Tier 5' },
	{ key: 'others', label: 'Others' },
]

const EMPTY_FILTERS = { tournaments: [], tiers: [], maps: [], dateFrom: '', dateTo: '', playerTeams: [], opponentTeams: [], opponentPlayers: [], withPlayers: [] }

/*----------------------Формулы-----------------------------*/

// Показатели из сумм сервера. Рейтинг считается формулами профилей игроков (Component/Formulas): impact берётся средним по картам
const metrics = (s) => {
	const kd = s.d ? s.k / s.d : null
	const kpr = s.rounds ? Kpr(s.k, s.rounds) : null
	const dpr = s.rounds ? Dpr(s.d, s.rounds) : null
	const impact = s.maps ? s.impact_sum / s.maps : null
	const rating = [kd, kpr, dpr, impact].every((v) => v !== null) ? Rating(kd, kpr, dpr, impact) : null
	return {
		maps: s.maps,
		wins: s.wins,
		losses: s.losses,
		winRate: s.maps ? (s.wins / s.maps) * 100 : null,
		roundsWon: s.rounds_won,
		roundsLost: s.rounds_lost,
		roundWinRate: s.rounds_won + s.rounds_lost ? (s.rounds_won / (s.rounds_won + s.rounds_lost)) * 100 : null,
		ctRate: s.ct_played ? (s.ct_won / s.ct_played) * 100 : null,
		tRate: s.t_played ? (s.t_won / s.t_played) * 100 : null,
		kd,
		kpr,
		dpr,
		impact,
		rating,
		k: s.k,
		a: s.a,
		d: s.d,
	}
}

// Цвета и пороги как в профиле игрока на сайте (InfoPlayer): красный / жёлтый / зелёный. Для командных показателей пороги подобраны отдельно
const higher = (lowRed, highGreen) => (v) => (v === null || v === undefined ? null : v < lowRed ? 'red' : v >= highGreen ? 'green' : 'yellow')
const TONES = {
	rating: higher(1, 1.1),
	kd: higher(0.9, 1.0500001),
	kpr: higher(0.6, 0.7000001),
	impact: higher(1, 1.1),
	dpr: (v) => (v === null || v === undefined ? null : v < 0.68 ? 'green' : v > 0.8 ? 'red' : 'yellow'),
	winRate: higher(45, 55),
	roundWinRate: higher(47, 53),
	ctRate: higher(45, 55),
	tRate: higher(45, 55),
	teamKd: higher(0.95, 1.05),
}

const f2 = (x) => (x === null || x === undefined || !Number.isFinite(x) ? '—' : x.toFixed(2))
const pct = (x) => (x === null || x === undefined ? '—' : `${x.toFixed(1)}%`)
const errorMessage = (error) => error?.data?.message || 'Something went wrong, try again'

/*----------------------Картинки-----------------------------*/

const PATHS = { player: '/images/LogoPlayers/', team: '/images/LogoTeams/', tour: '/images/LogoAndBannerTour/' }

// Маленькая картинка рядом с названием: фото игрока, лого команды или турнира. Нет файла или картинка не загрузилась — ничего не показываем
const Thumb = ({ kind, file, size = 20 }) => {
	const [failed, setFailed] = useState(false)
	if (!file || failed) return null
	const src = `${PATHS[kind]}${file}`
	// Лого команд и турниров не обрезаются: фиксированная высота, ширина по пропорциям. Фото игрока квадратное, обрезается снизу (лицо сверху)
	return kind === 'player' ? (
		<img className={classes.thumbPlayer} style={{ width: size, height: size }} src={src} alt="" onError={() => setFailed(true)} />
	) : (
		<img className={classes.thumbLogo} style={{ height: size, maxWidth: size * 3 }} src={src} alt="" onError={() => setFailed(true)} />
	)
}

const withThumb = (kind, getFile, getLabel) => (item) => (
	<span className={classes.option}>
		<Thumb kind={kind} file={getFile(item)} />
		{getLabel(item)}
	</span>
)

/*----------------------Выбор нескольких значений-----------------------------*/

// Поле поиска + список выбранных значений (чипы). selected — массив ключей
const ChipPicker = ({ label, items, getKey, getLabel, renderItem, matches, selected, onChange, placeholder, kind, getFile }) => {
	const byKey = useMemo(() => new Map(items.map((i) => [String(getKey(i)), i])), [items, getKey])
	const add = (item) => {
		if (!item) return
		const key = getKey(item)
		if (!selected.some((k) => String(k) === String(key))) onChange([...selected, key])
	}
	return (
		<div>
			<SearchSelect label={label} items={items} value={null} getKey={getKey} getLabel={getLabel} renderItem={renderItem} matches={matches} onSelect={add} placeholder={placeholder} />
			{selected.length > 0 && (
				<div className={classes.chips}>
					{selected.map((key) => {
						const item = byKey.get(String(key))
						return (
							<span key={key} className={classes.chip}>
								{getFile && <Thumb kind={kind} file={item ? getFile(item) : null} />}
								{item ? getLabel(item) : `#${key}`}
								<button type="button" className={classes.chipX} onClick={() => onChange(selected.filter((k) => String(k) !== String(key)))} aria-label="Remove">
									×
								</button>
							</span>
						)
					})}
				</div>
			)}
		</div>
	)
}

/*----------------------Результаты-----------------------------*/

// Раздел результата: отдельная карточка с цветной шапкой, сворачивается по клику на заголовок
const Section = ({ title, count, children, defaultOpen = true }) => {
	const [open, setOpen] = useState(defaultOpen)
	return (
		<section className={classes.section}>
			<button type="button" className={classes.sectionHead} onClick={() => setOpen(!open)}>
				<span className={classes.sectionName}>{title}</span>
				{count !== undefined && <span className={classes.sectionCount}>{count}</span>}
				<span className={classes.sectionArrow}>{open ? '▲' : '▼'}</span>
			</button>
			{open && <div className={classes.sectionBody}>{children}</div>}
		</section>
	)
}

// Значение показателя в таблице: цветная плашка по порогам (если для показателя они есть)
const ToneCell = ({ col, m }) => {
	const value = col.get(m)
	const tone = col.tone ? col.tone(value) : null
	return tone ? <span className={`${classes.tone} ${classes['tone_' + tone]}`}>{col.show(value)}</span> : col.show(value)
}

const Tile = ({ title, value, hint, tone }) => (
	<div className={`${classes.tile} ${tone ? classes['tile_' + tone] : ''}`}>
		<div className={classes.tileTitle}>{title}</div>
		<div className={classes.tileValue}>{value}</div>
		{hint && <div className={classes.tileHint}>{hint}</div>}
	</div>
)

const PLAYER_COLUMNS = [
	{ key: 'rating', title: 'Rating', get: (m) => m.rating, show: f2, tone: TONES.rating },
	{ key: 'kd', title: 'KD', get: (m) => m.kd, show: f2, tone: TONES.kd },
	{ key: 'kpr', title: 'KPR', get: (m) => m.kpr, show: f2, tone: TONES.kpr },
	{ key: 'dpr', title: 'DPR', get: (m) => m.dpr, show: f2, tone: TONES.dpr },
	{ key: 'impact', title: 'Impact', get: (m) => m.impact, show: f2, tone: TONES.impact },
]

const TEAM_COLUMNS = [
	{ key: 'roundWinRate', title: 'Round win %', get: (m) => m.roundWinRate, show: pct, tone: TONES.roundWinRate },
	{ key: 'ctRate', title: 'CT %', get: (m) => m.ctRate, show: pct, tone: TONES.ctRate },
	{ key: 'tRate', title: 'T %', get: (m) => m.tRate, show: pct, tone: TONES.tRate },
	{ key: 'kd', title: 'KD', get: (m) => m.kd, show: f2, tone: TONES.teamKd },
]

// Таблица разбивки: карты, турниры, соперники, игроки команды. Сортировка по клику на заголовок
const Breakdown = ({ title, rows, columns, labelTitle, iconFor, iconKind }) => {
	const [sort, setSort] = useState({ key: 'maps', dir: 'desc' })
	const [all, setAll] = useState(false)

	const prepared = useMemo(() => rows.map((r) => ({ ...r, m: metrics(r.sums) })), [rows])
	const allColumns = useMemo(() => [{ key: 'maps', title: 'Maps', get: (m) => m.maps, show: (x) => x }, { key: 'winRate', title: 'Win %', get: (m) => m.winRate, show: pct, tone: TONES.winRate }, ...columns], [columns])

	const sorted = useMemo(() => {
		const col = allColumns.find((c) => c.key === sort.key)
		const list = [...prepared]
		if (sort.key === 'label') list.sort((a, b) => a.label.localeCompare(b.label))
		else if (col) list.sort((a, b) => (col.get(a.m) ?? -Infinity) - (col.get(b.m) ?? -Infinity))
		return sort.dir === 'desc' ? list.reverse() : list
	}, [prepared, allColumns, sort])

	if (!rows.length) return null
	const shown = all ? sorted : sorted.slice(0, BREAKDOWN_ROWS)
	const toggle = (key) => setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: key === 'label' ? 'asc' : 'desc' }))
	const mark = (key) => (sort.key === key ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : '')

	return (
		<Section title={title} count={rows.length}>
			<div className={classes.tableWrap}>
				<table className={base.table}>
					<thead>
						<tr>
							<th className={classes.sortable} onClick={() => toggle('label')}>
								{labelTitle}
								{mark('label')}
							</th>
							<th className={classes.num}>W-L</th>
							{allColumns.map((c) => (
								<th key={c.key} className={`${classes.sortable} ${classes.num}`} onClick={() => toggle(c.key)}>
									{c.title}
									{mark(c.key)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{shown.map((r) => (
							<tr key={r.key}>
								<td>
									<span className={classes.option}>
										{iconFor && <Thumb kind={iconKind} file={iconFor(r)} />}
										{r.label}
									</span>
								</td>
								<td className={classes.num}>
									{r.m.wins}-{r.m.losses}
								</td>
								{allColumns.map((c) => (
									<td key={c.key} className={classes.num}>
										<ToneCell col={c} m={r.m} />
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{sorted.length > BREAKDOWN_ROWS && (
				<button type="button" className={base.btnDark} onClick={() => setAll(!all)} style={{ marginTop: 6 }}>
					{all ? 'Show fewer' : `Show all (${sorted.length})`}
				</button>
			)}
		</Section>
	)
}

const MatchesTable = ({ result }) => {
	const isPlayer = result.subject.type === 'player'
	const [sort, setSort] = useState({ key: 'date', dir: 'desc' })

	const rows = useMemo(() => {
		const getters = {
			date: (x) => x.date,
			tournament: (x) => x.tournament,
			map: (x) => x.map,
			opponent: (x) => x.opponent,
			score: (x) => x.rounds_own - x.rounds_opp,
			kad: (x) => x.k,
			rating: (x) => x.rating,
		}
		const get = getters[sort.key]
		const list = [...result.matches].sort((x, y) => {
			const a = get(x)
			const b = get(y)
			return typeof a === 'string' ? String(a ?? '').localeCompare(String(b ?? '')) : (a ?? -Infinity) - (b ?? -Infinity)
		})
		return sort.dir === 'desc' ? list.reverse() : list
	}, [result.matches, sort])

	const toggle = (key) => setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: ['tournament', 'map', 'opponent'].includes(key) ? 'asc' : 'desc' }))
	const mark = (key) => (sort.key === key ? (sort.dir === 'asc' ? ' ▲' : ' ▼') : '')
	const Th = ({ id, children, num }) => (
		<th className={`${classes.sortable} ${num ? classes.num : ''}`} onClick={() => toggle(id)}>
			{children}
			{mark(id)}
		</th>
	)

	return (
		<Section title={result.matches_truncated ? `Maps in the sample (latest ${result.matches.length})` : 'Maps in the sample'} count={result.totals.maps} defaultOpen={false}>
			{(
				<div className={classes.tableWrap}>
					<table className={base.table}>
						<thead>
							<tr>
								<Th id="date">Date</Th>
								<Th id="tournament">Tournament</Th>
								<Th id="map">Map</Th>
								<Th id="opponent">Opponent</Th>
								<Th id="score" num>Score</Th>
								{isPlayer && <Th id="kad" num>K-A-D</Th>}
								{isPlayer && <Th id="rating" num>Rating</Th>}
								<th></th>
							</tr>
						</thead>
						<tbody>
							{rows.map((m) => (
								<tr key={m.id}>
									<td>{m.date}</td>
									<td>{m.tournament}</td>
									<td>{m.map}</td>
									<td>{m.opponent}</td>
									<td className={`${classes.num} ${m.result === 'W' ? classes.win : m.result === 'L' ? classes.loss : ''}`}>
										{m.rounds_own}:{m.rounds_opp}
									</td>
									{isPlayer && (
										<td className={classes.num}>
											{m.k}-{m.a}-{m.d}
										</td>
									)}
									{isPlayer && (
										<td className={classes.num}>
											<ToneCell col={{ get: (x) => x.rating, show: f2, tone: TONES.rating }} m={m} />
										</td>
									)}
									<td>
										<a className={base.link} href={`${SITE}/matches/${encodeURIComponent(m.name_match_for_sort)}`} target="_blank" rel="noreferrer">
											open
										</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</Section>
	)
}

const SubjectResult = ({ result, icons }) => {
	const isPlayer = result.subject.type === 'player'
	const m = useMemo(() => metrics(result.totals), [result])

	return (
		<div className={classes.result}>
			<div className={classes.resultHead}>
				<Thumb kind={result.subject.type === 'player' ? 'player' : 'team'} file={isPlayer ? icons.player[result.subject.id] : icons.team[result.subject.id]} size={36} />
				<span className={classes.resultName}>{result.subject.name}</span>
				<span className={classes.badge}>{isPlayer ? 'Player' : 'Team'}</span>
				<span className={base.hint}>{m.maps} maps</span>
				{m.maps === 0 && <span className={classes.warn}>No maps match this context</span>}
				{m.maps > 0 && m.maps < SMALL_SAMPLE && <span className={classes.warn}>Small sample: numbers are noisy</span>}
			</div>

			{m.maps > 0 && (
				<>
					<Section title="Summary">
						<div className={classes.tiles}>
						{isPlayer ? (
							<>
								<Tile title="Rating" value={f2(m.rating)} tone={TONES.rating(m.rating)} />
								<Tile title="KD" value={f2(m.kd)} hint={`${m.k} / ${m.d}`} tone={TONES.kd(m.kd)} />
								<Tile title="KPR" value={f2(m.kpr)} tone={TONES.kpr(m.kpr)} />
								<Tile title="DPR" value={f2(m.dpr)} tone={TONES.dpr(m.dpr)} />
								<Tile title="Impact" value={f2(m.impact)} tone={TONES.impact(m.impact)} />
								<Tile title="K / A / D" value={`${m.k} / ${m.a} / ${m.d}`} />
								<Tile title="Maps W-L" value={`${m.wins}-${m.losses}`} hint={pct(m.winRate)} tone={TONES.winRate(m.winRate)} />
								<Tile title="Rounds" value={result.totals.rounds} hint={`${m.roundsWon}-${m.roundsLost} won-lost`} />
							</>
						) : (
							<>
								<Tile title="Maps W-L" value={`${m.wins}-${m.losses}`} hint={pct(m.winRate)} tone={TONES.winRate(m.winRate)} />
								<Tile title="Rounds W-L" value={`${m.roundsWon}-${m.roundsLost}`} hint={pct(m.roundWinRate)} tone={TONES.roundWinRate(m.roundWinRate)} />
								<Tile title="CT rounds won" value={pct(m.ctRate)} hint={`${result.totals.ct_won} / ${result.totals.ct_played}`} tone={TONES.ctRate(m.ctRate)} />
								<Tile title="T rounds won" value={pct(m.tRate)} hint={`${result.totals.t_won} / ${result.totals.t_played}`} tone={TONES.tRate(m.tRate)} />
								<Tile title="Team KD" value={f2(m.kd)} hint={`${m.k} / ${m.d}`} tone={TONES.teamKd(m.kd)} />
								<Tile title="Rounds played" value={result.totals.rounds} />
							</>
						)}
						</div>
					</Section>

					{!isPlayer && <Breakdown title="Players in the sample" rows={result.players} columns={PLAYER_COLUMNS} labelTitle="Player" iconKind="player" iconFor={(r) => icons.player[r.key]} />}
					<Breakdown title="By map" rows={result.by_map} columns={isPlayer ? PLAYER_COLUMNS : TEAM_COLUMNS} labelTitle="Map" />
					<Breakdown title="By tournament" rows={result.by_tournament} columns={isPlayer ? PLAYER_COLUMNS : TEAM_COLUMNS} labelTitle="Tournament" iconKind="tour" iconFor={(r) => icons.tour[r.key]} />
					<Breakdown title="By opponent" rows={result.by_opponent} columns={isPlayer ? PLAYER_COLUMNS : TEAM_COLUMNS} labelTitle="Opponent team" iconKind="team" iconFor={(r) => icons.team[r.key]} />
					<MatchesTable result={result} />
				</>
			)}
		</div>
	)
}

// Сравнение объектов одного типа в одной таблице
const Comparison = ({ results, icons }) => {
	const isPlayer = results[0].subject.type === 'player'
	const columns = isPlayer ? PLAYER_COLUMNS : TEAM_COLUMNS
	return (
		<div className={classes.result}>
			<Section title="Comparison" count={results.length}>
			<div className={classes.tableWrap}>
				<table className={base.table}>
					<thead>
						<tr>
							<th>{isPlayer ? 'Player' : 'Team'}</th>
							<th className={classes.num}>Maps</th>
							<th className={classes.num}>W-L</th>
							<th className={classes.num}>Win %</th>
							{columns.map((c) => (
								<th key={c.key} className={classes.num}>
									{c.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{results.map((r) => {
							const m = metrics(r.totals)
							return (
								<tr key={`${r.subject.type}-${r.subject.id}`}>
									<td>
										<span className={classes.option}>
											<Thumb kind={isPlayer ? 'player' : 'team'} file={isPlayer ? icons.player[r.subject.id] : icons.team[r.subject.id]} />
											{r.subject.name}
										</span>
									</td>
									<td className={classes.num}>{m.maps}</td>
									<td className={classes.num}>
										{m.wins}-{m.losses}
									</td>
									<td className={classes.num}>
										<ToneCell col={{ get: (x) => x.winRate, show: pct, tone: TONES.winRate }} m={m} />
									</td>
									{columns.map((c) => (
										<td key={c.key} className={classes.num}>
											<ToneCell col={c} m={m} />
										</td>
									))}
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			</Section>
		</div>
	)
}

/*----------------------Страница-----------------------------*/

const playerKey = (p) => p.player_id
const playerLabel = (p) => p.nickname
const teamKey = (t) => t.team_id
const teamLabel = (t) => t.name_team
const teamMatches = (t, q) => t.name_team?.toLowerCase().includes(q) || t.tag_team?.toLowerCase().includes(q)
const tourKey = (t) => t.name_tour_sort
const tourLabel = (t) => t.name_tour || t.name_tour_sort
const playerFile = (p) => p.logo_player
const teamFile = (t) => t.logo_team
const tourFile = (t) => t.logo_tour
const renderPlayerOption = withThumb('player', playerFile, playerLabel)
const renderTeamOption = withThumb('team', teamFile, teamLabel)
const renderTourOption = withThumb('tour', tourFile, tourLabel)

// Context: статистика игроков и команд по выборке карт (право 'stats'). Фильтры хранятся в адресе (?c=...), выборку можно отправить ссылкой
const ContextPage = () => {
	const [searchParams, setSearchParams] = useSearchParams()
	const players = useGetPlayersQuery()
	const teams = useGetTeamsQuery()
	const tours = useGetTournamentsQuery()
	const options = useGetStatsExplorerOptionsQuery()
	const [run, { isLoading }] = useRunStatsExplorerMutation()

	const [subjects, setSubjects] = useState([])
	const [filters, setFilters] = useState(EMPTY_FILTERS)
	const [results, setResults] = useState(null)
	const [error, setError] = useState('')

	const playerItems = useMemo(() => players.data ?? [], [players.data])
	const teamItems = useMemo(() => teams.data ?? [], [teams.data])
	const tourItems = useMemo(() => tours.data ?? [], [tours.data])
	const mapItems = options.data?.maps ?? []

	// Файлы картинок по ключам: игрок и команда по id, турнир по короткому имени
	const icons = useMemo(
		() => ({
			player: Object.fromEntries(playerItems.map((p) => [p.player_id, p.logo_player])),
			team: Object.fromEntries(teamItems.map((t) => [t.team_id, t.logo_team])),
			tour: Object.fromEntries(tourItems.map((t) => [t.name_tour_sort, t.logo_tour])),
		}),
		[playerItems, teamItems, tourItems],
	)

	const setFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))

	const execute = (subjectList, filterState) => {
		setError('')
		const payload = {
			subjects: subjectList,
			tournaments: filterState.tournaments,
			tiers: filterState.tiers,
			maps: filterState.maps,
			date_from: filterState.dateFrom || null,
			date_to: filterState.dateTo || null,
			player_teams: filterState.playerTeams,
			opponent_teams: filterState.opponentTeams,
			opponent_players: filterState.opponentPlayers,
			with_players: filterState.withPlayers,
		}
		run(payload)
			.unwrap()
			.then((res) => setResults(res.results))
			.catch((e) => {
				setResults(null)
				setError(errorMessage(e))
			})
	}

	const show = () => {
		if (!subjects.length) {
			setError('Add at least one player or team')
			return
		}
		setSearchParams({ c: JSON.stringify({ subjects, filters }) }, { replace: true })
		execute(subjects, filters)
	}

	// Выборка из ссылки: восстанавливаем фильтры и считаем сразу, один раз при открытии
	const restored = useRef(false)
	useEffect(() => {
		if (restored.current) return
		restored.current = true
		const raw = searchParams.get('c')
		if (!raw) return
		try {
			const saved = JSON.parse(raw)
			if (Array.isArray(saved.subjects) && saved.subjects.length) {
				const f = { ...EMPTY_FILTERS, ...(saved.filters || {}) }
				setSubjects(saved.subjects)
				setFilters(f)
				execute(saved.subjects, f)
			}
		} catch {
			// битая ссылка — открываем пустую страницу
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const reset = () => {
		setSubjects([])
		setFilters(EMPTY_FILTERS)
		setResults(null)
		setError('')
		setSearchParams({}, { replace: true })
	}

	const addSubject = (type, item) => {
		if (!item) return
		const id = type === 'player' ? item.player_id : item.team_id
		setSubjects((prev) => (prev.some((s) => s.type === type && s.id === id) || prev.length >= 8 ? prev : [...prev, { type, id }]))
	}

	const subjectLabel = (s) => {
		if (s.type === 'player') return playerItems.find((p) => p.player_id === s.id)?.nickname ?? `Player #${s.id}`
		return teamItems.find((t) => t.team_id === s.id)?.name_team ?? `Team #${s.id}`
	}

	const comparable = results && results.length > 1 && results.every((r) => r.subject.type === results[0].subject.type)

	return (
		<div className={`${base.card} ${base.page}`}>
			<div className={base.title}>Context</div>

			<div className={classes.panel}>
				<div className={classes.panelTitle}>Subjects (up to 8)</div>
				<div className={classes.grid}>
					<SearchSelect label="Add player" items={playerItems} value={null} getKey={playerKey} getLabel={playerLabel} renderItem={renderPlayerOption} onSelect={(p) => addSubject('player', p)} placeholder="Start typing a nickname" />
					<SearchSelect label="Add team" items={teamItems} value={null} getKey={teamKey} getLabel={teamLabel} renderItem={renderTeamOption} matches={teamMatches} onSelect={(t) => addSubject('team', t)} placeholder="Start typing a team name" />
				</div>
				{subjects.length > 0 && (
					<div className={classes.chips}>
						{subjects.map((s) => (
							<span key={`${s.type}-${s.id}`} className={classes.chip}>
								<Thumb kind={s.type === 'player' ? 'player' : 'team'} file={s.type === 'player' ? icons.player[s.id] : icons.team[s.id]} />
								{subjectLabel(s)}
								<button type="button" className={classes.chipX} onClick={() => setSubjects(subjects.filter((x) => !(x.type === s.type && x.id === s.id)))} aria-label="Remove">
									×
								</button>
							</span>
						))}
					</div>
				)}
			</div>

			<div className={classes.panel}>
				<div className={classes.panelTitle}>Filters</div>
				<div className={classes.grid}>
					<ChipPicker label="Tournaments" items={tourItems} getKey={tourKey} getLabel={tourLabel} renderItem={renderTourOption} getFile={tourFile} kind="tour" selected={filters.tournaments} onChange={(v) => setFilter('tournaments', v)} placeholder="Start typing an event" />
					<div>
						<div className={classes.label}>Date from</div>
						<input type="date" className={base.input} value={filters.dateFrom} max={filters.dateTo || undefined} onChange={(e) => setFilter('dateFrom', e.target.value)} />
					</div>
					<div>
						<div className={classes.label}>Date to</div>
						<input type="date" className={base.input} value={filters.dateTo} min={filters.dateFrom || undefined} onChange={(e) => setFilter('dateTo', e.target.value)} />
					</div>
				</div>
				<div>
					<div className={classes.label}>Tournament tier</div>
					<div className={classes.mapChips}>
						{TIERS.map((t) => {
							const on = filters.tiers.includes(t.key)
							return (
								<button key={t.key} type="button" className={`${classes.mapChip} ${on ? classes.mapChipOn : ''}`} onClick={() => setFilter('tiers', on ? filters.tiers.filter((x) => x !== t.key) : [...filters.tiers, t.key])}>
									{t.label}
								</button>
							)
						})}
					</div>
				</div>
				<div>
					<div className={classes.label}>Maps</div>
					<div className={classes.mapChips}>
						{mapItems.length === 0 && <span className={base.hint}>{options.isLoading ? 'Loading…' : 'No maps found'}</span>}
						{mapItems.map((m) => {
							const on = filters.maps.includes(m.map)
							return (
								<button key={m.map} type="button" className={`${classes.mapChip} ${on ? classes.mapChipOn : ''}`} onClick={() => setFilter('maps', on ? filters.maps.filter((x) => x !== m.map) : [...filters.maps, m.map])}>
									{m.map}
								</button>
							)
						})}
					</div>
				</div>
				<div className={classes.grid}>
					<ChipPicker
						label="Played for team (player's team on the map)"
						items={teamItems}
						getKey={teamKey}
						getLabel={teamLabel}
						renderItem={renderTeamOption}
						getFile={teamFile}
						matches={teamMatches}
						selected={filters.playerTeams}
						onChange={(v) => setFilter('playerTeams', v)}
						placeholder="Start typing a team name"
						kind="team"
					/>
					<ChipPicker
						label="Against teams"
						items={teamItems}
						getKey={teamKey}
						getLabel={teamLabel}
						renderItem={renderTeamOption}
						getFile={teamFile}
						matches={teamMatches}
						selected={filters.opponentTeams}
						onChange={(v) => setFilter('opponentTeams', v)}
						placeholder="Start typing a team name"
						kind="team"
					/>
					<ChipPicker
						label="Against players (in the opposing team)"
						items={playerItems}
						getKey={playerKey}
						getLabel={playerLabel}
						renderItem={renderPlayerOption}
						getFile={playerFile}
						selected={filters.opponentPlayers}
						onChange={(v) => setFilter('opponentPlayers', v)}
						placeholder="Start typing a nickname"
						kind="player"
					/>
					<ChipPicker
						label="Together with players (same team)"
						items={playerItems}
						getKey={playerKey}
						getLabel={playerLabel}
						renderItem={renderPlayerOption}
						getFile={playerFile}
						selected={filters.withPlayers}
						onChange={(v) => setFilter('withPlayers', v)}
						placeholder="Start typing a nickname"
						kind="player"
					/>
				</div>
				<div className={base.row}>
					<button className={`${base.btn} ${classes.actionBtn}`} onClick={show} disabled={isLoading}>
						{isLoading ? 'Calculating…' : 'Show stats'}
					</button>
					<button className={`${base.btnDark} ${classes.actionBtn}`} onClick={reset} disabled={isLoading}>
						Reset
					</button>
					{error && <span className={base.error}>{error}</span>}
				</div>
			</div>

			{results && (
				<div style={{ opacity: isLoading ? 0.5 : 1 }}>
					{comparable && <Comparison results={results} icons={icons} />}
					{results.map((r) => (
						<SubjectResult key={`${r.subject.type}-${r.subject.id}`} result={r} icons={icons} />
					))}
				</div>
			)}
		</div>
	)
}

export default ContextPage
