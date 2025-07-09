import { Icon } from "@iconify-icon/react";
import React, { useRef } from "react";
import { CiHeart } from "react-icons/ci";
import { LuClock3 } from "react-icons/lu";
import { PiStudent } from "react-icons/pi";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { baseUrl } from "../../../components/Helpers/Axios";
import { formatDuration } from "../../../components/FormatDuration/FormatDuration";

gsap.registerPlugin(ScrollTrigger);

const OurCoursesCard = (props) => {
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
      <div className="img relative overflow-hidden group">
        <img
          src={`${baseUrl}/${props.thumbnail}`}
          alt="courses"
          loading="lazy"
        />
         <div className="shine-overlay"></div>
        {/* <Icon icon="mdi-light:heart" width="24" height="24" className="icon" /> */}
      </div>
      <div className="content px-3">
        <div className="details">
          <div className="detail">
            <LuClock3 className="icon" />
            <span>{formatDuration(props.duration)}</span>
          </div>
          <div className="detail">
            <PiStudent className="icon" />
            <span>{props.students} students</span>
          </div>
          <div className="detail">
            <Icon
              icon="streamline:class-lesson"
              width="0.8rem"
              height="0.8rem"
              className="icon"
            />
            <span>{props.lessons} Lesson</span>
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
          <p className="review">( {props.reviews} Reviews )</p>
        </div>
        <h4 className="title">{props.title}</h4>
        <div className="card-footer">
          <div className="trainer">
            <img
            src={`${baseUrl}/${props.instructor_image}`}
              alt="trainer-image"
              loading="lazy"
            />
            <span className="name">{props.instructor_name}</span>
          </div>
          <p className="price">{props.price} EGP</p>
        </div>
      </div>
    </div>
  );
};

export default OurCoursesCard;
