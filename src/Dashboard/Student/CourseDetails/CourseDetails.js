import { Icon } from "@iconify-icon/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideDetails from "./SideDetails";
import CourseDetailsOverview from "./CourseDetailsOverview";
import CoursesList from "./Curriculum";
import Curriculum from "./Curriculum";
import CourseDetailsReviews from "./CourseDetailsReviews";
import CourseDetailsInstructor from "./CourseDetailsInstructor";
import { useState } from "react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import TransformDate from "../../../components/Helpers/TransformDate";

const CourseDetails = () => {
  const [course , setCourse] = useState([])
  const {id} = useParams()
  console.log(id);
useEffect(()=>{
  Axios.get(`/course/${id}`).then(data=>{
    setCourse(data.data.course)
    console.log(data.data.course)})
},[])





  const [tabs, setTabs] = useState("overview");
  const nav = useNavigate();
  return (
    <div className="my-5">
      <button
        className="flex items-center text-textColor  gap-2 text-[1.1rem]"
        onClick={() => nav(-1)}
      >
        <Icon
          className="text-textColor rotate-180"
          icon="mingcute:arrow-right-line"
          width="24"
          height="24"
        />
        Back
      </button>

      <div className="flex mt-5  items-start gap-5 md:flex-row flex-col">
        {/*  center  */}
        <div className="flex-1 w-full  pb-12 bg-white rounded-xl">
          <div className="w-full h-[18.5rem] rounded-xl overflow-hidden">
            <img
            src={`https://goba.sunmedagency.com${course?.thumbnail}`}
              alt="course"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white border-b border-[#dddd]  py-4">
            <h3 className="text-textColor px-3 text-[1.3rem] ">
            {course?.title}
            </h3>
            <div className="flex px-3 py-4 items-center gap-20 md:gap-0 md:justify-between overflow-scroll md:w-auto scrollbar-hide her  w-[90vw]">
              <div className="flex items-center gap-3">
                <img
                  src={`https://goba.sunmedagency.com/${course.instructor?.image}`}
                  className="w-[45px] h-[45px] rounded-full"
                  alt="instarctor"
                />
                <span className="text-textColor text-base">{course.instructor?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon
                  icon="material-symbols:date-range-outline-rounded"
                  width="24"
                  height="24"
                  className="text-main"
                />
                <span className="text-textColor text-base">{TransformDate(course?.created_at)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon
                  icon="ph:student-fill"
                  width="24"
                  height="24"
                  className="text-main"
                />

                <span className="text-textColor text-base">12 Student</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon
                  icon="mynaui:star-solid"
                  width="24"
                  height="24"
                  className="text-[#F0AB4C]"
                />

                <span className="text-textColor text-base">{course?.reviews_count} Reviews</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-10 py-6 px-2 bg-white scrollbar-hide overflow-scroll md:w-auto md:overflow-hidden w-[90vw]">
            <button
              onClick={() => setTabs("overview")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "overview" && "!text-white !bg-main"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setTabs("curriculum")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "curriculum" && "!text-white !bg-main"
              }`}
            >
              Curriculum
            </button>
            <button
              onClick={() => setTabs("instructor")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "instructor" && "!text-white !bg-main"
              }`}
            >
              Instructors
            </button>
            <button
              onClick={() => setTabs("reviews")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "reviews" && "!text-white !bg-main"
              }`}
            >
              Reviews
            </button>
          </div>

          {tabs === "overview" ? (
            <CourseDetailsOverview data={course?.description} />
          ) : tabs === "curriculum" ? (
            <Curriculum  data={course?.chapters}/>
          ) : tabs === "reviews" ? (
            <CourseDetailsReviews />
          ) : (
            tabs === "instructor" && <CourseDetailsInstructor image={course?.instructor.image} name={course?.instructor.name} />
          )}
        
        </div>
        {/* Right Side  */}
        <SideDetails price={course?.price} duration={course?.duration} certificate={course?.certificate} id={course?.id}/>
      </div>
    </div>
  );
};

export default CourseDetails;

