import React, { useEffect, useState } from "react";
import "./Login.css";
import logo from "../../../images/register-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "cookie-universal";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";

import Logo from "../../../components/Logo/Logo";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";
import Loading from "../../../components/Loading/Loading";

import Providers from "../../../components/Providers/Providers"
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t, i18n } = useTranslation();

  const [hidePass, setHidePass] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [laoding, setLaoding] = useState(false);
  const cookie = Cookies();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const nav = useNavigate();
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    const savedRememberMe = localStorage.getItem("rememberMe");
    if (savedRememberMe === "true") {
      setForm({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);
  const saveData = () => {
    if (rememberMe) {
      localStorage.setItem("email", form.email);
      localStorage.setItem("password", form.password);
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberMe");
    }
  };
  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLaoding(true);
    try {
      const res = await Axios.post("/user-login", form);
      if (res.data.status == "success") {
        console.log(res);
        const token = res.data.access_token;
        cookie.set("token", token);
        saveData();
        toast.success(res.data.messege);
        if (res.data.isAdmin) {
          window.location.pathname = "/admin/main";
        } else {
          window.location.pathname = "/student";
        }
        setLaoding(false);
        // nav('/admin/main')
        console.log(res);
      } else {
        console.log(res);
        toast.error(res.data.messege);
        setLaoding(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.email || 'Internal Server error');
      setLaoding(false);
      console.log(err);
    }
  };
  return (
    <>
      {laoding && <Loading />}
      <Notifcation />
      <div
      style={{direction : i18n.language === 'ar' ? "rtl" :"ltr"}}
      className="Login">
        <div className="main">
          <div className="logo ">
            <Logo />
          </div>
          <form className="form-box" onSubmit={handelSubmit}>
            <h2>{t("Welcome back")}</h2>
            <p>{t("Enter your email and password to login to your account.")}</p>
            <div className="inputs">
              <div className="input">
                <input
                  type="email"
                  placeholder={t("Email Address")}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <input
                  type={hidePass ? "password" : "text"}
                  className="appearance-none"
                  placeholder={t("Password")}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {hidePass ? (
                  <IoEyeOffOutline
                    className={`icon ${i18n.language === 'ar' ? "!left-[10%]" :"!left-[90%]"}`}
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                ) : (
                  <MdOutlineRemoveRedEye
                    className={`icon ${i18n.language === 'ar' ? "!left-[10%]" :"!left-[90%]"}`}
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                )}
              </div>
            </div>
            <div className="options">
              <div className="flex">
                <input
                  type="checkbox"
                  name="remmember"
                  id="remmember"
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remmember">{t("Remember me")}</label>
              </div>
              <Link to='/forget-password' className="link">{t("Forget password")}</Link>
            </div>
            <button type="submit">{t("Log in")}</button>
            <p className="seperator">- {t("Or log in with")} -</p>
            {/* <div className="providers">
              <Link className="link">
                <img src={google} alt="google" loading="lazy" />
                <span>Google</span>
              </Link>
              <Link className="link">
                <img src={facebook} alt="facebook" loading="lazy" />
                <span>Facebook</span>
              </Link>
            </div> */}
            <Providers />
            <p className="redirect">
              {t("Don't have an account?")}{" "}
              <Link className="link" to="/register">
                {t("sign up")}
              </Link>
            </p>
          </form>

          <div className="content">
            <img src={logo} alt="juba" loading="lazy" />
            <h2>
              {t("Welcome to")} <br className="hidden md:block" />
              {t("Juba academy")}
            </h2>
            {/* <p>
              Lorem ipsum dolor sit amet consectetur. Condimentum aliquam
              sagittis senectus purus fames.{" "}
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
