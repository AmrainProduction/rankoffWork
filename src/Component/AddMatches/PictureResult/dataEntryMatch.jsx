import React, {createRef, useCallback, useEffect, useState} from 'react';
import classes from "./dataEntryMatch.module.css";
import {
    useGetMatchesByNameQuery,
    useGetPlayersQuery,
    useGetShortMatchByNameQuery,
    useGetShortMatchQuery,
    useGetTeamsQuery
} from "../../../store/api/apiSlice";
import PictureResult2 from "../../MatchPicture2/PictureResult/pictureResult2";
import toSQLCommandAddMatch from "./toSQLCommandAddMatch";
import {toJpeg} from "html-to-image";
import toSQLCommandUpdateShortMatch from "./toSQLCommandUpdateShortMatch";
import Impact from "../../Formulas/impact";
import Rating from "../../Formulas/rating";

const DataEntryMatch = (props) => {
    const name = props.match_id

    const players = useGetPlayersQuery()
    const teams = useGetTeamsQuery()
    const shortMatches = useGetShortMatchByNameQuery({name})
    const currentMatch = useGetMatchesByNameQuery({name})

    let resultData = []

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${name}.jpg`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    const [choiceMap, setChoiceMap] = useState(null);
    const [selectedSide, setSelectedSide] = useState('');
    const [pickMap, setPickMap] = useState('');

    // проверка на то, что получаемый после ввода данных о матче массив заполнен полностью
    const [isValidData, setIsValidData] = useState(false)

    useEffect(() => {

        const isDataValid = resultData?.every(item => {
            return Object.values(item).every(value => value !== null && value !== '' && value !== "NaN")
        })

        setIsValidData(isDataValid)

    }, [resultData])

    // Обработчик для изменения значения
    const handlePickMap = (event) => {
        setPickMap(event.target.value);
    };

    // Обработчик для изменения значения
    const handleChangeSide = (event) => {
        setSelectedSide(event.target.value);
    };

    // Обработчик полей ввода инфы о матче
    const [matchInfo, setMatchInfo] = useState({
        half1_team1: '',
        half1_team2: '',
        half2_team1: '',
        half2_team2: '',
        t1p1: '',
        t1p2: '',
        t1p3: '',
        t1p4: '',
        t1p5: '',
        t2p1: '',
        t2p2: '',
        t2p3: '',
        t2p4: '',
        t2p5: '',
        t1p1_id: '',
        t1p2_id: '',
        t1p3_id: '',
        t1p4_id: '',
        t1p5_id: '',
        t2p1_id: '',
        t2p2_id: '',
        t2p3_id: '',
        t2p4_id: '',
        t2p5_id: '',
        t1p1_logo: '',
        t1p2_logo: '',
        t1p3_logo: '',
        t1p4_logo: '',
        t1p5_logo: '',
        t2p1_logo: '',
        t2p2_logo: '',
        t2p3_logo: '',
        t2p4_logo: '',
        t2p5_logo: '',
        t1p1_kd: '',
        t1p2_kd: '',
        t1p3_kd: '',
        t1p4_kd: '',
        t1p5_kd: '',
        t2p1_kd: '',
        t2p2_kd: '',
        t2p3_kd: '',
        t2p4_kd: '',
        t2p5_kd: '',
        t1p1_k: '',
        t1p2_k: '',
        t1p3_k: '',
        t1p4_k: '',
        t1p5_k: '',
        t2p1_k: '',
        t2p2_k: '',
        t2p3_k: '',
        t2p4_k: '',
        t2p5_k: '',
        t1p1_a: '',
        t1p2_a: '',
        t1p3_a: '',
        t1p4_a: '',
        t1p5_a: '',
        t2p1_a: '',
        t2p2_a: '',
        t2p3_a: '',
        t2p4_a: '',
        t2p5_a: '',
        t1p1_d: '',
        t1p2_d: '',
        t1p3_d: '',
        t1p4_d: '',
        t1p5_d: '',
        t2p1_d: '',
        t2p2_d: '',
        t2p3_d: '',
        t2p4_d: '',
        t2p5_d: '',
        t1p1_impact: '',
        t1p2_impact: '',
        t1p3_impact: '',
        t1p4_impact: '',
        t1p5_impact: '',
        t2p1_impact: '',
        t2p2_impact: '',
        t2p3_impact: '',
        t2p4_impact: '',
        t2p5_impact: '',
        t1p1_rating: '',
        t1p2_rating: '',
        t1p3_rating: '',
        t1p4_rating: '',
        t1p5_rating: '',
        t2p1_rating: '',
        t2p2_rating: '',
        t2p3_rating: '',
        t2p4_rating: '',
        t2p5_rating: '',
    });

    // Универсальный обработчик изменения значений полей инфы о матче
    const handleChangeInfoMatch = (event) => {
        const {name, value} = event.target;
        // Обновляем только изменённое поле
        setMatchInfo({
            ...matchInfo,
            [name]: value,
        });
    };

    if (players.data && players.data.length > 0 && teams.data && teams.data.length > 0 && shortMatches.data && shortMatches.data.length > 0) {

        let team1Data = teams.data.find(team => team.team_id === shortMatches.data[0].team1_id)
        let team2Data = teams.data.find(team => team.team_id === shortMatches.data[0].team2_id)

        let t1p1Data = players.data.find(player => player.nickname === (matchInfo.t1p1 ? matchInfo.t1p1 : matchInfo.t1p1 = team1Data.player_1))
        let t1p2Data = players.data.find(player => player.nickname === (matchInfo.t1p2 ? matchInfo.t1p2 : matchInfo.t1p2 = team1Data.player_2))
        let t1p3Data = players.data.find(player => player.nickname === (matchInfo.t1p3 ? matchInfo.t1p3 : matchInfo.t1p3 = team1Data.player_3))
        let t1p4Data = players.data.find(player => player.nickname === (matchInfo.t1p4 ? matchInfo.t1p4 : matchInfo.t1p4 = team1Data.player_4))
        let t1p5Data = players.data.find(player => player.nickname === (matchInfo.t1p5 ? matchInfo.t1p5 : matchInfo.t1p5 = team1Data.player_5))
        let t2p1Data = players.data.find(player => player.nickname === (matchInfo.t2p1 ? matchInfo.t2p1 : matchInfo.t2p1 = team2Data.player_1))
        let t2p2Data = players.data.find(player => player.nickname === (matchInfo.t2p2 ? matchInfo.t2p2 : matchInfo.t2p2 = team2Data.player_2))
        let t2p3Data = players.data.find(player => player.nickname === (matchInfo.t2p3 ? matchInfo.t2p3 : matchInfo.t2p3 = team2Data.player_3))
        let t2p4Data = players.data.find(player => player.nickname === (matchInfo.t2p4 ? matchInfo.t2p4 : matchInfo.t2p4 = team2Data.player_4))
        let t2p5Data = players.data.find(player => player.nickname === (matchInfo.t2p5 ? matchInfo.t2p5 : matchInfo.t2p5 = team2Data.player_5))

        let allK = +matchInfo.t1p1_k + +matchInfo.t1p2_k + +matchInfo.t1p3_k + +matchInfo.t1p4_k + +matchInfo.t1p5_k + +matchInfo.t2p1_k + +matchInfo.t2p2_k + +matchInfo.t2p3_k + +matchInfo.t2p4_k + +matchInfo.t2p5_k
        let allA = +matchInfo.t1p1_a + +matchInfo.t1p2_a + +matchInfo.t1p3_a + +matchInfo.t1p4_a + +matchInfo.t1p5_a + +matchInfo.t2p1_a + +matchInfo.t2p2_a + +matchInfo.t2p3_a + +matchInfo.t2p4_a + +matchInfo.t2p5_a
        let allRounds = (+matchInfo.half1_team1 + (+matchInfo.half2_team1 - +matchInfo.half1_team1)) + (+matchInfo.half1_team2 + (+matchInfo.half2_team2 - +matchInfo.half1_team2))

        resultData = [{
            name_tour_for_sort: shortMatches.data[0].name_tour_sort,
            name_match_for_sort: shortMatches.data[0].name_match_for_sort,
            name_tour: shortMatches.data[0].name_tour,
            db_date_match: shortMatches.data[0].date_match,
            link_match: shortMatches.data[0].link_match,
            map: choiceMap,
            map_pick: pickMap,
            team1: shortMatches.data[0].team1,
            team2: shortMatches.data[0].team2,
            team1_id: shortMatches.data[0].team1_id,
            team2_id: shortMatches.data[0].team2_id,
            team1_logo: shortMatches.data[0].logo_t1,
            team2_logo: shortMatches.data[0].logo_t2,
            total_r_team1: (+matchInfo.half1_team1 + (+matchInfo.half2_team1 - matchInfo.half1_team1)),
            total_r_team2: (+matchInfo.half1_team2 + (+matchInfo.half2_team2 - matchInfo.half1_team2)),
            half1_team1: +matchInfo.half1_team1,
            half1_team2: +matchInfo.half1_team2,
            half2_team1: (+matchInfo.half2_team1 - matchInfo.half1_team1),
            half2_team2: (+matchInfo.half2_team2 - matchInfo.half1_team2),
            start_side_team1: selectedSide,
            start_side_team2: selectedSide === "CT" ? "T" : "CT",
            t1p1: matchInfo.t1p1,
            t1p2: matchInfo.t1p2,
            t1p3: matchInfo.t1p3,
            t1p4: matchInfo.t1p4,
            t1p5: matchInfo.t1p5,
            t2p1: matchInfo.t2p1,
            t2p2: matchInfo.t2p2,
            t2p3: matchInfo.t2p3,
            t2p4: matchInfo.t2p4,
            t2p5: matchInfo.t2p5,
            t1p1_logo: t1p1Data?.logo_player,
            t1p2_logo: t1p2Data?.logo_player,
            t1p3_logo: t1p3Data?.logo_player,
            t1p4_logo: t1p4Data?.logo_player,
            t1p5_logo: t1p5Data?.logo_player,
            t2p1_logo: t2p1Data?.logo_player,
            t2p2_logo: t2p2Data?.logo_player,
            t2p3_logo: t2p3Data?.logo_player,
            t2p4_logo: t2p4Data?.logo_player,
            t2p5_logo: t2p5Data?.logo_player,
            t1p1_id: +t1p1Data.player_id,
            t1p2_id: +t1p2Data.player_id,
            t1p3_id: +t1p3Data.player_id,
            t1p4_id: +t1p4Data.player_id,
            t1p5_id: +t1p5Data.player_id,
            t2p1_id: +t2p1Data.player_id,
            t2p2_id: +t2p2Data.player_id,
            t2p3_id: +t2p3Data.player_id,
            t2p4_id: +t2p4Data.player_id,
            t2p5_id: +t2p5Data.player_id,
            t1p1_kd: +(+matchInfo.t1p1_k / +matchInfo.t1p1_d).toFixed(2),
            t1p2_kd: +(+matchInfo.t1p2_k / +matchInfo.t1p2_d).toFixed(2),
            t1p3_kd: +(+matchInfo.t1p3_k / +matchInfo.t1p3_d).toFixed(2),
            t1p4_kd: +(+matchInfo.t1p4_k / +matchInfo.t1p4_d).toFixed(2),
            t1p5_kd: +(+matchInfo.t1p5_k / +matchInfo.t1p5_d).toFixed(2),
            t2p1_kd: +(+matchInfo.t2p1_k / +matchInfo.t2p1_d).toFixed(2),
            t2p2_kd: +(+matchInfo.t2p2_k / +matchInfo.t2p2_d).toFixed(2),
            t2p3_kd: +(+matchInfo.t2p3_k / +matchInfo.t2p3_d).toFixed(2),
            t2p4_kd: +(+matchInfo.t2p4_k / +matchInfo.t2p4_d).toFixed(2),
            t2p5_kd: +(+matchInfo.t2p5_k / +matchInfo.t2p5_d).toFixed(2),
            t1p1_k: +matchInfo.t1p1_k,
            t1p2_k: +matchInfo.t1p2_k,
            t1p3_k: +matchInfo.t1p3_k,
            t1p4_k: +matchInfo.t1p4_k,
            t1p5_k: +matchInfo.t1p5_k,
            t2p1_k: +matchInfo.t2p1_k,
            t2p2_k: +matchInfo.t2p2_k,
            t2p3_k: +matchInfo.t2p3_k,
            t2p4_k: +matchInfo.t2p4_k,
            t2p5_k: +matchInfo.t2p5_k,
            t1p1_a: +matchInfo.t1p1_a,
            t1p2_a: +matchInfo.t1p2_a,
            t1p3_a: +matchInfo.t1p3_a,
            t1p4_a: +matchInfo.t1p4_a,
            t1p5_a: +matchInfo.t1p5_a,
            t2p1_a: +matchInfo.t2p1_a,
            t2p2_a: +matchInfo.t2p2_a,
            t2p3_a: +matchInfo.t2p3_a,
            t2p4_a: +matchInfo.t2p4_a,
            t2p5_a: +matchInfo.t2p5_a,
            t1p1_d: +matchInfo.t1p1_d,
            t1p2_d: +matchInfo.t1p2_d,
            t1p3_d: +matchInfo.t1p3_d,
            t1p4_d: +matchInfo.t1p4_d,
            t1p5_d: +matchInfo.t1p5_d,
            t2p1_d: +matchInfo.t2p1_d,
            t2p2_d: +matchInfo.t2p2_d,
            t2p3_d: +matchInfo.t2p3_d,
            t2p4_d: +matchInfo.t2p4_d,
            t2p5_d: +matchInfo.t2p5_d,
            t1p1_impact: Math.round((Impact(+matchInfo.t1p1_k, +matchInfo.t1p1_a, allK, allA)) * 100) / 100,
            t1p2_impact: Math.round((Impact(+matchInfo.t1p2_k, +matchInfo.t1p2_a, allK, allA)) * 100) / 100,
            t1p3_impact: Math.round((Impact(+matchInfo.t1p3_k, +matchInfo.t1p3_a, allK, allA)) * 100) / 100,
            t1p4_impact: Math.round((Impact(+matchInfo.t1p4_k, +matchInfo.t1p4_a, allK, allA)) * 100) / 100,
            t1p5_impact: Math.round((Impact(+matchInfo.t1p5_k, +matchInfo.t1p5_a, allK, allA)) * 100) / 100,
            t2p1_impact: Math.round((Impact(+matchInfo.t2p1_k, +matchInfo.t2p1_a, allK, allA)) * 100) / 100,
            t2p2_impact: Math.round((Impact(+matchInfo.t2p2_k, +matchInfo.t2p2_a, allK, allA)) * 100) / 100,
            t2p3_impact: Math.round((Impact(+matchInfo.t2p3_k, +matchInfo.t2p3_a, allK, allA)) * 100) / 100,
            t2p4_impact: Math.round((Impact(+matchInfo.t2p4_k, +matchInfo.t2p4_a, allK, allA)) * 100) / 100,
            t2p5_impact: Math.round((Impact(+matchInfo.t2p5_k, +matchInfo.t2p5_a, allK, allA)) * 100) / 100,
            t1p1_rating: Rating((+matchInfo.t1p1_k / +matchInfo.t1p1_d), (+matchInfo.t1p1_k / allRounds), (+matchInfo.t1p1_d / allRounds), Math.round((Impact(+matchInfo.t1p1_k, +matchInfo.t1p1_a, allK, allA)) * 100) / 100),
            t1p2_rating: Rating((+matchInfo.t1p2_k / +matchInfo.t1p2_d), (+matchInfo.t1p2_k / allRounds), (+matchInfo.t1p2_d / allRounds), Math.round((Impact(+matchInfo.t1p2_k, +matchInfo.t1p2_a, allK, allA)) * 100) / 100),
            t1p3_rating: Rating((+matchInfo.t1p3_k / +matchInfo.t1p3_d), (+matchInfo.t1p3_k / allRounds), (+matchInfo.t1p3_d / allRounds), Math.round((Impact(+matchInfo.t1p3_k, +matchInfo.t1p3_a, allK, allA)) * 100) / 100),
            t1p4_rating: Rating((+matchInfo.t1p4_k / +matchInfo.t1p4_d), (+matchInfo.t1p4_k / allRounds), (+matchInfo.t1p4_d / allRounds), Math.round((Impact(+matchInfo.t1p4_k, +matchInfo.t1p4_a, allK, allA)) * 100) / 100),
            t1p5_rating: Rating((+matchInfo.t1p5_k / +matchInfo.t1p5_d), (+matchInfo.t1p5_k / allRounds), (+matchInfo.t1p5_d / allRounds), Math.round((Impact(+matchInfo.t1p5_k, +matchInfo.t1p5_a, allK, allA)) * 100) / 100),
            t2p1_rating: Rating((+matchInfo.t2p1_k / +matchInfo.t2p1_d), (+matchInfo.t2p1_k / allRounds), (+matchInfo.t2p1_d / allRounds), Math.round((Impact(+matchInfo.t2p1_k, +matchInfo.t2p1_a, allK, allA)) * 100) / 100),
            t2p2_rating: Rating((+matchInfo.t2p2_k / +matchInfo.t2p2_d), (+matchInfo.t2p2_k / allRounds), (+matchInfo.t2p2_d / allRounds), Math.round((Impact(+matchInfo.t2p2_k, +matchInfo.t2p2_a, allK, allA)) * 100) / 100),
            t2p3_rating: Rating((+matchInfo.t2p3_k / +matchInfo.t2p3_d), (+matchInfo.t2p3_k / allRounds), (+matchInfo.t2p3_d / allRounds), Math.round((Impact(+matchInfo.t2p3_k, +matchInfo.t2p3_a, allK, allA)) * 100) / 100),
            t2p4_rating: Rating((+matchInfo.t2p4_k / +matchInfo.t2p4_d), (+matchInfo.t2p4_k / allRounds), (+matchInfo.t2p4_d / allRounds), Math.round((Impact(+matchInfo.t2p4_k, +matchInfo.t2p4_a, allK, allA)) * 100) / 100),
            t2p5_rating: Rating((+matchInfo.t2p5_k / +matchInfo.t2p5_d), (+matchInfo.t2p5_k / allRounds), (+matchInfo.t2p5_d / allRounds), Math.round((Impact(+matchInfo.t2p5_k, +matchInfo.t2p5_a, allK, allA)) * 100) / 100),
        }]

        const copyToClipboard = () => {
            const textToCopy = resultData.length > 0
                ? toSQLCommandAddMatch(resultData) + toSQLCommandUpdateShortMatch(name, resultData, currentMatch.data)
                : "";

            if (navigator.clipboard && navigator.clipboard.writeText) {
                // Попытка использовать API Clipboard
                navigator.clipboard.writeText(textToCopy).then(() => {
                    console.log('Copy good');
                }, () => {
                    console.log('Fail copy');
                });
            } else {
                // Альтернативный способ для iOS и старых браузеров
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                // Прячем текстовое поле из видимости
                textArea.style.position = "absolute";
                textArea.style.left = "-9999px";
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand("copy"); // Используем устаревший метод
                    console.log('Copy good');
                } catch (err) {
                    console.log('Fail copy');
                }
                document.body.removeChild(textArea); // Удаляем текстовое поле после копирования
            }
        };

        return (
            <div className={classes.wrapperAddMatches}>
                <div className={classes.selectMap}>
                    <div className={classes.map} onClick={() => {
                        setChoiceMap('Sandstone')
                    }}>
                        <div className={classes.mapImage}>
                            <img src={`/images/LogoMaps/Sandstone.jpg`} alt=""/>
                        </div>
                        <div className={classes.mapName}>{'Sandstone'}</div>
                        <div className={classes.hoverMap}></div>
                    </div>
                    <div className={classes.map} onClick={() => {
                        setChoiceMap('Breeze')
                    }}>
                        <div className={classes.mapImage}>
                            <img src={`/images/LogoMaps/Breeze.jpg`} alt=""/>
                        </div>
                        <div className={classes.mapName}>{'Breeze'}</div>
                        <div className={classes.hoverMap}></div>
                    </div>
                    <div className={classes.map} onClick={() => {
                        setChoiceMap('Rust')
                    }}>
                        <div className={classes.mapImage}>
                            <img src={`/images/LogoMaps/Rust.jpg`} alt=""/>
                        </div>
                        <div className={classes.mapName}>{'Rust'}</div>
                        <div className={classes.hoverMap}></div>
                    </div>
                    <div className={classes.map} onClick={() => {
                        setChoiceMap('Province')
                    }}>
                        <div className={classes.mapImage}>
                            <img src={`/images/LogoMaps/Province.jpg`} alt=""/>
                        </div>
                        <div className={classes.mapName}>{'Province'}</div>
                        <div className={classes.hoverMap}></div>
                    </div>
                    <div className={classes.map} onClick={() => {
                        setChoiceMap('Sakura')
                    }}>
                        <div className={classes.mapImage}>
                            <img src={`/images/LogoMaps/Sakura.jpg`} alt=""/>
                        </div>
                        <div className={classes.mapName}>{'Sakura'}</div>
                        <div className={classes.hoverMap}></div>
                    </div>
                    <div className={classes.map} onClick={() => {
                        setChoiceMap('Dune')
                    }}>
                        <div className={classes.mapImage}>
                            <img src={`/images/LogoMaps/Dune.jpg`} alt=""/>
                        </div>
                        <div className={classes.mapName}>{'Dune'}</div>
                        <div className={classes.hoverMap}></div>
                    </div>
                    <div className={classes.map} onClick={() => {
                        setChoiceMap('Zone7')
                    }}>
                        <div className={classes.mapImage}>
                            <img src={`/images/LogoMaps/Zone7.jpg`} alt=""/>
                        </div>
                        <div className={classes.mapName}>{'Zone7'}</div>
                        <div className={classes.hoverMap}></div>
                    </div>
                </div>
                <div className={classes.infoMatch}>
                    <div className={classes.wrapperInputData}>
                        <div className={classes.labelInput}>Pick map:</div>
                        <label className={classes.labelRadio}>
                            <input type="radio" value={shortMatches.data[0].team1}
                                   checked={pickMap === shortMatches.data[0].team1}
                                   onChange={handlePickMap}/>
                            <img src={`/images/LogoTeams/${shortMatches.data[0].logo_t1}`} alt="/"/>
                        </label>
                        <label className={classes.labelRadio}>
                            <input type="radio" value={shortMatches.data[0].team2}
                                   checked={pickMap === shortMatches.data[0].team2}
                                   onChange={handlePickMap}/>
                            <img src={`/images/LogoTeams/${shortMatches.data[0].logo_t2}`} alt="/"/>
                        </label>
                        <label className={classes.labelRadio}>
                            <input type="radio" value={'Decider'} onChange={handlePickMap}
                                   checked={pickMap === "Decider"}/> Decider
                        </label>
                    </div>
                    <div className={classes.wrapperInputData}>
                        <div className={classes.labelInput}>Start side
                            <img src={`/images/LogoTeams/${shortMatches.data[0].logo_t1}`} alt="/"/>:
                        </div>
                        <label className={classes.labelRadio}>
                            <input type="radio" value="CT" checked={selectedSide === 'CT'}
                                   onChange={handleChangeSide}/>CT
                        </label>
                        <label className={classes.labelRadio}>
                            <input type="radio" value="T" checked={selectedSide === 'T'}
                                   onChange={handleChangeSide}/>T
                        </label>
                    </div>
                    <div className={classes.wrapperInputData}>
                        <div className={classes.labelInput}>Map:</div>
                        <input type="text" className={classes.inputEntryData} value={choiceMap}/>
                    </div>
                    <div className={classes.wrapperInputData}>
                        <div className={classes.labelInput}>half 1
                            <img src={`/images/LogoTeams/${shortMatches.data[0].logo_t1}`} alt="/"/>:
                        </div>
                        <input type="number" className={classes.inputEntryData} name="half1_team1" autoComplete="off"
                               value={matchInfo.half1_team1} onChange={handleChangeInfoMatch}/>
                    </div>
                    <div className={classes.wrapperInputData}>
                        <div className={classes.labelInput}>half 1
                            <img src={`/images/LogoTeams/${shortMatches.data[0].logo_t2}`} alt="/"/>:
                        </div>
                        <input type="number" className={classes.inputEntryData} name="half1_team2" autoComplete="off"
                               value={matchInfo.half1_team2} onChange={handleChangeInfoMatch}/>
                    </div>
                    <div className={classes.wrapperInputData}>
                        <div className={classes.labelInput}>Score
                            <img src={`/images/LogoTeams/${shortMatches.data[0].logo_t1}`} alt="/"/>:
                        </div>
                        <input type="number" className={classes.inputEntryData} name="half2_team1" autoComplete="off"
                               value={matchInfo.half2_team1} onChange={handleChangeInfoMatch}/>
                    </div>
                    <div className={classes.wrapperInputData}>
                        <div className={classes.labelInput}>Score
                            <img src={`/images/LogoTeams/${shortMatches.data[0].logo_t2}`} alt="/"/>:
                        </div>
                        <input type="number" className={classes.inputEntryData} name="half2_team2" autoComplete="off"
                               value={matchInfo.half2_team2} onChange={handleChangeInfoMatch}/>
                    </div>
                </div>
                {isValidData ?
                    <div className={classes.wrapperCopyButton}>
                        <div className={classes.copyButton} onClick={copyToClipboard}>
                            Enter
                        </div>
                    </div>
                    : ""}
                <div className={classes.wrapperDataPlayersMatch}>
                    <div className={classes.wrapperTitleCells}>
                        <div className={classes.titleCell}>Players</div>
                        <div className={classes.titleCell}>K</div>
                        <div className={classes.titleCell}>A</div>
                        <div className={classes.titleCell}>D</div>
                    </div>
                    <div className={classes.dataPlayersMatch}>

                        <input type="text" className={classes.inputEntryData} name="t1p1" autoComplete="off"
                               value={matchInfo.t1p1 ? matchInfo.t1p1 : matchInfo.t1p1 = team1Data.player_1}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t1p1_k" value={matchInfo.t1p1_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p1_a" value={matchInfo.t1p1_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p1_d" value={matchInfo.t1p1_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t1p2" autoComplete="off"
                               value={matchInfo.t1p2 ? matchInfo.t1p2 : matchInfo.t1p2 = team1Data.player_2}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t1p2_k" value={matchInfo.t1p2_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p2_a" value={matchInfo.t1p2_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p2_d" value={matchInfo.t1p2_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t1p3" autoComplete="off"
                               value={matchInfo.t1p3 ? matchInfo.t1p3 : matchInfo.t1p3 = team1Data.player_3}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t1p3_k" value={matchInfo.t1p3_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p3_a" value={matchInfo.t1p3_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p3_d" value={matchInfo.t1p3_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t1p4" autoComplete="off"
                               value={matchInfo.t1p4 ? matchInfo.t1p4 : matchInfo.t1p4 = team1Data.player_4}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t1p4_k" value={matchInfo.t1p4_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p4_a" value={matchInfo.t1p4_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p4_d" value={matchInfo.t1p4_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t1p5" autoComplete="off"
                               value={matchInfo.t1p5 ? matchInfo.t1p5 : matchInfo.t1p5 = team1Data.player_5}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t1p5_k" value={matchInfo.t1p5_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p5_a" value={matchInfo.t1p5_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t1p5_d" value={matchInfo.t1p5_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t2p1" autoComplete="off"
                               value={matchInfo.t2p1 ? matchInfo.t2p1 : matchInfo.t2p1 = team2Data.player_1}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t2p1_k" value={matchInfo.t2p1_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p1_a" value={matchInfo.t2p1_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p1_d" value={matchInfo.t2p1_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t2p2" autoComplete="off"
                               value={matchInfo.t2p2 ? matchInfo.t2p2 : matchInfo.t2p2 = team2Data.player_2}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t2p2_k" value={matchInfo.t2p2_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p2_a" value={matchInfo.t2p2_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p2_d" value={matchInfo.t2p2_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t2p3" autoComplete="off"
                               value={matchInfo.t2p3 ? matchInfo.t2p3 : matchInfo.t2p3 = team2Data.player_3}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t2p3_k" value={matchInfo.t2p3_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p3_a" value={matchInfo.t2p3_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p3_d" value={matchInfo.t2p3_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t2p4" autoComplete="off"
                               value={matchInfo.t2p4 ? matchInfo.t2p4 : matchInfo.t2p4 = team2Data.player_4}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t2p4_k" value={matchInfo.t2p4_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p4_a" value={matchInfo.t2p4_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p4_d" value={matchInfo.t2p4_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>

                        <input type="text" className={classes.inputEntryData} name="t2p5" autoComplete="off"
                               value={matchInfo.t2p5 ? matchInfo.t2p5 : matchInfo.t2p5 = team2Data.player_5}
                               onChange={handleChangeInfoMatch}/>
                        <input type="number" className={classes.inputEntryData} name="t2p5_k" value={matchInfo.t2p5_k}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p5_a" value={matchInfo.t2p5_a}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>
                        <input type="number" className={classes.inputEntryData} name="t2p5_d" value={matchInfo.t2p5_d}
                               onChange={handleChangeInfoMatch} autoComplete="off"/>


                    </div>
                </div>
                {isValidData ?
                    <>
                        <div className={classes.wrapperCopyButton}>
                            <div className={classes.copyButton} onClick={onButtonClick}>
                                Download
                            </div>
                        </div>
                        <div className={classes.resultBanner} ref={ref}>
                            <PictureResult2 entryDataMatch={resultData}/>
                        </div>
                    </>
                    : <p>Entry data!</p>}
            </div>
        )
    }
}

export default DataEntryMatch;