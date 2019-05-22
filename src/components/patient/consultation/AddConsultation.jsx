import React, { Component } from 'react'
import axios from 'axios';
import '../patient.css'

import Button from '../../button/Button'

export default class AddConsultation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      cid: '',
      exam: '',
      symptoms: '',
      conduct: '',
      id_doctor: this.props.userInSession._id,    
      id_patient: this.props.match.params.patientId,
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:5000/api/consultation/new', {...this.state})
      .then((result) => {
        console.log('Paciente adicionado', result)
      })
      
    this.setState({
      reason: '',
      cid: '',
      exam: '',
      symptoms: '',
      conduct: '',
    })
    
  }

  render() {
    return(
      <section className="add-consultation">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input type="text" name="reason" value={this.state.reason} placeholder="Motivo da consulta" onChange={(e) => this.handleChange(e)}/>
          <textarea name="symptoms" placeholder="Sintomas do paciente" value={this.state.symptoms} onChange={(e) => this.handleChange(e)}/>
          <textarea name="conduct" placeholder="Conduta médica" value={this.state.conduct} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="cid" placeholder="CID" value={this.state.cid} onChange={(e) => this.handleChange(e)}/>
          <input type="file" name="exam" />
          <Button btnTitle="Adicionar" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
      </section>
    )
  }
}