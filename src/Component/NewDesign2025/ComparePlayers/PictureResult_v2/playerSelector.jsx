import React, {useState} from 'react';
import {useGetPlayersQuery} from "../../../../store/api/apiSlice";
import classes from "../comparePlayers.module.css";

const PlayerSelector = ({label, onSelect}) => {
    const listPlayers = useGetPlayersQuery()

    let [inputValue, setInputValue] = useState("")
    let [filteredPlayers, setFilteredPlayers] = useState([])
    const [showDropdownMenu, setShowDropdownMenu] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const handleChoicePlayer = (event) => {
        const value = event.target.value
        setSelectedIndex(-1)
        setInputValue(value)

        if (value.trim() === "") {
            setFilteredPlayers([])
            setShowDropdownMenu(false)
        } else {
            const filtered = listPlayers.data?.filter(e =>
                e.nickname.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredPlayers(filtered)
            setShowDropdownMenu(filtered.length > 0)
        }
    }

    const handleSelectPlayer = (player) => {
        setInputValue(player)
        setShowDropdownMenu(false)
        setSelectedIndex(-1)
        onSelect(player)
    }

    const handleKeyDown = (event) => {
        if (!showDropdownMenu) return;

        if (event.key === "ArrowDown") {
            setSelectedIndex((prev) => Math.min(prev + 1, filteredPlayers.length - 1))
        } else if (event.key === "ArrowUp") {
            setSelectedIndex((prev) => Math.max(prev - 1, 0))
        } else if (event.key === "Enter" && selectedIndex >= 0) {
            handleSelectPlayer(filteredPlayers[selectedIndex])
            setShowDropdownMenu(false)
        }

        if (event.key === "Enter") {
            setShowDropdownMenu(false)
        }
    }

    return (
        <div className={classes.wrapperList}>
            <div className={classes.titleBox}>{label}</div>
            <input type="text" value={inputValue.nickname} onChange={handleChoicePlayer}
                   onFocus={() => setShowDropdownMenu(filteredPlayers.length > 0)}
                   onKeyDown={handleKeyDown}/>
            {showDropdownMenu &&
                <div className={classes.dropdownMenu}>
                    {filteredPlayers.map((player, index) => {
                        return (
                            <div key={index} className={classes.dropdownMenuItem}
                                 onClick={() => handleSelectPlayer(player)}
                                 style={{
                                     background: selectedIndex === index ? "var(--componentBlockColorHover)" : ""
                                 }}>
                                {player.nickname}
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    );
};

export default PlayerSelector;