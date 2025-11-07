import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Icon } from "@iconify-icon/react";
import SideFilter from "./SideFilter";
import { useState } from "react";
import AllCoursesCard from "./AllCoursesCard";
import { useEffect } from "react";
import { Axios } from "../../components/Helpers/Axios";
import SkeletonShow from "../../components/Skeleton/Skeleton";
import DownFilter from "./DownFilter";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { Category } from "../../Context/CategoryIdContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../../components/Footer/Footer";

const AllCourses = () => {
  const { t, i18n } = useTranslation();

  const heroTitle = useRef();
  const heroImage = useRef();

  useGSAP(() => {
    gsap.from(heroTitle.current, {
      x: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    });
    gsap.from(heroImage.current, {
      x: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.3,
    });
  });

  const [openSide, setOpenSide] = useState(false);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [skeleton, setSkeleton] = useState("");
  const [levelId, setLevelId] = useState([]);
  // const [categoryId, setCategoryId] = useState([]);
  const [priceMode, setPriceMode] = useState("");
  const CategoryContext = useContext(Category);
  const setCategoryId = CategoryContext.setcategoryId;
  const categoryId = CategoryContext.categoryId;
  const [resize, setResize] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => setResize(window.innerWidth));
    return () =>
      window.removeEventListener("resize", () => setResize(window.innerWidth));
  }, [window.innerWidth]);

  useEffect(() => {
    setSkeleton(true);

    Axios.get(
      `/fetch-courses?search=${search}&level=${levelId}&price=${priceMode}&category=${categoryId}`
    ).then((data) => {
      setSkeleton(false);
      setCourses(data.data.items.courses.data);
      console.log(data);
    });
  }, [search, levelId, priceMode, categoryId]);
  return (
    <>
    <div>
      <NavBar />

      <div className="About bg-main bg-opacity-25 h-[280px] px-[5vh] md:px-[10vh] flex items-center justify-between">
        <h3 ref={heroTitle} className="text-[3.3rem] text-textColor font-bold">
          {t("All Courses")}
        </h3>
        <img
          ref={heroImage}
          src={require("../../images/fly.png")}
          loading="lazy"
          className="fly"
        />
      </div>

      <div className="flex items-start gap-4 px-[5vh] md:px-[10vh] py-8">
        {openSide ? (
          resize < 768 ? (
            <DownFilter
            setCategoryId={setCategoryId}
              setOpenSide={setOpenSide}
              openSide={openSide}
              setSearch={setSearch}
              setPriceMode={setPriceMode}
              setLevelId={setLevelId}
              />
          ) : (
            <SideFilter
            setCategoryId={setCategoryId}
              categoryId={categoryId}
              setSearch={setSearch}
              setPriceMode={setPriceMode}
              setLevelId={setLevelId}
            />
          )
          ) : (
            ""
            )}
        <div className="w-full md:flex-1">
          <div className="flex justify-between items-center gap-10">
            <input
              type="text"
              placeholder={t("Search")}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none focus:border-b-[#F7CABA]  bg-transparent w-[100%] !border-b border-b-[#ddd] p-3 text-text2  "
              />
            <button
              onClick={() => setOpenSide((prev) => !prev)}
              className={`text-textColor px-4 rounded items-center flex gap-3 py-2 hover:bg-[#F7CABA] duration-300 bg-white ${
                openSide && "!bg-[#F7CABA]"
              }`}
              >
              <Icon
                icon="mage:filter-fill"
                width="24"
                height="24"
                className="text-textColor"
                />
              <span>Filter</span>
            </button>
          </div>
          <div className="flex items-center justify-center md:justify-start mt-6 gap-8 flex-wrap">
            {skeleton
              ? Array.from({ length: 6 }).map((_, index) => (
                <div
                key={index}
                className="min-w-80 max-w-[340px] flex-1 p-3 md:p-0"
                >
                    <SkeletonShow length="1" width="100%" height="300px" />
                  </div>
                ))
                : courses?.map((data, index) => (
                  <AllCoursesCard
                  key={index}
                  slug={data.slug}
                  description={data.description}
                    instructor_image={data.instructor?.image}
                    instructor_name={data.instructor?.user_name}
                    image={data.thumbnail}
                    price={data.price}
                    title={data.title}
                  />
                  ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
                  </>
  );
};

export default AllCourses;
