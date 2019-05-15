import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </div>
    );
  }
}

export default App;
