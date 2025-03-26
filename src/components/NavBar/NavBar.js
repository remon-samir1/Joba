// import React from 'react';
// import './NavBar.css'
// import logo from '../../images/juba.svg'
// import { Link } from 'react-router-dom';
// const NavBar = () => {
//   return (
//     <div className='NavBar'>
//       <div className="logo">
//         <img src={logo} alt="Joba" loading='lazy' />
//       </div>
//       <div className="Links">
//         <Link className='link'>Home</Link>
//         <Link className='link'>About</Link>
//         <Link className='link'>Course content</Link>
//         <Link className='link'>Resources</Link>
//         <Link className='link'>Support</Link>
//       </div>
//       <div className="btns">
//         <Link className='link'>Sign In</Link>
//         <Link className='link'>Sign Up</Link>
//       </div>
//     </div>
//   );
// }

// export default NavBar;

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';

const NavBar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const btnsRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(navRef.current, { opacity: 0, y: -20, duration: 0.8, ease: 'power3.out' })
      .from(logoRef.current, { opacity: 0, x: -30, duration: 0.8 }, "-=0.5")
      .from(linksRef.current, { opacity: 0, y: 20, stagger: 0.2, duration: 0.6 }, "-=0.5")
      .from(btnsRef.current, { opacity: 0, scale: 0.8, duration: 0.6 }, "-=0.4");
  }, []);

  return (
    <div className='NavBar' ref={navRef}>
      <div className="logo" ref={logoRef}>
      <Logo/>
      </div>
      <div className="Links">
        {['Home', 'About', 'Course content', 'Resources', 'Support'].map((text, index) => (
          <Link key={index} className='link' ref={el => linksRef.current[index] = el}>{text}</Link>
        ))}
      </div>
      <div className="btns" ref={btnsRef}>
        <Link className='link'>Sign In</Link>
        <Link className='link'>Sign Up</Link>
      </div>
    </div>
  );
}

export default NavBar;
