import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

export const cartReducer = createReducer(initialState, {
  CartAddItem: (state, action) => {
    const product = action.payload;

    // check if product already in cart
    const existItem = state.cartItems.find((item) => item.id === product.id);
    if (existItem) {
      // exist
      state.cartItems = state.cartItems.map((item) =>
        item.id === existItem.id ? product : item
      );
    } else {
      // doesn't exist
      state.cartItems = [...state.cartItems, product];
    }
  },
  CartRemoveItem: (state, action) => {
    state.cartItems = state.cartItems.filter(
      (item) => item.id !== action.payload
    );
  },
  CartUpdateItem: (state, action) => {
    state.cartItems = state.cartItems.map((item) =>
      item.id === action.payload.id ? action.payload : item
    );
  },
  CartSaveShippingAddress: (state, action) => {
    state.shippingAddress = action.payload;
  },
  CartSavePaymentMethod: (state, action) => {
    state.paymentMethod = action.payload;
  },
  CartClearItems: (state) => {
    state.cartItems = [];
    state.shippingAddress = {};
    state.paymentMethod = undefined;
  },
});
