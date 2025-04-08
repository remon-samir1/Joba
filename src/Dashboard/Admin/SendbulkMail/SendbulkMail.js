import React, { useRef, useState } from "react";
import { LuSave } from "react-icons/lu";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";

const SendbulkMail = () => {

  return (
    <div className="UpdateCategory">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl">Send bulk mail to all </h3>
        <Breadcrumbs />
      </div>
      <div className="bg-white my-8">
      
        <form className="inputs  p-7">

          <div className="form-control">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" />
          </div>
      
      
          <div className="form-control">
            <label htmlFor="description">Description</label>
          <textarea  id="description" className="h-80"/>
          </div>
          <button type="submit" className="!bg-[#0048D3] !px-10 !border-[#0048D3] hover:!bg-white hover:!text-[#0048D3]">
            Send mail
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendbulkMail;
