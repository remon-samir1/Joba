import React, { useRef, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { Axios } from "../../components/Helpers/Axios";

gsap.registerPlugin(ScrollTrigger);

const Blogs = () => {


  const scrollRef = useRef(null);
  const cardsRef = useRef([]);
  const sideBlogRef = useRef([]);
  const pageRef = useRef(null);

  useGSAP(() => {
    // Scroll to top
    scrollRef.current.scrollIntoView();

    // Page fade-in on load
    gsap.from(pageRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Main blog cards animation
    gsap.from(cardsRef.current, {
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: "top 85%",
      },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    });

    // Sidebar blog cards animation
    gsap.from(sideBlogRef.current, {
      scrollTrigger: {
        trigger: sideBlogRef.current[0],
        start: "top 85%",
      },
      opacity: 0,
      x: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: "power2.out",
    });

    // Header text animation
    gsap.from(".blog h3, .blog p", {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power2.out",
      delay: 0.2,
    });
  });

  return (
    <div ref={scrollRef}>
      <div ref={pageRef}>
        <NavBar />
        <div className="h-[50vh] blog bg-cover bg-center flex-col md:flex-row flex justify-center md:justify-between items-center px-[5vw]">
          <h3 className="text-white text-[1.9rem] w-full md:max-w-[400px] font-semibold md:text-left text-center">
            Blogs & News
          </h3>
          <p className="text-base text-white md:text-left text-center mt-4 md:mt-0">
            Home  <span className="text-main"> Blogs & News</span>
          </p>
        </div>

        <div className="flex py-5 px-8 gap-5 flex-col md:flex-row">
          <div className="flex-1 flex items-center gap-10 flex-wrap">
            {Array.from({ length: 8 }).map((_, index) => (
              <Link
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="max-w-[26rem] mt-4 min-w-[20rem]"
              >
                <div className="w-full h-[15rem] md:h-[18rem] rounded overflow-hidden">
                  <img
                    src={require("../../images/course.png")}
                    alt="blog"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-[1.2rem] text-textColor font-semibold mt-4">
                  Education technology & mobile learning
                </h3>
                <p className="text-[1.1rem] text-text2 mt-4">
                  Lorem ipsum dolor sit amet consectetur ullamcorper
                </p>
                <p className="text-[1.1rem] text-text2 font-semibold mt-4">
                  Lillian Purdy / Aug 28, 2024
                </p>
              </Link>
            ))}
          </div>

          <div className="md:w-[370px] w-full">
            <div className="border border-[#ddd] pb-5 px-4 mt-4 rounded">
              {Array.from({ length: 4 }).map((_, index) => (
                <Link
                  key={index}
                  ref={(el) => (sideBlogRef.current[index] = el)}
                >
                  <div className="flex items-start gap-3 mt-5">
                    <div className="w-[8rem] h-[6.5rem] shrink-0 rounded overflow-hidden">
                      <img
                        src={require("../../images/Blogs.png")}
                        alt="blog"
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-base text-textColor font-semibold">
                        Electric technology & realstick learning
                      </h3>
                      <p className="mt-4 text-sm font-semibold text-main">
                        Creative - Jul 22 , 2025
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-text2 text-[1.1rem]">
                    Lorem ipsum dolor sit amet consectetur. Orci id sed est
                    maecenas molestie sagittis.
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
