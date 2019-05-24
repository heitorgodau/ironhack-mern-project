import React, { Component } from "react";
import axios from "axios";

import "./schedulings.css";

import DateToday from "./DateToday";
import AddScheduling from "./AddScheduling";
import EditScheduling from "./EditScheduling";
import Button from '../button/Button';


class Schedulings extends Component {
  constructor() {
    super();
    this.state = {
      schedulings: []
    };
    this.getAllSchedulings = this.getAllSchedulings.bind(this);
    this.deleteScheduling = this.deleteScheduling.bind(this);
    this.renderEditForm = this.renderEditForm.bind(this);
  }

  componentDidMount() {
    this.getAllSchedulings();
  }

  // Get all schedulings
  getAllSchedulings() {
    axios.get(`${process.env.REACT_APP_API_URL}/schedulings`, {withCredentials:true}).then(response => {
      this.setState({
        schedulings: response.data
      });
    });
  }

  // EDIT form scheduling render
  renderEditForm = () => {
    if (!this.state.patientName) {
      this.getSingleProject();
    } else {
      return (
        <EditScheduling
          theScheduling={this.state}
          getAllSchedulings={this.getAllSchedulings}
          {...this.props}
        />
      );
    }
  };

  // DELETE scheduling
  deleteScheduling(scheduleId) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/scheduling/${scheduleId}`)
      .then(() => {
        this.getAllSchedulings();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="scheduling">
        <DateToday />
        <AddScheduling getAllSchedulings={() => this.getAllSchedulings()} />
        <table>
          <thead>
            <tr>
              <th>NOME </th>
              <th>MOTIVO </th>
              <th>DATA </th>
              <th>HORA </th>
            </tr>
          </thead>
          <tbody>
            {this.state.schedulings.map((schedules, idx) => (
              <tr key={idx}>
                <td>{schedules.patientName}</td>
                <td>{schedules.reason}</td>
                {
                  (schedules.date) ?
                  <td>{schedules.date.slice(0, 10).split("-").reverse().join("/")}</td>
                  :
                  <td>{schedules.date}</td>
                }
                <td>{schedules.hour}</td>
                <td><Button btnTitle="Deletar" className="btn-round btn-delete btn-md" onClick={() => this.deleteScheduling(schedules._id)}/></td>
                <td><EditScheduling theScheduling={this.state.schedulings[idx]} getAllSchedulings={() => this.getAllSchedulings()}{...this.props}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
  }
}

export default Schedulings;
