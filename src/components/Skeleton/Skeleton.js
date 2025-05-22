import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonShow = (props) => {
  const skeletonShow = Array.from({ length: props.length }).map(() => (
    <div className=" ">
      <Skeleton baseColor={props.baseColor} width={props.width} height={props.height} className={props.classes}  />
    </div>
  ));
  return skeletonShow;
};

export default SkeletonShow;
