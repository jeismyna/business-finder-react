import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { useTheme } from "../../../../providers/ThemeProvider";
import { useUser } from "../../../../users/providers/UserProvider";
import Logged from "./Logged";
import MoreButton from "./MoreButton";
import NotLogged from "./NotLogged";
import SearchBar from "./searchBar/SearchBar";

export default function RightNavBar() {
  const { theme, toggleDarkMode } = useTheme();
  const { user } = useUser();

  return (
    <React.Fragment>
        <Box sx={{
          display: "inline-flex",
          alignItems: "center"
        }}>
        <SearchBar />
        <IconButton sx={{ ml: 1, color: theme.palette.mode === 'dark' ? theme.palette.text.primary : theme.palette.primary.dark }} onClick={toggleDarkMode}>
            {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        <Box sx={{
          display: { xs: "none", md: "inline-flex" },
          alignItems: "center",
        }}>
          {user && <Logged />}
          {!user && <NotLogged />}
        </Box>

      </Box>
      <MoreButton />
    </React.Fragment>
  );
}

