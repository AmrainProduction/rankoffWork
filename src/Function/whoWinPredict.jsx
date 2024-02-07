export const WhoWinPredict = (dataMatch, team) => {
    dataMatch = dataMatch?.filter(e => e.logo_t1 === team || e.logo_t2 === team)
    if (dataMatch.length > 0) {
        if (dataMatch[0]?.score_t1 !== null && dataMatch[0]?.score_t2 !== null) {
            if (team === dataMatch[0]?.logo_t1) {
                if (dataMatch[0]?.score_t1 > dataMatch[0]?.score_t2) {
                    return "#528347"
                } else {
                    return "#854141"
                }
            } else {
                if (team === dataMatch[0]?.logo_t2) {
                    if (dataMatch[0]?.score_t2 > dataMatch[0]?.score_t1) {
                        return "#528347"
                    } else {
                        return "#854141"
                    }
                } else {
                    return ""
                }
            }
        } else {
            return ""
        }
    } else {
        return ""
    }
}

