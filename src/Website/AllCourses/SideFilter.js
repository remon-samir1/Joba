import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify-icon/react";
import { Axios } from "../../components/Helpers/Axios";
import SkeletonShow from "../../components/Skeleton/Skeleton";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const SideFilter = ({ setSearch, setLevelId, setPriceMode }) => {
  const [lvls, setLvls] = useState([]);
  const [skeleton, setSkeleton] = useState("");
  const containerRef = useRef();

  useGSAP(() => {
    gsap.from(containerRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    setSkeleton(true);
    Axios.get("admin/course-level").then((data) => {
      setLvls(data.data.data.courseLevels.data);
      setSkeleton(false);
    });
  }, []);

  const prices = [
    { name: "Paid", value: "paid" },
    { name: "Free", value: "free" },
  ];

  return (
    <div
      ref={containerRef}
      className="w-[360px] border rounded px-3 py-4 bg-white "
    >
      <input
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="outline-none focus:border-b-main bg-transparent w-full !border-b border-b-[#ddd] p-3 text-text2"
      />

      <Section title="Courses" icon="hugeicons:menu-square" />
      {Array.from({ length: 4 }).map((_, index) => (
        <CheckItem key={index} name="bussines" label="bussines" />
      ))}

      <Section title="Levels" icon="ic:round-layers" />
      {skeleton
        ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="min-w-80 max-w-[340px] flex-1 p-3 md:p-0">
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
                setLevelId((prev) =>
                  checked ? [...prev, id] : prev.filter((item) => item !== id)
                );
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
            setPriceMode((prev) =>
              checked ? [...prev, id] : prev.filter((item) => item !== id)
            );
          }}
        />
      ))}
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

export default React.memo(SideFilter);
