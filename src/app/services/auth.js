import axios from "axios";
const endPoint = process.env.REACT_APP_SERVER_URL + "auth";

export const signin = (data) => {
  return axios.post(`${endPoint}/signin`, data);
};

export const verify = (token) => {
  return axios.get(`${endPoint}/verify/${token}`)
}

export const createPassword = (data) => {
  return axios.post(`${endPoint}/password/`, data)
}

export const changePassword = (password) => {
  return axios.put(`${endPoint}/password`, {newPassword: password}, {
    headers: {
      Authorization: localStorage.getItem("epxlr-auth"),
      "Content-Type": "application/json",
    }
  })
}
