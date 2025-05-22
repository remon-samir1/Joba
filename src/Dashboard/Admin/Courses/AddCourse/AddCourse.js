import React, { useRef, useState } from "react";
import "./Addcourse.css";
import StringSlice from '../../../../components/Helpers/StringSlice'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../../components/Helpers/Axios";
const AddCourse = () => {
  const navigate = useNavigate();
  const [laoding , setLoading] = useState(false)

  const [form, setForm] = useState({
    title:'',
    thumbnail: "",
    path: "",
    demo: "",
    price:'',
    discount:'',
    description:''
  });
  const thubmRef = useRef(null);
  const pathRef = useRef(null);
  const DemoRef = useRef(null);
//         handleSubmit function
const handleSubmit = async (e) => {
  setLoading(true)
  e.preventDefault();
  //    Form Data
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("thumbnail", form.thumbnail);
  formData.append("demo_video_source", form.demo);
  formData.append("path", form.path);
  formData.append("peice", form.price);
  formData.append("discount", form.discount);
  formData.append("description", form.description);
  try{


  console.log('test');
  const res = await Axios.post("/admin/courses/create", formData).then(
    (data) => {
      console.log(data);
        // setLoading(false)
      toast.success('Created successfly')
      setTimeout(() => {
        
        navigate('/admin/Categories')
      }, 2000);

      }
    );
  
}catch(err){
  toast.error("some thing wrong");
   setLoading(false)
   console.log(err);
} 
};
  return (
    <div className="AddCoourse">
      <h3 className="text-[#000000] text-base font-semibold">Add course</h3>
      <form className="p-5 bg-white" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" required value={form.title} onChange={(e)=>setForm({...form,title:e.target.value })}/>
        </div>
        <div className="form-control">
          <label htmlFor="thumbnail">Thumbnail</label>
          <div className="input" onClick={() => thubmRef.current.click()}>
            <div>choose</div>
            <p>{form.thumbnail && form.thumbnail.name}</p>
            <input
            required
              ref={thubmRef}
              accept="image/*"
              hidden
              type="file"
              id="title"
              className="!flex-1"
              onChange={(e) =>
                setForm({ ...form, thumbnail: e.target.files[0] })
              }
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="title">
              Demo video <span className="text-red-600">(optional)</span>
            </label>
            <div className="input" onClick={() => DemoRef.current.click()}>
              <p>{form.demo && StringSlice(form.demo.name,25) }</p>
              <input
                ref={DemoRef}
                accept="video/*"
                required
                hidden
                type="file"
                id="title"
                className="!flex-1"
                onChange={(e) => setForm({ ...form, demo: e.target.files[0] })}
              />
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="title">Path</label>
            <div className="input" onClick={() => pathRef.current.click()}>
              <div>choose</div>
              <p>{form.path && StringSlice(form.path.name,12) }</p>
              <input
                ref={pathRef}
                hidden
                accept="video/*"
                required
                type="file"
                id="title"
                className="!flex-1"
                onChange={(e) => setForm({ ...form, path: e.target.files[0] })}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 ">
        <div className="form-control relative">
          <label htmlFor="price">Price</label>
          <input type="number" id="price" value={form.price} required onChange={(e)=>setForm({...form,price:e.target.value })}/>
          <p className="text-[red] absolute top-full mt-2 text-[14px]">Put 0 for free</p>
        </div>
        <div className="form-control">
          <label htmlFor="discount">Discount</label>
          <input type="number" id="discount"  value={form.discount} onChange={(e)=>setForm({...form,discount:e.target.value })}/>
        </div>
        </div>
        <div className="form-control !mt-11">
          <label htmlFor="description">Description</label>
          <textarea id="description " required className="h-72" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value })}/>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddCourse;
