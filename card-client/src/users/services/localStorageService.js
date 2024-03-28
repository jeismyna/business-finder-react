import JwtDecode from "jwt-decode";
const TOKEN = "token";

export const setTokenInLocalStorage = (encryptedToken) =>
  localStorage.setItem(TOKEN, encryptedToken);

export const getUser = () => {
  try {
    const user = JwtDecode(getToken());
    if (user.exp > Date.now() / 1000) {
      return user;
    }
  } catch (error) {
    return null;
  }
};

export const removeToken = () => localStorage.removeItem(TOKEN);

export const getToken = () => localStorage.getItem(TOKEN);

