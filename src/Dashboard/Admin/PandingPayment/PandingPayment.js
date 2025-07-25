import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import Table from "../../../components/Table/Table";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import Pagination from "../../../components/Pagination/Pagination";

const PandingPayment = () => {
  const [deleted, setDeleted] = useState(false);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("");

  // get data
  useEffect(() => {
    setLoading(true);
    Axios.get(`/admin/pending-orders?page=${page}&keyword=${search}`)
      .then((data) => {
        console.log(data.data);
        
        
        const OrdersData = data.data.orders.data;
          setOrders(OrdersData);
          setTotal(data.data.orders.total);
        

      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, deleted, status, page, payment]);
  console.log(orders);
  // headers of table
  const headers = [
    {
      title: "User",
      key: "buyer",
    },
    {
      title: "Order Id",
      key: "invoice_id",
    },
    {
      title: "Paid amount",
      key: "paid_amount",
    },

    {
      title: "Status",
      key: "status",
      type: "text",
    },
    {
      title: "Payment",
      key: "payment_status",
    },
  ];

  return (
    <div className="Categories">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Order history</h3>
        <Breadcrumbs />
      </div>
    
      <div className="table my-8 bg-white">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Order history</h4>
        </div>
        <div className="overflow-x-auto w-[90vw] md:w-full">
          <Table
            action
            gray
            view
            trash
            headers={headers}
            data={orders}
            loading={loading}
            url="admin/order-delete"
            setDeleted={setDeleted}
          />
        </div>
        <div className="flex justify-end p-5 px-10">
          <Pagination total={total} setPage={setPage} itemsPerPage={15} />
        </div>
      </div>
    </div>
  );
};

export default PandingPayment;
