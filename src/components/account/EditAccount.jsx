import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

import Button from '../button/Button'

class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:''
    };    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getTheUser = this.getTheUser.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/doctor/${this.props.userInSession._id}`, {...this.state.user}, {withCredentials:true})
      .then(() => {
        this.getTheUser();
        this.props.history.push("/account");
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target
    const editedUser = {...this.state.user};
    editedUser[name] = value
    this.setState({
      user: editedUser,
    })
  }

  getTheUser() {
    axios.get(`${process.env.REACT_APP_API_URL}/doctor/${this.props.userInSession._id}`)
      .then((result) => {
        console.log(result.data.password);
        this.setState({
          user: result.data
        })
      })
  }

  componentDidMount() {
    this.getTheUser();
  }

  render() {
    if (this.state.user._id) {
      return (
        <section className="edit-account">
          <h2>Edite seus dados</h2>
          <form onSubmit={this.handleFormSubmit}>
  
            <input type="text" name="name" value={this.state.user.name} placeholder="Seu nome" onChange={ e => this.handleChange(e)} required/>
            <input name="crm" value={this.state.user.crm} placeholder="Seu CRM" onChange={e => this.handleChange(e)} required/>
            <input name="prefix" value={this.state.user.prefix} placeholder="Dr.? Dra.?" onChange={e => this.handleChange(e)}/>
            <input type="text" name="specialty" value={this.state.user.specialty} placeholder="Qual sua especialidade?" onChange={e => this.handleChange(e)}/>
            <input type="text" name="email" value={this.state.user.email} placeholder="Seu email" onChange={e => this.handleChange(e)}/>
            {
              (this.state.user.birthdate) ?
                <input type="date" name="birthdate" value={this.state.user.birthdate.slice(0, 10)} onChange={e => this.handleChange(e)}/>
                :
                <input type="date" name="birthdate" value={this.state.user.birthdate} onChange={e => this.handleChange(e)}/>
            }
            <input type="text" name="telResidencial" value={this.state.user.telResidencial} placeholder="Nº do telefone" onChange={e => this.handleChange(e)}/>
            <input type="text" name="cellphone" value={this.state.user.cellphone} placeholder="Nº do celular" onChange={e => this.handleChange(e)}/>
  
            <h3>Editar seus dados de acesso</h3>
            <p>*Deixe em branco para não alterar</p>
  
            <input placeholder="Informe um novo usuário" type="text" name="username"  onChange={e => this.handleChange(e)}/>
            <input placeholder="Informe uma nova senha" type="password" name="password"  onChange={e => this.handleChange(e)}/> 
            
            <Button type="submit" className="btn-round btn-primary btn-md" btnTitle="Enviar" />
            <Link to='/account' >
              <Button className="btn-round btn-cancel mt-0 btn-md" btnTitle="Cancelar"/>
            </Link>
          </form>
        </section>
      );
    } else return null;
  }
}

export default EditAccount;
