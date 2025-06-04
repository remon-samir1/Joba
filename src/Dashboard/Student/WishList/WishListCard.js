import { Icon } from '@iconify-icon/react';
import React from 'react';
import { Link } from 'react-router-dom';

const WishListCard = () => {
  return (
    <div
    
      className="pb-3 min-w-80 max-w-[340px] flex-1 overflow-hidden bg-white rounded-xl mt-3 group transition-transform duration-500"
    >
      <div className="img h-[195px] w-full relative overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={require("../../../images/course.png")}
          alt="course"
        />
    
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link to='/student/enrolled-course' className="bg-main text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold shadow-md">
            Watch Now
          </Link>
        </div>
    
  
      </div>
    
      <div className="mt-3 px-3">
        <h3 className="text-[1.1rem] text-textColor transition-all duration-300">
          Cosmetics course for beginner
        </h3>
        <div className="flex items-center justify-between gap-3 mt-4">
        <p className='text-[0.9rem] text-textColor'>
        Reliable engineering takes many forms.
        </p>
          <p className="text-main text-base  p-1 rounded bg-[#F15A24] bg-opacity-20 whitespace-nowrap">1500 EGP</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 px-3">

          <div className="flex items-start justify-between  mt-4 gap-2">
            <img
              className="w-[2.2rem] h-[2.2rem] rounded-full"
              src={require("../../../images/course.png")}
              alt="student"
            />
            <span className="text-textColor text-base">Brenda Howe</span>
          </div>
          <div className="cursor-pointer w-[35px] h-[35px] rounded-full flex justify-center items-center bg-main bg-opacity-30">
          <Icon className='text-main' icon="iconamoon:trash-light" width="24" height="24" />
          </div>
      </div>
    </div>
    
      
  );
}

export default WishListCard;
