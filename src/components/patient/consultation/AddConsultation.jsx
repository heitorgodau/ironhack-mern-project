import React, { Component } from 'react'
import axios from 'axios';
import '../patient.css';
import '../consultation/consultation.css'

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
      pupilas:'',
      glasgow:'',
      cardiovascular:'',         
      pele_e_faneros:'', 
      ap_respiratorio:'',      
      abdome:'',
      osteo_articular:'',      
      cid: '',
      nameCid: '',      
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
        console.log('Paciente adicionado', result)
        this.setState({
          reason: '',
          fisico: '',
          orofaringe:'',
          otoscopia:'',
          SNC:'',
          rigidez_da_nuca:'', 
          pupilas:'',
          cardiovascular:'',  
          RCR_2T_BNF_S_S:'',  
          pele_e_faneros:'', 
          ap_respiratorio:'',
          R_Adv:'',
          abdome:'',
          osteo_articular:'',
          glasgow:'',
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
          <div className="fisic-exam">

          <input type="text" name="reason" value={this.state.reason} placeholder="Motivo da consulta" onChange={(e) => this.handleChange(e)}/>     
        
          <textarea name="symptoms" placeholder="anaminesi" value={this.state.symptoms} onChange={(e) => this.handleChange(e)}/>

            <h3>Exame Fisico</h3>
            
            <div className="radio">
              <label>
                <input type="radio" name="fisico" onChange={(e) => this.handleChange(e)} value='Normal corado, Hidratado, Acian, Afeb, Eupneico'/>
                Normal
              </label> 
              <br/>
              <label>
                <input type="radio" name="fisico" onChange={(e) => this.handleChange(e)} value='Alterado'/>
                Alterado
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
              <br/> 
              <label>
                <input type="radio" name="SNC" onChange={(e) => this.handleChange(e)} value='Alterado'/>
                Alterado
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
              <p>Pupilas</p>
              <label>
                <input type="radio" name="pupilas" onChange={(e) => this.handleChange(e)} value='Isocoricas - Normal'/>
                Isocoricas / Normal
              </label>
              <br/> 
              <label>
                <input type="radio" name="pupilas" onChange={(e) => this.handleChange(e)} value='Mióticas'/>
                Mióticas
              </label>
              <br/> 
              <label>
                <input type="radio" name="pupilas" onChange={(e) => this.handleChange(e)} value='Midriáticas'/>
                Midriáticas
              </label> 
              <label>
                <input type="radio" name="pupilas" onChange={(e) => this.handleChange(e)} value='Anisocónicas'/>
                Anisocónicas
              </label> 
            </div> 

            <div className="radio">
              <p>Glasgow</p>              
                <input type="number" name="glasgow" value={this.state.glasgow} placeholder="Escala de glasgow" onChange={(e) => this.handleChange(e)}/>        
            </div> 

            <div className="radio">
              <p>Cardiovascular</p>
              <label>
                <input type="radio" name="cardiovascular" onChange={(e) => this.handleChange(e)} value='Normal- RCR em 2T BNF S S'/>
                Normal
              </label>
              <br/> 
              <div className="block">  
                <label>
                  <input type="radio" name="cardiovascular" onChange={(e) => this.handleChange(e)} value=''/>
                  Alterado:
                </label>   
                <input type="text" name="cardiovascular" placeholder="" onChange={(e) => this.handleChange(e)}/> 
              </div>     
            </div>          

            <div className="radio">
              <p>Pele e Fâneros</p>
              <label>
                <input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/>               
              <label>
                <input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Petequias'/>
                Petequias
              </label>   
              <br/>             
              <label>
                <input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Pústulas'/>
                Pústulas
              </label>              
              <br/> 
              <label>
                <input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Placas hiperémicas'/>
                Placas hiperémicas
              </label> 
              <br/> 
              <label>
                <input type="radio" name="pele_e_faneros" onChange={(e) => this.handleChange(e)} value='Vesículas'/>
                Vesículas
              </label> 
            </div> 

            <div className="radio">
              <p>Aparato Respiratorio</p>
              <label>
                <input type="radio" name="ap_respiratorio" onChange={(e) => this.handleChange(e)} value='Normal / MV + S R.Adv'/>
                Normal / MV + S R.Adv
              </label>   
              <br/> 
              <div className="block">  
                <label>
                  <input type="radio" name="ap_respiratorio" onChange={(e) => this.handleChange(e)} value=''/>
                  Alterado
                </label> 
                <input type="text" name="ap_respiratorio" placeholder="" onChange={(e) => this.handleChange(e)}/>
              </div>                   
            </div>

            <div className="radio">
              <p>Abdome</p>
              <label>
                <input type="radio" name="abdome" onChange={(e) => this.handleChange(e)} value='Normal / Ruidos hidroaereos positivos sem dor a palpitação'/>
                Normal
              </label>
              <br/>
              <div className="block">  
                <label>
                  <input type="radio" name="abdome" onChange={(e) => this.handleChange(e)} value=''/>
                  Alterado
                </label>   
                <input type="text" name="abdome" placeholder="" onChange={(e) => this.handleChange(e)}/> 
              </div>     
            </div> 

            <div className="radio">
              <p>Osteo Articular</p>
              <label>
                <input type="radio" name="osteo_articular" onChange={(e) => this.handleChange(e)} value='Normal'/>
                Normal
              </label>
              <br/>   
              <div className="block">  
                <label>
                  <input type="radio" name="osteo_articular" onChange={(e) => this.handleChange(e)} value=''/>
                  Alterado
                </label> 
                <input type="text" name="osteo_articular" placeholder="" onChange={(e) => this.handleChange(e)}/>                         
              </div>  
            </div> 
          </div>          
          
          <textarea name="conduct" placeholder="Conduta médica" value={this.state.conduct} onChange={(e) => this.handleChange(e)}/>
          
          <input type="text" name="cid" placeholder="CID" value={this.state.cid} onChange={(e) => this.handleChange(e)}/>

          {
            (this.state.cid.length !== 0) ? 
              <textarea className="cid-name" type="text" name="cidName" placeholder="Doença" value={this.state.nameCid} onChange={(e) => this.handleChange(e)}/>
              :
              <textarea className="cid-name" type="text" name="cidName" placeholder="Doença" value='' onChange={(e) => this.handleChange(e)}/>
          }
          
          <input type="file" name="exam" onChange={(e) => this.handleFileUpload(e)} multiple/>
          
          <Button btnTitle="Adicionar" className="btn-primary btn-md btn-round" linkTo="/profile" type="submit" />
        </form>
      </section>
    )
  }
}