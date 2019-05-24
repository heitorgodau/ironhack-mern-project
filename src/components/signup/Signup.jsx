import React, { Component } from 'react';
import Button from '../button/Button';
import { Link } from 'react-router-dom';
import AuthService from './../auth/auth-service';

function validate(username, password, name) {  
  const errors = [];
  if (username.length === 0) {
    errors.push("Please insert username");
  }
  if (password.length === 0) {
    errors.push("Please insert password");
  }
  if (name.length === 0) {
    errors.push("Please insert name");
  }
  return errors;
}

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      name: '',
      errors: []
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
    console.log(username, password, name)  
    const errors = validate(username, password, name);    
    if (errors.length > 0) {
      this.setState({ errors });
      return;
    }
    this.service.signup(username, password, name)
    .then( response => {
        this.setState({
            username: '', 
            password: '',
            name: '',
            errors: []
        });
        this.props.getUser(response)
        this.props.history.push('/profile')  
    })
    .catch( error => {
      if(username.lenght !==0 && name.length !==0){
        alert("Username allready taken!");    
      }       
      console.log("error sign up",error)} )    
  }

  render(){
    const { errors } = this.state;
    return(
      <section className="signup">
        <figure className="logo">
        <img src="../../images/logo.png" alt="Doctor Helper in green, an orange circle behind de letters with a stethoscope icon"/>
        </figure>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {errors.map(error => (<p key={error} >{error}</p>))}
          <input type="text" name="username" placeholder="Nome de usuário aqui" onChange={(e) => this.handleChange(e)}/>
          <input type="password" name="password" placeholder="**********" onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="name" placeholder="Seu nome aqui" onChange={(e) => this.handleChange(e)}/>
          <Button btnTitle="Signup" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
        <Link to={'/'}>
          <Button btnTitle="Voltar" className="btn-back btn-round btn-primary btn-md" />
        </Link>
      </section>
    )
  }
}

export default Signup;
