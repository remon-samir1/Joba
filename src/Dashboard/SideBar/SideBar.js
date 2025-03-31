import React from "react";
import "./SideBar.css";
import Logo from "../../components/Logo/Logo";
import DropDown from "../../components/DropDown/DropDown";
import { NavLink } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { Icon } from "@iconify-icon/react";
import {
  mangeBlogs,
  mangeContents,
  mangeOrders,
  mangeUsers,
} from "./DropDownsData";

const SideBar = () => {
  return (
    <div className="SideBar py-5 px-7">
      <div className="logo">
        <Logo />
        <div className="links">
          <NavLink className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52">
            <Icon
              icon="hugeicons:home-02"
              width="24"
              height="24"
              className="icon"
            />
            <span>Dashboard</span>
          </NavLink>
          <DropDown
            data={mangeContents}
            icon="simple-line-icons:graduation"
            title="Mange contents"
          />
          <DropDown
            data={mangeBlogs}
            icon="fluent-mdl2:blog"
            title="Mange blogs"
          />
          <DropDown
            data={mangeOrders}
            icon="lsicon:management-stockout-outline"
            title="Mange orders"
          />
          <DropDown data={mangeUsers} icon="ci:users" title="Mange users" />
          <NavLink className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52">
            <Icon
              icon="ph:certificate-light"
              width="24"
              height="24"
              className="icon"
            />
            <span>Certificate builder</span>
          </NavLink>
          <NavLink className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52">
            <Icon
              icon="ph:hand-withdraw"
              width="24"
              height="24"
              className="icon"
            />
            <span>Withdraw Method</span>
          </NavLink>
          <p className="text-gray-400 mt-12">system</p>
          <NavLink className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52">
            <Icon
              icon="gg:profile"
              width="24"
              height="24"
              className="icon"
            />
            <span>Profile</span>
          </NavLink>
          <NavLink className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52">
            <Icon
              icon="ci:settings"
              width="24"
              height="24"
              className="icon"
            />
            <span>Setting</span>
          </NavLink>
          <NavLink className=" text-red-600 focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52">
            <Icon
              icon="solar:logout-2-outline"
              width="24"
              height="24"
              className="icon"
            />
            <span>Logout account</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

