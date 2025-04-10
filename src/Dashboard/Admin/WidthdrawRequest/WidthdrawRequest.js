import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";

const WidthdrawRequest = () => {
  return (
    <div className="Categories">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Widthdraw Request</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
        <SearchBar placeholder="Search" />
        <SelectBox title="Status" />
        <SelectBox title="Method" />
      </div>
      <div className="table my-8 bg-white">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Widthdraw Request</h4>
        </div>
        <div className="overflow-x-auto w-[90vw] md:w-full">
          <Table action gray update trash />
        </div>
      </div>
    </div>
  );
};

export default WidthdrawRequest;
