
import React, { useRef } from "react";
import "./LatestBlogs.css";
import LatestBlogsCard from "./LatestBlogsCard";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";

gsap.registerPlugin(ScrollTrigger);

const LatestBlogs = () => {
  const [blogs , setBlogs] = useState([]);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const boxesRef = useRef(null);
  const linkRef = useRef(null);
useEffect(()=>{
  Axios.get('/blog').then((data)=> {
    // setBlogs(data.data.data.blogs.data)
    console.log(data.data.blogs.data)
  })
},[])
  useGSAP(() => {
    gsap.from([textRef.current, boxesRef.current, linkRef.current], {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={sectionRef} className="LatestBlogs">
      <div ref={textRef} className="texts">
        <p>Latest blogs & news</p>
      </div>
      <div ref={boxesRef} className="boxes flex-wrap flex justify-center items-center gap-10 mt-24">
        <LatestBlogsCard />
        <LatestBlogsCard />
        <LatestBlogsCard />
      </div>
      <div ref={linkRef} className="flex justify-center items-center w-full mt-10">
        <Link className="link">All blogs</Link>
      </div>
    </div>
  );
};

export default LatestBlogs;
