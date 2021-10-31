import React, { Component } from 'react'
import './styles.scss';
import FormInput from './../forms/Forminput';

import AuthWrapper from './../AuthWrapper';

import { auth, firestore, handleUserProfile } from './../../firebase/utlis';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    reEnterPassword: '',
    errors: []
}

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ...initialState

        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, reEnterPassword, errors } = this.state;

        if (password !== reEnterPassword) {
            const err = ['password don/t match'];
            this.setState({
                errors: err
            });
            return;
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await handleUserProfile(user, { displayName });

            this.setState({ ...initialState });


        } catch (err) {
            console.log(err);
        }
    }


    render() {

        const { displayName, email, password, reEnterPassword, errors } = this.state;
        const configAuthWrapper = {
            headline : "Register"
        }

        return (
            <AuthWrapper {...configAuthWrapper}>


                <div className="formWrap">
                    {errors.length > 0 && (
                        <ul>
                            {errors.map((err, index) => {
                                return (
                                    <li key={index}>
                                        {err}
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full Name"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email Adress"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="password"
                            value={password}
                            placeholder="password"
                            onChange={this.handleChange}
                        />

                        <FormInput
                            type="password"
                            name="reEnterPassword"
                            value={reEnterPassword}
                            placeholder="Re Enter Password"
                            onChange={this.handleChange}
                        />

                        <button className="btn">Register</button>

                    </form>
                </div>
            </AuthWrapper>
        );
    }
}
