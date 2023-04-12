import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  CatalogPage,
  CartPage,
} from './routes/Routes.js';
import {
  ShopDashboardPage,
  ShopProfileInfo,
  ShopCreateProduct,
  ShopAllProducts,
  ShopCreateEvents,
  ShopAllEvents,
  ShopAllCoupouns,
  ShopPreviewPage,
  ShopEditProduct,
} from './routes/ShopRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Store from './redux/store';
import { loadUser, loadSeller } from './redux/actions/user';
import { getAllCategories } from './redux/actions/category';
import ProtectedRoute from './private-routes/ProtectedRoute';
import SellerProtectedRoute from './private-routes/SellerProtectedRoute';

const App = () => {
  const { userAuth, adminAuth, sellerAuth } = useSelector(
    (state) => state.auth
  );

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        // refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false,
        staleTime: 60 * 60 * 1000, //equal to 60s
      },
    },
  });

  useEffect(() => {
    if (userAuth) Store.dispatch(loadUser());
    if (sellerAuth) Store.dispatch(loadSeller());
    Store.dispatch(getAllCategories());
  }, [userAuth, adminAuth, sellerAuth]);

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cart' element={<CartPage />} />
            <Route path='/sign-up' element={<SignupPage />} />
            <Route
              path='/activation/:activation_token'
              element={<ActivationPage />}
            />
            <Route
              path='/seller/activation/:activation_token'
              element={<SellerActivationPage />}
            />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/catalog' element={<CatalogPage />} />
            <Route
              path='/product/:productUrl'
              element={<ProductDetailsPage />}
            />
            <Route path='/best-selling' element={<BestSellingPage />} />
            <Route path='/events' element={<EventsPage />} />
            <Route path='/faq' element={<FAQPage />} />
            <Route
              path='/checkout'
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path='/payment' element={<PaymentPage />} />
            <Route path='/order/success/:id' element={<OrderSuccessPage />} />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            {/* shop Routes */}
            <Route path='/shop/preview/:id' element={<ShopPreviewPage />} />
            <Route path='/shop-create' element={<ShopCreatePage />} />
            <Route path='/shop-login' element={<ShopLoginPage />} />
            <Route
              path='/dashboard'
              element={
                <SellerProtectedRoute>
                  <ShopDashboardPage />
                </SellerProtectedRoute>
              }
            />
            <Route
              path='/dashboard/profile'
              element={
                <SellerProtectedRoute>
                  <ShopProfileInfo />
                </SellerProtectedRoute>
              }
            />
            <Route
              path='/dashboard/create-product'
              element={
                <SellerProtectedRoute>
                  <ShopCreateProduct />
                </SellerProtectedRoute>
              }
            />
            <Route
              path='/dashboard/products/:url/edit'
              element={
                <SellerProtectedRoute>
                  <ShopEditProduct />
                </SellerProtectedRoute>
              }
            />
            <Route
              path='/dashboard/products'
              element={
                <SellerProtectedRoute>
                  <ShopAllProducts />
                </SellerProtectedRoute>
              }
            />
            <Route
              path='/dashboard/create-event'
              element={
                <SellerProtectedRoute>
                  <ShopCreateEvents />
                </SellerProtectedRoute>
              }
            />
            <Route
              path='/dashboard/events'
              element={
                <SellerProtectedRoute>
                  <ShopAllEvents />
                </SellerProtectedRoute>
              }
            />
            <Route
              path='/dashboard/coupouns'
              element={
                <SellerProtectedRoute>
                  <ShopAllCoupouns />
                </SellerProtectedRoute>
              }
            />
          </Routes>
          <ToastContainer
            position='bottom-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
