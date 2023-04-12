import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../../styles/styles';
import { navItems, dashboardLinks } from '../../static/data';
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import DropDown from './DropDown';
import Navbar from './Navbar';
import SidebarCat from '../cart/SidebarCart';
import Wishlist from '../Wishlist/Wishlist';
import { RxCross1 } from 'react-icons/rx';
import useClickOutside from '../../hooks/useClickOutside';
import SidebarSection from './SidebarSection';
import { useSearchProduct } from '../../hooks/useProducts';
import HeaderAvatar from './HeaderAvatar';
import SidebarAvatar from './SidebarAvatar';

const Header = ({ activeHeading }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const searchRef = useRef(null);
  const sidebarSearchRef = useRef(null);
  const categoriesRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller, seller } = useSelector((state) => state.seller);
  const { categories } = useSelector((state) => state.category);
  const { cartItems } = useSelector((state) => state.cart);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSearchData, setShowSearchData] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  };

  const { data, isSuccess } = useSearchProduct('products/search', {
    keyword: searchTerm,
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    if (isSuccess) {
      if (data.products.length > 0) {
        setSearchData(data.products);
        setShowSearchData(true);
      } else {
        setSearchData([]);
        setShowSearchData(false);
      }
    }
  }, [data, isSuccess]);

  useEffect(() => {
    function handleScrollY() {
      if (window.scrollY > 70) {
        setActive(true);
      } else {
        setActive(false);
      }
    }

    window.addEventListener('scroll', handleScrollY);

    return () => {
      window.removeEventListener('scroll', handleScrollY);
    };
  }, []);

  useClickOutside(sidebarRef, () => setOpen(false));
  useClickOutside(searchRef, () => setShowSearchData(false));
  useClickOutside(sidebarSearchRef, () => setShowSearchData(false));
  useClickOutside(categoriesRef, () => setDropDown(false));

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/catalog?keyword=${searchTerm}`);
  };

  const countCartItems = () => {
    let count = 0;
    cartItems.forEach((item) => {
      count = count + item.qty;
    });

    return count;
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className='hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between'>
          <div>
            <Link to='/'>
              {/* <img
                src='https://shopo.quomodothemes.website/assets/images/logo.svg'
                alt=''
              /> */}
              <div className='flex items-center text-black font-Poppins tracking-[5px]'>
                <span className='text-[30px] 400px:text-[45px] font-bold'>
                  G
                </span>
                <span className='text-[15px] 400px:text-[25px] font-bold'>
                  lobalflex
                </span>
              </div>
            </Link>
          </div>
          {/* search box */}
          <div className='w-[50%] relative'>
            <form onSubmit={(e) => handleSearch(e)}>
              <input
                enterKeyHint='search'
                type='text'
                placeholder='Search products, brands and categories'
                value={searchTerm}
                onChange={handleSearchChange}
                className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
              />
              <button
                type='submit'
                className='absolute right-2 top-1.5 cursor-pointer'
              >
                <AiOutlineSearch size={30} />
              </button>
            </form>

            {!open && showSearchData && searchData.length !== 0 ? (
              <div
                ref={searchRef}
                className='absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4'
              >
                {showSearchData &&
                  searchData.map((item) => (
                    <a
                      key={item._id}
                      href={`/product/${item.url}`}
                      className='z-[19]'
                    >
                      <div className='w-full flex items-start-py-3'>
                        <img
                          src={item.images[0].url}
                          alt=''
                          className='w-[40px] h-[40px] mr-[10px]'
                        />
                        <h1>{item.name}</h1>
                      </div>
                    </a>
                  ))}
              </div>
            ) : null}
          </div>
          {!isAuthenticated && !isSeller && (
            <div className={`${styles.button}`}>
              <Link to='/shop-create'>
                <h1 className='text-[#fff] flex items-center'>
                  Become Seller <IoIosArrowForward className='ml-1' />
                </h1>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null
        } transition hidden 800px:flex items-center justify-between w-full bg-blue-500 h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div ref={categoriesRef} onClick={() => setDropDown(!dropDown)}>
            <div className='relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block'>
              <BiMenuAltLeft size={30} className='absolute top-3 left-2' />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className='absolute right-2 top-4 cursor-pointer'
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categories}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className='flex'>
            <div className={`${styles.noramlFlex}`}>
              <div
                className='relative cursor-pointer mr-[15px]'
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color='rgb(255 255 255 / 83%)' />
                <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                  0
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className='relative cursor-pointer mr-[15px]'
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color='rgb(255 255 255 / 83%)'
                />
                {countCartItems() > 0 ? (
                  <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center'>
                    {countCartItems()}
                  </span>
                ) : null}
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className='relative cursor-pointer mr-[15px]'>
                <HeaderAvatar
                  data={isAuthenticated ? user : isSeller ? seller : {}}
                  isSeller={isSeller}
                  isUser={isAuthenticated}
                />
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <SidebarCat setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? 'shadow-sm fixed top-0 left-0 z-10' : null
        }
      w-full bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className='w-full  flex items-center justify-between'>
          <div>
            <BiMenuAltLeft
              size={40}
              className='ml-4'
              onClick={() => setOpen(true)}
            />
          </div>
          <div className='hidden 300px:block'>
            <Link to='/'>
              {/* <img
                src='https://shopo.quomodothemes.website/assets/images/logo.svg'
                alt=''
                className='mt-3 cursor-pointer'
              /> */}
              <div className='flex items-center text-black font-Poppins tracking-[5px]'>
                <span className='text-[30px] 400px:text-[45px] font-bold'>
                  G
                </span>
                <span className='text-[15px] 400px:text-[25px] font-bold'>
                  lobalflex
                </span>
              </div>
            </Link>
          </div>
          <div>
            <div className='relative mr-[20px]'>
              <Link to='/cart'>
                <AiOutlineShoppingCart size={30} />
                {countCartItems() > 0 ? (
                  <span className='absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center'>
                    {countCartItems()}
                  </span>
                ) : null}
              </Link>
            </div>
          </div>
        </div>

        {/* header sidebar */}

        <div
          className={`${
            open ? 'visible z-20 opacity-100' : 'invisible -z-20 opacity-0'
          } fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 transition-all duration-1000 ease-in-out`}
        >
          <div
            ref={sidebarRef}
            className={`fixed w-[80%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll ${
              open ? 'animate-sidebar-slide-out' : 'animate-sidebar-slide-in'
            } `}
          >
            <div className='w-full justify-between flex items-start px-3'>
              <div className='flex items-center text-black font-Poppins tracking-[5px]'>
                <span className='text-[33px] 400px:text-[45px] font-bold'>
                  G
                </span>
                <span className='text-[17px] 400px:text-[25px] font-bold'>
                  lobalflex
                </span>
              </div>
              <div className='mt-[12px] text-[23px] 400px:text-[30px]'>
                <RxCross1 className='' onClick={() => setOpen(false)} />
              </div>
            </div>

            <div className='my-8 w-[92%] m-auto h-[40px relative]'>
              <input
                type='search'
                placeholder='Search Product...'
                className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md'
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {open && showSearchData && searchData.length !== 0 && (
                <div
                  ref={sidebarSearchRef}
                  className='absolute bg-[#fff] z-10 shadow w-full left-0 p-3'
                >
                  {searchData.map((item) => {
                    return (
                      <a key={item._id} href={`/product/${item.url}`}>
                        <div className='flex items-center'>
                          <img
                            src={item.images[0].url}
                            alt=''
                            className='w-[50px] mr-2'
                          />
                          <h5>{item.name}</h5>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <SidebarSection
              navItems={dashboardLinks}
              title={'MY ACCOUNT'}
              isCategory={false}
              setOpen={setOpen}
            />
            <SidebarSection
              navItems={categories}
              title={'OUR CATEGORIES'}
              isCategory={true}
              setOpen={setOpen}
            />
            <SidebarSection
              navItems={navItems}
              title={'EXPLORE'}
              isCategory={false}
              setOpen={setOpen}
            />

            {!isAuthenticated && !isSeller && (
              <div className={`${styles.button} ml-4 mt-4 !rounded-[4px]`}>
                <Link to='/shop-create'>
                  <h1 className='text-[#fff] flex items-center'>
                    Become Seller <IoIosArrowForward className='ml-1' />
                  </h1>
                </Link>
              </div>
            )}
            <br />
            <br />

            <div className='flex w-full justify-center mb-8'>
              <SidebarAvatar
                data={isAuthenticated ? user : isSeller ? seller : {}}
                isSeller={isSeller}
                isUser={isAuthenticated}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
