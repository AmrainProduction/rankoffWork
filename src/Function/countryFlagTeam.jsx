import React, {memo} from 'react';
import {findFlagUrlByCountryName} from "country-flags-svg";
import {useGetPlayersQuery} from "../store/api/apiSlice";

const CountryFlagTeam = (props) => {

    const {data} = useGetPlayersQuery()

    let style

    if(props.mode === "match") {
        style = {
            width: "100%",
            height: "auto",
            opacity: "0.4",
            margin: "0 auto",
        }
    } else if (props.mode === "team") {
        style = {
            marginLeft: "5px",
            width: "auto",
            height: "10px",
        }
    }

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
            if (data[i].nickname === props.p1 || data[i].nickname === props.p2 || data[i].nickname === props.p3 || data[i].nickname === props.p4 || data[i].nickname === props.p5) {
                if (data[i].country_flag) {
                    countries.push(data[i].country_flag)
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
                } else if (temp < 3 && (e1 === 'China' || e1 === 'Mongolia')) {
                    countDifferentCountryAsia++
                    if (countDifferentCountryAsia >= 3) {
                        nameCountry = "Asia"
                    }
                }
            })
        }
    }

    if (nameCountry && nameCountry !== "Europe") {
        return (
            <img style={style} src={`${findFlagUrlByCountryName(`${nameCountry}`)}`}
                 alt={`${nameCountry}`} title={`${nameCountry}`}/>
        )
    } else if (nameCountry === "Europe") {
        return (
            <img style={style} src={"/images/RegionsFlags/Europe.svg"}
                 alt={`${nameCountry}`} title={`${nameCountry}`}/>
        )
    } else if (nameCountry === "SouthAmerica") {
        return (
            <img style={style} src={"/images/RegionsFlags/SouthAmerica.svg"}
                 alt={`${nameCountry}`} title={`${nameCountry}`}/>
        )
    } else if (nameCountry === "Asia") {
        return (
            <img style={style} src={"/images/RegionsFlags/Asia.svg"}
                 alt={`${nameCountry}`} title={`${nameCountry}`}/>
        )
    } else {
        return (
            <div></div>
        )
    }


};

export default memo(CountryFlagTeam);