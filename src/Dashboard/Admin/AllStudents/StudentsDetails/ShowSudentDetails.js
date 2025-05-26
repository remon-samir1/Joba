import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../../../components/Helpers/Axios";
import { useState } from "react";

const ShowSudentDetails = () => {
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
    Axios.get('/users').then(data=> setStudent(data.data.filter(data => data.id == id)))
  },[])
  console.log(student);
  return (
    <div className="w-[268px] bg-white rounded px-4 py-6 mb-8">
      <div className="flex justify-center gap-4 items-center flex-col w-full">
        <img
          src={`https://goba.sunmedagency.com/${student[0]?.cover}`}
          className="w-[119px] h-[119px] rounded-circle"
          alt=""
        />

        <p className="text-base text-[#000000] font-semibold">
        {student[0]?.name}
        </p>
      </div>
      <p className="text-base text-[#000000] font-semibold mt-4">
      {student[0]?.email}

      </p>
      <p className="text-base text-[#000000] font-semibold mt-4">
        Joined at {formatCustomDate(student[0]?.created_at)}
      </p>
      <p className="text-base text-[#000000] font-semibold mt-4 capitalize">Banned : {student[0]?.is_banned}</p>
      <p className="text-base text-[#000000] font-semibold mt-4">
        Email verified : {student[0]?.email_verified_at == null? "No" : 'Yes'}
      </p>
      <button className="hover:bg-white hover:text-[#319F43]   duration-500 border border-[#319F43] text-white mt-6 w-full p-3 bg-[#319F43] text-sm rounded">
        Send verifiy link to mail
      </button>
      <button className="hover:bg-white hover:text-[#0048D3]  duration-500 border border-[#0048D3] text-white mt-3 w-full p-3 bg-[#0048D3] text-sm rounded">
        Send mail to user
      </button>
      <button className="hover:bg-white hover:text-[#F2A124]  duration-500 border border-[#F2A124] text-white mt-3 w-full p-3 bg-[#F2A124] text-sm rounded">
        Bann user
      </button>
      <button className="hover:bg-white hover:text-[#D70000]  duration-500 border border-[#D70000] text-white mt-3 w-full p-3 bg-[#D70000] text-sm rounded">
        Delete account
      </button>
    </div>
  );
};

export default ShowSudentDetails;
