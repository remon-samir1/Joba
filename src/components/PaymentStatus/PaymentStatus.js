import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../Helpers/Axios";
import Loading from "../Loading/Loading";

const PaymentStatus = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get("success");

    if (successParam !== null) {
      const isSuccess = successParam === "true";

      if (isSuccess) {
        Axios.get("/paymob-success").then((data) => {
          setSuccess(data.data.status);
          console.log(data);
        });
      }
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed h-screen bg-white  z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>
        </div>
      )}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          {success ? (
            <div>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Successful!
              </h1>
              <p className="text-gray-600 mb-4">
                Thank you for your purchase. Your payment has been processed
                successfully.
              </p>
            </div>
          ) : (
            <div>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>

              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Failed
              </h1>
              <p className="text-gray-600 mb-4">
                We couldn't process your payment. Please try again.
              </p>
            </div>
          )}
          <Link
            className="text-[1.1rem] px-6 py-2 bg-main text-white rounded-3xl mt-2 inline-block"
            to="/"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentStatus;
