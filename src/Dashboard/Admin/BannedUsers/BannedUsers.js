import React from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { SelectBox } from '../../../components/DropDown/SelectBox';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import { FaPlus } from "react-icons/fa6";
import { useEffect } from 'react';
import { Axios } from '../../../components/Helpers/Axios';
import { useState } from 'react';
import Pagination from '../../../components/Pagination/Pagination';

const BannedUsers = () => {
  const [deleted, setDeleted] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  // get data

  useEffect(() => {
    setLoading(true);
    Axios.get(`admin/all-customers?page=${page}&keyword=${search}& verified=${status}`).then(
      (data) => {
        console.log(data.data);
        setData(data.data.data.users.data.filter(data=> data.is_banned !== 'no'));
        setTotal(data.data.data.users.total);
        setLoading(false);
      }
    );
  }, [search, deleted, status]);

  // headers of table
  const headers = [
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Email",
      key: "email",
    },
    {
      title: "Jointed at",
      key: "created_at",
    },
    {
      title: "Verified",
      key: "email_verified_at",
    },
  
  ];
  // status selectbox data
  const statusData = [
    {
      name: "Verified",
      value: 1,
    },

    {
      name: "Not Verified",
      value: 0,
    },
  ];
  return (
    <div className='Categories'>
        <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Banned users</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
        <SearchBar placeholder='Search'/>
        <SelectBox title="select Verified" data={statusData} onChange={(e)=> setStatus(e.target.value)} />

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
    <Table
            url="admin/customer-status-update"
            headers={headers}
            data={data}
            setDeleted={setDeleted}
            loading={loading}
            action
            gray
            view
            trash
          />
        </div>
        <div className="flex justify-end p-5 px-10">
          <Pagination total={total} setPage={setPage} itemsPerPage={15}/>
          </div>
      </div>
    </div>
  );
}

export default BannedUsers;
