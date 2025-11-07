import "./WhatweOffer.css";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhatweOfferBox from "./WhatweOfferBox";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const WhatweOffer = () => {
  const boxRefs = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      boxRefs.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".boxes",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);


  const { t, i18n } = useTranslation();
  const data = [
    {
      header: t("Comprehensive Online Courses"),
      image: "send-icon.png",
      desk: t("Expertly structured programs covering all areas of cosmetics manufacturing — from basics to advanced formulations."),
    },
    {
      header: t("Professional Consultations"),
      image: "expert-icon.png",
      desk: t("Scientific and technical consultancy for companies and factories to develop and enhance product quality."),
    },
    {
      header: t("Raw Material Supply"),
      image: "certificate-icon.png",
      desk: t("High-quality raw materials sourced from the same trusted suppliers we use in real manufacturing operations."),
    },
    {
      header: t("Manufacturing & Product Licensing"),
      image: "time-icon.png",
      desk: t("Private label production, formulation creation, and product licensing with the Egyptian Drug Authority — all under expert supervision."),
    },
  ];
  return (
    <div className="WhatweOffer">
      <div className="header" ref={headerRef}>
        <p>{t("What We Offer at Joba Natural Hub Academy")}</p>
        <p>
          {t(
            "At Joba Academy, we offer more than just online courses — we provide a complete ecosystem designed to empower you scientifically and practically in the world of cosmetics manufacturing. Whether you’re a beginner taking your first steps or a professional looking to refine your skills, we deliver the knowledge, experience, and continuous support you need to make a real impact in the beauty industry."
          )}
        </p>
      </div>
      <div className="content">
        <div className="boxes container mx-auto">
          {data.map((item, index) => (
            <WhatweOfferBox
              key={index}
              ref={(el) => (boxRefs.current[index] = el)}
              image={item.image}
              header={item.header}
              desk={item.desk}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhatweOffer;
