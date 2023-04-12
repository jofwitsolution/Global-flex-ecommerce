import React, { useState, useEffect } from 'react';
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/styles';
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { MdOutlineTrackChanges } from 'react-icons/md';
import user_image from '../../assets/images/user_image.png';
import { toast } from 'react-toastify';
import { useProfileUpdate } from '../../hooks/useUsers';
import ButtonLoader from '../Loaders/ButtonLoader';

const ProfileContent = ({ active }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [address, setAddress] = useState(user?.address || '');

  const { data, isLoading, isSuccess, isError, error, mutate } =
    useProfileUpdate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    newForm.append('file', avatar);
    newForm.append('name', name);
    newForm.append('phoneNumber', phoneNumber);
    newForm.append('address', address);

    mutate({ endPoint: 'user/update-profile', form: newForm });
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
      dispatch({ type: 'SetUserProfileUpdate', payload: data?.user });
    }
  }, [isError, isSuccess, data, error, dispatch]);

  return (
    <div className='w-full'>
      {/* profile */}
      {active === 1 && (
        <>
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
                    user.avatar && user.avatar?.url
                      ? user.avatar.url
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
          <div className='w-full px-5'>
            <form onSubmit={handleSubmit}>
              <div className='w-full 800px:flex block pb-3'>
                <div className=' w-[100%] 800px:w-[50%]'>
                  <label htmlFor='name' className='block pb-2'>
                    Full Name
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
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Track order */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: '7463hvbfbhfbrtr28820221',
      orderItems: [
        {
          name: 'Iphone 14 pro max',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className='pl-8 pt-1'>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: '7463hvbfbhfbrtr28820221',
      orderItems: [
        {
          name: 'Iphone 14 pro max',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: ' ',
      flex: 1,
      minWidth: 150,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className='pl-8 pt-1'>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const orders = [
    {
      _id: '7463hvbfbhfbrtr28820221',
      orderItems: [
        {
          name: 'Iphone 14 pro max',
        },
      ],
      totalPrice: 120,
      orderStatus: 'Processing',
    },
  ];

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 150, flex: 0.7 },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: 'total',
      headerName: 'Total',
      type: 'number',
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: ' ',
      flex: 1,
      minWidth: 130,
      headerName: '',
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <MdOutlineTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: 'US$ ' + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className='pl-8 pt-1'>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className='w-full px-5'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className='text-[#fff]'>Add New</span>
        </div>
      </div>
      <br />
      <div className='w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
        <div className='flex items-center'>
          <img
            src='https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg'
            alt=''
          />
          <h5 className='pl-5 font-[600] text-[12px] 800px:text-[unset]'>
            Shahriar Sajeeb
          </h5>
        </div>
        <div className='pl-8 flex items-center'>
          <h6 className='text-[12px] 800px:text-[unset]'>1234 **** *** ****</h6>
          <h5 className='pl-6 text-[12px] 800px:text-[unset]'>08/2022</h5>
        </div>
        <div className='min-w-[10%] flex items-center justify-between pl-8'>
          <AiOutlineDelete size={25} className='cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

const Address = () => {
  return (
    <div className='w-full px-5'>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-[25px] font-[600] text-[#000000ba] pb-2'>
          My Addresses
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className='text-[#fff]'>Add New</span>
        </div>
      </div>
      <br />
      <div className='w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
        <div className='flex items-center'>
          <h5 className='pl-5 font-[600]'>Default</h5>
        </div>
        <div className='pl-8 flex items-center'>
          <h6 className='text-[12px] 800px:text-[unset]'>
            494 Erdman Pasaage, New Zoietown, Paraguay
          </h6>
        </div>
        <div className='pl-8 flex items-center'>
          <h6 className='text-[12px] 800px:text-[unset]'>(213) 840-9416</h6>
        </div>
        <div className='min-w-[10%] flex items-center justify-between pl-8'>
          <AiOutlineDelete size={25} className='cursor-pointer' />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
