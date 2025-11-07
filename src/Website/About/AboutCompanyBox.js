import React from "react";
import { useTranslation } from "react-i18next";

const AboutCompanyBox = ({image , title , description}) => {
  const { t , i18n} = useTranslation()

  return (
    <div className="w-[290px] h-[290px] relative rounded overflow-hidden card-container ">
      <img
        src={image}
        alt="AboutCompany"
        loading="lazy"
        className="w-full h-full object-cover -z-50 absolute top-0 left-0"
      />
      <div className="absolute top-0 left-0 z-400  duration-500 card-gradient w-full h-full"></div>
      <div className={`absolute top-[60%] ${i18n.language === 'en' ? "left-4" : "right-4"} z-50`}>
        <h3 className="text-[1.1rem] text-white font-bold">
          {title}
        </h3>
        <p className="mt-3 text-white text-[0.8rem] font-medium">
      {description}
        </p>
      </div>
    </div>
  );
};

export default AboutCompanyBox;
