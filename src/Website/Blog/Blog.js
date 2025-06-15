import "./blog.css";
import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
const Blog = () => {
  const text = "Home > Blogs & News >";
  return (
    <div>
      <NavBar />
      <div className="h-[50vh] blog bg-cover bg-center flex-col md:flex-row flex justify-center md:justify-between items-center px-[5vw] ">
        <h3 className="text-white text-[1.9rem] w-full md:max-w-[400px] font-semibold md:text-left text-center">
          Education technology & mobile learning
        </h3>
        <p className="text-base text-white md:text-left text-center mt-4 md:mt-0">
          {text}
          <span className="text-main ">
            {" "}
            Education technology & mobile learning
          </span>
        </p>
      </div>
      {/* Blogs */}
      <div className="flex py-5 px-8">
        <div className="flex-1">test</div>
        <div className="w-[315px]">
          <div className="border text-center border-[#ddd] py-5 px-4 rounded">
            <p className="text-[1.1rem] font-medium  text-main">
              {" "}
              Subscribe to our newsletter
            </p>
            <div className="flex h-12 mt-4 border border-[#ddd] rounded focus-within:border-main" >
              <input type="text" placeholder="Enter your email " className="flex-1 pl-4 bg-transparent outline-none border-none text-text2" />
              <button className="h-full w-[45%] text-center text-sm bg-main text-white">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
