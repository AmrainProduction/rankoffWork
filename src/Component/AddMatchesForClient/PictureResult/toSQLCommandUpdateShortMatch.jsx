export default function toSQLCommandUpdateShortMatch(name, addedData, currentData) {
    let mainData = []
    let query = ""

    //проверяем, есть ли добавляемая карта в массиве добавленных
    const isIncluded = currentData.some(item =>
        Object.keys(addedData[0]).every(
            key => item.map === addedData[0].map
        )
    )

    const calculateScoreMatch = (data) => {
        let scoreT1 = 0
        let scoreT2 = 0

        data.map(e => {
            if (e.total_r_team1 > e.total_r_team2) {
                scoreT1++
            } else {
                scoreT2++
            }
        })

        query = "UPDATE short_matches SET total_score_match_t1=" + `${scoreT1}` + "," + " total_score_match_t2=" + `${scoreT2}` + " WHERE name_match_for_sort=" + "'" + `${name}` + "';"
        return query
    }

    if (currentData.length === 0 && isIncluded) {
        mainData = [...addedData]
        return calculateScoreMatch(mainData)
    } else if (!isIncluded) {
        mainData = [...addedData, ...currentData]
        return calculateScoreMatch(mainData)
    } else {
        return ("")
    }
}