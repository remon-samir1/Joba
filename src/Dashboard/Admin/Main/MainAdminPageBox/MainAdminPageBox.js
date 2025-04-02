import React from 'react';
import './MainAdminPageBox.css'
import { Icon } from '@iconify-icon/react';
const MainAdminPageBox = (props) => {
  return (
    <div className='MainAdminPageBox'>

      <Icon icon={props.icon} width={40} height={40} className='text-main' />
   <div className="data">
    <p className="count">{props.count}</p>
    <p className="title">{props.title}</p>
   </div>
    </div>
  );
}

export default MainAdminPageBox;
