export default function GetCurrentDate () {
    const currentDate = new Date()

    const year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    let day = currentDate.getDate()

    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day

    return `${year}-${month}-${day}`
}