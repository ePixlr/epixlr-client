import axios from "axios";
const endPoint = process.env.REACT_APP_AUTH_API_URL;

export const signin = (data) => {
  return axios.post(`${endPoint}/signin`, data);
};
