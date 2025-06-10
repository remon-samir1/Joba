import React, { useContext } from "react";
import "./MainAdminPage.css";
import MainAdminPageBox from "./MainAdminPageBox/MainAdminPageBox";
// import { MainAdminPageBoxData } from "./MainAdminPageBox/MainAdminPageBoxData";

import CustomPieChart from "./Charts/PieChart/PieChart";
import CustomLineChart from "./Charts/LineChart/LineChart";

import Recents from "./Recents/Recents";
import { Menu } from "../../../Context/MenuContext";
import { WindowSize } from "../../../Context/WindowSizeContext";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { useState } from "react";

const MainAdminPage = () => {
  // const [lineChartData , setLineChartData] = useState([])
  const [data , setData] = useState()
useEffect(()=>{
  Axios.get('/admin/dashboard').then(data=>{
    console.log(data.data);
    setData(data.data.data)
    })
},[])
// console.log(data?.monthly_data)
 const MainAdminPageBoxData = [
  {
    icon: "iconoir:simple-cart",
    title: "Total orders",
    count: data?.total_orders,
  },
  {
    icon: "iconoir:simple-cart",
    title: "Pending orders",
    count: data?.total_pending_orders,
  },
  {
    icon:"stash:graduation-cap-light",
    title: "Total courses",
    count: data?.total_course,
  },
  {
    icon: "stash:graduation-cap-light",
    title: "Pending courses",
    count: data?.total_pending_course,
  },
  {
    icon:"solar:money-bag-outline",
    title: "Year revenue",
    count: data?.this_years_earning,
  },
  {
    icon: "solar:money-bag-outline",
    title: "month revenue",
    count: data?.this_months_earning,
  },
  {
    icon: "solar:money-bag-outline",
    title: "Weekly revenue",
    count: "0",
  },
  {
    icon: "solar:money-bag-outline",
    title: "Total earnings",
    count: data?.total_earning,
  },
];


console.log(data?.monthly_data);
  const menu = useContext(WindowSize);

  return (
    <div className="MainAdminPage ">
      <h3 className="font-bold text-textColor text-xl">Dashboard</h3>
      <div className="mt-4 flex flex-wrap gap-5 justify-center md:justify-start items-center boxes">
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
          <CustomLineChart data={data?.monthly_data}/>
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
