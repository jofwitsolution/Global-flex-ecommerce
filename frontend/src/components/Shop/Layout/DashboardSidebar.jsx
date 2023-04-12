import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  AiOutlineFolderAdd,
  AiOutlineGift,
  AiOutlineLogout,
} from 'react-icons/ai';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { RxDashboard, RxPerson } from 'react-icons/rx';
import { VscNewFile } from 'react-icons/vsc';
import { Link, useNavigate } from 'react-router-dom';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { HiOutlineReceiptRefund } from 'react-icons/hi';
import { CiSettings } from 'react-icons/ci';
import axios from 'axios';
import { toast } from 'react-toastify';

const server = process.env.REACT_APP_API_URL;

const DashboardSidebar = ({ active }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutClicked, setLogoutClicked] = useState(false);

  const handleLogout = () => {
    setLogoutClicked(true);

    if (!logoutClicked) {
      axios
        .get(`${server}/shop/logout`, { withCredentials: true })
        .then((res) => {
          toast.success(res.data.message);
          dispatch({ type: 'LogoutSeller' });
          dispatch({ type: 'UnAuthorize' });
          dispatch({ type: 'CartClearItems' });
          setLogoutClicked(false);
          navigate('/shop-login');
          // window.location.reload(true);
        })
        .catch((error) => {
          console.log(error.response?.data?.message);
          setLogoutClicked(false);
        });
    }
  };

  return (
    <div className='w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10'>
      {/* single item */}
      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard' className='w-full flex items-center'>
          <RxDashboard
            size={30}
            color={`${active === 1 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/profile' className='w-full flex items-center'>
          <RxPerson size={30} color={`${active === 2 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Profile
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/orders' className='w-full flex items-center'>
          <FiShoppingBag
            size={30}
            color={`${active === 3 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/products' className='w-full flex items-center'>
          <FiPackage size={30} color={`${active === 4 ? 'crimson' : '#555'}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link
          to='/dashboard/create-product'
          className='w-full flex items-center'
        >
          <AiOutlineFolderAdd
            size={30}
            color={`${active === 5 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/events' className='w-full flex items-center'>
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 6 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/create-event' className='w-full flex items-center'>
          <VscNewFile
            size={30}
            color={`${active === 7 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/messages' className='w-full flex items-center'>
          <BiMessageSquareDetail
            size={30}
            color={`${active === 8 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/coupouns' className='w-full flex items-center'>
          <AiOutlineGift
            size={30}
            color={`${active === 9 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/refunds' className='w-full flex items-center'>
          <HiOutlineReceiptRefund
            size={30}
            color={`${active === 10 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <Link to='/dashboard/settings' className='w-full flex items-center'>
          <CiSettings
            size={30}
            color={`${active === 11 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>

      <div className='w-full flex items-center p-4'>
        <div
          onClick={handleLogout}
          className='w-full flex items-center cursor-pointer'
        >
          <AiOutlineLogout
            size={30}
            color={`${active === 11 ? 'crimson' : '#555'}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 11 ? 'text-[crimson]' : 'text-[#555]'
            }`}
          >
            Log out
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
