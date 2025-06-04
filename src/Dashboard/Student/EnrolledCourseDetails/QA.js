import { Icon } from "@iconify-icon/react";
import React from "react";

const QA = () => {
  return (
    <div className="py-3 px-4 bg-white">
      <div className="flex items-center justify-between">
        <div className="w-[290px]  h-[40px] border border-[#dddd] rounded-full flex items-center justify-between pl-3 pr-1">
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
        <div className="flex items-center gap-2">
          <span className="text-[0.9rem] text-textColor">Filters :</span>
          <select
            id="filter"
            className="w-[125px] h-[35px] px-3  bg-white text-[0.9rem] text-text2 border border-[#dddd] rounded-full"
          >
            <option value="option" selected aria-disabled>
              option
            </option>
            <option value="option">option</option>
            <option value="option">option</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between mt-8">
        <p className="text-textColor text-[0.95rem] font-semibold">All question</p>
        <button className="text-[0.85rem] bg-main text-white px-9 py-3 rounded-3xl main-shadow duration-500">Ask a question</button>
      </div>
    </div>
  );
};

export default QA;
