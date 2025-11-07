import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutUs.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const aboutRef = useRef(null);
  const { t, i18n } = useTranslation();

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
            <h4>{t("about us")}</h4>
            <img
              src={require("../../../images/orangeArrow.png")}
              alt=">>>"
              loading="lazy"
            />
          </div>
          <p className="title">
            {t("From Science to Application… From Passion to Mastery")}
          </p>
          <p className="description">
            <p>
              {t(
                "Joba Natural Hub Academy was founded as the educational and scientific branch of Joba Natural for Cosmetics, serving as a trusted Arabic reference in professional cosmetics formulation training. We believe that true beauty starts with scientific understanding. That’s why our programs combine solid academic foundations with real industrial experience, bridging theory and practice seamlessly. At Joba Academy, we offer comprehensive online courses covering every aspect of cosmetics manufacturing — supervised by Dr.Mohamed Ouda, expert in applied industry practice, and Dr.Mohamed Salah, specialist in academic cosmetic chemistry. Our mission is to empower you to turn your passion into a profession and your profession into sustainable success built on science, quality, and mastery."
              )}
            </p>
          </p>
        </div>
        <div className="flexiable">
          <img
            src={i18n.language === 'ar' ? require("../../../images/FlexabileClasses-ar.png") : require("../../../images/FlexabileClasses.png")}
            alt="juba"
            loading="lazy"
          />
          <span>
            {t(
              "At Joba Academy, we are more than just an educational platform — we are your dedicated partner on the journey to mastering the art and science of cosmetics manufacturing.We provide an integrated blend of knowledge, practical application, and continuous support, along with real industry opportunities that empower you to start with confidence and achieve excellence in your field."
            )}
          </span>
        </div>
        <div className="details">
          {[
            t("Trusted Scientific Content"),
            t("Hands-on Practical Training"),
            t("Continuous Post-Course Support"),
            t("Real Industry Opportunities"),
          ].map((data, index) => (
            <div className="detail" key={index}>
              <img
                src={require("../../../images/checkd.png")}
                alt="check"
                loading="lazy"
              />
              <span>{data}</span>
            </div>
          ))}
        </div>
        <div className="img responsive">
          <img
            src={require("../../../images/AbouUs.png")}
            alt="about-us"
            loading="lazy"
          />
        </div>
        <Link to='/about' className="link">
          <span>{t("Discover more")}</span>
          <MdOutlineKeyboardDoubleArrowRight className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
