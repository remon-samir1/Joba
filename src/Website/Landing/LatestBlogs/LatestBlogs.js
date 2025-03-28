import "./LatestBlogs.css";
import React from "react";
import LatestBlogsCard from "./LatestBlogsCard";
import { Link } from "react-router-dom";

const LatestBlogs = () => {
  return (
    <div className="LatestBlogs">
      <div className="texts">
        <p>Latest blogs & news</p>
      </div>
      <div className="boxes flex justify-center items-center gap-10 mt-24">
      <LatestBlogsCard />
      <LatestBlogsCard />
      <LatestBlogsCard />
      </div>
      <div className="flex justify-center items-center w-full mt-10">
        <Link className="link">All blogs</Link>
      </div>
    </div>
  );
};

export default LatestBlogs;
