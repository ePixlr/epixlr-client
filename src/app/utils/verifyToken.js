import decode from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("epxlr-auth");
  try {
    decode(token);
  } catch (error) {
    return false;
  }
  return true;
};
