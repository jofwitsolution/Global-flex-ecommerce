import React from 'react';
import { useDispatch } from 'react-redux';
import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from 'react-icons/ai';
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { TbAddressBook } from 'react-icons/tb';
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const server = process.env.REACT_APP_API_URL;

const ProfileSidebar = ({ setActive, active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        dispatch({ type: 'LogoutUser' });
        dispatch({ type: 'UnAuthorize' });
        dispatch({ type: 'CartClearItems' });
        navigate('/login');
        // window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response?.data?.message);
      });
  };
  return (
    <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
      <div
        className='flex items-center cursor-pointer w-full mb-8'
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? 'red' : ''} />
        <span
          className={`pl-3 ${
            active === 1 ? 'text-[red]' : ''
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className='flex items-center cursor-pointer w-full mb-8'
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? 'red' : ''} />
        <span
          className={`pl-3 ${
            active === 2 ? 'text-[red]' : ''
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className='flex items-center cursor-pointer w-full mb-8'
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? 'red' : ''} />
        <span
          className={`pl-3 ${
            active === 3 ? 'text-[red]' : ''
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className='flex items-center cursor-pointer w-full mb-8'
        onClick={() => setActive(4) || navigate('/inbox')}
      >
        <AiOutlineMessage size={20} color={active === 4 ? 'red' : ''} />
        <span
          className={`pl-3 ${
            active === 4 ? 'text-[red]' : ''
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className='flex items-center cursor-pointer w-full mb-8'
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? 'red' : ''} />
        <span
          className={`pl-3 ${
            active === 5 ? 'text-[red]' : ''
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className='flex items-center cursor-pointer w-full mb-8'
        onClick={() => setActive(6)}
      >
        <AiOutlineCreditCard size={20} color={active === 6 ? 'red' : ''} />
        <span
          className={`pl-3 ${
            active === 6 ? 'text-[red]' : ''
          } 800px:block hidden`}
        >
          Payment Methods
        </span>
      </div>

      <div
        className='flex items-center cursor-pointer w-full mb-8'
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? 'red' : ''} />
        <span
          className={`pl-3 ${
            active === 7 ? 'text-[red]' : ''
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>

      <div
        className='single_item flex items-center cursor-pointer w-full mb-8'
        onClick={logoutHandler}
      >
        <AiOutlineLogout size={20} color={active === 8 ? 'red' : ''} />
        <span
          className={`pl-3 ${
            active === 8 ? 'text-[red]' : ''
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
