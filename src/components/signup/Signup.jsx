import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '../button/Button';
import AuthService from './../auth/auth-service';

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      name: ''
    };
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
    const { username, password, name} = this.state;
    this.service.signup(username, password, name)
    .then( response => {
        this.setState({
            username: '', 
            password: '',
            name: '',
        });
        this.props.getUser(response)
    })
    .catch( error => console.log(error) )
  }

  render(){
    return(
      <section className="login">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="username" placeholder="Your username here" onChange={(e) => this.handleChange(e)}/>
          <input type="password" name="password" placeholder="**********" onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="name" placeholder="Your name here" onChange={(e) => this.handleChange(e)}/>
          <Button btnTitle="Signup" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
      </section>
    )
  }
}

export default Signup;
