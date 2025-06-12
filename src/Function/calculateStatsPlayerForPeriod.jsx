import {useGetMatchesNecessaryPlayerQuery} from "../store/api/apiSlice";
import Kpr from "../Component/Formulas/kpr";
import Dpr from "../Component/Formulas/dpr";
import Rating from "../Component/Formulas/rating";

export default function CalculateStatsPlayerForPeriod(player, date, period) {

    const numberPlayer = [1, 2, 3, 4, 5]
    const numberTeam = [1, 2]

    const name = player?.nickname
    const endDate = date ? new Date(date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0]
    const timeInterval = period ? period : 90

    const matchesPlayer = useGetMatchesNecessaryPlayerQuery({name})

    const subtractDays = (dateEnd, days) => {
        const date = new Date(dateEnd)
        date.setDate(date.getDate() - days)

        return date.toISOString().split("T")[0]
    }

    const startDate = subtractDays(endDate, timeInterval)

    function filterMatchesByPeriod(matches, startDate, endDate) {
        const start = new Date(startDate)
        const end = new Date(endDate)

        return matches.filter((match) => {
            const matchDate = new Date(match.db_date_match)
            return matchDate > start && matchDate <= end
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

        const filteredMatchesPlayer = filterMatchesByPeriod(allMatchesPlayerReverse, startDate, endDate)

        // кастомная выборка турниров
        // let temp = []
        // allMatchesPlayerReverse.map(e => {
        //     if (e.name_tour_for_sort === "RushVTBCUPPro_13_02_25" || e.name_tour_for_sort === "WinlineEpicStandoff2Major2_25_11_24" ||
        //         e.name_tour_for_sort === "WinlineEpicStandoff2Major_10_07_24" || e.name_tour_for_sort === "GamesOfFuture_03_03_24"
        //     ) {
        //         temp.push(e)
        //     }
        // })

        filteredMatchesPlayer.map(e => {
            numberTeam.forEach(team => {
                numberPlayer.forEach(player => {
                    if(e[`t${team}p${player}`] === name) {
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
            let kd = (k / d)
            let kpr = Kpr(k, rounds)
            let dpr = Dpr(d, rounds)
            impact = impact / maps
            let rating = Rating(kd, kpr, dpr, impact)

            res.push({
                "kd": Math.round(kd * 100) / 100,
                "kpr": Math.round(kpr * 100) / 100,
                "dpr": Math.round(dpr * 100) / 100,
                "impact": Math.round(impact * 100) / 100,
                "rating": rating,
                "k": k,
                "a": a,
                "d": d,
                "w_rounds": rounds,
                "maps": maps,
                "photoPlayer": photoPlayer,
                "logoTeam": logoTeam,
            })
        }
    }

    return res
}