

import "./SudentsSays.css";
import React, { useEffect, useRef, useState } from "react";
import { Axios, baseUrl } from "../../../components/Helpers/Axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SudentsSays = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const directionRef = useRef("next");
  const autoSlideInterval = useRef(null);
  const containerRef = useRef(null);

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const nameRef = useRef(null);
  const jobRef = useRef(null);

  useEffect(() => {
    Axios.get("/testimonial").then((data) => {
      const testimonialData = data.data.data.testimonials.data;
      setTestimonials(testimonialData);
    });
  }, []);

  useEffect(() => {
    const dir = directionRef.current === "next" ? 100 : -100;

    const animateIn = (ref) => {
      gsap.fromTo(
        ref.current,
        { x: dir, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );
    };

    [imageRef, textRef, nameRef, jobRef].forEach((ref) => animateIn(ref));
  }, [currentIndex]);

  const startAutoSlide = () => {
    if (autoSlideInterval.current) return; // prevent duplicates

    autoSlideInterval.current = setInterval(() => {
      directionRef.current = "next";
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
    autoSlideInterval.current = null;
  };

  useEffect(() => {
    if (testimonials.length > 0) {
      startAutoSlide();
    }

    // Cleanup on unmount
    return () => stopAutoSlide();
  }, [testimonials]);

  const handleNext = () => {
    directionRef.current = "next";
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    directionRef.current = "prev";
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <div
      className="SudentsSays"
      ref={containerRef}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="md:flex hidden justify-end w-full">
        <div className="img" ref={imageRef}>
          <img
            src={
              current?.image
                ? `${baseUrl}/${current.image}`
                : require("../../../images/student-ex.png")
            }
            alt="student"
            loading="lazy"
          />
        </div>
      </div>

    

      <div className="content">
        <h3 className="header">What our students say about us</h3>

        <div className="text" ref={textRef}>
          <img src={require("../../../images/point.png")} loading="lazy" />
          <p>
            {current?.translation?.comment ||
              "No comment available at the moment."}
          </p>
          <img src={require("../../../images/point.png")} loading="lazy" />
        </div>

        <div className="student">
          <p ref={nameRef}>{current?.translation?.name || "Unknown"}</p>
          <span ref={jobRef}>
            {current?.translation?.designation || "Unknown Role"}
          </span>
        </div>

        <div className="arrows">
          <div className="arrow" onClick={handlePrev}>
            <img
              src={require("../../../images/arrow-icon.png")}
              alt="prev"
              loading="lazy"
            />
          </div>
          <div className="arrow" onClick={handleNext}>
            <img
              src={require("../../../images/arrow-icon.png")}
              alt="next"
              loading="lazy"
              style={{ transform: "rotate(180deg)" }}
            />
          </div>
          <div className="img md:!hidden" ref={imageRef}>
        <img
          src={
            current?.image
              ? `${baseUrl}/${current.image}`
              : require("../../../images/student-ex.png")
          }
          alt="student"
          loading="lazy"
        />
      </div>
        </div>
      </div>
    </div>
  );
};

export default SudentsSays;
