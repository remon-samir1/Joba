import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "@iconify-icon/react";
import { formatDuration } from "../../../components/FormatDuration/FormatDuration";

const Curriculum = (props) => {
  const [openUnit, setOpenUnit] = useState(null);
  const contentRefs = useRef([]);

  const toggleUnit = (index) => {
    if (openUnit === index) {
      // Close animation
      gsap.to(contentRefs.current[index], {
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => setOpenUnit(null),
      });
    } else {
      // Close currently open one
      if (openUnit !== null && contentRefs.current[openUnit]) {
        gsap.to(contentRefs.current[openUnit], {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }

      // Open new one
      setOpenUnit(index);
      gsap.set(contentRefs.current[index], { height: "auto" });
      const fullHeight = contentRefs.current[index].scrollHeight;

      gsap.fromTo(
        contentRefs.current[index],
        { height: 0 },
        { height: fullHeight, duration: 0.4, ease: "power2.out" }
      );
    }
  };

  return (
    <div className="bg-white py-3 px-5 ">
      {props.data.map((data, index) => (
        <div
          key={index}
          className="py-4 border-b border-[#ddddd] cursor-pointer"
        >
          <div
            onClick={() => toggleUnit(index)}
            className="flex justify-between items-center"
          >
            <span className="text-[1rem] text-textColor font-semibold">
              {data.title}
            </span>
            <Icon
              icon="dashicons:arrow-down"
              width="20"
              height="20"
              className={`transform transition duration-300 ${
                openUnit === index ? "-rotate-[180deg] text-main" : "rotate-0"
              }`}
            />
          </div>

          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className="overflow-hidden h-0 mt-1 rounded "
          >
            {data.chapter_items.length > 0 ? (
              data.chapter_items.map((course, cIndex) => (
                <div
                  key={cIndex}
                  className="flex justify-between p-3 my-1 bg-[#EEEEEE]"
                >
                  <div className="flex items-center gap-1">
                    <Icon
                      className="text-main"
                      icon="icon-park-solid:play"
                      width="18"
                      height="18"
                    />
                    <span className="text-textColor text-[0.9rem] font-semibold">
                      {" "}
                      {course.lesson?.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-textColor text-[0.9rem] font-semibold">
                      {formatDuration(course.lesson?.duration)}
                    </span>
                    <Icon
                      className="text-main"
                      icon="si:lock-line"
                      width="18"
                      height="18"
                    />
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "10px", color: "#888" }}>
                No courses yet
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Curriculum;
