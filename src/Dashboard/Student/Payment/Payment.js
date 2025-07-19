

import React, { useState, useEffect } from "react";
import Instapay from "./Instapay";
import Visa from "./Visa";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Notifcation from "../../../components/Notification";

const Payment = () => {
  const [method, setMethod] = useState("insta");
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    Axios.get("./checkout").then((data) => {
      setDetails(data.data);
      setLoading(false)
      console.log(data);
    });
  }, []);
const nav=useNavigate()
  const handleFreeCheckout = async () => {
    try {
      setLoading(true);
      const res = await Axios.post("/pay-via-free-gateway");
      console.log(res);
      if (res.data.messege === 'Payment successful.') {
        toast.success(res.data.messege)
        setTimeout(() => {
          nav('/student/my-courses')
          
        }, 2000);
      }else{
        toast.error(res.data.messege);

      }
    } catch (error) {
      console.error(error);
      toast.error("There is some thing wrong !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start gap-4 flex-wrap md:flex-row flex-col ">
      <Notifcation/>
            {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      {/* Payment Method */}
      <div className="flex-1 p-4 min-w-max w-full bg-white border border-[#dddd] rounded overflow-hidden">
        <h3 className="text-textColor text-base">Payment method</h3>

        {details?.total === 0? (
          <div className="flex flex-col items-center justify-center py-10">
            <h2 className="text-lg font-semibold text-green-600 mb-4">
            This order is free. No payment is required.
            </h2>
            <button
              onClick={handleFreeCheckout}
              disabled={loading}
              className="text-white bg-main px-6 py-2 rounded-full text-sm hover:opacity-90 transition disabled:opacity-50"
            >
                {loading ? "Confirming..." : "Confirm Free Access"}
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-center items-start gap-7 mt-6">
              <div
                onClick={() => setMethod("insta")}
                className="flex flex-col justify-center items-center gap-3"
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
                className="flex flex-col justify-center items-center gap-3"
              >
                <div
                  className={`w-[6.5rem] h-[5.9rem] border-[0.5px] cursor-pointer border-[#dddd] flex justify-center items-center rounded-lg ${
                    method === "wallet" && "!border-2 !border-main"
                  }`}
                >
                  <img
                    src={require("../../../images/wallet.png")}
                    alt="wallet"
                    loading="lazy"
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
                className="flex flex-col justify-center items-center gap-3"
              >
                <div
                  className={`w-[6.5rem] h-[5.9rem] border-[0.5px] cursor-pointer border-[#dddd] flex justify-center items-center rounded-lg ${
                    method === "visa" && "!border-2 !border-main"
                  }`}
                >
                  <img
                    src={require("../../../images/visa-pay.png")}
                    alt="visa"
                    loading="lazy"
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
          </>
        )}
      </div>

      {/* Your Order */}
      <div className="md:w-[338px] w-full h-max py-5 px-3 rounded bg-white border border-[#dddd]">
        <div className="text-center">
          <h3 className="text-textColor text-[1rem] py-3 mb-3">Your order</h3>
        </div>

        <div className="py-3 border-b border-[#ddd] flex justify-between items-center">
          <span className="text-base text-textColor">Course</span>
          <span className="text-base text-textColor">Subtotal</span>
        </div>

        {details?.products?.map((data, index) => (
          <div
            key={index}
            className="py-3 border-b border-[#ddd] flex justify-between items-center"
          >
            <span className="text-base text-textColor">{data.name}</span>
            <span className="text-base text-textColor">{data.price}</span>
          </div>
        ))}

        <div className="py-3 border-b border-[#ddd] flex justify-between items-center">
          <span className="text-base text-textColor">Discount</span>
          <span className="text-base text-textColor">
            {details?.discountPercent}
          </span>
        </div>

        <div className="py-3 border-b border-[#ddd] flex justify-between items-center">
          <span className="text-base text-textColor">Total</span>
          <span className="text-base text-textColor">{details?.formated_total}</span>
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
