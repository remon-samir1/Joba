

import React, { useRef } from "react";
import "./PopulerCourses.css";
import PopulerCoursesCard from "./PopulerCoursesCard";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const PopulerCourses = () => {
  const { t , i18n} = useTranslation()

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skeleton, setSkeleton] = useState("");


  useEffect(() => {
  
    Axios.get('/courses').then(data =>{
      setCategories(data.data.categories.slice(-4))
      setSkeleton(false);

    })
  }, []);
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
        <h3>{t("Our Categories")}</h3>
      </div>
      <div ref={bgRef} className="main-bg">
        <img src={require("../../../images/Populer-bg.png")} alt="PopulerCourses" loading="lazy" />
      </div>
      <div className="boxes">
        {categories.map((data, index) => (
          <PopulerCoursesCard key={index} forwardRef={(el) => (cardsRef.current[index] = el)} id={data.id}  title={data.name} icon={data.icon} courses={data.courses.length} image={data.courses[0]?.thumbnail}/>
        ))}
      </div>
    
    </div>
  );
};

export default PopulerCourses;

