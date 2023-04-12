import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

// login user
export const loginSeller = (data) => async (dispatch) => {
  dispatch({
    type: 'SetSellerLogin',
    payload: data.seller,
  });
};

// logout seller
export const logoutSeller = () => async (dispatch) => {
  dispatch({
    type: 'LogoutSeller',
  });
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadSellerRequest',
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: 'LoadSellerSuccess',
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: 'LoadSellerFail',
      payload: error.response?.data?.message,
    });
  }
};
