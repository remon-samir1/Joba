import { IoChevronForward } from "react-icons/io5";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

export default function DropDown(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-52 link">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="focus:bg-main hover:bg-main hover:text-white focus:text-white text-textColor px-2 py-3  rounded-lg flex items-center justify-between w-full"
      >
        <span className="flex justify-start items-center gap-3">
          <Icon icon={props.icon} width="24" height="24" className="icon" />

          {props.title}
        </span>

        <span className="mr-2">
          <IoChevronForward className={isOpen && "rotate-90"} />{" "}
        </span>
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <ul className=" rounded-lg  mt-2 items-start flex flex-col">
          {props.data.map((data, index) => (
            <NavLink
              className="text-textColor text-sm px-4 py-2 w-full hover:bg-gray-100 cursor-pointer"
              to={data.to}
            >
              {" "}
              {data.name}
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
}
