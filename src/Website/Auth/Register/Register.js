import React, { useState } from "react";
import logo from "../../../images/register-logo.svg";
import { Link } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import google from '../../../images/google.svg'
import facebook from '../../../images/facebook.svg'
import Logo from "../../../components/Logo/Logo";
const Register = () => {
  const [hidePass, setHidePass] = useState(true);
  return (
    <div className="Login">
      <div className="main register">
        <div className="logo">
          <Logo/>
        </div>
        <form className="form-box" >
          <h2>Welcome back</h2>
          <p>Enter your email and password to login to your account.</p>
          <div className="inputs">
            <div className="input">
              <input type="text" placeholder="User name" />
            </div>
            <div className="input">
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="input">
              <input
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
              <input type="checkbox" name="remmember" id="remmember" />
              <label htmlFor="remmember">agree <span>terms & condition</span></label>
            </div>
          </div>
          <button type="submit">Sign in</button>
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
          Do you have an account? <Link className="link" to='/login'>sign in</Link> 
          </p>
        </form>


        <div className="content">
          <img src={logo} alt="juba" loading="lazy" />
          <h2>
          Sign up to <br />
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

export default Register;
