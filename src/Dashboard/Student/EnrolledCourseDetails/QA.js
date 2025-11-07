import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { Axios, baseUrl } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";
import { useTranslation } from "react-i18next";

const QA = (props) => {
  
  const [sendQuestion, setSendQuestion] = useState({
    course_id: props.id,
    question: "",
    lesson_id: props.lessonId,
    description: "",
  });
  console.log(sendQuestion);
  const { t, i18n } = useTranslation();

  const [questions, setQuestions] = useState([]);
  const [ask, setAsk] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [change, setChange] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Latest");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  // handelSendQuestion
  const handelSendQuestion = () => {
    setLoading(true);
    try {
      if (sendQuestion.lesson_id !== undefined) {
        Axios.post("/student/create-question", sendQuestion).then((data) => {
          console.log(data);
          setLoading(false);
          toast.success("Question Created Successfly");
        setChange((prev) => !prev);

        });
      } else {
        setLoading(false);
        toast.warn("there is no lessons to add questions");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Question Does not Created ");
    }
  };
  useEffect(() => {
    setSendQuestion({ ...sendQuestion, question: props.id });
    setSendQuestion({ ...sendQuestion, lesson_id: props.lessonId });
    Axios.get(
      `/student/fetch-lesson-questions?query=${searchTerm}&lesson_id=${sendQuestion.lesson_id}&course_id=${sendQuestion.course_id}`
    ).then((data) => {
      setLoading(false);
      console.log(data);
      setQuestions(data.data.view.data);
    });
  }, [change, searchTerm]);

  const handleReplySubmit = async (questionId) => {
    setLoading(true);
    try {
      Axios.post("/student/create-reply", {
        reply: replyText,
        question_id: questionId,
      }).then((data) => {
        toast.success("Reply created successfully");
        setChange((prev) => !prev);
        setLoading(false);
        setReplyText("");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-5 px-6 bg-white font-cairo">
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <Notifcation />
      <div className="flex items-center justify-between gap-6 flex-wrap mb-8">
        {/* Search Box */}
        <div className="md:w-[320px] md:flex-grow-0 flex-1 h-[40px] border border-[#dddd] rounded-full flex items-center justify-between pl-3 pr-1">
          <input
            type="text"
            placeholder={t("Search questions...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="appearance-none flex-1 border-none outline-none text-[0.9rem] text-textColor"
          />
          <div className="w-[32px] h-[32px] rounded-full bg-main flex justify-center items-center">
            <Icon
              icon="material-symbols-light:search-rounded"
              width="20"
              height="20"
              style={{ color: "#fff" }}
            />
          </div>
        </div>
        {/* Filters */}
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-[40px] px-4 bg-white text-[0.9rem] text-text2 border border-[#dddd] rounded-full"
          >
            <option>{t("Latest")}</option>
            <option>{t("Popular")}</option>
            <option>{t("Unanswered")}</option>
          </select>
          <button
            onClick={() => setAsk((prev) => !prev)}
            className="text-[0.9rem] bg-main text-white px-8 py-2.5 rounded-full main-shadow duration-300 hover:bg-opacity-90"
          >
            {t("Ask a question")}
          </button>
        </div>
      </div>
      {ask && (
        <div className="flex flex-col gap-2 my-4">
          <label htmlFor="bio" className="text-[0.9rem] text-main font-medium">
            {" "}
            {t("Ask Question")}
          </label>
          <textarea
            required
            onChange={(e) =>
              setSendQuestion({
                ...sendQuestion,
                description: e.target.value,
                question: e.target.value,
              })
            }
            placeholder="Question..."
            id="bio"
            className="p-3 border border-[#dddd] rounded outline-none focus:border-main text-text2"
          />
          <button
            onClick={handelSendQuestion}
            className="self-end text-sm text-white bg-main px-5 py-2 rounded main-shadow duration-300 font-medium"
          >
            {t("Share")}
          </button>
        </div>
      )}
      <div className="space-y-6">
        {loading && <p>Loading questions...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          questions?.map((q) => (
            <div key={q.id} className="border-b border-gray-200 pb-4">
              {/* Question */}
              <div className="flex items-start gap-4">
                <img
                  src={`${baseUrl}${q.user?.image}`}
                  className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"
                />

                <div>
                  <p className="font-semibold text-gray-800">{q.user?.name}</p>
                  <p className="text-gray-600 mt-1">{q.question_title}</p>
                  <button
                    onClick={() =>
                      setReplyingTo(replyingTo === q.id ? null : q.id)
                    }
                    className="text-sm text-gray-500 mt-2 hover:underline"
                  >
                    {t("Reply")}
                  </button>
                </div>
              </div>

              {/* Replies */}
              <div className="ml-14 mt-4 space-y-4">
                {q.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-4">
                    <img
                      src={`${baseUrl}${q.user?.image}`}
                      className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"
                    />
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {reply.user?.name}
                      </p>
                      <p className="text-gray-600 mt-0.5 text-sm">
                        {reply.reply}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input Box */}
              {replyingTo === q.id && (
                <div className="ml-14 mt-4 flex items-center gap-3">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Write a reply to ${q.user.name}...`}
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none  focus:border-main"
                  />
                  <button
                    onClick={() => handleReplySubmit(q.id)}
                    className="bg-main text-white px-6 py-2 rounded-full text-sm hover:bg-opacity-90"
                  >
                    Post Reply
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="text-center mt-8"></div>
    </div>
  );
};

export default QA;
