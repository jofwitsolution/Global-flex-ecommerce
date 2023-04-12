import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

// create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: 'productCreateRequest',
    });

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${server}/products/create-product`,
      newForm,
      config
    );
    dispatch({
      type: 'productCreateSuccess',
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: 'productCreateFail',
      payload: error.response.data.message,
    });
  }
};

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllProductsShopRequest',
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: 'getAllProductsShopSuccess',
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: 'getAllProductsShopFailed',
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteProductRequest',
    });

    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: 'deleteProductSuccess',
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'deleteProductFailed',
      payload: error.response.data.message,
    });
  }
};

// Set all products
export const setAllProducts = (data) => (dispatch) => {
  dispatch({
    type: 'setAllProducts',
    payload: data,
  });
};

// Set best deals
export const setBestDeals = (data) => (dispatch) => {
  dispatch({
    type: 'setBestDeals',
    payload: data,
  });
};

// Set product details
export const setProductDetails = (data) => (dispatch) => {
  dispatch({
    type: 'setProductDetails',
    payload: data,
  });
};
