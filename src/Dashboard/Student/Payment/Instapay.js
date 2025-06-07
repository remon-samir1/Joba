import React from 'react';

const Instapay = () => {
  return (
    <div>
    <form >
      <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="name" className='text-[0.9rem] text-textColor font-medium'>Full name</label>
        <input type="text" placeholder='Name' id='name' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="phone" className='text-[0.9rem] text-textColor font-medium'>Phone number</label>
        <input type="number" placeholder='phone' id='Phone number' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="Amount" className='text-[0.9rem] text-textColor font-medium'>Amount</label>
        <input type="text" placeholder='Amount' id='Amount' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <button type="submit" className='text-white bg-main p-4 w-full rounded-lg mt-6 main-shadow duration-500'>Confirm</button>
    </form>
    </div>
  );
}

export default Instapay;
