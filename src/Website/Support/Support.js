import React, { useRef } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Support.css";
import { Icon } from "@iconify-icon/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState } from "react";
import { Axios } from "../../components/Helpers/Axios";
import Notifcation from "../../components/Notification";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const Support = () => {
  const [loading, setLoading] = useState(false);
  const titleRef = useRef();
  const formRef = useRef();
  const imageRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

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
  // handleSubmit
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      Axios.post("send-contact-message", form).then((data) => {
        setLoading(false);
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        toast.success(data.data.message);
        console.log(data);
      });
    } catch (err) {
      setLoading(false);
      toast.err("There is some thing wrong !");
    }
  };
  console.log(form);
  return (
    <div className="support">
      <Notifcation />
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <NavBar classes="!bg-[#fafafa] md:!bg-transparent" />
      <div className="flex md:flex-row flex-col-reverse items-start gap-[10%] px-4 md:px-12 pt-[7vh]">
        <form
          onSubmit={handleSubmit}
          className="w-full mt-4 md:mt-0 md:w-[100%] md:max-w-[40vw]"
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
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder="Name"
          />
          <input
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder="Email"
          />
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            type="number"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder="Phone "
          />
          <input
            value={form.subject}
            required
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            type="text"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder="Subject"
          />
          <textarea
            value={form.message}
            required
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder="Message"
          />
          <button
            type="submit"
            className="p-2 main-shadow duration-300 mt-4 w-full text-white bg-main rounded-sm"
          >
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
