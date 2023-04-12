import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: 'LoadUserRequest',
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: 'LoadUserSuccess',
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: 'LoadUserFail',
      payload: error.response?.data?.message,
    });
  }
};

// login user
export const loginUser = (data) => async (dispatch) => {
  dispatch({
    type: 'SetUserLogin',
    payload: data.user,
  });
};

// logout user
export const logout = () => async (dispatch) => {
  dispatch({
    type: 'LogoutUser',
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
