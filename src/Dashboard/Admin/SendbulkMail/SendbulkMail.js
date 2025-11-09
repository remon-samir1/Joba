import React, { useRef, useState } from "react";
import { LuSave } from "react-icons/lu";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { toast } from "react-toastify";
import { Axios } from "../../../components/Helpers/Axios";
import Notifcation from "../../../components/Notification";
import { AiOutlineLoading } from "react-icons/ai";

const SendbulkMail = () => {
  const [loading , setLaoding] = useState()
  const [form , setForm] = useState({
    subject:'',
    description:''
  });
  //form);
  // handle submit
  const handleSubmit = async(e) => {
    setLaoding(true)
      e.preventDefault();
    
    try{
await Axios.post('/admin/send-bulk-mail-to-all' , form).then(data => {
  toast.success(data.data.messege)
  setLaoding(false)})
    }
    catch(err){
      //err);
      toast.error(err.messege)
      setLaoding(false)
    }
  }

  return (
    <div className="UpdateCategory">
      <Notifcation/>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl">Send bulk mail to all </h3>
        <Breadcrumbs />
      </div>
      <div className="bg-white my-8">
      
        <form onSubmit={handleSubmit} className="inputs  p-7">

          <div className="form-control">
            <label htmlFor="subject">Subject</label>
            <input disabled={loading} onChange={(e)=> setForm({...form , subject:e.target.value})} type="text" id="subject" name="subject" />
          </div>
      
      
          <div className="form-control">
            <label htmlFor="description">Description</label>
          <textarea disabled={loading} onChange={(e)=> setForm({...form , description:e.target.value})}  id="description" className="h-80"/>
          </div>
          <button disabled={loading} type="submit" className="!bg-[#0048D3] !px-10 !border-[#0048D3] hover:!bg-white hover:!text-[#0048D3]">

            {
              loading ? <AiOutlineLoading className="text-white load-icon"/> :   'Send mail'
            }
          
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendbulkMail;
