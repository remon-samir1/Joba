import React, { useContext } from "react";
import "./TopBar.css";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import Logo from "../../components/Logo/Logo";
import { Icon } from "@iconify-icon/react";
import { Menu } from "../../Context/MenuContext";
import { useEffect } from "react";
import { Axios } from "../../components/Helpers/Axios";
import { useState } from "react";
const TopBar = () => {
  const [admin, setAdmin] = useState([]);
  useEffect(() => {
    Axios.get("admin/edit-profile").then((data) =>
      setAdmin(data.data.data.admin)
    );
  }, []);
  console.log(admin);
  const menu = useContext(Menu);
  const setIsOpen = menu.setIsOpen;
  const isOpen = menu.isOpen;

  return (
    <div className="parant-topbar">
      <div className="header">
        <div className="logo flex items-center w-full justify-between">
          <Logo small />
          <Icon
            icon="bx:menu-alt-left"
            width={32}
            height={32}
            className="text-main cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
        <div className="name">
          <p>{admin?.name}</p>
        </div>
      </div>
      <div className="TopBar">
        <div>
          <div className="icon-container">
            <Icon
              icon="grommet-icons:language"
              width={20}
              height={20}
              className="icon"
            />
          </div>
          <SearchBar placeholder="Search course here" />
        </div>
        <div className="user">
          <Link to="/" className="link">
            <Icon
              width={24}
              height={24}
              icon="hugeicons:home-11"
              className="text-textColor icon"
            />
            <span>visit website</span>
          </Link>
          <Link className="link" to="/admin/profile">
            <div className="icon-container">
              {admin && (
                <img
                  className="w-full h-full object-cover"
                  src={`https://goba.sunmedagency.com/${admin?.image}`}
                  alt=""
                />
              )}
            </div>
            <span>{admin?.user_name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
