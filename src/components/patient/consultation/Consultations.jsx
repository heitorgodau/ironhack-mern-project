import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../patient.css'

import Button from '../../button/Button'

export default class Consultations extends Component {
  constructor() {
    super();
    this.state = {
      consultations: [],    
    }
    this.getAllConsultations = this.getAllConsultations.bind(this);
  }

  getAllConsultations() {
    axios.get(`${process.env.REACT_APP_API_URL}/consultations`, {withCredentials:true})
    .then((result) => {
      this.setState({
        consultations: result.data,
      })
    });
  }
  componentDidMount() {
    this.getAllConsultations();    
  }  
  render() {
    return(
      <div className="consultations">
        <Link to={`/consultation/${this.props.patientId}/new`}>
          <Button btnTitle="Adicionar nova consulta" className="btn-primary btn-md btn-round" />
        </Link>
        <div className="consultation-list">
          {
            this.state.consultations.map((consult, idx) => {
              if (consult.id_patient === this.props.patientId && consult.id_doctor) {
                const date = consult.created_at.slice(0,10).split('-').reverse().join('/');
                const prefix = consult.id_doctor.prefix || 'Dr(a).'
                const name = consult.id_doctor.name || consult.id_doctor.username
                return(
                  <Link key={idx} to={`/consultation/${consult._id}`}>
                    <Button btnTitle={`${date} | ${prefix}${name}`} className="btn-white  btn-md btn-round" />
                  </Link>
                )
              }
            })
          }
        </div>
      </div>
    )
  }
}