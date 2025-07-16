import { Icon } from "@iconify-icon/react";
import React, { useEffect, useState } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Notifcation from "../../../components/Notification";
import { toast } from "react-toastify";
import minimumImage from "../../../images/minimum.svg";
import attemptImage from "../../../images/attemp.svg";
import marksImage from "../../../images/marks.svg";
import passedImage from "../../../images/passed.svg";
import passedQuizImage from "../../../images/PassedQuiz.svg";
const QuizResualt = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizes, setQuizes] = useState([]);
  const [values, setValues] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({ question: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get("/student/quiz-attempts").then((data) => {
      console.log(data);
      const quizesData = data.data.quizAttempts.data;
      console.log(quizesData);
      setQuizes(quizesData.filter((data) => data.id == id)[0]);
      setLoading(false);
    });
  }, []);
  console.log(quizes);
  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const cards = [
    {
      icon: minimumImage,
      degree: quizes?.quiz?.total_mark + "/" + quizes?.user_grade,
      name: "Minimum marks",
    },
    {
      icon: attemptImage,
      degree: quizes?.quiz?.attempt,
      name: "Attempts",
    },
    {
      icon: marksImage,
      degree: quizes?.user_grade,
      name: "Your Marks",
    },
    {
      icon: passedImage,
      degree: quizes?.status,
      name: "Result",
    },
  ];

  return (
    <div className="mt-8">
      <Notifcation />
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <div className="flex justify-center flex-col items-center bg-white border rounded py-4 gap-3">
        {quizes?.status === "pass" && (
          <img src={passedQuizImage} alt="pass" loading="lazy" />
        )}
        <p className="text-textColor text-[1.3rem]  ">
          {quizes?.status === "pass"
            ? "You have passed the quiz"
            : "You have failed in quiz"}
        </p>
        <Link
          to="/student/main"
          className="text-white main-shadow duration-300 text-base bg-main px-5 py-3 rounded-3xl "
        >
          Go back to dashboard
        </Link>
      </div>
      <div className="flex items-center mt-4 justify-between gap-4 md:flex-row flex-col flex-wrap">
        {cards.map((data, key) => (
          <div
            key={key}
            className=" md:h-[14.5rem] bg-white w-full md:max-w-64 md:min-w-48 rounded border flex flex-col justify-center items-center gap-4 flex-1"
          >
            {data.icon === attemptImage ||
            data.icon === passedImage ||
            data.icon === marksImage ? (
              <img src={data.icon} alt="" />
            ) : (
              <div className="bg-[#22A08C] rounded-full w-[5rem] h-[5rem] flex justify-center items-center">
                <img
                  src={data.icon}
                  loading="lazy"
                  width="62"
                  height="62"
                  style={{ color: "#fff" }}
                />
              </div>
            )}
            <p
              className={`text-textColor text-[2rem] font-bold ${
                data.degree === "pass"
                  ? "!text-[#319F43]"
                  : data.degree === "failed"
                  ? "text-[#F94545]"
                  : "text-textColor"
              }`}
            >
              {data.degree}
            </p>
            <p className="text-[0.9rem] text-text2 font-semibold">
              {data.name}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full my-5 rounded bg-white p-4 border">
        {quizes?.quiz?.questions?.map((q, qIndex) => (
          <div key={qIndex} className="mb-6">
            <p className="text-lg font-medium mb-3">{q.title}</p>
            <div className="flex flex-wrap gap-4">
              {q.answers.map((answer, aIndex) => {
                const selected = selectedAnswers.question?.[q.id] === answer.id;
                return (
                  <label
                    key={aIndex}
                    className={`flex items-center gap-2 px-4 py-3 border rounded-md cursor-pointer w-full md:w-[48%] ${
                      answer.correct === 1
                        ? "bg-[#4BBC9A] bg-opacity-30"
                        : "bg-[#FF725E] bg-opacity-30"
                    }`}
                  >
                    <input
                      disabled
                      checked={answer.correct === 1}
                      // className="bg-red-500"
                      type="radio"
                      name={`question-${qIndex}`}
                      // checked={selected}
                    />
                    {answer.title}
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizResualt;
