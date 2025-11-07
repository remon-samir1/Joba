

import './JoinUs.css';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import JoinUsCard from './JoinUsCard';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

const JoinUs = () => {
  const sectionRef = useRef(null);
  const { t , i18n} = useTranslation()

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 95%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className='JoinUs'>
      <div className="texts">
        <div className="header">
          <h5>{t("Join with us")}</h5>
          <img
            src={require("../../../images/orangeArrow.png")}
            alt=">>"
            loading="lazy"
          />
        </div>
        <p>{t("Which one is suitable for you?")}</p>
      </div>
      <div className="boxes flex justify-center items-center gap-10 flex-wrap">
        <JoinUsCard title='learn' image="learn.png" link='/login'/>
        <JoinUsCard title='teach' image="teach.png" link='/BecomeInstructor'/>
      </div>
    </div>
  );
}

export default JoinUs;
