import { Icon } from "@iconify-icon/react";
import React from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../components/Helpers/Axios";
import defaultImage from "../../images/juba.svg";
import StringSlice from "../../components/Helpers/StringSlice";
const AllCoursesCard = (props) => {
  const toggleFav = async (slug) => {
    try {
      await Axios.get(`/wishlist/${slug}`).then((data) => {
        props.setWait((prev) => !prev);
        console.log(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Link
      to={`/Course-view/${props.slug}`}
      style={{ boxShadow: "0 4px 8px rgb(0 0 0 / 3%)", flex: "1 1 30%" }}
      className="pb-3 min-w-[290px] max-w-[370px] h-[370px] border flex-1 overflow-hidden bg-white rounded-xl mt-3 group transition-transform duration-500"
    >
      <div className="img h-[195px] w-full relative overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={
            props.image
              ? `https://goba.sunmedagency.com/${props.image}`
              : defaultImage
          }
          alt="course"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />

        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/student/course-details/${props.slug}`}
            className="bg-main  text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm font-bold shadow-md"
          >
            Add to Cart
          </Link>
        </div>
      </div>

      <div className="mt-3 px-3">
        <h3 className="text-[1.1rem] text-textColor transition-all duration-300">
          {props.title}
        </h3>
        <div className="flex items-center justify-between gap-3 mt-4">
          <p className="text-[0.9rem] text-textColor">
            {StringSlice(props.description, 80)}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center  mt-4  px-3">
        <div className="flex items-center justify-between   gap-2">
          <img
            className="w-[2.2rem] h-[2.2rem] rounded-full"
            src={`https://goba.sunmedagency.com/${props.instructor_image}`}
            alt="student"
          />
          <span className="text-textColor text-base">
            {props.instructor_name}
          </span>
        </div>
        <p className="text-main text-base  p-1 rounded bg-[#F15A24] bg-opacity-20 whitespace-nowrap">
          {props.price}
        </p>
      </div>
    </Link>
  );
};

export default AllCoursesCard;
