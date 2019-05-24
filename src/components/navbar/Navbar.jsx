import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import MenuItem from './MenuItem';
import MenuButton from './MenuButton';
import AuthService from '../auth/auth-service';
import './navbar.css';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen:false      
    }
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
  }

  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  handleMenuClick() {
    this.setState({menuOpen:!this.state.menuOpen});
  }
  
  handleLinkClick() {
    this.setState({menuOpen: false});
  }

  logoutUser = () =>{
    this.service.logout()
    .then(() => {
      this.setState({ loggedInUser: null });
      this.props.getUser(null);  
      console.log("Success logout!!!")
    })
  } 

  welcome(){
    let day = new Date(); 
    let hour = day.getHours();
    if(hour < 12){
      return(<h3> Bom dia, <span>{this.props.userInSession.name}</span></h3>); 
    } else if(hour > 17){
      return(<h3> Boa noite, <span>{this.props.userInSession.name}</span></h3>);
    }else
      return(<h3> Boa tarde, <span>{this.props.userInSession.name}</span></h3>);
  }


  render(){   
    const styles= 
      {
        container:{
          padding: '0 20px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: '99',
          opacity: 0.9,
          display:'flex',
          alignItems:'center',
          background: '#35D3A7',
          width: '100%',
          color: '#333',
          fontFamily:'Lobster',
        },
        logo: {
          margin: '0 auto',
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          filter: this.state.menuOpen ? 'blur(2px)':null,
          transition: 'filter 0.5s ease',
        },
      }     

    return (     
      <div className="navbar">       
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='#333'/>
          <figure className="logo" style={styles.logo}>
            <img src="../../images/logo.png" alt="Doctor Helper in green, an orange circle behind de letters with a stethoscope icon"/>
          </figure>
          <div className="user">
            {this.welcome()} 
          </div>
        </div>
        <Menu open={this.state.menuOpen}>
          <Link to='/profile'><MenuItem delay='0s' onClick={()=>{this.handleLinkClick();}}>Pacientes</MenuItem></Link>
          <Link to='/account'><MenuItem delay='0.1s' onClick={()=>{this.handleLinkClick();}}>Minha Conta</MenuItem></Link>
          <Link to='/schedulings'><MenuItem delay='0.2s' onClick={()=>{this.handleLinkClick();}}>Agenda</MenuItem></Link>
          <a rel='noopener noreferrer' target="_blank" href="https://doutorarebeca.mybluemix.net/"><MenuItem delay='0.2s'>Chatbot</MenuItem></a>
          <Link to='/'><MenuItem delay='0.3s' onClick={() => this.logoutUser()}>Logout</MenuItem></Link>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
