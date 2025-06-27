// import React, { useState, useEffect, useRef } from "react";
// import gsap from "gsap";
// import AddLessons from "./AddLessons";
// import AddDocument from "./AddDocument";
// import AddQuiz from "./AddQuiz";
// import AddQuestion from "./AddQuestion";

// import { Icon } from "@iconify-icon/react";
// import { Axios } from "../../../../components/Helpers/Axios";
// import { toast } from "react-toastify";
// import Notifcation from "../../../../components/Notification";

// const AddCourseContent = ({ courseId }) => {
//   const [chapters, setChapters] = useState([]);
//   const [change, setChange] = useState(false);
//   const [showChapterModal, setShowChapterModal] = useState(false);
//   const [showLessonModal, setShowLessonModal] = useState(false);
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [showQuestionModal, setShowQuestionModal] = useState(false);

//   const [quizId, setQuizId] = useState();
//   const [showQuizModal, setShowQuizModal] = useState(false);
//   const [newChapterTitle, setNewChapterTitle] = useState("");
//   const [selectedChapterId, setSelectedChapterId] = useState(null);
//   const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [laoding, setLoading] = useState(false);

//   const chapterModalRef = useRef();
//   const lessonModalRef = useRef();

//   useEffect(() => {
//     setLoading(true);
//     Axios.get(`/admin/course-chapter/sorting/${courseId}`).then((data) => {
//       setChapters(data.data);
//       setLoading(false);
//       console.log(data);
//     });
//   }, [change]);

//   useEffect(() => {
//     if (showChapterModal && chapterModalRef.current) {
//       gsap.fromTo(
//         chapterModalRef.current,
//         { y: -100, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
//       );
//     }
//     if (showLessonModal && lessonModalRef.current) {
//       gsap.fromTo(
//         lessonModalRef.current,
//         { y: -100, opacity: 0 },
//         { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
//       );
//     }
//   }, [showChapterModal, showLessonModal]);

//   const addOrUpdateChapter = () => {
//     if (!newChapterTitle.trim()) return;
//     if (editMode) {
//       Axios.put(`admin/course-chapter/update/${selectedChapterId}`, {
//         title: newChapterTitle.trim(),
//       }).then((data) => {
//         toast.success("updated Successfully");
//         setChapters((prev) =>
//           prev.map((ch) =>
//             ch.id === selectedChapterId
//               ? { ...ch, title: newChapterTitle.trim() }
//               : ch
//           )
//         );
//       });
//     } else {
//       setLoading(true);
//       Axios.post(`admin/course-chapter/${courseId}/store`, {
//         title: newChapterTitle.trim(),
//       }).then(() => {
//         setChange((prev) => !prev);
//         setLoading(false);
//       });
//     }
//     setNewChapterTitle("");
//     setEditMode(false);
//     setSelectedChapterId(null);
//     setShowChapterModal(false);
//   };

//   const addOrUpdateLesson = (lessonData, chapterIdFromDropdown) => {
//     const chapterId = chapterIdFromDropdown || selectedChapterId;
//     setLoading(true);
//     try {
//       if (editMode && selectedLessonIndex !== null) {
//         Axios.post(`admin/course-chapter/lesson/update`, lessonData).then(
//           () => {
//             setChange((prev) => !prev);
//             setLoading(false);
//           }
//         );
//       } else {
//         Axios.post(`/admin/course-chapter/lesson/create`, lessonData).then(
//           () => {
//             setChange((prev) => !prev);
//             setLoading(false);
//           }
//         );
//       }
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       // toast.error(err.data.messege)
//     }

//     setShowLessonModal(false);
//     setEditMode(false);
//     setSelectedLessonIndex(null);
//     setSelectedChapterId(null);
//   };

//   const deleteChapter = (id) => {
//     setLoading(true);
//     Axios.delete(`admin/course-chapter/delete/${id}`).then(() => {
//       setChange((prev) => !prev);
//       setLoading(false);
//       setChapters((prev) => prev.filter((ch) => ch.id !== id));
//     });
//   };

