import React from 'react';
import { useTranslation } from 'react-i18next';

const Annoucement = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className='flex justify-center items-center py-3 px-4 bg-white'>
       <p className='text-textColor text-[0.95rem]'>{t("No announcement available")}</p>
    </div>
  );
}

export default Annoucement;
