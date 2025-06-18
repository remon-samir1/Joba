// import { Icon } from "@iconify-icon/react";
// import React from "react";
// import { useRef } from "react";

// const QA = () => {
//   const clickRef = useRef()
//   return (
//     <div className="py-3 px-4 bg-white">
//       <div className="flex items-center justify-between flex-wrap">
//         <div className="w-[290px]  h-[40px] border border-[#dddd] rounded-full flex items-center justify-between pl-3 pr-1">
//           <input
//             type="text"
//             placeholder="search"
//             className="appearance-none flex-1 border-none outline-none text-[0.9rem] text-textColor"
//           />
//           <div className="w-[32px] h-[32px] rounded-full bg-main flex justify-center items-center">
//             <Icon
//               icon="material-symbols-light:search-rounded"
//               width="20"
//               height="20"
//               style={{ color: "#fff" }}
//             />
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <span className="text-[0.9rem] text-textColor hidden md:flex">Filters :</span>
//           <Icon onClick={()=>clickRef.current.click()} className="md:hidden" icon="mage:filter" width="30" height="30" />
//           <select 
//           ref={clickRef}
//             id="filter"
//             className="w-[125px] h-[35px] px-3   bg-white text-[0.9rem] text-text2 border border-[#dddd] rounded-full"
//           >
//             <option value="option" selected aria-disabled>
//               option
//             </option>
//             <option value="option">option</option>
//             <option value="option">option</option>
//           </select>
//         </div>
//       </div>
//       <div className="flex items-center justify-between mt-8">
//         <p className="text-textColor text-[0.95rem] font-semibold">All question</p>
//         <button className="text-[0.85rem] bg-main text-white px-9 py-3 rounded-3xl main-shadow duration-500">Ask a question</button>
//       </div>
//     </div>
//   );
// };

// export default QA;
import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";

const QA = () => {
  const [selectedOption, setSelectedOption] = useState("Select");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const options = ["Latest", "Popular", "Unanswered"];

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="py-3 px-4 bg-white">
      <div className="flex items-center justify-between gap-6 flex-wrap">
        {/* Search Box */}
        <div className="md:w-[320px] md:flex-grow-0 flex-1 h-[40px] border border-[#dddd] rounded-full flex items-center justify-between pl-3 pr-1">
          <input
            type="text"
            placeholder="search"
            className="appearance-none flex-1 border-none outline-none text-[0.9rem] text-textColor"
          />
          <div className="w-[32px] h-[32px] rounded-full bg-main flex justify-center items-center">
            <Icon
              icon="material-symbols-light:search-rounded"
              width="20"
              height="20"
              style={{ color: "#fff" }}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 relative mt-3 md:mt-0">
          <span className="text-[0.9rem] text-textColor hidden md:flex">Filters :</span>

          {/* Desktop Select */}
          <select className="hidden md:block w-[150px] h-[35px] px-3 bg-white text-[0.9rem] text-text2 border border-[#dddd] rounded-full">
            <option disabled selected>
              Select
            </option>
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>

          {/* Mobile Icon + Dropdown */}
          <div className="relative md:hidden" ref={dropdownRef}>
            <Icon
              onClick={() => setShowDropdown(!showDropdown)}
              className="cursor-pointer"
              icon="mage:filter"
              width="30"
              height="30"
            />

            {showDropdown && (
              <ul className="absolute mt-2 right-0 w-[140px] bg-white border border-gray-300 rounded-xl shadow-md z-50 overflow-hidden">
                {options.map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      setSelectedOption(opt);
                      setShowDropdown(false);
                    }}
                    className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-textColor text-[0.95rem] font-semibold">All questions</p>
        <button className="text-[0.85rem] bg-main text-white px-9 py-3 rounded-3xl main-shadow duration-500">
          Ask a question
        </button>
      </div>
    </div>
  );
};

export default QA;

