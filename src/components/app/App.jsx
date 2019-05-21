import React from 'react';
import { Route, Switch} from 'react-router-dom';
import axios from 'axios';
import AuthService from '../auth/auth-service';
import ProtectedRoute from './../auth/protected-route'
import './App.css'

import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Navbar from '../navbar/Navbar';
import Profile from '../profile/Profile';
import Patient from '../patient/Patient';
import AddPatient from '../patient/AddPatient';
import AddConsultation from '../patient/consultation/AddConsultation'
import Consultation from '../patient/consultation/Consultation'
import Schedulings from "./../scheduling/Schedulings";

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
    if(this.state.loggedInUser){ 
      return (
        <div className="app">
          <Navbar userInSession={this.state.loggedInUser} getUser= {this.getTheUser}/>
          <Switch>
            <Route exact path='/' render={(props) => <Profile {...props} getAllPatients={this.getAllPatients} allPatients={this.state.allPatients} />} />
            {/*<Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />  */}
            <Route exact path='/profile' render={(props) => <Profile {...props} getAllPatients={this.getAllPatients} allPatients={this.state.allPatients} userInSession={this.state.loggedInUser} />} />
            <Route user={this.state.loggedInUser} path='/patient/add-patient' render={(props) => <AddPatient {...props} userInSession={this.state.loggedInUser} />} />
            <Route user={this.state.loggedInUser} exact path='/patient/:id' render={(props) => <Patient {...props} userInSession={this.state.loggedInUser} />} />
            <Route user={this.state.loggedInUser} exact path='/consultation/:patientId/new' render={(props) => <AddConsultation {...props} userInSession={this.state.loggedInUser} />} />
            <Route exact path='/schedulings' component={Schedulings} />
            <Route exact path='/consultation/:id' component={Consultation} />
            
          </Switch>
        </div>
      );
    } else{
      return (
        <div className="app">            
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={(props) => <Login {...props} getUser={this.getTheUser} />}/>
            <Route exact path='/signup' render={(props) => <Signup {...props} getUser={this.getTheUser}/>}/>
            <ProtectedRoute user={this.state.loggedInUser} path='/schedulings' component={Schedulings} />
            <ProtectedRoute user={this.state.loggedInUser} path='/patient/add-patient' component={AddPatient} />
            <ProtectedRoute user={this.state.loggedInUser} path='/profile' component={Profile} />
            <ProtectedRoute user={this.state.loggedInUser} path='/patient/:id' component={Patient} />
          </Switch>
        </div>
      );
    }  
  }
}

export default App;