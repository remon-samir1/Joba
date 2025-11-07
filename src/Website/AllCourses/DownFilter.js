

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../components/Helpers/Axios";
import SkeletonShow from "../../components/Skeleton/Skeleton";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";

const DownFilter = ({ setSearch, setLevelId, setPriceMode,setCategoryId ,setOpenSide, openSide }) => {
  const [lvls, setLvls] = useState([]);
  const [skeleton, setSkeleton] = useState("");
  const containerRef = useRef();
  const [animateOut, setAnimateOut] = useState(false);
  const [categories, setCategories] = useState([]);
  const { t, i18n } = useTranslation();

  const filterBtnRef = useRef();

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  useEffect(() => {
    setSkeleton(true);
    Axios.get("admin/course-level").then((data) => {
      setLvls(data.data.data.courseLevels.data);
      setSkeleton(false);
    });
    Axios.get('/courses').then(data =>{
      setCategories(data.data.categories)
      setSkeleton(false);
      console.log(data)})
  }, []);

  const handleClose = () => {
    setAnimateOut(true);
    gsap.to(containerRef.current, {
      y: 100,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        setOpenSide(false); 
      },
    });
  };

  const handleFilterClick = () => {


    gsap.fromTo(
      filterBtnRef.current,
      { scale: 1 },
      { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" }
    );
    setOpenSide((prev) => !prev);
  };

  const prices = [
    { name: "Paid", value: "paid" },
    { name: "Free", value: "free" },
  ];

  return (
    <div className="addLesson fixed inset-0 max-h-screen overflow-auto flex items-end justify-center bg-black bg-opacity-30 z-50">
      <div
        ref={containerRef}
        style={{ borderRadius: "25px 25px 0 0" }}
        className="w-[100%] border px-3 py-4 bg-white"
      >
        <div className="flex justify-between items-center gap-10">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none focus:border-b-[#F7CABA] bg-transparent w-[100%] !border-b border-b-[#ddd] p-3 text-text2"
          />
          <button
            ref={filterBtnRef}
            onClick={handleClose}
            className={`text-textColor px-4 rounded items-center flex gap-3 py-2 hover:bg-[#F7CABA] duration-300 bg-white ${
              openSide && "!bg-[#F7CABA]"
            }`}
          >
            <Icon icon="mage:filter-fill" width="24" height="24" className="text-textColor" />
            <span>Filter</span>
          </button>
        </div>

        <Section title="Courses" icon="hugeicons:menu-square" />
        {skeleton
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="min-w-80 max-w-[340px] flex-1 p-3 mt-3 md:p-0">
              <SkeletonShow length="1" width="60%" height="10px" />
            </div>
          ))
        : categories?.map((data) => (
            <CheckItem
              key={data.id}
              name={data.name}
              label={data.name}
              value={data.id}
              onChange={(e) => {
                const id = e.target.value;
                const checked = e.target.checked;
                setCategoryId((prev) =>
                  checked ? [...prev, id] : prev.filter((item) => item !== id)
                );
              }}
            />
          ))}


        <Section title="Levels" icon="ic:round-layers" />
        {skeleton
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="min-w-80 max-w-[340px] mt-3 flex-1 p-3 md:p-0">
                <SkeletonShow length="1" width="60%" height="10px" />
              </div>
            ))
          : lvls?.map((data) => (
              <CheckItem
                key={data.id}
                name={data.name.name}
                label={data.name.name}
                value={data.id}
                onChange={(e) => {
                  const id = e.target.value;
                  const checked = e.target.checked;
                  setLevelId((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)));
                }}
              />
            ))}

        <Section title="Price" icon="ic:outline-price-change" />
        {prices.map((data) => (
          <CheckItem
            key={data.value}
            name={data.name}
            label={data.name}
            value={data.value}
            onChange={(e) => {
              const id = e.target.value;
              const checked = e.target.checked;
              setPriceMode((prev) => (checked ? [...prev, id] : prev.filter((item) => item !== id)));
            }}
          />
        ))}

    
      </div>
    </div>
  );
};

const Section = ({ title, icon }) => (
  <div className="mt-6 flex items-center gap-3">
    <Icon icon={icon} width="26" height="26" className="text-main" />
    <span className="text-textColor text-[1.3rem] font-semibold">{title}</span>
  </div>
);

const CheckItem = ({ name, label, value = "", onChange }) => (
  <div className="flex items-center gap-2 mt-4">
    <input
      className="accent-main w-[18px] h-[18px]"
      type="checkbox"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
    <label htmlFor={name} className="text-textColor font-medium text-[1.2rem]">
      {label}
    </label>
  </div>
);

export default React.memo(DownFilter);
