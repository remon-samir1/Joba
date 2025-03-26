import React, { useRef } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import image from "../../../images/Hero.svg";
import "./Hero.css";

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.from(headingRef.current, { opacity: 0, y: 50, duration: 1, ease: "power3.out" })
      .from(paragraphRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .from(buttonRef.current, { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
      .from(imageRef.current, { opacity: 0, x: 100, duration: 1, ease: "power3.out" }, "-=0.5");
  }, []);

  return (
    <div className="Hero" ref={heroRef}>
      <div className="data container mx-auto">
        <div className="content" ref={contentRef}>
          <h2 ref={headingRef}>
            Take your time <br /> <span>and learn from anywhere</span>
          </h2>
          <p ref={paragraphRef}>
            Lorem ipsum dolor sit amet consectetur. Laoreet suspendisse facilisi
            vulputate ullamcorper nunc. Amet amet nunc varius vel Lorem ipsum
            dolor sit amet.
          </p>
          <div className="details">
          <Link className="link" ref={buttonRef}>
            <span>Learn more</span>
            <MdOutlineKeyboardDoubleArrowRight className="icon"/>
          </Link>
           <img src={require('../../../images/heroArrow.png')} alt="" />
          </div>
        </div>
        <div className="img" ref={imageRef}>
          <img src={image} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
