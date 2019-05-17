import React from 'react';
import App from '../app/App';
import { Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Profile from '../profile/Profile';
import AuthService from './../auth/auth-service';

class Main extends React.Component {
  constructor(){
    super()
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        console.log(response)
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render(){     
    this.fetchUser() 
    console.log(this.state)    
    if(this.state.loggedInUser){ 
      return (
        <div className="main">
          <App userInSession={this.state.loggedInUser} getUser= {this.getTheUser}/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </div>
      );
    } else{
      return (
        <div className="main">  
          {/* <App userInSession={this.state.loggedInUser}/>      */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
            {/* <Route exact path='/profile' component={Profile} /> */}
          </Switch>
        </div>
      );
    }  
  }
}

export default Main;