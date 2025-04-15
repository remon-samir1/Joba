import React, { useEffect, useState } from "react";
import "./Categories.css";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";
import { Axios } from "../../../components/Helpers/Axios";
import Pagination from "../../../components/Pagination/Pagination";

const Categories = () => {
  const [deleted ,setDeleted] = useState(false)
  const [categories, setCategories] = useState([]);
  const [categoryStatus, setCategoryStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(`/admin/course-category?page=${page}&Search=w`).then((data) => {
      console.log(data.data.data.categories);
      setCategories(data.data.data.categories.data);
      setTotal(data.data.data.categories.total);
      setLoading(false);
    });
  }, []);

  // headers of table
  const headers = [
    {
      title: "Icon",
      key: "icon",
    },
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Slug",
      key: "slug",
    },
    {
      title: "Show ata trading",
      key: "show_at_trending",
    },
    {
      title: "Status",
      key: "status",
    },
  ];

  return (
    <div className="Categories">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Categories</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
        <SearchBar placeholder="Search" />
        <SelectBox title="By name" />
        <SelectBox title="Status" />
      </div>
      <div className="table my-8 bg-white">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Categories</h4>
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
            sub
            update
            trash
            headers={headers}
            data={categories}
            loading={loading}
            url='/admin/course-category'
            setDeleted={setDeleted}
          />
        </div>
          <div className="flex justify-end p-5 px-10">
          <Pagination total={total} setPage={setPage} itemsPerPage={15}/>
          </div>
      </div>
    </div>
  );
};

export default Categories;
