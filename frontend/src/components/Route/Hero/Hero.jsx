import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
// import gfs_1 from '../../../Assests/images/gfs-1.jpg';

const Hero = () => {
  return (
    <div
      className={`relative hidden 400px:flex h-[70vh] 800px:h-[80vh] w-full bg-hero-home bg-no-repeat bg-center bg-cover ${styles.noramlFlex}`}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%] text-white`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] font-[600] capitalize`}
        >
          Welcome to Globalflex
          <br />
          Shopping
        </h1>
        <p className='pt-5 text-[18px] font-[400]'>
          Your One-Stop Shop for Everything You Need. Discover Endless
          Possibilities with Our Wide <br /> Range of Products, Unbeatable
          Prices, and Seamless Shopping Experience. <br /> Start Exploring Now
          and Experience the Joy of Hassle-Free Online Shopping!
        </p>
        <Link to='/products' className='inline-block'>
          <div className={`${styles.buttonBlue} mt-5`}>
            <span className='text-[#fff] font-[Poppins] text-[18px]'>
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
