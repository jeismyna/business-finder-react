import React, { useEffect } from 'react'
import useCards from '../hooks/useCards';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';

export default function FavCards() {

  const { value, handleGetFavCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;

  useEffect(() => {
      handleGetFavCards();
  }, []);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    await handleGetFavCards();
  };

  const handleUpdateFavsPage = async () => {
    handleGetFavCards();
  };

  return (
    <div>
      <Container>
        <PageHeader
          title="Favorite Cards"
          subtitle="This page contains your liked cards"
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
  )
}
