import { useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Axios } from "../../../components/Helpers/Axios";
import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";



export default function MyQuiz() {
  const [quizes, setQuizes] = useState([]);
  const [loading , setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    Axios.get("/student/quiz-attempts").then((data) => {
      setQuizes(data.data.quizAttempts.data);
    setLoading(false)

      console.log(data);
      console.log(data.data.quizAttempts.data);
    });
  }, []);
  console.log(quizes);
  return (
    <div className="p-6">
          {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-base text-textColor ">My Quiz </h2>
        <Breadcrumbs />
      </div>
      <div className="overflow-x-scroll w-[80vw] md:w-full md:overflow-hidden">
        <div className=" rounded-lg md:w-full w-[100vw]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4  mb-5 font-semibold text-text2 border-[#ddd] px-3 py-5  text-sm border-b">
            <div className=" col-span-3 md:col-span-4">Item</div>
            <div className="col-span-3 md:col-span-2">Status</div>
            <div className="col-span-3 md:col-span-2">Date & Time</div>
            <div className="col-span-3 md:col-span-2">Grade</div>
            <div className="col-span-3 md:col-span-2"></div>
          </div>

          {/* Data Rows */}
          {quizes?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 px-3 py-5 rounded-lg border-b text-sm items-center bg-white border border-[#dddd] "
            >
              <div className="col-span-4">
                <p className="text-main text-[1.05rem] w-[90%]">
                {item.quiz?.title}
                </p>
                <p className="text-text2 mt-2 text-[1.1rem]">Quiz</p>
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1   rounded text-sm capitalize ${item.status === 'pass' ? 'bg-[#4BBC9A] bg-opacity-30 text-[#4C9D8D]' : 'bg-[#D70000] bg-opacity-20 text-[#F94545]'} text-${item.color}-700`}
                >
                  {item.status}
                </span>
              </div>
              <div className="col-span-2 text-gray-600">
                1/3/2025 <br /> 11:00 AM
              </div>
              <div className="col-span-2 font-semibold text-gray-800">
                {item.user_grade}
              </div>
              <Link to={`/student/quiz-result/${item.id}`} className="bg-main col-span-2 cursor-pointer flex justify-center items-center rounded-full w-[40px] h-[40px]">
              <Icon icon="ep:view" width="18" height="18"  style={{color: '#fff'}} />
              </Link>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
