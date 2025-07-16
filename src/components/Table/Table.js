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
import { AiOutlineLoading } from "react-icons/ai";

const Table = (props) => {
  const [loadDelete, setLoadDelete] = useState(false);
  // handle delete
  const handleDelete = async (id, parent_id) => {
    setLoadDelete(id);
    try {
      console.log(id);

      await Axios.post(
        `${props.delurl ? props.delurl : props.url}/${id}/${
          parent_id ? parent_id : ""
        }`,
        {
          _method: "DELETE",
        }
      ).then((data) => {
        setLoadDelete(false);
        console.log(data);
        props.setDeleted((prev) => !prev);
        // props.setData(props.data.filter(prev=> prev.id !== id))
        if (data.data.status == "error") {
          toast.error(data.data.message || data.data.messege);
        } else {
          toast.success(
            data.data.status ? data.data.status : "Deleted successfly"
          );
        }
      });
    } catch (err) {
      toast.success(err);
      console.log(err);
      setLoadDelete(false);
    }
  };

  const showHeaders = props.headers?.map((data, key) => (
    <th key={key}>{data.title}</th>
  ));
  const showData = props.data?.map((item, key) => (
    <tr>
      <td>{item.id}</td>

      {props.headers.map((item2, i) => (
        <td key={i} className="">
          {item2.key === "icon" ? (
            <img
              src={`${baseUrl}/${item[item2.key]}`}
              width="30px"
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
          ) : item2.key === "status" &&
            item2.type !== "static" &&
            item2.type !== "show" &&
            item2.type !== "text" ? (
            <ToggleStatusButton
              data={item[item2.key]}
              id={item.id}
              url={props.url}
            />
          ) : item2.key === "created_at" ||
            item2.key === "updated_at" ||
            item2.key === "expired_date" ? (
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
          ) : item2.key === "email_verified_at" ? (
            item[item2.key] != null ? (
              <span className="text-white bg-green-600 py-1 px-6 rounded-3xl">
                {" "}
                verified
              </span>
            ) : (
              <span
                className="text-white bg-orange-500 py-1 px-6 rounded-3xl "
                style={{ whiteSpace: "nowrap" }}
              >
                Not verified
              </span>
            )
          ) : item2.type == "show" ? (
            item[item2.key] == "active" ? (
              <span className="bg-green-500 text-white px-5 py-1 rounded-3xl">
                active
              </span>
            ) : (
              <span className="bg-orange-500 text-white px-5 py-1 rounded-3xl">
                Inactive
              </span>
            )
          ) : item2.type === "text" && item2.key === "status" ? (
            item[item2.key] === "completed" ? (
              <span className="text-base bg-[#4C9D8D] rounded-3xl text-white py-1 px-5">
                {item[item2.key]}
              </span>
            ) : (
              <span className="text-base bg-orange-600 text-white rounded-3xl py-1 px-5">
                {item[item2.key]}
              </span>
            )
          ) : item2.key === "payment_status" ? (
            item[item2.key] === "paid" ? (
              <span className="text-base bg-[#4C9D8D] rounded-3xl text-white py-1 px-8">
                {item[item2.key]}
              </span>
            ) : (
              <span className="text-base bg-orange-600 rounded-3xl text-white py-1 px-8">
                {item[item2.key]}
              </span>
            )
          ) : item2.key === "is_approved" ? (
            item[item2.key] === "approved" ? (
              <span className="text-white bg-green-600 py-1 px-4 rounded-3xl">
                Approved
              </span>
            ) : item[item2.key] === "rejected" ? (
              <span className="text-white bg-red-600 py-1 px-4 rounded-3xl">
                Disapproved
              </span>
            ) : (
              <span className="text-white bg-orange-600 py-1 px-4 rounded-3xl">
                Draft
              </span>
            )
          ) : item2.key === "buyer" ? (
            item[item2.key].name
          ) : 
          item2.key === 'coupon_type' ? item[item2.key] == 1 ? <span  className="text-sm text-white bg-green-600 px-4 py-1 rounded-full">normal</span> : <span  className="text-sm text-white bg-orange-600 px-4 py-1 rounded-full">one time</span> :
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
              to={`sub-Category/${item.id}`}
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

          {props.viewStudent && (
            <Link
              to={`/student/order-history/view/${item.id}`}
              className="w-7 h-7 bg-[#F15A24] bg-opacity-30 flex justify-center items-center rounded-full"
            >
              <Icon
                icon="iconamoon:eye-light"
                width={18}
                height={18}
                style={{ color: "#F15A24" }}
              />
            </Link>
          )}

          {props.trash && (
            <button
              disabled={loadDelete == item.id}
              onClick={() =>
                handleDelete(
                  item.id,
                  props.url === "admin/course-sub-category" && item.parent_id
                )
              }
              className="w-7 h-7 bg-red-600 flex justify-center items-center rounded"
            >
              {loadDelete == item.id ? (
                <AiOutlineLoading className="load-icon text-white" />
              ) : (
                <Icon
                  icon="mage:trash"
                  width={18}
                  height={18}
                  style={{ color: "#fff" }}
                />
              )}
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
            {props.action && <th> {props.viewStudent ? "" : "Actions"}</th>}
          </tr>
        </thead>
        <tbody className="bg-white">
          {props.loading ? (
            <tr className=" rounded w-full p-10">
              <td className="text-textColor text-base" colSpan={10}>
                Loading ...
              </td>
            </tr>
          ) : props.data?.length != 0 ? (
            showData
          ) : (
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
