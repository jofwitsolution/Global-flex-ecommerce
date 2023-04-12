import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { userReducer } from './reducers/user';
import { sellerReducer } from './reducers/seller';
import { productReducer } from './reducers/product';
import { eventReducer } from './reducers/event';
import { categoryReducer } from './reducers/category';
import { authReducer } from './reducers/auth';
import { cartReducer } from './reducers/cart';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  seller: sellerReducer,
  products: productReducer,
  events: eventReducer,
  category: categoryReducer,
  cart: cartReducer,
});

const persistConfig = { key: 'root', storage, version: 2 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(Store, () => {
  // This callback is called after the rehydration is complete
  console.log('Rehydration complete.');
});

export default Store;
