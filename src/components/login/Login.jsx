import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import AuthService from './../auth/auth-service';

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
        <figure className="logo">
        <img src="../../images/logo.png" alt="Doctor Helper in green, an orange circle behind de letters with a stethoscope icon"/>
        </figure>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="username" placeholder="Your username here" onChange={(e) => this.handleChange(e)}/>
          <input type="password" name="password" placeholder="**********" onChange={(e) => this.handleChange(e)}/>
          <Button btnTitle="Login" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
        <Link to={'/'}>
          <Button btnTitle="Voltar" className="btn-back btn-round btn-primary btn-md" />
        </Link>
      </section>
    )
  }
}

export default Login;
