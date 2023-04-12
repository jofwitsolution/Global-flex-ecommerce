import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import user_image from '../../assets/images/user_image.png';

const HeaderAvatar = ({ data, isUser, isSeller }) => {
  const avatarLink = isUser ? '/profile' : isSeller ? '/dashboard' : '/';

  return (
    <>
      {isUser || isSeller ? (
        <Link
          to={avatarLink}
          className='inline-flex w-[35px] h-[35px] rounded-full border-green-500 border-2'
        >
          <img
            src={
              data?.avatar && data.avatar?.url ? data.avatar.url : user_image
            }
            className='w-[35px] h-[35px] rounded-full'
            alt=''
          />
        </Link>
      ) : (
        <Link to='/login'>
          <CgProfile size={30} color='rgb(255 255 255 / 83%)' />
        </Link>
      )}
    </>
  );
};

export default HeaderAvatar;
