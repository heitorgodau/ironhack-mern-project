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
      consultations: []
    }

    this.getAge = this.getAge.bind(this);
    this.getOnePatient = this.getOnePatient.bind(this);
    this.getAllConsultations = this.getAllConsultations.bind(this);
  }

  getOnePatient() {
    axios.get(`http://localhost:5000/api/patient/${this.props.match.params.id}`)
      .then((result) => {
        this.setState({
          patient: result.data,
        }, () => this.getAge())
      });
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
    
    getAge() {
      const todayYear = new Date().getFullYear();
      const birthYear = this.state.patient.birthdate.split('-')[0];
      const age = todayYear - birthYear;
      this.setState({
        patientAge: age,
    })
  }



  render() {
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
              this.state.patient.created_at ? <h4>{this.state.patient.created_at.slice(1,10).split('-').reverse().join('-')}</h4> : null
            }
            
          </div>
          <Link className="more-info" to="/patient/:id/info">Mais informações</Link>
        </div>
        <Link to="/add-consult">
          <Button btnTitle="Nova Consulta" className="btn-primary btn-md btn-round" />
        </Link>
        <div className="consultation-list">
          {
            this.state.consultations.map((consult, idx) => {
              return(
                <Link key={idx} to={`/consult/${idx}`}>
                  <Button btnTitle={`${consult.date} Dr.${consult.dr}`} className="btn-white btn-md btn-round" />
                </Link>
              )
            })
          }
        </div>
      </section>

    )
  }
}