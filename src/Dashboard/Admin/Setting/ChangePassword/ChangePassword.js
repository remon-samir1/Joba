import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
const ChangePassword = () => {
  const [hideCurrentPass, setHideCurrentPass] = useState(true);
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  return (
    <div className="flex-1 bg-white p-5 px-8 ">
      <div className="flex flex-col justify-start items-start gap-2 ">
        <label htmlFor="Currentpassword">Current password</label>
        <div className="input">
          <input
            type={hideCurrentPass ? "password" : "text"}
            className="appearance-none outline-none border border-borderColor p-3 rounded w-full"
            placeholder="Password"
            id="Currentpassword"
          />
          {hideCurrentPass ? (
            <IoEyeOffOutline
              className="icon  !left-[95%]"
              onClick={() => setHideCurrentPass((prev) => !prev)}
            />
          ) : (
            <MdOutlineRemoveRedEye
              className="icon !left-[95%]"
              onClick={() => setHideCurrentPass((prev) => !prev)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-2 mt-5">
        <label htmlFor="Newpassword">New password</label>
        <div className="input">
          <input
            type={hidePass ? "password" : "text"}
            className="appearance-none outline-none border border-borderColor p-3 rounded w-full"
            placeholder="Password"
            id="Newpassword"
          />
          {hidePass ? (
            <IoEyeOffOutline
              className="icon  !left-[95%]"
              onClick={() => setHidePass((prev) => !prev)}
            />
          ) : (
            <MdOutlineRemoveRedEye
              className="icon !left-[95%]"
              onClick={() => setHidePass((prev) => !prev)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-2 mt-5">
        <label htmlFor="confirmPassword">Confirm password</label>
        <div className="input">
          <input
            type={hideConfirmPass ? "password" : "text"}
            className="appearance-none outline-none border border-borderColor p-3 rounded w-full"
            placeholder="Password"
            id="confirmPassword"
          />
          {hideConfirmPass ? (
            <IoEyeOffOutline
              className="icon  !left-[95%]"
              onClick={() => setHideConfirmPass((prev) => !prev)}
            />
          ) : (
            <MdOutlineRemoveRedEye
              className="icon !left-[95%]"
              onClick={() => setHideConfirmPass((prev) => !prev)}
            />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-main text-white text-base  py-3 rounded mt-4 px-16 duration-500 "
      >
        Save changes
      </button>
    </div>
  );
};

export default ChangePassword;
