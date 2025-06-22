import React, { useState, useEffect } from "react";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";
import { Axios } from "../../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../../components/Notification";
import { useRef } from "react";

const AddCourseMoreInfo = ({ course_id }) => {
  const [category, setCategory] = useState();
const [loading , setLoading] = useState(false)
  const [form, setForm] = useState({
    course_id,
    capacity: "",
    course_duration: "",
    qna: "",
    certificate: "",
    Patner_instructor: "",
    category: "",
    level: [],
    language: [],
  });
const scrollRef = useRef();
useEffect(()=>{
  scrollRef.current.scrollIntoView()
},[])
  useEffect(() => {
    Axios.get(`/admin/course-category`).then((data) => {
      setCategory(data.data.data.categories.data);
    });
  }, []);

  const handleCheckboxChange = (type, value, checked) => {
    setForm((prevForm) => {
      const updatedArray = checked
        ? [...prevForm[type], value]
        : prevForm[type].filter((item) => item !== value);
      return { ...prevForm, [type]: updatedArray };
    });
  };

  const categoryData = category?.map((data, index) => (
    <option key={index} value={data.id}>
      {data.name}
    </option>
  ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.level.length === 0 || form.language.length === 0) {
      toast.warn("Please select at least one level and one language");
      return;
    }
    
    try {
      setLoading(true)
      const res = await Axios.post("/admin/courses", form).then((data)=>{
        console.log(data);
        setLoading(false)

      })
    } catch (err) {
      console.error(err);
      setLoading(false)

    }
  };

  return (
    <div className="AddCoourse">
      <div ref={scrollRef}/>
  {
        loading && <div className="fixed h-screen overflow-hidden bg-white bg-opacity-50 z-50 inset-0"></div>
      }
      <Notifcation/>
      <form onSubmit={handleSubmit} className="bg-white p-5">
        <div className="flex items-center md:gap-4 flex-col md:flex-row">
          <div className="form-control">
            <label htmlFor="Capacity">Capacity</label>
            <input
              type="text"
              id="Capacity"
              required
              value={form.capacity}
              onChange={(e) =>
                setForm({ ...form, capacity: e.target.value })
              }
            />
          </div>
          <div className="form-control">
            <label htmlFor="duration">Course Duration (Minutes)</label>
            <input
              type="text"
              id="duration"
              required
              value={form.course_duration}
              onChange={(e) =>
                setForm({ ...form, course_duration: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex mt-5">
          <div className="flex-1 flex flex-col md:justify-start justify-between items-start gap-5">
            <label>Q&A</label>
            <label>Completion Certificate</label>
            <label>Patner instructor</label>
          </div>
          <div className="flex-1 flex flex-col items-end md:items-start gap-5">
            <ToggleButton
              setData={(value) => setForm((prev) => ({ ...prev, qna: value }))}
            />
            <ToggleButton
              setData={(value) =>
                setForm((prev) => ({ ...prev, certificate: value }))
              }
            />
            <ToggleButton
              setData={(value) =>
                setForm((prev) => ({ ...prev, Patner_instructor: value }))
              }
            />
          </div>
        </div>

        <div className="form-control">
          <label>Category</label>
          <select
            required
            className="w-full bg-white border border-[#ddd] rounded p-4"
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Category</option>
            {categoryData}
          </select>
        </div>

        <div className="flex mt-4 items-start gap-5 justify-center">
          {/* Level Section */}
          <div className="flex-1 bg-white p-5 flex border border-[#ddd] flex-col justify-start items-start gap-4">
            <label>Level</label>
            {["Beginner", "Intermediate", "Expert"].map((lvl, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-main w-[18px] h-[18px]"
                  id={`level-${lvl}`}
                  onChange={(e) =>
                    handleCheckboxChange("level", lvl, e.target.checked)
                  }
                />
                <label htmlFor={`level-${lvl}`}>{lvl}</label>
              </div>
            ))}
          </div>

          {/* Language Section */}
          <div className="flex-1 bg-white p-5 flex border border-[#ddd] flex-col justify-start items-start gap-4">
            <label>Language</label>
            {["English", "Arabic"].map((lang, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-main w-[18px] h-[18px]"
                  id={`lang-${lang}`}
                  onChange={(e) =>
                    handleCheckboxChange("language", lang, e.target.checked)
                  }
                />
                <label htmlFor={`lang-${lang}`}>{lang}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">{loading ? 'Loading...' : "save"}</button>
      </form>
    </div>
  );
};

export default AddCourseMoreInfo;
