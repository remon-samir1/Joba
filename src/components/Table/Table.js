import React from "react";
import "./Table.css";
import { Icon } from "@iconify-icon/react";
import { Link } from "react-router-dom";
const Table = (props) => {
  return (

    <table className="custom-table">
      <thead>
        <tr>
          <th>SN</th>
          <th>type</th>
          <th>title</th>
          <th>instractor</th>
          <th>price</th>
          <th>students</th>
          <th>created date</th>
          <th>update date</th>
          <th>status</th>
          <th>Approve</th>
          {props.action && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Deutsh</td>
          <td>how to make your own bussines frfom zero</td>
          <td>dale bumbach</td>
          <td>Free</td>
          <td>30</td>
          <td>04 Feb 2025 17:26</td>
          <td>04 Feb 2025 17:26</td>
          <td>Puplished</td>
          <td>appeoved</td>
          {props.action && (
            <td className="flex justify-center items-center gap-3">
            {props.update &&    <Link
                to="update"
                className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
              >
                <Icon
                  icon="la:edit-solid"
                  width={18}
                  height={18}
                  style={{ color: "#fff" }}
                />
              </Link>}
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
                  to="sub-Category"
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
          {props.trash &&    <Link className="w-7 h-7 bg-red-600 flex justify-center items-center rounded">
                <Icon
                  icon="mage:trash"
                  width={18}
                  height={18}
                  style={{ color: "#fff" }}
                />
              </Link>}
            </td>
          )}
        </tr>
        <tr>
          <td>1</td>
          <td>Deutsh</td>
          <td>how to make your own bussines frfom zero</td>
          <td>dale bumbach</td>
          <td>Free</td>
          <td>30</td>
          <td>04 Feb 2025 17:26</td>
          <td>04 Feb 2025 17:26</td>
          <td>Puplished</td>
          <td>appeoved</td>
          {props.action && (
            <td className="flex justify-center items-center gap-3">
          {props.update &&    <Link
                to="update"
                className="w-7 h-7 bg-yellow-400 flex justify-center items-center rounded"
              >
                <Icon
                  icon="la:edit-solid"
                  width={18}
                  height={18}
                  style={{ color: "#fff" }}
                />
              </Link>}
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
                to="sub-Category"
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
          {props.trash &&    <Link className="w-7 h-7 bg-red-600 flex justify-center items-center rounded">
                <Icon
                  icon="mage:trash"
                  width={18}
                  height={18}
                  style={{ color: "#fff" }}
                />
              </Link>}
            </td>
          )}
        </tr>
      </tbody>
    </table>
              
  );
};

export default Table;
