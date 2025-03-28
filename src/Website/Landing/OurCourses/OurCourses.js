import "./OurCourses.css";
import React, { useEffect, useRef } from "react";
import OurCoursesCard from "./OurCoursesCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const OurCourses = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(filtersRef.current.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: filtersRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={containerRef} className="OurCourses container mx-auto">
      <div ref={headerRef} className="header">
        <div className="texts">
          <p>welcome to our property</p>
          <h4>
            Our <span>featured</span> courses
          </h4>
        </div>
        <div className="img">
          <img
            src={require("../../../images/our-courses-arrow.png")}
            alt="courses"
            loading="lazy"
          />
        </div>
        <div ref={filtersRef} className="filters">
          {["AllCourses", "Bussiness", "Design", "Devolpment", "Markting"].map(
            (text, index) => (
              <button key={index}>{text}</button>
            )
          )}
        </div>
      </div>
      <div className="boxes flex justify-center items-center gap-6 ">
        {[...Array(3)].map((_, index) => (
          <OurCoursesCard
            key={index}
            forwardRef={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center pr-7 mt-4">
        <img src={require('../../../images/img1.png')} loading="lazy" />
        <img src={require('../../../images/img2.png')} loading="lazy" />
      </div>
    </div>
  );
};

export default OurCourses;
