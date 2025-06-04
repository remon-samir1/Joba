import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";
import { Axios } from "../../../components/Helpers/Axios";
import { useState } from "react";
import { useEffect } from "react";

const WidthdrawRequest = () => {
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
    Axios.get(`/admin/withdraw-method?page=${page}&keyword=${search}& status=${status}`).then(
      (data) => {
        console.log(data.data);
        // setData(data.data.methods.data);
        // setTotal(data.data.methods.total);
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
      title: "Minimum amount",
      key: "max_amount",
    },
    {
      title: "Maximum amount",
      key: "min_amount"
    },

    {
      title: "Status",
      key: "status", 
      type:'show'
    },
  ];
  // status selectbox data
  const statusData = [
    {
      name: "Active",
      value: 'active',
    },

    {
      name: "Inactive",
      value: 'inactive',
    },
  ];
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
