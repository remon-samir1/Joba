import React from "react";

const LatestBlogsCard = () => {
  return (
    <div className="LatestBlogsCard">
      <div className="img">
        <img src={require("../../../images/Blogs.png")} alt="blog" loading="lazy" />
      </div>
      <div className="content">

      <p className="date">Creative jul 25 , 2025</p>
      <h4 className="title">Education technology & mobile learning</h4>
      <p className="desk">
        Lorem ipsum dolor sit amet consectetur. Orci id sed est maecenas
        molestie sagittis.
      </p>
      </div>
    </div>
  );
};

export default LatestBlogsCard;
