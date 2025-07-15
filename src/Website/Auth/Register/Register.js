import React, { useState } from "react";
import logo from "../../../images/register-logo.svg";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import google from "../../../images/google.svg";
import facebook from "../../../images/facebook.svg";
import Logo from "../../../components/Logo/Logo";
import { Axios } from "../../../components/Helpers/Axios";
import Notifcation from "../../../components/Notification";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
const Register = () => {
  const [laoding, setLaoding] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [hidePass, setHidePass] = useState(true);
  const [agree, setAgree] = useState(false);
  console.log(form);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setLaoding(true);
    try {
      const res = await Axios.post("/register", form).then((data) => {
        console.log(data);
        toast.success(
          "A verification link has been sent to your mail, please verify and enjoy our service"
        );

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
            <h2>Welcome back</h2>
            <p>Enter your email and password to login to your account.</p>
            <div className="inputs">
              <div className="input">
                <input
                  onChange={handleChange}
                  name="name"
                  value={form.name}
                  type="text"
                  placeholder="User name"
                />
              </div>
              <div className="input">
                <input
                  onChange={handleChange}
                  name="email"
                  value={form.email}
                  type="email"
                  placeholder="Email Address"
                />
              </div>
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
            <div className="options">
              <div className="flex mt-1">
                <input
                  required
                  type="checkbox"
                  name="remmember"
                  id="remmember"
                />
                <label htmlFor="remmember">
                  agree <span>terms & condition</span>
                </label>
              </div>
            </div>
            <button type="submit">Sign in</button>
            <p className="seperator">- Or log in with -</p>
            <div className="providers">
              <Link className="link">
                <img src={google} alt="google" loading="lazy" />
                <span>Google</span>
              </Link>
              <Link className="link">
                <img src={facebook} alt="facebook" loading="lazy" />
                <span>Facebook</span>
              </Link>
            </div>
            <p className="redirect">
              Do you have an account?{" "}
              <Link className="link" to="/login">
                sign in
              </Link>
            </p>
          </form>

          <div className="content">
            <img src={logo} alt="juba" loading="lazy" />
            <h2>
              Sign up to <br className="hidden md:block" />
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

export default Register;
