import React, { Component } from "react";
import axios from "axios";
import Button from '../button/Button';
import { Link } from 'react-router-dom';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: this.props.userInSession,      
    };
    this.getSingleDoctor = this.getSingleDoctor.bind(this);  
  } 

  componentDidMount() {
    this.getSingleDoctor();
  }  

  getSingleDoctor() {
    axios.get(`http://localhost:5000/api/doctor/${this.props.userInSession._id}`, {withCredentials:true})
    .then((result) => {           
      this.setState({
        doctor: result.data,
      },)      
    });
  }

  render() {
    return (
      <section className='account'>
        <h1>MINHA CONTA</h1>
        <h2>Nome: {this.state.doctor.name}</h2>
        <h2>Username: {this.state.doctor.username}</h2>
        <h2>CRM: {this.state.doctor.crm}</h2>
        <h2>Prefixo: {this.state.doctor.prefix}</h2>
        <h2>Especialidade: {this.state.doctor.specialty}</h2>
        <h2>Email: {this.state.doctor.email}</h2>
        <h2>Data de nascimento: {this.state.doctor.birthdate.slice(0, 10).split('-').reverse().join('-')}</h2>
        <h2>Telefone residêncial: {this.state.doctor.telResidencial}</h2>
        <h2>Celular: {this.state.doctor.cellphone}</h2>      
        <Link to={`/account/${this.props.userInSession._id}`}>            
            <Button  btnTitle='Editar' className="btn-primary btn-md btn-round" />
        </Link> 
      </section>
    );
  }
}

export default Account; 




