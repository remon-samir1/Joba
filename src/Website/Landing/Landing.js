import React from 'react';
import './Landing.css'
import NavBar from '../../components/NavBar/NavBar';
import Hero from './Hero/Hero';
import AboutUs from './AboutUS/AboutUs';
const Landing = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <AboutUs/>
    </div>
  );
}

export default Landing;
