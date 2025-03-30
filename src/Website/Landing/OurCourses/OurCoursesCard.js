import { Icon } from "@iconify-icon/react";
import React, { useRef } from "react";
import { CiHeart } from "react-icons/ci";
import { LuClock3 } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OurCoursesCard = () => {
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
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
    <div ref={cardRef} className="OurCoursesCard">
      <div className="img">
        <img
          src={require("../../../images/ourcourses-img.png")}
          alt="courses"
          loading="lazy"
        />
        <Icon icon="mdi-light:heart" width="24" height="24" className="icon" />
      </div>
      <div className="content px-3">
        <div className="details">
          <div className="detail">
            <LuClock3 className="icon" />
            <span>4 hours</span>
          </div>
          <div className="detail">
            <PiStudent className="icon" />
            <span>112 students</span>
          </div>
          <div className="detail">
            <Icon icon="streamline:class-lesson" width="0.8rem" height="0.8rem" className="icon" />
            <span>6 Lesson</span>
          </div>
        </div>
        <div className="rating">
          <div className="stars">
            <Icon
              icon="material-symbols-light:star-rate-rounded"
              className="icon"
            />
            <Icon
              icon="material-symbols-light:star-rate-rounded"
              className="icon"
            />
            <Icon
              icon="material-symbols-light:star-rate-rounded"
              className="icon"
            />
            <Icon
              icon="material-symbols-light:star-half"
              className="icon half"
            />
            <Icon
              icon="material-symbols-light:star-rate-outline-rounded"
              className="icon"
            />
          </div>
          <p className="review">( 3 Reviews )</p>
        </div>
        <h4 className="title">Managment consultants in competitive markets</h4>
        <div className="card-footer">
          <div className="trainer">
            <img
              src={require("../../../images/TRAINER.png")}
              alt="trainer-image"
              loading="lazy"
            />
            <span className="name">Mario MacGyver</span>
          </div>
          <p className="price">350.00 EGP</p>
        </div>
      </div>
    </div>
  );
};

export default OurCoursesCard;
