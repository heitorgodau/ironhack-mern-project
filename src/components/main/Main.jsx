import React from 'react';
import App from '../app/App';
import { Route, Switch} from 'react-router-dom';
import Home from '../home/Home';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import Profile from '../profile/Profile';

export default class Main extends React.Component {
  render(){    
    return (
      <div className="main">
        <App />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </div>
    )
  }
}