import React, { Component } from 'react'
import axios from 'axios';
import '../patient.css';
import Button from '../../button/Button'
import service from './service'

// import AuthService from './../auth/auth-service';

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
    console.log(event.target)
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
    console.log(this.state)     
    axios.post('http://localhost:5000/api/consultation/new', {...this.state})
      .then((result) => {
        console.log('Paciente adicionado', result)
        this.setState({
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
        })    
        this.props.history.push(`/patient/${this.state.id_patient}`) 
      })
      
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
          <input type="text" name="reason" value={this.state.reason} placeholder="Motivo da consulta" onChange={(e) => this.handleChange(e)}/>
          <h3>Exame Fisico</h3>
          <div>
            <label>Normal corado, Hidratado, Acian, Afeb, Eupneico<input type="radio" name="fisico" onChange={(e) => this.handleChange(e)} value='Normal corado, Hidratado, Acian, Afeb, Eupneico'/></label> 
            <label>Anormal<input type="radio" name="fisico" onChange={(e) => this.handleChange(e)} value='Anormal'/></label> 
          </div> 

          <div>
            <p>Orofaringe</p>
            <label>Normal<input type="radio" name="orofaringe" onChange={(e) => this.handleChange(e)} value='Normal'/></label> 
            <label>Hiperemia<input type="radio" name="orofaringe" onChange={(e) => this.handleChange(e)} value='Hiperemia'/></label> 
            <label>Purulenta<input type="radio" name="orofaringe" onChange={(e) => this.handleChange(e)} value='Purulenta'/></label> 
          </div> 

          <div>
            <p>Otoscopia</p>
            <label>Normal<input type="radio" name="otoscopia" onChange={(e) => this.handleChange(e)} value='Normal'/></label> 
            <label>Hiperemia<input type="radio" name="otoscopia" onChange={(e) => this.handleChange(e)} value='Hiperemia'/></label> 
            <label>Purulenta<input type="radio" name="otoscopia" onChange={(e) => this.handleChange(e)} value='Purulenta'/></label> 
          </div> 

          <div>
            <p>SNC</p>
            <label>Normal Reflexos Positivos<input type="radio" name="SNC" onChange={(e) => this.handleChange(e)} value='Normal Reflexos Positivos'/></label>             
          </div> 

          <div>
            <p>Rigidez da nuca</p>
            <label>Negativo<input type="radio" name="rigidez_da_nuca" onChange={(e) => this.handleChange(e)} value='Negativo'/></label> 
            <label>Positivo<input type="radio" name="rigidez_da_nuca" onChange={(e) => this.handleChange(e)} value='Positivo'/></label> 
            <label>Duvidoso<input type="radio" name="rigidez_da_nuca" onChange={(e) => this.handleChange(e)} value='Duvidoso'/></label> 
          </div> 

          <div>
            <p>Cardiovascular</p>
            <label>Normal<input type="radio" name="cardiovascular" onChange={(e) => this.handleChange(e)} value='Normal'/></label> 
            <label>Anormal<input type="radio" name="otoscopia" onChange={(e) => this.handleChange(e)} value='Anormal'/></label>             
          </div> 

          <div>
            <p>RCR em 2T BNF S S</p>
            <label>Normal<input type="radio" name="RCR_2T_BNF_S_S" onChange={(e) => this.handleChange(e)} value='Normal'/></label> 
            <label>Anormal<input type="radio" name="RCR_2T_BNF_S_S" onChange={(e) => this.handleChange(e)} value='Anormal'/></label>             
          </div> 

          <div>
            <p>Pele e Fâneros</p>
            <label>Normal<input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Normal'/></label> 
            <label>Anormal<input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Anormal'/></label> 
            <label>Petequias<input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Petequias'/></label> 
          </div> 

          <div>
            <p>Aparato Respiratorio</p>
            <label>Normal MV + S<input type="radio" name="ap_respiratorio" onChange={(e) => this.handleChange(e)} value='Normal MV + S'/></label>                    
          </div> 

          <div>
            <p>R.Adv</p>
            <label>Normal<input type="radio" name="R_Adv" onChange={(e) => this.handleChange(e)} value='Anormal'/></label>                        
          </div> 

          <div> 
            <p>Abdome</p>
            <label>Normal<input type="radio" name="abdome" onChange={(e) => this.handleChange(e)} value='Normal'/></label>     
            <label>Anormal<input type="radio" name="abdome" onChange={(e) => this.handleChange(e)} value='Anormal'/></label>                    
          </div> 

          <div>
            <p>Osteo Articular</p>
            <label>Normal<input type="radio" name="osteo_articular" onChange={(e) => this.handleChange(e)} value='Normal'/></label>     
            <label>Anormal<input type="radio" name="osteo_articular" onChange={(e) => this.handleChange(e)} value='Anormal'/></label>                    
          </div> 

          <div>
            <p>PA</p>
            <label>Gasglow<input type="radio" name="PA" onChange={(e) => this.handleChange(e)} value='Glasglow'/></label>                        
          </div>       

          <textarea name="symptoms" placeholder="Sintomas do paciente" value={this.state.symptoms} onChange={(e) => this.handleChange(e)}/>
          <textarea name="conduct" placeholder="Conduta médica" value={this.state.conduct} onChange={(e) => this.handleChange(e)}/>
          <input type="text" name="cid" placeholder="CID" value={this.state.cid} onChange={(e) => this.handleChange(e)}/>
          <textarea type="text" name="cidName" placeholder="nome CID" value={this.state.nameCid}/>
          <input type="file" name="exam" onChange={(e) => this.handleFileUpload(e)} multiple/>
          <Button btnTitle="Adicionar" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
      </section>
    )
  }
}