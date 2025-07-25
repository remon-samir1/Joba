import React, { useContext } from "react";
import "./StudentTopBar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Logo from "../../../components/Logo/Logo";
import { Menu } from "../../../Context/MenuContext";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { useState } from "react";
import { CartCh } from "../../../Context/CartContext";
import { StudentSearch } from "../../../Context/StudentSearchContext";
const StudentTopBar = () => {
  const cartch = useContext(CartCh);
  const cartChange = cartch.cartChange;
  const [name, setName] = useState()
  //  cart notification
  const [cart, setCart] = useState();
  useEffect(() => {
    Axios.get("/cart").then((data) => {
      console.log(data);
      const product = data.data.products;
      const arr = Object.values(product);
      setCart(arr.length);
    });
    Axios.get("/student/setting").then(data => setName(data.data.user.name))
  }, [cartChange]);

  const StudentSearchContext = useContext(StudentSearch);
  const studentSearchState = StudentSearchContext.studentSearch;
  const setStudentSearchState = StudentSearchContext.setStudentSearch;

  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const isOpen = menu.isOpen;

  console.log(studentSearchState);
  const nav = useNavigate();
  return (
    <div className="parant-topbar">
      <div className="header">
        <div className="logo flex items-center w-full justify-between">
          <Logo small />

          <div className="flex items-center !justify-center gap-4 w-ma">
            <Link to="/student/cart" className="relative">
              <div className="absolute top-0 right-[-3px] w-4 h-4 bg-main rounded-full  flex justify-center items-center">
                <span className="text-white text-[11px] font-semibold">
                  {cart}
                </span>
              </div>
              <Icon
                icon="game-icons:shopping-cart"
                width="28"
                height="28"
                className="text-main cursor-pointer"
              />
            </Link>
            <Link to="/student/profile">
              <Icon
                icon="iconamoon:profile-light"
                width="28"
                height="28"
                className="text-main cursor-pointer"
              />
            </Link>
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
          <p>Welcome ,{name}</p>
          <p className="text-[1rem] text-text2 mt-4">
            Learn at the comfort of your own home
          </p>
        </div>
      </div>
      <div className="StudentTopBar">
        <div className="hidden md:flex flex-col items-start justify-start">
          <h3 className="text-[1.5rem] text-textColor font-bold capitalize">
            Welcome ,{name}
          </h3>
          <p className="text-[1rem] text-text2 mt-4">
            Learn at the comfort of your own home
          </p>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <SearchBar
            placeholder="Search course here"
            value={studentSearchState}
            onchange={(e) => {
              nav("/student/explore");
              setStudentSearchState(e.target.value);
            }}
          />
          <div className="user">
            <div className="icon-container">
              <Icon
                className="icon"
                icon="mingcute:notification-line"
                width="24"
                height="24"
              />
            </div>
            <Link className="link">
              <Link to="/student/profile" className="icon-container">
                <Icon
                  width={24}
                  height={24}
                  icon="iconoir:user"
                  className=" icon"
                />
              </Link>
            </Link>
            <Link to="/student/cart" className="icon-container relative z-50">
              <div className="absolute top-[-5px] right-[-8px] w-5 h-5 bg-main rounded-full z-50  flex justify-center items-center">
                <span className="text-white text-[12px] font-semibold">
                  {cart}
                </span>
              </div>
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
