import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Button from '../button/Button'

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userInSession.name,
      crm: this.props.userInSession.crm,
      specialty: this.props.userInSession.specialty,
      prefix: this.props.userInSession.prefix,
      email: this.props.userInSession.email,
      birthdate: this.props.userInSession.birthdate,
      telResidencial: this.props.userInSession.telResidencial,
      cellphone: this.props.userInSession.cellphone,   
      username: this.props.userInSession.username,
      password: this.props.userInSession.password
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const {
      name,
      crm,
      specialty,
      prefix,
      email,
      birthdate,
      telResidencial,
      cellphone,
      username,
      password
    } = this.state;
    axios
      .put(
        `http://localhost:5000/api/doctor/${this.props.userInSession._id}`, { name, crm, specialty, prefix, email, birthdate, telResidencial, cellphone, username, password })
      .then(() => {
        this.props.history.push("/account");
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target    
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <section className="edit-account">
        <h2>Edite seus dados</h2>
        <form onSubmit={this.handleFormSubmit}>

          <input type="text" name="name" value={this.state.name} placeholder="Seu nome" onChange={e => this.handleChange(e)} required/>
          <input name="crm" value={this.state.crm} placeholder="Seu CRM" onChange={e => this.handleChange(e)} required/>
          <input name="prefix" value={this.state.prefix} placeholder="Dr.? Dra.?" onChange={e => this.handleChange(e)}/>
          <input type="text" name="specialty" value={this.state.specialty} placeholder="Qual sua especialidade?" onChange={e => this.handleChange(e)}/>
          <input type="text" name="email" value={this.state.email} placeholder="Seu email" onChange={e => this.handleChange(e)}/>
          <input type="text" name="birthdate" value={this.state.birthdate} placeholder="Data de nascimento" onChange={e => this.handleChange(e)}/>
          <input type="text" name="telResidencial" value={this.state.telResidencial} placeholder="Nº do telefone" onChange={e => this.handleChange(e)}/>
          <input type="text" name="cellphone" value={this.state.cellphone} placeholder="Nº do celular" onChange={e => this.handleChange(e)}/>

          <h3>Editar seus dados de acesso</h3>
          <p>*Deixe em branco para não alterar</p>

          <input placeholder="Informe um novo usuário" type="text" name="username"  onChange={e => this.handleChange(e)}/>
          <input placeholder="Informe uma nova senha" type="text" name="password"  onChange={e => this.handleChange(e)}/> 

          <Button type="submit" className="btn-round btn-primary btn-md" btnTitle="Enviar" />
          <Link to='/account' >
            <Button className="btn-round btn-cancel mt-0 btn-md" btnTitle="Cancelar"/>
          </Link>
        </form>
      </section>
    );
  }
}

export default EditAccount;
