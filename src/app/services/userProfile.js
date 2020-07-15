import axios from "axios";
const userProfileApi = process.env.REACT_APP_SERVER_URL + "user/profile";

export const getUserProfile = (id) => {
    var url = id !== "me" ? process.env.REACT_APP_SERVER_URL + `admin/users/${id}/profile` : userProfileApi
    return axios.get(url, {
        headers: {
          Authorization: localStorage.getItem("epxlr-auth"),
          "Content-Type": "application/json",
        },
      });
}

export const updateUserProfile = (data, id) => {
    var url = id !== "me" ? process.env.REACT_APP_SERVER_URL + `admin/users/${id}/profile` : userProfileApi
    console.log(url)
    return axios.post(url, data, {
      headers: {
        Authorization: localStorage.getItem("epxlr-auth"),
        "Content-Type": "application/json",
      },
    });
};

export const updateUserProfileAvatar = (file) => {
    let fd = new FormData();
    fd.append('file',file)
    return axios.post(userProfileApi + '/avatar', fd, {
      headers: {
        Authorization: localStorage.getItem("epxlr-auth"),
        "Content-Type": "multipart/form-data",
      },
    });
};