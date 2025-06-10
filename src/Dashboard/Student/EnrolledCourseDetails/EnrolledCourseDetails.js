import { Icon } from "@iconify-icon/react";
import React from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import CourseDetailsOverview from "../CourseDetails/CourseDetailsOverview";
import CourseContactDetails from "./CourseContactDetails";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import QA from "./QA";
import Annoucement from "./Annoucement";
import EnroledCourseReviews from "./EnroledCourseReviews";

const EnrolledCourseDetails = () => {
  const [tabs, setTabs] = useState("overview");
  const nav = useNavigate();
  return (
    <div className="my-5">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-textColor gap-2 text-[1.1rem]"
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
        <Breadcrumbs />
      </div>
      <div className="flex mt-5 items-start gap-5 flex-col md:flex-row">
        {/*  center  */}
        <div className="flex-1 pb-12 bg-white rounded-xl">
          <div className="w-full h-[18.5rem] relative rounded-xl overflow-hidden">
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.25))",
                boxShadow:
                  " inset 0 1px 0 rgba(255, 255, 255, 3), 0 8px 24px rgba(000, 0000, 0000, 0.2) ",
              }}
              className="flex justify-center cursor-pointer items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px] h-[100px] rounded-full  backdrop-blur-xl bg-opacity-50 backdrop-saturate-150 "
            >
              <Icon
                icon="fe:play"
                width="50px"
                className="text-white"
                height="50px"
              />
            </div>
            <img
              src={require("../../../images/course-details.png")}
              alt="course"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white border-b border-[#dddd]  py-4">
            <h3 className="text-textColor px-3 text-[1.3rem] ">
              How to make your own brand from zero
            </h3>
            <div className="flex px-3 py-4 items-center justify-between gap-20 md:gap-0 md:justify-between overflow-scroll md:w-auto scrollbar-hide her  w-[90vw]">
              <div className="flex items-center gap-3">
                <img
                  src={require("../../../images/course.png")}
                  className="w-[45px] h-[45px] rounded-full"
                  alt="instarctor"
                />
                <span className="text-textColor text-base">Brenda Howe</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon
                  icon="material-symbols:date-range-outline-rounded"
                  width="24"
                  height="24"
                  className="text-main"
                />
                <span className="text-textColor text-base">3/5/2025</span>
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

                <span className="text-textColor text-base">4.8 Reviews</span>
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
              onClick={() => setTabs("QA")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "QA" && "!text-white !bg-main"
              }`}
            >
              Q&A
            </button>
            <button
              onClick={() => setTabs("Annoucement")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "Annoucement" && "!text-white !bg-main"
              }`}
            >
              Annoucement
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
            <CourseDetailsOverview />
          ) : tabs === "QA" ? (
            <QA />
          ) : tabs === "reviews" ? (
            <EnroledCourseReviews />
          ) : (
            tabs === "Annoucement" && <Annoucement />
          )} 
        </div>
        {/* Right Side  */}
        <CourseContactDetails />
      </div>
    </div>
  );
};

export default EnrolledCourseDetails;
