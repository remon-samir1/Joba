import React from 'react';
import { toast } from 'react-toastify';
import { Axios } from '../../../components/Helpers/Axios';

const BiographyStudentSettings = ({form , setForm , setLoading}) => {
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  

    try {
      await Axios.put("/student/setting/bio", form).then((data) => {
        console.log(data);
        toast.success("Updated Successfly");
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("something was wrong!");
    }
  };
  return (
    <form onSubmit={handleSubmit} className='bg-white mt-6 p-4'>
          <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="Designation" className='text-[0.9rem] text-textColor font-medium'>Designation</label>
        <input onChange={(e)=>setForm({...form , designation : e.target.value})} value={form.designation} type="text" placeholder='Designation' id='Age' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
          <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="shortbio" className='text-[0.9rem] text-textColor font-medium'>Short Bio</label>
        <textarea onChange={(e)=>setForm({...form , short_bio : e.target.value})} value={form.short_bio} placeholder='Short Bio' id='shortbio' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
          <div className='flex flex-col gap-2 mt-4'>
        <label htmlFor="bio" className='text-[0.9rem] text-textColor font-medium'> Bio</label>
        <textarea onChange={(e)=>setForm({...form , bio : e.target.value})} value={form.bio} placeholder=' Bio' id='bio' className='p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2'  />
      </div>
      <button type="submit" className='text-white bg-main py-2 px-8 rounded mt-6 main-shadow duration-500'>Update</button>

    </form>
  );
}

export default BiographyStudentSettings;
