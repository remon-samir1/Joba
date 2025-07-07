import React, { useState, useEffect, useRef } from "react";
import StringSlice from "../../../../components/Helpers/StringSlice";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";
import { Axios } from "../../../../components/Helpers/Axios";

const AddLessons = ({
  lessonModalRef,
  setShowLessonModal,
  addLesson,
  setChange,
  editMode,
  defaultLesson,
  chapters,
  selectedChapterId,
  course_id,
  
}) => {
  const [lessonTitle, setLessonTitle] = useState(defaultLesson?.title || "");
  const [source, setSource] = useState("youtube");
  const [videoType, setVideoType] = useState("video");
  const [videoLink, setVideoLink] = useState(defaultLesson?.videoLink || "");
  const [videoFile, setVideoFile] = useState(null);
  const [preview ,SetPreview] = useState(0)
  const [chapterItem , setChapterItem] = useState()
  const [description, setDescription] = useState(defaultLesson?.description || "");
  const [duration, setDuration] = useState(defaultLesson?.lesson.duration || '' );
  const [selectedChapter, setSelectedChapter] = useState(
    selectedChapterId || (chapters.length > 0 ? chapters[0].id : "")
  );
  const pathRef = useRef(null);
  // console.log(videoFile);
console.log(preview);
  useEffect(() => {
    if (source === "upload") {
      setVideoType("video");
    } else {
      setVideoType("video");
    }
  }, [source]);
console.log(defaultLesson);
  useEffect(() => {
    if (defaultLesson) {
      setLessonTitle(defaultLesson?.title );
      setVideoLink(defaultLesson.lesson.file_path || "");
      setDescription(defaultLesson.lesson.description || "");
      setDuration(defaultLesson.lesson.duration || "");
      setChapterItem(defaultLesson.id)
    }
    if (selectedChapterId) setSelectedChapter(selectedChapterId);
  }, [defaultLesson, selectedChapterId]);

  const handleSubmit = () => {
    if (!lessonTitle.trim() || !duration.trim() || !selectedChapter || (!videoLink && source === "upload" && !videoFile)) return;

    const lessonData = new FormData();
if(editMode){

  lessonData.append("chapter_item_id", chapterItem);
}
    lessonData.append("type", "lesson");
    lessonData.append("course_id", +course_id);
    lessonData.append("chapter_id", selectedChapter);
    lessonData.append("title", lessonTitle.trim());
    lessonData.append("file_type", videoType);
    lessonData.append("source", source);
    lessonData.append("is_free", preview);
    lessonData.append("upload_path", videoFile); 
    lessonData.append("link_path", videoLink);
    lessonData.append("duration", duration.trim());
lessonData.append("description", description.trim());
console.log(selectedChapter);
  try{
    if(editMode){

      Axios.post('admin/course-chapter/lesson/update' , lessonData).then((data)=>{
      setChange(prev=>!prev)
      console.log(data);
      setShowLessonModal(false)
      })
    }else{
      
      Axios.post('admin/course-chapter/lesson/create' , lessonData).then((data)=>{
        setChange(prev=>!prev)
        console.log(data);
        setShowLessonModal(false)
      })
    }
  }catch(err){

  }

    setLessonTitle("");
    setVideoLink("");
    setVideoFile(null);
    setVideoType("video");
    setSource("youtube");
    setDescription("");
    setDuration("");
  };

  const getVideoTypeOptions = () => {
    if (source === "upload") {
      return (
        <>
          <option value="video">Video</option>
          <option value="file">File</option>
          <option value="other">Other</option>
        </>
      );
    }
    return <option value="video">Video</option>;
  };

  return (
    <div className="addLesson fixed inset-0 max-h-screen overflow-auto flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div ref={lessonModalRef} className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[70%]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textColor">
            Lesson Details <span className="text-red-500">*</span>
          </h3>
          <button onClick={() => setShowLessonModal(false)} className="text-gray-500 text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Chapter */}
        <label htmlFor="chapter" className="text-base font-semibold mb-1 block text-textColor">
          Chapter <span className="text-red-500">*</span>
        </label>
        <select
          id="chapter"
          className="w-full border outline-none rounded px-3 py-2 mb-4 bg-white text-text2"
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
        >
          {chapters.map((ch) => (
            <option key={ch.id} value={ch.id}>{ch.title}</option>
          ))}
        </select>

        {/* Title */}
        <label className="text-base font-semibold mb-1 block text-textColor">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
          placeholder="Title"
        />

        {/* Duration & Source */}
        <div className="flex items-center md:gap-8 flex-col md:flex-row">
          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
              placeholder="Duration"
            />
          </div>

          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              Source <span className="text-red-500">*</span>
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full outline-none border rounded px-3 py-2 mb-4 bg-white text-textColor"
            >
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="upload">Upload</option>
            </select>
          </div>
        </div>

        {/* Video Type & File/Link */}
        <div className="flex items-center md:gap-8 flex-col md:flex-row">
          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">Video Type</label>
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              className="w-full border outline-none rounded px-3 py-2 mb-4 bg-white text-textColor"
            >
              {getVideoTypeOptions()}
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              {source === "upload" ? "Choose File" : "Video Link"} <span className="text-red-500">*</span>
            </label>
            {source === "upload" ? (
              <div
                className="border rounded px-3 py-2 mb-4 bg-white cursor-pointer flex items-center justify-between text-textColor"
                onClick={() => pathRef.current.click()}
              >
                <span>Choose</span>
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
                className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
                placeholder="Enter video link"
              />
            )}
          </div>
        </div>

        {/* Description */}
        <label className="text-base font-semibold mb-1 block text-textColor">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main text-textColor"
          placeholder="Enter description"
        />
        <div className="pb-4">

 <ToggleButton title='Preview' setData={SetPreview}/>
        </div>
        {/* Submit */}
        <button onClick={handleSubmit} className="bg-main text-white px-4 py-2 rounded w-full">
          {editMode ? "Update Lesson" : "Add Lesson"}
        </button>
      </div>
    </div>
  );
};

export default AddLessons;
