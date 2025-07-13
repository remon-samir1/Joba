import React from "react";
import { useState } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";

const PasswordStudentSettings = ({setLoading}) => {
  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
    _method:'PUT',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.put("/student/setting/password", form).then(
        (data) => {
          console.log(data);
          toast.success("Updated Successfly");
          setLoading(false);
        }
      );
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(err.response.data.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white mt-6 p-4">
      <h4 className="text-base text-main py-4">Change password</h4>
      <div className="flex flex-col gap-2 mt-4  ">
        <label
          htmlFor="currnet"
          className="text-[0.9rem] text-textColor font-medium"
        >
          Current password
        </label>
        <input
      required
      onChange={(e)=>setForm({...form , current_password : e.target.value})}
          type="password"
          placeholder="Current password"
          id="currnet"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4  ">
        <label
          htmlFor="new"
          className="text-[0.9rem] text-textColor font-medium"
        >
          New password
        </label>
        <input
        required

        onChange={(e)=>setForm({...form , password : e.target.value})}

          type="password"
          placeholder="New password"
          id="new"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4  ">
        <label
          htmlFor="confirm"
          className="text-[0.9rem] text-textColor font-medium"
        >
          Confirm new password
        </label>
        <input
        required
          type="password"
        onChange={(e)=>setForm({...form , password_confirmation : e.target.value})}

          placeholder="Confirm new password"
          id="confirm"
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

export default PasswordStudentSettings;
