import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../navbar/Menu';
import MenuItem from '../navbar/MenuItem';
import MenuButton from '../navbar/MenuButton';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen:false,
    }
  }

  handleMenuClick() {
    this.setState({menuOpen:!this.state.menuOpen});
  }
  
  handleLinkClick() {
    this.setState({menuOpen: false});
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
          background: 'black',
          width: '100%',
          color: 'white',
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
     
      <div className="App">
        <div style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
          <div style={styles.logo}>WireHeart</div>
        </div>
        <Menu open={this.state.menuOpen}>
          <Link to='/'><MenuItem delay='0s' onClick={()=>{this.handleLinkClick();}}>Home</MenuItem></Link>
          <Link to='/'><MenuItem delay='0.1s' onClick={()=>{this.handleLinkClick();}}>Minha Conta</MenuItem></Link>
          <Link to='/'><MenuItem delay='0.2s' onClick={()=>{this.handleLinkClick();}}>Pacientes</MenuItem></Link>
          <Link to='/'><MenuItem delay='0.3s' onClick={()=>{this.handleLinkClick();}}>Logout</MenuItem></Link>
        </Menu>
      </div>
    );
  }
}

export default App;
