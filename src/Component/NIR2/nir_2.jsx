import React, {createRef, useCallback} from 'react';
import classes from './nir_2.module.css'
import {useGetMatchesNecessaryPlayerQuery, useGetMatchesQuery} from "../../store/api/apiSlice";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ComposedChart,
    ResponsiveContainer,
    Area,
    Bar,
    Scatter,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {toJpeg} from "html-to-image";

const Nir2 = () => {

    let name
    // const map = 'Sandstone'
    // const map = 'Rust'
    // const map = 'Province'
    // const map = 'Sakura'
    // const map = 'Zone9'
    const map = 'Breeze'
    // const map = 'Dune'

    let maps = ['Sandstone', 'Rust', 'Province', 'Sakura', 'Zone9', 'Breeze']
    let players = ['xZise', 'Lighting', 'Nekr0', 'invi', 'fLACSYS']

    name = 'xZise'
    const xZise = useGetMatchesNecessaryPlayerQuery({name})
    name = 'Lighting'
    const Lighting = useGetMatchesNecessaryPlayerQuery({name})
    name = 'Nekr0'
    const Nekr0 = useGetMatchesNecessaryPlayerQuery({name})
    name = 'invi'
    const invi = useGetMatchesNecessaryPlayerQuery({name})
    name = 'fLACSYS'
    const fLACSYS = useGetMatchesNecessaryPlayerQuery({name})


    let arrMatches = []
    let arrMatchesxZise = []
    let arrMatchesLighting = []
    let arrMatchesNekr0 = []
    let arrMatchesinvi = []
    let arrMatchesfLACSYS = []


    //--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `Diagram_Horizon_${map}.jpg`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    if (fLACSYS.data && xZise.data && Lighting.data && Nekr0.data && invi.data) {
        if (fLACSYS.data.length > 0 && xZise.data.length > 0 && Lighting.data.length > 0 && Nekr0.data.length > 0 && invi.data.length > 0) {
            xZise.data.map((el) => {
                if (el.map === map) {
                    if (el.t1p1 === name || el.t1p2 === name || el.t1p3 === name || el.t1p4 === name || el.t1p5 === name) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesxZise.push({
                                    "xZise": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesxZise.push({
                                    "xZise": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesxZise.push({
                                    "xZise": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesxZise.push({
                                    "xZise": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.t2p1 === name || el.t2p2 === name || el.t2p3 === name || el.t2p4 === name || el.t2p5 === name) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesxZise.push({
                                    "xZise": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesxZise.push({
                                    "xZise": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesxZise.push({
                                    "xZise": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesxZise.push({
                                    "xZise": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            Lighting.data.map((el) => {
                if (el.map === map) {
                    if (el.t1p1 === name || el.t1p2 === name || el.t1p3 === name || el.t1p4 === name || el.t1p5 === name) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesLighting.push({
                                    "Lighting": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesLighting.push({
                                    "Lighting": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesLighting.push({
                                    "Lighting": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesLighting.push({
                                    "Lighting": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.t2p1 === name || el.t2p2 === name || el.t2p3 === name || el.t2p4 === name || el.t2p5 === name) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesLighting.push({
                                    "Lighting": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesLighting.push({
                                    "Lighting": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesLighting.push({
                                    "Lighting": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesLighting.push({
                                    "Lighting": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            Nekr0.data.map((el) => {
                if (el.map === map) {
                    if (el.t1p1 === name || el.t1p2 === name || el.t1p3 === name || el.t1p4 === name || el.t1p5 === name) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesNekr0.push({
                                    "Nekr0": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesNekr0.push({
                                    "Nekr0": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesNekr0.push({
                                    "Nekr0": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesNekr0.push({
                                    "Nekr0": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.t2p1 === name || el.t2p2 === name || el.t2p3 === name || el.t2p4 === name || el.t2p5 === name) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesNekr0.push({
                                    "Nekr0": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesNekr0.push({
                                    "Nekr0": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesNekr0.push({
                                    "Nekr0": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesNekr0.push({
                                    "Nekr0": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            invi.data.map((el) => {
                if (el.map === map) {
                    if (el.t1p1 === name || el.t1p2 === name || el.t1p3 === name || el.t1p4 === name || el.t1p5 === name) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesinvi.push({
                                    "invi": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesinvi.push({
                                    "invi": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesinvi.push({
                                    "invi": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesinvi.push({
                                    "invi": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.t2p1 === name || el.t2p2 === name || el.t2p3 === name || el.t2p4 === name || el.t2p5 === name) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesinvi.push({
                                    "invi": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesinvi.push({
                                    "invi": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesinvi.push({
                                    "invi": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesinvi.push({
                                    "invi": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            fLACSYS.data.map((el) => {
                if (el.map === map) {
                    if (el.t1p1 === name || el.t1p2 === name || el.t1p3 === name || el.t1p4 === name || el.t1p5 === name) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesfLACSYS.push({
                                    "fLACSYS": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesfLACSYS.push({
                                    "fLACSYS": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesfLACSYS.push({
                                    "fLACSYS": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesfLACSYS.push({
                                    "fLACSYS": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.t2p1 === name || el.t2p2 === name || el.t2p3 === name || el.t2p4 === name || el.t2p5 === name) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesfLACSYS.push({
                                    "fLACSYS": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesfLACSYS.push({
                                    "fLACSYS": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesfLACSYS.push({
                                    "fLACSYS": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesfLACSYS.push({
                                    "fLACSYS": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            arrMatchesxZise = arrMatchesxZise.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesLighting = arrMatchesLighting.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesNekr0 = arrMatchesNekr0.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesinvi = arrMatchesinvi.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesfLACSYS = arrMatchesfLACSYS.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatches = [...arrMatchesxZise, ...arrMatchesLighting, ...arrMatchesNekr0, ...arrMatchesinvi, ...arrMatchesfLACSYS]

            arrMatches = arrMatches.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            console.log(arrMatches)
            return (
                <div className={classes.wrapperDiagram}>

                    <button className={classes.btnSaveImage} onClick={onButtonClick}>
                        Save as image
                    </button>

                    <div className={classes.winSandstone} ref={ref}>
                        <div className={classes.countMaps}>
                            <strong>{"Количество сыгранных матчей игроками команды Horizon на карте " + map + ": " + arrMatches.length}</strong>
                        </div>
                        <div className={classes.diagram}>
                            <ComposedChart width={1400} height={600}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={15} angle={18} fontSize={16}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26,
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={12} domain={[0, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                <Legend verticalAlign="top" align='center' height={47} iconSize={20} wrapperStyle={{fontSize: "30px"}}/>
                                <Line dataKey="Nekr0"  data={arrMatchesNekr0} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FF0000FF"/>
                                <Line dataKey="invi" data={arrMatchesinvi} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#0033FFFF"/>
                                <Line dataKey="xZise" data={arrMatchesxZise} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#C636FFFF"/>
                                <Line dataKey="Lighting" data={arrMatchesLighting} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FF8100FF"/>
                                <Line dataKey="fLACSYS" data={arrMatchesfLACSYS} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#19FF00FF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                            <ComposedChart width={1400} height={600} data={arrMatchesNekr0}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={7} angle={10} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={12} domain={[0, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                <Legend verticalAlign="top" align='center' height={47} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="Nekr0" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FF0000FF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                            <ComposedChart width={1400} height={600} data={arrMatchesfLACSYS}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={7} angle={10} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={12} domain={[0, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                <Legend verticalAlign="top" align='center' height={47} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="fLACSYS" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#19FF00FF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                            <ComposedChart width={1400} height={600} data={arrMatchesLighting}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={7} angle={10} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={12} domain={[0, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                <Legend verticalAlign="top" align='center' height={47} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="Lighting" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FF8100FF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                            <ComposedChart width={1400} height={600} data={arrMatchesxZise}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={7} angle={10} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={12} domain={[0, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                <Legend verticalAlign="top" align='center' height={47} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="xZise" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#C636FFFF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                            <ComposedChart width={1400} height={600} data={arrMatchesinvi}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2"/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={7} angle={10} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={12} domain={[0, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                <Legend verticalAlign="top" align='center' height={47} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="invi" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#0033FFFF"/>
                            </ComposedChart>
                        </div>

                    </div>
                </div>
            )

        }
    }
};

export default Nir2;