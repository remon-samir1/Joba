import React, { useContext } from "react";
import "./MainAdminPage.css";
import MainAdminPageBox from "./MainAdminPageBox/MainAdminPageBox";
import { MainAdminPageBoxData } from "./MainAdminPageBox/MainAdminPageBoxData";

import CustomPieChart from "./Charts/PieChart/PieChart";
import CustomLineChart from "./Charts/LineChart/LineChart";

import Recents from "./Recents/Recents";
import { Menu } from "../../../Context/MenuContext";
import { WindowSize } from "../../../Context/WindowSizeContext";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";

const MainAdminPage = () => {
useEffect(()=>{
  Axios.get('/admin/dashboard').then(data=>console.log(data))
},[])



  const menu = useContext(WindowSize);

  return (
    <div className="MainAdminPage ">
      <h3 className="font-bold text-textColor text-xl">Dashboard</h3>
      <div className="mt-4 flex flex-wrap gap-5 justify-start items-center boxes">
        {MainAdminPageBoxData.map((data, index) => (
          <MainAdminPageBox
            key={index}
            icon={data.icon}
            title={data.title}
            count={data.count}
          />
        ))}
      </div>
      <div className="charts flex mt-8 gap-4 flex-wrap h-max">
        <div className="line flex-1">
          <CustomLineChart />
        </div>
        <div className="pie w-full">
          <CustomPieChart />
        </div>
      </div>

      <div className="my-8 flex justify-center flex-wrap items-center gap-3 flex-col md:flex-row">
        <Recents />
        <Recents />
        <Recents />
      </div>
    </div>
  );
};

export default MainAdminPage;
