import React from 'react';
import './button.css';

const Button = (props) => {
  return(
   <button onClick={props.onClick} type={props.type} className={`btn ${props.className}`}>{props.btnTitle}</button>
  );
};

export default Button;
