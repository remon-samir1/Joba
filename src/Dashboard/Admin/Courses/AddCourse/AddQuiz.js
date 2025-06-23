import React, { useState, useEffect, useRef } from "react";

const AddQuiz = ({
  quizModalRef,
  setShowQuizModal,
  addQuiz,
  editMode,
  defaultQuiz,
  chapters,
  selectedChapterId,
  course_id,
}) => {
  const [title, setTitle] = useState(defaultQuiz?.title || "");
  const [timeLimit, setTimeLimit] = useState(defaultQuiz?.time_limit || "");
  const [attempts, setAttempts] = useState(defaultQuiz?.attempts || "");
  const [totalMark, setTotalMark] = useState(defaultQuiz?.total_mark || "");
  const [passMark, setPassMark] = useState(defaultQuiz?.pass_mark || "");
  const [selectedChapter, setSelectedChapter] = useState(
    selectedChapterId || (chapters.length > 0 ? chapters[0].chapter_id : "")
  );

  useEffect(() => {
    if (defaultQuiz) {
      setTitle(defaultQuiz.title || "");
      setTimeLimit(defaultQuiz.time_limit || "");
      setAttempts(defaultQuiz.attempts || "");
      setTotalMark(defaultQuiz.total_mark || "");
      setPassMark(defaultQuiz.pass_mark || "");
    }
    if (selectedChapterId) setSelectedChapter(selectedChapterId);
  }, [defaultQuiz, selectedChapterId]);

  const handleSubmit = () => {
    if (!title.trim() || !totalMark.trim() || !passMark.trim() || !selectedChapter) return;

    const quizData = {
      type: "quiz",
      course_id: +course_id,
      chapter_id: selectedChapter,
      title: title.trim(),
      time_limit: timeLimit.trim(),
      attempts: attempts.trim(),
      total_mark: totalMark.trim(),
      pass_mark: passMark.trim(),
    };

    addQuiz(quizData, selectedChapter);

    setTitle("");
    setTimeLimit("");
    setAttempts("");
    setTotalMark("");
    setPassMark("");
  };

  return (
    <div className="fixed inset-0 max-h-screen overflow-auto flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div
        ref={quizModalRef}
        className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[70%]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textColor">
            Add Quiz <span className="text-red-500">*</span>
          </h3>
          <button
            onClick={() => setShowQuizModal(false)}
            className="text-gray-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Chapter */}
        <label className="text-base font-semibold mb-1 block text-textColor">
          Chapter <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border outline-none rounded px-3 py-2 mb-4 bg-white text-text2"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          {chapters.map((ch) => (
            <option key={ch.chapter_id} value={ch.chapter_id}>
              {ch.chapter_name}
            </option>
          ))}
        </select>

        {/* Title */}
        <label className="text-base font-semibold mb-1 block text-textColor">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
          placeholder="Title"
        />

        <div className="flex items-center md:gap-8 flex-col md:flex-row">
          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              Time limit (leave empty for unlimited)
            </label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
              placeholder="Time in minutes"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              Attempts (leave empty for unlimited)
            </label>
            <input
              type="number"
              value={attempts}
              onChange={(e) => setAttempts(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
              placeholder="Number of attempts"
            />
          </div>
        </div>

        <div className="flex items-center md:gap-8 flex-col md:flex-row">
          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              Total mark <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              value={totalMark}
              onChange={(e) => setTotalMark(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
              placeholder="Total mark"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              Pass mark <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              value={passMark}
              onChange={(e) => setPassMark(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
              placeholder="Pass mark"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-main text-white px-4 py-2 rounded w-full"
        >
          {editMode ? "Update Quiz" : "Add Quiz"}
        </button>
      </div>
    </div>
  );
};

export default AddQuiz;