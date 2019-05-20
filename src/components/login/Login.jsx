import React, { Component } from 'react';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import AuthService from './../auth/auth-service';
import './login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
    this.service = new AuthService();    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {    
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(event) {    
    event.preventDefault();
    const { username, password } = this.state;    
    this.service.login(username, password)
    .then((response) => {
      this.setState({ username: "", password: "" });      
      this.props.getUser(response);
      this.props.history.push('/profile')           
    })
    .catch( error => {
      alert("Invalid user name or password");   
      console.log(error); 
    })
  }

  render(){
    return(
      <section className="login">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="username" placeholder="Your username here" onChange={(e) => this.handleChange(e)}/>
          <input type="password" name="password" placeholder="**********" onChange={(e) => this.handleChange(e)}/>
          <Button btnTitle="Login" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
          <p>You don't have an account?</p>
          <Link to='/signup'>
            <Button btnTitle="Signup" className="btn-primary btn-md btn-round"/>
          </Link>
        </form>
      </section>
    )
  }
}

export default Login;
