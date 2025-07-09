import { Link } from "react-router-dom";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import DateInput from "../../../components/DateInput/DateInput";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";

import "./Courses.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import Pagination from "../../../components/Pagination/Pagination";
import { useRef } from "react";

const Courses = () => {
  const scrollRef = useRef(null);
  useEffect(()=>{
scrollRef.current.scrollIntoView()
  },[])

  const [deleted, setDeleted] = useState(false);
const [courses, setCourses] = useState([]);
const [category, setCategory] = useState();
const [categoryId , setCategoryId] = useState('');
const [selectedDate, setSelectedDate] = useState(0);
const [status, setStatus] = useState('');
const [approved, setApproved] = useState('');
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [total, setTotal] = useState();
const [search, setSearch] = useState("");
// get data
useEffect(() => {
  setLoading(true);
  Axios.get(
    `/admin/courses?page=${page}&keyword=${search}&date=${selectedDate}&status=${status}&approve_status=${approved}&category=${categoryId}`
  ).then((data) => {
    console.log(data.data.data.courses);
    setCourses(data.data.data.courses.data);
    setTotal(data.data.data.courses.total);
    setLoading(false);
  });
}, [search, deleted,selectedDate,status,approved,categoryId,page]);
useEffect(()=>{
  Axios.get(`/admin/course-category`).then(data=>{
    setCategory(data.data.data.categories.data);

  })
},[])
console.log(category);
const categoryData =  category?.map((data,index)=>{
  
    return{
      name:data.name,
      value:data.id
    }
  
})
console.log(categoryData);
// headers of table
const headers = [
  {
    title: "Type",
    key: "type",
  },
  {
    title: "Title",
    key: "title",
  },

  {
    title: "Price",
    key: "price",
  },
  {
    title: "Students",
    key: "enrollments_count",
  },
  {
    title: "Created date",
    key: "created_at",
  },
  {
    title: "Updated date",
    key: "updated_at",
  },
  {
    title: "Status",
    key: "status",
  },
  {
    title: "Approve",
    key: "is_approved",
  },
];
// status selectbox data
const statusData = [
  {
    name:'Active',
    value:"active"
  },
  
  {
    name:'Inactive',
    value:"inactive"
  },
  {
    name:'Draft',
    value:"is_draft"
  }
]
const approvedData = [
  {
    name:'Approved',
    value:"approved"
  },
  
  {
    name:'Disapproved',
    value:"disapproved"
  }
]
  return (
    <div className="Courses" ref={scrollRef}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl">Courses</h3>
        <Breadcrumbs />
      </div>

      <div className="filters">
        <SearchBar
          placeholder="Search"
          onchange={(e) => setSearch(e.target.value)}
        />

        <DateInput setSelectedDate={setSelectedDate} selectedDate={selectedDate}/>
        <SelectBox title="Category" data={categoryData} onChange={(e)=>setCategoryId(e.target.value)}/>
      
        <SelectBox title="Status" data={statusData} onChange={(e)=> setStatus(e.target.value)}/>
        <SelectBox title="Approval status" data={approvedData} onChange={(e)=> setApproved(e.target.value)}/>
      </div>
      <div className="table my-8 bg-white ">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Courses</h4>
          <Link
            to="add"
            className="flex justify-between gap-2 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500"
          >
            <FaPlus />
            <span>add new</span>
          </Link>
        </div>
        <div className="overflow-auto table-container">
        <Table
            action
            update
            trash
            headers={headers}
            data={courses}
            loading={loading}
            url='admin/courses/status-update'
            delurl='/admin/courses/delete'
            setDeleted={setDeleted}
            setData={setCourses}
          />
        </div>
        <div className="flex justify-end p-5 px-10">
          <Pagination total={total} setPage={setPage} itemsPerPage={15}/>
          </div>
      </div>
    </div>
  );
};

export default Courses;
