import React, { useState } from "react";
import logo from "../../../images/register-logo.svg";
import { Link, useParams } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import google from "../../../images/google.svg";
import facebook from "../../../images/facebook.svg";
import Logo from "../../../components/Logo/Logo";
import { Axios } from "../../../components/Helpers/Axios";
import Notifcation from "../../../components/Notification";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
const ResetPassword = () => {
  const [laoding, setLaoding] = useState(false);

  const [form, setForm] = useState({
    password: "",
    password_confirmation: "",
  });
  const [hidePass, setHidePass] = useState(true);
  console.log(form);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const {token} = useParams()
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLaoding(true);
    try {
      const res = await Axios.post(`/reset-password-store/${token}`, form).then((data) => {
        console.log(data);
        // toast.success(
        //   "A verification link has been sent to your mail, please verify and enjoy our service"
        // );

        setLaoding(false);
      });
    } catch (err) {
      console.log(err);
      setLaoding(false);
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      {laoding && <Loading />}
      <Notifcation />
      <div className="Login">
        <div className="main register">
          <div className="logo">
            <Logo />
          </div>
          <form className="form-box" onSubmit={handelSubmit}>
            <h2>Set a new password</h2>
            <p className="text-center">
              Your previous password has been reseted. Please set a new password
              for your account.
            </p>
            <div className="inputs">
              <div className="input">
                <input
                  onChange={handleChange}
                  name="password"
                  value={form.password}
                  type={hidePass ? "password" : "text"}
                  placeholder="Password"
                />
                {hidePass ? (
                  <IoEyeOffOutline
                    className="icon"
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                ) : (
                  <MdOutlineRemoveRedEye
                    className="icon"
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                )}
              </div>
              <div className="input">
                <input
                  onChange={handleChange}
                  name="password_confirmation"
                  value={form.password_confirmation}
                  type={hidePass ? "password" : "text"}
                  placeholder="confirm Password "
                />
                {hidePass ? (
                  <IoEyeOffOutline
                    className="icon"
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                ) : (
                  <MdOutlineRemoveRedEye
                    className="icon"
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                )}
              </div>
            </div>

            <button type="submit">Change Password</button>
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

export default ResetPassword;
