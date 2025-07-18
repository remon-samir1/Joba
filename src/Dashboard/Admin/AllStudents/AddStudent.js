import React, { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import Notifcation from "../../../components/Notification";

const AddStudent = () => {
  const [laoding, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",

  });
  console.log(form);
  const click = useRef(null);
  const navigate = useNavigate();
  const {id} = useParams();


  

  //        Send Data
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post("/register", form).then((data) => {
        console.log(data);
        setForm({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        toast.success(
          "Account Created Successfly"
        );
        setTimeout(() => {
          navigate(-1)
        }, 2000);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <Notifcation />
      {laoding && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <div className="UpdateCategory">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl">Add Blogs Category</h3>
          <Breadcrumbs />
        </div>
        <div className="bg-white my-8">
          <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
            <h4 className="text-main text-base ">Add Blogs Category</h4>
            <button
              onClick={() => navigate(-1)}
              className="flex justify-between gap-1 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500 hover:bg-white hover:text-main"
            >
              <Icon
                icon="solar:arrow-left-outline"
                width={20}
                height={20}
                className="hover:bg-white hover:text-main"
              />
              <span>Back</span>
            </button>
          </div>
          <form className="inputs  p-7" onSubmit={handelSubmit}>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                disabled={laoding}
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="slug">Email</label>
              <input
                type="text"
                id="Email"
                placeholder="Slug"
                value={form.email}

                disabled={laoding}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                placeholder="Password"
                value={form.password}

                disabled={laoding}
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="password_confirmation">Password Confirmation</label>
              <input
                type="text"
                id="password_confirmation"
                placeholder="password Confirmation"
                value={form.password_confirmation}

                disabled={laoding}
                required
                onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
              />
            </div>
          

          
            <button
              type="submit"
              disabled={laoding}
              className={`${
                laoding && "cursor-wait hover:!bg-main hover:!text-white"
              }`}
            >
              {laoding ? (
                "Loading ..."
              ) : (
                <>
                  <LuSave width={24} height={24} className=" text-white icon" />
                  <span>Save</span>{" "}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
