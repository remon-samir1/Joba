import { Icon } from "@iconify-icon/react";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ExploreCourses = () => {
  const [fav, setFav] = useState(false);

  return (
    <div>
      <div className="flex justify-end items-center gap-4 pr-3">
        <button className="flex items-center gap-2 px-4 rounded py-2 bg-white">
          <Icon
            className="text-text2"
            icon="solar:chart-bold"
            width="24"
            height="24"
          />
          <span className="text-[1rem] text-text2">Level</span>
        </button>
        <button className="flex items-center gap-2 px-4 rounded py-2 bg-white">
          <Icon
            className="text-text2"
            icon="mage:filter-fill"
            width="24"
            height="24"
          />
          <span className="text-[1rem] text-text2">Filter</span>
        </button>
      </div>
      <div className="flex items-center justify-center md:justify-start mt-4 gap-4 flex-wrap">
      {Array.from({length:3}).map((_,index)=>(
      <div
      key={index}
      className="p-3 min-w-80 max-w-[340px] flex-1 bg-white rounded-xl mt-3 group transition-transform duration-500"
    >
      <div className="img h-[165px] w-full relative rounded overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={require("../../../images/course.png")}
          alt="course"
        />
    
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link to='/student/course-details' className="bg-main text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold shadow-md">
            Watch Now
          </Link>
        </div>
    
        <div
          onClick={() => setFav((prev) => !prev)}
          className="cursor-pointer w-[35px] h-[35px] flex justify-center items-center rounded-full backdrop-brightness-90 backdrop-blur-0 absolute top-2 right-2 bg-[rgba(255,255,255,0.6)]"
        >
          <Icon
            className="text-white"
            icon={
              fav
                ? "material-symbols-light:favorite"
                : "material-symbols-light:favorite-outline"
            }
            width="24"
            height="24"
          />
        </div>
      </div>
    
      <div className="mt-3">
        <h3 className="text-[1.1rem] text-textColor transition-all duration-300">
          Cosmetics course for beginner
        </h3>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <img
              className="w-[2.2rem] h-[2.2rem] rounded-full"
              src={require("../../../images/course.png")}
              alt="student"
            />
            <span className="text-textColor text-base">Brenda Howe</span>
          </div>
          <p className="text-main text-base">1500 EGP</p>
        </div>
      </div>
    </div>
    
      ))}
      </div>
    </div>
  );
};

export default ExploreCourses;
