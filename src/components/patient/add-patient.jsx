import React, { Component } from 'react';
import Button from '../button/Button';
// import { Link } from 'react-router-dom';

class AddPatient extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      gender: '',
      birthdate: '',
      address: '',
      matrialStatus: '',
      affiliation: '',
      telResidential: '',
      cellphone: '',
      healthInsurance: '',
      bloodType: '',
      surgicalHistory: '',
      familyHistory: '',
      allergies: '',
      id_doctor: '',
    };
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
    // const { name, email, gender, birthdate, address, matrialStatus, affiliation, telResidential, cellphone, healthInsurance, bloodType, surgicalHistory, familyHistory, allergies} = this.state;
    console.log(this.state);
    this.setState({
      name: '',
      email: '',
      gender: '',
      birthdate: '',
      address: '',
      maritalStatus: '',
      affiliation: '',
      telResidential: '',
      cellphone: '',
      healthInsurance: '',
      bloodType: '',
      surgicalHistory: '',
      familyHistory: '',
      allergies: '',
    })
    
  }

  render(){
    return(
      <section className="add-patient">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="name" value={this.state.name} placeholder="Nome do paciente" onChange={(e) => this.handleChange(e)}/>
          <input type="email" name="email" placeholder="E-mail do paciente" value={this.state.email} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="gender" placeholder="Sexo do paciente" value={this.state.gender} onChange={(e) => this.handleChange(e)}/>
          <input type="date" name="birthdate" placeholder="Data de nascimento" value={this.state.birthdate} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="address" placeholder="endereço" value={this.state.address} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="matrialStatus" placeholder="Estado civil" value={this.state.maritalStatus} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="affiliation" placeholder="Filiação" value={this.state.affiliation} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="telResidential" placeholder="Tel residencial" value={this.state.telResidential} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="cellphone" placeholder="Celular" value={this.state.cellphone} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="healthInsurance" placeholder="Convênio médico" value={this.state.healthInsurance} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="bloodType" placeholder="Tipo sanguíneo" value={this.state.bloodType} onChange={(e) => this.handleChange(e)}/>
          <textarea name="surgicalHistory" placeholder="Histórico de cirurgias" value={this.state.surgicalHistory} onChange={(e) => this.handleChange(e)}/>
          <textarea name="familyHistory" placeholder="Histórico familiar" value={this.state.familyHistory} onChange={(e) => this.handleChange(e)}/>
          <textarea name="allergies" placeholder="Alergias" value={this.state.allergies} onChange={(e) => this.handleChange(e)}/>
          <Button btnTitle="Adicionar" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
      </section>
    )
  }
}

export default AddPatient;
