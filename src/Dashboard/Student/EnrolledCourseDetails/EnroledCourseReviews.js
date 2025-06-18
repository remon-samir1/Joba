import React from "react";
import StarRating from "../../../components/StarRating/StarRating";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { useState } from "react";

const EnroledCourseReviews = ({id}) => {
  const [form , setForm] = useState({
    rating:'',
    review:'',
    course_id:id

  })
  console.log(form);
  useEffect(()=>{
    Axios.get(`/student/fetch-reviews/${id}`).then(data=>console.log(data))
  },[])
  //  handle add Review
  const handleAddReview = (e)=>{
e.preventDefault();
try{
Axios.get('/student/add-review')
}
catch(err){
  console.log(err);
}
  }
  return (
    <div className="pt-4 px-4 bg-white">
      <div className="flex items-center gap-5 py-8 rounded-lg px-4  border border-[#dddd]">
        <div className="w-[6rem] h-[6rem] rounded-full overflow-hidden shrink-0">
          <img
            src={require("../../../images/course-details.png")}
            alt="instructor"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-textColor text-[1.1rem] font-semibold">
              Brenda howa
            </h3>
            <StarRating rating="5" />
          </div>
          <p className="text-[0.9rem] text-textColor max-w-[80%]">
            Lorem ipsum dolor sit amet consectetur. Convallis vitae malesuada
            gravida posuere. Faucibus vel nec felis pellentesque nisi nibh. Nam
            enim sed id facilisis nullam.
          </p>
        </div>
      </div>

      <form className="mt-6" onSubmit={handleAddReview}>
        <h4 className="text-[0.9rem] text-textColor">Write a reviews</h4>
        <div className="mt-8">
          <label className="text-[0.9rem] text-textColor" htmlFor="rating">Rating</label>
          <input onChange={(e)=> setForm({...form , rating :e.target.value})} id="rating" type="text" className="w-full p-3 mt-4  border border-[#dddd] rounded-lg appearance-none focus:border-main outline-none " />
        </div>
        <div className="mt-8">
          <label className="text-[0.9rem] text-textColor" htmlFor="review">Reveiw</label>
          <textarea onChange={(e)=> setForm({...form , review: e.target.value})} id="review" type="text" className="w-full p-3 mt-4  border border-[#dddd] rounded-lg appearance-none focus:border-main outline-none " />
        </div>
        <button type="submit" className="text-white bg-main text-base px-5 py-2 rounded-lg mt-4 main-shadow duration-500">Submit</button>
      </form>
    </div>
  );
};

export default EnroledCourseReviews;
