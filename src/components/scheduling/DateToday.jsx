import React from 'react';
const DateToday = () => {  
  let today = new Date(); 
  return (     
    <div className="date-today">      
      <h2>Lista de agendamentos</h2>
      <p>Data de hoje: <span>{today.getDate()}/{today.getMonth() + 1 }/{today.getFullYear()}</span></p>
    </div>
    ); 
}
export default  DateToday;