import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import useCards from "../hooks/useCards";
import CardsFeedback from "../components/CardsFeedback";


export default function CardPage() {
  const { value, handleGetCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;

  useEffect(() => {
    handleGetCards();
  }, []);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    handleGetCards();
  };

  const handleUpdateFavsPage = async () => {
    //no need to do anything - only on favorites page
  };

  return (
      <Container sx={{ mt: 0 }}>
        <PageHeader
          title="Home"
          subtitle="This page contains all of the business cards"
        />
        <CardsFeedback
          isLoading={isLoading}
          error={error}
          cards={cards}
          handleDelete={handleDelete}
          handleUpdateFavsPage={handleUpdateFavsPage}
        />
      </Container>
  );
}
