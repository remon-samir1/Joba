import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import DateInput from "../../../components/DateInput/DateInput";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";

import "./Courses.css";
import React from "react";

const Courses = () => {
  return (
    <div className="Courses">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl">Courses</h3>
        <Breadcrumbs />
      </div>

      <div className="filters">
        <SearchBar placeholder='Search'/>
      <DateInput/>
      <SelectBox title='Category'/>
      <SelectBox title='Instarctor'/>
      <SelectBox title='Statue'/>
      <SelectBox title='Approval statue'/>
      </div>
      {/* <div className="table my-8 bg-white">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Courses</h4>
          <Link className="flex justify-between gap-2 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500">
          <FaPlus/>
          <span>add new</span>
          </Link>
        </div>
        <Table/>
      </div> */}
    </div>
  );
};

export default Courses;
