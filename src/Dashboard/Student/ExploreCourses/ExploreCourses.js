import { Icon } from "@iconify-icon/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Axios } from "../../../components/Helpers/Axios";
import SkeletonShow from "../../../components/Skeleton/Skeleton";
import CustomSelect from "../../../components/CustomSelect/CustomSelect";
import { useContext } from "react";
import { StudentSearch } from "../../../Context/StudentSearchContext";

const ExploreCourses = () => {
  const [fav, setFav] = useState(false);
  const [courses, setCourses] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  const [wait , setWait] = useState(false)
  const [lvls , setLvls] = useState([])
  const [sort , setSort] = useState('')
  const [level , setLevel] = useState('')
console.log(sort);
  const StudentSearchContext = useContext(StudentSearch);
  const studentSearchState = StudentSearchContext.studentSearch;
  // get data
  useEffect(() => {
    setSkeleton(true);
    
    Axios.get(`/fetch-courses?search=${studentSearchState}&level=${level}&htl_or_lth_price=${sort}`).then((data) => {
      setSkeleton(false);
      setCourses(data.data.items.courses.data);
      console.log(data);
    });
    Axios.get("admin/course-level").then((data) => {
      setLvls(data.data.data.courseLevels.data);
      setSkeleton(false);
    });
  }, [studentSearchState , sort , level]);

  const toggleFav = async (slug) => {
    try{
      setWait(true)

    await Axios.get(`/wishlist/${slug}`).then(()=>{ 
      setWait(false)
      // console.log(data);
      setCourses((prevCourses) =>
    prevCourses.map((course) =>
      course.slug === slug
        ? { ...course, is_favorite: !course.is_favorite }
        : course
    ))}
  
    )
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center gap-4 pr-3">
        <CustomSelect
          label="Level"
          iconName="solar:chart-bold"
          options={lvls?.map((data, index) => ({
            label: data.name.name,
            value: data.id
          }))
          
    
          }
          setSort={setLevel}

        />

        <CustomSelect
          label="Filter"
          iconName="mage:filter-fill"
          options={[
      
            { label: "High to low price", value: "asc" },
            { label: "Low to high price", value: "desc" },
          ]}
          setSort={setSort}
        />
      </div>

      <div className="flex items-center justify-center md:justify-start mt-4 gap-4 flex-wrap">
        {skeleton
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="min-w-80 max-w-[340px] flex-1 p-3 md:p-0"
              >
                <SkeletonShow length="1" width="100%" height="200px" />
              </div>
            ))
          : courses.map((course, index) => (
              <div
                key={index}
                className="p-3 min-w-80 max-w-[340px] flex-1 bg-white rounded-xl mt-3 group transition-transform duration-500"
              >
                <div className="img h-[165px] w-full relative rounded overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={`https://goba.sunmedagency.com/${course?.thumbnail}`}
                    alt="course"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      to={`/student/course-details/${course.slug}`}
                      className="bg-main text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm font-semibold shadow-md"
                    >
                  View Details
                    </Link>
                  </div>

                  <div
                    onClick={()=>toggleFav(course?.slug)}
                    className="cursor-pointer w-[35px] h-[35px] flex justify-center items-center rounded-full backdrop-brightness-90 backdrop-blur-0 absolute top-2 right-2 bg-[rgba(255,255,255,0.6)]"
                  >
                    <Icon
                      className="text-white"
                      icon={
                        wait?
                        'line-md:loading-loop'
                        :
                        course.is_favorite
                          ? "material-symbols-light:favorite"
                          : "material-symbols-light:favorite-outline"
                      }
                      width="24"
                      height="24"
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-[1.1rem] text-textColor transition-all duration-300">
                    {course?.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-[2.2rem] h-[2.2rem] rounded-full"
                        src={`https://goba.sunmedagency.com/${course?.instructor.image}`}
                        alt="student"
                      />
                      <span className="text-textColor text-base">
                        {course?.instructor.user_name}
                      </span>
                    </div>
                    <p className="text-main text-base">{course?.price} </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ExploreCourses;
