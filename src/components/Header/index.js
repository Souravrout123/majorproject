import React from 'react';
import logo from '../../images/logo.png';
import './styles.scss';
import { Link } from 'react-router-dom';
import {auth} from './../../firebase/utlis';

import { connect } from 'react-redux';


const Header = props => {
    const { currentUser } = props;
    return (
        <div className="header">
            <div className="wrap">
                <div className="logo">
                    <Link to="/">
                        <img style={{ width: "50px", heigh: "50px" }} src={logo} alt="images"></img>
                    </Link>
                </div>
            </div>
            <div className="callToAction">
                {!currentUser && (
                    <ul>
                        <li>
                            <Link to="/registration">
                                Register
                            </Link>
                        </li>
                        <li>
                            <Link to="/Login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin">
                                Signin
                            </Link>
                        </li>
                    </ul>

                )}
                {currentUser &&(
                    <ul>
                        <li>
                            <span onClick={() => auth.signOut}>
                                Signout
                            </span>
                        </li>
                    </ul>
                )}

            </div>
        </div>
    )
}
Header.defaultProps = {
    currentUser: null
}

const  mapStateToProps = ({user})=>({
    currentUser:user.currentUser
});

export default  connect (mapStateToProps, null) (Header);