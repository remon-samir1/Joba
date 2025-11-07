
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
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const LatestBlogs = () => {
  const { t , i18n} = useTranslation()
  
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const boxesRef = useRef(null);
  const linkRef = useRef(null);
  const [blogs , setBlogs] = useState([]);
useEffect(()=>{
  Axios.get('/blog').then((data)=> {
    setBlogs(data.data.blogs.data.slice(0,3))
    // console.log(data.data.blogs.data.slice(0 , 1))

  })
},[])
console.log(blogs);
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
        <p>{t("Latest blogs & news")}</p>
      </div>
      <div ref={boxesRef} className="boxes flex-wrap flex justify-center items-center gap-10 mt-24">
      
      {
        blogs?.map((data , index)=>(
          <LatestBlogsCard 
          key={index}
          title={data.title}
          date={data.created_at}
          description={data.description}
          image={data.image}
          slug={data.slug}
          
          />

        ))
      }
    
      </div>
      <div ref={linkRef} className="flex justify-center items-center w-full mt-10">
        <Link to='/blogs' className="link">{t("All blogs")}</Link>
      </div>
    </div>
  );
};

export default LatestBlogs;
