import React from 'react';
import logo from '../../images/juba.svg';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return (
    <Link to='/admin/main' style={{cursor:'pointer'}} className={`${props.small ? '120px': '180px'}`}>
        <img src={logo} alt="Joba" loading='lazy' className='w-full h-full object-cover' />
    </Link>
  );
}

export default Logo;
