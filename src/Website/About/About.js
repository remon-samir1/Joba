import React, { useEffect, useRef } from "react";
import "./About.css";
import NavBar from "../../components/NavBar/NavBar";
import AboutUs from "../Landing/AboutUS/AboutUs";
import AboutCompany from "./AboutCompany";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { t , i18n} = useTranslation()

  const sccrollRef = useRef(null);

  useEffect(()=>{
sccrollRef.current.scrollIntoView()
  },[])
  const titleRef = useRef();
  const flyRef = useRef();
  const aboutUsRef = useRef();
  const aboutCompanyRef = useRef();

  useGSAP(() => {
    gsap.from(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    gsap.from(flyRef.current, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      delay: 0.2,
      ease: "power3.out"
    });

    gsap.from(aboutUsRef.current, {
      scrollTrigger: {
        trigger: aboutUsRef.current,
        start: "top 90%",
      },
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

  

  });

  return (
    <div ref={sccrollRef}>
      <NavBar />

      <div className="About bg-main bg-opacity-25 h-[280px] px-[5vh] md:px-[10vh] flex items-center justify-between">
        <h3
          ref={titleRef}
          className="text-[3.3rem] text-textColor font-bold"
        >
          {t("About")}
        </h3>
        <img
          ref={flyRef}
          src={require("../../images/fly.png")}
          loading="lazy"
          className="fly"
        />
      </div>

      <div className="mt-8">
        <div ref={aboutUsRef}>
          <AboutUs />
        </div>
        <div ref={aboutCompanyRef}>
          <AboutCompany />
        </div>
      </div>
    </div>
  );
};

export default About;
