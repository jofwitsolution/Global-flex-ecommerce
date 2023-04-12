import React from 'react';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar';
import ShopProfile from '../../components/Shop/ShopProfile';

const ShopProfileInfo = () => {
  return (
    <div>
      <DashboardHeader />
      <div className='flex items-center justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={2} />
        </div>
        <div className='w-full justify-center flex'>
          <ShopProfile />
        </div>
      </div>
    </div>
  );
};

export default ShopProfileInfo;
