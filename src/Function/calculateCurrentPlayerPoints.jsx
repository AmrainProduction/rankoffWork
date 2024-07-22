import GetCurrentDate from "./getCurrentDate";
import CurrentCoefficientPoints from "./currentCoefficientPoints";

export default function CalculateCurrentPlayerPoints (playerPoints) {
    let resPoints = 0

    const dateNow = GetCurrentDate()

    playerPoints.map(e => {
        resPoints += +CurrentCoefficientPoints(dateNow, e.date_accepted_points, e.points)
    })

    return resPoints
}