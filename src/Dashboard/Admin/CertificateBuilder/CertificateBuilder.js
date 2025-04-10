import React, { useRef, useState } from "react";
import "./CertificateBuilder.css";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { SelectBox } from "../../../components/DropDown/SelectBox";
import { LuSave } from "react-icons/lu";
const CertificateBuilder = () => {
  const clickBg = useRef(null);
  const clickSignature = useRef(null);

  const [bg, setBg] = useState();
  const [signature, setSignature] = useState();

  return (
    <div className="CertificateBuilder">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"> Category Update</h3>
        <Breadcrumbs />
      </div>
      <div className="container mt-4 w-full flex justify-center items-start gap-4">
        <div className="details">
          <div className="text-center">
            <h3 className="text-main py-4 border-b font-semibold text-xl border-b-borderColor">
              Certificate details
            </h3>
          </div>
          <form className="inputs py-3 px-5">
            <div className="mb-4">
              <h3 className="py-4 font-semibold text-[#000000] text-[1.1rem]">
                Background image{" "}
                <span className="text-red-600">(930px*600px)*</span>
              </h3>
              <input
                type="file"
                hidden
                ref={clickBg}
                onChange={(e) => setBg(e.target.files)}
              />
              <div
                onClick={() => clickBg.current.click()}
                className="overflow-hidden cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-full h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
              >
                {bg && (
                  <img
                    src={URL.createObjectURL(bg[0])}
                    width={120}
                    height={120}
                    alt=""
                  />
                )}
                <button
                  type="button"
                  className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end"
                >
                  Icon
                </button>
              </div>
            </div>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" placeholder="[student-name]" />
            </div>

            <div className="form-control">
              <label htmlFor="sub-title">Sub title</label>
              <input
                type="text"
                id="sub-title"
                placeholder="for completing[course]"
              />
            </div>
            <div className="form-control">
              <label htmlFor="Description">Description</label>
              <textarea
                id="Description"
                placeholder="Description"
                className="h-[200px]"
              />
            </div>

            <div className="mb-4">
              <h3 className="py-4 font-semibold text-[#000000] text-[1.1rem]">
                Signature image{" "}
                <span className="text-red-600">(120px*40px)*</span>
              </h3>
              <input
                type="file"
                hidden
                ref={clickSignature}
                onChange={(e) => setSignature(e.target.files)}
              />
              <div
                onClick={() => clickSignature.current.click()}
                className="overflow-hidden cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-full h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
              >
                {signature && (
                  <img
                    src={URL.createObjectURL(signature[0])}
                    width={120}
                    height={120}
                    alt=""
                  />
                )}
                <button
                  type="button"
                  className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end"
                >
                  Icon
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="hover:opacity-80 duration-500 w-full rounded text-white p-4 bg-[#0048D3] mt-4"
            >
              Update
            </button>
          </form>
        </div>

        <div className="flex-1 bg-white text-center px-5 py-8">

          <h2 className="text-xl text-main font-semibold">Certificate Competition</h2>
          <h3 className="text-xl text-[#000000] mt-4 font-semibold">[student name]</h3>
          <h3 className="text-xl text-textColor mt-4 font-semibold">For completing [course]</h3>
          <p className="text-base text-textColor mt-4 font-semibold">
            
            This certificate is awarded to recognize the successful completion
            of the course [course] offered on the platform [platform_name] by
            [instructor_name]. The recipient,[student_name], has demonstrated
            commendable dedication and proficiency and has successfully
            completed the course on [date].
          </p>
          <p className="text-end text-gray-500 text-xl font-semibold mt-5">signaure</p>
        </div>
      </div>
    </div>
  );
};

export default CertificateBuilder;
