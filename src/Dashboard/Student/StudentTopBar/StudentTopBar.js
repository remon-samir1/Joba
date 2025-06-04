import React, { useContext } from "react";
import "./StudentTopBar.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Logo from "../../../components/Logo/Logo";
import { Menu } from "../../../Context/MenuContext";
const StudentTopBar = () => {
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const isOpen = menu.isOpen;

  return (
    <div className="parant-topbar">
      <div className="header">
        <div className="logo flex items-center w-full justify-between">
          <Logo small />
          <div className="flex items-center gap-3">
            <Icon
              icon="game-icons:shopping-cart"
              width="28"
              height="28"
              className="text-main cursor-pointer"
            />

            <Icon
              icon="iconamoon:profile-light"
              width="28"
              height="28"
              className="text-main cursor-pointer"
            />
            <Icon
              icon="hugeicons:menu-square"
              width="28"
              height="28"
              className="text-main cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            />
          </div>
        </div>
        <div className="name">
          <p>Welcome ,Jay Johnson</p>
          <p className="text-[1rem] text-text2 mt-4">
            Learn at the comfort of your own home
          </p>
        </div>
      </div>
      <div className="StudentTopBar">
        <div className="hidden md:flex flex-col items-start justify-start">
          <h3 className="text-[1.5rem] text-textColor font-bold capitalize">
            Welcome ,Jay Johnson
          </h3>
          <p className="text-[1rem] text-text2 mt-4">
            Learn at the comfort of your own home
          </p>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <SearchBar placeholder="Search course here" />
          <div className="user">
            <div className="icon-container">

          <Icon className="icon" icon="mingcute:notification-line" width="24" height="24" />
            </div>
            <Link className="link">
              <div className="icon-container">
                <Icon
                  width={24}
                  height={24}
                  icon="iconoir:user"
                  className=" icon"
                />
              </div>
            </Link>
            <Link to='/student/cart' className="icon-container">
            <Icon
              icon="game-icons:shopping-cart"
              width="24"
              height="24"
              className="text-text2 opacity-90"
            />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTopBar;
