import React, { useEffect, useState, lazy, Suspense } from 'react';
import 'react-quill/dist/quill.snow.css'; // import the styles
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from './../Layout/Loader';
import ButtonLoader from '../Loaders/ButtonLoader';
import { useProduct, useUpdateProduct } from '../../hooks/useProducts';
const ReactQuill = lazy(() => import('react-quill'));

const EditProduct = ({ productUrl }) => {
  const { categories, success: successCategories } = useSelector(
    (state) => state.category
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: dataProduct,
    isSuccess: isSuccessProduct,
    isError: isErrorProduct,
  } = useProduct('products/product', productUrl);

  const {
    data: dataUpdate,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    mutate: mutateUpdate,
  } = useUpdateProduct();

  const { product } = dataProduct || { product: {} };

  const [editorValue, setEditorValue] = useState('');
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [briefDescription, setBriefDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [brand, setBrand] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [numberInStock, setNumberInStock] = useState('');

  useEffect(() => {
    if (isSuccessProduct) {
      setEditorValue(product.fullDescription);
      setName(product.name);
      setBriefDescription(product.briefDescription);
      setCategory(product.category);
      setTags(product.tags);
      setBrand(product.brand);
      setOriginalPrice(product.originalPrice);
      setDiscountPrice(product.discountPrice);
      setNumberInStock(product.numberInStock);
    }
  }, [product, isSuccessProduct]);

  useEffect(() => {
    if (isErrorUpdate) {
      toast.error(errorUpdate?.response?.data.message);
    }

    if (isSuccessUpdate) {
      toast.success('Product updated successfully!');
      navigate(`/product/${dataUpdate?.product.url}`);
    }
  }, [isErrorUpdate, isSuccessUpdate, errorUpdate, dataUpdate, navigate]);

  function handleRichEditor(newValue) {
    setEditorValue(newValue);
  }

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    // if image is larger than 102400 bytes
    if (files[0].size > 102400) {
      toast('Image should not be larger than 100KB.');
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'clearErrors' });

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append('images', image);
    });
    newForm.append('name', name);
    newForm.append('briefDescription', briefDescription);
    newForm.append('fullDescription', editorValue);
    newForm.append('category', category);
    newForm.append('tags', tags);
    newForm.append('brand', brand);
    newForm.append('originalPrice', originalPrice);
    newForm.append('discountPrice', discountPrice);
    newForm.append('numberInStock', numberInStock);

    mutateUpdate({
      endPoint: `products/${product?._id}/update`,
      form: newForm,
    });
  };

  return (
    <div className='w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll hide-scrollbar'>
      <h5 className='text-[30px] font-Poppins text-center'>Edit Product</h5>
      {/* create product form */}
      {successCategories && isSuccessProduct ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <br />
          <div>
            <label className='pb-2'>
              Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='name'
              value={name}
              className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your product name...'
            />
          </div>
          <br />
          <div>
            <label className='pb-2'>
              Brief description <span className='text-red-500'>*</span>
            </label>
            <textarea
              cols='30'
              // required
              rows='4'
              type='text'
              name='briefDescription'
              value={briefDescription}
              className='mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              onChange={(e) => setBriefDescription(e.target.value)}
              placeholder='Enter your product brief description...'
            ></textarea>
          </div>
          <br />
          <div>
            <label className='pb-2'>
              Full description <span className='text-red-500'>*</span>
            </label>
            <Suspense fallback={<div>Loading...</div>}>
              <ReactQuill
                value={editorValue}
                onChange={handleRichEditor}
                placeholder='Enter your product full description...'
                className='h-[200px] w-full mt-2 sm:text-sm mb-[80px] md:mb-[50px]'
              />
            </Suspense>
          </div>
          <br />
          <div>
            <label className='pb-2'>
              Category <span className='text-red-500'>*</span>
            </label>
            <select
              className='w-full mt-2 border h-[35px] rounded-[5px]'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='Choose a category'>Choose a category</option>
              {categories.map((item) => (
                <option value={item._id} key={item._id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <label className='pb-2'>Tags</label>
            <input
              type='text'
              name='tags'
              value={tags}
              className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              onChange={(e) => setTags(e.target.value)}
              placeholder='Enter your product tags...'
            />
          </div>
          <br />
          <div>
            <label className='pb-2'>Brand</label>
            <input
              type='text'
              name='brand'
              value={brand}
              className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              onChange={(e) => setBrand(e.target.value)}
              placeholder='Enter your product brand name'
            />
          </div>
          <br />
          <div>
            <label className='pb-2'>
              Original Price <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              name='price'
              value={originalPrice}
              className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder='Enter your product price...'
            />
          </div>
          <br />
          <div>
            <label className='pb-2'>
              Price (With Discount) <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              name='price'
              value={discountPrice}
              className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder='Enter your product price with discount...'
            />
          </div>
          <br />
          <div>
            <label className='pb-2'>
              Number in stock <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              name='numberInStock'
              value={numberInStock}
              className='mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              onChange={(e) => setNumberInStock(e.target.value)}
              placeholder='Enter number in stock'
            />
          </div>
          <br />
          <div>
            <label className='pb-2'>
              Upload Images <span className='text-red-500'>*</span>
            </label>
            <input
              type='file'
              name='image'
              id='upload'
              className='hidden'
              multiple
              accept='.jpg,.jpeg,.png'
              max='102400'
              onChange={handleImageChange}
            />
            <div className='w-full flex items-center flex-wrap'>
              <label htmlFor='upload'>
                <AiOutlinePlusCircle size={30} className='mt-3' color='#555' />
              </label>

              {images.length > 0
                ? images.map((item, index) => (
                    <span key={item.name + index} className='relative'>
                      <span
                        onClick={(index) => {
                          let newImages = [...images];
                          newImages.splice(index, 1);
                          setImages(newImages);
                        }}
                        className='absolute top-0 right-0 text-red-400 font-bold cursor-pointer'
                      >
                        X
                      </span>
                      <img
                        src={URL.createObjectURL(item)}
                        alt=''
                        className='h-[120px] w-[120px] object-cover m-2'
                      />
                    </span>
                  ))
                : product?.images.map((item, index) => (
                    <span key={item.public_id} className='relative'>
                      <img
                        src={item.url}
                        alt='product_image'
                        className='h-[120px] w-[120px] object-cover m-2'
                      />
                    </span>
                  ))}
            </div>
            <br />
            <div>
              <button
                type='submit'
                disabled={isLoadingUpdate}
                className='mt-2 cursor-pointer appearance-none text-center flex justify-center items-center w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
              >
                {isLoadingUpdate ? (
                  <span>
                    <ButtonLoader color={'black'} width={24} />
                  </span>
                ) : (
                  'Update'
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <Loader />
      )}
      {isErrorProduct && (
        <div className='text-2xl text-red-500'>Invalid Product</div>
      )}
    </div>
  );
};

export default EditProduct;
