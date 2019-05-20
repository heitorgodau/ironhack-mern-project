import React, { Component } from "react";
import axios from "axios";
import Button from "../button/Button";

class AddScheduling extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cid: "",
      reason: "",
      date: "",
      hour: "",
      id_patient: "",
      id_doctor: "",
      isShowing: false
    };
    this.showAddSchedulingForm = this.showAddSchedulingForm.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const cid = this.state.cid;
    const reason = this.state.reason;
    const date = this.state.date;
    const hour = this.state.hour;
    const id_patient = this.state.id_patient.name;
    const id_doctor = this.state.id_doctor;
    // const projectID = this.props.theProject._id; // <== we need to know to which project the created task belong, so we need to get its 'id'

    axios
      .post("http://localhost:5000/api/scheduling/new", {
        cid,
        reason,
        date,
        hour,
        id_patient,
        id_doctor
      })
      .then(response => {
        console.log(response);
        this.props.getData();
        this.setState({
          cid: "",
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

  // PARA MOSTRAR O FORMULLARIO QDO CLICAR NO BOTAO
  toggleForm() {
    if (!this.state.isShowing) {
      this.setState({ isShowing: true });
    } else {
      this.setState({ isShowing: false });
    }
  }

  //  PARA MOSTRAR O FORMULLARIO QDO CLICAR NO BOTAO
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
            <option value={this.state.hour}>8:00</option>
            <option value={this.state.hour}>12:00</option>
            <option value={this.state.hour}>14:00</option>
            <option value={this.state.hour}>17:00</option>
          </select> 

            {/* <label>Data:</label>
          <textarea name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
           */}
            <input type="submit" value="Submit" />
          </form>
        </div>
      );
    }
  }

  render() {
    console.log(this.state);

    return (
      <section className="AddScheduling">
        <Button
          onClick={() => this.toggleForm()}
          className="btn-primary btn-round btn-lg uppercase"
          btnTitle="Novo agendamento"
        />
        <button onClick={() => this.toggleForm()}> Novo adendamento </button>
         {this.showAddSchedulingForm()} 
      </section>
    );
  }
}

export default AddScheduling;
