import React, { Component } from "react";
import "./schedulings.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import DateToday from './DateToday';
import AddScheduling from './AddScheduling'
// import EditScheduling from './EditScheduling'


class Schedulings extends Component {
  constructor() {
    super();
    this.state = {
      schedulings: []
    };
    this.getAllShedulings = this.getAllShedulings.bind(this);
  //  this.renderAddSchedulingForm = this.renderAddSchedulingForm.bind(this);

  }

  
  getAllShedulings() {
    axios.get(" http://localhost:5000/api/schedulings").then(response => {
      this.setState({
        schedulings: response.data
      });           
    });
  }

  componentDidMount() {
    this.getAllShedulings();
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

/*   renderAddSchedulingForm() {
    if(!this.state.title){
        this.getSingleProject();
      } else {     
                // pass the project and method getSingleProject() as a props down to AddTask component
        return <AddScheduling theProject={this.state} getTheProject={this.getSingleProject} />
      }
  } */

  

  render() {
    return (
      <section className="scheduling">
        <div className="scheduling">  
          <header>
            <DateToday />
            <br />
          </header>  
         {/*  <div>{this.renderEditForm()}</div> */}
         {/* <div>{this.renderAddSchedulingForm()} </div> */}  
         <AddScheduling getData={() => this.getAllShedulings()}/> 
            {/* <Button
             onClick={() => this.toggleForm()} className="btn-primary btn-round btn-lg uppercase" btnTitle="Novo agendamento" /> */}
          <table>
            <thead>
              <tr>
                <th>NOME </th>
                <th>CID </th>
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
                  <td>{ schedules.reason }</td> {/* CHAMAR A API DE CIDS */}
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
          <div>  
           <a target='_blanck' href="https://doutorarebeca.mybluemix.net/"><button >CHATBOT</button></a>                        
          </div>
        </div>
      </section>
    );
  }
}

export default Schedulings;
