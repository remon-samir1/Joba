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

const OrderHistory = () => {
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
    Axios.get(`/admin/orders?page=${page}&keyword=${search}`)
      .then((data) => {
        //data.data);
        const OrdersData = data.data.orders.data;

        if (status !== "") {
          setOrders(
            OrdersData.filter((data) => data.status === status)
          );
        } else if (payment !== "") {
          setOrders(
            OrdersData.filter((data) => data.payment_status === payment)
          );
        } else {
          setOrders(OrdersData);
        }

        setTotal(data.data.orders.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, deleted, status, page, payment]);
  //orders);
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
  // status selectbox data
  const statusData = [
    {
      name: "Pending",
      value: "pending",
    },
    {
      name: "Processing",
      value: "processing",
    },
    {
      name: "Compeleted",
      value: "compeleted",
    },
    {
      name: "Declined",
      value: "declined",
    },
  ];

  const orderPaymentData = [
    {
      name: "Pending",
      value: "pending",
    },
    {
      name: "Paid",
      value: "paid",
    },
    {
      name: "Cancelled",
      value: "cancelled",
    },
  ];
  return (
    <div className="Categories">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Order history</h3>
        <Breadcrumbs />
      </div>
      <div className="filters">
        <SearchBar
          placeholder="Search"
          onchange={(e) => setSearch(e.target.value)}
        />

        <SelectBox
          title="Payment"
          data={orderPaymentData}
          onChange={(e) => setPayment(e.target.value)}
        />
        <SelectBox
          title="Status"
          data={statusData}
          onChange={(e) => setStatus(e.target.value)}
        />
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

export default OrderHistory;
