import React, { useRef, useState } from "react";
import { LuSave } from "react-icons/lu";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../../components/DropDown/SelectBox";

const UpdateWithdrawMethod = () => {

  return (
    <div className="UpdateCategory">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl">Edit withdraw method </h3>
        <Breadcrumbs />
      </div>
      <div className="bg-white my-8">
      
        <form className="inputs  p-7">

          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" />
          </div>
          <div className="form-control">
            <label htmlFor="Minimum">Minimum amount</label>
            <input type="number" id="Minimum" name="Minimum" />
          </div>
          <div className="form-control">
            <label htmlFor="Maximum">Maximum amount</label>
            <input type="number" id="Minimum" name="Minimum" />
          </div>
      
      
          <div className="form-control">
            <label htmlFor="description">Description</label>
          <textarea  id="description" className="h-48"/>
          </div>

          <div className="form-control">
            <label htmlFor="Maximum">Status</label>
            <SelectBox title='status'/>
          </div>
          <button type="submit" className="!bg-[#0048D3] !px-10 !border-[#0048D3] hover:!bg-white hover:!text-[#0048D3] w-full !rounded !mt-7">
      Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateWithdrawMethod;
