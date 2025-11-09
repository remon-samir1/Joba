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
import Providers from "../../../components/Providers/Providers";
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
      const res = await Axios.post("/forget-password", form);
        //res);
      if(res.data === "Email does not exist"){
        toast.error(res.data)
      }else{

        toast.success(res.data.messege);
      }
  

  
        setLaoding(false);
  
        //res);
    
    } catch (err) {
      toast.error("There is some think wrong !");
      setLaoding(false);
      //err);
    }
  };
  return (
    <>
      {laoding && <Loading />}
      <Notifcation />
      <div className="Login">
        <div className="main">
          <div className="logo ">
            <Logo />
          </div>
          <form className="form-box" onSubmit={handelSubmit}>
            <h2>Forget your password ?</h2>
            <p className="text-center">Don’t worry, happens to all of us. Enter your email below to recover your password</p>
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
            <button type="submit">Submit</button>
            <p className="seperator">- Or log in with -</p>
            <Providers/>
            <p className="redirect">
              Don't have an account?{" "}
              <Link className="link" to="/register">
                sign up
              </Link>
            </p>
          </form>

          <div className="content">
            <img src={logo} alt="juba" loading="lazy" />
            <h2>
              Welcome to <br className="hidden md:block" />
              Juba academy
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Condimentum aliquam
              sagittis senectus purus fames.{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
