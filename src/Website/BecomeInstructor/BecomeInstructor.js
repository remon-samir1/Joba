import React, { useEffect, useRef } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const BecomeInstructor = () => {
  const scrollRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();

  useGSAP(() => {
    scrollRef.current.scrollIntoView({ behavior: 'smooth' });

    gsap.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 90%",
      }
    });

    gsap.from(contentRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 90%",
      }
    });

  });

  return (
    <div ref={scrollRef}>
      <NavBar />
      <div className="flex items-start container mx-auto py-[5vh] md:flex-row flex-col gap-8 md:gap-32 justify-between">

        <div className="md:w-[50vw] w-full" ref={imageRef}>
          <img
            className='md:min-h-[400px] w-full md:min-w-[400px]'
            src={require('../../images/instructor-image.png')}
            alt="instructor"
            loading='lazy'
          />
        </div>

        <div className='mx-3' ref={contentRef}>
          <h3 className='text-[1.2rem] text-textColor font-semibold'>Become an instructor</h3>
          <p className='text-base mt-4 text-textColor'>
            Lorem ipsum dolor sit amet consectetur. Odio tortor orci ullamcorper feugiat in fermentum quam mauris. Eget mauris nisl risus lacus.
          </p>
          <form className='border py-4 px-3 rounded mt-8'>
            <div className="flex items-center gap-4">
              <input type="text" placeholder='Name' className='text-textColor bg-transparent rounded border outline-none p-3 mt-4 flex-1' />
              <input type="email" placeholder='Email' className='text-textColor bg-transparent rounded border outline-none p-3 mt-4 flex-1' />
            </div>
            <input type="number" placeholder='Phone' className='text-textColor bg-transparent rounded border outline-none p-3 mt-4 w-full' />
            <textarea placeholder='Your message' className='text-textColor bg-transparent rounded border outline-none p-3 w-full mt-4 h-14' />
            <button className='w-full bg-main text-white p-3 text-center rounded-3xl mt-4 main-shadow duration-300' type="submit">
              Send Request
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeInstructor;
