import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : "http://localhost:8181/api",
})

export const getCards = async () => {
  try {
    const response = await api.get(`/cards`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMyCards = async () => {
  try {
    const response = await api.get(`/cards/my-cards`);
    const data = response.data;
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const { data } = await api.delete(`/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getCard = async (cardId) => {
  try {
    const { data } = await api.get(`/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createCard = async (card) => {
  try {
    const { data } = await api.post(`/cards/`, card);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const editCard = async (cardId, normalaizedCard) => {
  try {
    const { data } = await api.put(
      `/cards/${cardId}`,
      normalaizedCard
    );
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const changeLikeStatus = async (cardId) => {
  try {
    const { data } = await api.patch(`/cards/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
