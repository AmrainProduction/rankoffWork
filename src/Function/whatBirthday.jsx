import React from 'react';

const WhatBirthday = (props) => {
    if(props.date === null || props.date === 0){
        return (
            <div>
                Age: ?
            </div>
        )
    } else {
        let day = props.date.slice(8)
        let month = props.date.slice(5,-3)
        let year = props.date.slice(0, -6)

        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // let playerDate = new Date(year, month, day);
        let playerDate = new Date(props.date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
        let playerDateNow = new Date(today.getFullYear(), playerDate.getMonth(), playerDate.getDate());
        let age;

        age = today.getFullYear() - playerDate.getFullYear();

        return (
            <div>
                Age: {age}
            </div>
        )

    }
};

export default WhatBirthday;