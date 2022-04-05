import { postWrapper } from "../api/wrappers.jsx";


const URL = 'https://reqres.in/api/login';

export const getToken = async (email, password) =>  {
  const requestBody = { body: JSON.stringify({ email, password }) };

  const resultado = await postWrapper(URL, requestBody)
  .then((res) => res.json())
  .catch((err) => err);
return resultado;
}

export const saveTokenAuth = ({ token }) => {
  localStorage.setItem('token', token);
};

export const readTokenAuth = () => localStorage.getItem('token');

export const deleteTokenAuth = () => localStorage.removeItem('token');
