import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

// create category
export const createCategory = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: 'categoryCreateRequest',
    });

    const config = { headers: { 'Content-Type': 'Application/JSON' } };

    const { data } = await axios.post(`${server}/categories`, newForm, config);
    dispatch({
      type: 'categoryCreateSuccess',
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: 'categoryCreateFail',
      payload: error?.response?.data?.message || 'Network Error',
    });
  }
};

// get all categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: 'getCategoriesRequest',
    });

    const { data } = await axios.get(`${server}/categories`);
    dispatch({
      type: 'getCategoriesSuccess',
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: 'getCategoriesFailed',
      payload: error?.response?.data?.message || 'Network Error',
    });
  }
};
