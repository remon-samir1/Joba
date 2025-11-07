import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import { TfiFacebook } from "react-icons/tfi";
import { FaTwitter } from "react-icons/fa";
import { ImInstagram } from "react-icons/im";
import logo from '../../images/white-logo.svg';
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t , i18n} = useTranslation()

  return (
    <div className="footer">
      
      <div className="content">
        <div className="list2 list order-2">
          <h4>{t("Quick Links")}</h4>
          <div className="Links">
            <Link to="/Courses">{t("Courses")}</Link>
            <Link to="/Support">{t("Support")}</Link>
            <Link to="/About">{t("About")}</Link>
          </div>
        </div>
        <div className="list2 list order-2">
          <h4>{t("Support")}</h4>
          <div className="Links">
            <Link to="">{t("Contact us")}</Link>
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
          <div className="list2 list order-1">
          <img
          src={logo}
          alt="joba"
          loading="lazy"
          width={100}
          className="juba"
        />
            <h4>{t("Get in Touch – We’re Here to Support Your Learning Journey")}</h4>
            <p>
            {t("We’re always happy to hear from you regarding course details, consultancy services, or private manufacturing inquiries. The Joba Natural Hub Academy team is here to guide you every step of the way in your journey through the world of professional cosmetics manufacturing. Feel free to contact us by phone, email, or visit our main office in Nasr City, Cairo.")}
            </p>
            <div className="subscribe">
            <img src={require('../../images/email.png')} alt="email" className="icon" loading="lazy" />
               <input type="email" placeholder="Enter your email" />
              <button>{t("Subscribe")}</button>
            </div>
          </div>
      </div>
      <img src={require("../../images/Line.png")} alt="line" width="100%" />
      <div className="copyright">
        <img
          src={logo}
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
