import React from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { SelectBox } from '../../../components/DropDown/SelectBox';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import { FaPlus } from "react-icons/fa6";

const WithdrawMethod = () => {
  return (
    <div className='Categories'>
        <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Withdraw Method</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
        <SearchBar placeholder='Search'/>
  
      <SelectBox title='Status'/>
      </div>
      <div className="table my-8 bg-white">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Withdraw Method</h4>
          <Link className="flex justify-between gap-2 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500">
          <FaPlus/>
          <span>add new</span>
          </Link>
        </div>
    <div className="overflow-x-auto w-[90vw] md:w-full">

        <Table action gray update trash/>
        </div>
      </div>
    </div>
  );
}

export default WithdrawMethod;
