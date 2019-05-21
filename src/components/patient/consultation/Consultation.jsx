import React, { Component} from 'react';
import axios from 'axios';
import '../patient.css'

import Button from '../../button/Button'

export default class Consultation extends Component {
  constructor() {
    super()
    this.state = {
      consultation: {},
      edit: false,
    }
    this.getOneConsultation = this.getOneConsultation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.edit = this.edit.bind(this);
  }
  
  getOneConsultation() {
    axios.get(`http://localhost:5000/api/consultation/${this.props.match.params.id}`)
    .then((result) => {
      console.log(result.data)
      this.setState({
        consultation: result.data
      })
    }
    )
  }

  handleChange(event) {
    const { name, value } = event.target
    const editedConsult = {...this.state.consultation};
    editedConsult[name] = value
    this.setState({
      consultation: editedConsult,
    })
  }

  edit() {
    this.setState({
      edit: !this.state.edit,
    })
  }

  cancelEdit() {
    this.getOneConsultation();
    this.edit();
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.put(`http://localhost:5000/api/consultation/${this.props.match.params.id}`, {...this.state.consultation})
      .then(() => {
        this.edit();
      })
  }
  
  componentDidMount() {
    this.getOneConsultation();
  }
  
  render() {
    if(this.state.consultation.id_patient && this.state.consultation.id_doctor) {
      const date = this.state.consultation.created_at.slice(0, 10).split('-').reverse().join('/');
      const doctor = `${this.state.consultation.id_doctor.prefix} ${this.state.consultation.id_doctor.name}`
      if (this.state.edit) {
        return(
          <section className="consultation-view">
          <div className=" consult-row date">
            <h3>{date}</h3>
            <div className="doctor-info">
              <h4>{doctor}</h4>
              <h4>CRM: {this.state.consultation.id_doctor.crm}</h4>
            </div>
          </div>
          <div className="consult-row patient">
            <h3>Paciente:</h3>
            <h4>{this.state.consultation.id_patient.name}</h4>
          </div>
          <div className="consult-row reason">
            <h3>Motivo:</h3>
            <h4>{this.state.consultation.reason}</h4>
          </div>
          <div className="consult-row symptoms">
            <h3>Sintomas:</h3>
            <h4>{this.state.consultation.symptoms}</h4>
          </div>
          <div className="consult-row cid">
            <h3>CID:</h3>
            <h4>{this.state.consultation.cid}</h4>
          </div>
          <div className="consult-form conduct">
              <h3>Conduta:</h3>
              <form onSubmit={(e) => this.handleSubmit(e)}>
                <textarea name="conduct" cols="20" rows="5" placeholder="Conduta médica" value={this.state.consultation.conduct} onChange={(e) => this.handleChange(e)} />
                <Button btnTitle="Enviar" className="btn-white btn-round btn-md" type="submit" />
                <Button btnTitle="Cancelar" className="btn-primary btn-round btn-md" onClick={this.cancelEdit} />
              </form>
            </div>
        </section>
        )
      } else {
        return(
          <section className="consultation-view">
            <div className=" consult-row date">
              <h3>{date}</h3>
              <div className="doctor-info">
                <h4>{doctor}</h4>
                <h4>CRM: {this.state.consultation.id_doctor.crm}</h4>
              </div>
            </div>
            <div className="consult-row patient">
              <h3>Paciente:</h3>
              <h4>{this.state.consultation.id_patient.name}</h4>
            </div>
            <div className="consult-row reason">
              <h3>Motivo:</h3>
              <h4>{this.state.consultation.reason}</h4>
            </div>
            <div className="consult-row symptoms">
              <h3>Sintomas:</h3>
              <h4>{this.state.consultation.symptoms}</h4>
            </div>
            <div className="consult-row cid">
              <h3>CID:</h3>
              <h4>{this.state.consultation.cid}</h4>
            </div>
            <div className="consult-row conduct">
              <h3>Conduta:</h3>
              <h4>{this.state.consultation.conduct}</h4>
            </div>
            <Button btnTitle="Editar" className="btn-primary btn-round btn-md" onClick={this.edit} />
            <p>*Só é possível editar o campo de conduta médica</p>
          </section>
        )
      }
    } else {
      return(
        null
      )
    }
  }
}