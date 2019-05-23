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
    this.showAddSchedulingForm = this.showAddSchedulingForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();   
    const { patientName, reason, date, hour } = this.state;
    axios.post("http://localhost:5000/api/scheduling/new", {   
        patientName,    
        reason,
        date,
        hour,
      }, {withCredentials:true})
      .then(() => {
        this.props.getAllSchedulings();
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
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  }

  // Show form new scheduling
  showAddSchedulingForm() {
    if (this.state.isShowing) {
      return (
        <section className='add-scheduling'>
           <br/>
          <h3>Criar agendamento</h3>
                 
          {/* Form add scheduling */}
          <form onSubmit={this.handleFormSubmit}>
            <label>Nome do paciente:</label>
            <input type="text" name="patientName"             
             value={this.state.patientName}
              onChange={e => this.handleChange(e)}
            />
           
            <label>Motivo da consulta médica: </label>
            <input
              type="text"
              name="reason"
              value={this.state.reason}
              onChange={e => this.handleChange(e)}
            />
            <label>Data:</label>
            <input
              type="date"
              name="date"
              value={this.state.date}
              onChange={e => this.handleChange(e)}
            />
            <label>Hora: </label>
            <select  defaultValue={'DEFAULT'} onChange={e => this.handleChange(e)} name="hour" required>
              <option value="DEFAULT" disabled>Escolha seu horário</option>
              <option value='8:00'>8:00</option>
              <option value='12:00'>12:00</option>
              <option value='14:00'>14:00</option>
              <option value='17:00'>17:00</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </section>
      );
    }
  }

  render() {
    return (
      <section className="add-scheduling">
        <Button onClick={() => this.toggleForm()} className="btn-primary btn-round btn-lg uppercase" btnTitle="Novo agendamento" />
         {this.showAddSchedulingForm()} 
      </section>
    );
  }
}

export default AddScheduling;
