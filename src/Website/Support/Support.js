
import React, { useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Support.css";
import { Icon } from "@iconify-icon/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Axios } from "../../components/Helpers/Axios";
import Notifcation from "../../components/Notification";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const Support = () => {
  const { t , i18n} = useTranslation()

  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
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

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error("Please verify that you are not a robot.");
      return;
    }

    setLoading(true);

    try {
      Axios.post("send-contact-message", {
        ...form,
        recaptcha: recaptchaToken,
      }).then((data) => {
        setLoading(false);
        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setRecaptchaToken("");
        toast.success(data.data.message);
      });
    } catch (err) {
      setLoading(false);
      toast.error("There is something wrong!");
    }
  };

  return (
    
    <>

    <div className={`support md:mb-24 ${i18n.language === 'en' ? "md:bg-[linear-gradient(to_right,_#fafafa_70%,_#F15A24_30%)]" : "md:bg-[linear-gradient(to_left,_#fafafa_70%,_#F15A24_30%)]"}`} >
      <Notifcation />
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>
        </div>
      )}
      <NavBar classes="!bg-[#fafafa] md:!bg-white" />
      <div className="flex md:flex-row flex-col-reverse items-start gap-[10%] px-4 md:px-12 pt-[7vh]">
        <form
          onSubmit={handleSubmit}
          className="w-full mt-4 md:mt-0 md:w-[100%] md:max-w-[40vw]"
          ref={formRef}
        >
          <h3
            ref={titleRef}
            className="text-textColor font-bold text-4xl my-4 md:text-[3.3rem]"
          >
            {t("Get In")} <span className="text-main">{t("Touch")}</span>
          </h3>
          {/* <p className="text-textColor text-sm mt-3 max-w-[80%]">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo
            molestie vel, ornare non id blandit netus.
          </p> */}
          <input
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            type="text"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder={t("Name")}
          />
          <input
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder={t("Email")}
          />
          <input
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            type="number"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder={t("Phone")}
          />
          <input
            value={form.subject}
            required
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            type="text"
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder={t("Subject")}
          />
          <textarea
            value={form.message}
            required
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="text-text2 focus:border-main w-full border rounded-sm px-4 py-2 bg-transparent mt-3 outline-none"
            placeholder={t("Message")}
          />
          <ReCAPTCHA
            sitekey="6Lfv1IUrAAAAAKa2hxwYozhajgWwOYQraAnmE1RY"
            onChange={handleRecaptchaChange}
            className="mt-4"
          />
          <button
            type="submit"
            className="p-2 main-shadow duration-300 mt-4 w-full text-white bg-main rounded-sm"
          >
            {t("Send")}
          </button>
          <div className="flex justify-between gap-2 items-center mt-6">
            {[
              {
                icon: "ph:phone-call",
                label: "PHONE",
                value: "03 5432 1234",
                link: "tel:",
              },
              {
                icon: "carbon:location",
                label: "Address",
                value: "154 elzahraa street",
              },
              {
                icon: "carbon:email",
                label: "Email",
                value: "remosamir443@gmail.com",
                link: "mailto:",
              },
            ].map(({ icon, label, value, link }, idx) => (
              <a
                href={`${link || ""}${value}`}
                key={idx}
                className="flex items-center gap-2"
              >
                <Icon
                  icon={icon}
                  className="md:w-[28px] md:h-[28px] w-[24px] h-[24px]"
                  style={{ color: "#30313E" }}
                />
                <div className="flex flex-col">
                  <span className="text-[11px] md:text-sm text-textColor">
                    {t(label)}
                  </span>
                  <span className="text-[11px] md:text-sm text-main">
                    {value}
                  </span>
                </div>
              </a>
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
    <Footer/>
    </>
  );
};

export default Support;
