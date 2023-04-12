import React, { useState, useEffect } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/styles';
import user_image from '../../assets/images/user_image.png';
import { toast } from 'react-toastify';
import { useProfileUpdate } from '../../hooks/useUsers';
import ButtonLoader from '../Loaders/ButtonLoader';

const ShopProfile = () => {
  const dispatch = useDispatch();

  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState(seller && seller.name);
  const [email, setEmail] = useState(seller && seller.email);
  const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || '');
  const [address, setAddress] = useState(seller?.address || '');
  const [zipCode, setZipCode] = useState(seller?.zipCode || '');
  const [description, setDescription] = useState(seller?.description || '');

  const { data, isLoading, isSuccess, isError, error, mutate } =
    useProfileUpdate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    newForm.append('file', avatar);
    newForm.append('name', name);
    newForm.append('phoneNumber', phoneNumber);
    newForm.append('address', address);
    newForm.append('zipCode', zipCode);
    newForm.append('description', description);

    mutate({ endPoint: 'shop/update-profile', form: newForm });
  };

  const handleAvatarChange = (e) => {
    e.preventDefault();

    let file = e.target.files[0];
    // if image is larger than 102400 bytes
    if (file.size > 102400) {
      toast('Image should not be larger than 100KB.');
      return;
    }
    setAvatar(file);
  };

  useEffect(() => {
    if (isError) {
      toast(error?.response?.data?.message);
    }
    if (isSuccess) {
      toast('Profile updated successfully');
      dispatch({ type: 'SetSellerProfileUpdate', payload: data?.seller });
    }
  }, [isError, isSuccess, data, error, dispatch]);

  return (
    <div className='w-[96%] lg:w-[80%] 800px:mt-0 shadow h-[80vh] rounded-[4px] p-1 sm:p-3 overflow-y-scroll hide-scrollbar'>
      <div className='bg-white rounded-lg shadow-md pt-4 sm:p-6'>
        <div className='flex justify-center w-full'>
          <div className='relative'>
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
                alt=''
              />
            ) : (
              <img
                src={
                  seller.avatar && seller.avatar?.url
                    ? seller.avatar.url
                    : user_image
                }
                className='w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]'
                alt=''
              />
            )}

            <label htmlFor='avatar'>
              <div className='w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]'>
                <AiOutlineCamera />
              </div>
            </label>
            <input
              type='file'
              name='avatar'
              id='avatar'
              className='hidden'
              accept='.jpg,.jpeg,.png'
              max='102400'
              onChange={(e) => handleAvatarChange(e)}
            />
          </div>
        </div>
        <br />
        <br />
        <div className='w-full px-2 sm:px-5'>
          <form onSubmit={handleSubmit}>
            <div className='w-full 800px:flex block pb-3'>
              <div className=' w-[100%] 800px:w-[50%]'>
                <label htmlFor='name' className='block pb-2'>
                  Shop Name
                </label>
                <input
                  id='name'
                  type='text'
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className=' w-[100%] 800px:w-[50%]'>
                <label htmlFor='email' className='block pb-2'>
                  Email Address
                </label>
                <input
                  id='email'
                  type='email'
                  className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className='w-full 800px:flex block pb-3'>
              <div className=' w-[100%] 800px:w-[50%]'>
                <label htmlFor='phoneNumber' className='block pb-2'>
                  Phone Number
                </label>
                <input
                  id='phoneNumber'
                  type='number'
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className=' w-[100%] 800px:w-[50%]'>
                <label htmlFor='address' className='block pb-2'>
                  Address
                </label>
                <input
                  id='address'
                  type='address'
                  className={`${styles.input} !w-[95%]`}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className='w-full 800px:flex block pb-3'>
              <div className=' w-[100%] 800px:w-[50%]'>
                <label htmlFor='description' className='block pb-2'>
                  Description
                </label>
                <textarea
                  id='description'
                  type='description'
                  className={`${styles.input} mb-4 !w-[95%] focus:outline-none resize-none !h-[110px]`}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className='w-[100%] 800px:w-[50%]'>
                <label htmlFor='zipCode' className='block pb-2'>
                  Zip Code
                </label>
                <input
                  id='zipCode'
                  type='number'
                  className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>

            <button
              className={`w-[250px] h-[40px] border border-[#3a24db] flex justify-center items-center text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              disabled={isLoading}
              type='submit'
            >
              {isLoading ? (
                <span className=''>
                  <ButtonLoader color={'blue'} width={26} />
                </span>
              ) : (
                'Update'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopProfile;
