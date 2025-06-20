import React from "react";
import { useState } from "react";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";
import { SelectBox } from "../../../../components/DropDown/SelectBox";
import { useEffect } from "react";
import { Axios } from "../../../../components/Helpers/Axios";

const AddCourseMoreInfo = () => {
  const [form, setForm] = useState({
    capacity: "",
    duration: "",
    path: "",
    demo: "youtube",
    price: "",
    discount: "",
    description: "",
  });
  const [category, setCategory] = useState();
  const [categoryId, setCategoryId] = useState();
  useEffect(() => {
    Axios.get(`/admin/course-category`).then((data) => {
      setCategory(data.data.data.categories.data);
    });
  }, []);
  console.log(category);
  const categoryData = category?.map((data, index) => (
    <option value={data.id}>{data.name}</option>
  ));
  return (
    <div className="AddCoourse">
      <form className="bg-white p-5">
        <div className="flex items-center gap-6">
          <div className="form-control">
            <label htmlFor="Capacity ">Capacity </label>
            <input
              type="text"
              id="Capacity "
              required
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label htmlFor="duration">Course Duration (Minutes) </label>
            <input
              type="text"
              id="duration"
              required
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
            />
          </div>
        </div>
        <div className="flex mt-5">
          <div className="flex-1 flex flex-col items-start gap-5">
            <label>Q&A</label>
            <label>Completion Certificate</label>
            <label>Patner instructor</label>
          </div>
          <div className="flex-1 flex flex-col items-start gap-5">
            <ToggleButton />
            <ToggleButton />
            <ToggleButton />
          </div>
        </div>
        <div className="form-control">
          <label>Category</label>
          <select
            className="w-full bg-white border border-[#ddd] rounded   p-4"
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="" selected>
              Category
            </option>
            {categoryData}
          </select>
        </div>
        <div className="flex mt-4 items-start gap-5 justify-center">
          <div className="flex-1 bg-white p-5 flex border border-[#ddd] flex-col justify-start items-start gap-4">
          <label>Level</label>
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                name="check1"
                id="check1"
                className="accent-main w-[18px] h-[18px]"
              />
              <label htmlFor="check1" className="text-base text-[#000000]">
              Beginner 
              </label>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                name="check2"
                id="check2"
                className="accent-main w-[18px] h-[18px]"
              />
              <label htmlFor="check2" className="text-base text-[#000000]">
              Intermediate 
              </label>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                name="check3"
                id="check3"
                className="accent-main w-[18px] h-[18px]"
              />
              <label htmlFor="check3" className="text-base text-[#000000]">
              
Expert

              </label>
            </div>
          </div>
          <div className="flex-1 bg-white p-5 flex border border-[#ddd] flex-col justify-start items-start gap-4">
          <label>Language</label>
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                name="check1"
                id="check1"
                className="accent-main w-[18px] h-[18px]"
              />
              <label htmlFor="check1" className="text-base text-[#000000]">
              English
              </label>
            </div>
            <div className="flex justify-start items-center gap-2">
              <input
                type="checkbox"
                name="check2"
                id="check2"
                className="accent-main w-[18px] h-[18px]"
              />
              <label htmlFor="check2" className="text-base text-[#000000]">
              Arabic
              </label>
            </div>
        
          </div>
        </div>
        <button type="submit">Save</button>

      </form>
    </div>
  );
};

export default AddCourseMoreInfo;
