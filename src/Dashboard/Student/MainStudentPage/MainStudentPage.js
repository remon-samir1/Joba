import React, { useState } from "react";
import "./MainStudentPage.css";
import award1 from "../../../images/award.svg";
import award2 from "../../../images/award2.svg";
import book from "../../../images/book.svg";
import MainPageCoursesPart from "./MainPageCoursesPart/MainPageCoursesPart";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";

const MainStudentPage = () => {
  const [data,setData]= useState() 
  //  get data
useEffect(()=>{
  Axios.get('/student/dashboard').then(data=>setData(data.data))
},[])
  const cardsData = [
    {
      img: award1,
      value: data?.completed_courses,
      title: "Compelete Courses",
      bg: "#F2F8FF",
    },
    {
      img: book,
      value: data?.ongoing_courses,
      title: "Ongoing Courses",
      bg: "#F0FEF9",
    },
    {
      img: award2,
      value: data?.advance_certificate,
      title: "Advance certificate",
      bg: "#F6F2FF",
    },
  ];
  return (
    <div className="MainStudentPage mt-8">
      <div className="overview">
        <h3 className="text-[1.1rem] text-textColor">Learning overview</h3>
        <div className="boxes flex items-center gap-4 mt-5 flex-col md:flex-row">
          {cardsData.map((data, index) => (
            <div
              key={index}
              style={{ background: data.bg }}
              className={`box flex w-full  items-center gap-4 py-16 md:py-0 !h-[105px] px-5 justify-center md:justify-start  rounded-xl flex-1 `}
            >
              <img src={data.img} alt="course" />
              <div className="text">
                <h4 className="text-textColor text-[1.4rem] font-bold">
                  {data.value}
                </h4>
                <p className="text-[1rem] text-text2 ">{data.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <MainPageCoursesPart/>
    </div>
  );
};

export default MainStudentPage;
