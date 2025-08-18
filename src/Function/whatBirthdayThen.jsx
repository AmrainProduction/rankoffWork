export default function WhatBirthdayThen (date, dateThen) {
    if (date === null || date === 0) {
        return "?"
    } else {

        const today = new Date(dateThen)
        const birth = new Date(date)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        return age
    }
}
