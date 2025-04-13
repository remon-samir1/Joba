import { useEffect, useState } from "react";
import { Axios } from "../Helpers/Axios";

export default function ToggleStatusButton(props) {
  const [isActive, setIsActive] = useState(true);
  useEffect(()=>{
    if(props.data == 1){
      setIsActive(true)
    }else{
      setIsActive(false)
    }
  },[])
  const handleUpdate = async()=>{
    setIsActive(!isActive)
    try{

    await Axios.put(`/admin/course-category/status-update/${props.id}`).then(data=>console.log(data))
  }catch(err){
console.log(err);
  }
  }

  return (
    <button

      onClick={handleUpdate}
      className={`relative w-28 h-10 rounded-md border-2 flex items-center px-1 transition-all duration-500
        ${isActive ? "bg-[#1CC340] border-[#4BBC9A]" : "bg-[#D70000] border-[#F94545]"}
      `}
    >
      <span
        className={`absolute w-4 h-8 bg-white rounded-sm transition-all !duration-700
          ${isActive ? "left-1" : "left-[83%]"}
        `}
      ></span>

      <span className="mx-auto text-white font-medium z-10">
        {isActive ? "Active" : "Inactive"}
      </span>
    </button>
  );
}
