export const addToCart = (product, qty) => (dispatch) => {
  dispatch({
    type: 'CartAddItem',
    payload: {
      id: product._id,
      name: product.name,
      url: product.url,
      image: product.images[0],
      originalPrice: product.originalPrice,
      discountPrice: product.discountPrice,
      numberInStock: product.numberInStock,
      qty,
    },
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: 'CartRemoveItem',
    payload: id,
  });
};

export const updateCartItem = (product) => (dispatch) => {
  dispatch({
    type: 'CartUpdateItem',
    payload: product,
  });
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: 'CartSaveShippingAddress',
    payload: data,
  });
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: 'CartSavePaymentMethod',
    payload: data,
  });
};
