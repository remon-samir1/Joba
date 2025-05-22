import { useEffect, useState } from "react";
import { Axios } from "../Helpers/Axios";
import { toast } from "react-toastify";

export default function ToggleStatusButton(props) {
  const [isActive, setIsActive] = useState(true);
  useEffect(()=>{
    if(props.data == 1 || props.data=='active'){
      setIsActive(true)
    }else{
      setIsActive(false)
    }
  },[])
  
  const handleUpdate = async()=>{
    setIsActive(!isActive)
    try{
      
      if(props.url === 'admin/course-category' || props.url === 'admin/course-level/'){
        await Axios.put(`/${props.url}/status-update/${props.id}`).then(data=>console.log(data))

      }else if(props.url === 'admin/course-review' ){
        await Axios.put(`/${props.url}/${props.id}`,{status : isActive}).then(data=>console.log(data))

      }
      
      else{
        await Axios.post(`/${props.url}/status-update/${props.id} `,{_method: 'PUT'}).then(data=>console.log(data))
     }
     toast.success('Status updated successfly')
  }catch(err){
console.log(err);
toast.error('Status not updated ')

  }
  }

  return (
    <button

      onClick={handleUpdate}
      className={` relative w-28 h-10 rounded-md border-2 flex items-center justify-center px-1 transition-all duration-500
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
