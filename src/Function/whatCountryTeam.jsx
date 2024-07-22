

export default function WhatCountryTeam (data, p1, p2, p3, p4, p5) {

    let countries = []
    let countCountries = []
    let max = 0
    let nameCountry
    let countDifferentCountryEU = 0
    let countDifferentCountrySA = 0
    // let countDifferentCountryNA = 0
    let countDifferentCountryAsia = 0
    // let countDifferentCountryOceania = 0

    if (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].nickname === p1 || data[i].nickname === p2 || data[i].nickname === p3 || data[i].nickname === p4 || data[i].nickname === p5) {
                if (data[i].country_flag) {
                    countries.push(data[i].country_flag.replace(" ", ""))
                }
            }
        }

        if (countries.length > 0) {
            countries.reduce((acc, el) => {
                countCountries[el] = (countCountries[el] || 0) + 1;
                return countCountries;
            }, {})

            countries = countries.filter((item, index) => {
                return countries.indexOf(item) === index
            })

            countries.map(e1 => {
                let temp = eval(`countCountries.${e1}`)

                if (temp > max && temp >= 3) {
                    max = temp
                    nameCountry = e1

                } else if (temp < 3 && (e1 === 'Kazakhstan' || e1 === 'Russia' || e1 === 'Ukraine' || e1 === 'Georgia' || e1 === 'Moldova' || e1 === 'Belarus' || e1 === 'Czech Republic' || e1 === 'Denmark' || e1 === 'Finland'
                    || e1 === 'France' || e1 === 'Germany' || e1 === 'Hungary' || e1 === 'Norway' || e1 === 'Poland' || e1 === 'Portugal' || e1 === 'Sweden' || e1 === 'United Kingdom')) {
                    countDifferentCountryEU++
                    if (countDifferentCountryEU >= 3) {
                        nameCountry = "Europe"
                    }
                } else if (temp < 3 && (e1 === 'Argentina' || e1 === 'Brazil')) {
                    countDifferentCountrySA++
                    if (countDifferentCountrySA >= 3) {
                        nameCountry = "SouthAmerica"
                    }
                } else if (temp < 3 && (e1 === 'China' || e1 === 'Mongolia' || e1 === 'South Korea')) {
                    countDifferentCountryAsia++
                    if (countDifferentCountryAsia >= 3) {
                        nameCountry = "Asia"
                    }
                } else if (temp < 3 && (countDifferentCountryEU > countDifferentCountryAsia || countDifferentCountryEU > countDifferentCountrySA)) {
                    nameCountry = "Europe"
                }
            })
        }
    }

    if (nameCountry && nameCountry !== "Europe") {
        return (
            nameCountry
        )
    } else if (nameCountry === "Europe") {
        return (
            nameCountry
        )
    } else if (nameCountry === "SouthAmerica") {
        return (
            nameCountry
        )
    } else if (nameCountry === "Asia") {
        return (
            nameCountry
        )
    } else {
        return (
            ""
        )
    }


};