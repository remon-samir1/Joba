import React from "react";
import TransformDate from "../../../components/Helpers/TransformDate";
import { baseUrl } from "../../../components/Helpers/Axios";
import { Link } from "react-router-dom";
import StringSlice from "../../../components/Helpers/StringSlice";

const LatestBlogsCard = (props) => {
  console.log(props.image);
  return (
    <Link to={`/blog/${props.slug}`} className="LatestBlogsCard">
      <div className="img">
        <img src={`${baseUrl}/${props.image}`} alt="blog" loading="lazy" />
      </div>
      <div className="content">

      <p className="date">Creative {TransformDate(props.date)}</p>
      <h4 className="title">{StringSlice(props.title , 30)}</h4>
      <p className="desk" dangerouslySetInnerHTML={{__html : StringSlice(props.description , 100)}}>
      </p>
      </div>
    </Link>
  );
};

export default LatestBlogsCard;
