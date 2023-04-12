import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/styles';

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const submitHandle = (item) => {
    navigate(`/products?category=${item.url}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className='pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm'>
      {categoriesData &&
        categoriesData.map((item, index) => (
          <div
            key={index + item.title}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(item)}
          >
            <img
              src={item.imageUrl}
              style={{
                width: '25px',
                height: '25px',
                objectFit: 'contain',
                marginLeft: '10px',
                userSelect: 'none',
              }}
              alt=''
            />
            <h3 className='m-3 cursor-pointer select-none'>{item.title}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
