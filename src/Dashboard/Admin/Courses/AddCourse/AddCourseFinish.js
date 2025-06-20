import React from "react";

const AddCourseFinish = () => {
  return (
    <div className="bg-white p-3">
      <form>
        <div className="form-control ">
          <label htmlFor="duration" className="text-base font-semibold">
            Duration <span className="text-red-500 my-3 inline-block">*</span>
          </label>
          <textarea
            id="description"
            required
            className="w-full border rounded px-3 py-2 mb-4 outline-none focus:border-main"
          />
        </div>
      </form>
    </div>
  );
};

export default AddCourseFinish;
