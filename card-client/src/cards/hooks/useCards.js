import { useCallback, useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnack } from "../../providers/SnackbarProvider";
import { useUser } from "../../users/providers/UserProvider";
import {
  changeLikeStatus,
  createCard,
  deleteCard,
  editCard,
  getCard,
  getCards,
  getMyCards,
} from "../services/cardApiService";
import { useNavigate } from "react-router-dom";

export default function useCards() {

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [card, setCard] = useState(null);
  const [cards, setCards] = useState([]);
  useAxios();
  const snack = useSnack();
  const { user } = useUser();

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
      const cards = await getCards();
      await timeout(400); //in Milliseconds
      requestStatus(false, null, cards);
      snack("success", "All the cards are here!");
    } catch (error) {
      requestStatus(false, error, null);
      snack("error", "Failed to fetch cards");
    }
  });

  const handleGetMyCards = useCallback(async () => {
    try {
      setLoading(true);
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
      const card = await createCard(cardFromClient);
      requestStatus(false, null, null, card);
      snack("success", "A new business card has been created");
      navigate(-1);
    } catch (error) {
      requestStatus(false, error, null);
      snack("error", "Failed to create card");
    }
  }, []);

  //handleUpdateCard
  const handleUpdateCard = useCallback(async (cardId, cardFromClient) => {
    try {
      setLoading(true);
      const card = await editCard(cardId, cardFromClient);
      requestStatus(false, null, null, card);
      snack("success", "The business card has been successfully updated");
      navigate(-1);
    } catch (error) {
      requestStatus(false, error, null);
      snack("error", "Failed to update card");
    }
  }, []);

  const handleDeleteCard = useCallback(async (cardId) => {
    try {
      setLoading(true);
      await deleteCard(cardId);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, []);


  const addToLikes = ((card) => {
    snack("success", "\"" + card.title + "\" has been added to your favorites");
  })

  const removeFromLikes = ((card) => {
    snack("success", "\"" + card.title + "\" has been removed from your favorites");
  })

  //handleLikeCard
  const handleLikeCard = useCallback(async (cardId) => {
    try {
      const card = await changeLikeStatus(cardId);
      requestStatus(false, null, cards, card);
      card.likes.includes(user.id) ? addToLikes(card) : removeFromLikes(card);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  //handleGetFavCards
  const handleGetFavCards = useCallback(async (userID) => {
    try {
      setLoading(true);
      await timeout(200);
      const cards = await getCards();
      const favCards = cards.filter((card) => card.likes.includes(userID));
      requestStatus(false, null, favCards);
    } catch (error) {
      requestStatus(false, error, null);
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
