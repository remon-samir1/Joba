import React from 'react';
import './SubCategory.css'
import Breadcrumbs from '../../../../components/Breadcrumbs/Breadcrumbs';
import { SelectBox } from '../../../../components/DropDown/SelectBox';
import SearchBar from '../../../../components/SearchBar/SearchBar';
import { Link, useParams } from 'react-router-dom';
import Table from '../../../../components/Table/Table';
import { FaPlus } from "react-icons/fa6";
import { useState } from 'react';
import { Axios } from '../../../../components/Helpers/Axios';
import { useEffect } from 'react';
import Pagination from '../../../../components/Pagination/Pagination';

const SubCategory = () => {
  const [deleted ,setDeleted] = useState(false)
  const [categories, setCategories] = useState([]);
  const [parentName, setParentName] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search , setSearch] = useState('')
  const {id} =useParams()
  console.log(id);
  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(`/admin/course-sub-category/${id}?page=${page}&keyword=${search}& status=${status}`).then((data) => {
      console.log(data);
      setCategories(data.data.message.categories.data);
      setParentName(data.data.message.parentCategory.name);
      
      setTotal(data.data.message.categories.total);
      setLoading(false);
    });
  }, [search,deleted, status]);

  // headers of table
  const headers = [
  
    {
      title: "Name",
      key: "name",
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
    name:'Active',
    value:1
  },
  
  {
    name:'Inactive',
    value:0
  }
]
  return (
    <div className='Categories'>
        <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Sub Category ({parentName && parentName})</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
      <SearchBar placeholder="Search" onchange={(e)=>setSearch(e.target.value)}/>

        <SelectBox title="Status" data={statusData} onChange={(e)=> setStatus(e.target.value)} />

      </div>
      <div className="table my-8 bg-white">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Sub Categories list</h4>
          <Link to='add' className="flex justify-between gap-2 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500">
          <FaPlus/>
          <span>add new</span>
          </Link>
        </div>
    <div className="overflow-x-auto w-[90vw] md:w-full">

    <Table
            action

            update
            trash
            headers={headers}
            data={categories}
            loading={loading}
            url='admin/course-sub-category'
            setDeleted={setDeleted}
          />
        </div>
        <div className="flex justify-end p-5 px-10">
          <Pagination total={total} setPage={setPage} itemsPerPage={15}/>
          </div>
      </div>
    </div>
  );
}

export default SubCategory;
