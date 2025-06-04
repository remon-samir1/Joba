import { Icon } from '@iconify-icon/react';
import React from 'react';

const SideDetails = () => {
  return (
    <div className="w-[340px] bg-white rounded-xl p-3">
          <div className="w-full bg-main rounded-xl px-4 py-6">
            <p className="text-white text-[1.3rem] capitalize">
              {" "}
              This course Free :
            </p>
            <p className="text-white font-bold text-[1.5rem] mt-4">1,500 EGP</p>
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
          <div className="flex mt-1 items-center gap-3 flex-wrap border-b border-[#dddd] py-3">
            <p className="text-[0.9rem] text-white bg-main px-5 py-1 rounded capitalize">
              Beginner
            </p>
            <p className="text-[0.9rem] text-white bg-main px-5 py-1 rounded capitalize">
              Intermediate
            </p>
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
            <p className="text-[0.9rem] text-textColor">8 Hour 50 minute</p>
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
            <p className="text-[0.9rem] text-textColor">36</p>
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
            <p className="text-[0.9rem] text-textColor">0</p>
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
            <p className="text-[0.9rem] text-textColor">No</p>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-[#ddd]">
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
            <p className="text-[0.9rem] text-white bg-main px-5 py-1 rounded capitalize">
              arabic
            </p>
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
          <button  className="mt-8 hover:shadow main-shadow duration-500   text-white bg-main w-full p-3 rounded-lg text-[1.2rem] font-semibold text-center">Add to cart</button>
        </div>

  );
}

export default SideDetails;
