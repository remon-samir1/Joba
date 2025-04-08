
import React from 'react';
import ShowInstructorsDetails from './ShowInstructorsDetails';
import UpdateInstructorsDetails from './UpdateInstructorsDetails';

const InstructorsDetails = () => {
  return (
    <div className='flex justify-start items-start gap-6'>
      <ShowInstructorsDetails/>
      <UpdateInstructorsDetails/>
    </div>
  );
}

export default InstructorsDetails;