//   const deleteLesson = async (id) => {
//     try {
//       await Axios.delete(`admin/course-chapter/lesson/${id}/destroy`).then(
//         () => {
//           setChange((prev) => !prev);
//         }
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const editChapter = (chapter) => {
//     setSelectedChapterId(chapter.id);
//     setNewChapterTitle(chapter.title);
//     setEditMode(true);
//     setShowChapterModal(true);
//   };

//   const editLesson = (chapterId, lesson, type) => {
//     setSelectedChapterId(chapterId);
//     setSelectedLessonIndex(lesson.id);
//     setEditMode(true);
//     if (type === "lesson") {
//       setShowLessonModal(true);
//     } else if (type === "document") {
//       setShowDocumentModal(true);
//     } else {
//       setShowQuizModal(true);
//     }
//   };

//   return (
//     <div className="p-4">
//       <Notifcation />
//       {laoding && (
//         <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0"></div>
//       )}

//       <button
//         onClick={() => {
//           setEditMode(false);
//           setNewChapterTitle("");
//           setShowChapterModal(true);
//         }}
//         className="bg-main text-white px-4 py-2 rounded mb-4"
//       >
//         Add new chapter
//       </button>

//       <button className="bg-main text-white px-4 py-2 rounded mb-4 float-right">
//         Sort chapter
//       </button>

//       <div className="space-y-4">
//         {chapters?.map((chapter) => (
//           <div key={chapter.id} className="border rounded bg-white">
//             <div className="flex justify-between bg-[#FEEFE9] p-3 items-center">
//               <div className="font-semibold text-lg">{chapter.title}</div>
//               <div className="flex items-center gap-2">
//                 <div className="relative">
//                   <button
//                     onClick={() => {
//                       const dropdown = document.getElementById(
//                         `dropdown-${chapter.id}`
//                       );
//                       dropdown.classList.toggle("hidden");
//                     }}
//                     className="rounded"
//                   >
//                     <Icon icon="mdi:add-bold" width="20" height="20" />
//                   </button>
//                   <div
//                     id={`dropdown-${chapter.id}`}
//                     className="absolute right-0 mt-2 w-40 bg-white border rounded shadow hidden z-10"
//                   >
//                     <button
//                       onClick={() => {
//                         setSelectedChapterId(chapter.id);
//                         setEditMode(false);
//                         setShowLessonModal(true);
//                         document
//                           .getElementById(`dropdown-${chapter.id}`)
//                           .classList.add("hidden");
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Add Lesson
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedChapterId(chapter.id);
//                         setShowDocumentModal(true);
//                         document
//                           .getElementById(`dropdown-${chapter.id}`)
//                           .classList.add("hidden");
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Add Document
//                     </button>
//                     <button
//                       onClick={() => {
//                         setSelectedChapterId(chapter.id);
//                         setShowQuizModal(true);
//                         document
//                           .getElementById(`dropdown-${chapter.id}`)
//                           .classList.add("hidden");
//                       }}
//                       className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                     >
//                       Add Quiz
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => editChapter(chapter)}
//                   className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
//                 >
//                   <Icon
//                     icon="la:edit-solid"
//                     width={18}
//                     height={18}
//                     style={{ color: "#fff" }}
//                   />
//                 </button>
//                 <button
//                   onClick={() => deleteChapter(chapter.id)}
//                   className="w-7 h-7 bg-red-600 flex justify-center items-center rounded"
//                 >
//                   <Icon
//                     icon="mage:trash"
//                     width={18}
//                     height={18}
//                     style={{ color: "#fff" }}
//                   />
//                 </button>
//               </div>
//             </div>

