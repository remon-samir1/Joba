
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import AddLessons from "./AddLessons";
import { Icon } from "@iconify-icon/react";

const AddCourseContent = () => {
  const [chapters, setChapters] = useState([
    { id: "1", title: "Getting Started", lessons: [] },
    { id: "2", title: "Getting Started with React", lessons: [] },
  ]);
console.log(chapters);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const chapterModalRef = useRef();
  const lessonModalRef = useRef();

  useEffect(() => {
    if (showChapterModal && chapterModalRef.current) {
      gsap.fromTo(
        chapterModalRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
    if (showLessonModal && lessonModalRef.current) {
      gsap.fromTo(
        lessonModalRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [showChapterModal, showLessonModal]);

  const addOrUpdateChapter = () => {
    if (!newChapterTitle.trim()) return;
    if (editMode) {
      setChapters(prev =>
        prev.map(ch =>
          ch.id === selectedChapterId ? { ...ch, title: newChapterTitle.trim() } : ch
        )
      );
    } else {
      const newChapter = {
        id: Date.now().toString(),
        title: newChapterTitle.trim(),
        lessons: []
      };
      setChapters([...chapters, newChapter]);
    }
    setNewChapterTitle("");
    setEditMode(false);
    setSelectedChapterId(null);
    setShowChapterModal(false);
  };

  const addOrUpdateLesson = (lessonData, chapterIdFromDropdown) => {
    const chapterId = chapterIdFromDropdown || selectedChapterId;
    setChapters(prev =>
      prev.map(ch => {
        if (ch.id !== chapterId) return ch;
        if (editMode && selectedLessonIndex !== null) {
          const updatedLessons = [...ch.lessons];
          updatedLessons[selectedLessonIndex] = lessonData;
          return { ...ch, lessons: updatedLessons };
        } else {
          return { ...ch, lessons: [...ch.lessons, lessonData] };
        }
      })
    );
    setShowLessonModal(false);
    setEditMode(false);
    setSelectedLessonIndex(null);
    setSelectedChapterId(null);
  };

  const deleteChapter = (id) => {
    setChapters(prev => prev.filter(ch => ch.id !== id));
  };

  const deleteLesson = (chapterId, index) => {
    setChapters(prev =>
      prev.map(ch =>
        ch.id === chapterId
          ? { ...ch, lessons: ch.lessons.filter((_, i) => i !== index) }
          : ch
      )
    );
  };

  const editChapter = (chapter) => {
    setSelectedChapterId(chapter.id);
    setNewChapterTitle(chapter.title);
    setEditMode(true);
    setShowChapterModal(true);
  };

  const editLesson = (chapterId, lesson, index) => {
    setSelectedChapterId(chapterId);
    setSelectedLessonIndex(index);
    setEditMode(true);
    setShowLessonModal(true);
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          setEditMode(false);
          setNewChapterTitle("");
          setShowChapterModal(true);
        }}
        className="bg-main text-white px-4 py-2 rounded mb-4"
      >
        Add new chapter
      </button>

      <button className="bg-main text-white px-4 py-2 rounded mb-4 float-right">
        Sort chapter
      </button>

      <div className="clear-both space-y-4">
        {chapters.map((chapter) => (
          <div key={chapter.id} className="border rounded bg-white">
            <div className="flex justify-between bg-[#FEEFE9] p-3 items-center">
              <div className="font-semibold text-lg">{chapter.title}</div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => {
                      const dropdown = document.getElementById(`dropdown-${chapter.id}`);
                      dropdown.classList.toggle("hidden");
                    }}
                    className=" rounded"
                  >
                <Icon icon="mdi:add-bold" width="20" height="20" />
                  </button>
                  <div
                    id={`dropdown-${chapter.id}`}
                    className="absolute right-0 mt-2 w-40 bg-white border rounded shadow hidden z-10"
                  >
                    <button
                      onClick={() => {
                        setSelectedChapterId(chapter.id);
                        setEditMode(false);
                        setShowLessonModal(true);
                        document.getElementById(`dropdown-${chapter.id}`).classList.add("hidden");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Add Lesson
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Add Document</button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Add Quiz</button>
                  </div>
                </div>
                <button
                  onClick={() => editChapter(chapter)}
                  className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
                >
                    <Icon
                icon="la:edit-solid"
                width={18}
                height={18}
                style={{ color: "#fff" }}
              />
                </button>
                <button
                  onClick={() => deleteChapter(chapter.id)}
                  className="w-7 h-7 bg-red-600 flex justify-center items-center rounded"
                    >
                      <Icon
                  icon="mage:trash"
                  width={18}
                  height={18}
                  style={{ color: "#fff" }}
                />
                </button>
              </div>
            </div>

            <div className="mt-3 pl-4 text-gray-700 space-y-1">
              {chapter.lessons.map((lesson, idx) => (
                <div className="border-b border-[#ddd] p-3 flex justify-between" key={idx}>
                  <span>{lesson.title || lesson}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editLesson(chapter.id, lesson, idx)}
                      className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
                    >
                          <Icon
                icon="la:edit-solid"
                width={18}
                height={18}
                style={{ color: "#fff" }}
              />
                    </button>
                    <button
                      onClick={() => deleteLesson(chapter.id, idx)}
                      className="w-7 h-7 bg-red-600 flex justify-center items-center rounded"
                    >
                      <Icon
                  icon="mage:trash"
                  width={18}
                  height={18}
                  style={{ color: "#fff" }}
                />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showChapterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div ref={chapterModalRef} className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[60%]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Chapter Title <span className="text-red-500">*</span>
              </h3>
              <button
                onClick={() => {
                  setShowChapterModal(false);
                  setEditMode(false);
                  setNewChapterTitle("");
                }}
                className="text-gray-500 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <input
              type="text"
              value={newChapterTitle}
              onChange={(e) => setNewChapterTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
              placeholder="Enter chapter title"
            />
            <button
              onClick={addOrUpdateChapter}
              className="bg-main text-white px-4 py-2 rounded w-full hover:bg-opacity-90 duration-300"
            >
              {editMode ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}

      {showLessonModal && (
        <AddLessons
          lessonModalRef={lessonModalRef}
          setShowLessonModal={setShowLessonModal}
          addLesson={addOrUpdateLesson}
          editMode={editMode}
          defaultLesson={editMode && selectedChapterId !== null && selectedLessonIndex !== null ? chapters.find(ch => ch.id === selectedChapterId)?.lessons[selectedLessonIndex] : null}
          chapters={chapters}
          selectedChapterId={selectedChapterId}
        />
      )}
    </div>
  );
};

export default AddCourseContent;

