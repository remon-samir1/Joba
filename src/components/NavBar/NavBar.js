

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import openMenu from "../../images/joba-menu.svg";
import closeMenu from "../../images/joba-close-menu.svg";

const NavBar = ({classes}) => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const btnsRef = useRef(null);
  const toggleIconRef = useRef(null);
  const [menu, setMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


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
      .from(btnsRef.current, { opacity: 0, scale: 0.8, duration: 0.6 }, "-=0.4");
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
          backgroundColor:  shouldBeScrolled ? "rgba(255,255,255,0.2)" : "transparent",
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

      <div className={`Links ${menu ? "left-0" : "left-[-100%]"}`}>
        {["Home", "About", "AllCourses ", "Support"].map(
          (text, index) => (
            <Link
            to={`/${text === 'Home' ? '' : text}`}
              key={index}
              onClick={() => setMenu(false)}
              className="link"
              ref={(el) => (linksRef.current[index] = el)}
            >
              {text}
            </Link>
          )
        )}

        <div className="btns md:!hidden flex" ref={btnsRef}>
          <Link to="/login" className="link">
            Sign In
          </Link>
          <Link to="/register" className="link">
            Sign Up
          </Link>
        </div>
      </div>

      <div className="btns hidden md:flex" ref={btnsRef}>
        <Link to="/login" className="link">
          Sign In
        </Link>
        <Link to="/register" className="link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
