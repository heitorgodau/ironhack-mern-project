import React from 'react';

const ConsultationsRow = (props) => {
  if (props.display) {
    return(
      <div className={`consult-row ${props.className}`}>
        <h3>{props.title}:</h3>
        <h4>{props.display}</h4>
      </div>
    )
  } else {
    return null;
  }
}

export default ConsultationsRow;
