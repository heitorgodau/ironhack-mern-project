import React, { Component } from "react";
import "./schedulings.css";
import axios from "axios";
import DateToday from "./DateToday";
import AddScheduling from "./AddScheduling";
import EditScheduling from "./EditScheduling";

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
    axios.get(" http://localhost:5000/api/schedulings", {withCredentials:true}).then(response => {
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
      .delete(`http://localhost:5000/api/scheduling/${scheduleId}`)
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
        <div className="scheduling">
          <header>
            <DateToday />
            <br />
          </header>
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
            {this.state.schedulings.map((schedules, idx) => (
              <tbody key={idx}>
                <tr>
                  <td>{schedules.patientName}</td>
                  <td>{schedules.reason}</td>
                  <td>
                    {schedules.date
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td>{schedules.hour}</td>
                  <td>
                    <button onClick={() => this.deleteScheduling(schedules._id)}>
                      Delete
                    </button>
                  </td>
                  
                  <td>
                    <EditScheduling
                      theScheduling={this.state.schedulings[idx]}
                      getAllSchedulings={() => this.getAllSchedulings()}
                      {...this.props}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <br />
          <div>
            <a target="_blanck" href="https://doutorarebeca.mybluemix.net/">
              <button>CHATBOT</button>
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Schedulings;
