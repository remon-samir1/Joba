import React from "react";
import StarRating from "../../../components/StarRating/StarRating";

const CourseDetailsReviews = (props) => {
  return (
    <div className="py-3 px-4 bg-white">
  {props.data.map((data,index)=>(
        <div className="mt-7">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
              <img
                src={`https://goba.sunmedagency.com${data.user.cover}`}
                alt="course"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-text2 text-[0.9rem]">{data.user.name}</span>
          </div>
          <StarRating rating={data.rating} />
        </div>
      <p style={{letterSpacing:'0.5px'}} className="mt-3 text-text2 text-[0.9rem] max-w-[85%]">
    {data.review}
      </p>
      </div>
  ))}
    </div>
  );
};

export default CourseDetailsReviews;
