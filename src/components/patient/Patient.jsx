import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../button/Button';
import './patient.css'

export default class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: [],
      patientAge: 0,
      consultations: [],
      moreInfo: false,
      edit: false,
    }
    
    this.getAge = this.getAge.bind(this);
    this.getOnePatient = this.getOnePatient.bind(this);
    this.getAllConsultations = this.getAllConsultations.bind(this);
    this.EditPatient = this.EditPatient.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  getOnePatient() {
    axios.get(`http://localhost:5000/api/patient/${this.props.match.params.id}`)
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
  
  EditPatient() {
    this.setState({
      edit: !this.state.edit,
    })
  }

  toggleInfo() {
    this.setState({
      moreInfo: !this.state.moreInfo,
    })
  }
  
  getAllConsultations() {
    axios.get(`http://localhost:5000/api/consultations`)
    .then((result) => {        
      this.setState({
        consultations: result.data,
      })      
    });
  }
  
  componentDidMount() {
    this.getOnePatient();
    this.getAllConsultations();
  }

  render() {
    if (this.state.moreInfo && this.state.edit) {
      return(
        <section className="patient-info">
          <h1 style={{marginTop: '50'}}>Patient Edit</h1>
          <Button className="btn-primary btn-round btn-md" btnTitle="Enviar" onClick={this.toggleEdit} />
        </section>
      )
    
    } else if (this.state.moreInfo && !this.state.edit) {
      return(
        <section className="patient-view">
          <div className="patient-data">
            <h2>Prontuário: {this.state.patient._id}</h2>
            <div className="basic-info">
              <h3>{this.state.patient.name}</h3>
              <div className="age-gender">
                <h4>{this.state.patient.gender}/</h4>
                <h4>{this.state.patientAge} anos</h4>
              </div>
            </div>
            <div className="patient-row birthdate">
              <h3>Data de Nascimento:</h3>
              <h4>{this.state.patient.birdthdate}</h4>
            </div>
            <div className="email">
              <h3>Email:</h3>
              <h4>{this.state.patient.email}</h4>
            </div>
            <div className="address">
              <h3>Endereço:</h3>
              <h4>{this.state.patient.address}</h4>
            </div>
            <div className="tel-res">
              <h3>Telefone residencial:</h3>
              <h4>{this.state.patient.telResidential}</h4>
            </div>
            <div className="cellphone">
              <h3>Celular:</h3>
              <h4>{this.state.patient.cellphone}</h4>
            </div>
            <div className="marital-status">
              <h3>Estado civil:</h3>
              <h4>{this.state.patient.maritalStatus}</h4>
            </div>
            <div className="affiliation">
              <h3>Filiação:</h3>
              <h4>{this.state.patient.affiliation}</h4>
            </div>
            <div className="health-insurance">
              <h3>Convênio médico:</h3>
              <h4>{this.state.patient.healthInsurance}</h4>
            </div>
            <div className="blood-type">
              <h3>Tipo sanguíneo:</h3>
              <h4>{this.state.patient.bloodType}</h4>
            </div>
            <div className="surgical-history">
              <h3>Histórico médico:</h3>
              <h4>{this.state.patient.surgicalHistory}</h4>
            </div>
            <div className="family-history">
              <h3>Histórico familiar:</h3>
              <h4>{this.state.patient.familyHistory}</h4>
            </div>
            <div className="allergies">
              <h3>Alergias:</h3>
              <h4>{this.state.patient.allergies}</h4>
            </div>
            <div className="creation-date">
              <h3>Data de criação:</h3>
              {
                this.state.patient.created_at ? <h4>{this.state.patient.created_at.slice(0,10).split('-').reverse().join('-')}</h4> : null
              }
            </div>
            <Button btnTitle="Esconder informações" onClick={this.toggleInfo} />
          </div>
          <Link to="/add-consult">
            <Button btnTitle="Adicionar nova consulta" className="btn-primary btn-md btn-round" />
          </Link>
          <div className="consultation-list">
            {
              this.state.consultations.map((consult, idx) => {
                return(
                  <Link key={idx} to={`/consult/${idx}`}>
                    <Button btnTitle={`${consult.date} Dr.${consult.id_doctor.name}`} className="btn-white btn-md btn-round" />
                  </Link>
                )
              })
            }
          </div>
        </section>
      )
    
    } else {
      return(
        <section className="patient-view">
          <div className="patient-data">
            <h2>Prontuário: {this.state.patient._id}</h2>
            <div className="basic-info">
              <h3>{this.state.patient.name}</h3>
              <div className="age-gender">
                <h4>{this.state.patient.gender}/</h4>
                <h4>{this.state.patientAge} anos</h4>
              </div>
            </div>
            <div className="blood-type">
              <h3>Tipo sanguíneo:</h3>
              <h4>{this.state.patient.bloodType}</h4>
            </div>
            <div className="creation-date">
              <h3>Data de criação:</h3>
              {
                this.state.patient.created_at ? <h4>{this.state.patient.created_at.slice(0,10).split('-').reverse().join('-')}</h4> : null
              }
            </div>
            <Button btnTitle="Mais informações" onClick={this.toggleInfo} />
          </div>
          <Link to="/add-consult">
            <Button btnTitle="Adicionar nova consulta" className="btn-primary btn-md btn-round" />
          </Link>
          <div className="consultation-list">
            {
              this.state.consultations.map((consult, idx) => {                
                return(
                  <Link key={idx} to={`/consult/${idx}`}>
                    <Button btnTitle={`${consult.date} Dr.${consult.id_doctor.name}`} className="btn-white btn-md btn-round" />
                  </Link>
                )
              })
            }
          </div>
        </section>
      )
    }
  }
}