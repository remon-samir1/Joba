import React from "react";
import "./AdminDashboard.css";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import TopBar from "../TopBar/TopBar";
import Footer from "../../components/Footer/Footer";
const AdminDashboard = () => {
  return (
    <div className="AdminDashboard">
      <div className="flex ">
        <SideBar />
        <div className="flex-1 flex flex-col px-3">
          <TopBar />
          <Outlet />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminDashboard;
