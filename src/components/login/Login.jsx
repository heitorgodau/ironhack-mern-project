import React, { Component } from 'react';
import axios from 'axios';
import Button from '../button/Button';
import AuthService from './../auth/auth-service';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.service = new AuthService();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;    
    this.service.login(username, password)
    .then( response => {
      this.setState({ username: "", password: "" });
      console.log(response)
    })
    .catch( error => console.log(error) )
  }

  render(){
    return(
      <section className="login">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="username" placeholder="Your username here" onChange={(e) => this.handleChange(e)}/>
          <input type="password" name="password" placeholder="**********"onChange={(e) => this.handleChange(e)}/>
          <Button btnTitle="Login" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
      </section>
    )
  }
}

export default Login;
