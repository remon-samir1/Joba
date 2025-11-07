import React, { useRef } from "react";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import image from "../../../images/Hero.svg";
import "./Hero.css";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const bgRef = useRef(null);
  const arrowRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(bgRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 1.2,
      ease: "power2.out",
    })
      .from(
        headingRef.current,
        { opacity: 0, y: 50, duration: 1, ease: "power3.out" },
        "-=1"
      )
      .from(
        paragraphRef.current,
        { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .from(
        buttonRef.current,
        { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.4"
      )
      .from(
        imageRef.current,
        { opacity: 0, x: 100, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .from(
        arrowRef.current,
        { opacity: 0, x: -50, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      );
  }, []);

  return (
    <div className="Hero" ref={heroRef}>
      <div className="data px-4 md:px-12 mx-auto" ref={bgRef}>
        <div className="content" ref={contentRef}>
          <h2 ref={headingRef}>
            {t("Joba Academy")} <br />{" "}
            <span>
              {t("— Where Science Meets Practice in the World of Beauty.")}
            </span>
          </h2>
          <p ref={paragraphRef}>
            {t(
              "At Joba Natural Hub Academy, we offer a comprehensive learning experience that bridges precise academic knowledge with real-world practical expertise. Through carefully designed online courses, you’ll master the art and science of cosmetics formulation — from selecting raw materials to developing finished, market-ready products — under the supervision of leading experts in the industry."
            )}
          </p>
          <div className="img" ref={imageRef}>
            <img src={require("../../../images/Hero.webp")} alt="image" />
          </div>
          <div className="details">
            <Link to="/About" className="link" ref={buttonRef}>
              <span>{t("Learn more")}</span>
              <MdOutlineKeyboardDoubleArrowRight className="icon" />
            </Link>
            <img
              src={require("../../../images/heroArrow.png")}
              alt=""
              ref={arrowRef}
            />
          </div>
        </div>
        <div className="img" ref={imageRef}>
          <img src={require("../../../images/Hero.webp")} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
