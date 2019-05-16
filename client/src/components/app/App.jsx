import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Profile from '../profile/Profile';
import Navbar from '../navbar/Navbar';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </div>
    );
  }
}

export default App;
