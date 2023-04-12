import React from 'react';

const Dialog = ({ children, toggle }) => {
  return (
    <>
      {toggle && (
        <div className='z-[10000] fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
          <div className='bg-white rounded-sm w-[250px] 400px:w-[300px] shadow-md'>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
