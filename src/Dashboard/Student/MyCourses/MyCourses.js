import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import MyCoursesCard from "./MyCoursesCard";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { useState } from "react";
import SkeletonShow from "../../../components/Skeleton/Skeleton";

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  useEffect(() => {
    setSkeleton(true);

    Axios.get("/student/enrolled-courses").then((data) => {
      setSkeleton(false);
      setCourses(data.data.enrolls);
    });
  }, []);
  return (
    <div className="pb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-base text-textColor">My Courses</h3>
        <Breadcrumbs />
      </div>
      {
        skeleton ? 
        <SkeletonShow height='250px' classes='mt-4' width='100%' length='3'/>

        :
      
      
      courses.map((course, index) => (
        <MyCoursesCard
          key={index}
          image={course?.course.thumbnail}
          id={course?.course.id}
          slug={course?.course.slug}
          title={course?.course.title}
          category={course?.course.category.name}
          duration={course?.course.duration}
          completed={course?.completed}
        />
      ))}
    </div>
  );
};

export default MyCourses;
