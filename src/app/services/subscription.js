import axios from "axios";
const api = process.env.REACT_APP_SERVER_URL + "subscriptions/user";

export const addUserSubscription = (data) => {
  return axios.post(api, data, {
    headers: {
      Authorization: localStorage.getItem("epxlr-auth"),
      "Content-Type": "application/json",
    },
  });
};

export const getUserSubscription = () => {
    return axios.get(api, {
      headers: {
        Authorization: localStorage.getItem("epxlr-auth"),
        "Content-Type": "application/json",
      },
    });
  };
