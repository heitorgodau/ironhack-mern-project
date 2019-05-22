import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button'
import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      search: '',
    }
    
    this.handleSearch = this.handleSearch.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState(arr) {
    this.setState({
      patients: arr,
    })
  }

  componentDidMount() {
    this.props.getAllPatients(this.updateState)
  }
  
  handleSearch(event) {
    const { value } = event.target;
    const foundedPatients = this.props.allPatients.filter(patient => patient.name.toLowerCase().includes(value.toLowerCase()))
    this.setState({
      patients: foundedPatients,
    })
  }

  render() {
    return(
      <section className="profile">
      <form >
        <i className="fas fa-search"></i>
        <input type="search" name="search" placeholder="Busque pelo nome do paciente" onChange={(e) => this.handleSearch(e)}/>
      </form>
        <Link to="/patient/add-patient" ><Button btnTitle="Adicionar novo paciente" className="btn-primary btn-md btn-round" /></Link>
        <div className="patients-list">
          {
            this.state.patients.map((patient, idx) => {
              return(
                <Link key={idx} to={`/patient/${patient._id}`}><Button btnTitle={patient.name} className="btn-white btn-md btn-round" /></Link>
              )
            })
          }
        </div>
      </section>
    );
  }
}

export default Profile;
