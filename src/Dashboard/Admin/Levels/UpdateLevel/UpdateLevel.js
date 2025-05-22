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
  const [laoding, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    status: 0,
  });
  console.log(form);
  const click = useRef(null);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
      
      Axios.get(`/admin/course-level`).then(data=> {
    setForm(data.data.data.courseLevels.data.find(obj => obj.id == id))
   setLoading(false)
      })
  },[])

  const statusData = [
    {
      name: "Inactive",
      value: false,
    },
    {
      name: "Active",
      value: true,
    },
  ];

  //        Send Data
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("slug", form.slug);
      formData.append("status", form.status);
      formData.append("_method", 'PUT');

      const res = await Axios.post(`/admin/course-level/${id}`, formData).then(
        (data) => {
          console.log(data);
          setLoading(false);
          toast.success("Created successfly");
          setTimeout(() => {
            navigate("/admin/Levels");
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
          <h3 className="font-bold text-textColor text-xl">Update Level</h3>
          <Breadcrumbs />
        </div>
        <div className="bg-white my-8">
          <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
            <h4 className="text-main text-base ">Update Level</h4>
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
                value={form.name.name}
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
                disabled={laoding}
                value={form.slug}

                required
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label htmlFor="name">Status</label>
              <SelectBox
                disabled={laoding}
                data={statusData}
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value === "true" ? 1 : 0,
                  })
                }
                // value={form.status}
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
