import {
  Card,
  CardActionArea,
} from "@mui/material";
import React from "react";
import CardHead from "./CardHead";
import CardBody from "./CardBody";
import CardActionBar from "./CardActionBar";
import cardType from "../../models/types/cardType";
import { func } from "prop-types";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/routesModel";

export default function CardBussinesComponent({
  card,
  handleDelete,
  handleCall,
  handleLike,
  handleUpdateFavsPage,
}) {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Card sx={{ width: 250, minHeight: 400, maxHeight: 400, m: 2, display: "flex", flexDirection: "column" }}>
        <CardActionArea
          onClick={() => navigate(`${ROUTES.CARD_INFO}/${card._id}`)}
        >
          <CardHead image={card.image} />
          <CardBody
            title={card.title}
            subtitle={card.subtitle}
            phone={card.phone}
            address={card.address}
            cardNumber={card.bizNumber}
          />
        </CardActionArea>
        <CardActionBar
          id={card._id}
          likes={card.likes}
          user_id={card.user_id}
          handleDelete={handleDelete}
          handleCall={handleCall}
          handleLike={handleLike}
          handleUpdateFavsPage={handleUpdateFavsPage}
        />
      </Card>
    </React.Fragment>
  );
}

CardBussinesComponent.propTypes = {
  card: cardType.isRequired,
  handleDelete: func,
  handleLike: func,
  handleUpdateFavsPage: func,
};
