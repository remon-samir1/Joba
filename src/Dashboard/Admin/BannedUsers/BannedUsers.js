import React from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { SelectBox } from '../../../components/DropDown/SelectBox';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import { FaPlus } from "react-icons/fa6";

const BannedUsers = () => {
  return (
    <div className='Categories'>
        <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Banned users</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
        <SearchBar placeholder='Search'/>
      <SelectBox title='By name'/>
      <SelectBox title='Status'/>
      </div>
      <div className="table my-8 bg-white ">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Banned users</h4>
          <button className="flex justify-between gap-2 items-center text-white bg-[#D70000] py-2 px-4 rounded-md  border border-[#D70000] duration-500 hover:bg-white hover:text-[#D70000]">
          <FaPlus/>
          <span>Unbanned all users</span>
          </button>
        </div>
    <div className="overflow-x-auto w-[90vw] md:w-full">

        <Table action gray view  trash/>
        </div>
      </div>
    </div>
  );
}

export default BannedUsers;
