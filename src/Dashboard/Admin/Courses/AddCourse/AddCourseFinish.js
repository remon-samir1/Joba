import React from "react";
import { useState } from "react";
import { Axios } from "../../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../../components/Notification";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AddCourseFinish = ({courseId , edit, slug }) => {
  const {id} = useParams()
  useEffect(() => {
    if (edit) {
      setLoading(true);
      Axios.get(`course/${slug}`).then((data) => {
        //data.data.course);

        const course = data.data.course;
//course);
        setForm({
          ...form,
          message_for_reviewer:course.message_for_reviewer,
          status: course.status ,
          course_id : id
        });
        setLoading(false);
      });
    }
  }, []);
  const [loading , setLoading] = useState(false)
  const [form , setForm] = useState({
    step:'4',
    course_id:courseId ? courseId : id,
    message_for_reviewer : '',
    is_approved : '',
    status : 'active',
});
//form);
const handleSubmit=async(e)=>{
  e.preventDefault();
  setLoading(true);
  try{
  await  Axios.post('admin/courses' , form).then(data=>{
    //data);
    toast.success('updated successfly');
  });
    setLoading(false)
  }catch(err){
    //err);
    setLoading(false)

  }
}
  return (
    <div className="bg-white p-3">
      <Notifcation/>
        {loading && (
        <div className="fixed h-screen overflow-hidden bg-white bg-opacity-50 z-50 inset-0"></div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-control ">
          <label htmlFor="duration" className="text-base font-semibold">
            Message for Reviewers <span className="text-red-500 my-3 inline-block">*</span>
          </label>
          <textarea
          value={form.message_for_reviewer}
          onChange={(e)=> setForm({...form , message_for_reviewer : e.target.value})}
            id="Message for reviewrs"
            required
            className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
          />
        </div>
        <label  className="text-base font-semibold" htmlFor="Status">Status <span className="text-red-500 my-3 inline-block">*</span></label>
        <select
            className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main my-3"
        
        id="Status" value={form.is_approved} onChange={(e)=>setForm({...form , is_approved : e.target.value})}>
          <option value="" disabled>Status</option>
          <option value="approved">Puplish</option>
          <option value="rejected">Unpuplish</option>
          <option value="pending">draft</option>
        </select>
        <button className="bg-main text-base text-white px-4 py-2 rounded mt-4 hover:bg-opacity-85 duration-300" type="submit">{loading ? "Loading..." : "save"}</button>
      </form>
    </div>
  );
};

export default AddCourseFinish;
