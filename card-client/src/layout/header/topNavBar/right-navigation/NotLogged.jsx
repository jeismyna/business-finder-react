import React from "react";
import Box from "@mui/material/Box";
import NavItem from "../../../../routes/components/NavItem";
import ROUTES from "../../../../routes/routesModel";

const NotLogged = () => {
  return (
    <Box sx={{ display: { xs: "none", md: "inline-flex" },}}>
      <NavItem label="Sign up" to={ROUTES.SIGNUP} />
      <NavItem label="Log in" to={ROUTES.LOGIN} />
    </Box>
  );
};

export default NotLogged;
