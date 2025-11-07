import React from "react";
import StarRating from "../../../components/StarRating/StarRating";
import { useEffect } from "react";
import { Axios, baseUrl } from "../../../components/Helpers/Axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";
import { useTranslation } from "react-i18next";

const EnroledCourseReviews = ({ id }) => {
  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [change, setChange] = useState(false);
  const [form, setForm] = useState({
    rating: "",
    review: "",
    course_id: id,
  });
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setLoading(true);
    Axios.get("/student/reviews").then((data) => {
      setLoading(false);
      setReviews(data.data.reviews.data.filter((rev) => rev.course_id == id));
      console.log(data);
    });
  }, [change]);
  console.log(id);
  // useEffect(()=>{
  //   Axios.get(`/student/fetch-reviews/${id}`).then(data=>console.log(data))
  // },[change])
  // console.log(id);
  //  handle add Review
  const handleAddReview = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      Axios.post("/student/add-review", form).then((data) => {
        toast.success(data.data.messege);
        console.log(data);
        setForm({ rating: "", review: "", course_id: id });
        setLoading(false);
        setChange((prev) => !prev);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("Review Was not Created");
    }
  };
  return (
    <div className="pt-4 px-4 bg-white">
      <Notifcation />
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      {reviews.length === 0 ? (
        <div className="flex justify-center items-center py-5">
          <p className="text-base text-text2">{t("No Reviews yet")}</p>
        </div>
      ) : (
        reviews?.map((data, index) => (
          <>
            <div className="flex mt-4 items-center gap-5 py-8 rounded-lg px-4  border border-[#dddd]">
              <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden shrink-0">
                <img
                  src={`${baseUrl}/${data.user.image}`}
                  alt="instructor"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col  w-full  justify-between gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-textColor text-[1.1rem] font-semibold">
                    {data.user.name}
                  </h3>
                  <StarRating rating={data.rating} />
                </div>
                <p className="text-[0.9rem] text-textColor max-w-[80%]">
                  {data.review}
                </p>
              </div>
            </div>
          </>
        ))
      )}

      <form className="mt-6" onSubmit={handleAddReview}>
        <h4 className="text-[0.9rem] text-textColor">{t("Write a reviews")}</h4>
        <div className="mt-8">
          <label className="text-[0.9rem] text-textColor" htmlFor="rating">
            {t("Rating")}
          </label>
          <input
            max={5}
            required
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            value={form.rating}
            id="rating"
            type="number"
            className="w-full p-3 mt-4  border border-[#dddd] rounded-lg appearance-none focus:border-main outline-none "
          />
        </div>
        <div className="mt-8">
          <label className="text-[0.9rem] text-textColor" htmlFor="review">
            {t("Reveiw")}
          </label>
          <textarea
            required
            onChange={(e) => setForm({ ...form, review: e.target.value })}
            value={form.review}
            id="review"
            type="text"
            className="w-full p-3 mt-4  border border-[#dddd] rounded-lg appearance-none focus:border-main outline-none "
          />
        </div>
        <button
          type="submit"
          className="text-white bg-main text-base px-5 py-2 rounded-lg mt-4 main-shadow duration-500"
        >
          {t("Submit")}
        </button>
      </form>
    </div>
  );
};

export default EnroledCourseReviews;
