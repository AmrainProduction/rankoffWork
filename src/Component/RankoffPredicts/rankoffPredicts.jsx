import React, {createRef, useCallback, useEffect, useState} from 'react';
import classes from './rankoffPredicts.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {useGetMatchesByNameQuery, useGetShortMatchByNameQuery, useGetShortMatchQuery} from "../../store/api/apiSlice";
import ResultPredicts from "./PictureResult/resultPredicts";
import logo from "../../logo.svg";
import ResultPredicts2 from "./PictureResult/resultPredicts2";
import ResultPredicts3 from "./PictureResult/resultPredicts3";
import ResultPredicts4 from "./PictureResult/resultPredicts4";
import ResultPredicts5 from "./PictureResult/resultPredicts5";

const RankoffPredicts = () => {

    const listMatches = useGetShortMatchQuery()

    const [date, setDate] = useState([])

    const [choicePredicter1, setChoicePredicter1] = useState([])
    const [choicePredicter2, setChoicePredicter2] = useState([])
    const [choicePredicter3, setChoicePredicter3] = useState([])
    const [choicePredicter4, setChoicePredicter4] = useState([])
    const [choicePredicter5, setChoicePredicter5] = useState([])
    const [choicePredicter6, setChoicePredicter6] = useState([])
    const [choicePredicter7, setChoicePredicter7] = useState([])
    const [choicePredicter8, setChoicePredicter8] = useState([])

    const [choicePredicter21, setChoicePredicter21] = useState([])
    const [choicePredicter22, setChoicePredicter22] = useState([])
    const [choicePredicter23, setChoicePredicter23] = useState([])
    const [choicePredicter24, setChoicePredicter24] = useState([])
    const [choicePredicter25, setChoicePredicter25] = useState([])
    const [choicePredicter26, setChoicePredicter26] = useState([])
    const [choicePredicter27, setChoicePredicter27] = useState([])
    const [choicePredicter28, setChoicePredicter28] = useState([])

    const [choicePredicter31, setChoicePredicter31] = useState([])
    const [choicePredicter32, setChoicePredicter32] = useState([])
    const [choicePredicter33, setChoicePredicter33] = useState([])
    const [choicePredicter34, setChoicePredicter34] = useState([])
    const [choicePredicter35, setChoicePredicter35] = useState([])
    const [choicePredicter36, setChoicePredicter36] = useState([])
    const [choicePredicter37, setChoicePredicter37] = useState([])
    const [choicePredicter38, setChoicePredicter38] = useState([])

    const [choicePredicter41, setChoicePredicter41] = useState([])
    const [choicePredicter42, setChoicePredicter42] = useState([])
    const [choicePredicter43, setChoicePredicter43] = useState([])
    const [choicePredicter44, setChoicePredicter44] = useState([])
    const [choicePredicter45, setChoicePredicter45] = useState([])
    const [choicePredicter46, setChoicePredicter46] = useState([])
    const [choicePredicter47, setChoicePredicter47] = useState([])
    const [choicePredicter48, setChoicePredicter48] = useState([])

    const [choicePredicter51, setChoicePredicter51] = useState([])
    const [choicePredicter52, setChoicePredicter52] = useState([])
    const [choicePredicter53, setChoicePredicter53] = useState([])
    const [choicePredicter54, setChoicePredicter54] = useState([])
    const [choicePredicter55, setChoicePredicter55] = useState([])
    const [choicePredicter56, setChoicePredicter56] = useState([])
    const [choicePredicter57, setChoicePredicter57] = useState([])
    const [choicePredicter58, setChoicePredicter58] = useState([])

    let dates = []
    let matchesDate = []
    let matchesID = []

    if (listMatches.data && listMatches.data.length > 0) {
        listMatches.data.map((e) => {
            matchesID.push(e.name_match_for_sort)
            dates.push(e.date_match)
        })

        dates = dates.filter((item, index) => {
            return dates.indexOf(item) === index
        }).sort().reverse()

        listMatches.data.map((e) => {
            if (e.date_match === date) {
                matchesDate.push({
                    team1: e.team1,
                    team2: e.team2,
                    logo_t1: e.logo_t1,
                    logo_t2: e.logo_t2,
                    score_t1: e.total_score_match_t1,
                    score_t2: e.total_score_match_t2,
                    match_id: e.name_match_for_sort,
                })
            }
        })
    }

//--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${date}.jpg`
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ref])

    return (
        <>
            <div className={classes.wrapperMenu}>
                <div className={classes.wrapperLogo}>
                    <img src={logo} alt="logo"/>
                </div>
                <div className={classes.menu}>
                    <div className={classes.listMatches}>
                        {dates.map((e, index) => {
                            return (
                                <div key={index} className={classes.match} onClick={() => {
                                    setDate(e)
                                    setChoicePredicter1([])
                                    setChoicePredicter2([])
                                    setChoicePredicter3([])
                                    setChoicePredicter4([])
                                    setChoicePredicter5([])
                                    setChoicePredicter6([])
                                    setChoicePredicter7([])
                                    setChoicePredicter8([])
                                    setChoicePredicter21([])
                                    setChoicePredicter22([])
                                    setChoicePredicter23([])
                                    setChoicePredicter24([])
                                    setChoicePredicter25([])
                                    setChoicePredicter26([])
                                    setChoicePredicter27([])
                                    setChoicePredicter28([])
                                    setChoicePredicter31([])
                                    setChoicePredicter32([])
                                    setChoicePredicter33([])
                                    setChoicePredicter34([])
                                    setChoicePredicter35([])
                                    setChoicePredicter36([])
                                    setChoicePredicter37([])
                                    setChoicePredicter38([])
                                    setChoicePredicter41([])
                                    setChoicePredicter42([])
                                    setChoicePredicter43([])
                                    setChoicePredicter44([])
                                    setChoicePredicter45([])
                                    setChoicePredicter46([])
                                    setChoicePredicter47([])
                                    setChoicePredicter48([])
                                    setChoicePredicter51([])
                                    setChoicePredicter52([])
                                    setChoicePredicter53([])
                                    setChoicePredicter54([])
                                    setChoicePredicter55([])
                                    setChoicePredicter56([])
                                    setChoicePredicter57([])
                                    setChoicePredicter58([])
                                }}>
                                    {e}
                                </div>
                            )
                        })}
                    </div>
                    <button className={classes.btnSaveAsImage} onClick={onButtonClick}>
                        Save as image
                    </button>
                </div>
            </div>
            {matchesDate.reverse().map((e, index) => {
                if (index < 5) {
                    return (
                        <div key={index} className={classes.wrapperPredicters}>
                            <div className={classes.choicePredicter}>
                                <div className={classes.name}>Notch</div>
                                <div className={classes.wrapperTeams}>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter1(e.logo_t1) : index === 1 ? setChoicePredicter21(e.logo_t1) : index === 2 ? setChoicePredicter31(e.logo_t1) : index === 3 ? setChoicePredicter41(e.logo_t1) : index === 4 ? setChoicePredicter51(e.logo_t1) : setChoicePredicter51(e.logo_t1)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                    </div>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter1(e.logo_t2) : index === 1 ? setChoicePredicter21(e.logo_t2) : index === 2 ? setChoicePredicter31(e.logo_t2) : index === 3 ? setChoicePredicter41(e.logo_t2) : index === 4 ? setChoicePredicter51(e.logo_t2) : setChoicePredicter51(e.logo_t2)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.choicePredicter}>
                                <div className={classes.name}>Postanova</div>
                                <div className={classes.wrapperTeams}>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter2(e.logo_t1) : index === 1 ? setChoicePredicter22(e.logo_t1) : index === 2 ? setChoicePredicter32(e.logo_t1) : index === 3 ? setChoicePredicter42(e.logo_t1) : index === 4 ? setChoicePredicter52(e.logo_t1) : setChoicePredicter52(e.logo_t1)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                    </div>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter2(e.logo_t2) : index === 1 ? setChoicePredicter22(e.logo_t2) : index === 2 ? setChoicePredicter32(e.logo_t2) : index === 3 ? setChoicePredicter42(e.logo_t2) : index === 4 ? setChoicePredicter52(e.logo_t2) : setChoicePredicter52(e.logo_t2)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.choicePredicter}>
                                <div className={classes.name}>MonleaR</div>
                                <div className={classes.wrapperTeams}>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter3(e.logo_t1) : index === 1 ? setChoicePredicter23(e.logo_t1) : index === 2 ? setChoicePredicter33(e.logo_t1) : index === 3 ? setChoicePredicter43(e.logo_t1) : index === 4 ? setChoicePredicter53(e.logo_t1) : setChoicePredicter53(e.logo_t1)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                    </div>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter3(e.logo_t2) : index === 1 ? setChoicePredicter23(e.logo_t2) : index === 2 ? setChoicePredicter33(e.logo_t2) : index === 3 ? setChoicePredicter43(e.logo_t2) : index === 4 ? setChoicePredicter53(e.logo_t2) : setChoicePredicter53(e.logo_t2)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.choicePredicter}>
                                <div className={classes.name}>Rower</div>
                                <div className={classes.wrapperTeams}>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter4(e.logo_t1) : index === 1 ? setChoicePredicter24(e.logo_t1) : index === 2 ? setChoicePredicter34(e.logo_t1) : index === 3 ? setChoicePredicter44(e.logo_t1) : index === 4 ? setChoicePredicter54(e.logo_t1) : setChoicePredicter54(e.logo_t1)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                    </div>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter4(e.logo_t2) : index === 1 ? setChoicePredicter24(e.logo_t2) : index === 2 ? setChoicePredicter34(e.logo_t2) : index === 3 ? setChoicePredicter44(e.logo_t2) : index === 4 ? setChoicePredicter54(e.logo_t2) : setChoicePredicter54(e.logo_t2)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.choicePredicter}>
                                <div className={classes.name}>Zadrot</div>
                                <div className={classes.wrapperTeams}>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter5(e.logo_t1) : index === 1 ? setChoicePredicter25(e.logo_t1) : index === 2 ? setChoicePredicter35(e.logo_t1) : index === 3 ? setChoicePredicter45(e.logo_t1) : index === 4 ? setChoicePredicter55(e.logo_t1) : setChoicePredicter55(e.logo_t1)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                    </div>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter5(e.logo_t2) : index === 1 ? setChoicePredicter25(e.logo_t2) : index === 2 ? setChoicePredicter35(e.logo_t2) : index === 3 ? setChoicePredicter45(e.logo_t2) : index === 4 ? setChoicePredicter55(e.logo_t2) : setChoicePredicter55(e.logo_t2)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.choicePredicter}>
                                <div className={classes.name}>raffee</div>
                                <div className={classes.wrapperTeams}>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter6(e.logo_t1) : index === 1 ? setChoicePredicter26(e.logo_t1) : index === 2 ? setChoicePredicter36(e.logo_t1) : index === 3 ? setChoicePredicter46(e.logo_t1) : index === 4 ? setChoicePredicter56(e.logo_t1) : setChoicePredicter56(e.logo_t1)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                    </div>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter6(e.logo_t2) : index === 1 ? setChoicePredicter26(e.logo_t2) : index === 2 ? setChoicePredicter36(e.logo_t2) : index === 3 ? setChoicePredicter46(e.logo_t2) : index === 4 ? setChoicePredicter56(e.logo_t2) : setChoicePredicter56(e.logo_t2)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.choicePredicter}>
                                <div className={classes.name}>oneday</div>
                                <div className={classes.wrapperTeams}>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter7(e.logo_t1) : index === 1 ? setChoicePredicter27(e.logo_t1) : index === 2 ? setChoicePredicter37(e.logo_t1) : index === 3 ? setChoicePredicter47(e.logo_t1) : index === 4 ? setChoicePredicter57(e.logo_t1) : setChoicePredicter57(e.logo_t1)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                    </div>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter7(e.logo_t2) : index === 1 ? setChoicePredicter27(e.logo_t2) : index === 2 ? setChoicePredicter37(e.logo_t2) : index === 3 ? setChoicePredicter47(e.logo_t2) : index === 4 ? setChoicePredicter57(e.logo_t2) : setChoicePredicter57(e.logo_t2)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.choicePredicter}>
                                <div className={classes.name}>ggromovvvv</div>
                                <div className={classes.wrapperTeams}>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter8(e.logo_t1) : index === 1 ? setChoicePredicter28(e.logo_t1) : index === 2 ? setChoicePredicter38(e.logo_t1) : index === 3 ? setChoicePredicter48(e.logo_t1) : index === 4 ? setChoicePredicter58(e.logo_t1) : setChoicePredicter58(e.logo_t1)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t1}`} alt="/"/>
                                    </div>
                                    <div className={classes.team} onClick={() => {
                                        index === 0 ? setChoicePredicter8(e.logo_t2) : index === 1 ? setChoicePredicter28(e.logo_t2) : index === 2 ? setChoicePredicter38(e.logo_t2) : index === 3 ? setChoicePredicter48(e.logo_t2) : index === 4 ? setChoicePredicter58(e.logo_t2) : setChoicePredicter58(e.logo_t2)
                                    }}>
                                        <img src={`/images/LogoTeams/${e.logo_t2}`} alt="/"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}

            <div ref={ref}>
                {matchesDate.length === 1 ?
                    <ResultPredicts matches={matchesDate} p1={choicePredicter1} p2={choicePredicter2}
                                    p3={choicePredicter3} p4={choicePredicter4} p5={choicePredicter5}
                                    p6={choicePredicter6} p7={choicePredicter7} p8={choicePredicter8}/> :
                    matchesDate.length === 2 ?
                        <ResultPredicts2 matches={matchesDate} p1={choicePredicter1} p2={choicePredicter2}
                                         p3={choicePredicter3} p4={choicePredicter4} p5={choicePredicter5}
                                         p6={choicePredicter6} p7={choicePredicter7} p8={choicePredicter8}
                                         p21={choicePredicter21} p22={choicePredicter22}
                                         p23={choicePredicter23} p24={choicePredicter24} p25={choicePredicter25}
                                         p26={choicePredicter26} p27={choicePredicter27} p28={choicePredicter28}/> :
                        matchesDate.length === 3 ?
                            <ResultPredicts3 matches={matchesDate} p1={choicePredicter1} p2={choicePredicter2}
                                             p3={choicePredicter3} p4={choicePredicter4} p5={choicePredicter5}
                                             p6={choicePredicter6} p7={choicePredicter7} p8={choicePredicter8}
                                             p21={choicePredicter21} p22={choicePredicter22}
                                             p23={choicePredicter23} p24={choicePredicter24} p25={choicePredicter25}
                                             p26={choicePredicter26} p27={choicePredicter27} p28={choicePredicter28}
                                             p31={choicePredicter31} p32={choicePredicter32}
                                             p33={choicePredicter33} p34={choicePredicter34} p35={choicePredicter35}
                                             p36={choicePredicter36} p37={choicePredicter37} p38={choicePredicter38}/> :
                            matchesDate.length === 4?
                                <ResultPredicts4 matches={matchesDate} p1={choicePredicter1} p2={choicePredicter2}
                                                 p3={choicePredicter3} p4={choicePredicter4} p5={choicePredicter5}
                                                 p6={choicePredicter6} p7={choicePredicter7} p8={choicePredicter8}
                                                 p21={choicePredicter21} p22={choicePredicter22}
                                                 p23={choicePredicter23} p24={choicePredicter24} p25={choicePredicter25}
                                                 p26={choicePredicter26} p27={choicePredicter27} p28={choicePredicter28}
                                                 p31={choicePredicter31} p32={choicePredicter32}
                                                 p33={choicePredicter33} p34={choicePredicter34} p35={choicePredicter35}
                                                 p36={choicePredicter36} p37={choicePredicter37} p38={choicePredicter38}
                                                 p41={choicePredicter41} p42={choicePredicter42}
                                                 p43={choicePredicter43} p44={choicePredicter44} p45={choicePredicter45}
                                                 p46={choicePredicter46} p47={choicePredicter47} p48={choicePredicter48}/> :
                                matchesDate.length >= 5?
                                    <ResultPredicts5 matches={matchesDate} p1={choicePredicter1} p2={choicePredicter2}
                                                     p3={choicePredicter3} p4={choicePredicter4} p5={choicePredicter5}
                                                     p6={choicePredicter6} p7={choicePredicter7} p8={choicePredicter8}
                                                     p21={choicePredicter21} p22={choicePredicter22}
                                                     p23={choicePredicter23} p24={choicePredicter24} p25={choicePredicter25}
                                                     p26={choicePredicter26} p27={choicePredicter27} p28={choicePredicter28}
                                                     p31={choicePredicter31} p32={choicePredicter32}
                                                     p33={choicePredicter33} p34={choicePredicter34} p35={choicePredicter35}
                                                     p36={choicePredicter36} p37={choicePredicter37} p38={choicePredicter38}
                                                     p41={choicePredicter41} p42={choicePredicter42}
                                                     p43={choicePredicter43} p44={choicePredicter44} p45={choicePredicter45}
                                                     p46={choicePredicter46} p47={choicePredicter47} p48={choicePredicter48}
                                                     p51={choicePredicter51} p52={choicePredicter52}
                                                     p53={choicePredicter53} p54={choicePredicter54} p55={choicePredicter55}
                                                     p56={choicePredicter56} p57={choicePredicter57} p58={choicePredicter58}/> :

                            ''}
            </div>

        </>
    );
};

export default RankoffPredicts;


