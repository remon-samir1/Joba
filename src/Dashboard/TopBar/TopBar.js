import React from "react";
import "./TopBar.css";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
const TopBar = () => {
  return (
    <div className="TopBar">
      <div>
        <div className="icon-container">

        <Icon icon="grommet-icons:language" width={20} height={20} className="icon" />
        </div>
      <SearchBar placeholder='Search course here'/>
      </div>
      <div className="user">
        <Link to="/" className="link">
          <Icon width={24} height={24}
            icon="hugeicons:home-11"
            className="text-textColor icon"
          />
          <span>visit website</span>
        </Link>
        <Link className="link">
          <div className="icon-container">

          <Icon width={24} height={24} icon="iconoir:user" className=" icon" />
          </div>
          <span>JAY johnson</span>
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
