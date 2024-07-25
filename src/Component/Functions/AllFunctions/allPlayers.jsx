import React from 'react';
import {useGetPlayersQuery} from "../../../store/api/apiSlice";
import classes from "../functions.module.css";
import exportFromJSON from "export-from-json";

const AllPlayers = () => {

    let res
    let arrP = []

    const players = useGetPlayersQuery()

    const onExportLocal = (data) => {
        const fileName = "players"
        const exportType = exportFromJSON.types.csv
        exportFromJSON({data, fileName, exportType, delimiter: ';'})
    }

    if (players.data && players.data.length > 0) {

        players.data.map(e => {
            arrP.push({
                "logo": e.logo_player,
                "nickname": e.nickname,
                "player_id": e.player_id,
            })
        })

        res = JSON.stringify(arrP)

        return (
            <div className={classes.wrapperStatsPlayersTour}>
                <div className={classes.actionButtons}>
                    <div className={classes.tour} onClick={e => {
                        navigator.clipboard.writeText(res.length > 0 ? res : "").then(() => {
                            console.log('Copy good')
                        }, () => {
                            console.log('Fail copy')
                        })
                    }}>
                        Copy
                    </div>
                    <div className={classes.tour} onClick={() => onExportLocal(arrP)}>Download CSV</div>
                </div>
                <div className={classes.resultCommand}>
                    {res.length > 0 ? res : ""}
                </div>
            </div>
        )
    }
};

export default AllPlayers;