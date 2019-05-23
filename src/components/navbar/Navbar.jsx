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
      menuOpen:false,
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

  render(){   
    const styles= 
      {
        container:{
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
          <div style={styles.logo}>DoctorApp</div>
        </div>
        <Menu open={this.state.menuOpen}>
          <Link to='/profile'><MenuItem delay='0s' onClick={()=>{this.handleLinkClick();}}>Pacientes</MenuItem></Link>
          <Link to='/account'><MenuItem delay='0.1s' onClick={()=>{this.handleLinkClick();}}>Minha Conta</MenuItem></Link>
          <Link to='/schedulings'><MenuItem delay='0.2s' onClick={()=>{this.handleLinkClick();}}>Agenda</MenuItem></Link>
          <Link to='/'><MenuItem delay='0.3s' onClick={() => this.logoutUser()}>Logout</MenuItem></Link>
        </Menu>
      </div>
    );
  }
}

export default Navbar;
