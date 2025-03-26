import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutUs.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".img img", {
        opacity: 0,
        x: -50,
        duration: 1,
        scrollTrigger: {
          trigger: ".img",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".content h4, .content p", {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".content",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".details .detail", {
        opacity: 0,
        x: 30,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".details",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".link", {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        scrollTrigger: {
          trigger: ".link",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="AboutUs container mx-auto" ref={aboutRef}>
      <div className="img">
        <img
          src={require("../../../images/AbouUs.png")}
          alt="about-us"
          loading="lazy"
        />
      </div>
      <div className="data">
        <div className="content">
          <div className="header">
            <h4>about us</h4>
            <img
              src={require("../../../images/orangeArrow.png")}
              alt=">>>"
              loading="lazy"
            />
          </div>
          <p className="title">
            Lorem ipsum dolor sit amet consectetur. Neque tristique purus
            volutpat adipiscing.
          </p>
          <p className="description">
            Lorem ipsum dolor sit amet consectetur. Neque tristique purus
            volutpat adipiscing.
          </p>
        </div>
        <div className="flexiable">
          <img
            src={require("../../../images/FlexabileClasses.png")}
            alt="juba"
            loading="lazy"
          />
          <span>
            Lorem ipsum dolor sit amet consectetur. Laoreet suspendisse facilisi
            vulputate ullamcorper nunc.
          </span>
        </div>
        <div className="details">
          {[...Array(4)].map((_, index) => (
            <div className="detail" key={index}>
              <img
                src={require("../../../images/checkd.png")}
                alt="check"
                loading="lazy"
              />
              <span>Lorem ipsum dolor</span>
            </div>
          ))}
        </div>
        <Link className="link">
          <span>Discover more</span>
          <MdOutlineKeyboardDoubleArrowRight className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
