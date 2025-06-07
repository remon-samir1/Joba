import React from 'react';

const PasswordStudentSettings = () => {
  return (
    <form className='bg-white mt-6 p-4'>
      <h4 className='text-base text-main py-4'>
        Change password
      </h4>
      <div className='flex flex-col gap-2 mt-4  '>
        <label htmlFor="currnet" className='text-[0.9rem] text-textColor font-medium'>Current password</label>
        <input type="password" placeholder='Current password' id='currnet' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <div className='flex flex-col gap-2 mt-4  '>
        <label htmlFor="new" className='text-[0.9rem] text-textColor font-medium'>New password</label>
        <input type="password" placeholder='New password' id='new' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <div className='flex flex-col gap-2 mt-4  '>
        <label htmlFor="confirm" className='text-[0.9rem] text-textColor font-medium'>Confirm new password</label>
        <input type="password" placeholder='Confirm new password' id='confirm' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <button type="submit" className='text-white bg-main py-2 px-8 rounded mt-6 main-shadow duration-500'>Update</button>

    </form>
  );
}

export default PasswordStudentSettings;
