// import React, { useState, useEffect, useRef } from "react";
// import StringSlice from "../../../../components/Helpers/StringSlice";

// const AddLessons = ({
//   lessonModalRef,
//   setShowLessonModal,
//   addLesson,
//   editMode,
//   defaultLesson,
//   chapters,
//   selectedChapterId,
// }) => {
//   const [lessonTitle, setLessonTitle] = useState(defaultLesson?.title || "");
//   const [videoType, setVideoType] = useState(
//     defaultLesson?.videoType || "youtube"
//   );
//   const [videoLink, setVideoLink] = useState(defaultLesson?.videoLink || "");
//   const [videoFile, setVideoFile] = useState(null);
//   const [selectedChapter, setSelectedChapter] = useState(
//     selectedChapterId || (chapters.length > 0 ? chapters[0].id : "")
//   );
//   const videoRef = useRef();
//   const pathRef = useRef(null);

//   useEffect(() => {
//     if (defaultLesson) {
//       setLessonTitle(defaultLesson.title || "");
//       setVideoType(defaultLesson.videoType || "youtube");
//       setVideoLink(defaultLesson.videoLink || "");
//     }
//     if (selectedChapterId) setSelectedChapter(selectedChapterId);
//   }, [defaultLesson, selectedChapterId]);

//   const handleSubmit = () => {
//     if (!lessonTitle.trim()) return;
//     const lessonData = {
//       title: lessonTitle.trim(),
//       videoType,
//       videoLink: videoType === "local" ? videoFile : videoLink,
//     };
//     addLesson(lessonData, selectedChapter);
//     setLessonTitle("");
//     setVideoLink("");
//     setVideoFile(null);
//     setVideoType("youtube");
//   };

//   return (
//     <div className="addLesson fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
//       <div
//         ref={lessonModalRef}
//         className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[70%]"
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">
//             Lesson Details <span className="text-red-500">*</span>
//           </h3>
//           <button
//             onClick={() => setShowLessonModal(false)}
//             className="text-gray-500 text-xl font-bold"
//           >
//             &times;
//           </button>
//         </div>
//         <label htmlFor="chapter" className="text-base font-semibold">
//           Chapter <span className="text-red-500 my-3 inline-block">*</span>
//         </label>
//         <select
//           id="chapter"
//           className="w-full border rounded px-3 py-2 mb-4 bg-white text-text2"
//           value={selectedChapter}
//           onChange={(e) => setSelectedChapter(e.target.value)}
//         >
//           {chapters.map((ch) => (
//             <option key={ch.id} value={ch.id}>
//               {ch.title}
//             </option>
//           ))}
//         </select>
//         <div className="flex items-center md:gap-8 flex-col md:flex-row">
//           <div className="flex-1 w-full">
//             <label htmlFor="chapter" className="text-base font-semibold">
//               Title <span className="text-red-500 my-3 inline-block">*</span>
//             </label>
//             <input
//               type="text"
//               value={lessonTitle}
//               onChange={(e) => setLessonTitle(e.target.value)}
//               className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
//               placeholder="Title"
//             />
//           </div>
//           <div className="flex-1 w-full">
//             <label htmlFor="duration" className="text-base font-semibold">
//               Duration <span className="text-red-500 my-3 inline-block">*</span>
//             </label>
//             <input
//               type="text"
//               className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
//               placeholder="Duration"
//             />
//           </div>
//         </div>
//         <div className="flex items-center md:gap-8 flex-col md:flex-row">
//           <select
//             value={videoType}
//             onChange={(e) => setVideoType(e.target.value)}
//             className="w-full border rounded px-3 bg-white py-2 mb-4"
//           >
//             <option value="youtube">YouTube</option>
//             <option value="vimeo">Vimeo</option>
//             <option value="local">Local Upload</option>
//           </select>

//           {videoType === "local" ? (
            
//             <div className="input mb-4 w-full" onClick={() => pathRef.current.click()}>
//               <div>choose</div>
//               <p>{videoLink && StringSlice(videoLink.name, 12)}</p>
//               <input
//                 ref={pathRef}
//                 hidden
//                 accept="video/*"
//                 required
//                 type="file"
//                 id="path"
//                 onChange={(e) => setVideoLink(e.target.value)}
//               />
//             </div>
//           ) : (
//             <input
//               type="text"
//               value={videoLink}
//               onChange={(e) => setVideoLink(e.target.value)}
//               className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
//               placeholder="Enter video link"
//             />
//           )}
//         </div>
        
