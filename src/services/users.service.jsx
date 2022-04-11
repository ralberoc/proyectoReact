import { getWrapper } from "../api/wrappers";


const URL = 'https://reqres.in/api/users';

export const fetchUserList = async (pageNumber) => {
  const URLparams = `${URL}?page=${pageNumber}`;
  const result = await getWrapper(URLparams)
    .then((res) => res.json())
    .catch((err) => err);
  return result;
};
// eslin da un error si solamente se exporta una variable
export const clean = {};
