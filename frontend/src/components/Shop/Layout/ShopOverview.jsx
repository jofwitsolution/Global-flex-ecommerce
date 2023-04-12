import React from 'react';
import { formatCurrency } from '../../../utils/formatCurrency';

const ShopOverview = ({ orders, revenue, profits }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 h-full'>
      <h2 className='text-lg font-semibold mb-4'>Sales Overview</h2>
      <div className='flex flex-wrap'>
        <div className='w-full md:w-1/3 lg:w-1/4 p-2'>
          <div className='bg-blue-100 rounded-lg p-4'>
            <div className='text-sm font-semibold text-blue-700 mb-2'>
              Orders
            </div>
            <div className='text-2xl font-bold text-blue-900'>{orders}</div>
          </div>
        </div>
        <div className='w-full md:w-1/3 lg:w-1/4 p-2'>
          <div className='bg-green-100 rounded-lg p-4'>
            <div className='text-sm font-semibold text-green-700 mb-2'>
              Revenue
            </div>
            <div className='text-2xl font-bold text-green-900'>
              {formatCurrency(revenue)}
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/3 lg:w-1/4 p-2'>
          <div className='bg-yellow-100 rounded-lg p-4'>
            <div className='text-sm font-semibold text-yellow-700 mb-2'>
              Profits
            </div>
            <div className='text-2xl font-bold text-yellow-900'>
              {formatCurrency(profits)}
            </div>
          </div>
        </div>
        <div className='w-full md:w-1/3 lg:w-1/4 p-2'>
          <div className='bg-orange-100 rounded-lg p-4'>
            <div className='text-sm font-semibold text-orange-700 mb-2'>
              Products
            </div>
            <div className='text-2xl font-bold text-orange-900'>21</div>
          </div>
        </div>
        <div className='w-full md:w-1/3 lg:w-1/4 p-2'>
          <div className='bg-blue-100 rounded-lg p-4'>
            <div className='text-sm font-semibold text-blue-700 mb-2'>
              Customers
            </div>
            <div className='text-2xl font-bold text-blue-900'>8</div>
          </div>
        </div>
        <div className='w-full md:w-1/3 lg:w-1/4 p-2'>
          <div className='bg-green-100 rounded-lg p-4'>
            <div className='text-sm font-semibold text-green-700 mb-2'>
              Reviews
            </div>
            <div className='text-2xl font-bold text-green-900'>21</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOverview;
