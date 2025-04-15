import React, { useRef, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../../../components/Helpers/Axios";
import Notifcation from "../../../../components/Notification";
import { toast } from "react-toastify";
import Loading from "../../../../components/Loading/Loading";

const AddCategory = () => {
  const [laoding , setLoading] = useState(false)
  const [form, setForm] = useState({
    icon: null,
    name: "",
    slug: "",
    showAtTraeding:0 ,
    status: 0,
  });
  const [imageReq, setImageReq] = useState(false);
  console.log(form);
  const click = useRef(null);
  const navigate = useNavigate();
  const showAtTraedingData = [
    {
      name: "No",
      value: false,
    },
    {
      name: "Yes",
      value: true,
    },
  ];
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
  //    Form Data
  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("icon", form.icon);
  formData.append("slug", form.slug);
  formData.append("show_at_trending", form.showAtTraeding);
  formData.append("status", form.status);

  console.log(formData);
  //        Send Data
  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
try{

  if (form.icon) {
    const res = await Axios.post("/admin/course-category", formData).then(
      (data) => {
          setLoading(false)
        toast.success('Created successfly')
        setTimeout(() => {
          
          navigate('/admin/Categories')
        }, 2000);

        }
      );
    } else {
      toast.error("Icon is required");
     setLoading(false)

      
    }
  }catch(err){
    toast.error("some thing wrong");
     setLoading(false)
  }
  };
  return (
    <>
      <Notifcation />
  
      <div className="UpdateCategory">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl">Add Category</h3>
          <Breadcrumbs />
        </div>
        <div className="bg-white my-8">
          <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
            <h4 className="text-main text-base ">Add Category</h4>
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
                onChange={(e) => setForm({ ...form, icon: e.target.files[0] })}
              />
              <div
                onClick={() => click.current.click()}
                className="cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-56 h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
              >
                {form.icon && (
                  <img
                    src={URL.createObjectURL(form.icon)}
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
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
              disabled={laoding}

                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="Slug">Slug</label>
              <input
                type="text"
                id="Slug"
                placeholder="Slug"
              disabled={laoding}

                required
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="name">Show at trading</label>
              <SelectBox
              disabled={laoding}

                data={showAtTraedingData}
                onChange={(e) =>
                  setForm({ ...form, showAtTraeding: e.target.value === 'true' ? 1 : 0})
                }
                value={form.showAtTraeding}
              />
            </div>
            <div className="form-control">
              <label htmlFor="name">Status</label>
              <SelectBox
              disabled={laoding}
                data={statusData}
                onChange={(e) => setForm({ ...form, status: e.target.value === 'true' ? 1 : 0})}
                value={form.status}
              />
            </div>
            <button type="submit" disabled={laoding} className={`${laoding && 'cursor-wait hover:!bg-main hover:!text-white'}`}>
              {laoding  ?  'Loading ...':
              <>
              <LuSave width={24} height={24} className=" text-white icon" />
              <span>Save</span>{" "}
              </>
              }
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
