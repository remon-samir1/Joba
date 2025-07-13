import { Icon } from '@iconify-icon/react';
import React from 'react';
import { formatDuration } from '../../../components/FormatDuration/FormatDuration';
import { Axios } from '../../../components/Helpers/Axios';
import { toast } from 'react-toastify';
import Notifcation from '../../../components/Notification';
import { useState } from 'react';
import { useContext } from 'react';
import { CartCh } from '../../../Context/CartContext';

const SideDetails = (props) => {
  function countQuizItems(course) {
    let count = 0;
  
    if (!course?.chapters?.length) return 0;
  
    course.chapters.forEach((chapter) => {
      if (!chapter?.chapter_items?.length) return;
  
      chapter.chapter_items.forEach((item) => {
        if (item.type === "quiz" || item.quiz?.type === "quiz") {
          count++;
        }
      });
    });
  
    return count;
  }
  
  //  handle add to cart
  const [loading , setLoading] = useState(false)
  const cartch = useContext(CartCh)
  const  cartChange = cartch.cartChange
  const  setCartChange = cartch.setCartChange

  const addToCart = async(id)=>{
    setLoading(true)
    try{
      Axios.post(`/add-to-cart/${id}`).then(data=>{
        toast.success(data.data.message)
        setLoading(false)
        setCartChange(prev=>!prev)
        console.log(data)})

    }catch(err){
      console.log(err);
      setLoading(false)

      toast.success(err.message)

    }
  }
  return (
    <div className="md:w-[340px] w-full
     bg-white rounded-xl p-3">
      <Notifcation/>
          <div className="w-full bg-main rounded-xl px-4 py-6">
            <p className="text-white text-[1.3rem] capitalize">
              {" "}
              This course Free :
            </p>
            <p className="text-white font-bold text-[1.5rem] mt-4">{props.price} EGP</p>
          </div>
          <p className="text-textColor text-[1.3rem] mt-4">Course includes :</p>
          <div className="flex items-center gap-2 text-textColor mt-4">
            <Icon
              className="text-textColor"
              icon="carbon:skill-level"
              width="24"
              height="24"
            />
            <span
              style={{ letterSpacing: "1px" }}
              className="text-textColor text-[1.2rem] font-semibold"
            >
              Level
            </span>
          </div>
          <div className="flex mt-1 items-center  gap-3 flex-wrap border-b border-[#dddd] py-3">
            {
              props.levels?.map((data ,index)=>(
            <p className="text-[0.9rem] text-white bg-main px-5 py-1 rounded capitalize">
              {data.level.name.name}
            </p>

              ))
            }
          
          </div>

          <div className="flex justify-between items-center py-3 border-b border-[#ddd]">
            <div className="flex items-center gap-2">
              <Icon
                className="text-textColor"
                icon="mingcute:time-duration-line"
                width="24"
                height="24"
              />
              <span className="text-textColor text-[1.1rem] font-semibold">
                Duraion
              </span>
            </div>
            <p className="text-[0.9rem] text-textColor">{formatDuration(props.duration)}</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[#ddd]">
            <div className="flex items-center gap-2">
              <Icon
                className="text-textColor"
                icon="ic:outline-play-lesson" 
                width="24"
                height="24"
              />
              <span className="text-textColor text-[1.1rem] font-semibold">
                Lessons
              </span>
            </div>
            <p className="text-[0.9rem] text-textColor">{props.lessons}</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[#ddd]">
            <div className="flex items-center gap-2">
              <Icon
                className="text-textColor"
                icon="material-symbols:quiz-outline-rounded"
                width="24"
                height="24"
              />
              <span className="text-textColor text-[1.1rem] font-semibold">
                Quizes
              </span>
            </div>
            <p className="text-[0.9rem] text-textColor">{countQuizItems(props.chapters)}</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[#ddd]">
            <div className="flex items-center gap-2">
              <Icon
                className="text-textColor"
                icon="lineicons:certificate-badge-1"
                width="24"
                height="24"
              />
              <span className="text-textColor text-[1.1rem] font-semibold">
                Certification
              </span>
            </div>
            <p className="text-[0.9rem] text-textColor">{props.certificate == 0 ? 'No' : 'Yes'}</p>
          </div>
          <div className="flex justify-center  items-center gap-3 py-3 border-b border-[#ddd]">
            <div className="flex items-center gap-2">
              <Icon
                className="text-textColor"
                icon="clarity:language-line" 
                width="24"
                height="24"
              />
              <span className="text-textColor text-[1.1rem] font-semibold">
                Language
              </span>
            </div>
            <div className="flex flex-wrap items-start gap-3">

            {
              props.languages?.map((data,index)=>(
            <p className="text-[0.9rem] text-white bg-main px-5 py-1 rounded capitalize">
              {data.language.name}
            </p>

              ))
            }
            </div>
          </div>

          <p className="text-textColor text-[1.2rem] font-semibold mt-4">Share this course:</p>
          <div className="flex items-center gap-3 mt-5">
           <div className="rounded-full w-[40px] h-[40px]  bg-main flex justify-center items-center cursor-pointer border border-main  hover:bg-transparent duration-500">
           <Icon className="text-white hover:text-main duration-300" icon="ri:facebook-fill" width="30" height="30" />
           </div>
           <div className="rounded-full w-[40px] h-[40px] p-4 bg-main flex justify-center items-center cursor-pointer border border-main  hover:bg-transparent duration-500">
           <Icon className="text-white hover:text-main duration-300" icon="ri:linkedin-fill"  width="28" height="28" />
           </div>
           <div className="rounded-full w-[40px] h-[40px] p-4 bg-main flex justify-center items-center cursor-pointer border border-main  hover:bg-transparent duration-500">
           <Icon className="text-white hover:text-main duration-300" icon="fontisto:pinterest"  width="28" height="28" />
           </div>
           <div className="rounded-full w-[40px] h-[40px] p-4 bg-main flex justify-center items-center cursor-pointer border border-main  hover:bg-transparent duration-500">
           <Icon className="text-white hover:text-main duration-300" icon="icon-park-outline:telegram"  width="28" height="28" />
           </div>
           <div className="rounded-full w-[40px] h-[40px] p bg-main flex justify-center items-center cursor-pointer border border-main  hover:bg-transparent duration-500">
           <Icon className="text-white hover:text-main duration-300" icon="mdi:twitter"  width="28" height="28" />
           </div>
          </div>
          <button disabled={loading} onClick={()=>addToCart(props.id)}  className="mt-8 hover:shadow main-shadow duration-500   text-white bg-main w-full p-3 rounded-lg text-[1.2rem] font-semibold text-center">{
          loading? 
          <Icon
          className="text-white"
          icon={
        
            'line-md:loading-loop'
          
          }
          width="24"
          height="24"
        /> :
          
          'Add to cart'}</button>
        </div>

  );
}

export default SideDetails;
