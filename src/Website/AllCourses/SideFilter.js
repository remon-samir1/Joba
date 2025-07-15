import { Icon } from "@iconify-icon/react";
import React from "react";
import { useEffect } from "react";
import { Axios } from "../../components/Helpers/Axios";
import { useState } from "react";

const SideFilter = ({setSearch}) => {
  const [lvls, setLvls] = useState([]);

  // useEffect(() => {
  //   Axios.get("admin/course-level").then((data) =>
  //     setLvls(data.data.data.courseLevels.data)
  //   );
  // }, []);


  const prices = [
    {
      name: "Paid",
      value: "1",
    },
    {
      name: "Free",
      value: "0",
    },
  ];
  return (
    <div className="w-[360px] border rounded px-3 py-4 bg-white">
      <input
        type="text"
        onChange={(e)=>setSearch(e.target.value)}

        placeholder="Search"
        className="outline-none focus:border-b-main  bg-transparent w-full !border-b border-b-[#ddd] p-3 text-text2  "
      />
      <div className="mt-6 flex items-center gap-3">
        <Icon
          icon="hugeicons:menu-square"
          width="26"
          height="26"
          className="text-main"
        />
        <span className="text-textColor text-[1.3rem] font-semibold">
          Courses
        </span>
      </div>
      {Array.from({ length: 4 }).map((data, index) => (
        <div className="flex items-center gap-2 mt-4 ">
          <input
            className="accent-main w-[18px] h-[18px]"
            type="checkbox"
            name="Bussins"
            id="bussines"
          />
          <label
            htmlFor="bussines"
            className="text-textColor font-medium text-[1.2rem]"
          >
            bussines
          </label>
        </div>
      ))}

      <div className="mt-6 flex items-center gap-3">
        <Icon
          icon="ic:round-layers"
          width="26"
          height="26"
          className="text-main"
        />
        <span className="text-textColor text-[1.3rem] font-semibold">
          Levels
        </span>
      </div>
      {lvls?.map((data, index) => (
        <div className="flex items-center gap-2 mt-4 ">
          <input
            className="accent-main w-[18px] h-[18px]"
            type="checkbox"
            name="Bussins"
            id="bussines"
          />
          <label
            htmlFor="bussines"
            className="text-textColor font-medium text-[1.2rem]"
          >
          {data.name.name}
          </label>
        </div>
      ))}
      <div className="mt-6 flex items-center gap-3">
        <Icon
          icon="ic:outline-price-change"
          width="26"
          height="26"
          className="text-main"
        />
        <span className="text-textColor text-[1.3rem] font-semibold">
          Price
        </span>
      </div>
      {prices.map((data, index) => (
        <div className="flex items-center gap-2 mt-4 ">
          <input
            className="accent-main w-[18px] h-[18px]"
            type="checkbox"
            name={data.name}
            id={data.name}
          />
          <label
            htmlFor={data.name}
            className="text-textColor font-medium text-[1.2rem]"
          >
            {data.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default SideFilter;
