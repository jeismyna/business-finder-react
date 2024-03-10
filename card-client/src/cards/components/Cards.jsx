import { Grid } from "@mui/material";
import { arrayOf } from "prop-types";
import React from "react";
import cardType from "../models/types/cardType";
import CardBussinesComponent from "./card/CardBussinesComponent";
import useCards from "../hooks/useCards";
import { useParams, useNavigate } from "react-router-dom";


export default function Cards({ cards, handleDelete, handleUpdateFavsPage }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleLikeCard,
    handleCallCard,
    value: { card },
  } = useCards();

  const handleLike = (id) => {
    handleLikeCard(id);
  };
  const handleCall = (id) => {
    const card = cards.find((card) => card._id == id);
    handleCallCard(card);
  }

  return (
      <Grid container sx={{ justifyContent: "center" }}>
        {cards.map((card, index) => (
          <Grid item key={index}>
            <CardBussinesComponent
              card={card}
              key={card._id}
              handleDelete={handleDelete}
              handleCall={handleCall}
              handleLike={handleLike}
              handleUpdateFavsPage={handleUpdateFavsPage}
            />
          </Grid>
        ))}
      </Grid>
  );
}

Cards.propTypes = {
  cards: arrayOf(cardType),
};
