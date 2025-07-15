import { Icon } from "@iconify-icon/react";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import quizImage from "../../../images/quiz-image.svg";
import { useState } from "react";
import CourseDetailsOverview from "../CourseDetails/CourseDetailsOverview";
import CourseContactDetails from "./CourseContactDetails";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import QA from "./QA";
import Annoucement from "./Annoucement";
import EnroledCourseReviews from "./EnroledCourseReviews";
import Player from "../../../components/Player/Player";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import TransformDate from "../../../components/Helpers/TransformDate";

const EnrolledCourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [play, setPlay] = useState(false);
  const [lessonId,setLessonId]=useState()
  const [url, setUrl] = useState();
  const [skeleton, setSkeleton] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState(false);
  const { id } = useParams();
  console.log(quizId);
  useEffect(() => {
    setSkeleton(true);
    setLoading(true);
    Axios.get(`/course/${id}`).then((data) => {
      console.log(data);
      setCourse(data.data);
      setLoading(false);
      setUrl(data.data.course.chapters[0]?.chapter_items[0]?.lesson.file_path);
      setLessonId(data.data.course.chapters[0]?.chapter_items[0]?.lesson.id);
      setSkeleton(false);
    });
  }, []);

  console.log(course?.course?.chapters[1]?.chapter_items[0].type);
  const [tabs, setTabs] = useState("overview");
  const downloadFile = (filePath) => {
    const fileUrl = `${process.env.REACT_APP_BASE_URL}/${filePath}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nav = useNavigate();
  return (
    <div className="my-5">
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      {loading === false &&
      
      url && play && <Player url={url && url} setPlay={setPlay} />}
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-textColor gap-2 text-[1.1rem]"
          onClick={() => nav(-1)}
        >
          <Icon
            className="text-textColor rotate-180"
            icon="mingcute:arrow-right-line"
            width="24"
            height="24"
          />
          Back
        </button>
        <Breadcrumbs />
      </div>
      <div className="flex mt-5 items-start justify-center gap-5 flex-col md:flex-row flex-wrap">
        {/*  center  */}
        <div className="flex-1 pb-12 bg-white rounded-xl">
          {type === "document" ? (
            <div className="flex justify-center items-center">
              <div className="border-dashed border-2 border-[#ddd] rounded mt-5 py-4 px-8 flex flex-col justify-center items-center gap-3">
                <img
                  src={quizImage}
                  alt="quiz"
                  loading="lazy"
                  width={80}
                  height={80}
                />
                <h3 className="text-[1.1rem] font-bold text-textColor">
                  Document
                </h3>
                <p className="text-text2 text-sm">
                  Please download the document for mor information
                </p>
                <button
                  onClick={() => downloadFile(url)}
                  className="text-white main-shadow mt-2 bg-main text-base px-5 py-2 rounded-full"
                >
                  Download
                </button>
              </div>
            </div>
          ) : type === "quiz" ? (
            <div className="flex justify-center items-center">
              <div className="border-dashed border-2 border-[#ddd] rounded mt-5 py-4 px-8 flex flex-col justify-center items-center gap-3">
                <img
                  src={quizImage}
                  alt="quiz"
                  loading="lazy"
                  width={80}
                  height={80}
                />
                <h3 className="text-[1.1rem] font-bold text-textColor">Quiz</h3>
                <p className="text-text2 text-sm">
                  Please go to quiz page for mor information
                </p>
                <Link
                  to={`/student/quiz-exam/${quizId}`}
                  className="text-white main-shadow mt-2 bg-main text-base px-5 py-2 rounded-full"
                >
                  Start Quiz
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full h-[18.5rem] relative rounded-xl overflow-hidden">
              <div
                onClick={() => setPlay(true)}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.25))",
                  boxShadow:
                    " inset 0 1px 0 rgba(255, 255, 255, 3), 0 8px 24px rgba(000, 0000, 0000, 0.2) ",
                }}
                className="flex justify-center cursor-pointer items-center absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[100px] h-[100px] rounded-full  backdrop-blur-xl bg-opacity-50 backdrop-saturate-150 "
              >
                <Icon
                  icon="fe:play"
                  width="50px"
                  className="text-white"
                  height="50px"
                />
              </div>
              <img
                src={`https://goba.sunmedagency.com/${course?.course.thumbnail}`}
                alt="course"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="bg-white border-b border-[#dddd]  py-4">
            <h3 className="text-textColor px-3 text-[1.3rem] ">
              {course?.course.title}
            </h3>
            <div className="flex px-3 py-4 items-center justify-between gap-20 md:gap-0 md:justify-between overflow-scroll md:w-auto scrollbar-hide her  w-[90vw]">
              <div className="flex items-center gap-3">
                <img
                  src={`https://goba.sunmedagency.com/${course?.course.instructor?.image}`}
                  className="w-[45px] h-[45px] rounded-full"
                  alt="instarctor"
                />
                <span className="text-textColor text-base">
                  {course?.course.instructor.first_name}
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
                  {TransformDate(course?.course.created_at)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Icon
                  icon="ph:student-fill"
                  width="24"
                  height="24"
                  className="text-main"
                />

                <span className="text-textColor text-base">
                  {course?.course.enrollments.length} Student
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Icon
                  icon="mynaui:star-solid"
                  width="24"
                  height="24"
                  className="text-[#F0AB4C]"
                />

                <span className="text-textColor text-base">
                  {course?.course.reviews_count} Reviews
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
              Overview
            </button>
            <button
              onClick={() => setTabs("QA")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "QA" && "!text-white !bg-main"
              }`}
            >
              Q&A
            </button>
            <button
              onClick={() => setTabs("Annoucement")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "Annoucement" && "!text-white !bg-main"
              }`}
            >
              Annoucement
            </button>
            <button
              onClick={() => setTabs("reviews")}
              className={`text-text2 text-base capitalize py-3 px-4 duration-500 hover:bg-main hover:text-white rounded-xl ${
                tabs === "reviews" && "!text-white !bg-main"
              }`}
            >
              Reviews
            </button>
          </div>

          {tabs === "overview" ? (
            <CourseDetailsOverview data={course?.course.description} />
          ) : tabs === "QA" ? (
            <QA id={course?.course.id} lessonId={lessonId}/>
          ) : tabs === "reviews" ? (
            <EnroledCourseReviews id={course?.course.id} />
          ) : (
            tabs === "Annoucement" && <Annoucement />
          )}
        </div>
        {/* Right Side  */}
        <CourseContactDetails
          setType={setType}
          setLessonId={setLessonId}
          setQuizId={setQuizId}
          data={course?.course.chapters}
          setUrl={setUrl}
          url={url}
        />
      </div>
    </div>
  );
};

export default EnrolledCourseDetails;
