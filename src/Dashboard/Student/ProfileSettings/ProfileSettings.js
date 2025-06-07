import React from 'react';
import StudentProfilePart from './StudentProfilePart';
import BiographyStudentSettings from './BiographyStudentSettings';
import LocationStudentSetting from './LocationStudentSetting';
import PasswordStudentSettings from './PasswordStudentSettings';
import SocialStudentSettings from './SocialStudentSettings';
import { useState } from 'react';

const ProfileSettings = () => {
  const [page , setPage] = useState('profile')
  return (
    <div >
      <div className="flex items-center gap-8">
 <button onClick={()=>setPage('profile')} className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'profile' && '!text-main !border-main'} `}>Profile</button>
 <button onClick={()=>setPage('biography')} className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'biography' && '!text-main !border-main'} `}>Biography</button>
 <button onClick={()=>setPage('location')} className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'location' && '!text-main !border-main'} `}>Location</button>
 <button onClick={()=>setPage('password')} className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'password' && '!text-main !border-main'} `}>Password</button>
 <button onClick={()=>setPage('social')} className={`flex-1 text-base text-textColor py-3 hover:text-main duration-300 border-b border-transparent hover:border-main ${page === 'social' && '!text-main !border-main'} `}>Social</button>
      </div>

      {
        page === 'profile' ? <StudentProfilePart/> : page === 'biography' ? <BiographyStudentSettings/> : page === 'location' ? <LocationStudentSetting/> : page === 'password' ? <PasswordStudentSettings/> : page === 'social' && <SocialStudentSettings/>
      }

    </div>
  );
}

export default ProfileSettings;
