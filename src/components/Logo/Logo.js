import React from 'react';
import logo from '../../images/juba.svg';
import { Link } from 'react-router-dom';

const Logo = (props) => {
  return (
    <Link to='/admin/main' style={{cursor:'pointer'}}>
        <img src={logo} alt="Joba" loading='lazy' width={props.small ? '120px': '180px' }/>
    </Link>
  );
}

export default Logo;
