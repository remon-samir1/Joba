import React from "react";
import user from "../../../images/user.svg";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Axios, baseUrl } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
const StudentProfilePart = ({ form, setForm, setLoading }) => {
  const imgRef = useRef(null);
  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("avatar", form.image);
    formData.append("email", form.email);
    formData.append("age", form.age);
    formData.append("phone", form.phone);
    formData.append("gender", form.gender);
    formData.append("_method", "PUT");
    try {
      await Axios.post("/student/setting/profile", formData).then((data) => {
        toast.success("Updated Successfly");
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("something was wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 bg-white rounded relative p-4 "
    >
      <div className="absolute top-[-2.9rem] left-4">
        <input
          type="file"
          hidden
          ref={imgRef}
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <div
          onClick={() => imgRef.current.click()}
          className="cursor-pointer w-[5.8rem] h-[5.8rem] rounded-full border bg-white border-[#dddd]  flex justify-center items-center"
        >
          <img
            src={
              form.image
                ? typeof form.image === "string"
                  ? `${baseUrl}/${form.image}`
                  : URL.createObjectURL(form.image)
                : user
            }
            alt="user"
            loading="lazy"
            className="w-[2.5rem] h-[2.5rem] "
          />
        </div>
        <h4
          onClick={() => imgRef.current.click()}
          className="cursor-pointer text-base text-main border-b border-main mt-2"
        >
          Change photo
        </h4>
      </div>
      <div className="flex flex-col gap-2 mt-24">
        <label
          htmlFor="name"
          className="text-[0.9rem] text-textColor font-medium"
        >
          Full name
        </label>
        <input
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          value={form?.name}
          type="text"
          placeholder="Name"
          id="name"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="email"
          className="text-[0.9rem] text-textColor font-medium"
        >
          Email
        </label>
        <input
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          value={form.email}
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="phone"
          className="text-[0.9rem] text-textColor font-medium"
        >
          Phone number
        </label>
        <input
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          value={form.phone}
          type="number"
          placeholder="phone"
          id="Phone number"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="phone"
          className="text-[0.9rem] text-textColor font-medium"
        >
          Gender
        </label>
        <select
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          value={form.gender}
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2 bg-transparent "
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="age"
          className="text-[0.9rem] text-textColor font-medium"
        >
          Age
        </label>
        <input
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          value={form.age}
          type="number"
          placeholder="age"
          id="Age"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>

      <button
        type="submit"
        className="text-white bg-main py-2 px-8 rounded mt-6 main-shadow duration-500"
      >
        Update
      </button>
    </form>
  );
};

export default StudentProfilePart;
