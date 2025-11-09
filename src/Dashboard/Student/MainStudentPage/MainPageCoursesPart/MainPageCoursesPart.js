import { Icon } from "@iconify-icon/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../../components/Helpers/Axios";
import SkeletonShow from "../../../../components/Skeleton/Skeleton";
import defaultImage from '../../../../images/juba.svg'
import { useTranslation } from "react-i18next";
const MainPageCoursesPart = () => {
  const { t, i18n } = useTranslation();

  //  get data
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [skeleton, setSkeleton] = useState(false);

  useEffect(() => {
    setSkeleton(true);
    Axios.get("/courses").then((data) => {
      setSkeleton(false);
      setCategories(data.data.categories);
    });

    Axios.get(`/student/enrolled-courses?category_id=${categoryId}`).then(
      (data) => {
        //data.data);
        setSkeleton(false);
        setCourses(data.data.enrolls);
      }
    );
  }, [categoryId]);
  //courses);

  const [resize, setResize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setResize(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () => setResize(window.innerWidth));
    };
  }, [window.innerWidth]);
  //resize);

  return (
    <div className="MainPageCoursesPart mt-8 ">
      <div className="flex items-center justify-between ">
        <div className="flex items-start md:items-center  gap-6 flex-col md:flex-row justify-start">
          <p className="text-[1.2rem] text-textColor">{t("Continue learning")}</p>
          <div className="flex items-center gap-6 scrollbar-hide overflow-scroll md:w-auto md:overflow-hidden w-[90vw]">
            <button
              onClick={() => setCategoryId("")}
              className={`bg-[#F6F8FC] text-text2 px-5 whitespace-nowrap py-3 rounded-lg text-[1rem] border border-[#F6F8FC] hover:border-main hover:text-main duration-500 ${
                categoryId === "" && "!border-main !text-main"
              }`}
            >
              {t("All Courses")}
            </button>
            {skeleton
              ? Array.from({ length: "3" }).map((_, index) => (
                  <div className="">
                    <SkeletonShow length="1" width="130px" height="40px" />
                  </div>
                ))
              : categories.map((data, index) => (
                  <button
                    onClick={() => setCategoryId(data.id)}
                    key={index}
                    className={`bg-[#F6F8FC] text-text2 px-5 py-3 rounded-lg text-[1rem] border border-[#F6F8FC] hover:border-main hover:text-main duration-500 ${
                      categoryId === data.id && "border-main text-main"
                    }`}
                  >
                    {data.name}
                  </button>
                ))}

            <Link
              to="/student/explore"
              className="text-main text-[1.05rem] flex items-center gap-2 pr-4 whitespace-nowrap"
            >
              {t("See all courses")}
              <Icon
                className="text-main"
                icon="mingcute:arrow-right-line"
                width="24"
                height="24"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="courses mt-5 flex sm:flex-row flex-col items-center gap-4 md:gap-8 flex-wrap">
        {skeleton ? (
          Array.from({ length: "3" }).map((_, index) => (
            <div className="md:max-w-[40%]  w-full flex-1 p-3 md:p-0">
              <SkeletonShow length="1" width="100%" height="200px" />
            </div>
          ))
        ) : courses.length === 0 ? (
          <div className="flex w-full py-12 justify-center items-center flex-col">
            <p className="w-full text-center p-6 text-text2">{t("No Courses")}</p>
            <Link
              className="text-white bg-main px-5 py-2 rounded main-shadow duration-300"
              to="/student/explore"
            >
            {t("Explore Courses")}
            </Link>
          </div>
        ) : (
          courses.map((course, index) => (
            <div
              key={index}
              className="course-card md:max-w-[300px] group relative w-full flex-1 bg-white p-3 md:p-0 md:bg-transparent transition-transform duration-500 "
            >
              <div className="img w-full h-[9.6rem] rounded md:rounded-xl overflow-hidden relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={`https://goba.sunmedagency.com/${course?.course.thumbnail}`}
                  alt="course"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Link
                    to={`/student/enrolled-course/${course?.course.slug}`}
                    className="bg-main text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold shadow-md"
                  >
                    {t("Watch Now")}
                  </Link>
                </div>
              </div>
              <div className="content mt-4">
                <div className="flex items-center justify-between">
                  <div className="text">
                    <h3 className="text-[1rem] text-textColor font-bold transition-all duration-300 ">
                      {course?.course.title}
                    </h3>
                    <p className="text-[12px] text-text2 mt-3 transition-all duration-300 ">
                      {course?.course.category.name}
                    </p>
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
                    <span
                      className={`absolute left-0 h-full bg-main w-[${course.completed}%]`}
                    ></span>
                  </div>
                  <span className="text-main text-[13px]">
                    {course.completed}%
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MainPageCoursesPart;
