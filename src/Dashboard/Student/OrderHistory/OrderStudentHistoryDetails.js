import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Table from "../../../components/Table/Table";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import { Icon } from "@iconify-icon/react";
const OrderStudentHistoryDetails = () => {
  return (
    <div className="OrderDetails">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Order details</h3>
        <Breadcrumbs />
      </div>
      <div className="invoices">
        <h4>invoices</h4>
        <div className="flex justify-between items-start w-full">
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
              <p>6 / 1 /2004</p>
              <p>manar magdy</p>
              <p>(484) 817-2760 x305</p>
              <p>Lamar_Hermann@hotmail.com</p>
              <p>681 W Walnut Street, New Juniorton 90516</p>
              <p>Free</p>
              <p>Paid</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <p className="text-base font-bold text-textColor">Order Id:</p>
            <p className="text-base font-bold text-textColor">#gmnsci</p>
          </div>
        </div>
      </div>
      <div className="table mt-16">
        <h4 className="text-main mb-6">Order summary</h4>
        <Table gray />
      </div>

      <div className="boxes flex justify-start items-center gap-8 mt-8">
      
        <div className="flex justify-start items-end h-[344px] gap-3 flex-col w-full md:w-[50%] bg-white">
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">subtotal</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              0.00 EGP
            </p>
          </div>
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">Getway charge</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              0.00 EGP
            </p>
          </div>
          <div className=" border-b border-b-borderColor w-full text-end px-5 py-1">
            <p className=" text-[#999999] text-[12px]  ">Discount</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              0.00 EGP
            </p>
          </div>
          <div className="w-full text-end px-5 py-1 ">
            <p className=" text-[#999999] text-[12px]  ">Total</p>
            <p className="text-base text-textColor mt-1 font-semibold">
              0.00 EGP
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end my-8">
   <button onClick={()=> window.print()} className="text-white bg-btnColor px-8 py-2 rounded border-btnColor flex justify-center items-center gap-2 hover:scale-105 duration-500">
   <Icon icon="material-symbols:print-outline"  style={{color: '#fff'}} />
    <span>Print</span>
    </button>
      </div>
    </div>
  );
};

export default OrderStudentHistoryDetails;
