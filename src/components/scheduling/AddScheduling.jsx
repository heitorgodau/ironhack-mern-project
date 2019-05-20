import React, { Component } from "react";
import axios from "axios";
import Button from "../button/Button";

class AddScheduling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      date: '',
      hour: '',
      id_patient: '',
      id_doctor: '',
      isShowing: false
    };
    this.showAddSchedulingForm = this.showAddSchedulingForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();   
    const reason = this.state.reason;
    const date = this.state.date;
    const hour = this.state.hour;
    const id_patient = this.state.id_patient.name;
    const id_doctor = this.state.id_doctor;

    axios.post("http://localhost:5000/api/scheduling/new", {       
        reason,
        date,
        hour,
        id_patient,
        id_doctor
      })
      .then(response => {       
        this.props.getData();
        this.setState({         
          reason: "",
          date: "",
          hour: "",
          id_patient: "",
          id_doctor: ""
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
        <div>
          <h3>Novo agendamento</h3>

          {/* Form add scheduling */}
          <form onSubmit={this.handleFormSubmit}>
            <label>Nome do paciente:</label>
            <input
              type="text"
              name="name"
              value={this.state.id_patient.name}
              onChange={e => this.handleChange(e)}
            />
            <label>CID:</label>
            <input
              type="text"
              name="cid"
              value={this.state.cid}
              onChange={e => this.handleChange(e)}
            />
            <label>Motivo da consulta médica:</label>
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
            <label>Hora:</label>
              <select name="hour" required>
            <option value="" disabled selected>Escolha seu horário</option>
            <option value='8:00'>8:00</option>
            <option value='12:00'>12:00</option>
            <option value='14:00'>14:00</option>
            <option value='17:00'>17:00</option>
          </select>
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  render() {
    return (
      <section className="AddScheduling">
        <Button onClick={() => this.toggleForm()} className="btn-primary btn-round btn-lg uppercase" btnTitle="Novo agendamento" />
        <button onClick={() => this.toggleForm()}> Novo adendamento </button>
         {this.showAddSchedulingForm()} 
      </section>
    );
  }
}

export default AddScheduling;
