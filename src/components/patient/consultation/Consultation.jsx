import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../patient.css'

import service from './service'
import Button from '../../button/Button'
import ConsultationRow from './ConsultationRow'

export default class Consultation extends Component {
  constructor() {
    super()
    this.state = {
      consultation: {},
      imageUrl: '',
      edit: false,
      estadoAlterado: false,
    }
    this.getOneConsultation = this.getOneConsultation.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.handleSubmitFile = this.handleSubmitFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.edit = this.edit.bind(this);
  }
  
  getOneConsultation() {
    axios.get(`${process.env.REACT_APP_API_URL}/consultation/${this.props.match.params.id}`, {withCredentials:true})
    .then((result) => {
      this.setState({
        consultation: result.data,
      })
    })
  }

  edit() {
    this.setState({
      edit: !this.state.edit,
    })
  }
  
  cancelEdit() {
    this.getOneConsultation();
    this.edit();
  }

  handleChange(event) {
    const { name, value } = event.target
    const editedConsult = {...this.state.consultation};
    editedConsult[name] = value;
    this.setState({
      consultation: editedConsult,
    });
  };

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);        
    service.handleUpload(uploadData)
    .then(response => {
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleSubmitFile(event) {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/consultation/${this.props.match.params.id}`, {imageUrl: this.state.imageUrl})
      .then(() => {
        this.setState({
          imageUrl: '',
        });
        this.getOneConsultation();
      });
  };

  handleSubmit(event) {
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_API_URL}/consultation/${this.props.match.params.id}`, {...this.state.consultation})
      .then(() => {
        this.edit();
      });
  };
  
  componentDidMount() {
    this.getOneConsultation();
  };
  
  render() {
    if(this.state.consultation.id_patient && this.state.consultation.id_doctor) {
      const date = this.state.consultation.created_at.slice(0, 10).split('-').reverse().join('/');
      const doctor = `${this.state.consultation.id_doctor.prefix} ${this.state.consultation.id_doctor.name}`
      if (this.state.edit) {
        return(
          <section className="consultation-view">
          <div className=" consult-row date">
            <h3>{date}</h3>
            <div className="doctor-info">
              <h4>{doctor}</h4>
              <h4>CRM: {this.state.consultation.id_doctor.crm}</h4>
            </div>
          </div>
          <ConsultationRow className="patient" title="Paciente" display={this.state.consultation.id_patient.name} />
            <ConsultationRow className="reason" title="Motivo" display={this.state.consultation.reason} />
            <ConsultationRow className="symptoms" title="Anaminesi" display={this.state.consultation.symptoms} />          
            <ConsultationRow className="fisico" title="Exame Fisico" display={this.state.consultation.fisico} />
            <ConsultationRow className="orofaringe" title="Orofaringe" display={this.state.consultation.orofaringe} />
            <ConsultationRow className="otoscopia" title="Otoscopia" display={this.state.consultation.otoscopia} />
            <ConsultationRow className="SNC" title="SNC" display={this.state.consultation.SNC} />
            <ConsultationRow className="rigidez-da-nuca" title="Rigidez da nuca" display={this.state.consultation.rigidez_da_nuca} />
            <ConsultationRow className="pupilas" title="Pupilas" display={this.state.consultation.pupilas} />
            <ConsultationRow className="glasgow" title="Glasgow" display={this.state.consultation.glasgow} />
            <ConsultationRow className="cardiovascular" title="Cardiovascular" display={this.state.consultation.cardiovascular} />            
            <ConsultationRow className="pele-e-faneros" title="Pele e faneros" display={this.state.consultation.pele_e_faneros} />
            <ConsultationRow className="ap-respiratorio" title="Aparato respiratório" display={this.state.consultation.ap_respiratorio} />            
            <ConsultationRow className="abdome" title="Abdome" display={this.state.consultation.abdome} />
            <ConsultationRow className="osteo-articular" title="Osteo articular" display={this.state.consultation.osteo_articular} />  
          <div className="consult-row cid">
            <h3>CID:</h3>
            <div>
            <h4>{this.state.consultation.cid}</h4>
            <h4>{this.state.consultation.nameCid}</h4>
            </div>
          </div>
          <div className="consult-form conduct">
            <h3>Conduta:</h3>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <textarea name="conduct" cols="20" rows="5" placeholder="Conduta médica" value={this.state.consultation.conduct} onChange={(e) => this.handleChange(e)} />
              <Button btnTitle="Enviar" className="btn-primary btn-round btn-md" type="submit" />
              <Button btnTitle="Cancelar" className="btn-cancel mt-0 btn-round btn-md" onClick={this.cancelEdit} />
            </form>
          </div>
          {
            (!this.state.consultation.imageUrl) ?
              <div className="consult-row exams">
                <div className="title">
                  <h3>Arquivos:</h3>
                  <form className="exams-form" onSubmit={(e) => this.handleSubmitFile(e)}>
                    <input type="file" name="exam" onChange={(e) => this.handleFileUpload(e)} multiple/>
                    <Button btnTitle="Adcionar" className="btn-primary btn-round btn-md btn-add-exam" type="submit" />
                  </form>
                </div>
              </div> 
              :
              <div className="consult-row exams">
                <div className="title">
                  <h3>Arquivos:</h3>
                </div>
                <a href={this.state.consultation.imageUrl} rel="noopener noreferrer" target="_blank">
                  <figure className="exam-img">
                    <img src={this.state.consultation.imageUrl}  alt="Exams" />
                  </figure>
                </a>
              </div>
          }
        </section>
        )
      } else {
        return(
          <section className="consultation-view">
            <Link to={`/patient/${this.state.consultation.id_patient._id}`}>
              <Button btnTitle="Voltar" className="btn-round btn-primary btn-md btn-back" />
            </Link>
            <div className=" consult-row date">
              <h3>{date}</h3>
              <div className="doctor-info">
                <h4>{doctor}</h4>
                <h4>CRM: {this.state.consultation.id_doctor.crm}</h4>
              </div>
            </div>
            <ConsultationRow className="patient" title="Paciente" display={this.state.consultation.id_patient.name} />
            <ConsultationRow className="reason" title="Motivo" display={this.state.consultation.reason} />
            <ConsultationRow className="symptoms" title="Anaminesi" display={this.state.consultation.symptoms} />          
            <ConsultationRow className="fisico" title="Exame Fisico" display={this.state.consultation.fisico} />
            <ConsultationRow className="orofaringe" title="Orofaringe" display={this.state.consultation.orofaringe} />
            <ConsultationRow className="otoscopia" title="Otoscopia" display={this.state.consultation.otoscopia} />
            <ConsultationRow className="SNC" title="SNC" display={this.state.consultation.SNC} />
            <ConsultationRow className="rigidez-da-nuca" title="Rigidez da nuca" display={this.state.consultation.rigidez_da_nuca} />
            <ConsultationRow className="pupilas" title="Pupilas" display={this.state.consultation.pupilas} />
            <ConsultationRow className="glasgow" title="Glasgow" display={this.state.consultation.glasgow} />
            <ConsultationRow className="cardiovascular" title="Cardiovascular" display={this.state.consultation.cardiovascular} />            
            <ConsultationRow className="pele-e-faneros" title="Pele e faneros" display={this.state.consultation.pele_e_faneros} />
            <ConsultationRow className="ap-respiratorio" title="Aparato respiratório" display={this.state.consultation.ap_respiratorio} />            
            <ConsultationRow className="abdome" title="Abdome" display={this.state.consultation.abdome} />
            <ConsultationRow className="osteo-articular" title="Osteo articular" display={this.state.consultation.osteo_articular} />                       
            <div className="consult-row cid">
              <h3>CID:</h3>
              <div>
              <h4>{this.state.consultation.cid}</h4>
              <h4>{this.state.consultation.nameCid}</h4>
              </div>
            </div>
            <div className="consult-row conduct">
              <div className="text">
                <h3>Conduta:</h3>
                <h4>{this.state.consultation.conduct}</h4>
              </div>
              {
                (this.state.consultation.id_doctor._id === this.props.userInSession._id) ?
                  <Button btnTitle="Editar" className="btn-primary btn-round btn-md" onClick={this.edit} />
                  :
                  null
              }
            </div>
              {
                (!this.state.consultation.imageUrl && this.state.consultation.id_doctor._id === this.props.userInSession._id) ?
                  <div className="consult-row exams">
                    <div className="title">
                      <h3>Arquivos:</h3>
                      <form className="exams-form" onSubmit={(e) => this.handleSubmitFile(e)}>
                        <input type="file" name="exam" onChange={(e) => this.handleFileUpload(e)} multiple/>
                        <Button btnTitle="Adcionar" className="btn-primary btn-round btn-md btn-add-exam" type="submit" />
                      </form>
                    </div>
                  </div> 
                  : (this.state.consultation.id_doctor._id === this.props.userInSession._id) ?
                  <div className="consult-row exams">
                    <div className="title">
                      <h3>Arquivos:</h3>
                    </div>
                    <a href={this.state.consultation.imageUrl} rel="noopener noreferrer" target="_blank">
                      <figure className="exam-img">
                        <img src={this.state.consultation.imageUrl}  alt="Exams" />
                      </figure>
                    </a>
                  </div>
                  :
                  <div className="consult-row exams">
                    <div className="title">
                      <h3>Arquivos:</h3>
                    </div>
                    <h3>Não há arquivos</h3>
                  </div>
              }
              <Link to={`/patient/${this.state.consultation.id_patient._id}`}>
                <Button btnTitle="Voltar" className="mt-0 btn-round btn-cancel btn-md btn-back" />
              </Link>
          </section>
        )
      }
    } else {
      return(
        null
      )
    }
  }
}