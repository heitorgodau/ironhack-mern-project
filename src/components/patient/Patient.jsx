import React, { Component } from 'react';
import axios from 'axios';
import Button from '../button/Button';
import './patient.css'

import Consultations from './consultation/Consultations'

export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      patientAge: 0,
      moreInfo: false,
      edit: false,
    }
        
    this.getOnePatient = this.getOnePatient.bind(this);
    this.editPatient = this.editPatient.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.getAge = this.getAge.bind(this);
  }

  getOnePatient() {
    axios.get(`${process.env.REACT_APP_API_URL}/patient/${this.props.match.params.id}`, {withCredentials:true})
      .then((result) => {
        this.setState({
          patient: result.data,
        }, () => this.getAge())
      });
  }
  
  getAge() {
    const todayYear = new Date().getFullYear();
    const birthYear = this.state.patient.birthdate.split('-')[0];
    const age = todayYear - birthYear;
    this.setState({
      patientAge: age,
    })
  }
  
  editPatient() {
    this.setState({
      edit: !this.state.edit,
    })
  }

  cancelEdit() {
    this.getOnePatient()
    this.editPatient()
  }

  toggleInfo() {
    this.setState({
      moreInfo: !this.state.moreInfo,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/patient/${this.props.match.params.id}`, {...this.state.patient})
      .then(() => {
        this.editPatient();
        this.getAge();
      })
  }

  handleChange(event) {
    const { name, value } = event.target
    const editedPatient = {...this.state.patient};
    editedPatient[name] = value
    this.setState({
      patient: editedPatient,
    })
  }
  
  componentDidMount() {
    this.getOnePatient();
  }

  render() {
    if (this.state.moreInfo && this.state.edit) {
      return(
        <section className="edit-patient">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="name" value={this.state.patient.name} placeholder="Nome do paciente" onChange={(e) => this.handleChange(e)}/>
          <input type="email" name="email" placeholder="E-mail do paciente" value={this.state.patient.email} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="gender" placeholder="Sexo do paciente" value={this.state.patient.gender} onChange={(e) => this.handleChange(e)}/>
          {
            this.state.patient.birthdate !== undefined 
            ? 
            <input type="date" name="birthdate" placeholder="Data de nascimento" value={this.state.patient.birthdate.slice(0,10)} onChange={(e) => this.handleChange(e)} /> 
            :
            <input type="date" name="birthdate" placeholder="Data de nascimento" onChange={(e) => this.handleChange(e)} />
          }
          <input type="text" name="address" placeholder="endereço" value={this.state.patient.address} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="maritalStatus" placeholder="Estado civil" value={this.state.patient.maritalStatus} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="affiliation" placeholder="Filiação" value={this.state.patient.affiliation} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="telResidential" placeholder="Tel residencial" value={this.state.patient.telResidential} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="cellphone" placeholder="Celular" value={this.state.patient.cellphone} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="healthInsurance" placeholder="Convênio médico" value={this.state.patient.healthInsurance} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="bloodType" placeholder="Tipo sanguíneo" value={this.state.patient.bloodType} onChange={(e) => this.handleChange(e)}/>
          <textarea name="surgicalHistory" placeholder="Histórico de cirurgias" value={this.state.patient.surgicalHistory} onChange={(e) => this.handleChange(e)}/>
          <textarea name="familyHistory" placeholder="Histórico familiar" value={this.state.patient.familyHistory} onChange={(e) => this.handleChange(e)}/>
          <textarea name="allergies" placeholder="Alergias" value={this.state.patient.allergies} onChange={(e) => this.handleChange(e)}/>
          <Button btnTitle="Enviar" className="btn-primary btn-md btn-round" type="submit" />
          <Button btnTitle="Cancelar" className="mt-0 btn-cancel btn-md btn-round" onClick={() => this.cancelEdit()} />
        </form>
      </section>
      )
    
    } else if (this.state.moreInfo && !this.state.edit) {
      return(
        <section className="patient-view">
          <div className="patient-data">
            <h2>Prontuário: {this.state.patient._id}</h2>    
            <div className="patient-row health-insurance">
              <h3>Plano de Saude:</h3>
              <h4>{this.state.patient.healthInsurance}</h4>
            </div>       
            <div className="basic-info">
              <h3>{this.state.patient.name}</h3>
              <div className="age-gender">
                <h4>{this.state.patient.gender}/</h4>
                <h4>{this.state.patientAge} anos</h4>
              </div>
            </div>
            <div className="patient-row birthdate">
              <h3>Data de Nascimento:</h3>
              <h4>{this.state.patient.birthdate.slice(0,10).split('-').reverse().join('/')}</h4>
            </div>
            <div className="patient-row email">
              <h3>Email:</h3>
              <h4>{this.state.patient.email}</h4>
            </div>
            <div className="patient-row address">
              <h3>Endereço:</h3>
              <h4>{this.state.patient.address}</h4>
            </div>
            <div className="patient-row tel-res">
              <h3>Telefone residencial:</h3>
              <h4>{this.state.patient.telResidential}</h4>
            </div>
            <div className="patient-row cellphone">
              <h3>Celular:</h3>
              <h4>{this.state.patient.cellphone}</h4>
            </div>
            <div className="patient-row marital-status">
              <h3>Estado civil:</h3>
              <h4>{this.state.patient.maritalStatus}</h4>
            </div>
            <div className="patient-row affiliation">
              <h3>Filiação:</h3>
              <h4>{this.state.patient.affiliation}</h4>
            </div>           
            <div className="patient-row blood-type">
              <h3>Tipo sanguíneo:</h3>
              <h4>{this.state.patient.bloodType}</h4>
            </div>
            <div className="patient-row surgical-history">
              <h3>Histórico médico:</h3>
              <h4>{this.state.patient.surgicalHistory}</h4>
            </div>
            <div className="patient-row family-history">
              <h3>Histórico familiar:</h3>
              <h4>{this.state.patient.familyHistory}</h4>
            </div>
            <div className="patient-row allergies">
              <h3>Alergias:</h3>
              <h4>{this.state.patient.allergies}</h4>
            </div>
            <div className="patient-row creation-date">
              <h3>Data de criação:</h3>
              {
                this.state.patient.created_at ? <h4>{this.state.patient.created_at.slice(0,10).split('-').reverse().join('-')}</h4> : null
              }
            </div>
            <Button btnTitle="Esconder informações" className="btn-transparent" onClick={this.toggleInfo} />
            <Button btnTitle="Editar Informações" className="btn-center btn-primary btn-md btn-round" onClick={this.editPatient} />

          </div>
          <Consultations patientId={this.props.match.params.id} userInSession={this.state.loggedInUser} />
        </section>
      )
    
    } else {
      return(
        <section className="patient-view">
          <div className="patient-data">
            <h2>Prontuário: {this.state.patient._id}</h2>
            <div className="patient-row health-insurance">
              <h3>Plano de Saude:</h3>
              <h4>{this.state.patient.healthInsurance}</h4>
            </div>
            <div className="basic-info">
              <h3>{this.state.patient.name}</h3>
              <div className="age-gender">
                <h4>{this.state.patient.gender}/</h4>
                <h4>{this.state.patientAge} anos</h4>
              </div>
            </div>
            <div className="patient-row blood-type">
              <h3>Tipo sanguíneo:</h3>
              <h4>{this.state.patient.bloodType}</h4>
            </div>
            <div className="patient-row creation-date">
              <h3>Data de criação:</h3>
              {
                this.state.patient.created_at ? <h4>{this.state.patient.created_at.slice(0,10).split('-').reverse().join('-')}</h4> : null
              }
            </div>
            <Button btnTitle="Mais informações" className="btn-transparent" onClick={this.toggleInfo} />
          </div>
         <Consultations patientId={this.props.match.params.id} userInSession={this.state.loggedInUser} />
        </section>
      )
    }
  }
}