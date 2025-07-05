import React from "react";
import "./Recents.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import timeAgo from "../../../../components/Helpers/TimeAgo";
import StringSlice from "../../../../components/Helpers/StringSlice";
const Recents = ({data , link , title , viewAll}) => {
  return (
    <div className="Recents">
      <header className="header">
        <h3>Recnet {title}</h3>
        {
          title === 'contact' ? <p>Here is your recent contacts messages</p>
:
          <p>( {data?.length} ) {title} are penidng</p>
        }
      </header>
      <div className="body">
      {
  data?.map((data , index) =>
    title === "contact" ? (
      <div className="item" key={index}>
        <h4>{StringSlice(data.subject, 50)}</h4>
        <div className="details">
          <span>{data.name}</span>
          <span>{data.status === 1 ? "Approved" : "Dis Approved"}</span>
          <span>{timeAgo(data.created_at)}</span>
        </div>
      </div>
    ) : (
      <Link to={`${link}/${data.id}`} className="item" key={index}>
        <h4>{StringSlice(data.title, 50)}</h4>
        <div className="details">
          <span>{title === 'Courses' ? data.instructor.name : title === 'Blogs' ? data.author.name : data.name}</span>
          <span>{title === "Courses" ? data.is_approved : data.status === 1 ? "Approved" : "Dis Approved" }</span>
          <span>{timeAgo(data.created_at)}</span>
        </div>
      </Link>
    )
  )
}


      </div>
      <div className="recents-footer">
        <Link to={viewAll} className="link">view all
        <Icon icon="lsicon:arrow-right-outline" width={16} height={16}  className="icon" />
        </Link>
      </div>
    </div>
  );
};

export default Recents;
