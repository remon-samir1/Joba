import React, { useEffect, useState } from "react";
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

const CustomLineChart = (props) => {
  const [filter , setFilter] = useState('year')
  const [data , setData] = useState( );
  useEffect(()=>{
    setData(props.data?.yearly )


    if(filter === 'year'){
  setData(props.data?.yearly )
    }else if(filter === 'month'){
      setData(props.data?.monthly )
    }else{
      setData(props.data?.weekly )
    }
  },[filter , props.data])
  console.log(filter);
  return (
    <div className="w-full h-[26rem] md:h-full">
    <div className="flex justify-between items-center px-5">
    <p className="text-xl font-semibold text-textColor">Sales in march, 2025</p>
    <SelectBox data={filterData} onChange={(e)=>setFilter(e.target.value)} value={filter}/>
    </div>
    <ResponsiveContainer width="100%" height='95%' >
      <LineChart
      
      data={data}
      margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
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
