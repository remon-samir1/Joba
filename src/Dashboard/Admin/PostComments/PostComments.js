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

const PostComments = () => {
  const [deleted, setDeleted] = useState(false);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("");
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(
      `/admin/blog-comment?keyword=${search}&post=${post}&status=${status}`
    ).then((data) => {
      //data);
      setData(data.data.data.comments.data);
      setTotal(data.data.data.comments.total);
      setLoading(false);
    });
  }, [search, deleted, status ,post]);

  // headers of table
  const headers = [
    {
      title: "Comment",
      key: "comment",
    },
    {
      title: "Post",
      key: "post",
    },

    {
      title: "Name",
      key: "user_name",
    },
    {
      title: "Email",
      key: "user_email",
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
  const postData = [
    {
      name: "Comments",
      value: 'comments',
    },

    {
      name: "Language",
      value: 'language',
    },
  ];
  //status);
  return (
    <>
      <Notifcation />
      <div className="Categories">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl"> Post Comments</h3>
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
        <div className="table my-8 bg-white">
          <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
            <h4 className="text-main text-base ">Post Comments</h4>
          
          </div>
          <div className="overflow-x-auto w-[90vw] md:w-full">
            <Table
              action
              gray
              trash
              headers={headers}
              data={data}
              loading={loading}
              url="admin/blog-comment"
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

export default PostComments;
