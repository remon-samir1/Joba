import "./SudentsSays.css";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SudentsSays = () => {


  return (
    <div  className="SudentsSays">
      <div className="img">
        <img
          src={require("../../../images/student-ex.png")}
          alt="student image"
          loading="lazy"
        />
      </div>
      <div className="content">
        <h3 className="header">What our students say about us</h3>
        <div className="text">
          <img src={require("../../../images/point.png")} loading="lazy" />
          <p>
            Lorem ipsum dolor sit amet consectetur. Non ipsum sed at libero
            lacus. Platea donec eget sapien lorem.
          </p>
          <img src={require("../../../images/point.png")} loading="lazy" />
        </div>
        <div className="student">
          <p>Elizabeth Wiza</p>
          <span>Web Developer</span>
        </div>
        <div className="arrows">
          <div className="arrow">
            <img
              src={require("../../../images/arrow-icon.png")}
              alt="<"
              loading="lazy"
            />
          </div>
          <div className="arrow">
            <img
              src={require("../../../images/arrow-icon.png")}
              alt="<"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SudentsSays;
