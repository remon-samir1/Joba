import React , { useRef, useState }  from 'react';
// import "../Addcourse.css";
import StringSlice from '../../../../components/Helpers/StringSlice'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../../../components/Helpers/Axios";
import Notifcation from '../../../../components/Notification';
const AddCourseBasics = ({setPage , setCourseId}) => {
  const navigate = useNavigate();
  const [laoding , setLoading] = useState(false)

  const [form, setForm] = useState({
    title:'',
    thumbnail: "",
    path: "",
    demo: "youtube",
    price:'',
    upload:"",
    discount:'',
    description:''
  });
  const [videoSource, setVideoSource] = useState("youtube");

  const thubmRef = useRef(null);
  const pathRef = useRef(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("thumbnail", form.thumbnail);
    formData.append("seo_description", form.description);
    formData.append("demo_video_storage", form.demo);
    formData.append("external_path", form.path);
    formData.append("upload_path", form.upload);
    formData.append("price", form.price);
    formData.append("instructor", form.price);

    formData.append("discount_price", form.discount);
    formData.append("description", form.description);
    try {
      console.log('test');
      const res = await Axios.post("/admin/courses/create", formData).then((data) => {
        console.log(data);
        toast.success('Created successfly');
        setLoading(false)
        setCourseId(data.data.course_id)
          setPage('more')
      });
    } catch(err) {
      toast.error("some thing wrong");
      setLoading(false);
  console.log(err);
    } 
  };

  return (
    <div className="AddCoourse">
      <Notifcation/>
      {
        laoding && <div className="fixed h-screen overflow-hidden bg-white bg-opacity-50 z-50 inset-0"></div>
      }
      {/* <h3 className="text-[#000000] text-base font-semibold">Add course</h3> */}
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
              disabled={laoding}
              ref={thubmRef}
              accept="image/*"
              hidden
              type="file"
              id="title"
              className="!flex-1"
              onChange={(e) =>{
                console.log(e)

                setForm({ ...form, thumbnail: e.target.files[0] })
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
                setForm({ ...form, demo: e.target.value, path: "" });
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
                <div >choose</div>
                <p>{form.upload && StringSlice(form.upload.name, 12)}</p>
                <input
                disabled={laoding}
                  ref={pathRef}
                  hidden
                  accept="video/*"
                  required
                  type="file"
                  id="path"
                  className="!flex-1"
                  onChange={(e) => setForm({ ...form, upload: e.target.files[0] })}
                />
              </div>
            ) : (
              <input
              disabled={laoding}
                type="text"
                required
                className="input"
                placeholder="Paste video link"
                value={form.path}
                onChange={(e) => setForm({ ...form, path: e.target.value })}
              />
            )}
          </div>
        </div>

        <div className="flex justify-center items-center md:gap-4 flex-col md:flex-row ">
          <div className="form-control relative">
            <label htmlFor="price">Price</label>
            <input disabled={laoding} type="number" id="price" value={form.price} required onChange={(e)=>setForm({...form,price:e.target.value })}/>
            <p className="text-[red] absolute top-full mt-2 text-[14px]">Put 0 for free</p>
          </div>
          <div className="form-control !mt-10 md:!mt-5">
            <label htmlFor="discount">Discount</label>
            <input disabled={laoding} type="number" id="discount"  value={form.discount} onChange={(e)=>setForm({...form,discount:e.target.value })}/>
          </div>
        </div>

        <div className="form-control !mt-11">
          <label htmlFor="description">Description</label>
          <textarea disabled={laoding} id="description" required className="h-72" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value })}/>
        </div>
        
        <button type="submit" className={`${laoding && 'cursor-wait'}`} disabled={laoding}>{laoding ? "Loding..." :'Save'}</button>
      </form>
    </div>
  );
};


export default AddCourseBasics;


