import React from 'react';
import logo from '../../images/logo.png';
import'./styles.scss';
import { Link } from 'react-router-dom';

const Header = props =>{
    return (
        <div className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                         <img  style= {{width:"50px", heigh:"50px"}}src={logo} alt="images"></img>
                    </Link>
                </div>
            </div>
            <div className="callToAction">
                <ul>
                    <li>
                        <Link to="/registration">
                            Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            About
                        </Link>
                    </li>
                </ul>   
            </div>
        </div>
    )
}

export default Header;