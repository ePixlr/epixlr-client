import axios from "axios";
const endPoint = process.env.REACT_APP_SERVER_URL + "auth";

export const signin = (data) => {
  return axios.post(`${endPoint}/signin`, data);
};
