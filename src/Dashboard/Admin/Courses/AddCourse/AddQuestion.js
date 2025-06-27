import React, { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../../../components/Helpers/Axios";

const AddQuestion = ({ setShowQuestionModal, quizId  , setChange}) => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [answers, setAnswers] = useState([
    { id: Date.now(), title: "", correct: false },
  ]);
  const [correct , setCorrect] =  useState(false)
  console.log(quizId);
  console.log(answers);
  //  handel submit
  const handelSubmit = (e) => {
    const formData = new FormData();
    formData.append('title' , questionTitle)
    formData.append('grade' , grade)
    formData.append(`answers[${answers.index}]` , answers)
    // formData.append(`correct[${answers.index}]` , correct)
    e.preventDefault();
    setShowQuestionModal(false)
    try {
      Axios.post(`/admin/course-chapter/quiz-question/create/${quizId}`, {
        title: questionTitle,
        grade,
        answers,
      }).then((data) => {
        setChange(prev=>!prev)
        console.log(data)});
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddAnswer = () => {
    setAnswers([...answers, { id: Date.now(), title: "", correct: false }]);
  };

  const handleAnswerChange = (id, key, value) => {
    setAnswers((prev) =>
      prev.map((ans) => (ans.id === id ? { ...ans, [key]: value } : ans))
    );
  };

  const handleRemoveAnswer = (id) => {
    setAnswers((prev) => prev.filter((ans) => ans.id !== id));
  };

  const handleCreate = () => {
    if (!questionTitle.trim() || !grade.trim()) return;
    const questionData = {
      title: questionTitle.trim(),
      grade: +grade,
      answers,
    };
    console.log("Created Question:", questionData);
    setShowQuestionModal(false);
  };

  return (
    <form className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded shadow-lg w-[90%] md:w-[50%] p-6 max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={() => setShowQuestionModal(false)}
          className="absolute right-3 top-3 text-red-500 font-bold text-xl"
        >
          &times;
        </button>

        {/* Title and Grade */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-textColor mb-1">
              Question Title *
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 outline-none focus:border-main"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              placeholder="Enter question"
              required
            />
          </div>
          <div className="w-[100px]">
            <label className="block text-sm font-semibold text-textColor mb-1">
              Grade *
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

        {/* Add Answer */}
        <button
          onClick={handleAddAnswer}
          className="bg-main text-white px-4 py-2 rounded mb-4"
        >
          Add Answer
        </button>

        {/* Answers list */}
        {answers.map((ans, index) => (
          
          <div key={ans.id} className="mb-4 shadow-md p-4 rounded relative">
            <button
              onClick={() => handleRemoveAnswer(ans.id)}
              className="absolute top-2 right-2 text-red-500"
            >
              <Icon icon="ic:baseline-delete" width={20} height={20} />
            </button>
            <label className="block text-sm font-semibold text-textColor mb-1">
              Answer Title *
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 mb-2 outline-none focus:border-main"
              value={ans.title}
              onChange={(e) =>{

              
                handleAnswerChange(ans.id, "title", e.target.value)
              }
              }
              required
            />
            <div className="flex items-center gap-2">
              <label className="text-textColor">Correct Answer</label>
              <input
                type="checkbox"
                checked={ans.correct}
                onChange={(e) =>
                  
                  handleAnswerChange(ans.id, "correct", e.target.checked)
                }
                className="scale-125"
              />
            </div>
          </div>
        ))}

        {/* Create Button */}
        <button
          type="submit"
          onClick={handelSubmit}
          className="bg-main text-white px-6 py-2 rounded mt-4 float-right"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default AddQuestion;
