import React, { useState, useEffect } from "react";
import ToggleButton from "../../../../components/ToggleButton/ToggleButton";
import { Axios } from "../../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../../components/Notification";
import { useRef } from "react";
import { data, useParams } from "react-router-dom";

const AddCourseMoreInfo = ({ course_id, edit, setPage, slug }) => {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(edit ? true : false);
  const { id } = useParams();
  const [form, setForm] = useState({
    course_id,
    capacity: "",
    category_id:"",
    step: "2",
    duration : '',
    course_duration: "",
    qna: "",
    certificate: "",
    partner_instructor: "",
    category: "",
    levels: [],
    languages: [],
  });
  //form);
  const [lvls, setLvls] = useState([]);
  const [langs, setLangs] = useState([]);
  const scrollRef = useRef();
  useEffect(() => {
    Axios.get("admin/course-level").then((data) =>{

      setLvls(data.data.data.courseLevels.data)
      //data);
    }
    );
  }, []);
  useEffect(() => {
    Axios.get("admin/course-language").then((data) => {
      setLangs(data.data.data.courseLanguages.data);
    });
  }, []);
  //lvls);

  useEffect(() => {
    scrollRef.current.scrollIntoView();
  }, []);
  useEffect(() => {
    Axios.get(`/admin/course-category`).then((data) => {
      setCategory(data.data.data.categories.data);
    });
  }, []);
  const handleCheckboxChange = (type, value, checked) => {
    //type);
    const id = typeof value === "object" ? value.id : value;
    setForm((prevForm) => {
      const updatedArray = checked
        ? [...prevForm[type], id]
        : prevForm[type].filter((item) => item !== id);
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
    if (form.levels.length === 0 || form.languages.length === 0) {
      toast.warn("Please select at least one level and one language");
      return;
    }

    try {
      setLoading(true);

      const res = await Axios.post(
        "/admin/courses",
        edit
          ? {
              capacity: form.capacity,
              course_duration: form.duration,
              category: form.category_id,
              qna: form.qna,
              certificate: form.certificate,
              partner_instructor: form.partner_instructor,
              step: "2",
              course_id:id,
              levels : form.levels ,
              languages : form.languages

            }
          : form
      ).then((data) => {
        //data);
        setLoading(false);
        // setPage("content");
        if(edit){

          toast.success("Updated Successfly");
        }else{
          
          toast.success("Created Successfly");
        }
      });
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };
  //slug);
  useEffect(() => {
    if (edit) {
      setLoading(true);
      Axios.get(`course/${slug}`).then((data) => {
        //data.data.course);

        const course = data.data.course;

        setForm({
          ...course,
          languages: course.languages.map((l) => l.language_id),
          levels: course.levels.map((l) => l.level_id),
        });
        setLoading(false);
      });
    }
  }, []);
  // //form);
  return (
    <div className="AddCoourse">
      <div ref={scrollRef} />
      {loading && (
        <div className="fixed h-screen overflow-hidden bg-white bg-opacity-50 z-50 inset-0"></div>
      )}
      <Notifcation />
      <form onSubmit={handleSubmit} className="bg-white p-5">
        <div className="flex items-center md:gap-4 flex-col md:flex-row">
          <div className="form-control">
            <label htmlFor="Capacity">Capacity</label>
            <input
              type="number"
              id="Capacity"
              required
              value={form.capacity}
              onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            />
          </div>
          <div className="form-control">
            <label htmlFor="duration">Course Duration (Minutes)</label>
            <input
              type="number"
              id="duration"
              required
              value={edit ? form.duration : form.course_duration}
              onChange={(e) =>
                setForm({ ...form, course_duration: e.target.value , duration: e.target.value  })
              }
            />
          </div>
        </div>

        <div className="flex mt-5">
          <div className="flex-1 flex flex-col md:justify-start justify-between items-start gap-5">
            <label>Q&A</label>
            <label>Completion Certificate</label>
          </div>
          <div className="flex-1 flex flex-col items-end md:items-start gap-5">
            <ToggleButton
              data={ form.qna }
              setData={(value) => setForm((prev) => ({ ...prev, qna: value }))}
            />
            <ToggleButton
              data={form.certificate}
              setData={(value) =>
                setForm((prev) => ({ ...prev, certificate: value }))
              }
            />
            {/* <ToggleButton
              data={form.partner_instructor}
              setData={(value) =>
                setForm((prev) => ({ ...prev, Patner_instructor: value }))
              } */}
            {/* /> */}
          </div>
        </div>

        <div className="form-control">
          <label>Category</label>
          <select
            required
            value={edit && form.category_id}
            className="w-full bg-white border border-[#ddd] rounded p-4"
            onChange={(e) => setForm({ ...form, category: e.target.value  , category_id : e.target.value})}
          >
            <option value="">Category</option>
            {categoryData}
          </select>
        </div>

        <div className="flex mt-4 items-start gap-5 justify-center">
          {/* Level Section */}
          <div className="flex-1 bg-white p-5 flex border border-[#ddd] flex-col justify-start items-start gap-4">
            <label>Level</label>
            {lvls.map((lvl, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-main w-[18px] h-[18px]"
                  checked={form.levels.includes(lvl.id)}
                  onChange={(e) =>
                    handleCheckboxChange("levels", lvl.id, e.target.checked)
                  }
                />

                <label htmlFor={`level-${lvl}`}>{lvl.name.name}</label>
              </div>
            ))}
          </div>

          {/* Language Section */}
          <div className="flex-1 bg-white p-5 flex border border-[#ddd] flex-col justify-start items-start gap-4">
            <label>Language</label>
            {langs.map((lang, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-main w-[18px] h-[18px]"
                  checked={form.languages.includes(lang.id)}
                  onChange={(e) =>
                    handleCheckboxChange("languages", lang.id, e.target.checked)
                  }
                />
                <label htmlFor={`${lang}`}>{lang.name}</label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit">{loading ? "Loading..." : "save"}</button>
      </form>
    </div>
  );
};

export default AddCourseMoreInfo;
