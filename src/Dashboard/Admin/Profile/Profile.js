import React, { useRef, useState } from "react";
import "./Profile.css";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
const Profile = () => {
  const [form , setForm] = useState({
    name:'',
    
  })
useEffect(()=>{
  Axios.get('/admin/edit-profile').then(data=>console.log(data.data.data.admin))
},[])



  const click = useRef(null);
  const [image, setImage] = useState();
  console.log(image);
  return (
    <div className="Profile">
      <h3 className="text-xl text-[#000000] font-semibold my-3">Profile</h3>
      <form className="bg-white p-5">
        <input
          type="file"
          ref={click}
          hidden
          onChange={(e) => setImage(e.target.files)}
        />
        <div
          onClick={() => click.current.click()}
          className="w-[8.6rem] h-[8.6rem] rounded-full border border-borderColor flex justify-center items-center cursor-pointer"
        >
          <img
            src={
              image
                ? URL.createObjectURL(image[0])
                : require("../../../images/user.png")
            }
            alt="user"
            loading="lazy"
            width={72}
            height={72}
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="first-name">First name</label>
            <input type="text" name="first" id="first-name" />
          </div>
          <div className="form-control">
            <label htmlFor="last-name">Last name</label>
            <input type="text" name="last" id="last-name" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="user-name">User name</label>
            <input type="text" name="user-name" id="user-name" />
          </div>
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="form-control">
            <label htmlFor="number">Contact number</label>
            <input type="number" name="number" id="number" />
          </div>
        </div>
        <div className="form-control">
          <label htmlFor="Biography">Biography</label>
          <input type="text" name="Biography" id="Biography" />
        </div>
        <button type="submit" className="bg-main text-white text-base  py-3 rounded mt-4 px-16 duration-500 ">Edit</button>
      </form>
    </div>
  );
};

export default Profile;
