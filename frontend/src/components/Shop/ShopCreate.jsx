import { React, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonLoader from '../Loaders/ButtonLoader';
import { BiArrowBack } from 'react-icons/bi';

const server = process.env.REACT_APP_API_URL;

const ShopCreate = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    const config = { headers: { 'Content-Type': 'Application/JSON' } };

    const data = {
      name,
      email,
      password,
      zipCode,
      address,
      phoneNumber,
    };

    axios
      .post(`${server}/shop/create-shop`, data, config)
      .then((res) => {
        toast.success(res.data.message);
        setName('');
        setEmail('');
        setPassword('');
        setZipCode('');
        setAddress('');
        setPhoneNumber('');
        setLoadingSubmit(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
        setLoadingSubmit(false);
      });
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-10 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='ml-4 sm:ml-0'>
          <Link to='/'>
            <BiArrowBack size={25} />
          </Link>
        </div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Create a seller account
        </h2>
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Shop Name
              </label>
              <div className='mt-1'>
                <input
                  type='name'
                  name='name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Phone Number
              </label>
              <div className='mt-1'>
                <input
                  type='number'
                  name='phone-number'
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1'>
                <input
                  type='email'
                  name='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Address
              </label>
              <div className='mt-1'>
                <input
                  type='address'
                  name='address'
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Zip Code
              </label>
              <div className='mt-1'>
                <input
                  type='number'
                  name='zipcode'
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1 relative'>
                <input
                  type={visible ? 'text' : 'password'}
                  name='password'
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
                {visible ? (
                  <AiOutlineEye
                    className='absolute right-2 top-2 cursor-pointer'
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className='absolute right-2 top-2 cursor-pointer'
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={loadingSubmit}
                className='group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700'
              >
                {loadingSubmit ? <ButtonLoader width={25} /> : 'Submit'}
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to='/shop-login' className='text-blue-600 pl-2'>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
