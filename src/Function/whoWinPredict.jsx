export const WhoWinPredict = (dataMatch, team) => {
	if (dataMatch) {
		if (dataMatch?.score_t1 !== null && dataMatch?.score_t2 !== null) {
			if (team === 'DrawScore.svg') {
				if (dataMatch?.score_t1 === dataMatch?.score_t2) {
					return '#ff1818'
				} else {
					return '#00db00'
				}
			} else if (team === dataMatch?.logo_t1) {
				if (dataMatch?.score_t1 > dataMatch?.score_t2) {
					return '#ff1818'
				} else {
					return '#00db00'
				}
			} else {
				if (team === dataMatch?.logo_t2) {
					if (dataMatch?.score_t2 > dataMatch?.score_t1) {
						return '#ff1818'
					} else {
						return '#00db00'
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
