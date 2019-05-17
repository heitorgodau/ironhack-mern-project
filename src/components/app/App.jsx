import React from 'react';
import { Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Navbar from '../navbar/Navbar';
import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Profile from '../profile/Profile';
import Patient from '../patient/Patient';
import AuthService from '../auth/auth-service';

class App extends React.Component {
  constructor(){
    super()
    this.state = { 
      loggedInUser: null,
      allPatients: [],
    };
    this.service = new AuthService();
    this.getAllPatients = this.getAllPatients.bind(this);
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

  getAllPatients(callback) {
    axios.get('http://localhost:5000/api/patients')
    .then((response => {
      this.setState({
        allPatients: response.data,
      })
      callback(response.data);
    }))
    .catch((err) => {
      throw new Error(err);
    });
  }
  
  // this.getAllPatients()
  render(){     
    this.fetchUser() 
    console.log('##################',this.state)    
    if(this.state.loggedInUser){ 
      return (
        <div className="app">
          <Navbar userInSession={this.state.loggedInUser} getUser= {this.getTheUser}/>
          <Switch>
            <Route exact path='/' render={(props) => <Profile {...props} getAllPatients={this.getAllPatients} allPatients={this.state.allPatients} />} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/profile' render={(props) => <Profile {...props} getAllPatients={this.getAllPatients} allPatients={this.state.allPatients} />} />
            <Route exact path='/patient/:id' component={Patient} />
          </Switch>
        </div>
      );
    } else{
      return (
        <div className="app">            
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/> 
          </Switch>
        </div>
      );
    }  
  }
}

export default App;