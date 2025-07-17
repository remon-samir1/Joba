import React, { useRef, useState, useEffect } from "react";
// import "../Addcourse.css";
import StringSlice from "../../../../components/Helpers/StringSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Axios, baseUrl } from "../../../../components/Helpers/Axios";
import Notifcation from "../../../../components/Notification";

const UpdateCourseBasics = ({ setPage, setCourseId, setSlug }) => {
  const navigate = useNavigate();
  const [laoding, setLoading] = useState(true);
  const [videoSource, setVideoSource] = useState("youtube");

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
  const thubmRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    Axios.get("admin/courses").then((data) => {
      const currentCourse = data.data.data.courses.data.find((c) => c.id == id);
      setForm(currentCourse);
      setSlug(currentCourse.slug);
      setLoading(false);
    });
  }, []);

  const urlToFile = async (imageUrl, fileName, mimeType = "image/jepg") => {
    const fullUrl = imageUrl.startsWith("http")
      ? imageUrl
      : `${baseUrl.replace(/\/$/, "")}/${imageUrl.replace(/^\//, "")}`;
      const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const response = await fetch( fullUrl );
    if (!response.ok) throw new Error("Failed to fetch image");
    const blob = await response.blob();
    return new File([blob], fileName, { type: mimeType });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("id", id);
    formData.append("edit_mode", 1);

    try {
      let thumbnailFile;
      if (typeof form.thumbnail === "string") {
        thumbnailFile = await urlToFile(form.thumbnail, "thumbnail.png", "image/jpeg");
      } else {
        thumbnailFile = form.thumbnail;
      }

      formData.append("thumbnail", thumbnailFile);
      formData.append("seo_description", form.description);
      formData.append("demo_video_storage", form.demo_video_storage);
      formData.append("external_path", form.demo_video_source);
      formData.append("upload_path", form.upload_path);
      formData.append("price", form.price);
      formData.append("instructor", form.price);
      formData.append("discount_price", form.discount);
      formData.append("description", form.description);

      const res = await Axios.post("/admin/courses/create", formData);
      toast.success("Updated successfully");
      setLoading(false);
      setPage("more");
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="AddCoourse">
      <Notifcation />
      {laoding && (
        <div className="fixed h-screen overflow-hidden bg-white bg-opacity-50 z-50 inset-0"></div>
      )}
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
              {form.thumbnail && typeof form.thumbnail !== "string"
                ? form.thumbnail.name
                : StringSlice(form.thumbnail, 20)}
            </p>
            <input
              disabled={laoding}
              ref={thubmRef}
              accept="image/*"
              hidden
              type="file"
              onChange={(e) => setForm({ ...form, thumbnail: e.target.files[0] })}
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
                  id="path"
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

        <div className="flex justify-center items-center md:gap-4 flex-col md:flex-row">
          <div className="form-control relative">
            <label htmlFor="price">Price</label>
            <input
              disabled={laoding}
              type="text"
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
