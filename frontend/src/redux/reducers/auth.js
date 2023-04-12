import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  userAuth: false,
  adminAuth: false,
  sellerAuth: false,
};

export const authReducer = createReducer(initialState, {
  AuthorizeUser: (state) => {
    state.userAuth = true;
    state.adminAuth = false;
    state.sellerAuth = false;
  },
  AuthorizeAdmin: (state) => {
    state.userAuth = false;
    state.adminAuth = true;
    state.sellerAuth = false;
  },
  AuthorizeSeller: (state) => {
    state.userAuth = false;
    state.adminAuth = false;
    state.sellerAuth = true;
  },

  UnAuthorize: (state) => {
    state.userAuth = false;
    state.adminAuth = false;
    state.sellerAuth = false;
  },
});
