import ShowSudentDetails from './ShowSudentDetails';
import './StudentsDetails.css'
import React, { useState } from 'react';
import UpdateStudentsDetails from './UpdateStudentsDetails';
import { useEffect } from 'react';
import { useRef } from 'react';
import Loading from '../../../../components/Loading/Loading';

const StudentsDetails = () => {
  const scrollRef = useRef()
  useEffect(()=>{
    scrollRef.current.scrollIntoView()
  },[])
  const [loading , setLoading] = useState(false)
  return (
    <>
  {
    loading && <div className="fixed h-screen overflow-hidden bg-white bg-opacity-50 z-50 inset-0"></div>
  }
    <div ref={scrollRef} className='flex justify-start flex-col md:flex-row items-start gap-6'>
      <ShowSudentDetails  setLoading={setLoading}/>
      <UpdateStudentsDetails  setLoading={setLoading}/>
    </div>
  </>
  );
}

export default StudentsDetails;
