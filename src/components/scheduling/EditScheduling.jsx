import React, { Component } from 'react';
import axios from 'axios';

import Button from '../button/Button';

class EditScheduling extends Component {
  constructor(props){
    super(props);
    // this.date = this.props.theScheduling.date.slice(0,10) || this.props.theScheduling.date;
    this.state = {
      patientName: this.props.theScheduling.patientName,
      reason: this.props.theScheduling.reason,
      date: this.props.theScheduling.date,
      hour: this.props.theScheduling.hour,    
      isShowing: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleFormSubmit(event){
    event.preventDefault();
    const id = this.props.theScheduling._id;    
    const { patientName, reason, date, hour, } = this.state;
    axios.put(`${process.env.REACT_APP_API_URL}/scheduling/${id}`, { patientName, reason, date, hour}, {withCredentials:true})
    .then( () => {       
      this.props.getAllSchedulings()
      this.toggleForm()
    })
    .catch( error => console.log(error) );
  }

  handleChange(event){   
    const { name, value } = event.target
    this.setState({
      [name]: value  
    })
  }

  toggleForm() {
    this.setState({ isShowing: !this.state.isShowing });
  }

  render() {
    return (
      <div className='edit-scheduling'>
        {
          (this.state.isShowing) ?
            <form onSubmit={this.handleFormSubmit}>
            <input type="text" name="patientName" value={this.state.patientName} placeholder="Nome do Paciente" onChange={e => this.handleChange(e)} required/>
            <input type="text" name="reason" value={this.state.reason} onChange={e => this.handleChange(e)} placeholder="Motivo da consulta" required/>
            {
              (this.state.date) ?
              <input type="date" name="date" value={this.state.date.slice(0,10)} onChange={e => this.handleChange(e)} required/>
              :
              <input type="date" name="date" value={this.state.date} onChange={e => this.handleChange(e)} required/>
            }
            <select onChange={e => this.handleChange(e)} name="hour" required>
              <option value="Sem horário">Não alterado</option>
              <option value='8:00'>8:00</option>
              <option value='10:00'>10:00</option>
              <option value='14:00'>14:00</option>
              <option value='16:00'>16:00</option>
              <option value='18:00'>18:00</option>
              <option value='20:00'>20:00</option>
            </select>
          <Button className="btn-primary btn-round btn-md" btnTitle="Enviar" type="submit" />
          <Button className="btn-cancel btn-round btn-md mt-0" btnTitle="Cancelar" onClick={() => this.toggleForm()} />
          </form>
          :
          <Button btnTitle="Editar" className="btn-round btn-md btn-primary" onClick={() => this.toggleForm()}/>
        }
      </div>
    )
  }
}

export default EditScheduling;
