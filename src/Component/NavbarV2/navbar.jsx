import React from 'react';
import './navbar.css';
import logo1 from './../../logo.svg';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul className='contentLinks'>
                <NavLink to='/' className='logoLink'>
                    <img src={logo1} className='AppLogo' alt="logo"/>
                </NavLink>
                {/*<NavLink to={'functions'} className='navLink'>*/}
                {/*    <li>Functions</li>*/}
                {/*</NavLink>*/}
                {/*<NavLink to={'MatchResult'} className='navLink'>*/}
                {/*    <li>Match Result</li>*/}
                {/*</NavLink>*/}
                {/*<NavLink to={'TopPlayersGroupStageResult'} className='navLink'>*/}
                {/*    <li>TopPlayersGroupStage Result</li>*/}
                {/*</NavLink>*/}
            </ul>
        </nav>
    );
};

export default Navbar;