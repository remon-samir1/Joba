import React from 'react';
import './Landing.css'
import NavBar from '../../components/NavBar/NavBar';
import Hero from './Hero/Hero';
import AboutUs from './AboutUS/AboutUs';
import WhatweOffer from './WhatweOffer/WhatweOffer';
const Landing = () => {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <AboutUs/>
      <WhatweOffer/>
    </div>
  );
}

export default Landing;
