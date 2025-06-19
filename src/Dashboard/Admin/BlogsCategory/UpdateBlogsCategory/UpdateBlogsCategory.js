import React, { useRef, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../../../components/Helpers/Axios";
import Notifcation from "../../../../components/Notification";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading/Loading";
import { useEffect } from "react";

const AddCategory = () => {
  const [laoding, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: 0,
    code:'EN',
    _method:'PUT'
  });
  console.log(form);
  const click = useRef(null);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
       setLoading(true)
      Axios.get(`/admin/blog-category/`).then(data=>
        
        {setForm(data.data.data.data.find(obj => obj.id == id))
        setLoading(false)
        })
      console.log(form);
  },[])
  const statusData = [
    {
      name: "Inactive",
      value: 0,
    },
    {
      name: "Active",
      value: 1,
    },
  ];

  //        Send Data
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {

      const formData={
        title:form.name,
        slug: form.slug,
        status:form.status,
        code:'EN',
        _method:'PUT'
      }


      const res = await Axios.put(`/admin/blog-category/${id}`, formData).then(
        (data) => {
          console.log(data);
          setLoading(false);
          toast.success("Updated successfly");
          setTimeout(() => {
            navigate("/admin/Blogs-category");
          }, 2000);
        }
      );
    } catch (err) {
      toast.error("some thing wrong");
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <Notifcation />

      <div className="UpdateCategory">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl">Update Blogs Category</h3>
          <Breadcrumbs />
        </div>
        <div className="bg-white my-8">
          <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
            <h4 className="text-main text-base ">Update Blogs Category</h4>
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
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                disabled={laoding}
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                id="slug"
                placeholder="Slug"
                value={form.slug}

                disabled={laoding}
                required
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>

        
            <button
              type="submit"
              disabled={laoding}
              className={`${
                laoding && "cursor-wait hover:!bg-main hover:!text-white"
              }`}
            >
              {laoding ? (
                "Loading ..."
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
    </>
  );
};

export default AddCategory;
