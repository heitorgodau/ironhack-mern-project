import React from 'react';
const DateToday = () => {  
  let today = new Date(); 
  return (     
    <div className="date-today">      
      <h2>Lista de agendamentos</h2> <br/>
        {      
         `A data de hojé é: ${today.getDate()} do ${today.getMonth() + 1 } de ${today.getFullYear()}` 
        }
    </div>
    ); 
}
export default  DateToday;