import React from 'react';
import './Landing.css'
import NavBar from '../../components/NavBar/NavBar';
import Hero from './Hero/Hero';
import AboutUs from './AboutUS/AboutUs';
import WhatweOffer from './WhatweOffer/WhatweOffer';
import OurCourses from './OurCourses/OurCourses';
import PopulerCourses from './PopulerCourses/PopulerCourses';
import OurTeam from './OurTeam/OurTeam';
import JoinUs from './JoinUs/JoinUs';
import LatestBlogs from './LatestBlogs/LatestBlogs';
import SudentsSays from './SudentsSays/SudentsSays';
const Landing = () => {
  return (
    <div>
      {/* <NavBar/> */}
      <Hero/>
      <AboutUs/>
      <WhatweOffer/>
      <OurCourses/>
      {/* <PopulerCourses />
      <OurTeam/>
      <JoinUs />
      <LatestBlogs />
      <SudentsSays />
      <Footer /> */}
    </div>
  );
}

export default Landing;
