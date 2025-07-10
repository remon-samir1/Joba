import React, { useRef, useState } from "react";
import "./Profile.css";
import { useEffect } from "react";
import { Axios, baseUrl } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";
const Profile = () => {
  const [loading , setLoading] = useState(false)
  const [change , setChange] = useState(true)
  const [form , setForm] = useState({
    first_name:'',
    last_name:'',
    user_name:'',
    email:'',
    title:'',
    phone_number:'',
    bio:'',
    image: ''
    
  })
useEffect(()=>{
  setLoading(true)
  Axios.get('/admin/edit-profile').then(data=>{
    setForm(data.data.data.admin)
    toast.success('Updated Successfly')
    setLoading(false)
    console.log(data.data.data.admin)})
},[change])
// handleUpdate
const handleUpdate = async(e)=>{
  setLoading(true)
  e.preventDefault();
  const formData = new FormData();
  formData.append('first_name' , form.first_name)
  formData.append('last_name' , form.last_name)
  formData.append('user_name' , form.user_name)
  formData.append('title' , form.title)
  formData.append('phone_number' , form.phone_number)
  formData.append('email' , form.email)
  formData.append('bio' , form.bio)
  formData.append('image' , form.image)
  formData.append('_method' , 'PUT')
  try{
await Axios.post('admin/profile-update' ,formData ).then(data=> {
  setLoading(false)
  setChange(prev=>!prev)
  console.log(data)})
  }catch(err){
   console.log(err)
  }
}



  const click = useRef(null);
  // const [image, setImage] = useState();

  return (
    <div className="Profile">
      <Notifcation/>
        {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <h3 className="text-xl text-[#000000] font-semibold my-3">Profile</h3>
      <form className="bg-white p-5" onSubmit={handleUpdate}>
        <input
          type="file"
          ref={click}
          hidden
          onChange={(e) => setForm({...form ,image : e.target.files[0]})}
        />
        <div
          onClick={() => click.current.click()}
          className="w-[8.6rem] h-[8.6rem] overflow-hidden rounded-full border border-borderColor flex justify-center items-center cursor-pointer"
        >
          <img
            src={
              form.image ? typeof form.image === 'string' ? `${baseUrl}/${form.image}`
                : URL.createObjectURL(form.image)
                : require("../../../images/user.png")
            }
            alt="user"
            loading="lazy"
            className={`${typeof form.image === 'string' && '!w-full !h-full !object-cover'}`}
            width={72}
            height={72}
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="first-name">First name</label>
            <input
            value={form.first_name}
            onChange={(e)=>setForm({...form , first_name : e.target.value})}
            type="text" name="first" id="first-name" />
          </div>
          <div className="form-control">
            <label htmlFor="last-name">Last name</label>
            <input
                value={form.last_name}
                onChange={(e)=>setForm({...form , last_name : e.target.value})}
            type="text" name="last" id="last-name" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="user-name">User name</label>
            <input
            value={form.user_name}
            onChange={(e)=>setForm({...form , user_name : e.target.value})}
            type="text" name="user-name" id="user-name" />
          </div>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
            value={form.title}
            onChange={(e)=>setForm({...form , title : e.target.value})}
            type="text" name="title" id="title" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
            value={form.email}
            onChange={(e)=>setForm({...form , email : e.target.value})}
            type="email" name="email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="number">Contact number</label>
            <input
            value={form.phone_number}
            onChange={(e)=>setForm({...form , phone_number : e.target.value})}
             type="text" name="number" id="number" />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="Biography">Biography</label>
          <input
          value={form.bio}
          onChange={(e)=>setForm({...form , bio : e.target.value})}
          type="text" name="Biography" id="Biography" />
        </div>
        <button type="submit" className="bg-main text-white text-base  py-3 rounded mt-4 px-16 duration-500 ">Edit</button>
      </form>
    </div>
  );
};

export default Profile;
