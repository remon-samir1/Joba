import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "@iconify-icon/react";

const CourseContactDetails = () => {
  const [units, setUnits] = useState([]);
  const [openUnit, setOpenUnit] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    setUnits([
      {
        unitTitle: "Module 1",
        courses: [
          { title: "Start course", duration: "0H 20M", locked: true },
          { title: "Start course", duration: "0H 20M", locked: true },
          { title: "Start course", duration: "0H 20M", locked: true },
          { title: "Start course", duration: "0H 20M", locked: true },
        ],
      },
      {
        unitTitle: "Module 2",
        courses: [],
      },
      {
        unitTitle: "Module 3",
        courses: [{ title: "Start course", duration: "0H 20M", locked: false }],
      },
    ]);
  }, []);

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
    <div className="bg-white py-3  w-[340px]">
      <h3 className="text-textColor text-[1.1rem] font-semibold p-4">
        Course Contact
      </h3>
      {units.map((unit, index) => (
        <div
          key={index}
          className="cursor-pointer"
        >
          <div
            onClick={() => toggleUnit(index)}
            className="flex justify-between items-center  p-4 bg-[#F15A24] bg-opacity-20" 
          >
            <span className="text-[1rem] text-textColor font-semibold ">
              {unit.unitTitle}
            </span>
            <div className="flex items-center gap-1">
<span className="text-[1rem] text-textColor ">0/30 Done</span>
            <Icon
              icon="fe:arrow-down"
              width="18"
              height="18"
              className={`transform transition duration-300 ${
                openUnit === index ? "-rotate-[180deg] text-textColor" : "rotate-0 text-textColor"
              }`}
              />
              </div>
          </div>

          <div
            ref={(el) => (contentRefs.current[index] = el)}
            className="overflow-hidden h-0 mt-2 rounded "
          >
            {unit.courses.length > 0 ? (
              unit.courses.map((course, cIndex) => (
                <div
                  key={cIndex}
                  className="flex justify-between p-3 my-1 "
                >
                  <div className="flex items-center gap-2">
                    <div className="flex rounded items-center justify-center w-[35px] h-[35px] bg-[#F1F1F1]">
                      1
                    </div>
                  
                    <span className="text-textColor text-[0.9rem] font-semibold">
                      {" "}
                      Start Course
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-textColor text-[0.9rem] font-semibold">
                      {course.duration}
                    </span>
                
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

export default CourseContactDetails;
