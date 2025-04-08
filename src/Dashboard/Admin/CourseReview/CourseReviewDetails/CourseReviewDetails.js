import { Icon } from '@iconify-icon/react';
import React from 'react';
import Breadcrumbs from '../../../../components/Breadcrumbs/Breadcrumbs';
import { useNavigate } from 'react-router-dom';
import './CourseReviewDetails.css'
import { SelectBox } from '../../../../components/DropDown/SelectBox';
const CourseReviewDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="UpdateCategory">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Category Update</h3>
        <Breadcrumbs />
      </div>
      <div className="bg-white my-8">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Courses</h4>
          <button
            onClick={() => navigate(-1)}
            className="flex justify-between gap-1 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500 hover:bg-white hover:text-main"
          >
            <Icon
              icon="solar:arrow-left-outline"
              width={20}
              height={20}
              className="hover:bg-white hover:text-main"
            />
            <span>Back</span>
          </button>
        </div>
        <div className="CourseReviewDetails">
     <div className="titles">
      <p>Course</p>
      <p>Rating</p>
      <p>Review</p>
      <p>Date</p>
      <p>Status</p>
     </div>
     <div className="details">
     <p>Brand: Lorem ipsum dolor sit amet consectetur.</p>
      <div>
        
    
            <Icon
              icon="ic:round-star"
              className="icon"
            />
    
            <Icon
              icon="ic:round-star"
              className="icon"
            />
    
            <Icon
              icon="ic:round-star"
              className="icon"
            />
    
            <Icon
              icon="ic:round-star"
              className="icon"
            />
    
            <Icon
              icon="ic:round-star"
              className="icon"
            />
          
          




      </div>
      <p>Lorem ipsum dolor sit amet consectetur. Egestas phasellus quisque amet nunc vitae turpis at nunc.</p>
      <p>05 Feb, 2025</p>
      <div className='flex justify-start items-center gap-4'><SelectBox title='Approved'/>
       <button className="update">Update</button>
      </div>
     </div>


        </div>
      </div>
    </div>
  );
}

export default CourseReviewDetails;
