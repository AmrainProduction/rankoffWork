import React, {createRef, useCallback, useEffect, useState} from 'react';
import classes from './rankoffPredicts.module.css'
import {toJpeg, toPng} from 'html-to-image';
import {useGetMatchesByNameQuery, useGetShortMatchByNameQuery, useGetShortMatchQuery} from "../../store/api/apiSlice";
import ResultPredicts from "./PictureResult/resultPredicts";
import logo from "../../logo.svg";

const RankoffPredicts = () => {

    const listMatches = useGetShortMatchQuery()

    const [choiceMatch, setChoiceMatch] = useState([])

    let name = choiceMatch

    const match = useGetShortMatchByNameQuery({name})

    const [choicePredicter1, setChoicePredicter1] = useState([])
    const [choicePredicter2, setChoicePredicter2] = useState([])
    const [choicePredicter3, setChoicePredicter3] = useState([])
    const [choicePredicter4, setChoicePredicter4] = useState([])
    const [choicePredicter5, setChoicePredicter5] = useState([])
    const [choicePredicter6, setChoicePredicter6] = useState([])
    const [choicePredicter7, setChoicePredicter7] = useState([])
    const [choicePredicter8, setChoicePredicter8] = useState([])

    let matchesID = []
    let matchInfo = []

    if (listMatches.data && listMatches.data.length > 0) {
        listMatches.data.map((e) => {
            matchesID.push(e.name_match_for_sort)
        })
    }

    if (match.data && match.data.length > 0) {
        match.data.map((e) => {
            matchInfo.push({
                team1: e.team1,
                team2: e.team2,
                logo_t1: e.logo_t1,
                logo_t2: e.logo_t2,
                match_id: e.name_match_for_sort,
            })
        })
    }



    // useEffect(() => {
    // }, choiceMatch)


//--------------------------------HTML to IMG def-------------------------------------------------

    const ref = createRef(null);

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return
        }

        toJpeg(ref.current, {cacheBust: true,})
            .then((dataUrl) => {
                const link = document.createElement('a')
                link.download = `${choiceMatch}.jpg`
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
                        {matchesID.map((e, index) => {
                            return (
                                <div key={index} className={classes.match} onClick={() => {
                                    setChoiceMatch(e)
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
            <div className={classes.wrapperPredicters} style={{
                display: matchInfo.length > 0 ? "flex" : "none"
            }}>
                <div className={classes.choicePredicter}>
                    <div className={classes.name}>Notch</div>
                    <div className={classes.wrapperTeams}>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter1(matchInfo[0]?.logo_t1)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t1}`} alt="/"/>
                        </div>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter1(matchInfo[0]?.logo_t2)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t2}`} alt="/"/>
                        </div>
                    </div>
                </div>
                <div className={classes.choicePredicter}>
                    <div className={classes.name}>Postanova</div>
                     <div className={classes.wrapperTeams}>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter2(matchInfo[0]?.logo_t1)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t1}`} alt="/"/>
                        </div>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter2(matchInfo[0]?.logo_t2)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t2}`} alt="/"/>
                        </div>
                    </div>
                </div>
                <div className={classes.choicePredicter}>
                    <div className={classes.name}>MonleaR</div>
                     <div className={classes.wrapperTeams}>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter3(matchInfo[0]?.logo_t1)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t1}`} alt="/"/>
                        </div>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter3(matchInfo[0]?.logo_t2)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t2}`} alt="/"/>
                        </div>
                    </div>
                </div>
                <div className={classes.choicePredicter}>
                    <div className={classes.name}>Rower</div>
                     <div className={classes.wrapperTeams}>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter4(matchInfo[0]?.logo_t1)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t1}`} alt="/"/>
                        </div>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter4(matchInfo[0]?.logo_t2)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t2}`} alt="/"/>
                        </div>
                    </div>
                </div>
                <div className={classes.choicePredicter}>
                    <div className={classes.name}>Zadrot</div>
                     <div className={classes.wrapperTeams}>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter5(matchInfo[0]?.logo_t1)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t1}`} alt="/"/>
                        </div>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter5(matchInfo[0]?.logo_t2)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t2}`} alt="/"/>
                        </div>
                    </div>
                </div>
                <div className={classes.choicePredicter}>
                    <div className={classes.name}>raffee</div>
                     <div className={classes.wrapperTeams}>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter6(matchInfo[0]?.logo_t1)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t1}`} alt="/"/>
                        </div>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter6(matchInfo[0]?.logo_t2)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t2}`} alt="/"/>
                        </div>
                    </div>
                </div>
                <div className={classes.choicePredicter}>
                    <div className={classes.name}>oneday</div>
                     <div className={classes.wrapperTeams}>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter7(matchInfo[0]?.logo_t1)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t1}`} alt="/"/>
                        </div>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter7(matchInfo[0]?.logo_t2)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t2}`} alt="/"/>
                        </div>
                    </div>
                </div>
                <div className={classes.choicePredicter}>
                    <div className={classes.name}>wakizashy</div>
                     <div className={classes.wrapperTeams}>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter8(matchInfo[0]?.logo_t1)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t1}`} alt="/"/>
                        </div>
                        <div className={classes.team} onClick={() => {
                            setChoicePredicter8(matchInfo[0]?.logo_t2)
                        }}>
                            <img src={`/images/LogoTeams/${matchInfo[0]?.logo_t2}`} alt="/"/>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={ref}>
                {choiceMatch.length > 0 ?
                    <ResultPredicts match={choiceMatch} p1={choicePredicter1} p2={choicePredicter2}
                                    p3={choicePredicter3} p4={choicePredicter4} p5={choicePredicter5}
                                    p6={choicePredicter6} p7={choicePredicter7} p8={choicePredicter8}/> : ''}
            </div>

        </>
    );
};

export default RankoffPredicts;


