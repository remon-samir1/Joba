import React from "react";

const AddCoupon = ({ setShowModal }) => {
  return (
    <div className="addLesson fixed inset-0 max-h-screen overflow-auto flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[70%]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textColor">
            Add Coupon <span className="text-red-500">*</span>
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="text-gray-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>
        <form >
          <div className="mt-4">
            <label htmlFor="">Coupons Count</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
