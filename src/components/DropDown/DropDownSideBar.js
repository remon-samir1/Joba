import { IoChevronForward } from "react-icons/io5";

import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { Menu } from "../../Context/MenuContext";

export default function DropDownSideBar(props) {
  const [isOpenDrop, setIsOpenDrop] = useState(false);
  const menu = useContext(Menu);

  const isOpen = menu.isOpen;
  const setIsOpen = menu.setIsOpen; 
  return (
    <div className="relative w-52 link">
      <button
        onClick={() => setIsOpenDrop(!isOpenDrop)}
        className={`${
          isOpenDrop && "bg-main text-white"
        }  hover:bg-main hover:text-white  text-textColor px-2 py-3  rounded-lg flex items-center justify-between w-full outline-none`}
      >
        <span className="flex justify-start items-center gap-3">
          <Icon icon={props.icon} width="24" height="24" className="icon" />

          {props.title}
        </span>

        <span className="mr-2">
          <IoChevronForward
            className={isOpenDrop && "rotate-90"}
            style={{ transition: "transform 0.5s" }}
          />{" "}
        </span>
      </button>

      <div
        className={`transition-all duration-700 overflow-hidden ${
          isOpenDrop ? "max-h-60" : "max-h-0"
        }`}
      >
        <ul className=" rounded-lg  mt-2 items-start flex flex-col">
          {props.data.map((data, index) => (
            <NavLink
            onClick={()=>(setIsOpen(false))}
              className="dropLink text-textColor text-sm px-4 py-2 w-full hover:bg-gray-100 cursor-pointer hover:text-main"
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
