import axios from "axios";
const api = process.env.REACT_APP_SERVER_URL + "user/role";

export const updateUserRole = (role, id) => {
  return axios.get(api, { "role": role, "userId": id }, {
    headers: {
      Authorization: localStorage.getItem("epxlr-auth"),
      "Content-Type": "application/json",
    },
  });
};
