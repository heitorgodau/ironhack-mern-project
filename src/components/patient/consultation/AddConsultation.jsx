import React, { Component } from 'react'
import axios from 'axios';
import '../patient.css';

import service from './service'
import Button from '../../button/Button'

export default class AddConsultation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
      fisico: '',
      orofaringe:'',
      otoscopia:'',
      SNC:'',
      rigidez_da_nuca:'', 
      cardiovascular:'',  
      RCR_2T_BNF_S_S:'',  
      pele_e_faneros:'', 
      ap_respiratorio:'',
      R_Adv:'',
      abdome:'',
      osteo_articular:'',
      PA:'',
      cid: '',
      nameCid: '',
      exam: '',
      symptoms: '',
      conduct: '',
      imageUrl:'',
      id_doctor: this.props.userInSession._id,    
      id_patient: this.props.match.params.patientId,
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value,      
    })   
  }

  handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);
        const uploadData = new FormData();        
        uploadData.append("imageUrl", e.target.files[0]);        
        service.handleUpload(uploadData)
        .then(response => {            
            this.setState({ imageUrl: response.secure_url });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:5000/api/consultation/new', {...this.state})
      .then((result) => {
      })
      
    this.setState({
      reason: '',
      cid: '',
      nameCid:'',
      exam: '',
      symptoms: '',
      conduct: '',
    })
    this.props.history.push(`/patient/${this.state.id_patient}`) 
  }

  render() {    
    if(this.state.cid.length !== 0){
      axios.get(`https://cid-api.herokuapp.com/cid10/${this.state.cid.toUpperCase()}`)
      .then((result) => {        
        this.setState({
          nameCid: result.data.nome,         
        })       
      })
    }    
    return(
      <section className="add-consultation">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div className="fisic-exam">
            <h3>Exame Fisico</h3>
            <div className="radio">
              <label>
                <input type="radio" name="fisico" onChange={(e) => this.handleChange(e)} value='Normal corado, Hidratado, Acian, Afeb, Eupneico'/>
                Normal corado, Hidratado, Acian, Afeb, Eupneico
              </label> 
              <br/>
              <label>
                <input type="radio" name="fisico" onChange={(e) => this.handleChange(e)} value='Anormal'/>
                Anormal
              </label> 
            </div> 

            <div className="radio">
              <p>Orofaringe</p>
              <label>
                <input type="radio" name="orofaringe" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/> 
              <label>
                <input type="radio" name="orofaringe" onChange={(e) => this.handleChange(e)} value='Hiperemia'/>
                Hiperemia
              </label>
              <br/> 
              <label>
                <input type="radio" name="orofaringe" onChange={(e) => this.handleChange(e)} value='Purulenta'/>
                Purulenta
              </label> 
            </div> 

            <div className="radio">
              <p>Otoscopia</p>
              <label>
                <input type="radio" name="otoscopia" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/> 
              <label>
                <input type="radio" name="otoscopia" onChange={(e) => this.handleChange(e)} value='Hiperemia'/>
                Hiperemia
              </label>
              <br/> 
              <label>
                <input type="radio" name="otoscopia" onChange={(e) => this.handleChange(e)} value='Purulenta'/>
                Purulenta
              </label> 
            </div> 

            <div className="radio">
              <p>SNC</p>
              <label>
                <input type="radio" name="SNC" onChange={(e) => this.handleChange(e)} value='Normal Reflexos Positivos'/>
                Normal Reflexos Positivos
              </label>             
            </div> 

            <div className="radio">
              <p>Rigidez da nuca</p>
              <label>
                <input type="radio" name="rigidez_da_nuca" onChange={(e) => this.handleChange(e)} value='Negativo'/>
                Negativo
              </label>
              <br/> 
              <label>
                <input type="radio" name="rigidez_da_nuca" onChange={(e) => this.handleChange(e)} value='Positivo'/>
                Positivo
              </label>
              <br/> 
              <label>
                <input type="radio" name="rigidez_da_nuca" onChange={(e) => this.handleChange(e)} value='Duvidoso'/>
                Duvidoso
              </label> 
            </div> 

            <div className="radio">
              <p>Cardiovascular</p>
              <label>
                <input type="radio" name="cardiovascular" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/> 
              <label>
                <input type="radio" name="otoscopia" onChange={(e) => this.handleChange(e)} value='Anormal'/>
                Anormal
              </label>    
            </div> 

            <div className="radio">
              <p>RCR em 2T BNF S S</p>
              <label>
                <input type="radio" name="RCR_2T_BNF_S_S" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/> 
              <label>
                <input type="radio" name="RCR_2T_BNF_S_S" onChange={(e) => this.handleChange(e)} value='Anormal'/>
                Anormal
              </label>             
            </div> 

            <div className="radio">
              <p>Pele e Fâneros</p>
              <label>
                <input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/> 
              <label>
                <input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Anormal'/>
                Anormal
              </label>
              <br/> 
              <label>
                <input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Petequias'/>
                Petequias
              </label> 
            </div> 

            <div className="radio">
              <p>Aparato Respiratorio</p>
              <label>
                <input type="radio" name="ap_respiratorio" onChange={(e) => this.handleChange(e)} value='Normal MV + S'/>
                Normal MV + S
              </label>                    
            </div> 

            <div className="radio">
              <p>R.Adv</p>
              <label>
                <input type="radio" name="R_Adv" onChange={(e) => this.handleChange(e)} value='Anormal'/>
                Normal
              </label>           
            </div> 

            <div className="radio">
              <p>Abdome</p>
              <label>
                <input type="radio" name="abdome" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/>
              <label>
                <input type="radio" name="abdome" onChange={(e) => this.handleChange(e)} value='Anormal'/>
                Anormal
              </label>        
            </div> 

            <div className="radio">
              <p>Osteo Articular</p>
              <label>
                <input type="radio" name="osteo_articular" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/>     
              <label>
                <input type="radio" name="osteo_articular" onChange={(e) => this.handleChange(e)} value='Anormal'/>
                Anormal
              </label>                    
            </div> 

            <div className="radio">
              <p>PA</p>
              <label>
                <input type="radio" name="PA" onChange={(e) => this.handleChange(e)} value='Glasglow'/>
                Gasglow
              </label>         
            </div> 
          </div>

          <input type="text" name="reason" value={this.state.reason} placeholder="Motivo da consulta" onChange={(e) => this.handleChange(e)}/>
      
          <textarea name="symptoms" placeholder="Sintomas do paciente" value={this.state.symptoms} onChange={(e) => this.handleChange(e)}/>
          
          <textarea name="conduct" placeholder="Conduta médica" value={this.state.conduct} onChange={(e) => this.handleChange(e)}/>
          
          <input type="text" name="cid" placeholder="CID" value={this.state.cid} onChange={(e) => this.handleChange(e)}/>
          
          {
            (this.state.cid.length !== 0) ? 
              <textarea className="cid-name" type="text" name="cidName" placeholder="Doença" value={this.state.nameCid} onChange={(e) => this.handleChange(e)}/>
              :
              <textarea className="cid-name" type="text" name="cidName" placeholder="Doença" value='' onChange={(e) => this.handleChange(e)}/>
          }
          
          <input type="file" name="exam" onChange={(e) => this.handleFileUpload(e)}/>
          
          <Button btnTitle="Adicionar" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
      </section>
    )
  }
}