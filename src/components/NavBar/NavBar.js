import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import openMenu from "../../images/joba-menu.svg";
import closeMenu from "../../images/joba-close-menu.svg";
import { useContext } from "react";
import { User } from "../../Context/UserContext";
import Cookies from "cookie-universal";
import { useTranslation } from "react-i18next";
import { Axios } from "../Helpers/Axios";
import { CartCh } from "../../Context/CartContext";
import { Icon } from "@iconify-icon/react";

const NavBar = ({ classes }) => {
  const [cart, setCart] = useState(null);
  const cartChange = CartCh.cartChange;
  const [name, setName] = useState();
  useEffect(() => {
    Axios.get("/cart")
      .then((data) => {
        //data);
        const product = data.data.products;
        const arr = Object.values(product);
        setCart(arr.length);
      })
      .catch((data) => setCart(null));
  }, [cartChange]);
  const userContext = useContext(User);
  const user = userContext.userC;
  const cookie = Cookies();
  const token = cookie.get("token");
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const btnsRef = useRef(null);
  const toggleIconRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  function handlLogout() {
    cookie.remove("token");
    window.location.pathname = "/";
  }
  const { t, i18n } = useTranslation();

  const [currentLang, setCurrentLang] = useState(
    i18n.language === "ar" ? "ar" : "en"
  );
  const handelChangeLanguegae = () => {
    i18n.changeLanguage(currentLang === "en" ? "ar" : "en");
    setCurrentLang((prev) =>
      prev === "ar" ? "en" : prev === "en" ? "ar" : ""
    );

    document.documentElement.setAttribute(
      "dir",
      currentLang === "ar" ? "rtl" : "ltr"
    );
  };
  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      currentLang === "ar" ? "rtl" : "ltr"
    );
  }, [i18n.language]);
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(navRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(logoRef.current, { opacity: 0, x: -30, duration: 0.8 }, "-=0.5")
      .from(
        linksRef.current,
        { opacity: 0, y: 20, stagger: 0.2, duration: 0.6 },
        "-=0.5"
      )
      .from(
        btnsRef.current,
        { opacity: 0, scale: 0.8, duration: 0.6 },
        "-=0.4"
      );
  });

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
    }

    gsap.fromTo(
      toggleIconRef.current,
      { rotate: 0, scale: 0.3 },
      { rotate: 180, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [menu]);

  // Scroll-based glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== isScrolled) {
        setIsScrolled(shouldBeScrolled);
        gsap.to(navRef.current, {
          backgroundColor: shouldBeScrolled
            ? "rgba(255,255,255,0.2)"
            : "transparent",
          backdropFilter: shouldBeScrolled ? "blur(10px)" : "blur(0px)",
          boxShadow: shouldBeScrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none",
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <div
      className={`${classes} NavBar  fixed top-0 left-0 w-full z-50 transition-all duration-300`}
      ref={navRef}
    >
      <div className="logo" ref={logoRef}>
        <Logo small={true} />
      </div>

      <div className="flex md:hidden items-center gap-3">

        <Link
          ref={(el) => (linksRef.current[4] = el)}
          to="/student/cart"
          className="flex items-center justify-center w-[36px] h-[36px] rounded-full   md:hidden  relative z-50"
        >
          {/* { 
            cart !== null &&

              <div className="absolute top-[-5px] right-[-8px] w-[1.1rem] h-[1.1rem] bg-main rounded-full z-50  flex justify-center items-center">
                <span className="text-white tefamicons:cart-outlinext-[12px] font-semibold">
                  {cart}
                </span>
              </div>
            } */}
          <Icon
            icon="famicons:cart-outline"
            width="35"
            height="35"
            className="text-main opacity-90"
            />
        </Link>
        <div
          onClick={() => setMenu((prev) => !prev)}
          className="toggle-menu md:hidden cursor-pointer"
        >
          <img
            ref={toggleIconRef}
            src={menu ? closeMenu : openMenu}
            alt="menu"
          />
        </div>
      </div>

      <div className={`Links ${menu ? "left-0" : "left-[-100%]"}`}>
        {[
          { name: t("Home"), to: "Home" },
          { name: t("About"), to: "About" },
          { name: t("Courses"), to: "Courses" },
          { name: t("Support"), to: "Support" },
        ].map((text, index) => (
          <NavLink
            to={`/${text.to === "Home" ? "" : text.to}`}
            key={index}
            onClick={() => setMenu(false)}
            className="link"
            ref={(el) => (linksRef.current[index] = el)}
          >
            {text.name}
          </NavLink>
        ))}
        <Link
          ref={(el) => (linksRef.current[4] = el)}
          to="/student/cart"
          className="icon-container mt-2 relative z-50"
        >
          {/* { 
            cart !== null &&

              <div className="absolute top-[-5px] right-[-8px] w-[1.1rem] h-[1.1rem] bg-main rounded-full z-50  flex justify-center items-center">
                <span className="text-white text-[12px] font-semibold">
                  {cart}
                </span>
              </div>
              } */}
          <Icon
            icon="game-icons:shopping-cart"
            width="24"
            height="24"
            className="text-text2 opacity-90"
          />
        </Link>

        <div className="btns md:!hidden flex" ref={btnsRef}>
          {token ? (
            <>
              <Link
                to={user === "admin" ? "/admin/main" : "/student"}
                className="link"
              >
                {t("My Dashboard")}
              </Link>
              <button onClick={handlLogout} className="link">
                {t("Logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="link">
                {t("Sign In")}
              </Link>
              <Link to="/register" className="link">
                {t("Sign Up")}
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="btns hidden md:flex" ref={btnsRef}>
        {token ? (
          <>
            <Link
              to={user === "admin" ? "/admin/main" : "/student"}
              className="link"
            >
              {t("My Dashboard")}
            </Link>
            <button onClick={handlLogout} className="link">
              {t("Logout")}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="link">
              {t("Sign In")}
            </Link>
            <Link to="/register" className="link2 link">
              {t("Sign Up")}
            </Link>
          </>
        )}
        <button
          onClick={handelChangeLanguegae}
          className="text-base text-main "
        >
          {currentLang === "en" ? "AR" : "EN"}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
