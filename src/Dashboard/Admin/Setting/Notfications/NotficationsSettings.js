import React from 'react';

const NotficationsSettings = () => {
  return (
    <div className='flex-1 bg-white p-5 flex flex-col justify-start items-start gap-4'>
      <div className="flex justify-start items-center gap-2">
        <input type="checkbox" name="check1" id="check1" className='accent-main w-[18px] h-[18px]' />
        <label htmlFor="check1" className='text-base text-[#000000]'>I want to know who buy my course.</label>
      </div>
      <div className="flex justify-start items-center gap-2">
        <input type="checkbox" name="check2" id="check2" className='accent-main w-[18px] h-[18px]' />
        <label htmlFor="check2" className='text-base text-[#000000]'>I want to know who write a review on my course.</label>
      </div>
      <div className="flex justify-start items-center gap-2">
        <input type="checkbox" name="check3" id="check3" className='accent-main w-[18px] h-[18px]' />
        <label htmlFor="check3" className='text-base text-[#000000]'>I want to know who commented on my lecture.</label>
      </div>
      <div className="flex justify-start items-center gap-2">
        <input type="checkbox" name="check4" id="check4" className='accent-main w-[18px] h-[18px]' />
        <label htmlFor="check4" className='text-base text-[#000000]'>I want to know who download my lecture notes.</label>
      </div>
      <div className="flex justify-start items-center gap-2">
        <input type="checkbox" name="check5" id="check5" className='accent-main w-[18px] h-[18px]' />
        <label htmlFor="check5" className='text-base text-[#000000]'>I want to know who replied on my comment.</label>
      </div>
      <div className="flex justify-start items-center gap-2">
        <input type="checkbox" name="check6" id="check6" className='accent-main w-[18px] h-[18px]' />
        <label htmlFor="check6" className='text-base text-[#000000]'>I want to know daily how many people visited my profile.</label>
      </div>
      <div className="flex justify-start items-center gap-2">
        <input type="checkbox" name="check7" id="check7" className='accent-main w-[18px] h-[18px]' />
        <label htmlFor="check7" className='text-base text-[#000000]'>I want to know who download my lecture attach file.</label>
      </div>
      <button
          type="submit"
          className="bg-main text-white text-base  py-3 rounded mt-4 px-16 duration-500 "
        >
          Save changes
        </button>
    </div>
  );
}

export default NotficationsSettings;
