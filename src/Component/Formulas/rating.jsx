export default function Rating(kd, kpr, dpr, impact) {

    const rating = Math.round(((kd * 0.5394) + (kpr * 0.2067) + ((1 - dpr) * 0.3409) + (impact * 0.2054)) * 100) / 100

    return rating
}