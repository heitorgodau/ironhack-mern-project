import React from 'react';
import Navbar from '../navbar/Navbar';
import { Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Profile from '../profile/Profile';
import Patient from '../patient/Patient';
import AuthService from '../auth/auth-service';
import ProtectedRoute from './../auth/protected-route'

class App extends React.Component {
  constructor(){
    super()
    this.state = { loggedInUser: null };
    this.service = new AuthService();
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

  render(){     
    this.fetchUser()       
    if(this.state.loggedInUser){ 
      return (
        <div className="app">
          <Navbar userInSession={this.state.loggedInUser} getUser= {this.getTheUser}/>
          <Switch>
            {/* <Route exact path='/' component={Profile} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />  */}
            <ProtectedRoute user={this.state.loggedInUser} path='/profile' component={Profile} />
            <ProtectedRoute user={this.state.loggedInUser} path='/patient/:id' component={Patient} />
          </Switch>
        </div>
      );
    } else{
      return (
        <div className="app">            
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />}/>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/> 
            <ProtectedRoute user={this.state.loggedInUser} path='/profile' component={Profile} />
            <ProtectedRoute user={this.state.loggedInUser} path='/patient/:id' component={Patient} />
          </Switch>
        </div>
      );
    }  
  }
}

export default App;