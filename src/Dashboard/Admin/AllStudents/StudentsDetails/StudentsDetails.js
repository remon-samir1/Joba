import ShowSudentDetails from './ShowSudentDetails';
import './StudentsDetails.css'
import React from 'react';
import UpdateStudentsDetails from './UpdateStudentsDetails';

const StudentsDetails = () => {
  return (
    <div className='flex justify-start items-start gap-6'>
      <ShowSudentDetails/>
      <UpdateStudentsDetails/>
    </div>
  );
}

export default StudentsDetails;
