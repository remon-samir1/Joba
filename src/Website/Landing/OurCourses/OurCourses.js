import "./OurCourses.css";
import React, { useEffect, useRef } from "react";
import OurCoursesCard from "./OurCoursesCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import SkeletonShow from "../../../components/Skeleton/Skeleton";

gsap.registerPlugin(ScrollTrigger);

const OurCourses = () => {
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const cardsRef = useRef([]);
  const [skeleton , setSkeleton] = useState(false)
  const [filter , setFilter] = useState([])

  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -50,
      ease: "power3.out",
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(filtersRef.current.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: filtersRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  useEffect(() => {
setSkeleton(true);
    Axios.get("/fetch-courses").then((data) => {
      setSkeleton(false);
      const courseData = data.data.items.courses.data.slice(-3);
      setCourses(courseData);
     setFilter(courseData)
      setCategory(data.data.items.courses.data);
      console.log(data.data.items.courses.data);
  
    });
  }, []);
useEffect(()=>{

  if(categoryId === ''){

    setFilter(courses);
  }else{
    setFilter(courses.filter(data=> data.category.id === categoryId))
  }
},[categoryId])
  return (
    <div ref={containerRef} className="OurCourses container mx-auto">
      <div ref={headerRef} className="header">
        <div className="texts">
          <p>welcome to our property</p>
          <h4>
            Our <span>featured</span> courses
          </h4>
        </div>
        <div className="img">
          <img
            src={require("../../../images/our-courses-arrow.png")}
            alt="courses"
            loading="lazy"
          />
        </div>
        <div ref={filtersRef} className="filters">
          <button className={`${categoryId === '' && '!text-main'}`} onClick={() => setCategoryId("")}>All Courses</button>

          {(() => {
            const seenCategories = new Set();

            return courses
              ?.filter((courses) => {
                const categoryId = courses.category.id;
                if (seenCategories.has(categoryId)) {
                  return false;
                } else {
                  seenCategories.add(categoryId);
                  return true;
                }
              })
              .map((course, index) => (
                <button
                className={`${categoryId === course.category.id && '!text-main'}`}
                  onClick={() => setCategoryId(course.category.id)}
                  key={index}
                >
                  {course.category.name}
                </button>
              ));
          })()}
        </div>
      </div>
      <div className="boxes flex-col md:flex-row flex justify-center items-center gap-6 px-3 ">
        {skeleton ? 
        <SkeletonShow length={3} height='300px' width='350px' classes='w-full md:w-[400px] h-[350px]'/>
        :
        filter?.map((course, index) => (
          <OurCoursesCard
            thumbnail={course.thumbnail}
            title={course.title}
            slug={course.slug}
            duration={course.duration}
            students={course.enrollments.length}
            lessons={course.lessons.length}
            is_favorite={course.is_favorite}
            reviews={course.reviews.length}
            instructor_image={course.instructor.image}
            instructor_name={course.instructor.user_name}
            price={ course.price}
            key={index}
            forwardRef={(el) => (cardsRef.current[index] = el)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center pr-7 mt-4">
        <img src={require("../../../images/img1.png")} loading="lazy" />
        <img src={require("../../../images/img2.png")} loading="lazy" />
      </div>
    </div>
  );
};

export default OurCourses;


