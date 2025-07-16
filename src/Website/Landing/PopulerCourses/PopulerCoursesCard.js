

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { baseUrl } from "../../../components/Helpers/Axios";

gsap.registerPlugin(ScrollTrigger);

const PopulerCoursesCard = ({title , icon , image , courses}) => {
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",

      },
    });
  }, []);

  return (
    <div ref={cardRef} className="PopulerCoursesCard">
      <img
        className="bg"
        src={image ? `${baseUrl}/${image}` : require("../../../images/ourcourses-img.png")}
        alt="populercourses"
        loading="lazy"
      />
      <div className="icon">
        <img
          src={`${baseUrl}/${icon}`}
          alt="category"
          loading="lazy"
        />
      </div>
      <div className="content">
        <h4>{title}</h4>
        <div className="lesson">
          <img
            src={require("../../../images/book.png")}
            alt="book"
            loading="lazy"
          />
          <span>{courses} Courses</span>
        </div>
      </div>
    </div>
  );
};

export default PopulerCoursesCard;
