import React, { Component } from "react";
import axios from "axios";

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
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeCrm = this.handleChangeCrm.bind(this);
    this.handleChangePrefix = this.handleChangePrefix.bind(this);
    this.handleChangeSpecialty = this.handleChangeSpecialty.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
    this.handleChangeTelResidencial = this.handleChangeTelResidencial.bind(this);
    this.handleChangeCellphone = this.handleChangeCellphone.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
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
        `http://localhost:5000/api/doctor/${this.props.userInSession._id}`, { name, crm, specialty, prefix, email, birthdate, telResidencial, cellphone, username, password }, {withCredentials:true})
      .then(() => {
        this.props.history.push("/account");
      })
      .catch(error => console.log(error));
  }

  handleChangeName(event) {  
    this.setState({
      name: event.target.value
    })
  }

  handleChangeCrm(event) {  
    this.setState({
      crm: event.target.value
    })
  }

  handleChangePrefix(event){
    this.setState({
      prefix: event.target.value
    })
  }

  handleChangeSpecialty(event) {  
    this.setState({
      specialty: event.target.value
    })
  }

  handleChangeEmail(event) {  
    this.setState({
      email: event.target.value
    })
  }

  handleChangeBirthDate(event) {  
    this.setState({
      birthdate: event.target.value
    })
  }

  handleChangeTelResidencial(event) {  
    this.setState({
      telResidencial: event.target.value
    })
  }

  handleChangeCellphone(event) {  
    this.setState({
      cellphone: event.target.value
    })
  }

  handleChangeUsername(event){
    this.setState({
      username: event.target.value
    })
  }

  handleChangePassword(event){
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <section className="edit-form">
        <h2>{this.state.name}</h2>
        <hr/>
        <strong>Editar informações pessoais</strong>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nome: </label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChangeName(e)} required/>
          <label>CRM: </label>
          <input name="crm" value={this.state.crm} onChange={e => this.handleChangeCrm(e)} required/>
          <label>Prefixo: </label>
          <input name="prefix" value={this.state.prefix} onChange={e => this.handleChangePrefix(e)}/>
          <label>Especialidade: </label>
          <input type="text" name="specialty" value={this.state.specialty} onChange={e => this.handleChangeSpecialty(e)}/>
          <label>E-mail: </label>
          <input type="text" name="email" value={this.state.email} onChange={e => this.handleChangeEmail(e)}/>
          <label>Data de nascimento: </label>
          <input type="text" name="birthdate" value={this.state.birthdate} onChange={e => this.handleChangeBirthDate(e)}/>
          <label>Telefone Residêncial: </label>
          <input type="text" name="telResidencial" value={this.state.telResidencial} onChange={e => this.handleChangeTelResidencial(e)}/>
          <label>Celular: </label>
          <input type="text" name="cellphone" value={this.state.cellphone} onChange={e => this.handleChangeCellphone(e)}/>
          <hr/>
          <strong>Editar informações de acesso</strong>
          <label>Usuário: </label>
          <input placeholder="Informe um novo usuário" type="text" name="username"  onChange={e => this.handleChangeUsername(e)}/>
          <label>Senha: </label>
          <input placeholder="Informe uma nova senha" type="text" name="password"  onChange={e => this.handleChangePassword(e)}/> 
          <input type="submit" value="Submit" />
        </form>
      </section>
    );
  }
}

export default EditAccount;
