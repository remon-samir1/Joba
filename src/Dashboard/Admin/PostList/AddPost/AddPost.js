import React, { useRef, useState } from "react";
import Breadcrumbs from "../../../../components/Breadcrumbs/Breadcrumbs";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
import { Icon } from "@iconify-icon/react";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";
import { toast } from "react-toastify";
import { Axios } from "../../../../components/Helpers/Axios";

const AddPost = () => {
  const click = useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    image:'',
    title:'',
    slug:'',
    description:'',

  });
  const [showHomePage , setShowHomePage] = useState(null)
  const [isPopular , setIsPopular] = useState(null)
  const [status , setStatus] = useState(null)
  console.log(form);
  console.log(showHomePage);
  console.log(isPopular);
  console.log(status);
  // handleSubmit function
  const handleSubmit = async (e) => {
    // setLoading(true)
    e.preventDefault();
    //    Form Data
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("image", form.image);
    formData.append("slug", form.slug);
    formData.append("description", form.description);
    // formData.append("show_homepage", showHomePage);
    // formData.append("status", status);
    // formData.append("is_popular", isPopular);
    try{

  if (form.image) {
    const res = await Axios.post("/admin/blogs", formData).then(
      (data) => {
        console.log(data);
          // setLoading(false)
        toast.success('Created successfly')
        setTimeout(() => {
          
          // navigate('/admin/Categories')
        }, 2000);

        }
      );
    } else {
      toast.error("image is required");
    //  setLoading(false)

      
    }
  }catch(err){
    toast.error("some thing wrong");
    //  setLoading(false)
     console.log(err);
  } 
  };


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
              ref={click}
              onChange={(e) => setForm({...form , image:e.target.files[0]})}
              required
            />
            <div
              onClick={() => click.current.click()}
              className="cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-56 h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
            >
              {form.image && (
                <img
                  src={URL.createObjectURL(form.image)}
                  width={140}
                  height={120}
                  alt=""
                />
              )}
              <button type="button" className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end">
                Icon
              </button>
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="Titel">Titel</label>
            <input type="text" id="Titel" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}required/>
          </div>
          <div className="form-control">
            <label htmlFor="slug">Slug</label>
            <input type="text" id="slug" value={form.slug} onChange={(e)=>setForm({...form,slug:e.target.value})} required/>
          </div>
          <div className="form-control ">
            <label htmlFor="Describtion">Describtion</label>
            <textarea type="text" id="Describtion" className="h-36" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} required/>
          </div>

      
         <div className="toggels mt-4 grid gap-4">
          <ToggleButton title='Show on homepage' setData={setShowHomePage}/>
          <ToggleButton title='Mark as populer' setData={setIsPopular}/>
          <ToggleButton title='Status' setData={setStatus}/>
          
         </div>
         <button type="submit">
            <LuSave width={24} height={24} className=" text-white icon" />
            <span>Save</span>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
