import React, { useRef, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";

const AddLevel = () => {
  const click = useRef(null);
  const navigate = useNavigate();

  const statusData = [
    {
      name: "Active",
      value: "active",
    },
    {
      name: "Inactive",
      value: "Inactive",
    },
  ];

  const [image, setImage] = useState();
  return (
    <div className="UpdateCategory">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Add Level</h3>
        <Breadcrumbs />
      </div>
      <div className="bg-white my-4">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Add Level</h4>
          <button
            onClick={() => navigate(-1)}
            className="flex justify-between gap-1 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500 hover:bg-white hover:text-main"
          >
            <Icon
              icon="solar:arrow-left-outline"
              width={20}
              height={20}
              className="hover:bg-white hover:text-main"
            />
            <span>Back</span>
          </button>
        </div>
        <form className="inputs  p-7">
        
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name" />
          </div>
    
        
          <div className="form-control">
            <label htmlFor="name">Status</label>
            <SelectBox data={statusData} />
          </div>
          <button type="submit">
            <LuSave width={24} height={24} className=" text-white icon" />
            <span>Save</span>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLevel;
