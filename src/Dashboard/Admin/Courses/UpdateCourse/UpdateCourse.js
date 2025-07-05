import React, { useRef, useState } from "react";
import UpdateCourseBasics from "./UpdateCourseBasics";
import AddCourseMoreInfo from "../AddCourse/AddCourseMoreInfo";
import AddCourseContent from "../AddCourse/AddCourseContent";
import AddCourseFinish from "../AddCourse/AddCourseFinish";
import { useEffect } from "react";


const UpdateCourse = () => {
  const scrollRef = useRef(null);
  useEffect(()=>{
scrollRef.current.scrollIntoView()
  },[])

  const [page, setPage] = useState("basic");
  const [courseId, setCourseId] = useState();
  const [slug , setSlug] = useState('')
  const [edit, setEdit] = useState(true);
  return (
    <div ref={scrollRef}>
      <div className="flex items-center gap-12 mb-6">
        <button
          onClick={() => setPage("basic")}
          className={`text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${
            page === "basic" && "!text-main !border-main"
          } `}
        >
          Basic Infos
        </button>
        <button  onClick={()=>setPage( 'more')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'more' && '!text-main !border-main'} `}>More Infos</button>
  <button  onClick={()=>setPage('content')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'content' && '!text-main !border-main'} `}>Course Contents</button>
  <button  onClick={()=>setPage('finish')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'finish' && '!text-main !border-main'} `}>Finish</button>
      </div>

      {page === "basic" ? (
        <UpdateCourseBasics setCourseId={setCourseId} setPage={setPage} setSlug={setSlug} />
      ) : page === "more" ? (
        <AddCourseMoreInfo course_id={courseId} edit={true} slug={slug}   />
      ) : page === "content" ? (
        <AddCourseContent courseId={courseId} edit={true} slug={slug} setCourseId={setCourseId} />
      ) : (
        page === "finish" && <AddCourseFinish edit={true} slug={slug} />
      )}

      {/* <UpdateCourseBasics/> */}
      {/* <AddCourseMoreInfo /> */}
    </div>
  );
};

export default UpdateCourse;
