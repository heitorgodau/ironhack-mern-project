import React, { Component } from "react";
import axios from "axios";
import Button from '../button/Button';
import { Link } from 'react-router-dom';

import './account.css';

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
    axios.get(`${process.env.REACT_APP_API_URL}/doctor/${this.props.userInSession._id}`, {withCredentials:true})
    .then((result) => {           
      this.setState({
        doctor: result.data,
      },)      
    });
  }

  render() {
    return (
      <section className='account'>
        <h2>Meus dados</h2>
        <div className="user-data">
          <h3>Nome: <span>{this.state.doctor.name}</span></h3>
          <h3>Username: <span>{this.state.doctor.username}</span></h3>
          <h3>CRM: <span>{this.state.doctor.crm}</span></h3>
          <h3>Prefixo: <span>{this.state.doctor.prefix}</span></h3>
          <h3>Especialidade: <span>{this.state.doctor.specialty}</span></h3>
          <h3>Email: <span>{this.state.doctor.email}</span></h3>
          {
            (this.state.doctor.birthdate)?
              <h3>Data de nascimento: <span>{this.state.doctor.birthdate.slice(0, 10).split('-').reverse().join('-')}</span></h3>
              :
              <h3>Data de nascimento: <span>{this.state.doctor.birthdate}</span></h3>
          }
          <h3>Telefone residencial: <span>{this.state.doctor.telResidencial}</span></h3>
          <h3>Celular: <span>{this.state.doctor.cellphone}</span></h3>
        </div>
        <Link to={`/account/${this.props.userInSession._id}`}>            
            <Button  btnTitle='Editar' className="btn-primary btn-md btn-round" />
        </Link> 
      </section>
    );
  }
}

export default Account; 




