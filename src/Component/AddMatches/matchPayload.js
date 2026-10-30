// Данные карты для сервера (POST /admin/matches). Из собранной строки resultData[0] берутся только результаты:
// турнир, команды, ники и фото сервер подставляет сам по названию матча и id игроков.
const SLOTS = ['t1p1', 't1p2', 't1p3', 't1p4', 't1p5', 't2p1', 't2p2', 't2p3', 't2p4', 't2p5']

export const toMatchPayload = (row) => ({
	name_match_for_sort: row.name_match_for_sort,
	map: row.map,
	map_pick: row.map_pick,
	start_side_team1: row.start_side_team1,
	half1_team1: row.half1_team1,
	half1_team2: row.half1_team2,
	half2_team1: row.half2_team1,
	half2_team2: row.half2_team2,
	players: Object.fromEntries(
		SLOTS.map((slot) => [
			slot,
			{
				player_id: row[`${slot}_id`],
				k: row[`${slot}_k`],
				a: row[`${slot}_a`],
				d: row[`${slot}_d`],
				impact: row[`${slot}_impact`],
				rating: row[`${slot}_rating`],
			},
		]),
	),
})

// Текст ошибки запроса к серверу
export const matchApiError = (error) => {
	if (!error) return ''
	if (error.status === 401) return 'Session expired — reload the page and sign in again'
	if (error.status === 403) return error.data?.message || 'No access to this tournament'
	return error.data?.message || 'Request failed, try again'
}
