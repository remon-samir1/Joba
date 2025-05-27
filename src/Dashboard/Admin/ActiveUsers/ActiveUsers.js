import React from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import { SelectBox } from '../../../components/DropDown/SelectBox';
import SearchBar from '../../../components/SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import Table from '../../../components/Table/Table';
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react';
import { useEffect } from 'react';
import Pagination from '../../../components/Pagination/Pagination';
import { Axios } from '../../../components/Helpers/Axios';

const ActiveUsers = () => {
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
    Axios.get(`admin/all-customers?page=${page}&keyword=${search}`).then(
      (data) => {
        console.log(data.data);
        setData(data.data.data.users.data.filter(data=> data.status == 'active'));
        setTotal(data.data.data.users.total);
        setLoading(false);
      }
    );
  }, [search, deleted, ]);

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

  ];

  return (
    <div className='Categories'>
        <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Active Users</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
      <SearchBar placeholder="Search" onchange={(e)=>setSearch(e.target.value)}/>


      </div>
      <div className="table my-8 bg-white w-full">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Active Users</h4>
        
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

export default ActiveUsers;
