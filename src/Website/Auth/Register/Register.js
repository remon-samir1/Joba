import React, { useState } from "react";
import logo from "../../../images/register-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import google from "../../../images/google.svg";
import facebook from "../../../images/facebook.svg";
import Logo from "../../../components/Logo/Logo";
import { Axios } from "../../../components/Helpers/Axios";
import Notifcation from "../../../components/Notification";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import { useTranslation } from "react-i18next";
import Providers from "../../../components/Providers/Providers";
const Register = () => {
  const [laoding, setLaoding] = useState(false);
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const nav = useNavigate();
  const [hidePass, setHidePass] = useState(true);
  const [agree, setAgree] = useState(false);
  //form);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLaoding(true);
    try {
      const res = await Axios.post("/register", form).then((data) => {
        //data);
        setForm({
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
        });

        toast.success(
          "A verification link has been sent to your mail, please verify and enjoy our service"
        );
        setTimeout(() => {
          nav("/login");
        }, 2000);
        setLaoding(false);
      });
    } catch (err) {
      //err);
      setLaoding(false);
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      {laoding && <Loading />}
      <Notifcation />
      <div style={{direction : i18n.language === 'ar' ? "rtl" :"ltr"}} className={`Login`}>
        <div className="main register">
          <div className="logo">
            <Logo />
          </div>
          <form className="form-box" onSubmit={handelSubmit}>
            <h2>{t("Welcome back")}</h2>
            <p>
              {t("Enter your email and password to login to your account.")}
            </p>
            <div className="inputs">
              <div className="input">
                <input
                  onChange={handleChange}
                  name="name"
                  value={form.name}
                  type="text"
                  placeholder={t("User name")}
                />
              </div>
              <div className="input">
                <input
                  onChange={handleChange}
                  name="email"
                  value={form.email}
                  type="email"
                  placeholder={t("Email Address")}
                />
              </div>
              <div className="input">
                <input
                  onChange={handleChange}
                  name="password"
                  value={form.password}
                  type={hidePass ? "password" : "text"}
                  placeholder={t("Password")}
                />
                {hidePass ? (
                  <IoEyeOffOutline
                    className={`icon ${
                      i18n.language === "ar" ? "!left-[10%]" : "!left-[90%]"
                    }`}
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                ) : (
                  <MdOutlineRemoveRedEye
                    className={`icon ${
                      i18n.language === "ar" ? "!left-[10%]" : "!left-[90%]"
                    }`}
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
                  placeholder={t("confirm Password")}
                />
                {hidePass ? (
                  <IoEyeOffOutline
                  className={`icon ${
                    i18n.language === "ar" ? "!left-[10%]" : "!left-[90%]"
                  }`}
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                ) : (
                  <MdOutlineRemoveRedEye
                  className={`icon ${
                    i18n.language === "ar" ? "!left-[10%]" : "!left-[90%]"
                  }`}
                    onClick={() => setHidePass((prev) => !prev)}
                  />
                )}
              </div>
            </div>
            <div className="options">
              <div className="flex mt-1">
                <input
                  required
                  type="checkbox"
                  name="remmember"
                  id="remmember"
                />
                <label htmlFor="remmember">
                  {t("agree")} <span>{t("terms & condition")}</span>
                </label>
              </div>
            </div>
            <button type="submit">{("Sign up")}</button>
            <p className="seperator">- {t("Or log in with")} -</p>
          <Providers/>
            <p className="redirect">
              {t("Do you have an account?")}{" "}
              <Link className="link" to="/login">
                {t("sign in")}
              </Link>
            </p>
          </form>

          <div className="content">
            <img src={logo} alt="juba" loading="lazy" />
            <h2>
              {t("Sign up to")} <br className="hidden md:block" />
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

export default Register;
