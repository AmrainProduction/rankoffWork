import React from 'react';
import {useGetAwardsQuery, useGetPlayersQuery} from "../store/api/apiSlice";

const GetTopPlayersByMvpEvp = () => {

    const awardsPlayers = useGetAwardsQuery()
    const allPlayers = useGetPlayersQuery()
    let res = []
    let EVP = 0
    let MVP = 0

    if (awardsPlayers.data && awardsPlayers.data.length > 0 && allPlayers.data && allPlayers.data.length > 0) {
        allPlayers.data.map((p, index) => {
            awardsPlayers.data.filter(e => e.player_id === p.player_id
                && e.name_tour_sort !== "WinlineEpicStandoff2Season10CloseQuals_27_05_24"
                && e.name_tour_sort !== "WinlineEpicStandoff2MajorClosedQuals_21_06_24"
                && e.name_tour_sort !== "WinlineEpicStandoff2Season9ClosedQuals_22_04_24"
                && e.name_tour_sort !== "WinlineEpicStandoff2Season8ClosedQuals_25_03_24").map(a => {
                if (a.logo_award === "EVP.png") {
                    EVP++
                } else if (a.logo_award === "MVP.png") {
                    MVP++
                }
            })

            res[index] = {
                "player_id": p.player_id,
                "nickname": p.nickname,
                "logo": p.logo_player,
                "country": p.country_flag,
                "MVP": MVP,
                "EVP": EVP,
            }

            MVP = 0
            EVP = 0
        })
    }

    res = res.sort((a, b) => {
        return parseFloat(b.MVP + b.EVP) - parseFloat(a.MVP + a.EVP)
    })

    console.log(res.slice(0, 20))


    return (
        <div>

        </div>
    );
};

export default GetTopPlayersByMvpEvp;