export default function PlayerPointsApproved(players) {

    let maxMaps = 0
    let minLimit = 0
    let approvedPlayers = []

    players.map(e => {
        if (e.maps > maxMaps) {
            maxMaps = e.maps
        }
    })

    // получаем минимально необходимы порог по картам для начисления очков (>= 50% сыгранных карты за турнир, если меньше, то очков игрок не получает)
    minLimit = maxMaps * 0.5

    // даем на выход из функции только тех игроков, кому можно начислить очки за турнир
    players.map(e => {
        if (e.maps >= minLimit) {
            approvedPlayers.push(e)
        }
    })

    return approvedPlayers
}

