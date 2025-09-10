export const WhoWinPredict = (dataMatch, team) => {
	if (dataMatch) {
		if (dataMatch?.score_t1 !== null && dataMatch?.score_t2 !== null) {
			if (team === 'DrawScore.svg') {
				if (dataMatch?.score_t1 === dataMatch?.score_t2) {
					return '#00db0099'
				} else {
					return '#ff181899'
				}
			} else if (team === dataMatch?.logo_t1) {
				if (dataMatch?.score_t1 > dataMatch?.score_t2) {
					return '#00db0099'
				} else {
					return '#ff181899'
				}
			} else {
				if (team === dataMatch?.logo_t2) {
					if (dataMatch?.score_t2 > dataMatch?.score_t1) {
						return '#00db0099'
					} else {
						return '#ff181899'
					}
				} else {
					return ''
				}
			}
		} else {
			return ''
		}
	} else {
		return ''
	}
}
