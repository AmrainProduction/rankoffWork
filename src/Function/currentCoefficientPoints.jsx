export default function CurrentCoefficientPoints (dateNow, datePoints, points) {
    let resPoints = 0

    const start = new Date(datePoints);
    const end = new Date(dateNow);

    const yearsDifference = end.getFullYear() - start.getFullYear();
    const monthsDifference = end.getMonth() - start.getMonth();

    resPoints = points - (points * ((yearsDifference * 12 + monthsDifference)/10))

    if(resPoints < 0) {
        resPoints = 0
    }

    return resPoints.toFixed(5);
}