import React, { useContext, useEffect, useRef } from "react";
import "./SideBar.css";
import Logo from "../../components/Logo/Logo";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import exploreCourse from '../../images/note-2.svg'
import {
  mangeBlogs,
  mangeContents,
  mangeOrders,
  mangeUsers,
  withdraw,
} from "./DropDownsData";
import DropDownSideBar from "../../components/DropDown/DropDownSideBar";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowSizeContext";

const SideBar = (props) => {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const setIsOpen = menu.setIsOpen;
  const windowSize = useContext(WindowSize);
  const windowWidth = windowSize.windowSize;
  const sideBarRef = useRef(null);

  return (
    <div
      ref={sideBarRef}
      className={`SideBar py-5 px-7 ${
        windowWidth < 769 && isOpen ? "left-0" : "-left-full"
      }`}
    >
      <div className="logo">
        <Logo />
        {
          props.admin ?

          <div className="links">
          <NavLink
            to="main"
            className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
            onClick={() => setIsOpen(false)}
          >
            <Icon icon="hugeicons:home-02" width="24" height="24" />
            <span>Dashboard</span>
          </NavLink>

          <DropDownSideBar
            data={mangeContents}
            icon="simple-line-icons:graduation"
            title="Mange contents"
            />
          <DropDownSideBar
            data={mangeBlogs}
            icon="fluent-mdl2:blog"
            title="Mange blogs"
            />
          <DropDownSideBar
            data={mangeOrders}
            icon="lsicon:management-stockout-outline"
            title="Mange orders"
            />
          <DropDownSideBar
            data={mangeUsers}
            icon="ci:users"
            title="Mange users"
            />

          <NavLink
            to="certificate-builder"
            className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
            onClick={() => setIsOpen(false)}
            >
            <Icon icon="ph:certificate-light" width="24" height="24" />
            <span>Certificate builder</span>
          </NavLink>
          <DropDownSideBar
            data={withdraw}
            icon="ph:hand-withdraw"
            title="Withdraw Method"
          />

          <p className="text-gray-400 mt-12">system</p>

          <NavLink
            to="profile"
            className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
            onClick={() => setIsOpen(false)}
            >
            <Icon icon="gg:profile" width="24" height="24" />
            <span>Profile</span>
          </NavLink>

          <NavLink
            to="setting"
            className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
            onClick={() => setIsOpen(false)}
          >
            <Icon icon="ci:settings" width="24" height="24" />
            <span>Setting</span>
          </NavLink>

          <NavLink
            to="/"
            className="text-red-600 focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
            onClick={() => setIsOpen(false)}
            >
            <Icon icon="solar:logout-2-outline" width="24" height="24" />
            <span>Logout account</span>
          </NavLink>
        </div>
        :

                //  Student Links
        <div className="links">
        <NavLink
          to="main"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
          onClick={() => setIsOpen(false)}
        >
          <Icon icon="hugeicons:home-02" width="24" height="24" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="explore"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52 link"
          onClick={() => setIsOpen(false)}
        >  
    <Icon icon="charm:cards" width="24" height="24" />
          <span>Explore Course</span>
          
          </NavLink>
        <NavLink
          to="my-courses"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52 link"
          onClick={() => setIsOpen(false)}
        >  
  <Icon icon="solar:book-outline"  width="24" height="24" />
          <span>My Course</span>
          
          </NavLink>
        <NavLink
          to="order-history"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52 link"
          onClick={() => setIsOpen(false)}
        >  
  <Icon icon="iconamoon:history" width="24" height="24" />
          <span>Order History</span>
          
          </NavLink>
        <NavLink
          to="wishlist"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52 link"
          onClick={() => setIsOpen(false)}
        >  
  <Icon icon="material-symbols:favorite-outline"  width="24" height="24" />
          <span>Wish list</span>
          
          </NavLink>
        <NavLink
          to="reviews"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52 link"
          onClick={() => setIsOpen(false)}
        >  
  <Icon icon="ic:outline-reviews" width="24" height="24" />
          <span>Reviews</span>
          
          </NavLink>
        <NavLink
          to="my-Quiz"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52 link"
          onClick={() => setIsOpen(false)}
        >  
  <Icon icon="material-symbols:quiz-outline-rounded" width="24" height="24" />
          <span>My Quiz attempts</span>
          
          </NavLink>

    

        <p className="text-gray-400 mt-12">system</p>

        <NavLink
          to="profile"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
          onClick={() => setIsOpen(false)}
          >
          <Icon icon="gg:profile" width="24" height="24" />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="setting"
          className="focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
          onClick={() => setIsOpen(false)}
        >
          <Icon icon="ci:settings" width="24" height="24" />
          <span>Setting</span>
        </NavLink>

        <NavLink
          to="/"
          className="text-red-600 focus:bg-main hover:bg-main text-base hover:text-white focus:text-white text-textColor px-2 py-3 rounded-lg flex items-center justify-start gap-3 w-52"
          onClick={() => setIsOpen(false)}
          >
          <Icon icon="solar:logout-2-outline" width="24" height="24" />
          <span>Logout account</span>
        </NavLink>
      </div>
        }
      </div>
    </div>
  );
};

export default SideBar;