//         <div className="form-control ">
//         <label htmlFor="duration" className="text-base font-semibold">
//               Duration <span className="text-red-500 my-3 inline-block">*</span>
//             </label>
//           <textarea id="description" required 
//               className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
          
//           />
//         </div>
//         <button
//           onClick={handleSubmit}
//           className="bg-main text-white px-4 py-2 rounded w-full"
//         >
//           {editMode ? "Update Lesson" : "Add Lesson"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddLessons;



import React, { useState, useEffect, useRef } from "react";
import StringSlice from "../../../../components/Helpers/StringSlice";

const AddLessons = ({
  lessonModalRef,
  setShowLessonModal,
  addLesson,
  editMode,
  defaultLesson,
  chapters,
  selectedChapterId,
}) => {
  const [lessonTitle, setLessonTitle] = useState(defaultLesson?.title || "");
  const [videoType, setVideoType] = useState(defaultLesson?.videoType || "youtube");
  const [videoLink, setVideoLink] = useState(defaultLesson?.videoLink || "");
  const [videoFile, setVideoFile] = useState(null);
  const [description, setDescription] = useState(defaultLesson?.description || "");
  const [duration, setDuration] = useState(defaultLesson?.duration || "");
  const [selectedChapter, setSelectedChapter] = useState(
    selectedChapterId || (chapters.length > 0 ? chapters[0].id : "")
  );
  const pathRef = useRef(null);

  useEffect(() => {
    if (defaultLesson) {
      setLessonTitle(defaultLesson.title || "");
      setVideoType(defaultLesson.videoType || "youtube");
      setVideoLink(defaultLesson.videoLink || "");
      setDescription(defaultLesson.description || "");
      setDuration(defaultLesson.duration || "");
    }
    if (selectedChapterId) setSelectedChapter(selectedChapterId);
  }, [defaultLesson, selectedChapterId]);

  const handleSubmit = () => {
    if (!lessonTitle.trim() || !duration.trim() || !selectedChapter || (!videoLink && videoType !== "local") || (videoType === "local" && !videoFile)) return;

    const lessonData = {
      title: lessonTitle.trim(),
      videoType,
      videoLink: videoType === "local" ? videoFile : videoLink,
      duration: duration.trim(),
      description: description.trim(),
    };

    addLesson(lessonData, selectedChapter);
    setLessonTitle("");
    setVideoLink("");
    setVideoFile(null);
    setVideoType("youtube");
    setDescription("");
    setDuration("");
  };

  return (
    <div className="addLesson fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div
        ref={lessonModalRef}
        className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[70%]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            Lesson Details <span className="text-red-500">*</span>
          </h3>
          <button
            onClick={() => setShowLessonModal(false)}
            className="text-gray-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <label htmlFor="chapter" className="text-base font-semibold">
          Chapter <span className="text-red-500">*</span>
        </label>
        <select
          id="chapter"
          className="w-full border rounded px-3 py-2 mb-4 bg-white text-text2"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>
              {ch.title}
            </option>
          ))}
        </select>

        <div className="flex items-center md:gap-8 flex-col md:flex-row">
          <div className="flex-1 w-full">
            <label className="text-base font-semibold">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
              placeholder="Title"
            />
          </div>
          <div className="flex-1 w-full">
            <label className="text-base font-semibold">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
              placeholder="Duration"
            />
          </div>
        </div>

        <div className="flex items-center md:gap-8 flex-col md:flex-row">
          <select
            value={videoType}
            onChange={(e) => setVideoType(e.target.value)}
            className="w-full border rounded px-3 bg-white py-2 mb-4"
          >
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
            <option value="local">Local Upload</option>
          </select>

          {videoType === "local" ? (
            <div
              className="input mb-4 w-full"
              onClick={() => pathRef.current.click()}
            >
              <div>Choose</div>
              <p>{videoFile && StringSlice(videoFile.name, 12)}</p>
              <input
                ref={pathRef}
                hidden
                accept="video/*"
                type="file"
                id="path"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </div>
          ) : (
            <input
              type="text"
              required
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
              placeholder="Enter video link"
            />
          )}
        </div>

        <div className="form-control">
          <label className="text-base font-semibold">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
            placeholder="Enter description"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-main text-white px-4 py-2 rounded w-full"
        >
          {editMode ? "Update Lesson" : "Add Lesson"}
        </button>
      </div>
    </div>
  );
};

export default AddLessons;

