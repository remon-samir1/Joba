import React from 'react';

const SocialStudentSettings = () => {
  return (
    <form className='bg-white p-4 mt-6'>
        <div className='flex flex-col gap-2 mt-4 flex-1 '>
        <label htmlFor="facebook" className='text-[0.9rem] text-textColor font-medium'>Facebook</label>
        <input type="text" placeholder='Facebook' id='facebook' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
        <div className='flex flex-col gap-2 mt-4 flex-1 '>
        <label htmlFor="twitter" className='text-[0.9rem] text-textColor font-medium'>Twitter</label>
        <input type="text" placeholder='Twitter' id='twitter' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
        <div className='flex flex-col gap-2 mt-4 flex-1 '>
        <label htmlFor="linkedin" className='text-[0.9rem] text-textColor font-medium'>linkedin</label>
        <input type="text" placeholder='linkedin' id='linkedin' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
        <div className='flex flex-col gap-2 mt-4 flex-1 '>
        <label htmlFor="Website" className='text-[0.9rem] text-textColor font-medium'>Website</label>
        <input type="text" placeholder='Website' id='Website' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
        <div className='flex flex-col gap-2 mt-4 flex-1 '>
        <label htmlFor="Github" className='text-[0.9rem] text-textColor font-medium'>Github</label>
        <input type="text" placeholder='Github' id='Github' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />

      </div>
      <button type="submit" className='text-white bg-main py-2 px-8 rounded mt-6 main-shadow duration-500'>Update</button>

    </form>
  );
}

export default SocialStudentSettings;
