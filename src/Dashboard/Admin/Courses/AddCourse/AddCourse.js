import React from 'react';
import './Addcourse.css'
const AddCourse = () => {
  return (
    <div className='AddCoourse'>
      <h3 className='text-[#000000] text-base font-semibold'>Add course</h3>
      <form className='p-5 bg-white'>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id='title' />
        </div>
        <div className="form-control2">
          <label htmlFor="title">Title</label>
          <div className="input ">
          <div>choose</div>
          <input type="text" id='title' className='!flex-1'/>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;
