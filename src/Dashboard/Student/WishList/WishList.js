import React from 'react';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import WishListCard from './WishListCard';

const WishList = () => {
  return (
    <div className='py-4'>
      <div className="flex items-center justify-between">
        <h3 className='text-[1.1rem] text-textColor'>WishList</h3>
        <Breadcrumbs/>
      </div>
      <div className="flex items-center gap-5 md:justify-start justify-center flex-wrap">
        <WishListCard/>
        <WishListCard/>
        <WishListCard/>
      </div>
    </div>
  );
}

export default WishList;
