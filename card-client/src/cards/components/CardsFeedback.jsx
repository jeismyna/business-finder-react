import { Typography } from "@mui/material";
import React, { memo, useContext } from "react";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import AddCardButton from "../components/AddCardButton";
import Cards from "./Cards";
import SearchbarContext from "../../providers/SearchbarContext";


export default memo(function CardsFeedback({
  isLoading,
  cards,
  error,
  handleDelete,
  handleUpdateFavsPage,
}) {

  const { text } = useContext(SearchbarContext);

  if (isLoading) return <Spinner />;
  if (error) return <Error errorMessage={error.toString()} />;
  if (cards && cards.length === 0) {
    return (
      <React.Fragment>
        <Typography m={2}>
          Oops... it seems there are no business cards to display
        </Typography>
        <AddCardButton />
      </React.Fragment>
    );
  }
  if (cards) {
    return (
      <React.Fragment>
        <Cards cards={text ? cards.filter((card) => card.title.toLowerCase().includes(text.toLowerCase())) : cards} handleDelete={handleDelete} handleUpdateFavsPage={handleUpdateFavsPage} />
        <AddCardButton />
      </React.Fragment>
    );
  }
  return null;
});
