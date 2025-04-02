import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { SelectBox } from "../../../../../components/DropDown/SelectBox";
const filterData = [
  {
    name:'Year',
    value:"year"
  },
  {
    name:'Month',
    value:"month"
  },
  {
    name:'Weekly',
    value:"weekly"
  },
]
const data = [
  { name: "Jan", courses: -0.1, revenue: -0.18, students: -0.05 },
  { name: "Feb", courses: -0.29, revenue: -0.12, students: 0.17 },
  { name: "Mar", courses: -0.17, revenue: -0.0, students: 0.0 },
  { name: "Apr", courses: 0.12, revenue: -0.08, students: -0.12 },
  { name: "May", courses: 0.07, revenue: 0.03, students: 0.17 },
  { name: "Jun", courses: 0.29, revenue: 0.24, students: -0.1 },
  { name: "Jul", courses: 0.29, revenue: 0.21, students: -0.11 },
  { name: "Aug", courses: -0.01, revenue: 0.15, students: 0.12 },
  { name: "Sep", courses: 0.22, revenue: -0.27, students: 0.22 },
  { name: "Oct", courses: -0.11, revenue: 0.08, students: 0.26 },
  { name: "Nov", courses: -0.01, revenue: -0.29, students: 0.01 },
];


const CustomLineChart = () => {
  return (
    <div className="w-full h-full">
    <div className="flex justify-between items-center">
    <p className="text-xl font-semibold text-textColor">Sales in march, 2025</p>
    <SelectBox data={filterData}/>
    </div>
    <ResponsiveContainer width="100%" height='95%' >
      <LineChart
      
        data={data}
        margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeWidth={1} stroke="#F1F1F1" />
        <XAxis dataKey="name" tick={{ fill: "#333" }} />
        <YAxis
          tick={{ fill: "#333" }}
          domain={["auto","auto"]}
          // tickCount={12}
          allowDecimals={true}
          interval={0}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="courses"
          stroke="#FFA5CB"
          strokeWidth={3}
          dot={{ fill: "#FFA5CB", r: 5 }}
        
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#7987FF"
          strokeWidth={3}
          dot={{ fill: "#7987FF", r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="students"
          stroke="#E697FF"
          strokeWidth={3}
          dot={{ fill: "#E697FF", r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
          </div>
  );
};

export default CustomLineChart;
