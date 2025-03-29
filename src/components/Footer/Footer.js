import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { TfiFacebook } from "react-icons/tfi";
import { FaTwitter } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
const Footer = () => {
  return (
    <div className="footer">
      <div className="content">
        <div className="list2 list">
          <h4>Quick Links</h4>
          <div className="Links">
            <Link to="">Course content</Link>
            <Link to="">Resource</Link>
            <Link to="">Support</Link>
            <Link to="">About</Link>
          </div>
        </div>
        <div className="list2 list">
          <h4>Support</h4>
          <div className="Links">
            <Link to="">Contact us</Link>
            <Link>
              <BsTelephone className="icon" />
              <span>1-415-386-9789 x429</span>
            </Link>
            <Link>
              <MdOutlineMail className="icon" />
              <span>Gabriel.Predovic16@yahoo.com</span>
            </Link>
            <div className="social-media">
              <a href="#">
                <TfiFacebook className="icon" />
              </a>
              <a href="#">
                <FaTwitter className="icon" />
              </a>
              <a href="#">
                <ImInstagram className="icon" />
              </a>
            </div>
          </div>
        </div>
          <div className="list2 list">
            <h4>Get in touch</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Tempor purus in feugiat
              turpis. Egestas quis in lectus imperdiet amet mi et condimentum
              leo. Lorem posuere eu tincidunt vel pharetra.
            </p>
            <div className="subscribe">
            <img src={require('../../images/email.png')} alt="email" className="icon" loading="lazy" />
               <input type="email" placeholder="Enter your email" />
               <button>Subscribe</button>
            </div>
          </div>
      </div>
      <img src={require("../../images/Line.png")} alt="line" width="100%" />
      <div className="copyright">
        <img
          src={require("../../images/logo-white.png")}
          alt="joba"
          loading="lazy"
          width={80}
        />
        <p>Copyright©Jobanatural hub2024. All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
