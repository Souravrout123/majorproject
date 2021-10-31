import React, { Component } from 'react'
import FormInput from './../forms/Forminput';
import AuthWrapper from './../AuthWrapper';
import {auth} from './../../firebase/utlis';
import { withRouter } from 'react-router';

import './styles.scss';

const initialState = {
    email:'',
    errors:[]
}

 class RecoverPassword extends Component {

    constructor(props){
        super(props);
        this.state = {...initialState }
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e){
        const{name,value} = e.target;
        this.setState({
            [name]:value
        })
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        const{email}= this.state;

        const config = {
            url:'http://loccalhost:3000/signin'
        }
        
        try{
            await auth.sendPasswordResetEmail(email,config)
            .then(()=>{
               this.props.history.push('/signin');

            })
            .catch(()=>{
                const err = ["Email not found"];
                this.setState({
                    errors:err
                })
            });
        }catch(err){
            console.log(err);
        }
    }

    render() {
        const configAuthWrapper = {
            headline : 'Forgot Password '
        }

        const{email,errors} = this.state;


        return (
           <AuthWrapper {...configAuthWrapper}>
               <div className="formWrap">
                   {errors.length >0 && (
                       <ul>
                           {errors.map((e,index)=>{
                               return(<li key={index}>
                                   {e} 
                                   </li>)
                           })}

                        </ul>
                   )}

                   <form onSubmit = {this.handleSubmit}>
                       <FormInput
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange= {this.handleChange}
                       />

                       <button className="btn" type="submit" >Recover Password</button>
                       

                   </form>
               </div>

           </AuthWrapper>
        )
    }
}

export default withRouter(RecoverPassword);