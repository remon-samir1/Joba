// import React, { useRef, useState } from "react";
// import "./CertificateBuilder.css";
// import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
// import { SelectBox } from "../../../components/DropDown/SelectBox";
// import { LuSave } from "react-icons/lu";
// import { useEffect } from "react";
// import { Axios } from "../../../components/Helpers/Axios";
// const CertificateBuilder = () => {
//   const [certificate, setCertificate] = useState([]);
//   const [laoding, setLaoding] = useState(false);
//   const [change, setChange] = useState(false);

//   useEffect(() => {
//     setLaoding(true);
//     Axios.get("/admin/certificate-builder").then((data) => {
//       setLaoding(false);

//       setCertificate(data.data.data.certificate);
//       console.log(data);
//     });
//   }, [change]);

//   console.log(certificate);
//   const [form, setForm] = useState({
//     title: "",
//     sub_title: "",
//     description: "",
//   });
//   console.log(form);
//   const hanleSubmit = async (e) => {
//     e.preventDefault();
//     setLaoding(true);
//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("sub_title", form.sub_title);
//     formData.append("description", form.description);
//     formData.append("background", bg);
//     formData.append("signature", signature);
//     formData.append("_method", "PUT");
//     console.log(formData);
//     try {
//       await Axios.post("/admin/certificate-builder/1", formData).then(
//         (data) => {
//           console.log(data);
//           setLaoding(false);
//         }
//       );
//     } catch (err) {
//       console.log(err);
//       setChange((prev) => !prev);
//       setLaoding(false);
//     }
//   };

//   const clickBg = useRef(null);
//   const clickSignature = useRef(null);

//   const [bg, setBg] = useState();
//   const [signature, setSignature] = useState();

//   return (
//     <div className="CertificateBuilder">
//       {laoding && (
//         <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
//           <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
//         </div>
//       )}
//       <div className="flex justify-between items-center">
//         <h3 className="font-bold text-textColor text-xl"> </h3>
//         <Breadcrumbs />
//       </div>
//       <div className="container mt-4 w-full flex flex-col md:flex-row justify-center items-start gap-4">
//         <div className="details w-full md:w-[22vw]  min-w-64">
//           <div className="text-center">
//             <h3 className="text-main py-4 border-b font-semibold text-xl border-b-borderColor">
//               Certificate details
//             </h3>
//           </div>
//           <form className="inputs py-3 px-5" onSubmit={hanleSubmit}>
//             <div className="mb-4">
//               <h3 className="py-4 font-semibold text-[#000000] text-[1.1rem]">
//                 Background image{" "}
//                 <span className="text-red-600">(930px*600px)*</span>
//               </h3>
//               <input
//                 type="file"
//                 hidden
//                 ref={clickBg}
//                 onChange={(e) => setBg(e.target.files[0])}
//               />
//               <div
//                 onClick={() => clickBg.current.click()}
//                 className="overflow-hidden cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-full h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
//               >
//                 {bg && (
//                   <img
//                     src={URL.createObjectURL(bg)}
//                     width={120}
//                     height={120}
//                     alt=""
//                   />
//                 )}
//                 <button
//                   type="button"
//                   className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end"
//                 >
//                   Icon
//                 </button>
//               </div>
//             </div>
//             <div className="form-control">
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 id="title"
//                 placeholder="[student-name]"
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//               />
//             </div>

//             <div className="form-control">
//               <label htmlFor="sub-title">Sub title</label>
//               <input
//                 onChange={(e) =>
//                   setForm({ ...form, sub_title: e.target.value })
//                 }
//                 type="text"
//                 id="sub-title"
//                 placeholder="for completing[course]"
//               />
//             </div>
//             <div className="form-control">
//               <label htmlFor="Description">Description</label>
//               <textarea
//                 onChange={(e) =>
//                   setForm({ ...form, description: e.target.value })
//                 }
//                 id="Description"
//                 placeholder="Description"
//                 className="h-[200px]"
//               />
//             </div>

//             <div className="mb-4">
//               <h3 className="py-4 font-semibold text-[#000000] text-[1.1rem]">
//                 Signature image{" "}
//                 <span className="text-red-600">(120px*40px)*</span>
//               </h3>
//               <input
//                 type="file"
//                 hidden
//                 ref={clickSignature}
//                 onChange={(e) => setSignature(e.target.files[0])}
//               />
//               <div
//                 onClick={() => clickSignature.current.click()}
//                 className="overflow-hidden cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-full h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
//               >
//                 {signature && (
//                   <img
//                     src={URL.createObjectURL(signature)}
//                     width={120}
//                     height={120}
//                     alt=""
//                   />
//                 )}
//                 <button
//                   type="button"
//                   className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4 justify-self-end"
//                 >
//                   Icon
//                 </button>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="hover:opacity-80 duration-500 w-full rounded text-white p-4 bg-[#0048D3] mt-4"
//             >
//               Update
//             </button>
//           </form>
//         </div>

