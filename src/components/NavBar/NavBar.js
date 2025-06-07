import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import openMenu from "../../images/joba-menu.svg";
import closeMenu from "../../images/joba-close-menu.svg";
import { useState } from "react";
import { useEffect } from "react";
const NavBar = () => {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef([]);
  const btnsRef = useRef(null);
  const toggleIconRef = useRef(null)
  const [menu, setMenu] = useState(false);
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
  }, []);
useEffect(()=>{
 if(menu){
  document.body.style.overflow="hidden"
  document.body.style.height="100vh"
 }else{
  document.body.style.overflow="auto"

 }
  gsap.fromTo(
    toggleIconRef.current,
    { rotate: 0, scale:0.3 },
    { rotate: 180,scale:1, duration: 0.5, ease: "power2.out" }
  );

},[menu])
  return (
    <div className="NavBar mx-auto " ref={navRef}>
      <div className="logo" ref={logoRef}>
        <Logo small={true}/>
      </div>
      <div
        onClick={() => setMenu((prev) => !prev)}
        className="toggle-menu md:hidden cursor-pointer"
      >
        <img
         ref={toggleIconRef}
        src={menu ? closeMenu : openMenu} alt="menu" />
      </div>
      <div className={`Links ${menu ? "left-0" : "left-[-100%]"}`}>
        {["Home", "About", "Course content", "Resources", "Support"].map(
          (text, index) => (
            <Link
            to='/student'
              key={index}
              className="link"
              ref={(el) => (linksRef.current[index] = el)}
            >
              {text}
            </Link>
          )
        )}
        <div className="btns md:!hidden flex " ref={btnsRef}>
          <Link to="login" className="link">
            Sign In
          </Link>
          <Link to="register" className="link">
            Sign Up
          </Link>
        </div>
      </div>
      <div className="btns hidden md:flex" ref={btnsRef}>
        <Link to="login" className="link">
          Sign In
        </Link>
        <Link to="register" className="link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default NavBar;


