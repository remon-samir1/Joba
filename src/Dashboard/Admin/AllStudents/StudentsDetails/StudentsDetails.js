import ShowSudentDetails from './ShowSudentDetails';
import './StudentsDetails.css'
import React from 'react';
import UpdateStudentsDetails from './UpdateStudentsDetails';
import { useEffect } from 'react';
import { useRef } from 'react';

const StudentsDetails = () => {
  const scrollRef = useRef()
  useEffect(()=>{
    scrollRef.current.scrollIntoView()
  },[])
  return (
    <div ref={scrollRef} className='flex justify-start items-start gap-6'>

      <ShowSudentDetails/>
      <UpdateStudentsDetails/>
    </div>
  );
}

export default StudentsDetails;
