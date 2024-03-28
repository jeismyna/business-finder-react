import { AppBar, Container, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavItem from "../routes/components/NavItem";
import { styled } from '@mui/material/styles';
import { useTheme } from "../providers/ThemeProvider";
import useUsers from "../users/hooks/useUsers";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function SandBox() {

  const { theme } = useTheme();
  const { handleCheckToken } = useUsers();

  useEffect(() => {
    handleCheckToken();
  }, []);

  return (
    <div>
      <AppBar className="AppBarSandbox" sx={{ bgcolor: theme.palette.secondary.light }} position="fixed">
        <Toolbar>
          <NavItem to="counter" label="Counter Page" />
          <NavItem
            to="mydetails"
            label="My Details Page"
          />
          <NavItem
            to="password"
            label="Password Page"
          />
          <NavItem to="todo" label="Todo Page" />
          <NavItem
            to="firsteffect"
            label="First Effect Page"
          />
          <NavItem
            to="countries"
            label="Coutries Page"
          />
          <NavItem to="render" label="Render" />
          <NavItem to="map" label="Map" />
        </Toolbar>
      </AppBar>
      <Offset />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
