export default function formatDate(date) {
    const [year, month, day] = date.split('-');

    const shortYear = year.slice(-2);

    const formattedDate = `${day}.${month}.${shortYear}`;

    return formattedDate;
}