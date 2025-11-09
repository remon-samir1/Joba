import { useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Axios } from "../../../components/Helpers/Axios";
import { useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";



export default function MyQuiz() {
  const { t, i18n } = useTranslation();

  const [quizes, setQuizes] = useState([]);
  const [loading , setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    Axios.get("/student/quiz-attempts").then((data) => {
      setQuizes(data.data.quizAttempts.data);
    setLoading(false)

      //data);
      //data.data.quizAttempts.data);
    });
  }, []);
  function formatDateTime(isoString) {
    const date = new Date(isoString);
  
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12; 
  
    const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
    return `${day}/${month}/${year} <br /> ${formattedTime}`;
  }
  

  
  //quizes);
  return (
    <div className="p-6">
          {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <div className="flex items-center justify-between">
        <h2 className="text-base text-textColor ">{t("My Quiz")}</h2>
        <Breadcrumbs />
      </div>
      <div className="overflow-x-scroll w-[80vw] md:w-full md:overflow-hidden">
        <div className=" rounded-lg md:w-full w-[100vw]">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4  mb-5 font-semibold text-text2 border-[#ddd] px-3 py-5  text-sm border-b">
            <div className=" col-span-3 md:col-span-4">{t("Item")}</div>
            <div className="col-span-3 md:col-span-2">{t("Status")}</div>
            <div className="col-span-3 md:col-span-2">{t("Date & Time")}</div>
            <div className="col-span-3 md:col-span-2">{t("Grade")}</div>
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
                <p className="text-text2 mt-2 text-[1.1rem]">{t("Quiz")}</p>
              </div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-1   rounded text-sm capitalize ${item.status === 'pass' ? 'bg-[#4BBC9A] bg-opacity-30 text-[#4C9D8D]' : 'bg-[#D70000] bg-opacity-20 text-[#F94545]'} text-${item.color}-700`}
                >
                  {t(item.status)}
                </span>
              </div>
              <div dangerouslySetInnerHTML={{__html:formatDateTime(item.created_at)}} className="col-span-2 text-gray-600">
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
