import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";
import { Axios } from "../../../components/Helpers/Axios";
import Notifcation from "../../../components/Notification";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import { AiOutlineLoading } from "react-icons/ai";
const NonVerifiedUsers = () => {
  const [deleted, setDeleted] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  const [loadScreen , setLoadScreen] = useState(false)
//  send verify link
const handleSendVerfiyLink = async() =>{
  setLoadScreen(true)
try{
  await Axios.post('/admin/send-verify-request-to-all').then(data=>{

  setLoadScreen(false)
    toast.success(data.data.messege)
  }
    )
}
catch(err){
  
}
}

  // get data

  useEffect(() => {
    setLoading(true);
    Axios.get(
      `admin/all-customers?page=${page}&keyword=${search}& status=${status}`
    ).then((data) => {
      //data.data);
      setData(
        data.data.data.users.data.filter(
          (data) => data.email_verified_at == null
        )
      );
      setTotal(data.data.data.users.total);
      setLoading(false);
    });
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
      title: "Status",
      key: "status",
    },
  ];
  // status selectbox data
  const statusData = [
    {
      name: "Active",
      value: 1,
    },

    {
      name: "Inactive",
      value: 0,
    },
  ];
  return (
    <div className="Categories">
    
      <Notifcation/>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Non Verified</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
        <SearchBar
          placeholder="Search"
          onchange={(e) => setSearch(e.target.value)}
        />

        <SelectBox
          title="Status"
          data={statusData}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>
      <div className="table my-8 bg-white ">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base "> Non Verified</h4>
          <button disabled={loadScreen} onClick={handleSendVerfiyLink} className="flex justify-between gap-2 items-center text-white bg-[#0048D3] py-2 px-4 rounded-md  border border-[#0048D3] duration-500 hover:bg-white hover:text-[#0048D3]">
            {
          loadScreen? <AiOutlineLoading className="load-icon"/> :
              <FaPlus />
            }
            <span>Send verify link to all</span>
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
      </div>
    </div>
  );
};

export default NonVerifiedUsers;