//         <div
//           style={{
//             background: `url(https://goba.sunmedagency.com/${certificate?.background}) center / cover no-repeat`,
//           }}
//           className="w-full md:flex-1 bg-white text-center px-5 py-8"
//         >
//           <h2 className="text-xl text-main font-semibold">
//             Certificate Competition
//           </h2>
//           <h3 className="text-xl text-[#000000] mt-4 font-semibold">
//             {certificate?.title}
//           </h3>
//           <h3 className="text-xl text-textColor mt-4 font-semibold">
//             {certificate.sub_title}
//           </h3>
//           <p className="text-base text-textColor mt-4 font-semibold">
//             {certificate?.description}
//           </p>
//           <p className="text-end text-gray-500 text-xl font-semibold mt-5">
//             <img
//               src={`https://goba.sunmedagency.com/${certificate?.signature}`}
//               alt=""
//             />
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CertificateBuilder;

import React, { useRef, useState, useEffect } from "react";
import "./CertificateBuilder.css";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { Axios } from "../../../components/Helpers/Axios";
import { LuSave } from "react-icons/lu";
import { DndContext, useDraggable, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import Notifcation from "../../../components/Notification";
import { toast } from "react-toastify";

const DraggableElement = ({ id, children, position }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    position: "absolute",
    top: transform ? position.y + transform.y : position.y,
    left: transform ? position.x + transform.x : position.x,
    zIndex: 10,
    cursor: "move",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const CertificateBuilder = () => {
  const [certificate, setCertificate] = useState([]);
  const [laoding, setLaoding] = useState(false);
  const [change, setChange] = useState(false);

  const [bg, setBg] = useState();
  const [signature, setSignature] = useState();
  const clickBg = useRef(null);
  const clickSignature = useRef(null);

  const [form, setForm] = useState({
    title: "",
    sub_title: "",
    description: "",
  });

  useEffect(() => {
    setLaoding(true);
    Axios.get("/admin/certificate-builder").then((data) => {
      setLaoding(false);
      console.log(data.data.data.certificate);
      setCertificate(data.data.data.certificate);
    });
  }, [change]);

  const hanleSubmit = async (e) => {
    e.preventDefault();
    setLaoding(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("sub_title", form.sub_title);
    formData.append("description", form.description);
    formData.append("background", bg);
    formData.append("signature", signature);
    formData.append("_method", "PUT");

    try {
      await Axios.post("/admin/certificate-builder/1", formData).then(data=>console.log(data));
      setLaoding(false);
      setChange((prev) => !prev);
      toast.success('Updated Successfly')

    } catch (err) {
      console.log(err);
      setChange((prev) => !prev);
      setLaoding(false);
    }
  };

  const defaultPositions = {
    title: { x: 100, y: 100 },
    sub_title: { x: 100, y: 150 },
    description: { x: 100, y: 220 },
    signature: { x: 600, y: 350 },
  };

  const [positions, setPositions] = useState(() => {
    const saved = localStorage.getItem("certificate_positions");
    return saved ? JSON.parse(saved) : defaultPositions;
  });

  // const handleDragEnd = async (event) => {
  //   const { delta, active } = event;
  //   const id = active.id;
  
  //   setPositions((prev) => {
  //     const current = prev[id];
  //     const updatedPosition = {
  //       x: current.x + delta.x,
  //       y: current.y + delta.y,
  //     };
  
  //     console.log(id);
  //     const updated = {
  //       ...prev,
  //       [id]: updatedPosition,
  //     };
  
  //     localStorage.setItem("certificate_positions", JSON.stringify(updated));
  
  //     Axios.post("/admin/certificate-builder/item/update", {
  //       id,
  //       x: updatedPosition.x,
  //       y: updatedPosition.y,
  //     }).then(data=>{
  //       toast.success('Updated Successfly')
  //     }).catch((err) => console.error("Failed to sync position:", err));
  
  //     return updated;
  //   });
  // };
     


  const boxRef = useRef(null); // أضف فوق في المكون

const handleDragEnd = async (event) => {
  const { delta, active } = event;
  const id = active.id;

  const box = boxRef.current;
  if (!box) return;

  const boxRect = box.getBoundingClientRect();
  const maxX = boxRect.width - 150; // أقصى عرض تقريبي للعنصر
  const maxY = boxRect.height - 80; // أقصى ارتفاع تقريبي للعنصر

  setPositions((prev) => {
    const current = prev[id];

    // الموضع الجديد
    let newX = current.x + delta.x;
    let newY = current.y + delta.y;

    // قيد الحدود داخل البوكس
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    const updatedPosition = { x: newX, y: newY };

    const updated = {
      ...prev,
      [id]: updatedPosition,
    };

    localStorage.setItem("certificate_positions", JSON.stringify(updated));

    Axios.post("/admin/certificate-builder/item/update", {
      element_id : id,
      x_position: newX,
      y_position: newY,
    }).then(data=>{
      console.log(data);
      toast.success('Updated Successfly')
    }).catch((err) => console.error("Failed to sync position:", err));

    return updated;
  });
};


  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="CertificateBuilder">
      <Notifcation/>
      {laoding && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h3 className="font-bold text-textColor text-xl"></h3>
        <Breadcrumbs />
      </div>

      <div className="container mt-4 w-full flex flex-col md:flex-row justify-center items-start gap-4">
        {/* ------------- Form ---------------- */}
        <div className="details w-full md:w-[22vw] min-w-64">
          <div className="text-center">
            <h3 className="text-main py-4 border-b font-semibold text-xl border-b-borderColor">
              Certificate details
            </h3>
          </div>

          <form className="inputs py-3 px-5" onSubmit={hanleSubmit}>
            <div className="mb-4">
              <h3 className="py-4 font-semibold text-[#000000] text-[1.1rem]">
                Background image <span className="text-red-600">(930px*600px)*</span>
              </h3>
              <input type="file" hidden ref={clickBg} onChange={(e) => setBg(e.target.files[0])} />
              <div
                onClick={() => clickBg.current.click()}
                className="overflow-hidden cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-full h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
              >
                {bg && <img src={URL.createObjectURL(bg)} width={120} height={120} alt="" />}
                <button type="button" className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4">
                  Icon
                </button>
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="[student-name]"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            <div className="form-control">
              <label htmlFor="sub-title">Sub title</label>
              <input
                onChange={(e) => setForm({ ...form, sub_title: e.target.value })}
                type="text"
                id="sub-title"
                placeholder="for completing[course]"
              />
            </div>

            <div className="form-control">
              <label htmlFor="Description">Description</label>
              <textarea
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                id="Description"
                placeholder="Description"
                className="h-[200px]"
              />
            </div>

            <div className="mb-4">
              <h3 className="py-4 font-semibold text-[#000000] text-[1.1rem]">
                Signature image <span className="text-red-600">(120px*40px)*</span>
              </h3>
              <input
                type="file"
                hidden
                ref={clickSignature}
                onChange={(e) => setSignature(e.target.files[0])}
              />
              <div
                onClick={() => clickSignature.current.click()}
                className="overflow-hidden cursor-pointer flex justify-end py-2 items-center flex-col gap-1 w-full h-56 rounded border-spacing-2 border-2 border-dashed border-borderColor"
              >
                {signature && <img src={URL.createObjectURL(signature)} width={120} height={120} alt="" />}
                <button type="button" className="text-base text-textColor border border-borderColor py-2 px-8 rounded w-3/4">
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

        <div
         ref={boxRef}
          className="w-full md:flex-1 bg-white text-center px-5 py-8 relative overflow-hidden"
          style={{
            background: ` #fff url(https://goba.sunmedagency.com/${certificate?.background}) center / cover no-repeat`,
            height: "500px",
          }}
        >
          <h2 className="text-xl text-main font-semibold mb-2">Certificate Preview</h2>

          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <DraggableElement id="title" position={positions.title}>
              <h3 className="text-xl text-black font-semibold">{certificate?.title}</h3>
            </DraggableElement>

            <DraggableElement id="sub_title" position={positions.sub_title}>
              <h3 className="text-lg text-gray-800 font-semibold">{certificate?.sub_title}</h3>
            </DraggableElement>

            <DraggableElement id="description" position={positions.description}>
              <p className="text-base text-gray-600 font-medium">{certificate?.description}</p>
            </DraggableElement>

            <DraggableElement id="signature" position={positions.signature}>
              <img
                src={`https://goba.sunmedagency.com/${certificate?.signature}`}
                alt="signature"
                className="w-[120px] h-[40px]"
              />
            </DraggableElement>
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default CertificateBuilder;

