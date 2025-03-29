import "./WhatweOffer.css";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WhatweOfferBox from "./WhatweOfferBox";

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

  const data = [
    { header: "Online courses", image: "send-icon.png", desk: "Lorem ipsum dolor sit amet consectetur. Aenean tristique pretium id aliquet." },
    { header: "Expert trainer", image: "expert-icon.png", desk: "Lorem ipsum dolor sit amet consectetur. Aenean tristique pretium id aliquet." },
    { header: "Get certificate", image: "certificate-icon.png", desk: "Lorem ipsum dolor sit amet consectetur. Aenean tristique pretium id aliquet." },
    { header: "Life time access", image: "time-icon.png", desk: "Lorem ipsum dolor sit amet consectetur. Aenean tristique pretium id aliquet." },
  ];

  return (
    <div className="WhatweOffer">
      <div className="header" ref={headerRef}>
        <p>What we offer</p>
        <p>For your future learning</p>
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
