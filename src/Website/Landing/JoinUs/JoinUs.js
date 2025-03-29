// import './JoinUs.css'
// import React from 'react';
// import JoinUsCard from './JoinUsCard';

// const JoinUs = () => {
//   return (
//     <div className='JoinUs'>
//         <div className="texts">
//         <div  className="header">
//           <h5>Join with us</h5>
//           <img
//             src={require("../../../images/orangeArrow.png")}
//             alt=">>"
//             loading="lazy"
//           />
//         </div>
//         <p>Which one is suitable for you?</p>
//       </div>
//     <div className="boxes mt-20 flex justify-center items-center gap-10">
//       <JoinUsCard title='learn' image="learn.png"/>
//       <JoinUsCard title='teach' image="teach.png"/>
//     </div>
//     </div>
//   );
// }

// export default JoinUs;

import './JoinUs.css';
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import JoinUsCard from './JoinUsCard';

gsap.registerPlugin(ScrollTrigger);

const JoinUs = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0,
      y: 50,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className='JoinUs'>
      <div className="texts">
        <div className="header">
          <h5>Join with us</h5>
          <img
            src={require("../../../images/orangeArrow.png")}
            alt=">>"
            loading="lazy"
          />
        </div>
        <p>Which one is suitable for you?</p>
      </div>
      <div className="boxes flex justify-center items-center gap-10">
        <JoinUsCard title='learn' image="learn.png"/>
        <JoinUsCard title='teach' image="teach.png"/>
      </div>
    </div>
  );
}

export default JoinUs;
