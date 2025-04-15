import React, { useEffect, useRef, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";
import { Axios, baseUrl } from "../../../../components/Helpers/Axios";
import Notifcation from "../../../../components/Notification";
import { toast } from "react-toastify";
import './UpdateCategory.css'
const UpdateCategory = () => {
  const [disabled , setDisabled] = useState(false)
  const [laoding , setLoading] = useState(false)
  const [form, setForm] = useState({
    _method: 'POST',
    icon: null,
    name: "",
    slug: "",
    show_at_trending: 0 ,
    status: 0,
    code:'EN'
  });
  const [imageReq, setImageReq] = useState(false);
  const click = useRef(null);
  const navigate = useNavigate();
  const {id} = useParams();
  
  console.log(form);
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

  useEffect(()=>{
    setDisabled(true)
    Axios.get(`admin/course-category/${id}`).then((data)=>{
    setForm(data.data.data.category);
     setDisabled(false)
    console.log(data.data.data.category);
    })
  },[])
  //    Form Data
  

  // console.log(formData);
  //        Send Data
  const handleSubmit = async (e) => {
    
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append("_method", "PUT");
  if (form.icon && typeof form.icon !== "string") {
    formData.append("icon", form.icon);
  }
  
  formData.append("slug", form.slug);
  formData.append("show_at_trending", form.show_at_trending);
  formData.append("status", form.status);
  formData.append("code", 'EN');
    setDisabled(true)
    e.preventDefault();
try{

  if (form.icon) {
    const res = await Axios.post(`/admin/course-category/${id}`, formData).then(
      (data) => {
          setDisabled(false)

          console.log(data);
        toast.success('Upadated successfly')
        setTimeout(() => {
          
          navigate('/admin/Categories')
        }, 1000);

        }
      );
    } else {
      toast.error("Icon is required");
      setDisabled(false)

    }
  }catch(err){
    toast.error("some thing wrong");
    console.log(err);
    setDisabled(false)

     
  }
  };
  return (
    <>
      <Notifcation />
  
      <div className="UpdateCategory">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-textColor text-xl">Update Category</h3>
          <Breadcrumbs />
        </div>
        <div className="bg-white my-8">
          <div className="flex justify-between mb-4 items-center border-b p-4  border-borderColor">
            <h4 className="text-main text-base ">Update Category</h4>
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
                disabled={disabled}
                hidden
                ref={click}
                onChange={(e) => setForm({ ...form, icon: e.target.files[0] })}
              />
              <div
                onClick={() => click.current.click()}
                className={`cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-56 h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor ${disabled&& '!cursor-wait'}`}
              >
                {form.icon && (
                  <img
                    src={typeof form.icon  === 'string'? `${baseUrl}/${form.icon}` :URL.createObjectURL(form.icon)}
                    width={140}
                    height={120}
                    alt=""
                  />
                )}
                <button
                disabled={disabled}
                  type="button"
                  className={`text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end ${disabled && '!bg-gray-400 !border-gray-400 hover:!text-white'}`}
                >
                  Icon
                </button>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <input
              disabled={disabled}
                type="text"
                id="name"
                value={form.name}
                placeholder="Name"
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="Slug">Slug</label>
              <input
              disabled={disabled}

                type="text"
                id="Slug"
                value={form.slug}

                placeholder="Slug"
                required
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label htmlFor="name">Show at trading</label>
              <SelectBox
              disabled={disabled}
                data={showAtTraedingData}
                onChange={(e) =>
                  setForm({ ...form, show_at_trending: e.target.value === 'true' ? 1 : 0})
                }
                value={form.show_at_trending == 1 ? 'true' : 'false'}
              />
            </div>
            <div className="form-control">
              <label htmlFor="name">Status</label>
              <SelectBox
              disabled={disabled}

                data={statusData}
                onChange={(e) => setForm({ ...form, status: e.target.value === 'true' ? 1 : 0})}
                value={form.status == 1 ? 'true' : 'false'}
              />
            </div>
            <button type="submit" disabled={disabled} className={`${disabled && '!cursor-wait hover:!bg-main hover:!text-white'}`}>
              {disabled  ?  'Loading ...':
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

export default UpdateCategory;
