import { Icon } from "@iconify-icon/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Axios, baseUrl } from "../Helpers/Axios";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";
import Notifcation from "../Notification";
import { useContext } from "react";
import { CartCh } from "../../Context/CartContext";

const Cart = () => {
  const [products, setProductus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const [values, setValues] = useState();
  useEffect(() => {
    setLoading(true);
    Axios.get("/cart").then((data) => {
      console.log(data);
      setLoading(false);
      setProductus(data.data.products);
      setValues(data.data);
    });
  }, []);
  console.log(products);
  // handleRemoveItem
  const handleRemoveItem = (id) => {
    setSpinner(id);
    try {
      Axios.get(`remove-cart-item/${id}`).then((data) => {
        console.log(data);
        toast.success("item deleted successfly");
        setSpinner(false);
        setProductus(products.filter((data) => data.options.rowId != id));
      });
    } catch (err) {
      console.log(err);
    }
  };
  const nav = useNavigate();
  const [fav, setFav] = useState(false);
  return (
    <div className="flex gap-6 mt-6 md:flex-row flex-col justify-center items-center md:items-start md:justify-start">
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <Notifcation />
      {/* Center */}
      <div className="flex-1">
        <div
          onClick={() => nav(-1)}
          className="flex items-center gap-2 cursor-pointer w-max"
        >
          <Icon
            className="text-text2"
            icon="formkit:arrowleft"
            width="24"
            height="24"
          />
          <span className="text-text2 text-base">Back</span>
        </div>
        {/* Cards of  Courses */}
        <div className="flex items-center gap-3 mt-5 flex-wrap  justify-start">
          {/* Card */}
          {products.length === 0 ? (
            <div className="flex justify-center p-6 w-full">
              <p className="text-center text-text2 font-bold text-base">
                No items in Cart
              </p>
            </div>
          ) : (
            products?.map((item, index) => (
              <div
                key={index}
                className="w-[333px] min-w-[300px] rounded-lg overflow-hidden bg-white"
              >
                <div className="relative w-full h-[12.5rem] rounded-lg">
                  <img
                    src={`${baseUrl}/${item.options.image}`}
                    alt="course"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4  ">
                  <p className="text-textColor text-[1.1rem]  ">{item.name}</p>
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-3">
                      <div className="w-[2.2rem] h-[2.2rem] rounded-full overflow-hidden ">
                        <img
                          src={`${baseUrl}/${item.instructor.image}`}
                          alt="cart"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-textColor text-base">
                        {item.instructor.user_name}
                      </span>
                    </div>
                    <span className="text-base  text-main font-bold">
                      ${item.options.discount_price}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.options.rowId)}
                    className="main-shadow duration-500 flex mt-4 justify-center items-center gap-2 text-white bg-main p-3 rounded w-full"
                  >
                    {spinner === item.options.rowId ? (
                      <AiOutlineLoading className="load-icon text-white" />
                    ) : (
                      <>
                        <Icon
                          icon="iconamoon:trash-light"
                          width="22"
                          height="22"
                        />
                        <span className="text-white ">Remove</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Coupon */}
        {products.length !== 0 && (
          <div className="flex items-center gap-3 mt-5">
            <input
              type="text"
              placeholder="Coupon code"
              className="flex-1 px-6 bg-white py-2 border border-[#ddd] rounded-full outline-none focus:border-main"
            />
            <button className="main-shadow whitespace-nowrap duration-500 text-base w-[30%] p-3 rounded-full bg-main text-white">
              Apply coupon
            </button>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="w-[338px] h-max py-5 px-3 rounded bg-white border border-[#dddd]">
        <div className="text-center">
          <h3 className="text-textColor text-[1.15rem] py-3 border-b border-[#dddd]">
            Cart total
          </h3>
        </div>
        <div className="py-6 border-b border-[#ddd flex justify-between items-center]">
          <span className="text-base text-textColor">Total items</span>
          <span className="text-base text-textColor">{products?.length}</span>
        </div>
        <div className="py-6 border-b border-[#ddd flex justify-between items-center]">
          <span className="text-base text-textColor">Discount</span>
          <span className="text-base text-textColor">
            {values?.discountAmount}
          </span>
        </div>
        <div className="py-6 border-b border-[#ddd flex justify-between items-center]">
          <span className="text-base text-textColor">Total </span>
          <span className="text-base text-textColor">{values?.total}</span>
        </div>
        <Link
          to="/student/payment"
          className="main-shadow inline-block text-center duration-500 mt-10 w-full p-3 text-base rounded text-white bg-main"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
