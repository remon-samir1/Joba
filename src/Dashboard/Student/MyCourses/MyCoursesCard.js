import { Icon } from '@iconify-icon/react';
import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
const MyCoursesCard = () => {
  return (
    <Link to='/student/enrolled-course' className='bg-white mt-4 border flex items-center gap-4  border-[#dddd] rounded-lg pl-3 pr-8 py-3'>
      <div className="h-[220px] w-[25%] shrink-0 rounded overflow-hidden">
        <img src={require('../../../images/course-details.png')} alt="course" loading='lazy' className='w-full h-full object-cover' />
        </div> 
        <div className='flex-1'>

      <h4 className='bg-[#FFF2EC]  text-[0.9rem] py-2 px-6 w-max  rounded-full'>Software</h4>
      <h3 className='text-textColor text-[1.4rem] mt-4'>Education forces a person to think positive and do right deeds.</h3>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[36px] h-[36px] shrink-0 rounded-full overflow-hidden">
            <img src={require('../../../images/course.png')} alt="instructor" loading='lazy' className='w-full h-full object-cover' />
          </div>
          <span className='text-textColor text-base'>Rahardian</span>
        </div>
        <div className="flex items-center gap-1">
        <FaStar  color="#F1AC4D" />
        <span className='text-[0.9rem] text-textColor'>4.8 Reviews</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
          <span className='text-text2 text-[0.8rem]'>Completed</span>
          <span className='text-text2 text-[0.8rem]'>83.8%</span>
        </div>
        <div className="w-full h-1 bg-[#E0E0E0] relative mt-3 rounded-md overflow-hidden">
          <span className='absolute left-0 h-full bg-[#319F43] w-[83%]'></span>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex items-center gap-3 px-5" >
          <Icon className='text-text2' icon="material-symbols:play-lesson-outline" width="16" height="16" />
          <span className='text-[0.7rem] text-text2 '>36 Lessons</span>
          </div>
          <div className="flex items-center gap-3 px-5 border-x border-x-[#ddd]" >
          <Icon className='text-text2' icon="iconamoon:history" width="16" height="16" />
          <span className='text-[0.7rem] text-text2 '>1h 30 min</span>
          </div>
          <div className="flex items-center gap-3 px-5" >
          <Icon className='text-text2' icon="ph:student" width="16" height="16" />
          <span className='text-[0.7rem] text-text2 '>100 Students</span>
          </div>
        </div>
        </div>
      
    </Link>
  );
}

export default MyCoursesCard;
