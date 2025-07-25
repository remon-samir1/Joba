
import { Icon } from "@iconify-icon/react";
import React, { useEffect, useState } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { useParams, useNavigate } from "react-router-dom";
import Notifcation from "../../../components/Notification";
import { toast } from "react-toastify";

const QuizExam = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [values, setValues] = useState();
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({ question: {} });
  const [loading, setLoading] = useState(true);
  const [alreadyPassed, setAlreadyPassed] = useState(false); 

  useEffect(() => {
    setLoading(true);

    Promise.all([
      Axios.get("/student/quiz-attempts"),
      Axios.get(`student/learning/quiz/${id}`),
    ])
      .then(([attemptRes, quizRes]) => {
        const allAttempts = attemptRes.data.quizAttempts.data;
        const quizData = quizRes.data.quiz;

        const thisQuizAttempts = allAttempts.filter((a) => a.quiz.id == id);

        const hasPassed = thisQuizAttempts.some(
          (a) => a.user_grade >= quizData.pass_mark
        );
        console.log(hasPassed);
        console.log(thisQuizAttempts);
        if (hasPassed) {
          setAlreadyPassed(true);
          setLoading(false);
          return;
        }

        setQuestions(quizData.questions);
        setValues(quizRes.data);
        setTimeLeft(Number(quizData.time));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.warn("You reached the attempt limit or an error occurred.");
        setTimeout(() => navigate(-1), 3000);
      });
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleSubmit = async (isTimeOut = false) => {
    const payload = isTimeOut ? {} : selectedAnswers;
    setLoading(true);
    await Axios.post(`student/learning/quiz/${id}`, payload)
      .then((data) => {
        toast.success("Questions Submitted");
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSelect = (qIndex, aIndex) => {
    setSelectedAnswers((prev) => ({
      question: {
        ...prev.question,
        [qIndex]: aIndex,
      },
    }));
  };

  const cards = [
    {
      icon: "game-icons:graduate-cap",
      degree: "50/100",
      name: "Minimum marks",
    },
    {
      icon: "quill:paper",
      degree: values ? `${values.attempt}/${values.quiz.attempt}` : "--",
      name: "Attempts",
    },
    {
      icon: "mage:message-question-mark-round",
      degree: `${questions.length}`,
      name: "Questions",
    },
    {
      icon: "stash:stopwatch",
      degree: formatTime(timeLeft),
      name: "Remained time",
    },
  ];

  return (
    <div className="mt-8">
      <Notifcation />
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>
        </div>
      )}

      {alreadyPassed ? (
        <div className="flex flex-col items-center justify-center bg-white border p-6 rounded text-center gap-4">
          <Icon
            icon="mdi:check-circle"
            width="64"
            height="64"
            className="text-green-500"
          />
          <p className="text-2xl font-bold text-green-600">
            You have already passed this quiz
          </p>
          <p className="text-base text-gray-600">
            You cannot retake this quiz again.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-4 md:flex-row flex-col flex-wrap">
            {cards.map((data, key) => (
              <div
                key={key}
                className="h-[14.5rem] bg-white w-full md:max-w-64 md:min-w-48 rounded border flex flex-col justify-center items-center gap-4 flex-1"
              >
                <div className="bg-main rounded-full w-[5rem] h-[5rem] flex justify-center items-center">
                  <Icon
                    icon={data.icon}
                    width="62"
                    height="62"
                    style={{ color: "#fff" }}
                  />
                </div>
                <p className="text-textColor text-[2rem] font-bold">
                  {data.degree}
                </p>
                <p className="text-[0.9rem] text-text2 font-semibold">
                  {data.name}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 py-4 rounded px-4 flex items-center gap-3 w-full border border-[#F1AC4D] bg-[#F1AC4D] bg-opacity-10">
            <Icon
              icon="fluent:warning-16-filled"
              width="24"
              height="24"
              className="text-[#C79307]"
            />
            <p className="text-[#C79307] text-[0.9rem]">
              Please note that you have to complete all the questions and submit
              before remaining time. The form will be submitted automatically if
              remaining time ends.
            </p>
          </div>

          <div className="w-full my-5 rounded bg-white p-4 border">
            {questions.map((q, qIndex) => (
              <div key={qIndex} className="mb-6">
                <p className="text-lg font-medium mb-3">{q.title}</p>
                <div className="flex flex-wrap gap-4">
                  {q.answers.map((answer, aIndex) => {
                    const selected =
                      selectedAnswers.question?.[q.id] === answer.id;
                    return (
                      <label
                        key={aIndex}
                        className="flex items-center gap-2 px-4 py-3 border rounded-md cursor-pointer w-full md:w-[48%]"
                      >
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          checked={selected}
                          onChange={() => handleSelect(q.id, answer.id)}
                        />
                        {answer.title}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
            <button
              onClick={() => handleSubmit()}
              className="bg-main main-shadow text-white px-6 py-2 rounded-full mt-4"
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizExam;
