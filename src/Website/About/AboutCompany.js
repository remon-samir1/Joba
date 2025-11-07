import React, { useRef } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import video from "../../images/Dummy.mp4";
import Player from "../../components/Player/Player";
import AboutCompanyBox from "./AboutCompanyBox";
import commuincate from "../../images/commuincate.png";
import quality from "../../images/quality.png";
import pro from "../../images/pro.png";
import Footer from "../../components/Footer/Footer";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const AboutCompany = () => {
  const { t , i18n} = useTranslation()

  const boxes = [
    {
      title: t("Trusted Scientific Content"),
      image: commuincate,
      description:
        t("Courses are built on solid academic foundations, supervised by top experts in cosmetic chemistry and applied formulation"),
    },
    {
      title: t("Hands-on Practical Training"),
      image: quality,
      description:
        t("Learn real formulation techniques through practical sessions inside actual laboratories and production facilities"),
    },
    {
      title: t("Continuous Post-Course Support"),
      image: pro,
      description:
        t("We stay with you even after the course ends — offering ongoing mentorship and consultancy for your own projects"),
    },
  ];

  const [active, setActive] = useState("vision");
  const [play, setPlay] = useState(false);

  // refs for gsap
  const imageRef = useRef();
  const headingRef = useRef();
  const underlineRef = useRef();
  const boxesRef = useRef([]);

  useGSAP(() => {
    gsap.from(imageRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 90%",
      },
    });

    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 90%",
      },
    });

    gsap.from(underlineRef.current, {
      scaleX: 0,
      opacity: 0,
      transformOrigin: "left",
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: underlineRef.current,
        start: "top 90%",
      },
    });

    gsap.from(boxesRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: boxesRef.current[0],
        start: "top 95%",
      },
    });
  }, []);

  return (
    <>
      <div className="mx-auto px-8 container overflow-hidden">
        <div className="mt-7 flex justify-between gap-20  md:flex-row flex-col-reverse ">
          {play && <Player url={video} setPlay={setPlay} />}
          <div className="w-full md:w-[50%] md:mt-0 mt-9">
            <p
              style={{ letterSpacing: "2px" }}
              className="text-[1.1rem] text-text2 uppercase"
            >
              {t("CEO's Message - Dr. Mohammed Odeh")}
            </p>
            <h4 className="text-[0.9rem] md:text-[1.1rem] mt-3 text-main font-bold md:w-[90%]">
              {t("In a world that’s constantly evolving, true knowledge remains the power that creates real impact.That’s why Joba Natural Hub Academy was founded — to be the gateway where science meets application in the beauty industry.")}
            </h4>
            <p className="text-text2 text-[1.2rem] mt-3">
            {t("From the very first day of founding Joba Natural Hub, our vision was clear: to redefine education in the world of cosmetics manufacturing. Over the years, I have met countless people filled with passion for this field, yet lacking structured scientific knowledge and true practical experience. That’s why we created Joba Academy — a platform that bridges precise academic science with extensive industrial practice, empowering learners to transform their passion into a professional career. At Joba, we believe that beauty is never accidental; it is crafted through science, creativity, and an unwavering commitment to quality.Our vision is to become the leading Arabic reference for education and manufacturing in the cosmetics industry, built on solid scientific foundations that meet global standards.")}
            </p>
            <div>
              <div className="flex items-center mt-5">
                <button
                  onClick={() => setActive("vision")}
                  className={`flex-1 text-textColor text-[1.1rem bg-[#d5d5d5] p-4 ${
                    active === "vision" && "!bg-main text-white"
                  }`}
                >
                  {t("Our vision")}
                </button>
                <button
                  onClick={() => setActive("mission")}
                  className={`flex-1 text-textColor text-[1.1rem bg-[#d5d5d5] p-4 ${
                    active === "mission" && "!bg-main text-white"
                  }`}
                >
                  {t("Our mission")}
                </button>
              </div>
              {active === "vision" ? (
                <div className="flex items-center md:flex-row flex-col gap-5 px-5 py-8 bg-[#F4F1F0]">
                  <div className="w-full md:w-[190px] h-[143px] shrink-0 rounded overflow-hidden">
                    <img
                      src={require("../../images/course.png")}
                      className="w-full h-full object-cover"
                      alt="course"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-base text-textColor font-medium">
                  {t("We teach you how to create beauty through science, and empower you to achieve success through mastery.")}
                  </p>
                </div>
              ) : (
                <div className="flex items-center md:flex-row flex-col gap-5 px-5 py-8 bg-[#F4F1F0]">
                  <div className="w-full md:w-[190px] h-[143px] shrink-0 rounded overflow-hidden">
                    <img
                      src={require("../../images/course-details.png")}
                      className="w-full h-full object-cover"
                      alt="course"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-base text-textColor font-medium">
                {t("At Joba Academy, our mission is to empower individuals to transform their passion for cosmetics into a professional career built on science and hands-on expertise. We strive to deliver comprehensive education that combines precise academic knowledge with real industrial practice — nurturing a new generation of professionals capable of innovation, excellence, and global-standard production.")}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div
            onClick={() => setPlay((prev) => !prev)}
            className="shrink-0 cursor-pointer"
            ref={imageRef}
          >
            <img
              src={require("../../images/aboutCompany.png")}
              alt="joba"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex flex-col justify-center items-center">
            <h3
              ref={headingRef}
              className="text-[2rem] text-textColor font-bold"
            >
              {t("Our Value")}
            </h3>
            <img
              ref={underlineRef}
              src={require("../../images/underline.png")}
              loading="lazy"
              alt="underline"
            />
          </div>
        </div>

        <div className="flex justify-center pb-8 md:flex-row flex-col items-center gap-5 mt-8">
          {boxes.map((data, index) => (
            <div
              key={index}
              ref={(el) => (boxesRef.current[index] = el)}
            >
              <AboutCompanyBox
                image={data.image}
                title={data.title}
                description={data.description}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutCompany;
