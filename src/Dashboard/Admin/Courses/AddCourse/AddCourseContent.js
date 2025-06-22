import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import AddLessons from "./AddLessons";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../../../components/Helpers/Axios";

const AddCourseContent = ({courseId}) => {
  const [chapters, setChapters] = useState([]);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const chapterModalRef = useRef();
  const lessonModalRef = useRef();

  // useEffect(() => {
  //   Axios.get("/chapters").then((res) => setChapters(res.data));
  // }, []);

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
      console.log(selectedChapterId);
      Axios.put(`admin/course-chapter/update/${selectedChapterId}`, {
        title: newChapterTitle.trim(),
      }).then((data) => {
        console.log(data);
        setChapters((prev) =>
          prev.map((ch) =>
            ch.chapter_id === selectedChapterId
              ? { ...ch, chapter_name: newChapterTitle.trim() }
              : ch
          )
        );
      });
    } else {
      Axios.post(
        `admin/course-chapter/${courseId}/store
      `,
        { title: newChapterTitle.trim() }
      ).then((res) => {
        setChapters([...chapters, { ...res.data  , lessons: [] }]);
        console.log(res);
      });
    }
    setNewChapterTitle("");
    setEditMode(false);
    setSelectedChapterId(null);
    setShowChapterModal(false);
  };
console.log(chapters);
  const addOrUpdateLesson = (lessonData, chapterIdFromDropdown) => {
    const chapterId = chapterIdFromDropdown || selectedChapterId;
    if (editMode && selectedLessonIndex !== null) {
      Axios.put(
        `/chapters/${chapterId}/lessons/${lessonData.id}`,
        lessonData
      ).then(() => {
        setChapters((prev) =>
          prev.map((ch) => {
            if (ch.id !== chapterId) return ch;
            const updatedLessons = [...ch.lessons];
            updatedLessons[selectedLessonIndex] = lessonData;
            return { ...ch, lessons: updatedLessons };
          })
        );
      });
    } else {
      Axios.post(`/admin/course-chapter/lesson/create`, lessonData).then((res) => {
        console.log(res);
        setChapters((prev) =>
          prev.map((ch) =>
            ch.id === chapterId
              ? { ...ch, lessons: [...ch.lessons, res.data] }
              : ch
          )
        );
      });
    }
    setShowLessonModal(false);
    setEditMode(false);
    setSelectedLessonIndex(null);
    setSelectedChapterId(null);
  };

  const deleteChapter = (id) => {
    Axios.delete(`admin/course-chapter/delete/${id}`).then((data) => {
      setChapters((prev) => prev.filter((ch) => ch.chapter_id !== id));
      console.log(data);
    });
  };

  const deleteLesson = (chapterId, index) => {
    const lessonId = chapters.find((ch) => ch.id === chapterId)?.lessons[index]
      ?.id;
    if (!lessonId) return;
    Axios.delete(`/chapters/${chapterId}/lessons/${lessonId}`).then(() => {
      setChapters((prev) =>
        prev.map((ch) =>
          ch.id === chapterId
            ? { ...ch, lessons: ch.lessons.filter((_, i) => i !== index) }
            : ch
        )
      );
    });
  };

  const editChapter = (chapter) => {
    setSelectedChapterId(chapter.chapter_id);
    setNewChapterTitle(chapter.chapter_name);
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
          <div key={chapter.chapter_id} className="border rounded bg-white">
            <div className="flex justify-between bg-[#FEEFE9] p-3 items-center">
              <div className="font-semibold text-lg">{chapter.chapter_name }</div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => {
                      const dropdown = document.getElementById(
                        `dropdown-${chapter.chapter_id}`
                      );
                      dropdown.classList.toggle("hidden");
                    }}
                    className=" rounded"
                  >
                    <Icon icon="mdi:add-bold" width="20" height="20" />
                  </button>
                  <div
                    id={`dropdown-${chapter.chapter_id}`}
                    className="absolute right-0 mt-2 w-40 bg-white border rounded shadow hidden z-10"
                  >
                    <button
                      onClick={() => {
                        setSelectedChapterId(chapter.chapter_id);
                        setEditMode(false);
                        setShowLessonModal(true);
                        document
                          .getElementById(`dropdown-${chapter.chapter_id}`)
                          .classList.add("hidden");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Add Lesson
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Add Document
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Add Quiz
                    </button>
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
                  onClick={() => deleteChapter(chapter.chapter_id)}
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
                <div
                  className="border-b border-[#ddd] p-3 flex justify-between"
                  key={idx}
                >
                  <span>{lesson.title || lesson}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editLesson(chapter.chapter_id, lesson, idx)}
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
                      onClick={() => deleteLesson(chapter.chapter_id, idx)}
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
          <div
            ref={chapterModalRef}
            className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[60%]"
          >
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
              value={ newChapterTitle}
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
        course_id={courseId}
          lessonModalRef={lessonModalRef}
          setShowLessonModal={setShowLessonModal}
          addLesson={addOrUpdateLesson}
          editMode={editMode}
          defaultLesson={
            editMode &&
            selectedChapterId !== null &&
            selectedLessonIndex !== null
              ? chapters.find((ch) => ch.id === selectedChapterId)?.lessons[
                  selectedLessonIndex
                ]
              : null
          }
          chapters={chapters}
          selectedChapterId={selectedChapterId}
        />
      )}
    </div>
  );
};

export default AddCourseContent;
