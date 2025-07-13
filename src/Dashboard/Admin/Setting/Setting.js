import React, { useEffect, useState } from "react";
import "./Setting.css";
import { Icon } from "@iconify-icon/react";
import ChangePassword from "./ChangePassword/ChangePassword";
import { Axios } from "../../../components/Helpers/Axios";

const iconsMap = {
  facebook: "mage:facebook",
  instagram: "line-md:instagram",
  twitter: "mdi:twitter",
  whatsapp: "ic:twotone-whatsapp",
  linkedin: "ri:linkedin-fill",
  youtube: "mdi:youtube",
  website: "grommet-icons:language",
};

const Setting = () => {
  const [form, setForm] = useState([]);
  const [update, setUpdate] = useState([]);

  useEffect(() => {
    Axios.get("/admin/social-link").then((data) =>
      setForm(data.data.socialLinks.data)
    );
  }, []);

  const handleLinkChange = (index, event) => {
    const newForm = form.map((item, i) => {
      if (index === i) {
        return { ...item, link: event.target.value };
      }
      return item;
    });
    setForm(newForm);
  };
  console.log(update);
  console.log(form);
  //  handleSocialUpdate
  const handleSocialUpdate = async () => {
    try {
      const requests = update
        .map((id) => {
          const matchedItem = form.find((data) => data.id === id);
          if (!matchedItem) return null;
          console.log(matchedItem.link);
          console.log(matchedItem.name);
          return Axios.post(`/admin/social-link/${id}`, {
            link: matchedItem.link,
            name: matchedItem.name,
            _method: "PUT",
          });
        })
        .filter(Boolean);

      const responses = await Promise.all(requests);
      console.log("All updates successful:", responses);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  return (
    <div className="Profile">
      <div className="bg-white p-5 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {Array.isArray(form) &&
            form.map((data, index) => (
              <div className="control" key={index}>
                <label
                  htmlFor={data.name}
                  className="text-[#000000] font-semibold text-[1.1rem]"
                >
                  {data.name}
                </label>
                <div className="overflow-hidden mt-3 flex items-center border border-borderColor focus-within:border-main rounded gap-3">
                  <Icon
                    icon={
                      iconsMap[data.name.toLowerCase()] ||
                      "grommet-icons:language"
                    }
                    width={20}
                    height={20}
                    className="icon text-main border-r border-r-borderColor p-2"
                  />
                  <input
                    value={data.link}
                    onChange={(e) => {
                      handleLinkChange(index, e);
                      if (!update.includes(data.id)) {
                        setUpdate([...update, data.id]);
                      }
                    }}
                    type="text"
                    placeholder={
                      data.name === "WhatsApp"
                        ? "Phone number"
                        : "URL or Username"
                    }
                    id={data.name}
                    className="p-2 outline-none flex-1"
                  />
                </div>
              </div>
            ))}
        </div>

        <button
          type="button"
          onClick={handleSocialUpdate}
          className="bg-main text-white text-base py-3 rounded mt-8 px-16 main-shadow duration-300"
        >
          Save changes
        </button>
      </div>
      <div className="flex justify-center items-start gap-5 mt-8">
        <ChangePassword />
      </div>
    </div>
  );
};

export default Setting;
