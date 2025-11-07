import React from "react";
import { toast } from "react-toastify";
import { Axios } from "../../../components/Helpers/Axios";
import { useTranslation } from "react-i18next";

const SocialStudentSettings = ({ form, setForm, setLoading }) => {
  const { t, i18n } = useTranslation();

  // handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Axios.put("/student/setting/socials", form).then((data) => {
        console.log(data);
        toast.success("Updated Successfly");
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error("something was wrong!");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 mt-6">
      <div className="flex flex-col gap-2 mt-4 flex-1 ">
        <label
          htmlFor="facebook"
          className="text-[0.9rem] text-textColor font-medium"
        >
          {t("Facebook")}
        </label>
        <input
          onChange={(e) => setForm({ ...form, facebook: e.target.value })}
          value={form.facebook}
          type="text"
          placeholder={t("Facebook")}
          id="facebook"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 flex-1 ">
        <label
          htmlFor="twitter"
          className="text-[0.9rem] text-textColor font-medium"
        >
          {t("Twitter")}
        </label>
        <input
          onChange={(e) => setForm({ ...form, twitter: e.target.value })}
          value={form.twitter}
          type="text"
          placeholder={t("Twitter")}
          id="twitter"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 flex-1 ">
        <label
          htmlFor="linkedin"
          className="text-[0.9rem] text-textColor font-medium"
        >
          {t("linkedin")}
        </label>
        <input
          onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
          value={form.linkedin}
          type="text"
          placeholder={t("linkedin")}
          id="linkedin"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 flex-1 ">
        <label
          htmlFor="Website"
          className="text-[0.9rem] text-textColor font-medium"
        >
          {t("Website")}
        </label>
        <input
          onChange={(e) => setForm({ ...form, website: e.target.value })}
          value={form.website}
          type="text"
          placeholder={t("Website")}
          id="Website"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4 flex-1 ">
        <label
          htmlFor="Github"
          className="text-[0.9rem] text-textColor font-medium"
        >
          {t("Github")}
        </label>
        <input
          onChange={(e) => setForm({ ...form, github: e.target.value })}
          value={form.github}
          type="text"
          placeholder={t("Github")}
          id="Github"
          className="p-3 border border-[#dddd] rounded-lg outline-none focus:border-main text-text2"
        />
      </div>
      <button
        type="submit"
        className="text-white bg-main py-2 px-8 rounded mt-6 main-shadow duration-500"
      >
        {t("Update")}
      </button>
    </form>
  );
};

export default SocialStudentSettings;
