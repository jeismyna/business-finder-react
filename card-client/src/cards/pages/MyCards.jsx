import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import { useUser } from "../../users/providers/UserProvider";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";

export default function MyCards({user}) {
  const { value, handleGetMyCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.CARDS);
    } else {
      handleGetMyCards();
    }
  }, [user]);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    await handleGetMyCards();
  };

  const handleUpdateFavsPage = async () => {
    //no need to do anything - only on favorites page
  };

  return (
    <div>
      <Container>
        <PageHeader
          title="My Cards"
          subtitle="This page contains all of your cards"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={cards}
          handleDelete={handleDelete}
          handleUpdateFavsPage={handleUpdateFavsPage}
        />
      </Container>
    </div>
  );
}
