import { Icon } from "@iconify-icon/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideDetails from "./SideDetails";
import CourseDetailsOverview from "./CourseDetailsOverview";
import CoursesList from "./Curriculum";
import Curriculum from "./Curriculum";
import CourseDetailsReviews from "./CourseDetailsReviews";
import CourseDetailsInstructor from "./CourseDetailsInstructor";
import { useState } from "react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import TransformDate from "../../../components/Helpers/TransformDate";
import defaultImage from "../../../images/juba.svg";
import Footer from "../../../components/Footer/Footer";
import NavBar from "../../../components/NavBar/NavBar";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const CourseView = () => {
  const { t, i18n } = useTranslation();

  const [course, setCourse] = useState([]);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  console.log(id);
  const scrollRef = useRef();

  useEffect(() => {
    setLoading(true);
    scrollRef.current.scrollIntoView({behavior:'smooth'});
    Axios.get(`/course/${id}`).then((data) => {
      setLoading(false);
      setCourse(data.data.course);
      setCount(data.data);
      console.log(data.data);
    });
  }, []);

  

  const [tabs, setTabs] = useState("overview");
  const nav = useNavigate();
  return (
    <div ref={scrollRef}>
      <NavBar />
      <div className="my-5 md:px-[10vh]">
        {loading && (
          <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
          </div>
        )}
        <button
          className="flex items-center text-textColor  gap-2 text-[1.1rem]"
          onClick={() => nav(-1)}
        >
          <Icon
            className="text-textColor rotate-180"
            icon="mingcute:arrow-right-line"
            width="24"
            height="24"
          />
          {t("Back")}
        </button>

        <div className="flex mt-5  items-start gap-5 md:flex-row flex-col">
          {/*  center  */}
          <div className="flex-1 w-full  pb-12 bg-white rounded-xl">
            <div className="w-full h-[18.5rem] rounded-xl overflow-hidden">
              <img
                src={`https://goba.sunmedagency.com/${course?.thumbnail}`}
                alt="course"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultImage;
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="bg-white border-b border-[#dddd]  py-4">
              <h3 className="text-textColor px-3 text-[1.3rem] ">
                {course?.title}
              </h3>
              <div className="flex px-3 py-4 items-center gap-20 md:gap-0 md:justify-between overflow-scroll md:w-auto scrollbar-hide her  w-[90vw]">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://goba.sunmedagency.com/${course.instructor?.image}`}
                    className="w-[45px] h-[45px] rounded-full"
                    alt="instarctor"
                  />
                  <span className="text-textColor text-base">
                    {course.instructor?.first_name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon
                    icon="material-symbols:date-range-outline-rounded"
                    width="24"
                    height="24"
                    className="text-main"
                  />
                  <span className="text-textColor text-base">
                    {TransformDate(course?.created_at)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon
                    icon="ph:student-fill"
                    width="24"
                    height="24"
                    className="text-main"
                  />

                  <span className="text-textColor text-base">12 {t("Student")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon
                    icon="mynaui:star-solid"
                    width="24"
                    height="24"
                    className="text-[#F0AB4C]"
                  />

                  <span className="text-textColor text-base">
                    {course?.reviews_count} {t("Reviews")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-10 py-6 px-2 bg-white scrollbar-hide overflow-scroll md:w-auto md:overflow-hidden w-[90vw]">
              <button
                onClick={() => setTabs("overview")}
                className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                  tabs === "overview" && "!text-white !bg-main"
                }`}
              >
                {t("Overview")}
              </button>
              <button
                onClick={() => setTabs("curriculum")}
                className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                  tabs === "curriculum" && "!text-white !bg-main"
                }`}
              >
                {t("Curriculum")}
              </button>
              <button
                onClick={() => setTabs("instructor")}
                className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                  tabs === "instructor" && "!text-white !bg-main"
                }`}
              >
                {t("Instructors")}
              </button>
              <button
                onClick={() => setTabs("reviews")}
                className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                  tabs === "reviews" && "!text-white !bg-main"
                }`}
              >
                {t("Reviews")}
              </button>
            </div>

            {tabs === "overview" ? (
              <CourseDetailsOverview data={course?.description} />
            ) : tabs === "curriculum" ? (
              <Curriculum data={course?.chapters} />
            ) : tabs === "reviews" ? (
              <CourseDetailsReviews data={course?.reviews} />
            ) : (
              tabs === "instructor" && (
                <CourseDetailsInstructor
                  image={course?.instructor.image}
                  name={course?.instructor.name}
                  bio={course?.instructor.bio}
                />
              )
            )}
          </div>
          {/* Right Side  */}
          <SideDetails
            chapters={course}
            languages={course?.languages}
            levels={course?.levels}
            price={course?.price}
            duration={course?.duration}
            certificate={course?.certificate}
            id={course?.id}
            quizCount={count?.courseQuizCount}
            lessons={count?.courseLessonCount}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CourseView;
