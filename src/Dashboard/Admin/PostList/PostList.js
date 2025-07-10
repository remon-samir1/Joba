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
import { useRef } from "react";

const PostList = () => {
  const scrollRef = useRef(null);
  useEffect(()=>{
scrollRef.current.scrollIntoView()
  },[])
  const [deleted, setDeleted] = useState(false);
  const [postLists, setPostLists] = useState([]);
  const [status, setStatus] = useState("");
  const [showHomePage, setShowHomePage] = useState("");
  const [ispopuler , setIspopuler] = useState('')
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(
      `/admin/blogs?keyword=${search}&status=${status}&show_homepage=${showHomePage}&is_popular=${ispopuler}`
    ).then((data) => {
      console.log(data);
      setPostLists(data.data.data.posts.data);
      setTotal(data.data.data.posts.total);
      setLoading(false);
    });
  }, [search, deleted, status ,showHomePage,ispopuler]);

  // headers of table
  const headers = [
    {
      title: "Title",
      key: "title",
      // dir:true
    },
    {
      title: "Category",
      key: "category",
      type: "obj",
    },

    {
      title: "Show home page",
      key: "show_homepage",
    },
    {
      title: "Populer",
      key: "is_popular",
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
  const showHomepageData = [
    {
      name: "yes",
      value: 1,
    },

    {
      name: "No",
      value: 0,
    },
  ];
  const isPopulerData = [
    {
      name: "yes",
      value: 1,
    },

    {
      name: "No",
      value: 0,
    },
  ];
  console.log(status);
  return (
    <>
      <Notifcation />
      <div className="Categories" ref={scrollRef}>
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl"> Post list</h3>
          <Breadcrumbs />
        </div>
        <div className="filters">
          <SearchBar
            placeholder="Search"
            onchange={(e) => setSearch(e.target.value)}
          />
          <SelectBox title="Show homepage" data={showHomepageData} onChange={(e) => setShowHomePage(e.target.value)}/>
          <SelectBox title="Populer" data={isPopulerData} onChange={(e) => setIspopuler(e.target.value)}/>
          <SelectBox
            title="Status"
            data={statusData}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <div className="table my-8 bg-white">
          <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
            <h4 className="text-main text-base ">Post list</h4>
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
              gray
              update
              trash
              headers={headers}
              data={postLists}
              loading={loading}
              url="admin/blogs"
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

export default PostList;
