import React, { useEffect } from 'react'
import useCards from '../hooks/useCards';
import { useUser } from '../../users/providers/UserProvider';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/routesModel';
import { Container } from '@mui/material';
import PageHeader from '../../components/PageHeader';
import CardsFeedback from '../components/CardsFeedback';

export default function FavCards({user}) {

  const { value, handleGetFavCards, handleDeleteCard } = useCards();
  const { cards, error, isLoading } = value;

  const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      navigate(ROUTES.CARDS);
    } else {
      handleGetFavCards(user.id);
    }
  }, [user]);

  const handleDelete = async (id) => {
    await handleDeleteCard(id);
    await handleGetFavCards();
  };

  const handleUpdateFavsPage = async () => {
    handleGetFavCards(user.id);
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
