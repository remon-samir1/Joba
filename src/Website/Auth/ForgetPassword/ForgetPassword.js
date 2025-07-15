import React, { useEffect, useState } from "react";

import logo from "../../../images/register-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "cookie-universal";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import google from "../../../images/google.svg";
import facebook from "../../../images/facebook.svg";
import Logo from "../../../components/Logo/Logo";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";
import Loading from "../../../components/Loading/Loading";
const ForgetPassword = () => {
  const [hidePass, setHidePass] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [laoding, setLaoding] = useState(false);
  const cookie = Cookies();
  const [form, setForm] = useState({
    email: "",
  });
  const nav = useNavigate();

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLaoding(true);
    try {
      const res = await Axios.post("/forgot-password", form);
      if (res.data.status == "We have emailed your password reset link.") {
        console.log(res);
        const token = res.data.access_token;
        cookie.set("token", token);

        toast.success(res.data.status);
  
        setLaoding(false);
  
        console.log(res);
      } else {
        console.log(res);
        toast.error('email Not Found');
        setLaoding(false);
      }
    } catch (err) {
      toast.error("There is some think wrong !");
      setLaoding(false);
      console.log(err);
    }
  };
  return (
    <>
      {laoding && <Loading />}
      <Notifcation />
      <div className="Login">
        <div className="main  ">
          <div className="logo ">
            <Logo />
          </div>

          <form
            className="form-box !w-[90%] md:!w-[50%]"
            onSubmit={handelSubmit}
          >
            <h2>Forget Password</h2>
            <p className="!text-base">
              Enter your email address and we will sent you a link to reset your
              password
            </p>
            <div className="inputs">
              <div className="input">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="options"></div>
            <button type="submit">Send Resst Link</button>
          </form>

          {/* <div className="content">
            <img src={logo} alt="juba" loading="lazy" />
            <h2>
              Welcome to <br className="hidden md:block" />
              Juba academy
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Condimentum aliquam
              sagittis senectus purus fames.{" "}
            </p>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
