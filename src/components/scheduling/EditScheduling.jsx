import React, { Component } from 'react';
import axios from 'axios';

class EditScheduling extends Component {
  constructor(props){
    super(props);
    this.state = {
      patientName: this.props.theScheduling.patientName,
      reason: this.props.theScheduling.reason,
      date: this.props.theScheduling.date,
      hour: this.props.theScheduling.hour,    
      isShowing: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChangePatientName = this.handleChangePatientName.bind(this);
    this.handleChangeReason = this.handleChangeReason.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeHour = this.handleChangeHour.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }

  handleFormSubmit(event){
    event.preventDefault();
    const id = this.props.theScheduling._id;    
    const { patientName, reason, date, hour, } = this.state;
    axios.put(`http://localhost:5000/api/scheduling/${id}`, { patientName, reason, date, hour})
    .then( () => {       
      this.props.getAllSchedulings()
    })
    .catch( error => console.log(error) );
  }

  handleChangePatientName(event){   
    this.setState({
      patientName: event.target.value  
    })
  }

  handleChangeReason(event){   
    this.setState({
      reason: event.target.value
    })
  }

  handleChangeDate(event){   
    this.setState({
      date: event.target.value
    })
  }

  handleChangeHour(event){  
    this.setState({
      hour: event.target.value
    })
  }

  // Show form edit fields
  toggleForm() {
    if ( !this.state.isShowing ){
      this.setState( { isShowing: true } );
    } else {
      this.setState( { isShowing: false } );
    }
  }

  // Show form edit fields
  showEditForm() {
    if( this.state.isShowing ) {
      return (
        <section className='edit-scheduling'>
           <br/>
           <h3>Edite o agendamento</h3>
                 
         {/* Form edit scheduling */}
          <form onSubmit={this.handleFormSubmit}>
            <label>Nome do paciente:</label>
            <input type="text" name="patientName" value={ this.state.patientName } onChange={event => this.handleChangePatientName( event ) } />           
            <label>Motivo da consulta médica: </label>
            <input type="text" name="reason" value={ this.state.reason } onChange={ event => this.handleChangeReason( event ) } />
            <label>Data:</label>
            <input type="date" name="date" value={ this.state.date } onChange={ event => this.handleChangeDate( event ) }/>
            <label>Hora: </label>
            <select name="hour" onChange={ event => this.handleChangeHour( event ) } required >
              <option value="" disabled selected>Escolha seu horário</option>
              <option value='8:00'>8:00</option>
              <option value='12:00'>12:00</option>
              <option value='14:00'>14:00</option>
              <option value='17:00'>17:00</option>
            </select>             
            <input type="submit" value="Submit" />
          </form>
        </section>
      )
    }
  }

  render() {
    return (
      <section className='edit-scheduling'>
       {this.showEditForm()}
       <button onClick={() => this.toggleForm()}>Editar</button>
      </section>
    )
  }
}

export default EditScheduling;
