import React from "react";

const ShowInstructorsDetails = () => {
  return (
    <div className="w-[268px] bg-white rounded px-4 py-6 mb-8">
      <div className="flex justify-center gap-4 items-center flex-col w-full">
        <img
          src={require("../../../../images/our-team.png")}
          className="w-[119px] h-[119px] rounded-circle"
          alt=""
        />

        <p className="text-base text-[#000000] font-semibold">
          Shari Runolfsson
        </p>
      </div>
      <p className="text-base text-[#000000] font-semibold mt-4">
        Shari_Runolfsson42@yahoo.com
      </p>
      <p className="text-base text-[#000000] font-semibold mt-4">
        Joined at 5,Mar2025 12:00PM
      </p>
      <p className="text-base text-[#000000] font-semibold mt-4">Banned : No</p>
      <p className="text-base text-[#000000] font-semibold mt-4">
        Email verified : None
      </p>
      <button className="hover:bg-white hover:text-[#319F43]   duration-500 border border-[#319F43] text-white mt-6 w-full p-3 bg-[#319F43] text-sm rounded">
        Send verifiy link to mail
      </button>
      <button className="hover:bg-white hover:text-[#0048D3]  duration-500 border border-[#0048D3] text-white mt-3 w-full p-3 bg-[#0048D3] text-sm rounded">
        Send mail to user
      </button>
      <button className="hover:bg-white hover:text-[#F2A124]  duration-500 border border-[#F2A124] text-white mt-3 w-full p-3 bg-[#F2A124] text-sm rounded">
        Bann user
      </button>
      <button className="hover:bg-white hover:text-[#D70000]  duration-500 border border-[#D70000] text-white mt-3 w-full p-3 bg-[#D70000] text-sm rounded">
        Delete account
      </button>
    </div>
  );
};

export default ShowInstructorsDetails;
