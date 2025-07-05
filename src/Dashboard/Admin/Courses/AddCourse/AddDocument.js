import React, { useState, useEffect, useRef } from "react";
import { Axios } from "../../../../components/Helpers/Axios";

const AddDocument = ({
  documentModalRef,
  setShowDocumentModal,
  addDocument,
  editMode,
  defaultDocument,
  chapters,
  selectedChapterId,
  course_id,
  setChange,
  setEditMode,
  setLoading
}) => {
  const [title, setTitle] = useState(defaultDocument?.title || "");
  const [fileType, setFileType] = useState(defaultDocument?.file_type || "pdf");
  const [file, setFile] = useState(null);
  const [chapterItem , setChapterItem] = useState()

  const [description, setDescription] = useState(defaultDocument?.description || "");
  const [selectedChapter, setSelectedChapter] = useState(
    selectedChapterId || (chapters.length > 0 ? chapters[0].chapter_id : "")
  );
  const pathRef = useRef();

  useEffect(() => {
    if (defaultDocument) {
      setTitle(defaultDocument.title || "");
      setFileType(defaultDocument.lesson.file_type || "pdf");
      setDescription(defaultDocument.lesson.description || "");
      // file_path(defaultDocument.lesson.file_path  || "");
      setChapterItem(defaultDocument.id)
    }
    if (selectedChapterId) setSelectedChapter(selectedChapterId);
  }, [defaultDocument, selectedChapterId]);

  
  const handleSubmit =async () => {
    setShowDocumentModal(false)
    // if (!title.trim() || !file || !selectedChapter) return;
    setLoading(true)
    const formData = new FormData();
    if(editMode){

      formData.append("chapter_item_id", chapterItem);
    }
    formData.append("type", "document");
    formData.append("course_id", +course_id);
    formData.append("chapter_id", selectedChapter);
    formData.append("title", title.trim());
    formData.append("file_type", fileType);
    formData.append("upload_path", file); 
    formData.append("description", description.trim());
  

    setTitle("");
    setFile(null);
    setFileType("pdf");
    setDescription("");
    try{

      if(editMode){
        Axios.post(`/admin/course-chapter/lesson/update`, formData).then((res) => {
    console.log(res);
    setChange(prev=>!prev)
    setLoading(false)
  });
}else{

  Axios.post(`/admin/course-chapter/lesson/create`, formData).then((res) => {
    console.log(res);
    setChange(prev=>!prev)

  });
}
    setShowDocumentModal(false)
    setEditMode(false)
  }catch(err){
    console.log(err);
    setLoading(false)
  }
  }

  return (
    <div className="fixed inset-0 max-h-screen overflow-auto flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div
        ref={documentModalRef}
        className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[70%]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textColor">
            Add Document <span className="text-red-500">*</span>
          </h3>
          <button
            onClick={() => setShowDocumentModal(false)}
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
            <option key={ch.id} value={ch.id}>
              {ch.title}
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

        {/* File Path & Type */}
        <div className="flex items-center md:gap-8 flex-col md:flex-row">
          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              File Type <span className="text-red-500">*</span>
            </label>
            <select
              value={fileType}
              required
              onChange={(e) => setFileType(e.target.value)}
              className="w-full border outline-none rounded px-3 py-2 mb-4 bg-white text-textColor"
            >
              <option value="pdf">PDF</option>
              <option value="docx">Word</option>
              <option value="txt">Text File</option>
            </select>
          </div>

          <div className="flex-1 w-full">
            <label className="text-base font-semibold mb-1 block text-textColor">
              Path <span className="text-red-500">*</span>
            </label>
            <div
              className="border rounded px-3 py-2 mb-4 bg-white cursor-pointer flex items-center justify-between text-textColor"
              onClick={() => pathRef.current.click()}
            >
              <span>Choose</span>
              <p>{file && file.name}</p>
              <input
  ref={pathRef}
  hidden
  type="file"
  accept={
    fileType === "pdf"
      ? ".pdf"
      : fileType === "docx"
      ? ".doc,.docx,.odt"
      : fileType === "txt"
      ? ".txt"
      : "*"
  }
  onChange={(e) => {
    setFile(e.target.files[0]);
  }}
/>

            </div>
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

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="bg-main text-white px-4 py-2 rounded w-full"
        >
          {editMode ? "Update Document" : "Add Document"}
        </button>
      </div>
    </div>
  );
};

export default AddDocument;