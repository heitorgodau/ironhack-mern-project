import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button'
import './home.css'

const Home = () => {
  return(
    <section className="home">
      <figure className="logo">
        <img src="../../images/logo.png" alt="Doctor Helper in green, an orange circle behind de letters with a stethoscope icon"/>
      </figure>
      <div className="buttons">
        <Link to='/login'>
          <Button className='btn-primary btn-round btn-lg uppercase' btnTitle='Login' />
        </Link>
        <Link to='/signup'>
          <Button className='btn-primary btn-round btn-lg uppercase' btnTitle='Signup' />
        </Link>
      </div>
    </section>
  )
}

export default Home;
