import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

export const sellerReducer = createReducer(initialState, {
  LoadSellerRequest: (state) => {
    state.isLoading = true;
  },
  LoadSellerSuccess: (state, action) => {
    state.isLoading = false;
    state.seller = action.payload;
  },
  LoadSellerFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  SetSellerLogin: (state, action) => {
    state.isSeller = true;
    state.isLoading = false;
    state.seller = action.payload;
  },
  LogoutSeller: (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.isSeller = false;
    state.seller = null;
  },

  SetSellerProfileUpdate: (state, action) => {
    state.seller = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
