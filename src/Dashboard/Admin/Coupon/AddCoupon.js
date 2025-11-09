import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import { AiOutlineLoading } from "react-icons/ai";
import Notifcation from "../../../components/Notification";
import DatePicker from "react-datepicker";

const AddCoupon = ({ setShowModal }) => {
  const modalRef = useRef();
  const tlRef = useRef();
  const [loading, setLoading] = useState(false);

  useGSAP(() => {
    tlRef.current = gsap.from(modalRef.current, {
      y: -100,
      opacity: 0,
      delay: 0.2,
      duration: 0.5,
      ease: "power3.out",
    });
  });

  const handleClose = () => {
    gsap.to(modalRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        setShowModal(false);
      },
    });
  };

  const [form, setForm] = useState({
    coupon_count: 1,
    coupon_code: "{code}",
    coupon_max_cart_items: "",
    coupon_type: 0,
    offer_percentage: 0,
    min_price: "",
    expired_date: "",
    status: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.expired_date) {
      toast.error("Please select an expiration date");
      return;
    }

    setLoading(true);
    try {
      Axios.post("/admin/coupon", form).then((data) => {
        toast.success("Created Successfully");
        setLoading(false);
        setShowModal(false);
        //data);
      });
    } catch (err) {
      //err);
      setLoading(false);
    }
  };

  return (
    <div className="addLesson fixed inset-0 min-h-screen overflow-auto flex items-center justify-center bg-black bg-opacity-30 z-50">
      <Notifcation />
      <div
        ref={modalRef}
        className="bg-white custom-scrollbar p-6 h-[95vh] overflow-auto rounded shadow-lg w-[90%] md:w-[40%]"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-textColor">
            Add Coupon <span className="text-red-500">*</span>
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label className="text-textColor">Coupons Count</label>
            <input
              required
              value={form.coupon_count}
              onChange={(e) =>
                setForm({ ...form, coupon_count: e.target.value })
              }
              disabled={loading}
              type="number"
              placeholder="Coupon Count"
              className="w-full text-text2 outline-none p-2 border rounded mt-3 focus:border-main"
            />
          </div>

          <div className="mt-4">
            <label className="text-textColor">Coupons Code</label>
            <input
              required
              value={form.coupon_code}
              onChange={(e) =>
                setForm({ ...form, coupon_code: e.target.value })
              }
              disabled={loading}
              type="text"
              placeholder="Coupon Code"
              className="w-full text-text2 outline-none p-2 border rounded mt-3 focus:border-main"
            />
            <p className="text-sm text-main">
              {'use "{code}" if u gonna use prefix/suffix'}
            </p>
          </div>

          <div className="mt-4">
            <label className="text-textColor">Max Cart Items</label>
            <input
              required
              value={form.coupon_max_cart_items}
              onChange={(e) =>
                setForm({ ...form, coupon_max_cart_items: e.target.value })
              }
              disabled={loading}
              type="number"
              placeholder="Max Cart Items"
              className="w-full text-text2 outline-none p-2 border rounded mt-3 focus:border-main"
            />
            <p className="text-sm text-main">"0" for unlimited items in cart</p>
          </div>

          <div className="mt-4">
            <label className="text-textColor">Coupons type</label>
            <select
              required
              value={form.coupon_type}
              disabled={loading}
              onChange={(e) =>
                setForm({ ...form, coupon_type: e.target.value })
              }
              className="w-full text-text2 outline-none p-2 border rounded mt-3 focus:border-main"
            >
              <option value="">Select type</option>
              <option value="1">normal</option>
              <option value="0">one time</option>
            </select>
          </div>

          <div className="mt-4">
            <label className="text-textColor">Minimum purchase price</label>
            <input
              required
              value={form.min_price}
              disabled={loading}
              onChange={(e) => setForm({ ...form, min_price: e.target.value })}
              type="number"
              placeholder="Minimum purchase price"
              className="w-full text-text2 outline-none p-2 border rounded mt-3 focus:border-main"
            />
          </div>

          <div className="mt-4">
            <label className="text-textColor">Offer(%)</label>
            <input
              required
              value={form.offer_percentage}
              disabled={loading}
              onChange={(e) =>
                setForm({ ...form, offer_percentage: e.target.value })
              }
              type="number"
              placeholder="Offer(%) "
              className="w-full text-text2 outline-none p-2 border rounded mt-3 focus:border-main"
            />
          </div>

          <div className="mt-4 flex flex-col">
            <label className="text-textColor">End time</label>
            <DatePicker
              selected={form.expired_date}
              onChange={(date) => setForm({ ...form, expired_date: date })}
              className="w-full text-text2 !block outline-none p-2 border rounded mt-3 focus:border-main"
              dateFormat="yyyy-MM-dd"
              placeholderText="Date"
            />
          </div>

          <div className="mt-4">
            <label className="text-textColor">Status</label>
            <select
              required
              value={form.status}
              disabled={loading}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full text-text2 outline-none p-2 border rounded mt-3 focus:border-main"
            >
              <option value="">Select status</option>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-white text-center w-20 px-5 py-2 rounded bg-main mt-4"
          >
            {loading ? (
              <AiOutlineLoading className="load-icon text-white" />
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
