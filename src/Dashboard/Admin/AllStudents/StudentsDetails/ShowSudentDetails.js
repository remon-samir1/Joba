import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../components/Helpers/Axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Notifcation from "../../../../components/Notification";

const ShowSudentDetails = ({setLoading}) => {
const nav = useNavigate()
  function formatCustomDate(isoDateStr) {
    const date = new Date(isoDateStr);

    const day = date.getUTCDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getUTCMonth()]; 
    const year = date.getUTCFullYear(); 

    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; 

    return `${day} , ${month}${year} ${hours}:${minutes}${ampm}`;
}
  const {id} = useParams()
  const [student , setStudent] = useState([])
  useEffect(()=>{
    setLoading(true)
    Axios.get(`/admin/customer-show/${id}`).then(data=> {
      setStudent(data.data.data.user)
    
      setLoading(false)})
  },[])
  //student);

  // handle send verify link
  const handleSendVerifyLink = async()=>{
    setLoading(true)
try{
  await Axios.post(`/admin/send-verify-request/${id}`).then(data=>{
    toast.success(data.data.messege)
})
    setLoading(false)
}

catch(err){
  toast.error(err.message)
  setLoading(false)
}

  }
  // handle send verify link
  const handleSendMail = async()=>{
try{
  await Axios.post(`/admin/send-mial-to-customer/${id}`).then(data=>{
    toast.success(data.data.messege)
  })

}

catch(err){
  //err);
  toast.error(err.message)
}
  }
  // handle Delete
  const  handleDelete = async()=>{
    setLoading(true)
    try{
Axios.delete(`/admin/customer-delete/${id}`).then(data=>{
  //data)
 toast.error(data.data.messege)
 setLoading(false)
 if(data.data.messege === 'User deleted successfully'){
 toast.success(data.data.messege)
toast.success('User deleted successfully')
  nav(-1)
 }
})
    }catch(err){
//err);
setLoading(false)
    }
  }
  return (
    <div className="w-full md:w-[268px] bg-white rounded px-4 py-6 mb-8">
      <Notifcation/>
      <div className="flex justify-center gap-4 items-center flex-col w-full">
        <img
          src={`https://goba.sunmedagency.com${student?.image}`}
          className="w-[119px] h-[119px] rounded-circle"
          alt=""
        />

        <p className="text-base text-[#000000] font-semibold">
        {student?.name}
        </p>
      </div>
      <p className="text-base text-[#000000] font-semibold mt-4">
      {student?.email}

      </p>
      <p className="text-base text-[#000000] font-semibold mt-4">
        Joined at {formatCustomDate(student?.created_at)}
      </p>
      <p className="text-base text-[#000000] font-semibold mt-4 capitalize">Banned : {student?.is_banned}</p>
      <p className="text-base text-[#000000] font-semibold mt-4">
        Email verified : {student?.email_verified_at == null? "No" : 'Yes'}
      </p>
      <button onClick={handleSendVerifyLink} className="hover:bg-white hover:text-[#319F43]   duration-500 border border-[#319F43] text-white mt-6 w-full p-3 bg-[#319F43] text-sm rounded">
        Send verifiy link to mail
      </button>
      {/* <button onClick={handleSendMail} className="hover:bg-white hover:text-[#0048D3]  duration-500 border border-[#0048D3] text-white mt-3 w-full p-3 bg-[#0048D3] text-sm rounded">
        Send mail to user
      </button>
      <button className="hover:bg-white hover:text-[#F2A124]  duration-500 border border-[#F2A124] text-white mt-3 w-full p-3 bg-[#F2A124] text-sm rounded">
        Bann user
      </button> */}
      <button onClick={handleDelete} className="hover:bg-white hover:text-[#D70000]  duration-500 border border-[#D70000] text-white mt-3 w-full p-3 bg-[#D70000] text-sm rounded">
        Delete account
      </button>
    </div>
  );
};

export default ShowSudentDetails;
