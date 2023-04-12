import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSidebar from '../../components/Shop/Layout/DashboardSidebar';
import EditProduct from '../../components/Shop/EditProduct';

const ShopEditProduct = () => {
  const { url } = useParams();

  return (
    <div>
      <DashboardHeader />
      <div className='flex items-center justify-between w-full'>
        <div className='w-[80px] 800px:w-[330px]'>
          <DashboardSidebar active={4} />
        </div>
        <div className='w-full justify-center flex'>
          <EditProduct productUrl={url} />
        </div>
      </div>
    </div>
  );
};

export default ShopEditProduct;
