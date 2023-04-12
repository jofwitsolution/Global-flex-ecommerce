import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
  success: false,
  categories: [],
};

export const categoryReducer = createReducer(initialState, {
  categoryCreateRequest: (state) => {
    state.isLoading = true;
  },
  categoryCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.category = action.payload;
    state.success = true;
  },
  categoryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all categories
  getCategoriesRequest: (state) => {
    state.isLoading = true;
  },
  getCategoriesSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.categories = action.payload;
  },
  getCategoriesFailed: (state, action) => {
    state.isLoading = false;
    state.success = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
