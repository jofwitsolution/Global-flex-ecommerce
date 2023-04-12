import axios from 'axios';

const server = process.env.REACT_APP_API_URL;

export async function updateProfile({ endPoint, form }) {
  const { data } = await axios.patch(`${server}/${endPoint}`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return data;
}
