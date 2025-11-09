
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const JoinUsCard = ({ title, image , link }) => {
  const { t, i18n } = useTranslation();

  const cardRef = useRef(null);
  const contentRef = useRef(null);
  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
    
    gsap.from(contentRef.current, {
      opacity: 0,
      x: -30,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });


  }, []);

  return (
    <div ref={cardRef} className='JoinUsCard'>
      <div ref={contentRef} className="content">
        <h4>{t("Do you want to")} <span>{title}</span> {t("here?")}</h4>
        {/* <p className="desk capitalize">
      Be one from juba academy team 
        </p> */}
        <Link to={link} className='link'>{t("Join now")}</Link>
      </div>
      <div ref={imgRef} className="img">
        <img src={require(`../../../images/${image}`)} alt="learn" loading='lazy' />
      </div>
    </div>
  );
}

export default JoinUsCard;
