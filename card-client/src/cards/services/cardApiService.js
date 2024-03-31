import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://localhost:8181/api";

export const getCards = async () => {
  try {
    const response = await axios.get(`${apiUrl}/cards`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data.message : error.message);
  }
};

export const getFavCards = async () => {
  try {
    const response = await axios.get(`${apiUrl}/cards/fav-cards`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data.message : error.message);
  }
};

export const getMyCards = async () => {
  try {
    const response = await axios.get(`${apiUrl}/cards/my-cards`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data.message : error.message);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data.message : error.message);
  }
};

export const getCard = async (cardId) => {
  try {
    const { data } = await axios.get(`${apiUrl}/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data.message : error.message);
  }
};

export const createCard = async (card) => {
  try {
    const { data } = await axios.post(`${apiUrl}/cards/`, card);
    return data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data.message : error.message);
  }
};

export const editCard = async (cardId, normalaizedCard) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/cards/${cardId}`,
      normalaizedCard
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data.message : error.message);
  }
};

export const changeLikeStatus = async (cardId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.response ? error.response.data.message : error.message);
  }
};
