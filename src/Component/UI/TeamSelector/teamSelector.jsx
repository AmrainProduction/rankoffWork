import React, {useEffect, useRef, useState} from 'react';
import classes from "./teamSelector.module.css";
import {useGetTeamsQuery} from "../../../store/api/apiSlice";

const TeamSelector = ({label, onSelect}) => {
    const listTeams = useGetTeamsQuery()

    let [inputValue, setInputValue] = useState("")
    let [filteredTeams, setFilteredTeams] = useState([])
    const [showDropdownMenu, setShowDropdownMenu] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowDropdownMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChoiceTeam = (event) => {
        const value = event.target.value
        setSelectedIndex(-1)
        setInputValue(value)

        if (value.trim() === "") {
            setFilteredTeams([])
            setShowDropdownMenu(false)
        } else {
            const filtered = listTeams.data?.filter(e =>
                e.name_team.toLowerCase().includes(value.toLowerCase()) || e.tag_team?.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredTeams(filtered)
            setShowDropdownMenu(filtered.length > 0)
        }
    }

    const handleSelectTeam = (team) => {
        setInputValue(team)
        setShowDropdownMenu(false)
        setSelectedIndex(-1)
        onSelect(team)
    }

    const handleKeyDown = (event) => {
        if (!showDropdownMenu) return;

        if (event.key === "ArrowDown") {
            setSelectedIndex((prev) => Math.min(prev + 1, filteredTeams.length - 1))
        } else if (event.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.max(prev - 1, 0))
        } else if (event.key === "Enter" && selectedIndex >= 0) {
            handleSelectTeam(filteredTeams[selectedIndex])
            setShowDropdownMenu(false)
        }

        if (event.key === "Enter") {
            setShowDropdownMenu(false)
        }
    }

    return (
        <div className={classes.wrapperList} ref={wrapperRef}>
            <div className={classes.titleBox}>{label}</div>
            <input type="text"
                   value={inputValue.name_team}
                   onChange={handleChoiceTeam}
                   onFocus={() => setShowDropdownMenu(filteredTeams.length > 0)}
                   onKeyDown={handleKeyDown}
                   className={classes.inputData}/>
            {showDropdownMenu &&
                <div className={classes.dropdownMenu}>
                    {filteredTeams.map((team, index) => {
                        return (
                            <div
                                key={index}
                                className={classes.dropdownMenuItem}
                                onClick={() => handleSelectTeam(team)}
                                style={{
                                    background: selectedIndex === index ? "var(--componentBlockColorHover)" : ""
                                }}>
                                {team.name_team}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
};

export default TeamSelector;