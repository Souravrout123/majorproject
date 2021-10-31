import React, { Component } from 'react';
import { Button } from '../forms/Button';
import './styles.scss';

import { signInWithGoogle, auth } from './../../firebase/utlis';
import FromInput from './../forms/Forminput';
import AuthWrapper from './../AuthWrapper';
import { Link } from 'react-router-dom';

const initialState = {
    email: '',
    password: ''
}

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = { ...initialState };
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = async e => {
        e.preventDefault();

        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ ...initialState })
        } catch (err) {
            console.log(err);
        }

    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }
        )
    }

    render() {
        const { email, password } = this.state;
        const configAuthWrapper = {
            headline : 'Sign In'
        }
        return (
            <AuthWrapper  {...configAuthWrapper}>

                <div className="formWrap">
                    <form onSubmit={this.handleSubmit}>

                        <FromInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handleChange}

                        />

                        <FromInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}

                        />

                        <button className="btn" type="submit">Login</button>


                        <div className="socialSignin">
                            <div className="row">
                                <Button onClick={signInWithGoogle}>
                                    Sign In with Google
                                </Button>
                            </div>
                            <div className="row">
                                <Button>
                                    Login with Facebook
                                </Button>
                            </div>
                            <div classsName="links">
                                <Link to="/recovery">Forgot Password</Link>
                            </div>
                        </div>
                    </form>
                </div>

            </AuthWrapper>
        )

    }
}


export default SignIn;