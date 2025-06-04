import React from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import MyCoursesCard from './MyCoursesCard';

const MyCourses = () => {
  return (
    <div className='pb-8'>
      <div className="flex items-center justify-between">
        <h3 className='text-base text-textColor'>My Courses</h3>
        <Breadcrumbs/>
      </div>
      <MyCoursesCard />
      <MyCoursesCard />
    </div>
  );
}

export default MyCourses;
