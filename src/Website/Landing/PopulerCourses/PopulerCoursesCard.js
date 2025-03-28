// import React from "react";

// const PopulerCoursesCard = () => {
//   return (
//     <div className="PopulerCoursesCard">
//       <img
//         className="bg"
//         src={require("../../../images/ourcourses-img.png")}
//         alt="populercourses"
//         loading="lazy"
//       />
//       <div className="icon">
//         <img
//           src={require("../../../images/populerCourse-icon.png")}
//           alt="category"
//           loading="lazy"
//         />
//       </div>
//       <div className="content">
//         <h4>Ui/Ux design</h4>
//         <div className="lesson">
//           <img
//             src={require("../../../images/book.png")}
//             alt="book"
//             loading="lazy"
//           />
//           <span>20 Lessons</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopulerCoursesCard;


import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PopulerCoursesCard = () => {
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
        src={require("../../../images/ourcourses-img.png")}
        alt="populercourses"
        loading="lazy"
      />
      <div className="icon">
        <img
          src={require("../../../images/populerCourse-icon.png")}
          alt="category"
          loading="lazy"
        />
      </div>
      <div className="content">
        <h4>Ui/Ux design</h4>
        <div className="lesson">
          <img
            src={require("../../../images/book.png")}
            alt="book"
            loading="lazy"
          />
          <span>20 Lessons</span>
        </div>
      </div>
    </div>
  );
};

export default PopulerCoursesCard;
