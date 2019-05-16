import React from 'react';
import './navbar.css'

export default class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
    }
  }
    
  componentWillReceiveProps(nextProps){
    if(nextProps.open !== this.state.open){
      this.setState({open:nextProps.open});
    }
  }
  
  render(){
    const styles={
      container: {
        height: this.state.open? '100%': 0,
      },
    }
    return(
      <div className="container" style={styles.container}>
        {
          this.state.open?
            <div className="menu-list">
              {this.props.children}
            </div>:null
        }
      </div>
    )
  }
}