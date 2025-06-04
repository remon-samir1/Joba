import React, { useContext } from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import Footer from "../../components/Footer/Footer";
import { Menu } from "../../Context/MenuContext";
import StudentTopBar from "./StudentTopBar/StudentTopBar";
const StudentDashboard = () => {

  return (
    <div className="AdminDashboard">
      <div className="flex ">
        <SideBar />
        <div className={`flex-1 flex flex-col px-3 `}   >
          <StudentTopBar />
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default StudentDashboard;
