import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Axios } from "../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../components/Notification";
import ReCAPTCHA from "react-google-recaptcha";

gsap.registerPlugin(ScrollTrigger);

const BecomeInstructor = () => {
  const scrollRef = useRef();
  const imageRef = useRef();
  const contentRef = useRef();

  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useGSAP(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });

    gsap.from(imageRef.current, {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 90%",
      },
    });

    gsap.from(contentRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 90%",
      },
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      Axios.post("become-instructor", {
        ...form,
        recaptcha_token: captchaToken,
      }).then((data) => {
        setLoading(false);

        if (data.data.status === 200) {
          setForm({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
          setCaptchaToken(null);
          toast.success("Message Sent Successfully");
        } else {
          toast.error("Message Not Sent!");
        }
      });
    } catch (err) {
      console.error(err);
      toast.error("Message Not Sent!");
      setLoading(false);
    }
  };

  return (
    <div ref={scrollRef}>
      <Notifcation />
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>
        </div>
      )}

      <NavBar />
      <div className="flex items-start container mx-auto py-[5vh] md:flex-row flex-col gap-8 md:gap-32 justify-between">
        <div className="md:w-[50vw] w-full" ref={imageRef}>
          <img
            className="md:min-h-[400px] w-full md:min-w-[400px]"
            src={require("../../images/instructor-image.png")}
            alt="instructor"
            loading="lazy"
          />
        </div>

        <div className="mx-3" ref={contentRef}>
          <h3 className="text-[1.2rem] text-textColor font-semibold">
            Become an instructor
          </h3>
          <p className="text-base mt-4 text-textColor">
            Lorem ipsum dolor sit amet consectetur. Odio tortor orci ullamcorper
            feugiat in fermentum quam mauris. Eget mauris nisl risus lacus.
          </p>

          <form onSubmit={handleSubmit} className="border py-4 px-3 rounded mt-8">
            <div className="flex items-center gap-4">
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Name"
                className="text-textColor bg-transparent rounded border outline-none p-3 mt-4 flex-1"
              />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="text-textColor bg-transparent rounded border outline-none p-3 mt-4 flex-1"
              />
            </div>
            <input
              type="number"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="text-textColor bg-transparent rounded border outline-none p-3 mt-4 w-full"
            />
            <textarea
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Your message"
              className="text-textColor bg-transparent rounded border outline-none p-3 w-full mt-4 h-14"
            />

            <ReCAPTCHA
              sitekey="6Lfv1IUrAAAAAKa2hxwYozhajgWwOYQraAnmE1RY"
              onChange={(token) => setCaptchaToken(token)}
              className="mt-4"
            />

            <button
              className="w-full bg-main text-white p-3 text-center rounded-3xl mt-4 main-shadow duration-300"
              type="submit"
            >
              Send Request
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BecomeInstructor;
