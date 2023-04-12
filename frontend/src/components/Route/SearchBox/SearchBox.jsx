import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBox = () => {
  const navigate = useNavigate();

  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/catalog?keyword=${searchKeyword}`);
  };
  return (
    <div
      className={`400px:w-11/12 400px:mx-auto block 800px:hidden px-4 400px:px-0 400px:mt-8  bg-white 400px:bg-inherit pb-2`}
    >
      <div className='w-full relative'>
        <form onSubmit={(e) => handleSearch(e)}>
          <input
            enterKeyHint='search'
            type='text'
            placeholder='Search products, brands and categories'
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className='h-[35px] w-full px-2 border-[#000] border-[1px] rounded-xl text-[14px]'
          />
          <button
            type='submit'
            className='absolute right-2 top-1.5 cursor-pointer'
          >
            <AiOutlineSearch size={25} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
