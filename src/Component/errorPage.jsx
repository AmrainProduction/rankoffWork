import React from 'react';
import Navbar from "./NavbarV2/navbar";
import Footer from "./Footer/footer";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="App">
            <header className="header">
                <Navbar/>
            </header>
            <main className='main'>
                <div className="wrapperErrorPage">
                    <strong>Something went wrong... <br/>
                        Come back {" "}
                        <Link to={'/'} className="btnHome">home)</Link>
                    </strong>
                </div>
            </main>
            <footer className='footer'>
                <Footer/>
            </footer>
        </div>
    );
};

export default ErrorPage;