import "./blog.css";
import React, { useEffect, useRef } from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Link, useParams } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Axios, baseUrl } from "../../components/Helpers/Axios";
import { useState } from "react";
import TransformDate from "../../components/Helpers/TransformDate";
import StringSlice from "../../components/Helpers/StringSlice";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get("/blog")
      .then((data) => {
        setBlog(data.data.blogs.data.filter((data) => data.slug == id)[0]);
        setBlogs(data.data.blogs.data.filter((data) => data.slug != id));
        setLoading(false);
        // console.log(data.data.blogs.data.slice(0 , 1))
      })
      .catch(() => setLoading(false));
  }, [id]);
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, [id]);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    gsap.from(headingRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(imageRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      delay: 0.5,
      ease: "power2.out",
    });

    gsap.from(contentRef.current, {
      x: 100,
      opacity: 0,
      duration: 1,
      delay: 0.8,
      ease: "power2.out",
    });
  });

  const text = "Home > Blogs & News >";
  return (
    <div ref={scrollRef}>
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <NavBar />

      <div className="h-[50vh] blog bg-cover bg-center flex-col md:flex-row flex justify-center md:justify-between items-center px-[5vw]">
        <h3
          ref={headingRef}
          className="text-white text-[1.9rem] w-full md:max-w-[400px] font-semibold md:text-left text-center"
        >
          {blog?.title}
        </h3>
        <p
          ref={textRef}
          className="text-base text-white md:text-left text-center mt-4 md:mt-0"
        >
          {text}
          <span className="text-main"> {blog?.title}</span>
        </p>
      </div>

      {/* Blogs */}
      <div className="flex py-5 px-8 gap-10 flex-col md:flex-row">
        <div className="flex-1">
          <div className="w-full md:h-[70vh] h-[40vh]" ref={imageRef}>
            <img
              src={`${baseUrl}/${blog?.image}`}
              alt="blog"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-6 my-6">
            <h4 className="text-sm font-semibold text-main">
              Creative - {TransformDate(blog?.created_at)}
            </h4>
            <h4 className="text-sm font-semibold text-main">20Viwes</h4>
          </div>
          <div ref={contentRef}>
            <h3 className="text-textColor text-2xl font-medium">
              {blog?.title}
            </h3>
            <p
              dangerouslySetInnerHTML={{ __html: blog?.description }}
              className="text-base text-textColor my-6"
            ></p>
          </div>
        </div>

        <div className="md:w-[315px] w-full">
          <div className="border text-center border-[#ddd] py-5 px-4 rounded">
            <p className="text-[1.1rem] font-medium  text-main">
              Subscribe to our newsletter
            </p>
            <div className="flex h-12 mt-4 border border-[#ddd] rounded focus-within:border-main">
              <input
                type="text"
                placeholder="Enter your email "
                className="flex-1 pl-4 bg-transparent outline-none border-none text-text2"
              />
              <button className="h-full w-[45%] text-center text-sm bg-main text-white">
                Subscribe
              </button>
            </div>
          </div>

          <div className="border border-[#ddd] py-5 px-4 mt-4 rounded ">
            <h3 className="text-main text-2xl font-medium">Main menu</h3>
            <Link
              to="/"
              className="text-main text-[1.1rem] mt-5 block font-medium"
            >
              Home
            </Link>
            <Link className="text-main text-[1.1rem] mt-5 block font-medium">
              About
            </Link>
            <Link className="text-main text-[1.1rem] mt-5 block font-medium">
              Course content
            </Link>
            <Link className="text-main text-[1.1rem] mt-5 block font-medium">
              Resources
            </Link>
            <Link className="text-main text-[1.1rem] mt-5 block font-medium">
              Support
            </Link>
          </div>
          <div className="border border-[#ddd] pb-5 px-4 mt-4 rounded ">
            {blogs?.map((data) => (
              <Link to={`/blog/${data.slug}`} key={data.id}>
                <div className="flex items-start gap-3 mt-5">
                  <div className="w-[8rem] h-[6.5rem] shrink-0 rounded overflow-hidden">
                    <img
                      src={`${baseUrl}/${data.image}`}
                      alt="blog"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base text-textColor font-semibold">
                      {data.title}
                    </h3>
                    <p className="mt-4 text-sm font-semibold text-main">
                      Creative - {TransformDate(data.created_at)}
                    </p>
                  </div>
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: StringSlice(data.description, 30),
                  }}
                  className="mt-4 text-text2 text-[1.1rem]"
                >
                  {/* {data.description} */}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
