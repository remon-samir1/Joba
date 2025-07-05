import React, { useState, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../../../components/Helpers/Axios";
import { toast } from "react-toastify"; // استيراد toast لإظهار الإشعارات

const AddQuestion = ({ setShowQuestionModal, quizId, setChange, initialData }) => {
  const [questionTitle, setQuestionTitle] = useState(initialData?.title || "");
  const [grade, setGrade] = useState(initialData?.grade || "");
  const [answers, setAnswers] = useState(
    initialData?.answers && initialData.answers.length > 0
      ? initialData.answers.map(ans => ({ ...ans, localId: ans.id || Date.now() })) // استخدام localId للحفاظ على id لـ React keys
      : [{ localId: Date.now(), title: "", correct: false }]
  );
console.log(answers);
  const [isEditMode, setIsEditMode] = useState(!!initialData); 

  const handelSubmit = async (e) => {
    e.preventDefault();

    if (!questionTitle.trim()) {
      toast.error("Question Title is Required");
      return;
    }
    if (!grade.toString().trim() || isNaN(Number(grade)) || Number(grade) <= 0) {
      toast.error("Grade is not true");
      return;
    }
    if (answers.length === 0) {
      toast.error("Must be one answer at less");
      return;
    }
    if (answers.some(ans => !ans.title.trim())) {
        toast.error("Answers must be a text");
        return;
    }
    if (!answers.some(ans => ans.correct)) {
      toast.error("Must be a one correct answer at less");
      return;
    }

    const payload = {
      title: questionTitle.trim(),
      grade: Number(grade),
      answers: answers.map(ans => {
        const newAns = { title: ans.title.trim(), correct: ans.correct };
        if (ans.id) {
          newAns.id = ans.id;
        }
        return newAns;
      }),
    };

    try {
      let response;
      if (isEditMode) {
        response = await Axios.put(`/admin/course-chapter/quiz-question/update/${initialData.id}`, payload).then(data=>console.log(data));
        toast.success("Question Updated Successfly");

      } else {
        response = await Axios.post(`/admin/course-chapter/quiz-question/create/${quizId}`, payload).then(data=>console.log(data));
        toast.success("Question Created Successfly");
      }
      setChange(prev => !prev); 
      setShowQuestionModal(false); 
    } catch (err) {
      console.log(err);
      console.error("create error", err.response ? err.response.data : err.message);
      toast.error("some think wrong " + (err.response?.data?.message || err.message));
    }
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { localId: Date.now(), title: "", correct: false }]);
  };

  const handleAnswerChange = (localId, key, value) => {
    setAnswers((prev) =>
      prev.map((ans) => (ans.localId === localId ? { ...ans, [key]: value } : ans))
    );
  };

  const handleRemoveAnswer = (localId) => {
    setAnswers((prev) => prev.filter((ans) => ans.localId !== localId));
  };

  return (
    <form className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center" onSubmit={handelSubmit}>
      <div className="bg-white rounded shadow-lg w-[90%] md:w-[50%] p-6 max-h-[90vh] overflow-y-auto relative">
        <button
          type="button" 
          onClick={() => setShowQuestionModal(false)}
          className="absolute right-3 top-3 text-red-500 font-bold text-xl"
        >
          &times;
        </button>

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-textColor mb-1">
              Question Title
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 outline-none focus:border-main"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="Question title"
              required
            />
          </div>
          <div className="w-[100px]">
            <label className="block text-sm font-semibold text-textColor mb-1">
            grade
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 outline-none focus:border-main"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="0"
              required
            />
          </div>
        </div>

        <button
          type="button" 
          onClick={handleAddAnswer}
          className="bg-main text-white px-4 py-2 rounded mb-4"
        >
        Add answer
        </button>

        {answers.map((ans, index) => (
          <div key={ans.localId} className="mb-4 shadow-md p-4 rounded relative">
            <button
              type="button" 
              onClick={() => handleRemoveAnswer(ans.localId)}
              className="absolute top-2 right-2 text-red-500"
            >
              <Icon icon="ic:baseline-delete" width={20} height={20} />
            </button>
            <label className="block text-sm font-semibold text-textColor mb-1">
            Title
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-2 outline-none focus:border-main"
              value={ans.title}
              onChange={(e) => handleAnswerChange(ans.localId, "title", e.target.value)}
              required
            />
            <div className="flex items-center gap-2">
              <label className="text-textColor"> Correct answer</label>
              <input
                type="checkbox"
                checked={ans.correct}
                onChange={(e) => handleAnswerChange(ans.localId, "correct", e.target.checked)}
                className="scale-125 accent-main"
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-main text-white px-6 py-2 rounded mt-4 float-right"
        >
          {isEditMode ? " Update Question" : " Create Question"}
        </button>
      </div>
    </form>
  );
};

export default AddQuestion;