import React, { useRef, useState } from "react";
import "./Setting.css";
const Setting = () => {
  const click = useRef(null);
  const [image, setImage] = useState();
  return (
    <div className="Profile">
      <h3 className="text-xl text-[#000000] font-semibold my-3">Profile</h3>
      <form className="bg-white p-5">
        <input
        id="profile"
          type="file"
          ref={click}
          hidden
          onChange={(e) => setImage(e.target.files)}
        />
        <div className="flex justify-start items-center gap-7">

        <div
          onClick={() => click.current.click()}
          className="w-[8.6rem] h-[8.6rem] rounded-full border border-borderColor flex justify-center items-center cursor-pointer"
          >
          {image && (
            <img
            src={URL.createObjectURL(image[0])}
            loading="lazy"
            className="w-full h-full object-cover"
            />
            )}
        </div>
         <label htmlFor="profile" className="text-[#000000] text-xl  cursor-pointer "> Change photo</label>
            </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="first-name">First name</label>
            <input type="text" name="first" id="first-name" />
          </div>
          <div className="form-control">
            <label htmlFor="last-name">Last name</label>
            <input type="text" name="last" id="last-name" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="user-name">User name</label>
            <input type="text" name="user-name" id="user-name" />
          </div>
          <div className="form-control">
            <label htmlFor="number">Phone number</label>
            <input type="number" name="number" id="number" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="Biography">Biography</label>
            <input type="text" name="Biography" id="Biography" />
          </div>
        </div>

        <button
          type="submit"
          className="bg-main text-white text-base  py-3 rounded mt-4 px-16 duration-500 "
        >
          Save changes
        </button>
      </form>
    </div>
  );
};

export default Setting;
