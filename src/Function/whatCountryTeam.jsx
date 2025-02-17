import {findFlagUrlByCountryName} from "country-flags-svg";
import React from "react";


export default function WhatCountryTeam (data, p1, p2, p3, p4, p5) {

    let countries = []
    let countCountries = []
    let max = 0
    let nameCountry
    let countDifferentCountryEU = 0
    let countDifferentCountrySA = 0
    let countDifferentCountryNA = 0
    let countDifferentCountryAsia = 0
    let countDifferentCountryOceania = 0
    let countDifferentCountryAfrica = 0

    const AfricaCountries = ["Nigeria", "Egypt", "South Africa", "Kenya", "Angola", "Botswana", "Chad", "Congo", "Equatorial Guinea", "Ethiopia",
        "Ghana", "Guinea", "Liberia", "Libya", "Madagascar", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "Senegal", "Somalia",
        "Sudan", "Swaziland", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"]
    const EuropeCountries = ['Kazakhstan', 'Russia', 'Ukraine', 'Georgia', 'Moldova', 'Belarus', 'Czech Republic', 'Denmark', 'Finland',
        'France', 'Germany', 'Hungary', 'Norway', 'Poland', 'Portugal', 'Sweden', 'United Kingdom', "Albania", "Andorra", "Austria",
        "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Estonia", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia",
        "Liechtenstein", "Lithuania", "Luxembourg", "Former Yugoslav Republic of Macedonia", "Malta", "Monaco", "Montenegro", "Netherlands", "Romania",
        "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Switzerland", "Vatikan City"]
    const AsiaCountries = ["China", "India", "Japan", "South Korea", "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan",
        "Brunei", "Cambodia", "Indonesia", "Iran", "Iraq", "Israel", "Jordan", "Kyrgyzstan", "Malaysia", "Mongolia", "North Korea", "Philippines",
        "Qatar", "Saudi Arabia", "Tajikistan", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"]
    const NorthAmericaCountries = ["USA", "Canada", "Mexico", "Cuba", "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Costa Rica",
        "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Nicaragua", "Panama",
        "St. Kitts and Nevis", "St. Lucia", "St. Vincent and the Grenadines", "Trinidad and Tobago"]
    const SouthAmericaCountries = ["Brazil", "Argentina", "Chile", "Colombia", "Venezuela", "Uruguay", "Suriname", "Peru", "Paraguay", "Guyana", "Ecuador", "Bolivia"]
    const OceaniaCountries = ["Australia", "New Zealand", "Fiji", "Papua New Guinea", "Kiribati", "Micronesia", "Marshall Islands", "Nauru", "Palau", "Samoa",
        "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"]

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
                let temp = countCountries[`${e1}`]

                if (temp > max && temp >= 3) {
                    max = temp
                    nameCountry = e1

                } else if (temp < 3 && EuropeCountries.includes(e1)) {
                    countDifferentCountryEU++
                    if (countDifferentCountryEU >= 3) {
                        nameCountry = "Europe"
                    }
                } else if (temp < 3 && SouthAmericaCountries.includes(e1)) {
                    countDifferentCountrySA++
                    if (countDifferentCountrySA >= 3) {
                        nameCountry = "SouthAmerica"
                    }
                } else if (temp < 3 && NorthAmericaCountries.includes(e1)) {
                    countDifferentCountryNA++
                    if (countDifferentCountryNA >= 3) {
                        nameCountry = "NorthAmerica"
                    }
                } else if (temp < 3 && AsiaCountries.includes(e1)) {
                    countDifferentCountryAsia++
                    if (countDifferentCountryAsia >= 3) {
                        nameCountry = "Asia"
                    }
                } else if (temp < 3 && OceaniaCountries.includes(e1)) {
                    countDifferentCountryOceania++
                    if (countDifferentCountryOceania >= 3) {
                        nameCountry = "Oceania"
                    }
                } else if (temp < 3 && AfricaCountries.includes(e1)) {
                    countDifferentCountryAfrica++
                    if (countDifferentCountryAfrica >= 3) {
                        nameCountry = "Africa"
                    }
                } else if (temp < 3 && (
                    countDifferentCountryEU > countDifferentCountrySA ||
                    countDifferentCountryEU > countDifferentCountryNA ||
                    countDifferentCountryEU > countDifferentCountryAsia ||
                    countDifferentCountryEU > countDifferentCountryOceania ||
                    countDifferentCountryEU > countDifferentCountryAfrica
                )) {
                    nameCountry = "Europe"
                } else if (temp < 3 && (
                    countDifferentCountrySA > countDifferentCountryEU ||
                    countDifferentCountrySA > countDifferentCountryNA ||
                    countDifferentCountrySA > countDifferentCountryAsia ||
                    countDifferentCountrySA > countDifferentCountryOceania ||
                    countDifferentCountrySA > countDifferentCountryAfrica
                )) {
                    nameCountry = "SouthAmerica"
                } else if (temp < 3 && (
                    countDifferentCountryNA > countDifferentCountryEU ||
                    countDifferentCountryNA > countDifferentCountrySA ||
                    countDifferentCountryNA > countDifferentCountryAsia ||
                    countDifferentCountryNA > countDifferentCountryOceania ||
                    countDifferentCountryNA > countDifferentCountryAfrica
                )) {
                    nameCountry = "NorthAmerica"
                } else if (temp < 3 && (
                    countDifferentCountryAsia > countDifferentCountryEU ||
                    countDifferentCountryAsia > countDifferentCountrySA ||
                    countDifferentCountryAsia > countDifferentCountryNA ||
                    countDifferentCountryAsia > countDifferentCountryOceania ||
                    countDifferentCountryAsia > countDifferentCountryAfrica
                )) {
                    nameCountry = "Asia"
                } else if (temp < 3 && (
                    countDifferentCountryOceania > countDifferentCountryEU ||
                    countDifferentCountryOceania > countDifferentCountrySA ||
                    countDifferentCountryOceania > countDifferentCountryNA ||
                    countDifferentCountryOceania > countDifferentCountryAsia ||
                    countDifferentCountryOceania > countDifferentCountryAfrica
                )) {
                    nameCountry = "Oceania"
                } else if (temp < 3 && (
                    countDifferentCountryAfrica > countDifferentCountryEU ||
                    countDifferentCountryAfrica > countDifferentCountrySA ||
                    countDifferentCountryAfrica > countDifferentCountryNA ||
                    countDifferentCountryAfrica > countDifferentCountryAsia ||
                    countDifferentCountryAfrica > countDifferentCountryOceania
                )) {
                    nameCountry = "Africa"
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
    } else if (nameCountry === "NorthAmerica") {
        return (
            nameCountry
        )
    } else if (nameCountry === "Asia") {
        return (
            nameCountry
        )
    } else if (nameCountry === "Oceania") {
        return (
            nameCountry
        )
    } else if (nameCountry === "Africa") {
        return (
            nameCountry
        )
    } else {
        return (
            ""
        )
    }
};