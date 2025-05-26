import React, { useRef, useState } from "react";
import "./Setting.css";
import { Icon } from "@iconify-icon/react";
import NotficationsSettings from "./Notfications/NotficationsSettings";
import ChangePassword from "./ChangePassword/ChangePassword";
const Setting = () => {
  const click = useRef(null);
  const [image, setImage] = useState([]);
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
            {/* {image && (
              <img
                src={image && URL.createObjectURL(image[0])}
                loading="lazy"
                className="w-full h-full object-cover rounded-full"
              />
            )} */}
          </div>
          <label
            htmlFor="profile"
            className="text-[#000000] text-xl  cursor-pointer "
          >
            {" "}
            Change photo
          </label>
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
      <div className="bg-white p-5 mt-8">
        <div className="control">
          <label
            htmlFor="website"
            className="text-[#000000] font-semibold text-[1.1rem]"
          >
            Personal website
          </label>
          <div className="overflow-hidden mt-3 flex items-center border border-borderColor  rounded gap-3">
            <Icon
              icon="grommet-icons:language"
              width={20}
              height={20}
              className="icon text-main border-r border-r-borderColor p-2"
            />
            <input
              type="text"
              placeholder="Personal website or portfolio url..."
              id="website"
              className="p-2 outline-none flex-1"
            />
          </div>
        </div>
        <div className="flex gap-6 mt-8">
          <div className="control flex-1">
            <label
              htmlFor="facebook"
              className="text-[#000000] font-semibold text-[1.1rem]"
            >
              Facebook
            </label>
            <div className="overflow-hidden mt-3 flex items-center border border-borderColor  rounded gap-3">
              <Icon
                icon="mage:facebook"
                width={20}
                height={20}
                className="icon text-main border-r border-r-borderColor p-2"
              />
              <input
                type="text"
                placeholder="Username"
                id="facebook"
                className="p-2 outline-none flex-1"
              />
            </div>
          </div>
          <div className="control flex-1">
            <label
              htmlFor="instagram"
              className="text-[#000000] font-semibold text-[1.1rem]"
            >
              Instagram
            </label>
            <div className="overflow-hidden mt-3 flex items-center border border-borderColor  rounded gap-3">
              <Icon
                icon="line-md:instagram"
                width={20}
                height={20}
                className="icon text-main border-r border-r-borderColor p-2"
              />
              <input
                type="text"
                placeholder="Username"
                id="instagram"
                className="p-2 outline-none flex-1"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-8">
          <div className="control flex-1">
            <label
              htmlFor="twitter"
              className="text-[#000000] font-semibold text-[1.1rem]"
            >
              Twitter
            </label>
            <div className="overflow-hidden mt-3 flex items-center border border-borderColor  rounded gap-3 ">
              <Icon
                icon="mdi:twitter"
                width={20}
                height={20}
                className="icon text-main border-r border-r-borderColor p-2"
              />
              <input
                type="text"
                placeholder="Username"
                id="twitter"
                className="p-2 outline-none flex-1"
              />
            </div>
          </div>
          <div className="control flex-1">
            <label
              htmlFor="whatsapp"
              className="text-[#000000] font-semibold text-[1.1rem]"
            >
              whatsapp
            </label>
            <div className="overflow-hidden mt-3 flex items-center border border-borderColor  rounded gap-3">
              <Icon
                icon="ic:twotone-whatsapp"
                width={20}
                height={20}
                className="icon text-main border-r border-r-borderColor p-2"
              />
              <input
                type="number"
                placeholder="phone number"
                id="whatsapp"
                className="p-2 outline-none flex-1"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-8">
          <div className="control flex-1">
            <label
              htmlFor="linkedin"
              className="text-[#000000] font-semibold text-[1.1rem]"
            >
              Linedin
            </label>
            <div className="overflow-hidden mt-3 flex items-center border border-borderColor  rounded gap-3">
              <Icon
                icon="ri:linkedin-fill"
                width={20}
                height={20}
                className="icon text-main border-r border-r-borderColor p-2"
              />
              <input
                type="text"
                placeholder="Username"
                id="linkedin"
                className="p-2 outline-none flex-1"
              />
            </div>
          </div>
          <div className="control flex-1">
            <label
              htmlFor="youtube"
              className="text-[#000000] font-semibold text-[1.1rem]"
            >
              Youtube
            </label>
            <div className="overflow-hidden mt-3 flex items-center border border-borderColor  rounded gap-3">
              <Icon
                icon="mdi:youtube"
                width={20}
                height={20}
                className="icon text-main border-r border-r-borderColor p-2"
              />
              <input
                type="text"
                placeholder="Username"
                id="youtube"
                className="p-2 outline-none flex-1"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-main text-white text-base  py-3 rounded mt-4 px-16 duration-500 "
        >
          Save changes
        </button>
      </div>
      <div className="flex justify-center items-start gap-5 mt-8">
        <NotficationsSettings/>
        <ChangePassword/>
      </div>
    </div>
  );
};

export default Setting;
