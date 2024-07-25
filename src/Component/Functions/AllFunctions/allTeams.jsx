import React from 'react';
import {useGetTeamsQuery} from "../../../store/api/apiSlice";
import classes from "../functions.module.css";
import exportFromJSON from "export-from-json";

const AllTeams = () => {

    let res
    let arrT = []

    const teams = useGetTeamsQuery()

    const onExportLocal = (data) => {
        const fileName = "teams"
        const exportType = exportFromJSON.types.csv
        exportFromJSON({data, fileName, exportType, delimiter: ';'})
    }

    if (teams.data && teams.data.length > 0) {

        teams.data.map(e => {
            arrT.push({
                "name": e.name_team,
                "logo": e.logo_team,
                "id": e.team_id,
            })
        })

        res = JSON.stringify(arrT)

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
                    <div className={classes.tour} onClick={() => onExportLocal(arrT)}>Download CSV</div>
                </div>
                <div className={classes.resultCommand}>
                    {res.length > 0 ? res : ""}
                </div>
            </div>
        )
    }
};

export default AllTeams;