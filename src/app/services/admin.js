import axios from "axios";
const endPoint = process.env.REACT_APP_SERVER_URL + "admin";

export const inviteUser = (data) => {
  return axios.post(`${endPoint}/invite`, data, {
    headers: {
      Authorization: localStorage.getItem("epxlr-auth"),
      "Content-Type": "application/json",
    },
  });
}

export const getMyUsers = () => {
    return axios.get(`${endPoint}/users`, {
        headers: {
          Authorization: localStorage.getItem("epxlr-auth"),
          "Content-Type": "application/json",
        },
    });
}

export const updateUserRole = (role, id) => {
    return axios.put(`${endPoint}/users/role`, { "role": role, "userId": id }, {
      headers: {
        Authorization: localStorage.getItem("epxlr-auth"),
        "Content-Type": "application/json",
      },
    });
};

export const deleteUser = (id) => {
    return axios.delete(`${endPoint}/users/${id}`, {
        headers: {
          Authorization: localStorage.getItem("epxlr-auth"),
          "Content-Type": "application/json",
        },
    });
}
  