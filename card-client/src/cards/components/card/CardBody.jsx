import { CardContent, CardHeader, Divider, Typography } from "@mui/material";
import { number, string } from "prop-types";
import React from "react";
import addressType from "../../models/types/addressType";

export default function CardBody({
  title,
  subtitle,
  phone,
  address,
  cardNumber,
}) {
  return (
    <React.Fragment>
      <CardHeader 
        sx={{
          display: "flex",
          overflow: "hidden",
          "& .MuiCardHeader-content": {
            overflow: "hidden"
          }
        }}      
      title={title} 
      titleTypographyProps={{ noWrap: true }}
      subheader={subtitle}
      subheaderTypographyProps={{ noWrap: true }}
      />
      <Divider variant="middle" />
      <CardContent sx={{ minHeight: 110 }}>
        <Typography variant="body2" color="text.secondary">
          <strong>Phone: </strong>
          {phone}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          <strong>Address: </strong>
          {address.city} {address.street} {address.houseNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Card Number: </strong>
          {cardNumber}
        </Typography>
      </CardContent>
    </React.Fragment>
  );
}

CardBody.propTypes = {
  title: string.isRequired,
  subtitle: string.isRequired,
  phone: string.isRequired,
  address: addressType.isRequired,
  cardNumber: number,
};
