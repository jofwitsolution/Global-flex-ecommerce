import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { brandingData } from '../../../static/data';
import styles from '../../../styles/styles';

const Categories = () => {
  // const navigate = useNavigate();

  return (
    <>
      {/* hidden sm:block */}
      <div className={`${styles.section} `}>
        <div
          className={`branding my-2 sm:my-12 flex justify-between gap-8 sm:gap-4 w-full overflow-x-scroll hide-scrollbar shadow-sm sm:bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div
                className='flex items-start flex-shrink-0 sm:flex-shrink'
                key={index}
              >
                {i.icon}
                <div className='px-3'>
                  <h3 className='font-bold text-sm md:text-base'>{i.title}</h3>
                  <p className='text-xs md:text-sm'>{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[120px] object-cover"
                    alt=""
                  />
                </div>
              );
            })}
        </div>
      </div> */}
    </>
  );
};

export default Categories;
