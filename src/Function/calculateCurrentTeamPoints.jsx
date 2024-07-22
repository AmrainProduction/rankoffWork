import GetCurrentDate from "./getCurrentDate";
import CurrentCoefficientPoints from "./currentCoefficientPoints";

export default function CalculateCurrentTeamPoints (teamPoints) {
    let resPoints = 0

    const dateNow = GetCurrentDate()

    teamPoints.map(e => {
        resPoints += +CurrentCoefficientPoints(dateNow, e.date_accepted_points, e.points)
    })

    return resPoints
}