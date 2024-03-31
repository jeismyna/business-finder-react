import { useCallback, useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import useUsers from "../../users/hooks/useUsers";
import {
  changeLikeStatus,
  createCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCards,
  getFavCards
} from "../services/cardApiService";
import { useNavigate } from "react-router-dom";

export default function useCards() {

  const { handleCheckToken } = useUsers();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]);
  useAxios();
  const snack = useSnack();

  const navigate = useNavigate();

  function timeout(delay) {
    return new Promise(res => setTimeout(res, delay));
  }

  const requestStatus = (loading, errorMessage, cards, card = null) => {
    setLoading(loading);
    setError(errorMessage);
    setCard(card);
    setCards(cards);
  };

  const handleGetCards = useCallback(async () => {
    try {
      setLoading(true);
      await timeout(400); //in Milliseconds     
      const cards = await getCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
    }
  });

  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
      handleCheckToken();
      const cards = await getMyCards();
      requestStatus(false, null, cards);

    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  //handleGetCard
  const handleGetCard = useCallback(async (cardId) => {
    try {
      setLoading(true);
      const card = await getCard(cardId);
      requestStatus(false, null, null, card);
      return card;
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  //handleCreateCard
  const handleCreateCard = useCallback(async (cardFromClient) => {
    try {
      setLoading(true);
      handleCheckToken();
      await timeout(200);
      const card = await createCard(cardFromClient);
      requestStatus(false, null, null, card);
      snack("success", card.message);
      navigate(-1);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  //handleUpdateCard
  const handleUpdateCard = useCallback(async (cardId, cardFromClient) => {
    try {
      setLoading(true);
      handleCheckToken();
      await timeout(200);
      const card = await editCard(cardId, cardFromClient);
      requestStatus(false, null, null, card);
      snack("success", card.message);
      navigate(-1);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleDeleteCard = useCallback(async (cardId, rootFlag = true) => {
    try {
      setLoading(true);
      handleCheckToken();
      await timeout(200);
      const card = await deleteCard(cardId);
      requestStatus(false, null, null, card);
      snack("success", card.message);
      if (!rootFlag) {
        navigate(-1);
      }
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  //handleLikeCard
  const handleLikeCard = useCallback(async (cardId) => {
    try {
      handleCheckToken();
      await timeout(200);
      const card = await changeLikeStatus(cardId);
      requestStatus(false, null, cards, card);
      snack("success", card.message);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  //handleGetFavCards
  const handleGetFavCards = useCallback(async () => {
    try {
      setLoading(true);
      handleCheckToken();
      await timeout(400);
      const cards = await getFavCards();
      requestStatus(false, null, cards);
    } catch (error) {
      requestStatus(false, error, null);
      snack("error", "Failed to fetch cards");
    }
  }, []);

  //handleCallCard
  const handleCallCard = useCallback(async (card) => {
    try {
      snack("success", "Calling: \"" + card.title + "\"");
    } catch (error) {
      snack("error", "Call failed " + error + card._id);
    }
  }, []);

  const value = useMemo(() => {
    return { isLoading, cards, card, error };
  }, [isLoading, cards, card, error]);

  return {
    value,
    handleGetCards,
    handleGetMyCards,
    handleDeleteCard,
    handleGetCard,
    handleUpdateCard,
    handleCreateCard,
    handleGetFavCards,
    handleLikeCard,
    handleCallCard
  };
}
