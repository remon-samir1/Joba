import React from "react";
import { useState } from "react";
import Instapay from "./Instapay";
import Visa from "./Visa";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";

const Payment = () => {
  const [method, setMethod] = useState("insta");
  const [details , setDetails] = useState() 
  useEffect(()=>{
    Axios.get('./checkout').then(data => {
      setDetails(data.data)
      console.log(data)})
  },[])
  return (
    <div className="flex items-start gap-4 flex-wrap md:flex-row flex-col ">
      {/* Payment Method */}
      <div className="flex-1 p-4 min-w-max w-full bg-white border border-[#dddd] rounded overflow-hidden">
        <h3 className="text-textColor text-base">Payment method</h3>
        <div className="flex justify-center items-start gap-7 mt-6">
          <div
            onClick={() => setMethod("insta")}
            className="flex flex-col justify-center items-center gap-3 "
          >
            <div
              className={`w-[6.5rem] h-[5.9rem] border-[0.5px] cursor-pointer border-[#dddd] flex justify-center items-center rounded-lg ${
                method === "insta" && "!border-2 !border-main"
              }`}
            >
              <img
                src={require("../../../images/instapay.png")}
                alt="instapay"
                loading="lazy"
                className=""
              />
            </div>
            <span
              className={`text-[0.9rem] text-textColor ${
                method === "insta" && "!text-main"
              }`}
            >
              instapay
            </span>
          </div>
          <div
            onClick={() => setMethod("wallet")}
            className="flex flex-col justify-center items-center gap-3 "
          >
            <div
              className={`w-[6.5rem] h-[5.9rem] border-[0.5px] cursor-pointer border-[#dddd] flex justify-center items-center rounded-lg ${
                method === "wallet" && "!border-2 !border-main"
              }`}
            >
              <img
                src={require("../../../images/wallet.png")}
                alt="instapay"
                loading="lazy"
                className=""
              />
            </div>
            <span
              className={`text-[0.9rem] text-textColor ${
                method === "wallet" && "!text-main"
              }`}
            >
              E-wallet
            </span>
          </div>
          <div
            onClick={() => setMethod("visa")}
            className="flex flex-col justify-center items-center gap-3 "
          >
            <div
              className={`w-[6.5rem] h-[5.9rem] border-[0.5px] cursor-pointer border-[#dddd] flex justify-center items-center rounded-lg ${
                method === "visa" && "!border-2 !border-main"
              }`}
            >
              <img
                src={require("../../../images/visa-pay.png")}
                alt="instapay"
                loading="lazy"
                className=""
              />
            </div>
            <span
              className={`text-[0.9rem] text-textColor ${
                method === "visa" && "!text-main"
              }`}
            >
              visa
            </span>
          </div>
        </div>
        {method === "insta" || method === "wallet" ? (
          <Instapay />
        ) : (
          method === "visa" && <Visa />
        )}
      </div>

      {/*  Your Order */}

      <div className="md:w-[338px] w-full  h-max py-5 px-3 rounded bg-white border border-[#dddd]">
        <div className="text-center">
          <h3 className="text-textColor text-[1rem] py-3 mb-3">Your order</h3>
        </div>
        <div className="py-3 border-b border-[#ddd flex justify-between items-center]">
          <span className="text-base text-textColor">Course</span>
          <span className="text-base text-textColor">Subtotal</span>
        </div>
{
  details?.products?.map((data,index)=>(
    <div key={index} className="py-3 border-b border-[#ddd flex justify-between items-center]">
    <span className="text-base text-textColor">
  {data.name}
    </span>
    <span className="text-base text-textColor">{data.price}</span>
  </div>
  ))
}

        <div className="py-3 border-b border-[#ddd flex justify-between items-center]">
          <span className="text-base text-textColor">Discount </span>
          <span className="text-base text-textColor"> {details?.discountPercent}</span>
        </div>
        <div className="py-3 border-b border-[#ddd flex justify-between items-center]">
          <span className="text-base text-textColor">Total </span>
          <span className="text-base text-textColor"> {details?.total}</span>
        </div>
        <div className="flex items-center gap-3 mt-6">
          <input
            placeholder="Discount code"
            type="text"
            className="text-[0.7rem] p-2 outline-none focus:border-main border border-[#ddd] rounded-full flex-1"
          />
          <button className="text-white text-[0.7rem] main-shadow duration-300 bg-main px-6 py-2 rounded-full">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
