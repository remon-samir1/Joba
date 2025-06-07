import React from 'react';

const BiographyStudentSettings = () => {
  return (
    <form className='bg-white mt-6 p-4'>
          <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="Designation" className='text-[0.9rem] text-textColor font-medium'>Designation</label>
        <input type="text" placeholder='Designation' id='Age' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
          <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="shortbio" className='text-[0.9rem] text-textColor font-medium'>Short Bio</label>
        <textarea placeholder='Short Bio' id='shortbio' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
          <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="bio" className='text-[0.9rem] text-textColor font-medium'> Bio</label>
        <textarea placeholder=' Bio' id='bio' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <button type="submit" className='text-white bg-main py-2 px-8 rounded mt-6 main-shadow duration-500'>Update</button>

    </form>
  );
}

export default BiographyStudentSettings;
