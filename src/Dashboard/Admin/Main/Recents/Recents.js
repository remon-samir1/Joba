import React from "react";
import "./Recents.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
const Recents = () => {
  return (
    <div className="Recents">
      <header className="header">
        <h3>Recnet courses</h3>
        <p>(0) courses are penidng</p>
      </header>
      <div className="body">
        <div className="item">
          <h4>how to make your brand from zero</h4>
          <div className="details">
            <span>Charles Bergstrom</span>
            <span>Approverd</span>
            <span>1 month</span>
          </div>
        </div>
        <div className="item">
          <h4>how to make your brand from zero</h4>
          <div className="details">
            <span>Charles Bergstrom</span>
            <span>Approverd</span>
            <span>1 month</span>
          </div>
        </div>
      </div>
      <div className="recents-footer">
        <Link className="link">view all
        <Icon icon="lsicon:arrow-right-outline" width={16} height={16}  className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Recents;
