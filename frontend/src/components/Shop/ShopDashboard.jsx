import React from 'react';
import ShopOverview from './Layout/ShopOverview';

const ShopDashboard = () => {
  return (
    <div className='w-[96%] mt-4 shadow h-[80vh] rounded-[4px] sm:p-3 overflow-y-scroll hide-scrollbar'>
      <ShopOverview orders={10} revenue={20000} profits={8500} />
    </div>
  );
};

export default ShopDashboard;
