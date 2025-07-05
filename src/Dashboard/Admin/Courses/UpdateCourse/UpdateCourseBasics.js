import React, { useRef, useState } from "react";
// import "../Addcourse.css";
import StringSlice from "../../../../components/Helpers/StringSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../../../components/Helpers/Axios";
import Notifcation from "../../../../components/Notification";
import { useEffect } from "react";
const UpdateCourseBasics = ({ setPage, setCourseId, setSlug }) => {
  const navigate = useNavigate();
  const [laoding, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    demo_video_source: "",
    demo_video_storage: "youtube",
    price: "",
    upload_path: "",
    discount: "",
    description: "",
  });
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    Axios.get("admin/courses").then((data) => {
      // data.filter(course => course.id ===id)
      setForm(data.data.data.courses.data.filter((prev) => prev.id == id)[0]);
      setSlug(
        data.data.data.courses.data.filter((prev) => prev.id == id)[0].slug
      );
      setLoading(false);
    });
  }, []);
  console.log(form);
  const [videoSource, setVideoSource] = useState("youtube");
console.log(form);
  const thubmRef = useRef(null);
  const pathRef = useRef(null);
  const urlToFile = async (imageUrl, fileName, mimeType = "image/jpeg") => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
  };
  
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    // const newFile = new File();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("id", id);
    formData.append("edit_mode", 1);
    if (typeof form.thumbnail === "string") {
      const fileFromUrl = await urlToFile(form.thumbnail, "thumbnail.jpg");
      formData.append("thumbnail", fileFromUrl);
    } else {
      formData.append("thumbnail", form.thumbnail);
    }
    
    formData.append("seo_description", form.description);
    formData.append("demo_video_storage", form.demo_video_storage);
    formData.append("external_path", form.demo_video_source);
    formData.append("upload_path", form.upload_path);
    formData.append("price", form.price);
    formData.append("instructor", form.price);

    formData.append("discount_price", form.discount);
    formData.append("description", form.description);
    try {
      console.log("test");
      const res = await Axios.post("/admin/courses/create", formData).then(
        (data) => {
          console.log(data);
          toast.success("Updated successfly");
          setLoading(false);
          // setCourseId(data.data.course_id)
          setPage('more')
        }
      );
    } catch (err) {
      toast.error("some thing wrong");
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="AddCoourse">
      <Notifcation />
      {laoding && (
        <div className="fixed h-screen overflow-hidden bg-white bg-opacity-50 z-50 inset-0"></div>
      )}
      {/* <h3 className="text-[#000000] text-base font-semibold">Add course</h3> */}
      <form className="p-5 bg-white" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="form-control">
          <label htmlFor="thumbnail">Thumbnail</label>
          <div className="input" onClick={() => thubmRef.current.click()}>
            <div>choose</div>
            <p>
              {form.thumbnail &&
                typeof form.thumbnail !== "string" &&
                form.thumbnail.name}
            </p>

            <input
              disabled={laoding}
              ref={thubmRef}
              accept="image/*"
              hidden
              type="file"
              id="title"
              className="!flex-1"
              onChange={(e) => {
                console.log(e);

                setForm({ ...form, thumbnail: e.target.files[0] });
              }}
            />
          </div>
        </div>

        <div className="flex justify-center items-center md:gap-4 flex-col md:flex-row">
          <div className="form-control">
            <label htmlFor="demo">Demo Video Source</label>
            <select
              id="demo"
              disabled={laoding}
              className="input bg-white"
              value={videoSource}
              onChange={(e) => {
                setVideoSource(e.target.value);
                setForm({
                  ...form,
                  demo_video_storage: e.target.value,
                  path: "",
                });
              }}
            >
              <option value="upload">Upload</option>
              <option value="youtube">YouTube</option>
              <option value="vimeo">Vimeo</option>
              <option value="external_link">External link</option>
            </select>
          </div>

          <div className="form-control">
            <label htmlFor="path">Path</label>
            {videoSource === "upload" ? (
              <div className="input" onClick={() => pathRef.current.click()}>
                <div>choose</div>
                <p>{form.upload && StringSlice(form.upload.name, 12)}</p>
                <input
                  disabled={laoding}
                  ref={pathRef}
                  hidden
                  accept="video/*"
                  required
                  type="file"
                  value={form.upload_path}
                  id="path"
                  className="!flex-1"
                  onChange={(e) =>
                    setForm({ ...form, upload_path: e.target.files[0] })
                  }
                />
              </div>
            ) : (
              <input
                disabled={laoding}
                type="text"
                required
                className="input"
                placeholder="Paste video link"
                value={form.demo_video_source}
                onChange={(e) =>
                  setForm({ ...form, demo_video_source: e.target.value })
                }
              />
            )}
          </div>
        </div>

        <div className="flex justify-center items-center md:gap-4 flex-col md:flex-row ">
          <div className="form-control relative">
            <label htmlFor="price">Price</label>
            <input
              disabled={laoding}
              type="number"
              id="price"
              value={form.price}
              required
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
            <p className="text-[red] absolute top-full mt-2 text-[14px]">
              Put 0 for free
            </p>
          </div>
          <div className="form-control !mt-10 md:!mt-5">
            <label htmlFor="discount">Discount</label>
            <input
              disabled={laoding}
              type="number"
              id="discount"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
            />
          </div>
        </div>

        <div className="form-control !mt-11">
          <label htmlFor="description">Description</label>
          <textarea
            disabled={laoding}
            id="description"
            required
            className="h-72"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className={`${laoding && "cursor-wait"}`}
          disabled={laoding}
        >
          {laoding ? "Loding..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default UpdateCourseBasics;
