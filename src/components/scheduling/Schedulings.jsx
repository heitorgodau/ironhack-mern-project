import React, { Component } from "react";
import "./schedulings.css";
import axios from "axios";
import Button from "../button/Button";
import { Link } from 'react-router-dom';
import DateToday from './DateToday';
// import EditScheduling from './EditScheduling'


class Schedulings extends Component {
  constructor() {
    super();
    this.state = {
      schedulings: []
    };
    this.getAllShedulings = this.getAllShedulings.bind(this);
  }

  getAllShedulings() {
    axios.get(" http://localhost:5000/api/schedulings").then(response => {
      this.setState({
        schedulings: response.data
      });
    });
  }

  // EDIT scheduling


  // DELETE scheduling
  deleteScheduling(scheduleId) {
    axios
     .delete(`http://localhost:5000/api/scheduling/${scheduleId}`)
      .then(() => {
        this.getAllShedulings();
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getAllShedulings();
  }

  render() {
    return (
      <section className="scheduling">
        <div className="scheduling">        
          <header>
            <DateToday />
            <br />
          </header>
          <Link to="/">
            <Button
              className="btn-primary btn-round btn-lg uppercase" btnTitle="Novo agendamento" />
          </Link>
          <table>
            <thead>
              <tr>
                <th>NOME </th>
                <th>MOTIVO </th>
                <th>DATA </th>
                <th>HORA </th>
              </tr>
            </thead>
            {this.state.schedulings.map(schedules => (
              <tbody>
                <tr>
                  <td>{ schedules.id_patient.name } </td>
                  <td>{ schedules.reason }</td>
                  <td>
                    { schedules.date.slice(0, 10).split("-").reverse().join("-") }
                  </td>
                  <td>{ schedules.hour }</td>
                  <td> <button >Editar</button></td>
                 <td><button onClick={() => this.deleteScheduling(schedules._id)}>Delete</button></td> 
                </tr>
              </tbody>
            ))}
          </table>
          <br/>
        </div>
      </section>
    );
  }
}

export default Schedulings;
