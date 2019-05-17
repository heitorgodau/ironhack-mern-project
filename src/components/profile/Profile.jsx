import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button'
import './profile.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      search: '',
    }
    this.allPatients = ['Suzane Aldemir', 'Steve Rogers', 'Jon Snow', 'Thanos Titan', 'Christian Louza', 'Bob Kane']
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.setState({
      patients: this.allPatients, 
    })
  }

  handleSearch(event) {
    const { value } = event.target;
    const foundedPatients = this.allPatients.filter(patient => patient.toLowerCase().includes(value.toLowerCase()))
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
        <Link to="/add-patient" ><Button btnTitle="+ Adicionar Paciente" className="btn-primary btn-md btn-round" /></Link>
        <div className="patients-list">
          {
            this.state.patients.map((patient, idx) => {
              return(
                <Link key={idx} to={`/patient/${idx}`}><Button btnTitle={patient} className="btn-white btn-md btn-round" /></Link>
              )
            })
          }
        </div>
      </section>
    );
  }
}

export default Profile;
