import React from "react";
import StudentProfilePart from "./StudentProfilePart";
import BiographyStudentSettings from "./BiographyStudentSettings";
import LocationStudentSetting from "./LocationStudentSetting";
import PasswordStudentSettings from "./PasswordStudentSettings";
import SocialStudentSettings from "./SocialStudentSettings";
import { useState } from "react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import Notifcation from "../../../components/Notification";

const ProfileSettings = () => {
  const [page, setPage] = useState("profile");
  const [formProfile, setFormProfile] = useState({
    name: "",
    image: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
  });
  const [formBio, setFormBio] = useState({
    bio: "",
    short_bio: "",
    designation: "",
  
  });
  const [studentLocation, setStudentLocation] = useState({
    state: "",
    address: "",
    country: "",
    city: "",
  });
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    github: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Axios.get("/student/setting").then((data) => {
      setLoading(false);
      console.log(data);
      setFormProfile({
        name: data.data.user.name,
        email: data.data.user.email,
        image: data.data.user.image,
        phone: data.data.user.phone,
        age: data.data.user.age,
        gender: data.data.user.gender,
      });
      setFormBio({
        bio:data.data.user.bio,
        short_bio:data.data.user.short_bio,
        designation:data.data.user.job_title,
        _method:"PUT"
      })
      setStudentLocation({
        city:data.data.user.city,
        address:data.data.user.address,
        country:data.data.user.country.slice(0, 2),
        state:data.data.user.state,
      })
      setSocialLinks({
        facebook: data.data.user.facebook,
        twitter: data.data.user.twitter,
        linkedin: data.data.user.linkedin,
        github: data.data.user.github,
        website: data.data.user.website,
        _method:"PUT"

      })
    });
  }, [])
  return (
    <div>
      <Notifcation />
      {loading && (
        <div className="fixed h-screen bg-white bg-opacity-50 z-50 inset-0 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-t-main border-gray-200 h-12 w-12 mb-4 animate-spin"></div>{" "}
        </div>
      )}
      <div className="flex items-center gap-8">
        <button
          onClick={() => setPage("profile")}
          className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${
            page === "profile" && "!text-main !border-main"
          } `}
        >
          Profile
        </button>
        <button
          onClick={() => setPage("biography")}
          className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${
            page === "biography" && "!text-main !border-main"
          } `}
        >
          Biography
        </button>
        <button
          onClick={() => setPage("location")}
          className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${
            page === "location" && "!text-main !border-main"
          } `}
        >
          Location
        </button>
        <button
          onClick={() => setPage("password")}
          className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${
            page === "password" && "!text-main !border-main"
          } `}
        >
          Password
        </button>
        <button
          onClick={() => setPage("social")}
          className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${
            page === "social" && "!text-main !border-main"
          } `}
        >
          Social
        </button>
      </div>

      {page === "profile" ? (
        <StudentProfilePart
          form={formProfile}
          setForm={setFormProfile}
          setLoading={setLoading}
        />
      ) : page === "biography" ? (
        <BiographyStudentSettings 
        form={formBio}
        setForm={setFormBio}
        setLoading={setLoading}
        
        />
      ) : page === "location" ? (
        <LocationStudentSetting 
        setStudentLocation={setStudentLocation}
        studentLocation={studentLocation}
        setLoading={setLoading}
        />
      ) : page === "password" ? (
        <PasswordStudentSettings 
        
        setLoading={setLoading}
        />
      ) : (
        page === "social" && <SocialStudentSettings  
        setForm={setSocialLinks}
        form={socialLinks}
        setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default ProfileSettings;
