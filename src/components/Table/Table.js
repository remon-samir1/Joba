import React, { useState } from "react";
import "./Table.css";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";
import { Axios, baseUrl } from "../Helpers/Axios";
import ToggleStatusButton from "../TiggleStatusBtn/TiggleStatusBtn";
const Table = (props) => {
  // handle delete
  const handleDelete = async (id) => {
    try {
      console.log(id);
      await Axios.delete(`/admin/course-category/${id}`).then((data) =>
        console.log(data)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const showHeaders = props.headers?.map((data, key) => (
    <th key={key}>{data.title}</th>
  ));
  const showData = props.data?.map((item, key) => (
    <tr key={key}>
      <td>{item.id}</td>

      {props.headers.map((item2) => (
        <td>
          {item2.key == "icon" ? (
            <img
              src={`${baseUrl}/${item[item2.key]}`}
              width="100px"
              height="30px"
            />
          ) : item2.key == "show_at_trending" ? (
            item[item2.key] == 1 ? (
              <span className="text-teal-600 bg-teal-200 py-1 rounded-full px-5">
                Yes
              </span>
            ) : (
              <span className="text-red-600 bg-red-200 py-1 rounded-full px-5">
                No
              </span>
            )
          ) : item2.key == "status" ? (
            <ToggleStatusButton data={item[item2.key]} id={item.id} />
          ) : (
            item[item2.key]
          )}
        </td>
      ))}

      {/* statics */}
      {props.action && (
        <td className="flex justify-center items-center gap-3">
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
              to="view"
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
        ) : (
          showData
        )}
      </tbody>
    </table>
  );
};

export default Table;
