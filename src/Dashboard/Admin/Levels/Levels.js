import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";
import { Axios } from "../../../components/Helpers/Axios";
import Pagination from "../../../components/Pagination/Pagination";
import Notifcation from "../../../components/Notification";

const Levels = () => {
  const [deleted, setDeleted] = useState(false);
  const [levels, setLevels] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(
      `/admin/course-level?page=${page}&keyword=${search}& status=${status}`
    ).then((data) => {
      console.log(data.data.data);
      setLevels(data.data.data.courseLevels.data);
      setTotal(data.data.data.courseLevels.total);
      setLoading(false);
    });
  }, [search, deleted, status]);

  // headers of table
  const headers = [
    {
      title: "Name",
      key: "name",
      dir:true
    },
    {
      title: "Slug",
      key: "slug",
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
  console.log(status);
  return (
    <>
      <Notifcation />
      <div className="Categories">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl"> Levels</h3>
          <Breadcrumbs />
        </div>
        <div className="filters">
          <SearchBar
            placeholder="Search"
            onchange={(e) => setSearch(e.target.value)}
          />
          <SelectBox title="By name" />
          <SelectBox
            title="Status"
            data={statusData}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="table my-8 bg-white">
          <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
            <h4 className="text-main text-base ">Levels</h4>
            <Link
              to="add"
              className="flex justify-between gap-2 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500"
            >
              <FaPlus />
              <span>add new</span>
            </Link>
          </div>
          <div className="overflow-x-auto w-[90vw] md:w-full">
            <Table
              action
          
              update
              trash
              headers={headers}
              data={levels}
              loading={loading}
              url="admin/course-level"
              setDeleted={setDeleted}
            />
          </div>
          <div className="flex justify-end p-5 px-10">
            <Pagination total={total} setPage={setPage} itemsPerPage={15} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Levels;
