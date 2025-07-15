// import React from 'react';
// import './PopulerCourses.css'
// import PopulerCoursesCard from './PopulerCoursesCard';
// const PopulerCourses = () => {
//   return (
//     <div className='PopulerCourses container mx-auto'>
//       <div className="header">
//         <h3>Populer Courses</h3>
//       </div>
//       <div className="bg">
//         <img src={require('../../../images/Populer-bg.png')} alt="PopulerCourses" loading='lazy' />

//       </div>
//       <div className="boxes">
//         <PopulerCoursesCard/>
//         <PopulerCoursesCard/>
//         <PopulerCoursesCard/>
//         <PopulerCoursesCard/>
//       </div>
//     </div>
//   );
// }

// export default PopulerCourses;

import React, { useRef } from "react";
import "./PopulerCourses.css";
import PopulerCoursesCard from "./PopulerCoursesCard";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const PopulerCourses = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // get data
  // useEffect(() => {
  //   setLoading(true);
  //   Axios.get(`/admin/course-category?page=${page}&keyword=${search}& status=${status}`).then((data) => {
  //     console.log(data.data.data.categories);
  //     setCategories(data.data.data.categories.data);
  //     setLoading(false);
  //   });
  // }, [search,deleted, status]);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const bgRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",

      },
    });

    gsap.from(bgRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",

      },
    });

    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",

      },
    });
  }, []);

  return (
    <div ref={containerRef} className="PopulerCourses container mx-auto">
      <div ref={headerRef} className="header">
        <h3>Our Categories</h3>
      </div>
      <div ref={bgRef} className="main-bg">
        <img src={require("../../../images/Populer-bg.png")} alt="PopulerCourses" loading="lazy" />
      </div>
      <div className="boxes">
        {[...Array(4)].map((_, index) => (
          <PopulerCoursesCard key={index} forwardRef={(el) => (cardsRef.current[index] = el)} />
        ))}
      </div>
    
    </div>
  );
};

export default PopulerCourses;

