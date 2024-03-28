import { Container } from "@mui/material";
import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import CardsFeedback from "../components/CardsFeedback";
import useCards from "../hooks/useCards";

export default function MyCards() {
  const { value, handleGetMyCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;

  useEffect(() => {
      handleGetMyCards();
  }, []);

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
