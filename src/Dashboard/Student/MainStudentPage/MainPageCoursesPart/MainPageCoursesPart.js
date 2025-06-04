import { Icon } from "@iconify-icon/react";
import React from "react";
import { Link } from "react-router-dom";

const MainPageCoursesPart = () => {
  return (
    <div className="MainPageCoursesPart mt-8 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center  gap-6">
          <p className="text-[1.2rem] text-textColor">Continue learning</p>
          <button className="bg-[#F6F8FC] text-text2 px-5 py-3 rounded-lg text-[1rem] border border-[#F6F8FC] hover:border-main hover:text-main duration-500">
            All Courses
          </button>
          <button className="bg-[#F6F8FC] text-text2 px-5 py-3 rounded-lg text-[1rem] border border-[#F6F8FC] hover:border-main hover:text-main duration-500">
            Design
          </button>
          <button className="bg-[#F6F8FC] text-text2 px-5 py-3 rounded-lg text-[1rem] border border-[#F6F8FC] hover:border-main hover:text-main duration-500">
            Development
          </button>
          <button className="bg-[#F6F8FC] text-text2 px-5 py-3 rounded-lg text-[1rem] border border-[#F6F8FC] hover:border-main hover:text-main duration-500">
            Digital Marketing
          </button>
        </div>
        <Link className="text-main text-[1.05rem] flex items-center gap-2 pr-4">
          See all courses
          <Icon
            className="text-main"
            icon="mingcute:arrow-right-line"
            width="24"
            height="24"
          />
        </Link>
      </div>
      <div className="courses mt-5 flex items-center gap-8">
        {
          Array.from({length:3}).map((_,index)=>(

            <div className="course-card group relative flex-1 transition-transform duration-500 ">
            <div className="img w-full h-[155px] rounded-xl overflow-hidden relative">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={require("../../../../images/course.png")}
                alt="course"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-main text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold shadow-md">
                  Watch Now
                </button>
              </div>
            </div>
            <div className="content mt-4">
              <div className="flex items-center justify-between">
                <div className="text">
                  <h3 className="text-[1rem] text-textColor font-bold transition-all duration-300 ">Google Adsense for newbie</h3>
                  <p className="text-[12px] text-text2 mt-3 transition-all duration-300 ">Digital Marketing</p>
                </div>
                <Icon
                  className="text-main"
                  icon="uil:play-circle"
                  width="32"
                  height="32"
                />
              </div>
              <div className="flex mt-3 items-center gap-2">
                <div className="percent flex-1 h-[7px] rounded-2xl relative overflow-hidden bg-[#DBDBDB]">
                  <span className="absolute left-0 h-full bg-main w-[30%]"></span>
                </div>
                <span className="text-main text-[13px]">68%</span>
              </div>
            </div>
          </div>
          
          ))
        }
    
      </div>
    </div>
  );
};

export default MainPageCoursesPart;
