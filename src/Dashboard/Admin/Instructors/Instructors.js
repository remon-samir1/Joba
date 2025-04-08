import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import DateInput from "../../../components/DateInput/DateInput";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";

import React from "react";

const Instructors = () => {
  return (
    <div className="Courses">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl">Instructors</h3>
        <Breadcrumbs />
      </div>

      <div className="filters">
        <SearchBar placeholder='Search'/>
      <SelectBox title='select vetified'/>
      <SelectBox title='Statue'/>
      </div>
      <div className="table my-8 bg-white w-full">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Instructors</h4>
          <Link className="flex justify-between gap-2 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500">
          <FaPlus/>
          <span>add new</span>
          </Link>
        </div>
    <div className="overflow-x-auto w-[90vw] md:w-full">

        <Table view action trash gray/>
        </div>
      </div>
    </div>
  );
};

export default Instructors;
