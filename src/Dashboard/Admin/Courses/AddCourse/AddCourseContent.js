import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import AddLessons from "./AddLessons";
import AddDocument from "./AddDocument";
import AddQuiz from "./AddQuiz";
import AddQuestion from "./AddQuestion";

import { Icon } from "@iconify-icon/react";
import { Axios } from "../../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../../components/Notification";
import SortChaptersModal from "./SortChaptersModal";
import { useParams } from "react-router-dom";

const AddCourseContent = ({ courseId, setCourseId, edit, slug }) => {
  const [chapters, setChapters] = useState([]);
  const [change, setChange] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);

  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [selectedQuestionForEdit, setSelectedQuestionForEdit] = useState(null);

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const chapterModalRef = useRef();
  const lessonModalRef = useRef();

  // Fetch chapters based on courseId or slug
  console.log(chapters);
  useEffect(() => {
    setLoading(true);
    if (edit && slug) {
      Axios.get(`course/${slug}`)
        .then((data) => {
          setChapters(data.data.course.chapters);
          if (data.data.course.id) {
            setCourseId(data.data.course.id);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching course by slug:", err);
          setLoading(false);
        });
    } else if (courseId) {
      Axios.get(`/admin/course-chapter/sorting/${courseId}`)
        .then((data) => {
          setChapters(data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching chapters by courseId:", err);
          setLoading(false);
        });
    }
  }, [change, courseId, edit, slug, setCourseId]); // Added dependencies

  // GSAP animations for modals
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

  // Add or update chapter function
  const addOrUpdateChapter = () => {
    if (!newChapterTitle.trim()) {
      toast.error("Chapter title cannot be empty.");
      return;
    }
    setLoading(true);
    if (editMode) {
      Axios.put(`admin/course-chapter/update/${selectedChapterId}`, {
        title: newChapterTitle.trim(),
      })
        .then(() => {
          toast.success("Chapter updated successfully!");
          setChange((prev) => !prev);
        })
        .catch((err) => {
          toast.error("Failed to update chapter.");
          console.error("Error updating chapter:", err);
        })
        .finally(() => setLoading(false));
    } else {
      Axios.post(`admin/course-chapter/${courseId}/store`, {
        title: newChapterTitle.trim(),
      })
        .then(() => {
          setChange((prev) => !prev);
          toast.success("Chapter created successfully!");
        })
        .catch((err) => {
          toast.error("Failed to create chapter.");
          console.error("Error creating chapter:", err);
        })
        .finally(() => setLoading(false));
    }
    setNewChapterTitle("");
    setEditMode(false);
    setSelectedChapterId(null);
    setShowChapterModal(false);
  };

  // Delete chapter function
  const deleteChapter = async (id) => {
    setLoading(true);
    try {
      await Axios.delete(`admin/course-chapter/delete/${id}`);
      setChange((prev) => !prev);
      toast.success("Chapter deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete chapter.");
      console.error("Error deleting chapter:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete lesson/document/quiz function
  const deleteChapterItem = async (id) => {
    try {
      setLoading(true);
      await Axios.delete(`admin/course-chapter/lesson/${id}/destroy`);
      setChange((prev) => !prev);
      toast.success("Item deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete item.");
      console.error("Error deleting lesson/document/quiz:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete question function (uses the API you provided)
  const deleteQuestion = async (questionId) => {
    try {
      setLoading(true);
      await Axios.delete(
        `https://goba.sunmedagency.com/api/admin/course-chapter/quiz-question/delete/${questionId}`
      );
      setChange((prev) => !prev);
      toast.success("Question deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete question.");
      console.error(
        "Error deleting question:",
        err.response ? err.response.data : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Edit chapter handler
  const editChapter = (chapter) => {
    setSelectedChapterId(chapter.id);
    setNewChapterTitle(chapter.title);
    setEditMode(true);
    setShowChapterModal(true);
  };

  // Edit lesson/document/quiz item handler
  const editChapterItem = (chapterId, item, type) => {
    setSelectedChapterId(chapterId);
    setSelectedLessonIndex(item.id); 
    setEditMode(true); 
    if (type === "lesson") {
      setShowLessonModal(true);
    } else if (type === "document") {
      setShowDocumentModal(true);
    } else if (type === "quiz") {
      setShowQuizModal(true);
    }
  };

  // Edit question handler (for AddQuestion component)
  const editQuestionHandler = (quizId, question) => {
    setCurrentQuizId(quizId);
    setSelectedQuestionForEdit(question);
    setShowQuestionModal(true);
  };

  const addQuestionHandler = (quizId) => {
    setCurrentQuizId(quizId);
    setSelectedQuestionForEdit(null);
    setShowQuestionModal(true);
  };

  return (
    <div className="p-4">
      <Notifcation />
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
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
      <button
        onClick={() => setShowSortModal(true)}
        className="bg-main text-white px-4 py-2 rounded mb-4 float-right"
      >
        Sort chapters
      </button>
      <div className="space-y-4">
        {chapters?.map((chapter) => (
          <div key={chapter.id} className="border rounded bg-white">
            <div className="flex justify-between bg-[#FEEFE9] p-3 items-center">
              <div className="font-semibold text-lg">{chapter.title}</div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button
                    onClick={() => {
                      const dropdown = document.getElementById(
                        `dropdown-${chapter.id}`
                      );
                      dropdown.classList.toggle("hidden");
                    }}
                    className="rounded"
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
                        document
                          .getElementById(`dropdown-${chapter.id}`)
                          .classList.add("hidden");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Add Lesson
                    </button>
                    <button
                      onClick={() => {
                        setSelectedChapterId(chapter.id);
                        setEditMode(false);
                        setShowDocumentModal(true);
                        document
                          .getElementById(`dropdown-${chapter.id}`)
                          .classList.add("hidden");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Add Document
                    </button>
                    <button
                      onClick={() => {
                        setSelectedChapterId(chapter.id);
                        setEditMode(false);
                        setShowQuizModal(true);
                        document
                          .getElementById(`dropdown-${chapter.id}`)
                          .classList.add("hidden");
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
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
              {chapter.chapter_items?.map((item, idx) => (
                <React.Fragment key={item.id || idx}>
                  <div className="border-b border-[#ddd] p-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="bg-black w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center ">
                        {item.type === "lesson" ? (
                          <Icon
                            icon="lucide:video"
                            width="18"
                            height="18"
                            className="text-white z-50"
                          />
                        ) : item.type === "document" ? (
                          <Icon
                            icon="basil:document-solid"
                            width="18"
                            height="18"
                            className="text-white z-50"
                          />
                        ) : (
                          <Icon
                            icon="material-symbols:quiz-outline"
                            width="18"
                            height="18"
                            className="text-white z-50"
                          />
                        )}
                      </div>
                      <span>
                        {item.title || (item.quiz && item.quiz.title)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {item.type === "quiz" && (
                        <div className="relative">
                          <button
                            onClick={() => {
                              const dropdown = document.getElementById(
                                `quiz-dropdown-${item.id}`
                              );
                              dropdown.classList.toggle("hidden");
                            }}
                            className="rounded"
                          >
                            <Icon icon="mdi:add-bold" width="20" height="20" />
                          </button>
                          <div
                            id={`quiz-dropdown-${item.id}`}
                            className="absolute right-0 mt-2 w-40 bg-white border rounded shadow hidden z-10"
                          >
                            <button
                              onClick={() => {
                                addQuestionHandler(item.quiz.id);
                                document
                                  .getElementById(`quiz-dropdown-${item.id}`)
                                  .classList.add("hidden");
                              }}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            >
                              Add Question
                            </button>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() =>
                          editChapterItem(chapter.id, item, item.type)
                        }
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
                        onClick={() => deleteChapterItem(item.id)}
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

                  {/* Render Quiz Questions if item is a quiz and has questions */}
                  {item.type === "quiz" && item.quiz?.questions?.length > 0 && (
                    <div className=" mt-2 space-y-1">
                      {item.quiz.questions.map((question, qIdx) => (
                        <div
                          key={question.id || qIdx}
                          className="border mx-auto my-3 w-[97%] shadow-md border-[#eee] p-3 flex justify-between items-center "
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-black w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center ">
                              <Icon
                                icon="healthicons:question-24px"
                                width="18"
                                height="18"
                                className="text-white z-50"
                              />
                            </div>
                            <span className="text-sm">{question.title}</span>
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={
                                () =>
                                  editQuestionHandler(item.quiz.id, question) 
                              }
                              className="w-6 h-6 bg-yellow-400 flex justify-center items-center rounded"
                            >
                              <Icon
                                icon="la:edit-solid"
                                width={16}
                                height={16}
                                style={{ color: "#fff" }}
                              />
                            </button>
                            <button
                              onClick={() => deleteQuestion(question.id)
                              }
                              className="w-6 h-6 bg-red-600 flex justify-center items-center rounded"
                            >
                              <Icon
                                icon="mage:trash"
                                width={16}
                                height={16}
                                style={{ color: "#fff" }}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </React.Fragment>
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
      {/* AddLessons Modal */}
      {showLessonModal && (
        <AddLessons
          course_id={courseId}
          lessonModalRef={lessonModalRef}
          setShowLessonModal={setShowLessonModal}
          setChange={setChange} 
          editMode={editMode}
          defaultLesson={
            editMode && selectedLessonIndex !== null
              ? chapters
                  .flatMap((ch) => ch.chapter_items)
                  .find(
                    (item) =>
                      item.id === selectedLessonIndex && item.type === "lesson"
                  )
              : null
          }
          chapters={chapters}
          selectedChapterId={selectedChapterId}
        />
      )}
      {/* AddDocument Modal */}
      {showDocumentModal && (
        <AddDocument
          setLoading={setLoading}
          course_id={courseId}
          chapters={chapters}
          chapterId={selectedChapterId}
          setShowDocumentModal={setShowDocumentModal}
          selectedChapterId={selectedChapterId}
          setChange={setChange}
          editMode={editMode}

          defaultDocument={
            editMode && selectedLessonIndex !== null
              ? chapters
                  .flatMap((ch) => ch.chapter_items)
                  .find(
                    (item) =>
                      item.id === selectedLessonIndex &&
                      item.type === "document"
                  )
              : null
          }
        />
      )}
      {/* AddQuiz Modal */}
      {showQuizModal && (
        <AddQuiz
          chapters={chapters}
          chapterId={selectedChapterId}
          courseId={courseId}
          setShowQuizModal={setShowQuizModal}
          selectedChapterId={selectedChapterId}
          setChange={setChange} 
          editMode={editMode}
          defaultQuiz={
            editMode && selectedLessonIndex !== null
              ? chapters
                  .flatMap((ch) => ch.chapter_items)
                  .find(
                    (item) =>
                      item.id === selectedLessonIndex && item.type === "quiz"
                  )
              : null
          }
        />
      )}
      {showQuestionModal && (
        <AddQuestion
          setShowQuestionModal={setShowQuestionModal}
          quizId={currentQuizId}
          setChange={setChange}
          initialData={selectedQuestionForEdit}
        />
      )}
      {showSortModal && (
        <SortChaptersModal
          chapters={chapters}
          courseId={courseId}
          setChange={setChange}
          setShowSortModal={setShowSortModal}
        />
      )}
    </div>
  );
};

export default AddCourseContent;
