import axios from "axios";
const ordersUrl = process.env.REACT_APP_ORDERS_API_URL;
const mediaUrl = process.env.REACT_APP_MEDIA_API_URL;

export const uploadImage = (data) => {
  return axios.post(ordersUrl, data, {
    headers: {
      Authorization: localStorage.getItem("epxlr-auth"),
      "Content-Type": "application/json",
    },
  });
};

export const deleteImage = (data) => {
  return axios.delete(mediaUrl, {
    headers: {
      Authorization: localStorage.getItem("epxlr-auth"),
      "Content-Type": "application/json",
    },
    data,
  });
};