//             <div className="mt-3 pl-4 text-gray-700 space-y-1">
//               {chapter.chapter_items?.map((lesson, idx) => (
//                 <div
//                   className="border-b border-[#ddd] p-3 flex justify-between"
//                   key={idx}
//                 >
//                   <div>
//                     <div className="flex  items-center gap-4">
//                       <div className="bg-black w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center ">
//                         {lesson.type == "lesson" ? (
//                           <Icon
//                             icon="lucide:video"
//                             width="18"
//                             height="18"
//                             className="text-white z-50"
//                           />
//                         ) : lesson.type === "document" ? (
//                           <Icon
//                             icon="basil:document-solid"
//                             width="18"
//                             height="18"
//                             className="text-white z-50"
//                           />
//                         ) : (
//                           <Icon
//                             icon="material-symbols:quiz-outline"
//                             width="18"
//                             height="18"
//                             className="text-white z-50"
//                           />
//                         )}
//                       </div>
//                       <span>
//                         {lesson.lesson ? lesson.title : lesson.quiz.title}
//                       </span>
//                       {/*  */}{" "}
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     {lesson.type === "quiz" ? (
//                       <>
//                         <div className="relative">
//                           <button
//                             onClick={() => {
//                               const dropdown = document.getElementById(
//                                 `quiz-dropdown-${lesson.id}`
//                               );
//                               dropdown.classList.toggle("hidden");
//                             }}
//                             className="rounded"
//                           >
//                             <Icon icon="mdi:add-bold" width="20" height="20" />
//                           </button>
//                           <div
//                             id={`quiz-dropdown-${lesson.id}`}
//                             className="absolute right-0 mt-2 w-40 bg-white border rounded shadow hidden z-10"
//                           >
//                             <button
//                               onClick={() => {
//                                 setShowQuestionModal(true);
//                                 setQuizId(lesson.quiz.id);
//                                 document
//                                   .getElementById(`quiz-dropdown-${lesson.id}`)
//                                   .classList.add("hidden");
//                               }}
//                               className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                             >
//                               Add Question
//                             </button>
//                           </div>
//                         </div>
                      
//                         {lesson.quiz.questions?.map((data, index) =>{
// console.log("Quiz Questions: ", lesson.quiz.questions);

                          
//                           return (
//                           <div    key={data.id || index}  className="border-b  border-[#ddd] p-3 flex justify-between">
//                             <div className="flex  items-center gap-4">
//                               <div className="bg-black w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center ">
//                                 <Icon
//                                   icon="material-symbols:quiz-outline"
//                                   width="18"
//                                   height="18"
//                                   className="text-white z-50"
//                                 />
//                               </div>
//                               <span>{data.title}</span>
//                             </div>

//                             <div className="flex">
//                               <button
//                                 // onClick={() =>
//                                 // editLesson( data, data.type)
//                                 // }
//                                 className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
//                               >
//                                 <Icon
//                                   icon="la:edit-solid"
//                                   width={18}
//                                   height={18}
//                                   style={{ color: "#fff" }}
//                                 />
//                               </button>
//                               <button
//                                 // onClick={() => deleteLesson(lesson.id)}
//                                 className="w-7 h-7 bg-red-600 flex justify-center items-center rounded"
//                               >
//                                 <Icon
//                                   icon="mage:trash"
//                                   width={18}
//                                   height={18}
//                                   style={{ color: "#fff" }}
//                                 />
//                               </button>
//                             </div>
//                           </div>
//                         )
//                       }
//                         )}
//                       </>
//                     ) : (
//                       ""
//                     )}
//                     <button
//                       onClick={() =>
//                         editLesson(chapter.id, lesson, lesson.type)
//                       }
//                       className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
//                     >
//                       <Icon
//                         icon="la:edit-solid"
//                         width={18}
//                         height={18}
//                         style={{ color: "#fff" }}
//                       />
//                     </button>
//                     <button
//                       onClick={() => deleteLesson(lesson.id)}
//                       className="w-7 h-7 bg-red-600 flex justify-center items-center rounded"
//                     >
//                       <Icon
//                         icon="mage:trash"
//                         width={18}
//                         height={18}
//                         style={{ color: "#fff" }}
//                       />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {showChapterModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
//           <div
//             ref={chapterModalRef}
//             className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[60%]"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">
//                 Chapter Title <span className="text-red-500">*</span>
//               </h3>
//               <button
//                 onClick={() => {
//                   setShowChapterModal(false);
//                   setEditMode(false);
//                   setNewChapterTitle("");
//                 }}
//                 className="text-gray-500 text-xl font-bold"
//               >
//                 &times;
//               </button>
//             </div>
//             <input
//               type="text"
//               value={newChapterTitle}
//               onChange={(e) => setNewChapterTitle(e.target.value)}
//               className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
//               placeholder="Enter chapter title"
//             />
//             <button
//               onClick={addOrUpdateChapter}
//               className="bg-main text-white px-4 py-2 rounded w-full hover:bg-opacity-90 duration-300"
//             >
//               {editMode ? "Update" : "Create"}
//             </button>
//           </div>
//         </div>
//       )}

//       {showLessonModal && (
//         <AddLessons
//           course_id={courseId}
//           lessonModalRef={lessonModalRef}
//           setShowLessonModal={setShowLessonModal}
//           addLesson={addOrUpdateLesson}
//           editMode={editMode}
//           defaultLesson={
//             editMode && selectedLessonIndex !== null
//               ? chapters
//                   .flatMap((ch) => ch.chapter_items)
//                   .find((lesson) => lesson.id === selectedLessonIndex)
//               : null
//           }
//           chapters={chapters}
//           selectedChapterId={selectedChapterId}
//         />
//       )}

//       {showDocumentModal && (
//         <AddDocument
//           course_id={courseId}
//           chapters={chapters}
//           chapterId={selectedChapterId}
//           courseId={courseId}
//           setShowDocumentModal={setShowDocumentModal}
//           selectedChapterId={selectedChapterId}
//           setChange={setChange}
//           editMode={editMode}
//           setEditMode={setEditMode}
//           defaultDocument={
//             editMode && selectedLessonIndex !== null
//               ? chapters
//                   .flatMap((ch) => ch.chapter_items)
//                   .find((lesson) => lesson.id === selectedLessonIndex)
//               : null
//           }
//         />
//       )}

//       {showQuizModal && (
//         <AddQuiz
//           chapters={chapters}
//           chapterId={selectedChapterId}
//           courseId={courseId}
//           setShowQuizModal={setShowQuizModal}
//           selectedChapterId={selectedChapterId}
//           setChange={setChange}
//           editMode={editMode}
//           setEditMode={setEditMode}
//           defaultQuiz={
//             editMode && selectedLessonIndex !== null
//               ? chapters
//                   .flatMap((ch) => ch.chapter_items)
//                   .find((lesson) => lesson.id === selectedLessonIndex)
//               : null
//           }
//         />
//       )}
//       {showQuestionModal && (
//         <AddQuestion
//           setShowQuestionModal={setShowQuestionModal}
//           quizId={quizId}
//           setChange={setChange}
//         />
//       )}
//     </div>
//   );
// };

// export default AddCourseContent;





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

const AddCourseContent = ({ courseId }) => {
  const [chapters, setChapters] = useState([]);
  const [change, setChange] = useState(false);
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);

  const [quizId, setQuizId] = useState();
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [laoding, setLoading] = useState(false);

  const chapterModalRef = useRef();
  const lessonModalRef = useRef();

  useEffect(() => {
    setLoading(true);
    Axios.get(`/admin/course-chapter/sorting/${courseId}`).then((data) => {
      setChapters(data.data);
      setLoading(false);
    });
  }, [change]);

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
      Axios.put(`admin/course-chapter/update/${selectedChapterId}`, {
        title: newChapterTitle.trim(),
      }).then(() => {
        toast.success("updated Successfully");
        setChapters((prev) =>
          prev.map((ch) =>
            ch.id === selectedChapterId
              ? { ...ch, title: newChapterTitle.trim() }
              : ch
          )
        );
      });
    } else {
      setLoading(true);
      Axios.post(`admin/course-chapter/${courseId}/store`, {
        title: newChapterTitle.trim(),
      }).then(() => {
        setChange((prev) => !prev);
        setLoading(false);
      });
    }
    setNewChapterTitle("");
    setEditMode(false);
    setSelectedChapterId(null);
    setShowChapterModal(false);
  };

  const addOrUpdateLesson = (lessonData, chapterIdFromDropdown) => {
    const chapterId = chapterIdFromDropdown || selectedChapterId;
    setLoading(true);
    try {
      if (editMode && selectedLessonIndex !== null) {
        Axios.post(`admin/course-chapter/lesson/update`, lessonData).then(() => {
          setChange((prev) => !prev);
          setLoading(false);
        });
      } else {
        Axios.post(`/admin/course-chapter/lesson/create`, lessonData).then(() => {
          setChange((prev) => !prev);
          setLoading(false);
        });
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }

    setShowLessonModal(false);
    setEditMode(false);
    setSelectedLessonIndex(null);
    setSelectedChapterId(null);
  };

  const deleteChapter = (id) => {
    setLoading(true);
    Axios.delete(`admin/course-chapter/delete/${id}`).then(() => {
      setChange((prev) => !prev);
      setLoading(false);
      setChapters((prev) => prev.filter((ch) => ch.id !== id));
    });
  };

  const deleteLesson = async (id) => {
    try {
      await Axios.delete(`admin/course-chapter/lesson/${id}/destroy`).then(() => {
        setChange((prev) => !prev);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editChapter = (chapter) => {
    setSelectedChapterId(chapter.id);
    setNewChapterTitle(chapter.title);
    setEditMode(true);
    setShowChapterModal(true);
  };

  const editLesson = (chapterId, lesson, type) => {
    setSelectedChapterId(chapterId);
    setSelectedLessonIndex(lesson.id);
    setEditMode(true);
    if (type === "lesson") setShowLessonModal(true);
    else if (type === "document") setShowDocumentModal(true);
    else setShowQuizModal(true);
  };

  return (
    <div className="p-4">
      <Notifcation />
      {laoding && <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0"></div>}

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

      <div className="space-y-4">
        {chapters?.map((chapter) => {
          const mergedItems = [
            ...chapter.chapter_items,
            ...chapter.chapter_items
              .filter((item) => item.type === "quiz" && item.quiz?.questions)
              .flatMap((item) =>
                item.quiz.questions.map((q) => ({
                  ...q,
                  type: "question",
                  parentQuizId: item.quiz.id,
                }))
              ),
          ];

          return (
            <div key={chapter.id} className="border rounded bg-white">
              <div className="flex justify-between bg-[#FEEFE9] p-3 items-center">
                <div className="font-semibold text-lg">{chapter.title}</div>
              </div>

              <div className="mt-3 pl-4 text-gray-700 space-y-1">
                {mergedItems.map((item, idx) => {
                  if (item.type === "question") {
                    return (
                      <div key={item.id || idx} className="border-b border-[#ddd] p-3 flex justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-black w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center ">
                            <Icon icon="material-symbols:quiz-outline" width="18" height="18" className="text-white z-50" />
                          </div>
                          <span>{item.title}</span>
                        </div>
                        <div className="flex">
                          <button className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded">
                            <Icon icon="la:edit-solid" width={18} height={18} style={{ color: "#fff" }} />
                          </button>
                          <button className="w-7 h-7 bg-red-600 flex justify-center items-center rounded">
                            <Icon icon="mage:trash" width={18} height={18} style={{ color: "#fff" }} />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={item.id || idx} className="border-b border-[#ddd] p-3 flex justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-black w-[2.5rem] h-[2.5rem] rounded-full flex justify-center items-center ">
                          <Icon
                            icon={
                              item.type === "lesson"
                                ? "lucide:video"
                                : item.type === "document"
                                ? "basil:document-solid"
                                : "material-symbols:quiz-outline"
                            }
                            width="18"
                            height="18"
                            className="text-white z-50"
                          />
                        </div>
                        <span>{item.lesson ? item.title : item.quiz?.title}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editLesson(chapter.id, item, item.type)}
                          className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
                        >
                          <Icon icon="la:edit-solid" width={18} height={18} style={{ color: "#fff" }} />
                        </button>
                        <button
                          onClick={() => deleteLesson(item.id)}
                          className="w-7 h-7 bg-red-600 flex justify-center items-center rounded"
                        >
                          <Icon icon="mage:trash" width={18} height={18} style={{ color: "#fff" }} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddCourseContent;
