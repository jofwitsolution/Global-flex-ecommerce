import React from 'react';
import { Link } from 'react-router-dom';
import user_image from '../../assets/images/user_image.png';

const SidebarAvatar = ({ data, isUser, isSeller }) => {
  const avatarLink = isUser ? '/profile' : isSeller ? '/dashboard' : '/';

  return (
    <>
      {isUser || isSeller ? (
        <Link to={avatarLink}>
          <img
            src={
              data?.avatar && data.avatar?.url ? data.avatar.url : user_image
            }
            className='w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]'
            alt=''
          />
        </Link>
      ) : (
        <>
          <Link to='/login' className='text-[18px] pr-[10px] text-[#000000b7]'>
            Login /
          </Link>
          <Link to='/sign-up' className='text-[18px] text-[#000000b7]'>
            Sign up
          </Link>
        </>
      )}
    </>
  );
};

export default SidebarAvatar;
