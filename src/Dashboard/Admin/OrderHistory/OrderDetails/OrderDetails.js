import React from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import "./OrderDetails.css";
import Table from "../../../../components/Table/Table";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { Icon } from "@iconify-icon/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Axios } from "../../../../components/Helpers/Axios";
import { useState } from "react";
import TransformDate from "../../../../components/Helpers/TransformDate";
import { toast } from "react-toastify";
import Notifcation from "../../../../components/Notification";
const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState({
    payment_status: "",
    order_status: "",
  });
  const orderPaymentData=[
    {
      name:'Pending',
      value:'pending'
    },
    {
      name:'Paid',
      value:'paid'
    },
    {
      name:'Cancelled',
      value:'cancelled'
    }
  ] 
  const orderStatusData = [
    {
      name : "Pending",
      value:'pending'
    },
    {
      name : "Processing",
      value:'processing'
    },
    {
      name : "Compeleted",
      value:'compeleted'
    },
    {
      name : "Declined",
      value:'declined'
    },
  ];
  useEffect(() => {
    setLoading(true);
    Axios.get(`admin/orders`).then((data) => {
      console.log(data);
      const OrderData = data.data.orders.data.filter((data) => data.id == id)[0]
      setOrder(OrderData);
      setStatusUpdate({...statusUpdate , payment_status : OrderData.payment_status , order_status : OrderData.status})
      setLoading(false);
    });
  }, []);
  console.log(statusUpdate);
  const handleStautsUpdate = async()=>{
    setLoading(true)
    try{
await Axios.post(`/admin/update-order/${order?.id}` , statusUpdate).then(data=>{
  toast.success('Order Updated Successfly')
  console.log(data)})
    }catch(err){
console.log(err);
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="OrderDetails">
      <Notifcation/>
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Order details</h3>
        <Breadcrumbs />
      </div>
      <div className="invoices">
        <h4>invoices</h4>
        <div className="flex justify-between items-start w-full flex-wrap">
          <div className="details">
            <div className="hedaers">
              <p>Order date:</p>
              <p>Billed to:</p>
              <p>Phone Number:</p>
              <p>Email:</p>
              <p>Address:</p>
              <p>Paymentn Method:</p>
              <p>Paymentn Status:</p>
            </div>
            <div className="data">
              <p>{TransformDate(order?.created_at)}</p>
              <p> {order?.buyer.name || "Empty"}</p>
              <p>{order?.buyer.phone || "Empty"}</p>
              <p>{order?.buyer.email || "Empty"}</p>
              <p>{order?.buyer.address || "Empty"}</p>
              <p>{order?.payment_method}</p>
              <p>{order?.payment_status}</p>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 md:mt-0">
            <p className="text-base font-bold text-textColor">Order Id:</p>
            <p className="text-base font-bold text-textColor">
              {order?.invoice_id}
            </p>
          </div>
        </div>
      </div>
      <div className="table mt-16">
        <h4 className="text-main mb-6">Order summary</h4>
        <Table gray />
      </div>

      <div className="boxes flex md:flex-row flex-col justify-center items-center gap-8 mt-8">
        <div className="flex justify-start items-start p-4 h-[344px] gap-3 flex-col w-full flex-1 bg-white">
          <h3 className="text-base font-semibold text-main">Payment status</h3>
          <SelectBox  disabled={order?.payment_status & loading === 'paid' ? true : false} data={orderPaymentData} value={statusUpdate.payment_status}    onChange={(e)=>setStatusUpdate({...statusUpdate , payment_status : e.target.value})}/>
          <h3 className="text-base font-semibold text-main mt-8">
            Order status
          </h3>
          <SelectBox  data={orderStatusData} value={statusUpdate.order_status} onChange={(e)=>setStatusUpdate({...statusUpdate , order_status : e.target.value})}/>
          <button onClick={handleStautsUpdate} className="text-base text-white bg-main px-8 rounded py-2 mt-4">
            Update
          </button>
        </div>
        <div className="flex justify-start items-end h-[344px] w-full gap-3 flex-col flex-1 bg-white">
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">subtotal</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {order?.subTotal} EGP
            </p>
          </div>
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">Getway charge</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {order?.gateway_charge} EGP
            </p>
          </div>
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1">
            <p className=" text-[#999999] text-[12px]  ">Discount</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {order?.discount} EGP
            </p>
          </div>
          <div className="w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">Total</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              {order?.paid_amount} EGP
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end my-8">
        <button
          onClick={() => window.print()}
          className="text-white bg-btnColor px-8 py-2 rounded border-btnColor flex justify-center items-center gap-2 hover:scale-105 duration-500"
        >
          <Icon
            icon="material-symbols:print-outline"
            style={{ color: "#fff" }}
          />
          <span>Print</span>
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
