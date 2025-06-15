import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import StarRating from "../../../components/StarRating/StarRating";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";

const Reviews = () => {
  useEffect(()=>{
    Axios.get('/student/reviews').then(data=>console.log(data))
  },[])
  return (
    <div className="py-4">
      <div className="flex justify-between items-center ">
        <h3 className="text-base text-textColor">My reviews ( 18 )</h3>
        <Breadcrumbs />
      </div>
      {/* Review Card */}
    {Array.from({length:3}).map((_,index)=>(
        <div key={index} className="px-4 py-3 mt-4 bg-white border border-[#dddd] rounded">
        <div className="flex justify-between items-center">
          <StarRating rating={3} />
          <div className="flex items-center gap-2">
            <p className="text-base px-6 py-2 rounded-full bg-[#4BBC9A] bg-opacity-30 text-[#0E8A29]">
              Approved
            </p>
            <Link to='/student/reviews/details' className="bg-main w-[40px] h-[40px] rounded-full flex justify-center items-center ">
              <Icon
                icon="carbon:view"
                width="18"
                height="18"
                className="text-white"
              />
            </Link>
            <button className="bg-main w-[40px] h-[40px] rounded-full flex justify-center items-center ">
              <Icon
                icon="iconamoon:trash"
                width="18"
                height="18"
                className="text-white"
              />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-base font-semibold text-textColor">
            Noura Ahmed{" "}
          </h3>
          <p className="mt-2 w-[90%] text-textColor text-[0.9rem]">
            Lorem ipsum dolor sit amet consectetur. Magna hendrerit sapien quam
            nunc montes. Rhoncus mauris nam odio egestas phasellus pellentesque
            purus. Sodales quam in cursus sapien sollicitudin erat et vitae.
            Molestie id amet posuere egestas nisi tincidunt.
          </p>
        </div>
      </div>
    ))}
    </div>
  );
};

export default Reviews;
