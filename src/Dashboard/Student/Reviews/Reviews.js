import React from "react";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import StarRating from "../../../components/StarRating/StarRating";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import { useState } from "react";
import SkeletonShow from "../../../components/Skeleton/Skeleton";

const Reviews = () => {
  const [reviews , setReviews] = useState([])
  const [skeleton , setSkeleton] = useState(false)
  useEffect(()=>{
    setSkeleton(true)
    Axios.get('/student/reviews').then(data=>{
      setReviews(data.data.reviews.data)
      setSkeleton(false)
      console.log(data.data.reviews.data)})
  },[])
  // handleDelete
  const handleDelete = (id)=>{
    try{
Axios.delete(`/student/reviews/${id}`).then(data =>{
  console.log(data);
  // setReviews(reviews.filter(rev => rev.id !== id))
})
    }catch(err){

    }
  }
  return (
    <div className="py-4">
      <div className="flex justify-between items-center ">
        <h3 className="text-base text-textColor">My reviews ( {reviews.length} )</h3>
        <Breadcrumbs />
      </div>
      {/* Review Card */}
    {    skeleton ? 
        <SkeletonShow
         height='150px' classes='mt-4' width='100%' length='3'/>

        :
      
      
    reviews.map((data,index)=>(
        <div key={index} className="px-4 py-3 mt-4 bg-white border border-[#dddd] rounded">
        <div className="flex justify-between items-center">
          <StarRating rating={3} />
          <div className="flex items-center gap-2">
            <p className={`text-base px-6 py-2 rounded-full ${data.status === 0 ? 'text-white bg-red-600 ': 'bg-[#4BBC9A] bg-opacity-30 text-[#0E8A29]'}`}>
            { data.status === 0 ? 'Disapproved' :'Approved'}
            </p>
            <Link to={`/student/reviews/details/${data.id}`} className="bg-main w-[40px] h-[40px] rounded-full flex justify-center items-center ">
              <Icon
                icon="carbon:view"
                width="18"
                height="18"
                className="text-white"
              />
            </Link>
            <button className="bg-main w-[40px] h-[40px] rounded-full flex justify-center items-center ">
              <Icon
                icon="iconamoon:trash"
                onClick={()=>handleDelete(data.id)}
                width="18"
                height="18"
                className="text-white"
              />
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-base font-semibold text-textColor">
          {data.user.name}
          </h3>
          <p className="mt-2 w-[90%] text-textColor text-[0.9rem]">
          {data.review}
          </p>
        </div>
      </div>
    ))}
    </div>
  );
};

export default Reviews;
