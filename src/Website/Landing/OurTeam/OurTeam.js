import "./OurTeam.css";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
const OurTeam = () => {
  const teamRef = useRef(null);
  const headerRef = useRef(null);
  const trainersRef = useRef([]);
  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(trainersRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: teamRef.current,
        start: "top 0",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={teamRef} className="OurTeam">
      <div className="texts">
        <div ref={headerRef} className="header">
          <h5>Our team</h5>
          <img
            src={require("../../../images/orangeArrow.png")}
            alt=">>"
            loading="lazy"
          />
        </div>
        <p>Meet our professional instructors</p>
      </div>
      <div className="trainers">
        {[...Array(3)].map((_, index) => (
          <div
            ref={(el) => (trainersRef.current[index] = el)}
            key={index}
            className="trainer"
          >
            <img
              src={require("../../../images/our-team.png")}
              alt="trainer"
              loading="lazy"
            />
            <img
              src={require("../../../images/Intersect.png")}
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <div className="bg">
        <img
          src={require("../../../images/Our-team-bg.png")}
          alt="team"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default OurTeam;
