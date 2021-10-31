import React from "react";
import './default.scss';
import Header from "./components/Header";
import HomePage from './pages/HomePage';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Signin from "./components/Signin";
import { Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import Recovery from './pages/Recovery';

import { auth, handleUserProfile } from './firebase/utlis';
import { Component } from "react";

import { setCurrentUser } from "./redux/User/user.action";


import { connect} from 'react-redux';


class App extends Component {

  

  authListner = null;

  componentDidMount() {
    this.authListner = auth.onAuthStateChanged( async userAuth =>{
     if(userAuth){
       const userRef = await handleUserProfile(userAuth);
       
       userRef.onSnapshot(snapshot=>{
         this.props.setCurrentUser({
           id:snapshot.id, 
           ...snapshot.data()
         })
       })
     }
     this.props.setCurrentUser(userAuth);
    
    })
  }

  componentWillUnmount() {
  this.authListner();

  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="App">
        <Header />
        <div className="main">
          <Switch>
           
            <Route exact path="/" component={HomePage} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/recovery" component={Recovery} />


            {currentUser &&(
              <Redirect to="/" />
            )}

            {!currentUser &&(
              <Route exact path="/signin" component={Signin} />
            )}
           
          </Switch>
        </div>
        <Footer />
      </div>

    );

  }
}

const mapStateToProps = ({user})=>({
  currentUser:user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default  connect(mapStateToProps,mapDispatchToProps)(App);
