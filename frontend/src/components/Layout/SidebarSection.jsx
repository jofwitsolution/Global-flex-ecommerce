import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/styles';

const SidebarSection = ({ navItems, title, isCategory, setOpen }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      <h3 className='text-black font-[700] px-4 mb-[22px]'>{title}</h3>
      {navItems &&
        navItems.map((item, index) => (
          <div key={index + item.title} className='flex'>
            <Link
              onClick={() => setOpen(false)}
              to={isCategory ? `/products?category=${item.url}` : item.url}
              className={`${
                index === navItems.length - 1 ? 'pb-[0]' : 'pb-[22px]'
              } text-black 800px:text-[#fff] 800px:pb-0 px-6 cursor-pointer}`}
            >
              {item.title}
            </Link>
          </div>
        ))}
      <div className='border-b border-gray-200 w-full my-[11px]'></div>
    </div>
  );
};

export default SidebarSection;
