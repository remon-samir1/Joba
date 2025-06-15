import { Icon } from "@iconify-icon/react";
import React from "react";

const CourseDetailsOverview = (props) => {
  return (
    <div className="p-3 bg-white">
      <h4 className="text-textColor text-base">Course description</h4>
      <p dangerouslySetInnerHTML={{__html:props.data}} className="text-text2 mt-4">
  
      </p>

    </div>
  );
};

export default CourseDetailsOverview;
