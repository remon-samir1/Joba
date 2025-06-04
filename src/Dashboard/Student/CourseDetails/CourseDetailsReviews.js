import React from "react";
import StarRating from "../../../components/StarRating/StarRating";

const CourseDetailsReviews = () => {
  return (
    <div className="py-3 px-4 bg-white">
  {Array.from({length:3}).map((_,index)=>(
        <div className="mt-7">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
              <img
                src={require("../../../images/course-details.png")}
                alt="course"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-text2 text-[0.8rem]">Christy Jacobs</span>
          </div>
          <StarRating rating="3" />
        </div>
      <p style={{letterSpacing:'0.5px'}} className="mt-3 text-text2 text-[0.7rem] max-w-[85%]">
        Lorem ipsum dolor sit amet consectetur. In volutpat tempus integer urna
        sed sed nibh non lectus. Malesuada mattis tempus sed vulputate. Aliquet
        pellentesque odio est in curabitur ullamcorper egestas id proin.
        Volutpat integer odio orci et nunc.
      </p>
      </div>
  ))}
    </div>
  );
};

export default CourseDetailsReviews;
