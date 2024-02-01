import React from 'react';
import classes from './content.module.css'
import {useEffect} from "react";
import {useGetMatchesQuery, useGetPlayersQuery, useGetTeamsQuery} from "../../store/api/apiSlice";

const Content = () => {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);

        return (
            <div className={classes.wrapperContent}>
                content
            </div>
        );
    }
;

export default Content;