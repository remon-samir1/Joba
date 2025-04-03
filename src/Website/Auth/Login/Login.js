import React, { useState } from "react";
import "./Login.css";
import logo from "../../../images/register-logo.svg";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import google from '../../../images/google.svg'
import facebook from '../../../images/facebook.svg'
import Logo from "../../../components/Logo/Logo";
const Login = () => {
  const [hidePass, setHidePass] = useState(true);
  return (
    <div className="Login">
      <div className="main">
        <div className="logo">
          <Logo/>
        </div>
        <form className="form-box">
          <h2>Welcome back</h2>
          <p>Enter your email and password to login to your account.</p>
          <div className="inputs">
            <div className="input">
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="input">
              <input
                type={hidePass ? "password" : "text"}
                className="appearance-none"
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
          </div>
          <div className="options">
            <div className="flex">
              <input type="checkbox" name="remmember" id="remmember" />
              <label htmlFor="remmember">Remember me</label>
            </div>
            <Link className="link">Forget password</Link>
          </div>
          <button type="submit">Log in</button>
          <p className="seperator">- Or log in with -</p>
          <div className="providers">
            <Link className="link">
              <img src={google} alt="google" loading="lazy" />
              <span>Google</span></Link>
            <Link className="link">
              <img src={facebook} alt="facebook" loading="lazy" />
              <span>Facebook</span></Link>
          </div>
          <p className="redirect">
          Don't have an account? <Link className="link" to='/register'>sign up</Link> 
          </p>
        </form>


        <div className="content">
          <img src={logo} alt="juba" loading="lazy" />
          <h2>
            Welcome to <br />
            Juba academy
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Condimentum aliquam sagittis
            senectus purus fames.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
