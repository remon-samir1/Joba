import { Icon } from "@iconify-icon/react";
import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { useNavigate, useParams } from "react-router-dom";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import { useEffect } from "react";
import { useState } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import StarRating from "../../../components/StarRating/StarRating";
import { toast } from "react-toastify";
import SkeletonShow from "../../../components/Skeleton/Skeleton";
const StudentReviewsDetails = () => {
  const [data, setData] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [skeleton, setSkeleton] = useState(true);
  const [status, setStatus] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  // useEffect(() => {
  //   Axios.get(`/admin/course-review`).then((data) => {
  //     setData(data.data.data.reviews.data.find((obj) => obj.id == id));
  //     setSkeleton(false)

  //   });
  // }, []);


  return (
    <div className="UpdateCategory">
      <div className="flex items-center justify-between mt-4">
        <h3 className="text-base text-textColor">Review Details</h3>
        <Breadcrumbs/>
      </div>
    
      <div className="bg-white my-4">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Courses</h4>
          <button
            onClick={() => navigate(-1)}
            className="flex justify-between gap-1 items-center text-white bg-main py-2 px-4 rounded-md link border border-main duration-500 hover:bg-white hover:text-main"
          >
            <Icon
              icon="solar:arrow-left-outline"
              width={20}
              height={20}
              className="hover:bg-white hover:text-main"
            />
            <span>Back</span>
          </button>
        </div>
        <div className="CourseReviewDetails">
          <div className="titles">
            <p>Course</p>
            <p>Rating</p>
            <p>Review</p>
            <p>Date</p>
            <p>Status</p>
          </div>
          <div className="details flex-1">
            {skeleton ? (
              <div className="w-full  flex-1">
                <SkeletonShow
                  height="20px"
                  width="100%"
                  length="5"
                  classes="mb-9"
                />
              </div>
            ) : (
              <>
                <p>{data.course?.title}</p>
                <div>
                  <StarRating rating={data?.rating} />
                </div>
                <p>{data?.review}</p>
                <p>{data?.created_at}</p>
              <p>app</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReviewsDetails;
