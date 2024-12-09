
export default function toSQLCommandAddMatch (data) {
    let query = ""

    const convertedData = data.map(obj => {
        const updatedObj = {};

        for (let key in obj) {
            const value = obj[key];
            // Проверяем, что value не null или undefined и является числовой строкой
            updatedObj[key] = value != null && !isNaN(value) && value.toString().trim() !== ""
                ? Number(value)
                : value;
        }

        return updatedObj;
    })

    convertedData.forEach((match, index) => {
        Object.entries(match).forEach(([key, value]) => {
            if(typeof value === "string"){
                query += "'" + `${value}` + "',"
            } else {
                query +=  + `${value}` + ","
            }
        })
    })

    query = query.slice(0, -1)

    let startQuery = "INSERT INTO matches(name_tour_for_sort, name_match_for_sort, name_tour, db_date_match, link_match, map, map_pick, team1, team2, team1_id, team2_id, team1_logo, team2_logo, total_r_team1, total_r_team2, half1_team1, half1_team2, half2_team1, half2_team2, start_side_team1, start_side_team2, t1p1, t1p2, t1p3, t1p4, t1p5, t2p1, t2p2, t2p3, t2p4, t2p5, t1p1_logo, t1p2_logo, t1p3_logo, t1p4_logo, t1p5_logo, t2p1_logo, t2p2_logo, t2p3_logo, t2p4_logo, t2p5_logo, t1p1_id, t1p2_id, t1p3_id, t1p4_id, t1p5_id, t2p1_id, t2p2_id, t2p3_id, t2p4_id, t2p5_id, t1p1_kd, t1p2_kd, t1p3_kd, t1p4_kd, t1p5_kd, t2p1_kd, t2p2_kd, t2p3_kd, t2p4_kd, t2p5_kd, t1p1_k, t1p2_k, t1p3_k, t1p4_k, t1p5_k, t2p1_k, t2p2_k, t2p3_k, t2p4_k, t2p5_k, t1p1_a, t1p2_a, t1p3_a, t1p4_a, t1p5_a, t2p1_a, t2p2_a, t2p3_a, t2p4_a, t2p5_a, t1p1_d, t1p2_d, t1p3_d, t1p4_d, t1p5_d, t2p1_d, t2p2_d, t2p3_d, t2p4_d, t2p5_d, t1p1_impact, t1p2_impact, t1p3_impact, t1p4_impact, t1p5_impact, t2p1_impact, t2p2_impact, t2p3_impact, t2p4_impact, t2p5_impact, t1p1_rating, t1p2_rating, t1p3_rating, t1p4_rating, t1p5_rating, t2p1_rating, t2p2_rating, t2p3_rating, t2p4_rating, t2p5_rating) VALUES (" + query + ");"

    return startQuery
}