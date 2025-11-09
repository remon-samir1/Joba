import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { baseUrl } from "../../../components/Helpers/Axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../Context/CategoryIdContext";
import defaultImage from '../../../images/ourcourses-img.png'
gsap.registerPlugin(ScrollTrigger);

const PopulerCoursesCard = ({ title, icon, image, courses, id }) => {
  const CategoryContext = useContext(Category);
  const setCategoryId = CategoryContext.setcategoryId;
  //CategoryContext);
  const nav = useNavigate();
  const handleFilter = () => {
    setCategoryId(id);
    nav("/Courses");
  };
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
    <div
      onClick={handleFilter}
      ref={cardRef}
      className="PopulerCoursesCard cursor-pointer"
    >

<img
  className="bg"
  src={image ? `${baseUrl}/${image}` : defaultImage}
  alt="populercourses"
  loading="lazy"
  onError={(e) => {
    e.target.onerror = null; 
    e.target.src = defaultImage;
  }}
/>

      <div className="icon">
        <img src={ `${baseUrl}/${icon}`} alt="category" loading="lazy" />
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
