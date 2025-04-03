import React, { useRef, useState } from "react";
import "./UpdateCategory.css";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";

const UpdateCategory = () => {
  const click = useRef(null);
  const navigate = useNavigate();
  const showAtTraedingData = [
    {
      name: "Yes",
      value: "Yes",
    },
    {
      name: "No",
      value: "No",
    },
  ];
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
        <h3 className="font-bold text-textColor text-xl"> Category Update</h3>
        <Breadcrumbs />
      </div>
      <div className="bg-white my-8">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Courses</h4>
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
          <div className="mb-4">
            <input
              type="file"
              hidden
              ref={click}
              onChange={(e) => setImage(e.target.files)}
            />
            <div
              onClick={() => click.current.click()}
              className="cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-56 h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
            >
              {image && (
                <img
                  src={URL.createObjectURL(image[0])}
                  width={140}
                  height={120}
                  alt=""
                />
              )}
              <button className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end">
                Icon
              </button>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name" />
          </div>
          <div className="form-control">
            <label htmlFor="Slug">Slug</label>
            <input type="text" id="Slug" placeholder="Slug" />
          </div>
          <div className="form-control">
            <label htmlFor="name">Show at trading</label>
            <SelectBox data={showAtTraedingData} />
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

export default UpdateCategory;
