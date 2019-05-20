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
    axios.get(`http://localhost:5000/api/consultations`)
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
              return(
                <Link key={idx} to={`/consult/${idx}`}>
                  <Button btnTitle={`${consult.date} Dr.${consult.dr}`} className="btn-white  btn-md btn-round" />
                </Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}