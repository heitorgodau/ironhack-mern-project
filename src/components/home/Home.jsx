import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button'

const Home = () => {
  return(
    <section className="home">
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
