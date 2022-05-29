import React from 'react';
import './NavBar.css';
const NavBar = ({ text, link }) => {
    const onButtonClick = (e) => {
        e.preventDefault();
        window.location.href = link;
    }


    const onLogoClick = (e) => {
        e.preventDefault();
        window.location.href = "/";
    }
    return (
        <div className="header">
            <div className="header-logo">
                <a href="/" onClick={onLogoClick}>
                    <img width="120" height="auto" src="/logo.png" alt="logo" />
                </a>
            </div>
            <div className="header-button">
                <button onClick={(e) => onButtonClick(e)} className="btn btn-primary">{text}</button>
            </div>
        </div>
    );
};

export default NavBar;