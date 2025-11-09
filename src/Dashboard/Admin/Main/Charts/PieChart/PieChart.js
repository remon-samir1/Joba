import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { SelectBox } from "../../../../../components/DropDown/SelectBox";
import { useEffect } from "react";
import { useState } from "react";

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


// const dataa = [
//   { name: "Total Courses", value: 87 },
//   { name: "Total Revenue", value: 13 },
// ];


const COLORS = ["#546EFF", "#FF6384"];

const CustomPieChart = (props) => {
  const [filter , setFilter] = useState('year')
  const [data , setData] = useState( );
  useEffect(()=>{
    // setData(props.data?.yearly_data )


    if(filter === 'year'){
  setData(props.data?.yearly_data )
    }else if(filter === 'month'){
      setData(props.data?.monthly_data )
    }else{
      setData(props.data?.weekly_data )
    }
  },[filter , props.data])
//filter);
  return (
    <>
      <div className="flex justify-end mb-3">
          <SelectBox data={filterData} onChange={(e)=>setFilter(e.target.value)}/>

      </div>
      <div style={{ textAlign: "center" , display:'grid' , placeItems:'center' }} width="200px">
        <h3
          style={{ color: "#FF5733", fontWeight: "bold", marginBottom: "5px" }}
        >
          Revenue:  {props.revenue}
        </h3>
        <h4 style={{ marginTop: 0 }}>{props.orders} Orders</h4>
        <PieChart width={280} height={220}>
          <Pie
            data={data
            }
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={10}
                >
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
          >
            {Array.isArray(data) &&  data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            alignItems: "start",
            marginTop: "0px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                backgroundColor: COLORS[0],
                display: "inline-block",
                marginRight: 5,
                borderRadius: "50%",
              }}
            ></span>
            <span className="text-sm">Total Courses</span>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                width: 12,
                height: 12,
                backgroundColor: COLORS[1],
                display: "inline-block",
                marginRight: 5,
                borderRadius: "50%",
              }}
            ></span>
            <span className="text-sm">Total Revenue</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomPieChart;
