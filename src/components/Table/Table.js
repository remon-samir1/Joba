import React, { useState } from "react";
import "./Table.css";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";
import { Axios, baseUrl } from "../Helpers/Axios";
import ToggleStatusButton from "../TiggleStatusBtn/TiggleStatusBtn";
import { toast } from "react-toastify";
import TransformDate from "../../components/Helpers/TransformDate";
import StringSlice from "../../components/Helpers/StringSlice";
import Notifcation from "../Notification";
import StarRating from "../StarRating/StarRating";
const Table = (props) => {
  // handle delete
  const handleDelete = async (id) => {
    try {
      console.log(id);

      await Axios.post(`${props.url}/${id}`, {
        _method: "DELETE",
      }).then((data) => {
        console.log(data);
        props.setDeleted((prev) => !prev);
        if (data.data.status == "error") {
          toast.error(data.data.message || data.data.messege);
        } else {
          toast.success("Deleted successfly");
        }
      });
    } catch (err) {
      toast.success(err);
      console.log(err);
    }
  };

  const showHeaders = props.headers?.map((data, key) => (
    <th key={key}>{data.title}</th>
  ));
  const showData = props.data?.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>

      {props.headers.map((item2, i) => (
        <td key={i}>
          {item2.key === "icon" ? (
            <img
              src={`${baseUrl}/${item[item2.key]}`}
              width="100px"
              height="30px"
              alt="icon"
            />
          ) : item2.key === "show_at_trending" ? (
            item[item2.key] === 1 ? (
              <span className="text-teal-600 bg-teal-200 py-1 rounded-full px-5">
                Yes
              </span>
            ) : (
              <span className="text-red-600 bg-red-200 py-1 rounded-full px-5">
                No
              </span>
            )
          ) : item2.key === "status" && item2.type !== "static" ? (
            <ToggleStatusButton
              data={item[item2.key]}
              id={item.id}
              url={props.url}
            />
          ) : item2.key === "created_at" || item2.key === "updated_at" ? (
            TransformDate(item[item2.key])
          ) : item2.key === "course" ? (
            item[item2.key]?.title
          ) : item2.key === "rating" ? (
            <StarRating rating={item[item2.key]} />
          ) : item2.key === "name" && item2.dir ? (
            item[item2.key]?.name
          ) : item2.type === "static" && item2.key === "status" ? (
            item[item2.key] == 1 ? (
              <span className="text-white bg-green-600 py-1 px-4 rounded-3xl">
                Approved
              </span>
            ) : (
              <span className="text-white bg-red-600 py-1 px-4 rounded-3xl">
                Disapproved
              </span>
            )
          ) : item2.type == "obj" ? (
            item[item2.key]?.name
          ) : item2.key == "show_homepage" || item2.key == "is_popular" ? (
            item[item2.key] == 1 ? (
              <span className="text-white bg-green-600 py-1 px-6 rounded-3xl">
                Yes
              </span>
            ) : (
              <span className="text-white bg-red-600 py-1 px-6 rounded-3xl">
                No
              </span>
            )
          ) : 
          
          item2.key === 'email_verified_at' ? item[item2.key] != null ? <span className="text-white bg-green-600 py-1 px-6 rounded-3xl"> verified</span> : <span className="text-white bg-orange-500 py-1 px-6 rounded-3xl">Not verified</span>:
          
          (
            item[item2.key]
          )}
        </td>
      ))}

      {/* Static Actions */}
      {props.action && (
        <td className="flex justify-center items-center gap-3 mt-2">
          {props.update && (
            <Link
              to={`update/${item.id}`}
              className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
            >
              <Icon
                icon="la:edit-solid"
                width={18}
                height={18}
                style={{ color: "#fff" }}
              />
            </Link>
          )}
          {props.sub && (
            <Link
              to="sub-Category"
              className="w-7 h-7 bg-blue-800 flex justify-center items-center rounded"
            >
              <Icon
                icon="carbon:category"
                width={18}
                height={18}
                style={{ color: "#fff" }}
              />
            </Link>
          )}
          {props.view && (
            <Link
              to={`view/${item.id}`}
              className="w-7 h-7 bg-blue-800 flex justify-center items-center rounded"
            >
              <Icon
                icon="iconamoon:eye-light"
                width={18}
                height={18}
                style={{ color: "#fff" }}
              />
            </Link>
          )}
          {props.trash && (
            <button
              onClick={() => handleDelete(item.id)}
              className="w-7 h-7 bg-red-600 flex justify-center items-center rounded"
            >
              <Icon
                icon="mage:trash"
                width={18}
                height={18}
                style={{ color: "#fff" }}
              />
            </button>
          )}
        </td>
      )}
    </tr>
  ));

  return (
    <>
      <Notifcation />
      <table className="custom-table">
        <thead style={{ backgroundColor: props.gray && "#EEEEEE" }}>
          <tr>
            <th>SN</th>
            {showHeaders}
            {props.action && <th>Actions</th>}
          </tr>
        </thead>
        <tbody className="bg-white">
          {props.loading ? (
            <tr className=" rounded w-full p-10">
              <td className="text-textColor text-base" colSpan={10}>
                Loading ...
              </td>
            </tr>
          ) : props.data?.length != 0 ?   showData :(
            <tr className=" rounded w-full p-10 ">
              <td colSpan={10}>
                <div className="flex justify-center w-full">
                  <img
                    src={require("../../images/no-data.png")}
                    alt="Not found"
                    loading="lazy"
                  />
                </div>
              </td>
            </tr>
          
          
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
