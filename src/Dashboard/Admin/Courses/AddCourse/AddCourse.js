
import React, { useRef, useState } from "react";
import "./Addcourse.css";
import StringSlice from '../../../../components/Helpers/StringSlice'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../../components/Helpers/Axios";
import AddCourseBasics from "./AddCourseBasics";
import AddCourseMoreInfo from "./AddCourseMoreInfo";
import AddCourseContent from "./AddCourseContent";
import AddCourseFinish from "./AddCourseFinish";

const AddCourse = () => {
  const [page , setPage] = useState('basic')

return (
  <div>

  <div className="flex items-center gap-12 mb-6">
  <button  onClick={()=>setPage('basic')} className={`text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'basic' && '!text-main !border-main'} `}>Basic Infos</button>
  <button onClick={()=>setPage('more')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'more' && '!text-main !border-main'} `}>More Infos</button>
  <button onClick={()=>setPage('content')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'content' && '!text-main !border-main'} `}>Course Contents</button>
  <button onClick={()=>setPage('finish')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'finish' && '!text-main !border-main'} `}>Finish</button>
       </div>


       {
        page === 'basic' ? <AddCourseBasics/> : page === 'more' ? <AddCourseMoreInfo/> : page === 'content' ? <AddCourseContent/> : page === 'finish' && <AddCourseFinish/> 
      }


  </div>
)
}

export default AddCourse;

