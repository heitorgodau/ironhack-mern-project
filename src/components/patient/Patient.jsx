import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
export default class Patient extends Component {
  constructor() {
    super();
    this.state = {
      patient: [],
      consultations: [
        {date: '2019-03-23', dr: 'Moira McTaggert'},
        {date: '2019-02-11', dr: 'Moira McTaggert'},
        {date: '2018-07-02', dr: 'Stephen Strange'},
        {date: '2016-10-04', dr: 'Who'}
      ]
    }
    this.patient = {
      name: 'Jon Snow',
      gender: 'Masculino',
      birthdate: '1997-10-04',
      address: 'Castle Black, The Wall',
      maritalStatus: 'Solteiro',
      affiliation: 'Eddard Stark',
      telResidential: '(81) 3780-1011',
      cellphone: '(81) 98928-9486',
      healthInsurance: 'ReavenHealth',
      email: 'jon.snow@nightswatch.com.ws',
      bloodType: 'B-',
      familyHistory: 'Não se aplica',
      surgicalHistory: 'Não se aplica',
      allergies: 'Outros',
      id_doctor: '5cdd6fd0120a696940f52be1',
    }
    this.getAge = this.getAge.bind(this);
  }

  getAge() {
    const todayYear = new Date().getFullYear();
    const birthYear = this.patient.birthdate.split('-')[0];
    const age = todayYear - birthYear;
    return age;
  }

  render() {
    return(
      <section className="patient-view">
        <div className="patient-data">
          <h2>Prontuário: #3878767</h2>
          <div className="basic-info">
            <h3>{this.patient.name}</h3>
            <div className="age-gender">
              <h4>{this.patient.gender}/</h4>
              <h4>{this.getAge()} anos</h4>
            </div>
          </div>
          <div className="blood-type">
            <h3>Tipo sanguíneo:</h3>
            <h4>{this.patient.bloodType}</h4>
          </div>
          <div className="creation-date">
            <h3>Data de criação:</h3>
            <h4>2019-05-17</h4>
          </div>
          <Link to="/patient/:id/info">Mais informações</Link>
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