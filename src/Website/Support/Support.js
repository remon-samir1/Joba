import React, { useRef } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Support.css";
import { Icon } from "@iconify-icon/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Support = () => {
  const titleRef = useRef();
  const formRef = useRef();
  const imageRef = useRef();

  useGSAP(() => {
    gsap.from(titleRef.current, {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
      },
    });

    gsap.from(formRef.current, {
      x: -80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 85%",
      },
    });

    gsap.from(imageRef.current, {
      x: 80,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 85%",
      },
    });
  });

  return (
    <div className="support">
      <NavBar classes="!bg-[#fafafa] md:!bg-transparent" />
      <div className="flex md:flex-row flex-col-reverse items-start gap-[10%] px-4 md:px-12 pt-[7vh]">
        <form
          className="w-full mt-4 md:mt-0 md:w-[40%] max-w-[550px]"
          ref={formRef}
        >
          <h3
            ref={titleRef}
            className="text-textColor font-bold text-4xl md:text-[3.3rem]"
          >
            Get In <span className="text-main">Touch</span>
          </h3>
          <p className="text-textColor text-sm mt-3 max-w-[80%]">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo
            molestie vel, ornare non id blandit netus.
          </p>
          <input
            type="text"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder="Name"
          />
          <input
            type="email"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder="Email"
          />
          <input
            type="number"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder="Phone number"
          />
          <button className="p-2 main-shadow duration-300 mt-4 w-full text-white bg-main rounded-sm">
            Send
          </button>
          <div className="flex justify-between gap-2 items-center mt-6">
            {[
              {
                icon: "ph:phone-call",
                label: "PHONE",
                value: "03 5432 1234",
              },
              {
                icon: "carbon:location",
                label: "Address",
                value: "154 elzahraa street",
              },
              {
                icon: "carbon:email",
                label: "Email",
                value: "info@marcc.com.au",
              },
            ].map(({ icon, label, value }, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Icon
                  icon={icon}
                  className="md:w-[28px] md:h-[28px] w-[24px] h-[24px]"
                  style={{ color: "#30313E" }}
                />
                <div className="flex flex-col">
                  <span className="text-[11px] md:text-sm text-textColor">
                    {label}
                  </span>
                  <span className="text-[11px] md:text-sm text-main">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </form>
        <div
          className="w-[80%] md:w-[400px] h-[300px] mx-auto md:h-[500px]"
          ref={imageRef}
        >
          <img
            className="w-full h-full object-cover"
            src={require("../../images/support.png")}
            alt="support"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Support;
