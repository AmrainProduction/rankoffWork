import React from 'react';
import {useGetPlayersQuery} from "../store/api/apiSlice";
import {findFlagUrlByCountryName} from "country-flags-svg";

const CountryFlagPlayer = (props) => {

    const {data} = useGetPlayersQuery()

    let style, styleDefault

    if(props.width) {
        style = {
            width: `${props.width}`, height: `${props.height}`, margin: `${props.margin}`
        }
    } else {
        style = {
            // width: "12px", height: "9px", marginRight: "5px"
        }
    }

    return (
        data?.filter(e => e.nickname === props.nickname).map((e, index) => {
            if (props.nickname === e.nickname) {
                return (
                    <img key={index} style={style}
                         src={`${findFlagUrlByCountryName(`${e.country_flag}`)}`}
                         alt='' title={`${e.country_flag}`} onError={(event) => event.target.style.display = 'none'}/>
                );
            }
        })
    )

};

export default CountryFlagPlayer;