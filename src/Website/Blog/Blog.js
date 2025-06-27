import "./blog.css";
import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Link } from "react-router-dom";
const Blog = () => {
  const text = "Home > Blogs & News >";
  return (
    <div>
      <NavBar />
      <div className="h-[50vh]  blog bg-cover bg-center flex-col md:flex-row flex justify-center md:justify-between items-center px-[5vw] ">
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
      <div className="flex py-5 px-8 gap-10 flex-col md:flex-row">
        <div className="flex-1 ">
          <div className="w-full md:h-[70vh] h-[40vh] ">
            <img
              src={require("../../images/course-details.png")}
              alt="blog"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-6 my-6">
            <h4 className="text-sm font-semibold text-main">
              Creative - Jul 22 , 2025
            </h4>
            <h4 className="text-sm font-semibold text-main">20Viwes</h4>
          </div>
          <h3 className="text-textColor text-2xl font-medium">
            Education technology & mobile learning
          </h3>
          <p className="text-base text-textColor my-6">
            Lorem ipsum dolor sit amet consectetur. Viverra pellentesque amet
            dignissim ante luctus sagittis porta. Dui libero eu convallis augue
            molestie risus eros id. Non odio augue nulla quam varius egestas.
            Urna tempor habitasse lobortis sed risus nam quam. Quis quis nunc
            quam pharetra nulla sollicitudin.
          </p>
        </div>
        <div className="md:w-[315px] w-full">
          <div className="border text-center border-[#ddd] py-5 px-4 rounded">
            <p className="text-[1.1rem] font-medium  text-main">
              {" "}
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
              <Link to='/' className='text-main text-[1.1rem] mt-5 block font-medium'>Home</Link>
              <Link className='text-main text-[1.1rem] mt-5 block font-medium'>About</Link>
              <Link className='text-main text-[1.1rem] mt-5 block font-medium'>Course content</Link>
              <Link className='text-main text-[1.1rem] mt-5 block font-medium'>Resources</Link>
              <Link className='text-main text-[1.1rem] mt-5 block font-medium'>Support</Link>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
