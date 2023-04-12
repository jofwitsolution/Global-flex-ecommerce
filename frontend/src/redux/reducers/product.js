import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  product: null,
  allProducts: [],
  bestDeals: [],
  productDetails: {},
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },
  productCreateReset: (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.success = false;
  },

  // get all products of shop
  getAllProductsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getAllProductsShopFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a shop
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // set all products
  setAllProducts: (state, action) => {
    state.allProducts = action.payload;
  },
  setBestDeals: (state, action) => {
    state.bestDeals = action.payload;
  },
  setProductDetails: (state, action) => {
    state.productDetails = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
