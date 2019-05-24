import React, { Component } from 'react'
import { Link } from 'react-router-dom';
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
    axios.post(`${process.env.REACT_APP_API_URL}/consultation/new`, {...this.state}, {withCredentials:true})
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
              <div className="fisico options">
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
            </div> 

            <div className="radio">
                <p>Orofaringe</p>
              <div className="orofaringe options">
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
            </div> 

            <div className="radio">
              <p>Otoscopia</p>
              <div className="otoscopia options">
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
            </div>           

            <div className="radio">
              <p>SNC</p>
              <div className="snc options">
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
            </div>           

            <div className="radio">
              <p>Rigidez da nuca</p>
              <div className="rigidez-nuca options">
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
            </div> 

            <div className="radio">
              <p>Pupilas</p>
              <div className="pupilas options">
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
                <br/>
                <label>
                  <input type="radio" name="pupilas" onChange={(e) => this.handleChange(e)} value='Anisocónicas'/>
                  Anisocónicas
                </label> 
              </div>
            </div> 

            <div className="radio">
              <p>Glasgow</p>
              <div className="textinput glasgow options">                
                <input min ="3" max="15" type="number" name="glasgow" value={this.state.glasgow} placeholder="Escala de glasgow" onChange={(e) => this.handleChange(e)}/>        
              </div>              
            </div> 

            <div className="radio">
              <p>Cardiovascular</p>
              <div className="cardiovascular options">
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
            </div>          

            <div className="radio">
              <p>Pele e Fâneros</p>
              <div className="pele-faneros options">
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
            </div> 

            <div className="radio">
              <p>Aparato Respiratorio</p>
              <div className="respiratorio options">
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
            </div>

            <div className="radio">
              <p>Abdome</p>
              <div className="abdome options">
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
            </div> 

            <div className="radio">
              <p>Osteo Articular</p>
              <div className="osteo options">
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
          
          <Button btnTitle="Adicionar" className="btn-primary btn-md btn-round" type="submit" />
          <Link to={`/patient/${this.props.match.params.patientId}`}>
            <Button btnTitle="Cancelar" className="btn-cancel mt-0 btn-md btn-round" />
          </Link>
        </form>
      </section>
    )
  }
}