import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

export async function getProducts(endPoint, query) {
  const { data } = await axios.get(`${server}/${endPoint}`, {
    params: { ...query },
  });
  return data;
}

export async function getFilteredProducts(endPoint, query) {
  const { data } = await axios.get(`${server}/${endPoint}`, {
    params: { ...query },
  });
  return data;
}

export async function getProduct(endPoint, query) {
  const { data } = await axios.get(`${server}/${endPoint}?name=${query}`);
  return data;
}

export async function getProductById(endPoint) {
  const { data } = await axios.get(`${server}/${endPoint}`);
  return data;
}

export async function getShopProducts(endPoint) {
  const { data } = await axios.get(`${server}/${endPoint}`, {
    withCredentials: true,
  });
  return data;
}

export async function updateShopProduct({ endPoint, form }) {
  const { data } = await axios.put(`${server}/${endPoint}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return data;
}

export async function deleteShopProduct(endPoint) {
  const { data } = await axios.delete(`${server}/${endPoint}`, {
    withCredentials: true,
  });
  return data;
}
