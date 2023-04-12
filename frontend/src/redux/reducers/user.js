import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  SetUserLogin: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LogoutUser: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
    state.user = null;
  },

  SetUserProfileUpdate: (state, action) => {
    state.user = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
