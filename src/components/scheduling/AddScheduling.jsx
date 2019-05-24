import React, { Component } from "react";
import axios from "axios";
import Button from "../button/Button";

class AddScheduling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patientName: '',
      reason: '',
      date: '',
      hour: '',    
      isShowing: false
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();   
    const { patientName, reason, date, hour } = this.state;
    axios.post(`${process.env.REACT_APP_API_URL}/scheduling/new`, {   
        patientName,    
        reason,
        date,
        hour,
      }, {withCredentials:true})
      .then(() => {
        this.props.getAllSchedulings();
        this.toggleForm();
        this.setState({
          patientName: '',         
          reason: '',
          date: '',
          hour: ''
        });
      })
      .catch(error => console.log(error));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  // Show form new scheduling
  toggleForm() {
   this.setState({
    isShowing: !this.state.isShowing
   })
  }
  
  render() {
    return (
      <div className="add-scheduling">
        {
          (this.state.isShowing) ?
            <form onSubmit={this.handleFormSubmit}>
              <input type="text" name="patientName" value={this.state.patientName} placeholder="Nome do Paciente" onChange={e => this.handleChange(e)} required/>
              <input type="text" name="reason" value={this.state.reason} onChange={e => this.handleChange(e)} placeholder="Motivo da consulta" required/>
              <input type="date" name="date" value={this.state.date} onChange={e => this.handleChange(e)} placeholder="Data da consulta" required/>
              <select onChange={e => this.handleChange(e)} name="hour" required>
                <option value="Sem horário">Horário da consulta</option>
                <option value='8:00'>8:00</option>
                <option value='10:00'>10:00</option>
                <option value='14:00'>14:00</option>
                <option value='16:00'>16:00</option>
                <option value='18:00'>18:00</option>
                <option value='20:00'>20:00</option>
              </select>
              <Button type="submit" className="btn-primary btn-round btn-md" btnTitle="Adicionar" />
              <Button onClick={() => this.toggleForm()} className="btn-cancel btn-round btn-md mt-0" btnTitle="Cancelar" />
            </form>
            :
            <Button onClick={() => this.toggleForm()} className="btn-primary btn-round btn-md" btnTitle="Novo agendamento" />
        }
      </div>
    );
  }
}

export default AddScheduling;
