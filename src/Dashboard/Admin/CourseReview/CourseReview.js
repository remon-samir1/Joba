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

const CourseReview = () => {
  const [deleted, setDeleted] = useState(false);
  const [courseReview, setCourseReview] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(
      `/admin/course-review?page=${page}&keyword=${search}& status=${status}`
    ).then((data) => {
      console.log(data.data.data);
      setCourseReview(data.data.data.reviews.data);
      setTotal(data.data.data.reviews.total);
      setLoading(false);
    });
  }, [search, deleted, status]);

  // headers of table
  const headers = [
    {
      title: "Course",
      key: "course",
    },
    {
      title: "Review",
      key: "review",
    },
    {
      title: "Rating",
      key: "rating",
    },

    {
      title: "Status",
      key: "status",
      type: 'static'
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
  console.log(status);
  return (
    <>
      <Notifcation />
      <div className="Categories">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl"> Course Review</h3>
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
            <h4 className="text-main text-base ">Course Review</h4>
          
          </div>
          <div className="overflow-x-auto w-[90vw] md:w-full">
            <Table
              action
          
              view
              trash
              headers={headers}
              data={courseReview}
              loading={loading}
              url="admin/course-review"
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

export default CourseReview;
