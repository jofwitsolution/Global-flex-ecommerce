import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import user_image from '../../../assets/images/user_image.png';

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className='w-full h-[60px] 400px:h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
      <div>
        <Link to='/'>
          <div className='flex items-center text-black font-Poppins tracking-[5px]'>
            <span className='text-[35px] 400px:text-[45px] font-bold'>G</span>
            <span className='text-[18px] 400px:text-[25px] font-bold'>
              lobalflex
            </span>
          </div>
        </Link>
      </div>
      <div className='flex items-center'>
        <div className='flex items-center mr-4'>
          <Link
            to='/dashboard/profile'
            className='w-[35px] h-[35px] 400px:w-[50px] 400px:h-[50px] rounded-full border-green-500 border-2'
          >
            <img
              src={seller?.avatar ? seller.avatar.url : user_image}
              alt=''
              className='w-[35px] h-[35px] 400px:w-[50px] 400px:h-[50px] rounded-full object-cover'
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
