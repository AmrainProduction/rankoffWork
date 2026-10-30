export default function Rating(kd, kpr, dpr, impact) {
	const rating = Math.round((kd * 0.5494 + kpr * 0.2167 + (1 - dpr) * 0.3409 + impact * 0.2354) * 100) / 100

	return rating
}
