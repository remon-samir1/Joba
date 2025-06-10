import { Icon } from "@iconify-icon/react";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const nav = useNavigate();
  const [fav, setFav] = useState(false);
  return (
    <div className="flex gap-6 mt-6 md:flex-row flex-col justify-center md:justify-start">
      {/* Center */}
      <div className="flex-1">
        <div onClick={() => nav(-1)} className="flex items-center gap-2 cursor-pointer w-max">
          <Icon
            className="text-text2"
            icon="formkit:arrowleft"
            width="24"
            height="24"
          />
          <span className="text-text2 text-base">Back</span>
        </div>
        {/* Cards of  Courses */}
        <div className="flex items-center gap-3 mt-5 flex-wrap justify-center">
          {/* Card */}
          {Array.from({length:2}).map((_,index)=>(
            <div className="w-[333px] min-w-[300px] rounded-lg overflow-hidden bg-white">
            <div className="relative w-full h-[12.5rem] rounded-lg">
              <img
                src={require("../../images/course-details.png")}
                alt="course"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div
                onClick={() => setFav((prev) => !prev)}
                className="cursor-pointer w-[35px] h-[35px] flex justify-center items-center rounded-full backdrop-brightness-90 backdrop-blur-0 absolute top-2 right-2 bg-[rgba(255,255,255,0.6)]"
              >
                <Icon
                  className="text-white"
                  icon={
                    fav
                      ? "material-symbols-light:favorite"
                      : "material-symbols-light:favorite-outline"
                  }
                  width="24"
                  height="24"
                />
              </div>
            </div>
            <div className="p-4  ">
              <p className="text-textColor text-[1.1rem]  ">
                Cosmetics course for beginner
              </p>
              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-3">
                  <div className="w-[2.2rem] h-[2.2rem] rounded-full overflow-hidden ">
                    <img
                      src={require("../../images/course-details.png")}
                      alt="cart"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-textColor text-base">Brenda Howe</span>
                </div>
                <span className="text-base  text-main font-bold">1500EGP</span>
              </div>
              <button className="main-shadow duration-500 flex mt-4 justify-center items-center gap-2 text-white bg-main p-3 rounded w-full">
                <Icon icon="iconamoon:trash-light" width="22" height="22" />
                <span className="text-white ">Remove</span>
              </button>
            </div>
          </div>
          ))}
        </div>
        {/* Coupon */}

        <div className="flex items-center gap-3 mt-5">
       <input type="text" placeholder="Coupon code" className="flex-1 px-6 bg-white py-2 border border-[#ddd] rounded-full outline-none focus:border-main" />
       <button className="main-shadow duration-500 text-base w-[30%] p-3 rounded-full bg-main text-white">Apply coupon</button>
        </div>
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
          <span className="text-base text-textColor">2</span>
        </div>
        <div className="py-6 border-b border-[#ddd flex justify-between items-center]">
          <span className="text-base text-textColor">Discount</span>
          <span className="text-base text-textColor">0.00EGP</span>
        </div>
        <div className="py-6 border-b border-[#ddd flex justify-between items-center]">
          <span className="text-base text-textColor">Total </span>
          <span className="text-base text-textColor">0.00EGP</span>
        </div>
        <Link to='/student/payment' className="main-shadow inline-block text-center duration-500 mt-10 w-full p-3 text-base rounded text-white bg-main">
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Cart;
