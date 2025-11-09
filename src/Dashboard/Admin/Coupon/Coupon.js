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
import AddCoupon from "./AddCoupon";

const Coupon = () => {
  const [deleted ,setDeleted] = useState(false)
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search , setSearch] = useState('')
  const [showModal , setShowModal] = useState(false)
  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(`/admin/coupon?page=${page}&keyword=${search}& status=${status}`).then((data) => {
      //data);
      setCategories(data.data.data);
      // setTotal(data.data.data.categories.total);
      setLoading(false);
    });
  }, [search,deleted, status]);

  // headers of table
  const headers = [
    {
      title: "Code",
      key: "coupon_code",
    },
    {
      title: "Max Items",
      key: "coupon_max_cart_items",
    },
    {
      title: "type",
      key: "coupon_type",
    },
    {
      title: "Min Price",
      key: "min_price",
    },
    {
      title: "Offer ",
      key: "offer_percentage",
    },
    {
      title: "End time ",
      key: "expired_date",
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
    name:'Active',
    value:'active'
  },
  
  {
    name:'Inactive',
    value:'inactive'
  }
]


  return (
    <>
    <Notifcation/>
    <div className="Categories">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Coupon</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
        <SearchBar placeholder="Search" onchange={(e)=>setSearch(e.target.value)}/>
        <SelectBox title="Status" data={statusData} onChange={(e)=> setStatus(e.target.value)} />
      </div>
      <div className="table my-8 bg-white">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Coupon</h4>
          <button
        onClick={()=>setShowModal(prev => !prev)}
            className="flex justify-between gap-2 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500"
          >
            <FaPlus />
            <span>add new</span>
          </button>
        </div>
        <div className="overflow-x-auto w-[90vw] md:w-full">
          <Table
            action

            
            trash
            headers={headers}
            data={categories.reverse()}
            loading={loading}
            url='admin/coupon'
            setDeleted={setDeleted}
          />
        </div>
          <div className="flex justify-end p-5 px-10">
          <Pagination total={total} setPage={setPage} itemsPerPage={15}/>
          </div>
      </div>
      {
        showModal && <AddCoupon setShowModal={setShowModal}/>
      }
    </div>
    </>
  );
};

export default Coupon;
