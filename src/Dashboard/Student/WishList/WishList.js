import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import WishListCard from "./WishListCard";
import { useState } from "react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import SkeletonShow from "../../../components/Skeleton/Skeleton";

const WishList = () => {
  const [data, setData] = useState([]);
  const [wait, setWait] = useState(false);
  const [skeleton, setSkeleton] = useState(false);
  useEffect(() => {
    setSkeleton(true);
    Axios.get("/wishlist").then((data) => {
      setSkeleton(false);
      setData(data.data.wishlistCourses.data);
      console.log(data.data.wishlistCourses.data);
    });
  }, [wait]);
  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[1.1rem] text-textColor">WishList</h3>
        <Breadcrumbs />
      </div>
      <div className="flex items-center gap-5 md:justify-start justify-center flex-wrap">
        {skeleton ? (
          <SkeletonShow
            classes="min-w-80 max-w-[340px] h-[300px] flex-1"
            length="3"
          />
        ) : data.length === 0 ? (
          <div className="flex justify-center w-full ">
            <p className="text-text2 mt-[20vh]">No Favourites Added</p>
          </div>
        ) : (
          data?.map((course, index) => (
            <WishListCard
              key={index}
              slug={course.slug}
              title={course.title}
              setWait={setWait}
              image={course?.thumbnail}
              price={course.price}
              instructor_image={course.instructor?.image}
              instructor_name={course.instructor?.user_name}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default WishList;
