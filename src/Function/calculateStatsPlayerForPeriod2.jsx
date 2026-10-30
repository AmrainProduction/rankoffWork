import { useGetMatchesNecessaryPlayerQuery } from '../store/api/apiSlice'
import Kpr from '../Component/Formulas/kpr'
import Dpr from '../Component/Formulas/dpr'
import Rating from '../Component/Formulas/rating'

export default function CalculateStatsPlayerForPeriod2(player, startDate, endDate, period, map) {
	const numberPlayer = [1, 2, 3, 4, 5]
	const numberTeam = [1, 2]

	const name = player?.nickname
	const player_id = player?.player_id
	const endDateNew = endDate ? new Date(endDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
	const startDateNew = startDate ? new Date(startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
	const timeInterval = period ? period : 90

	const matchesPlayer = useGetMatchesNecessaryPlayerQuery({ name })

	const subtractDays = (dateEnd, days) => {
		const date = new Date(dateEnd)
		date.setDate(date.getDate() - days)

		return date.toISOString().split('T')[0]
	}

	const startDatePeriod = subtractDays(endDateNew, timeInterval)

	function filterMatchesByPeriod(matches, startDatePeriod, endDate) {
		const start = new Date(startDatePeriod)
		const end = new Date(endDate)

		return matches.filter((match) => {
			const matchDate = new Date(match.db_date_match)
			return matchDate >= start && matchDate <= end
		})
	}

	function filterMatchesFromStartToEnd(matches, startDate, endDate) {
		const start = new Date(startDate)
		const end = new Date(endDate)

		return matches.filter((match) => {
			const matchDate = new Date(match.db_date_match)
			return matchDate >= start && matchDate <= end
		})
	}

	let impact = 0
	let k = 0
	let a = 0
	let d = 0
	let maps = 0
	let rounds = 0
	let res = []
	let photoPlayer = ''
	let logoTeam = ''

	if (player && matchesPlayer.data && matchesPlayer.data.length > 0) {
		const allMatchesPlayerReverse = [...matchesPlayer.data]

		const filteredMatchesPlayer = period ? filterMatchesByPeriod(allMatchesPlayerReverse, startDatePeriod, endDateNew) : filterMatchesFromStartToEnd(allMatchesPlayerReverse, startDateNew, endDateNew)

		// кастомная выборка турниров
		// let temp = []
		// allMatchesPlayerReverse.map((e) => {
		// 	if (
		// 		e.name_tour_for_sort === 'WinlineEPICStandoff2CosmoMajor_04_06_25' ||
		// 		e.name_tour_for_sort === 'WinlineEpicStandoff2Major2_25_11_24' ||
		// 		e.name_tour_for_sort === 'WinlineEpicStandoff2Major_10_07_24' ||
		// 		e.name_tour_for_sort === 'WinlineEpicStandoff2Major_06_12_23' ||
		// 		e.name_tour_for_sort === 'Major_06_06_23'
		// 	) {
		// 		temp.push(e)
		// 	}
		// })

		let temp = []
		allMatchesPlayerReverse.map((e) => {
			if (e.name_match_for_sort === 'CYBERHEROSumerX_11_12_25' && e.map === 'Hanami') {
				temp.push(e)
			}
		})

		temp.map((e) => {
			numberTeam.forEach((team) => {
				numberPlayer.forEach((player) => {
					if (e[`t${team}p${player}_id`] === player_id) {
						impact += e[`t${team}p${player}_impact`]
						k += e[`t${team}p${player}_k`]
						a += e[`t${team}p${player}_a`]
						d += e[`t${team}p${player}_d`]
						photoPlayer = e[`t${team}p${player}_logo`]
						logoTeam = e[`team${team}_logo`]
						maps += 1
						rounds += e.total_r_team2 + e.total_r_team1
					}
				})
			})
		})

		if (k && d) {
			let kd = k / d
			let kpr = Kpr(k, rounds)
			let dpr = Dpr(d, rounds)
			impact = impact / maps
			let rating = Rating(kd, kpr, dpr, impact)

			res.push({
				kd: (Math.round(kd * 100) / 100).toFixed(2),
				kpr: (Math.round(kpr * 100) / 100).toFixed(2),
				dpr: (Math.round(dpr * 100) / 100).toFixed(2),
				impact: (Math.round(impact * 100) / 100).toFixed(2),
				rating: rating.toFixed(2),
				k: k,
				a: a,
				d: d,
				w_rounds: rounds,
				maps: maps,
				photoPlayer: photoPlayer,
				logoTeam: logoTeam,
			})
		}
	}

	return res
}
