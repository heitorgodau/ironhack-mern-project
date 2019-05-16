import React, { Component } from 'react';
import axios from 'axios';
import Button from '../button/Button';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password} = this.state;
    axios.post("http://localhost:5000/api/login", 
    { password, username })
  }

  render(){
    return(
      <section className="login">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="username" placeholder="Your username here" onChange={(e) => this.handleChange(e)}/>
          <input type="password" name="password" placeholder="**********"/>
          <Button btnTitle="Login" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
      </section>
    )
  }
}

export default Login;
