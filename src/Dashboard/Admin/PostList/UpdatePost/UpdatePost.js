import React, { useRef, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";

const UpdatePost = () => {
  const click = useRef(null);
  const navigate = useNavigate();

  const [image, setImage] = useState();
  return (
    <div className="UpdateCategory">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Add Post</h3>
        <Breadcrumbs />
      </div>
      <div className="bg-white my-8">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Add Post</h4>
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
              <button type="button" className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end">
                Icon
              </button>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="Titel">Titel</label>
            <input type="text" id="Titel" />
          </div>
          <div className="form-control">
            <label htmlFor="Category">Category</label>
            <input type="text" id="Category" />
          </div>
          <div className="form-control ">
            <label htmlFor="Describtion">Describtion</label>
            <textarea type="text" id="Describtion" className="h-36" />
          </div>

      
         <div className="toggels mt-4 grid gap-4">
          <ToggleButton title='Show on homepage'/>
          <ToggleButton title='Msrk as populer'/>
          <ToggleButton title='Status'/>
          
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

export default UpdatePost;
