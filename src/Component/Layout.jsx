import React from 'react';
import Navbar from "./NavbarV2/navbar";
import Footer from "./Footer/footer";
import {Outlet} from 'react-router-dom'

const Layout = () => {

    return (
        <>
            <div className="App">
                {/*<header className="header">*/}
                {/*    <Navbar/>*/}
                {/*</header>*/}
                <main className='main'>
                    <Outlet/>
                </main>
            </div>
        </>

    );
};

export default Layout;