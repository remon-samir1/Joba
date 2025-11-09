import React, { useEffect, useState } from "react";

import logo from "../../../images/register-logo.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
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
const Verify = () => {
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
  const { id } = useParams();

  const handelSubmit = async (e) => {
    //id);
    setLaoding(true);
    try {
      const res = await Axios.get(`/user-verification/${id}`).then(()=>{
        if (res.data.messege === "Invalid token") {
          toast.error(res.data.messege);
          nav('/login')
        } else {
          toast.success(res.data.messege);
        }
      })
      //res);
  

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
            <h2>Verify your account</h2>
            <p className="text-center">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
            <div className="inputs"></div>
            <button onClick={handelSubmit} type="button">
              Verify
            </button>
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

export default Verify;
