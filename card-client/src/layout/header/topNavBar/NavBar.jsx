import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import { MenuProvider } from "./menu/MenuProvider";
import RightNavBar from "./right-navigation/RightNavBar";
import { useTheme } from "../../../providers/ThemeProvider";

export default function NavBar() {
  const { theme } = useTheme();
  return (
    <MenuProvider>
      <AppBar className="AppBar" position="sticky" sx={{bgcolor: theme.palette.primary.main}} elevation={10}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <LeftNavBar />
          <RightNavBar />
        </Toolbar>
      </AppBar>
    </MenuProvider>
  );
}
