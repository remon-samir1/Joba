import React, { useRef, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";
import { toast } from "react-toastify";
import { Axios, baseUrl } from "../../../../components/Helpers/Axios";
import Loading from "../../../../components/Loading/Loading";
import { useEffect } from "react";

const UpdatePost = () => {
  // show data
  const { id } = useParams();
  const [category, setCategory] = useState([]);

  const [form, setForm] = useState({
    image: "",
    title: "",
    slug: "",
    description: "",
    blog_category_id: "",
  });
  useEffect(() => {
    setLoading(true);
    Axios.get(`/admin/blogs`).then((data) => {
      // console.log(data);
      setForm(data.data.data.posts.data.filter((data) => data.id == id)[0]);
      setLoading(false);
    });
  }, []);
  console.log(form);
  //  get post category
  useEffect(() => {
    Axios.get(`/admin/blog-category`).then((data) => {
      setCategory(data.data.data.data);
      console.log(data.data.data.data);
    });
  }, []);
  console.log(form);

  const click = useRef(null);
  const navigate = useNavigate();
  const [laoding, setLoading] = useState(true);

  const [showHomePage, setShowHomePage] = useState(0);
  const [isPopular, setIsPopular] = useState(0);
  const [status, setStatus] = useState(0);
  console.log(form);

  // handleSubmit function
  const handleSubmit = async (e) => {
    // setLoading(true)
    e.preventDefault();
    //    Form Data
    const formData = new FormData();
    if(typeof form.image != "string"){

      formData.append("image", form.image);
    }
    formData.append("title", form.title);
    
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    formData.append("show_homepage", showHomePage);
    formData.append("blog_category_id", form.blog_category_id);

    formData.append("status", status);
    formData.append("code", "en");
    formData.append("is_popular", isPopular);
    formData.append("_method", "PUT");
    try {
      setLoading(true);
      if (form.image) {
        const res = await Axios.post(`/admin/blogs/${id}`, formData).then(
          (data) => {
            console.log(data);
            setLoading(false);
            toast.success("Created successfly");
            setTimeout(() => {
              navigate("/admin/post-list");
            }, 2000);
          }
        );
      } else {
        toast.error("image is required");
        setLoading(false);
      }
    } catch (err) {
      toast.error("some thing wrong");
      setLoading(false);
      console.log(err);
    }
  };
  const categoryData = category?.map((data, index) => (
    <option disabled={laoding} value={data.id}>
      {data.name}
    </option>
  ));
  return (
    <div className="UpdateCategory">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Add Post</h3>
        <Breadcrumbs />
      </div>
      <div className="bg-white my-8">
        <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
          <h4 className="text-main text-base ">Add Post</h4>
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
        <form className="inputs  p-7" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="file"
              hidden
              disabled={laoding}
              ref={click}
              onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            />
            <div
              onClick={() => click.current.click()}
              className={`cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-56 h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor ${laoding && '!cursor-not-allowed'}`}
            >
              {form.image && (
                <img
                  src={
                    typeof form.image === "string"
                      ? `${`https://goba.sunmedagency.com`}/${form.image}`
                      : URL.createObjectURL(form.image)
                  }
                  width={140}
                  height={120}
                  alt=""
                />
              )}
              <button
                type="button"
                className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end"
              >
                Icon
              </button>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="Titel">Title</label>
            <input
              type="text"
              id="Titel"
              value={form.title}
              disabled={laoding}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              id="slug"
              value={form.slug}
              disabled={laoding}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              required
              type="text"
              id="category"
              className="bg-white"
              value={form.blog_category_id}
              disabled={laoding}
              onChange={(e) =>
                setForm({ ...form, blog_category_id: e.target.value })
              }
            >
              <option disabled value="">
                Category
              </option>
              {categoryData}
            </select>
          </div>
          <div className="form-control ">
            <label htmlFor="Description">Description</label>
            <textarea
              type="text"
              id="Description"
              className="h-36"
              disabled={laoding}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
          </div>

          <div className="toggels mt-4 grid gap-4">
            {!laoding && (
              <>
                <ToggleButton
                  title="Show on homepage"
                  setData={setShowHomePage}
                  data={form?.show_homepage}
                />
                <ToggleButton
                  title="Mark as populer"
                  setData={setIsPopular}
                  data={form?.is_popular}
                />
                <ToggleButton
                  title="Status"
                  setData={setStatus}
                  data={form?.status}
                />
              </>
            )}
          </div>
          <button
            disabled={Loading}
            type="submit"
            className={`${laoding && "cursor-wait"}`}
          >
            {laoding ? (
              "Loading..."
            ) : (
              <>
                <LuSave width={24} height={24} className=" text-white icon" />
                <span>Save</span>{" "}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
