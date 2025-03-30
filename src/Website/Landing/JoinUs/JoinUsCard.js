// import React from 'react';
// import { Link } from 'react-router-dom';

// const JoinUsCard = ({title , image}) => {
//   return (
//     <div className='JoinUsCard'>
//       <div className="content">
//        <h4>Do you want to <span> {title}</span> here?</h4>
//        <p className="desk">
//        Lorem ipsum dolor sit amet consectetur.
//        </p>
//        <Link className='link'>Join now</Link>
//       </div>
//       <div className="img">
//         <img src={require(`../../../images/${image}`)} alt="learn" loading='lazy' />
//       </div>
//     </div>
//   );
// }

// export default JoinUsCard;

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JoinUsCard = ({ title, image }) => {
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
        <h4>Do you want to <span>{title}</span> here?</h4>
        <p className="desk">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <Link className='link'>Join now</Link>
      </div>
      <div ref={imgRef} className="img">
        <img src={require(`../../../images/${image}`)} alt="learn" loading='lazy' />
      </div>
    </div>
  );
}

export default JoinUsCard;
