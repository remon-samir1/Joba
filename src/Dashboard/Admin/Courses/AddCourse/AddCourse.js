
import React, { useRef, useState } from "react";
import "./Addcourse.css";
import StringSlice from '../../../../components/Helpers/StringSlice'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../../components/Helpers/Axios";
import AddCourseBasics from "./AddCourseBasics";
import AddCourseMoreInfo from "./AddCourseMoreInfo";

const AddCourse = () => {
  const [page , setPage] = useState('basic')

return (
  <div>

  <div className="flex items-center gap-12 mb-6">
  <button  onClick={()=>setPage('basic')} className={`text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'profile' && '!text-main !border-main'} `}>Basic Infos</button>
  <button onClick={()=>setPage('biography')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'biography' && '!text-main !border-main'} `}>More Infos</button>
  <button onClick={()=>setPage('location')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'location' && '!text-main !border-main'} `}>Course Contents</button>
  <button onClick={()=>setPage('password')} className={` text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'password' && '!text-main !border-main'} `}>Finish</button>
       </div>
  {/* <AddCourseBasics/> */}
  <AddCourseMoreInfo/>
  </div>
)
}

export default AddCourse;

