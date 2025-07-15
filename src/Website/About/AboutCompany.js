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

gsap.registerPlugin(ScrollTrigger);

const AboutCompany = () => {
  const boxes = [
    {
      title: "Commitment and credibility",
      image: commuincate,
      description:
        "We are fully committed to the best performance standards, and the formation of long-term relationships with success partners.",
    },
    {
      title: "The quality",
      image: quality,
      description:
        "We are fully committed to the best performance standards, and the formation of long-term relationships with success partners.",
    },
    {
      title: "Professionalism ",
      image: pro,
      description:
        "We are fully committed to the best performance standards, and the formation of long-term relationships with success partners.",
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
        <div className="mt-7 flex justify-between md:flex-row flex-col-reverse ">
          {play && <Player url={video} setPlay={setPlay} />}
          <div className="w-full md:w-[50%] md:mt-0 mt-9">
            <p
              style={{ letterSpacing: "2px" }}
              className="text-[1.1rem] text-text2 uppercase"
            >
              About our company
            </p>
            <h4 className="text-[1.3rem] md:text-[2rem] mt-3 text-main font-bold md:w-[90%]">
              Lorem ipsum dolor sit amet consectetur. Viverra malesuada id urna
            </h4>
            <p className="text-text2 text-[1.2rem] mt-3">
              Lorem ipsum dolor sit amet consectetur. Velit sed vitae velit
              malesuada neque lectus ultrices tincidunt.
            </p>
            <div>
              <div className="flex items-center mt-5">
                <button
                  onClick={() => setActive("vision")}
                  className={`flex-1 text-textColor text-[1.1rem bg-[#d5d5d5] p-4 ${
                    active === "vision" && "!bg-main text-white"
                  }`}
                >
                  Our vision
                </button>
                <button
                  onClick={() => setActive("mission")}
                  className={`flex-1 text-textColor text-[1.1rem bg-[#d5d5d5] p-4 ${
                    active === "mission" && "!bg-main text-white"
                  }`}
                >
                  Our mission
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
                    Lorem ipsum dolor sit amet consectetur. Cras mattis purus
                    quisque egestas. Enim lectus ridiculus parturient blandit
                    consequat amet arcu ante.
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
                    mission dolor sit amet consectetur. Cras mattis purus quisque
                    egestas. Enim lectus ridiculus parturient blandit consequat
                    amet arcu ante.
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
              Our Value
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
