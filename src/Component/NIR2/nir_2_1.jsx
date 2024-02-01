import React, {createRef, useCallback} from 'react';
import classes from './nir_2.module.css'
import {useGetMatchesNecessaryTeamQuery} from "../../store/api/apiSlice";
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

const Nir21 = () => {

    const id = 1
    const map = 'Sandstone'
    // const map = 'Rust'
    // const map = 'Province'
    // const map = 'Sakura'
    // const map = 'Zone9'
    // const map = 'Breeze'

    const {data} = useGetMatchesNecessaryTeamQuery({id})

    let arrTeam = []
    let arrMatches = []
    let arrMatchesSandstone = []
    let arrMatchesRust = []
    let arrMatchesProvince = []
    let arrMatchesSakura = []
    let arrMatchesZone9 = []
    let arrMatchesBreeze = []

    //--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `Diagram.jpg`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    const CustomTooltip = ({active, payload, label}) => {
        if (active) {
            if (payload && label) {
                return (
                    <div className={classes.statsWindowTooltip}>
                        <span style={
                            {
                                color: "#000"
                            }
                        }>{label}
                        </span>
                        <p style={
                            {
                                color: "#000"
                            }
                        }>Win: {payload[0].value}
                        </p>
                    </div>
                )
            }
        }
        return null;
    }

    if (data) {
        if (data.length > 0) {
            data.map((el) => {
                if (el.map === 'Sandstone') {
                    if (el.team1_id === id) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesSandstone.push({
                                    "Sandstone": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesSandstone.push({
                                    "Sandstone": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesSandstone.push({
                                    "Sandstone": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesSandstone.push({
                                    "Sandstone": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.team2_id === id) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesSandstone.push({
                                    "Sandstone": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesSandstone.push({
                                    "Sandstone": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesSandstone.push({
                                    "Sandstone": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesSandstone.push({
                                    "Sandstone": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            data.map((el) => {
                if (el.map === 'Rust') {
                    if (el.team1_id === id) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesRust.push({
                                    "Rust": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesRust.push({
                                    "Rust": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesRust.push({
                                    "Rust": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesRust.push({
                                    "Rust": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.team2_id === id) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesRust.push({
                                    "Rust": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesRust.push({
                                    "Rust": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesRust.push({
                                    "Rust": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesRust.push({
                                    "Rust": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            data.map((el) => {
                if (el.map === 'Province') {
                    if (el.team1_id === id) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesProvince.push({
                                    "Province": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesProvince.push({
                                    "Province": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesProvince.push({
                                    "Province": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesProvince.push({
                                    "Province": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.team2_id === id) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesProvince.push({
                                    "Province": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesProvince.push({
                                    "Province": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesProvince.push({
                                    "Province": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesProvince.push({
                                    "Province": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            data.map((el) => {
                if (el.map === 'Sakura') {
                    if (el.team1_id === id) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesSakura.push({
                                    "Sakura": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesSakura.push({
                                    "Sakura": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesSakura.push({
                                    "Sakura": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesSakura.push({
                                    "Sakura": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.team2_id === id) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesSakura.push({
                                    "Sakura": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesSakura.push({
                                    "Sakura": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesSakura.push({
                                    "Sakura": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesSakura.push({
                                    "Sakura": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            data.map((el) => {
                if (el.map === 'Breeze') {
                    if (el.team1_id === id) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesBreeze.push({
                                    "Breeze": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesBreeze.push({
                                    "Breeze": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesBreeze.push({
                                    "Breeze": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesBreeze.push({
                                    "Breeze": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.team2_id === id) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesBreeze.push({
                                    "Breeze": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesBreeze.push({
                                    "Breeze": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesBreeze.push({
                                    "Breeze": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesBreeze.push({
                                    "Breeze": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            data.map((el) => {
                if (el.map === 'Zone9') {
                    if (el.team1_id === id) {
                        if (el.total_r_team1 > el.total_r_team2) {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesZone9.push({
                                    "Zone9": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesZone9.push({
                                    "Zone9": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesZone9.push({
                                    "Zone9": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesZone9.push({
                                    "Zone9": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }
                    }

                    if (el.team2_id === id) {
                        if (el.total_r_team2 > el.total_r_team1) {
                            if (el.total_r_team2 > 10) {
                                let WinRounds = el.total_r_team2 - (el.total_r_team2 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team2 / el.total_r_team1))

                                arrMatchesZone9.push({
                                    "Zone9": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesZone9.push({
                                    "Zone9": el.total_r_team2,
                                    "date": el.db_date_match,
                                })
                            }
                        } else {
                            if (el.total_r_team1 > 10) {
                                let WinRounds = el.total_r_team1 - (el.total_r_team1 - 10)
                                let LoseRounds = Math.round(WinRounds / (el.total_r_team1 / el.total_r_team2))

                                arrMatchesZone9.push({
                                    "Zone9": WinRounds,
                                    "date": el.db_date_match,
                                })
                            } else {
                                arrMatchesZone9.push({
                                    "Zone9": el.total_r_team1,
                                    "date": el.db_date_match,
                                })
                            }
                        }

                    }
                }
            })

            arrMatchesSandstone = arrMatchesSandstone.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesSakura = arrMatchesSakura.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesRust = arrMatchesRust.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesProvince = arrMatchesProvince.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesSandstone = arrMatchesSandstone.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesBreeze = arrMatchesBreeze.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatchesZone9 = arrMatchesZone9.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            arrMatches = [...arrMatchesSandstone, ...arrMatchesSakura, ...arrMatchesRust, ...arrMatchesProvince, ...arrMatchesSandstone, ...arrMatchesBreeze, ...arrMatchesZone9]

            arrMatches = arrMatches.sort((a, b) => {
                return (new Date(a.date) - new Date(b.date))
            })

            return (
                <div className={classes.wrapperDiagram}>

                    <button className={classes.btnSaveImage} onClick={onButtonClick}>
                        Save as image
                    </button>

                    <div className={classes.winSandstone} ref={ref}>
                        <div className={classes.countMaps}><strong>{"Количество сыгранных матчей команды Horizon на всех картах: " + arrMatches.length}</strong></div>
                        <div className={classes.diagram}>
                            <ComposedChart width={1400} height={600}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2"/>
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
                                    tickCount={13} domain={[-1, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                <Legend verticalAlign="top" align='center' height={47} iconSize={20} wrapperStyle={{fontSize: "30px"}}/>
                                <Line dataKey="Sandstone"  data={arrMatchesSandstone} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FF0000FF"/>
                                <Line dataKey="Rust" data={arrMatchesRust} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#0033FFFF"/>
                                <Line dataKey="Province" data={arrMatchesProvince} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#C636FFFF"/>
                                <Line dataKey="Sakura" data={arrMatchesSakura} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FF8100FF"/>
                                <Line dataKey="Zone9" data={arrMatchesZone9} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#19FF00FF"/>
                                <Line dataKey="Breeze" data={arrMatchesBreeze} legendType='plainline' strokeWidth={0}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FFDC00FF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                             <ComposedChart width={1400} height={600} data={arrMatchesRust}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={15} angle={18} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26,
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={13} domain={[-1, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                 <Legend verticalAlign="top" align='center' height={47} iconSize={20} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="Rust" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#0033FFFF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                             <ComposedChart width={1400} height={600} data={arrMatchesSandstone}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={15} angle={18} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26,
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={13} domain={[-1, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                 <Legend verticalAlign="top" align='center' height={47} iconSize={20} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="Sandstone" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FF0000FF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                             <ComposedChart width={1400} height={600} data={arrMatchesProvince}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={15} angle={18} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26,
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={13} domain={[-1, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                 <Legend verticalAlign="top" align='center' height={47} iconSize={20} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="Province" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#C636FFFF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                             <ComposedChart width={1400} height={600} data={arrMatchesSakura}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={15} angle={18} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26,
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={13} domain={[-1, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                 <Legend verticalAlign="top" align='center' height={47} iconSize={20} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="Sakura" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FF8100FF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                             <ComposedChart width={1400} height={600} data={arrMatchesZone9}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={15} angle={18} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26,
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={13} domain={[-1, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                 <Legend verticalAlign="top" align='center' height={47} iconSize={20} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="Zone9" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#19FF00FF"/>
                            </ComposedChart>
                        </div>

                        <div className={classes.diagram2}>
                             <ComposedChart width={1400} height={600} data={arrMatchesBreeze}
                                           margin={{top: 20, right: 20, bottom: 50, left: 25}}>
                                <CartesianGrid stroke="#4B4B4BFF" strokeDasharray="2 2" width={0}/>
                                <XAxis label={{value: 'Time', position: 'bottom', offset: 30, fontSize: 26}}
                                       dataKey="date" stroke="#000" dx={0} dy={15} angle={18} fontSize={0}/>
                                <YAxis
                                    label={{
                                        value: 'Rounds',
                                        angle: -90,
                                        position: 'insideLeft',
                                        offset: -10,
                                        fontSize: 26,
                                    }}
                                    type="number" fontSize={25} stroke="#000"
                                    tickCount={13} domain={[-1, 11]}/>
                                <Tooltip cursor={{stroke: '#cb375f', strokeWidth: 2}}/>
                                 <Legend verticalAlign="top" align='center' height={47} iconSize={20} wrapperStyle={{opacity: 0}}/>
                                <Line dataKey="Breeze" legendType='plainline' strokeWidth={3}
                                      activeDot={{stroke: 'transparent', r: 2}} dot={{stroke: 'transparent', r: 0}}
                                      stroke="#FFDC00FF"/>
                            </ComposedChart>
                        </div>

                    </div>
                </div>
            )

        }
    }
};

export default Nir21;